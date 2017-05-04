import 'dart:math' as math;

import 'package:collection/collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

/// A function that takes the multi-dimensional [ActorScoreChange] and outputs
/// a single number.
typedef num CombineFunction(ActorScoreChange change);

@immutable
class PlannerRecommendation {
  static final Logger log = new Logger('PlannerRecommendation');

  /// The [weights] have to add up to this number.
  ///
  /// We're using [int] instead of [num] for weights because we want to
  /// avoid rounding errors (when all weights add up to 0.99 and a random
  /// function returns 0.995).
  static const int weightsResolution = 1000;
  static const num _worstOptionWeight = 0.1;

  final UnmodifiableMapView<Action, ActorScoreChange> scores;
  final List<Action> _actions;

  PlannerRecommendation(Map<Action, ActorScoreChange> scores)
      : scores = new UnmodifiableMapView(scores),
        _actions = _getAttainableActions(scores) {
    if (scores.isEmpty) {
      log.warning("Created with no recommendations.");
    }
  }

  List<Action> get actions => _actions;

  bool get isEmpty => _actions.isEmpty;

  /// Picks a maximum of [maximum] actions. The first three are going to be
  /// best for self-preservation, team-preservation, and enemy-damage. The rest
  /// will be other actions ordered by [combineFunction].
  ///
  /// The idea behind this is to always offer at least one option per
  /// strategy. For example, if there are several amazing (but dangerous)
  /// options to deal damage to enemy, there still should be at least one
  /// action that preserves player's health. Otherwise, we could force player
  /// to risk his life when a life-saving action would be a perfectly valid
  /// option.
  Iterable<Action> pickMax(int maximum, CombineFunction combineFunction) sync* {
    if (_actions.length <= maximum) {
      yield* _actions;
      return;
    }

    var bestSelfPreserving = _findBest((score) => score.selfPreservation);
    var bestEnemyDamaging =
        _findBest((score) => -score.enemy, skip: [bestSelfPreserving]);
    var bestTeamPreserving = _findBest((score) => score.teamPreservation,
        skip: [bestSelfPreserving, bestEnemyDamaging]);

    int count = 0;

    if (bestSelfPreserving != null) {
      log.fine("best self preserving: $bestSelfPreserving");
      yield bestSelfPreserving;
      count++;
    }
    if (bestEnemyDamaging != null && count < maximum) {
      log.fine("best enemy damaging: $bestEnemyDamaging");
      yield bestEnemyDamaging;
      count++;
    }
    if (bestTeamPreserving != null && count < maximum) {
      log.fine("best team preserving: $bestTeamPreserving");
      yield bestTeamPreserving;
      count++;
    }
    if (count == maximum) return;

    _actions.sort((a, b) =>
        -combineFunction(scores[a]).compareTo(combineFunction(scores[b])));

    for (var action in _actions) {
      if (action == bestSelfPreserving) continue;
      if (action == bestEnemyDamaging) continue;
      if (action == bestTeamPreserving) continue;
      yield action;
      count += 1;
      if (count == maximum) break;
    }
  }

  /// Pick an action randomly, but with more weight given to actions that
  /// are scored more highly according to [combineFunction].
  Action pickRandomly(CombineFunction combineFunction) {
    if (_actions.length == 1) {
      return _actions.single;
    }

    // Make the first action be the best one.
    _actions.sort((a, b) =>
        -combineFunction(scores[a]).compareTo(combineFunction(scores[b])));

    num minimum = scores.values.fold<num>(
        double.INFINITY, (prev, el) => math.min(prev, combineFunction(el)));
    num maximum = scores.values.fold<num>(double.NEGATIVE_INFINITY,
        (prev, el) => math.max(prev, combineFunction(el)));
    assert(!minimum.isNaN);
    assert(!maximum.isNaN);
    assert(minimum.isFinite);
    assert(maximum.isFinite);

    // Make sure even the worst option has some weight.
    num lowerBound = minimum - (maximum - minimum) * _worstOptionWeight;
    if (minimum == maximum) {
      // When all options are equal, make sure we don't divide by zero.
      lowerBound -= 1;
    }
    num totalLength = maximum - lowerBound;

    var fractionWeights = new List<num>.generate(_actions.length, (int i) {
      var action = _actions[i];
      var score = combineFunction(scores[action]);
      return (score - lowerBound) / totalLength;
    }, growable: false);
    num fractionTotal = fractionWeights.fold<num>(0, _sum);
    List<int> weights = fractionWeights
        .map<int>((n) => (n / fractionTotal * weightsResolution).round())
        .toList(growable: false);

    // Account for rounding errors by modifying the best option.
    int weightsDifference = weightsResolution - weights.fold(0, _sum);
    weights[weights.length - 1] += weightsDifference;

    int index = Randomly.chooseWeightedPrecise(weights, max: weightsResolution);

    return _actions[index];
  }

  Action _findBest(CombineFunction combineFunction,
      {List<Action> skip: const []}) {
    Action best;
    num bestScore;
    for (var action in _actions) {
      if (skip.contains(action)) continue;
      if (best == null || combineFunction(scores[action]) > bestScore) {
        best = action;
        bestScore = combineFunction(scores[action]);
        continue;
      }
    }
    return best;
  }

  /// Remove impossible actions. TODO: make sure we don't duplicate effort here
  static List<Action> _getAttainableActions(
      Map<Action, ActorScoreChange> scores) {
    List<Action> result = scores.keys
        .where((a) => !scores[a].isUndefined)
        .toList(growable: false);
    if (result.isEmpty) {
      log.warning("After removing actions scored by undefined, there are no "
          "recommendations.");
    }
    return result;
  }

  static num _sum(num a, num b) => a + b;
}
