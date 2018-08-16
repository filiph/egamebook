import 'dart:math' as math;

import 'package:collection/collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

/// A function that takes the multi-dimensional [ActorScoreChange] and outputs
/// a single number.
typedef num CombineFunction(ActorScoreChange change);

@immutable
class PlannerRecommendation {
  static final Logger log = Logger('PlannerRecommendation');

  /// The [weights] have to add up to this number.
  ///
  /// We're using [int] instead of [num] for weights because we want to
  /// avoid rounding errors (when all weights add up to 0.99 and a random
  /// function returns 0.995).
  static const int weightsResolution = 1000;
  static const num _worstOptionWeight = 0.1;

  final UnmodifiableMapView<Performance, ActorScoreChange> scores;
  final List<Performance> _performances;

  PlannerRecommendation(Map<Performance, ActorScoreChange> scores)
      : scores = UnmodifiableMapView(scores),
        _performances = _getAttainablePerformances(scores) {
    if (scores.isEmpty) {
      log.warning("Created with no recommendations.");
    }
  }

  List<Performance> get performances => _performances;

  bool get isEmpty => _performances.isEmpty;

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
  Iterable<Performance> pickMax(
      int maximum, CombineFunction combineFunction) sync* {
    if (_performances.length <= maximum) {
      yield* _performances;
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

    _performances.sort((a, b) =>
        -combineFunction(scores[a]).compareTo(combineFunction(scores[b])));

    for (var performance in _performances) {
      if (performance == bestSelfPreserving) continue;
      if (performance == bestEnemyDamaging) continue;
      if (performance == bestTeamPreserving) continue;
      yield performance;
      count += 1;
      if (count == maximum) break;
    }
  }

  /// Pick a performance randomly, but with more weight given to ones that
  /// are scored more highly according to [combineFunction].
  Performance pickRandomly(
      CombineFunction combineFunction, int statefulRandomState) {
    if (_performances.length == 1) {
      return _performances.single;
    }

    // Make the first performance be the best one.
    _performances.sort((a, b) =>
        -combineFunction(scores[a]).compareTo(combineFunction(scores[b])));

    num minimum = scores.values.fold<num>(
        double.infinity, (prev, el) => math.min(prev, combineFunction(el)));
    num maximum = scores.values.fold<num>(double.negativeInfinity,
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

    var fractionWeights = List<num>.generate(_performances.length, (int i) {
      var action = _performances[i];
      var score = combineFunction(scores[action]);
      return (score - lowerBound) / totalLength;
    }, growable: false);
    num fractionTotal = fractionWeights.fold<num>(0, _sum);
    List<int> weights = fractionWeights
        .map<int>((n) => (n / fractionTotal * weightsResolution).round())
        .toList(growable: false);

    // Account for rounding errors by modifying the best option.
    int weightsDifference = weightsResolution - weights.fold<int>(0, _sumInts);
    weights[weights.length - 1] += weightsDifference;

    // This initializes the random state based on current
    // [WorldState.statefulRandomState]. We don't save the state after use
    // because that would be changing state outside an action.
    _reusableRandom.loadState(statefulRandomState ~/ 2 + 1);
    int index = Randomly.chooseWeightedPrecise(weights,
        max: weightsResolution, random: _reusableRandom);

    return _performances[index];
  }

  final StatefulRandom _reusableRandom = StatefulRandom(42);

  Performance _findBest(CombineFunction combineFunction,
      {List<Performance> skip: const []}) {
    Performance best;
    num bestScore;
    for (var performance in _performances) {
      if (skip.contains(performance)) continue;
      if (best == null || combineFunction(scores[performance]) > bestScore) {
        best = performance;
        bestScore = combineFunction(scores[performance]);
        continue;
      }
    }
    return best;
  }

  /// Remove impossible performances.
  /// TODO: make sure we don't duplicate effort here
  static List<Performance> _getAttainablePerformances(
      Map<Performance, ActorScoreChange> scores) {
    List<Performance> result = scores.keys
        .where((a) => !scores[a].isUndefined)
        .toList(growable: false);
    if (result.isEmpty) {
      log.warning("After removing performances scored by undefined, "
          "there are no recommendations.");
    }
    return result;
  }

  static num _sum(num a, num b) => a + b;

  static int _sumInts(int a, int b) => a + b;
}
