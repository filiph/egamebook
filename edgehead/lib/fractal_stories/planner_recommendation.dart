import 'package:collection/collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

/// A function that takes the multi-dimensional [ActorScoreChange] and outputs
/// a single number.
typedef FoldFunction = num Function(ActorScoreChange change);

@immutable
class PlannerRecommendation {
  static final Logger log = Logger('PlannerRecommendation');

  /// The [weights] have to add up to this number.
  ///
  /// We're using [int] instead of [num] for weights because we want to
  /// avoid rounding errors (when all weights add up to 0.99 and a random
  /// function returns 0.995).
  static const int weightsResolution = 1000;

  final UnmodifiableMapView<Performance, ActorScoreChange> _scores;

  final List<Performance> _performances;

  final StatefulRandom _reusableRandom = StatefulRandom(42);

  PlannerRecommendation(Map<Performance, ActorScoreChange> scores)
      : _scores = UnmodifiableMapView(scores),
        _performances = scores.keys.toList(growable: false) {
    if (scores.isEmpty) {
      log.warning("Created with no recommendations.");
    }
  }

  bool get isEmpty => _performances.isEmpty;

  List<Performance> get performances => _performances;

  /// Picks a maximum of [maximum] actions. The first three are going to be
  /// best for self-preservation, team-preservation, and enemy-damage. The rest
  /// will be other actions ordered by [foldFunction].
  ///
  /// The idea behind this is to always offer at least one option per
  /// strategy. For example, if there are several amazing (but dangerous)
  /// options to deal damage to enemy, there still should be at least one
  /// action that preserves player's health. Otherwise, we could force player
  /// to risk his life when a life-saving action would be a perfectly valid
  /// option.
  Iterable<Performance> pickMax(int maximum, FoldFunction foldFunction) sync* {
    if (_performances.length <= maximum) {
      yield* _performances;
      return;
    }

    var bestSelfPreserving = _findBest((score) => score.selfPreservation);
    var bestEnemyDamaging = _findBest((score) => -score.enemy,
        skip: [bestSelfPreserving].nonNulls.toList());
    var bestTeamPreserving = _findBest((score) => score.teamPreservation,
        skip: [bestSelfPreserving, bestEnemyDamaging].nonNulls.toList());

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
        -foldFunction(_scores[a]!).compareTo(foldFunction(_scores[b]!)));

    for (final performance in _performances) {
      if (performance == bestSelfPreserving) continue;
      if (performance == bestEnemyDamaging) continue;
      if (performance == bestTeamPreserving) continue;
      yield performance;
      count += 1;
      if (count == maximum) break;
    }
  }

  /// Pick a performance randomly, but with more weight given to ones that
  /// are scored more highly according to [foldFunction].
  ///
  /// The algorithm is an implementation of the spreadsheet here:
  /// https://docs.google.com/spreadsheets/d/1VoPycySmsy1DucO6xihZuCrMw8rAxcBrI9CnzLhqYZQ/edit#gid=0
  ///
  /// The problem we're trying to solve here is that, while we know the scores
  /// for each performance, we don't know how to assign the probability
  /// of picking each performance. The scores can be any real number, so we
  /// can't assume that score 10 is 10x better than score 1. There could be
  /// a performance with score -100.
  ///
  /// The naive approach would be to assign the probability according
  /// relative distance from the lowest point. So if the lowest score is 0,
  /// then score 10 is picked twice as often as score 5. The problem is that
  /// the lowest-scored performance will never be picked. This is not good,
  /// especially when we have just two performances to pick from.
  ///
  /// Thus, the algorithm below.
  Performance pickRandomly(FoldFunction foldFunction, int statefulRandomState) {
    if (_performances.length == 1) {
      return _performances.single;
    }

    // Fold the score and put each performance with its score in an iterable.
    var folded = _performances
        .map((p) => _FoldedPerformance(p, foldFunction(_scores[p]!)));

    // Sort from best to worst.
    var sorted = folded.toList(growable: false)
      ..sort((a, b) => -a.score.compareTo(b.score));

    var maximum = sorted.first.score;
    var minimum = sorted.last.score;
    assert(minimum.isFinite);
    assert(maximum.isFinite);

    // Get the gaps between scores.
    num minGap = double.infinity;
    num maxGap = double.negativeInfinity;
    for (var i = 0; i < sorted.length - 1; i++) {
      var gap = sorted[i].score - sorted[i + 1].score;
      assert(gap >= 0);
      if (gap < minGap) minGap = gap;
      if (gap > maxGap) maxGap = gap;
    }
    assert(minGap.isFinite);
    assert(maxGap.isFinite);

    // Compute the artificial gap from the worst score
    // to the second-worst score.
    var lowestGap = (minGap + maxGap) / sorted.length;

    // Compute the placement of the worst element. This replaces the minimum.
    num lowerBound = minimum - lowestGap;
    assert(lowerBound.isFinite);

    // Compute fractional weights.
    var span = maximum - lowerBound;
    assert(span.isFinite);
    var fractionWeights = List<num>.generate(
      sorted.length,
      (int i) {
        if (span == 0) {
          // All performances have the exact same score.
          return 1;
        }
        var distance = sorted[i].score - lowerBound;
        return distance / span;
      },
      growable: false,
    );

    // Compute the weights as integers, to provide to chooseWeightedPrecise.
    num fractionTotal = fractionWeights.fold<num>(0, _sum);
    assert(fractionTotal.isFinite, "$fractionTotal is not finite");
    assert(fractionTotal > 0);
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

    return sorted[index].performance;
  }

  Performance? _findBest(FoldFunction foldFunction,
      {List<Performance> skip = const []}) {
    Performance? best;
    late num bestScore;
    for (final performance in _performances) {
      if (skip.contains(performance)) continue;
      if (best == null || foldFunction(_scores[performance]!) > bestScore) {
        best = performance;
        bestScore = foldFunction(_scores[performance]!);
        continue;
      }
    }
    return best;
  }

  static num _sum(num a, num b) => a + b;

  static int _sumInts(int a, int b) => a + b;
}

/// A tuple of [performance] with the folded [score] (not the multidimensional
/// [ActorScore], but the single number that is provided by a [FoldFunction]).
class _FoldedPerformance {
  final Performance performance;
  final num score;

  const _FoldedPerformance(this.performance, this.score);
}
