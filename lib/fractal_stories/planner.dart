library stranded.planner;

import 'dart:collection';
import 'dart:math' as math;

import 'action.dart';
import 'actor.dart';
import 'plan_consequence.dart';
import 'world.dart';
import 'dart:async';

class ActorPlanner {
  /// We will stop processing a plan path once its leaf node has lower
  /// cumulative probability than this.
  static const minimumCumulativeProbability = 0.05;

  /// Only consequences with cumulative probability over this threshold
  /// will be considered for best cases.
  static const num bestCaseProbabilityThreshold = 0.3;

  final int actorId;
  final PlanConsequence _initial;

  int planConsequencesComputed = 0;
  bool _resultsReady = false;

  final Map<ActorAction, num> firstActionScores = new Map();

  ActorPlanner(Actor actor, WorldState initialWorld)
      : actorId = actor.id,
        _initial = new PlanConsequence.initial(initialWorld);

  ActorAction getBest() {
    assert(_resultsReady);

    num bestScore = firstActionScores.values.reduce((a, b) => a > b ? a : b);

    for (var action in firstActionScores.keys) {
      if (firstActionScores[action] == bestScore) {
        return action;
      }
    }

    throw new StateError("No best action found in $firstActionScores "
        "(bestScore = $bestScore)");
  }

  Iterable<String> generateTable() sync* {
    int i = 1;
    for (var key in firstActionScores.keys) {
      yield "$i) ${key.name}\t${firstActionScores[key].toStringAsFixed(2)}";
      i += 1;
    }
  }

  Iterable<ActorAction> _generateAllActions(
      Actor actor, WorldState world) sync* {
    yield* world.currentSituation.actions;
    for (var builder in world.currentSituation.actionGenerators) {
      assert(builder is EnemyTargetActorActionBuilder);
      yield* generateEnemyTargetActions(actor, world, builder);
    }
  }

  Future<Null> plan({int maxOrder: 3, Future<Null> waitFunction()}) async {
    firstActionScores.clear();

    var currentActor =
        _initial.world.actors.singleWhere((a) => a.id == actorId);
    var initialScore = currentActor.scoreWorld(_initial.world);

    for (var action in _generateAllActions(currentActor, _initial.world)) {
      if (!action.isApplicable(currentActor, _initial.world)) {
        // Bail early if action isn't possible at all.
        continue;
      }
      var consequenceStats =
          await _getConsequenceStats(_initial, action, maxOrder, waitFunction)
              .toList();

      if (consequenceStats.isEmpty) {
        // This action is possible but we couldn't get to any outcomes while
        // planning.
        firstActionScores[action] = double.NEGATIVE_INFINITY;
        continue;
      }

      var score = combineScores(consequenceStats, initialScore, maxOrder);
      assert(!score.isNaN);

      firstActionScores[action] = score;
    }

    _resultsReady = true;
  }

  PlannerRecommendation getRecommendations() {
    assert(_resultsReady);
    return new PlannerRecommendation.fromScores(firstActionScores);
  }

  /// Computes the combined score for a bunch of consequences.
  ///
  /// TODO: allow to personalize this (for example, optimistic characters
  /// only take `isSuccess == true` consequences into account).
  num combineScores(
      Iterable<ConsequenceStats> stats, num initialScore, int maxOrder) {
    // This approach has a problem: sometimes the stats are not available for
    // maxOrder at all...
//    var list = stats
//        .where((stat) => stat.order == maxOrder - 1)
//        .toList(growable: false);
//    num result = list
//            .map((stat) =>
//                (stat.score - initialScore) * stat.cumulativeProbability)
//            .fold(0, (a, b) => a + b) /
//        list.length;
//    assert(!result.isNaN);
//    assert(!result.isInfinite);
//    return result;

    var uplifts = <num>[];

    ConsequenceStats _bestCase;

    for (var consequence in stats) {
      if (consequence.cumulativeProbability > bestCaseProbabilityThreshold) {
        if (_bestCase == null) {
          _bestCase = consequence;
        } else if (consequence.score > _bestCase.score) {
          _bestCase = consequence;
        }
      }

      var uplift = (consequence.score - initialScore) *
          consequence.cumulativeProbability;
      uplifts.add(uplift);
    }

    var average = uplifts.fold(0, (a, b) => a + b) / uplifts.length;
    var best = _bestCase == null ? 0 : _bestCase.score / _bestCase.order;

    var result = best + average;
    assert(!result.isNaN);
    assert(!result.isInfinite);
    return result;
  }

  static DateTime _latestWait = new DateTime.now();

  /// Returns the stats for consequences of a given [initial] state after
  /// applying [firstAction] and then up to [maxOrder] other steps.
  Stream<ConsequenceStats> _getConsequenceStats(
      PlanConsequence initial,
      ActorAction firstAction,
      int maxOrder,
      Future<Null> waitFunction()) async* {
    // Actor object changes during planning, so we need to look up via id.
    var mainActor = initial.world.actors.singleWhere((a) => a.id == actorId);

    // DEBUG TODO: remove
    bool DEBUG = false;
    if (DEBUG && firstAction.name.contains(" ")) {
      print("INITIAL - $firstAction");
      print(
          "adding: score=${mainActor.scoreWorld(initial.world)} * cumProb=${initial
          .cumulativeProbability} (prob=${initial.probability}, ord=${initial
          .order})");
      print("${' ' * initial.order}- ${initial.action}");
      print("-----");
    }
    num initialScore = mainActor.scoreWorld(initial.world);

    Queue<PlanConsequence> open = new Queue<PlanConsequence>();
    final Set<WorldState> closed = new Set<WorldState>();

    if (!firstAction.isApplicable(mainActor, initial.world)) {
      return;
    }

    var initialWorldHash = initial.world.hashCode;
    for (var firstConsequence
        in firstAction.apply(mainActor, initial, initial.world)) {
      if (initial.world.hashCode != initialWorldHash) {
        throw new StateError("Action ${firstAction} modified world state when "
            "producing $firstConsequence.");
      }
      open.add(firstConsequence);
    }

    while (open.isNotEmpty) {
      if (waitFunction != null &&
          new DateTime.now().difference(_latestWait) >
              const Duration(milliseconds: 15)) {
        await waitFunction();
        _latestWait = new DateTime.now();
      }
      var current = open.removeFirst();

      if (current.order >= maxOrder) break;
      if (current.world.situations.isEmpty) {
        // Leaf node of the graph. Make sure to score the world here, too.
        var score = current.world.actors
            .singleWhere((a) => a.id == actorId)
            .scoreWorld(current.world);
        yield new ConsequenceStats(
            score, current.cumulativeProbability, current.order);
        continue;
      }

      var currentActor =
          current.world.currentSituation.getCurrentActor(current.world);
      assert(currentActor != null);

      // This actor is the one we originally started planning for.
      var mainActor = current.world.actors.singleWhere((a) => a.id == actorId);
      assert(mainActor != null);
      bool currentActorIsMain = currentActor == mainActor;

      var score = mainActor.scoreWorld(current.world);
      yield new ConsequenceStats(
          score, current.cumulativeProbability, current.order);

      // DEBUG TODO: remove
      if (DEBUG && firstAction.name.contains(" ")) {
        var score = mainActor.scoreWorld(current.world);
        print("----");
        print(
            "SITUATION = ${current.world.currentSituation.runtimeType}");
        print("MAIN_ACTOR = ${mainActor.name}");
        print("ACTOR = ${currentActor.name} ($currentActorIsMain)");
        print(
            "score=${score - initialScore} * cumProb=${current.cumulativeProbability} "
            "(prob=${current.probability}, ord=${current.order})");
        var ars = current.world.actionRecords.toList()
          ..sort((a, b) => a?.time?.compareTo(b?.time) ?? 1);
        print(ars.map((a) => a.description).join(' <- '));
        //${' ' * current.order}
        // ${current.action} |

      }

      for (ActorAction action
          in _generateAllActions(currentActor, current.world)) {
        if (!action.isApplicable(currentActor, current.world)) continue;
        var consequences = action.apply(currentActor, current, current.world);

        for (PlanConsequence next in consequences) {
          planConsequencesComputed++;

          // Ignore consequences that have a tiny probability of happening.
          var cumulativeProbability = next.cumulativeProbability;
          if (cumulativeProbability < minimumCumulativeProbability) {
            continue;
          }

          // Ignore consequences that have already been visited.
          if (closed.contains(next.world)) {
            continue;
          }

          open.add(next);
        }
      }

      closed.add(current.world);
    }
  }
}

class PlannerRecommendation {
  final List<int> weights;
  final List<ActorAction> actions;

  /// The [weights] have to add up to this number.
  ///
  /// We're using [int] instead of [num] for weights because we want to
  /// avoid rounding errors (when all weights add up to 0.99 and a random
  /// function returns 0.995).
  static const int weightsResolution = 1000;
  static const num _worstOptionWeight = 0.1;

  static num _sum(num a, num b) => a + b;

  PlannerRecommendation(this.actions, this.weights) {
    assert(actions.length == weights.length);
    assert(weights.length == 0 || weights.fold(0, _sum) == weightsResolution);
    // TODO: assert that it's a gradient from best to worst
  }

  factory PlannerRecommendation.fromScores(Map<ActorAction, num> scores) {
    if (scores.isEmpty) {
      print("WARNING: no recommendations");
      return new PlannerRecommendation([], []);
    }
    var actions = scores.keys.toList();
    // Remove impossible actions. TODO: make sure we don't duplicate effort here
    actions.removeWhere((a) => scores[a] == double.NEGATIVE_INFINITY);

    if (actions.length == 1) {
      return new PlannerRecommendation(actions, [weightsResolution]);
    }

    // Make the first action be the best one.
    actions.sort((a, b) => -scores[a].compareTo(scores[b]));

    num minimum = scores.values.fold(double.INFINITY, math.min);
    num maximum = scores.values.fold(double.NEGATIVE_INFINITY, math.max);
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

    var fractionWeights = new List<double>.generate(actions.length, (int i) {
      var action = actions[i];
      var score = scores[action];
      return (score - lowerBound) / totalLength;
    }, growable: false);
    num fractionTotal = fractionWeights.fold(0, _sum);
    List<int> weights = fractionWeights
        .map/*<int>*/((n) => (n / fractionTotal * weightsResolution).round())
        .toList(growable: false);

    // Account for rounding errors by modifying the best option.
    int weightsDifference = weightsResolution - weights.fold(0, _sum);
    weights[weights.length - 1] += weightsDifference;
    return new PlannerRecommendation(actions, weights);
  }

  bool get isEmpty => actions.isEmpty;
}
