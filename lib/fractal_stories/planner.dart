library stranded.planner;

import 'dart:async';
import 'dart:collection';
import 'dart:math' as math;

import 'action.dart';
import 'actor.dart';
import 'package:logging/logging.dart';
import 'plan_consequence.dart';
import 'world.dart';

class ActorPlanner {
  final Logger log = new Logger('ActorPlanner');

  /// We will stop processing a plan path once its leaf node has lower
  /// cumulative probability than this.
  static const minimumCumulativeProbability = 0.05;

  /// Only consequences with cumulative probability over this threshold
  /// will be considered for best cases.
  static const num bestCaseProbabilityThreshold = 0.15;

  static DateTime _latestWait = new DateTime.now();
  final int actorId;

  final PlanConsequence _initial;
  int planConsequencesComputed = 0;

  bool _resultsReady = false;

  final Map<Action, num> firstActionScores = new Map();

  ActorPlanner(Actor actor, WorldState initialWorld)
      : actorId = actor.id,
        _initial = new PlanConsequence.initial(initialWorld);

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

    log.finest("...");
    log.finest("combining scores");

    var uplifts = <num>[];

    ConsequenceStats _bestCase;

    for (var consequence in stats) {
      log.finest(() => "  - consequence: $consequence");
      if (consequence.cumulativeProbability > bestCaseProbabilityThreshold) {
        if (_bestCase == null) {
          log.finest("    - first _bestCase");
          _bestCase = consequence;
        } else if (consequence.score > _bestCase.score) {
          _bestCase = consequence;
          log.finest("    - new _bestCase");
        }
      }

      var uplift = (consequence.score - initialScore) *
          consequence.cumulativeProbability;
      log.finest(() => "    - uplift = $uplift");
      uplifts.add(uplift);
    }

    // Look at average to see what kind of effect, on average, this action
    // will have.
    var average = uplifts.fold(0, (a, b) => a + b) / uplifts.length;

    // Also look at the best possible outcome. If we only used the average,
    // an action that leads to a lot of bad outcomes but one great one
    // (presumably the one the actor has in mind) would receive a bad score.
    var bestUpside = _bestCase == null ? 0 : (_bestCase.score - initialScore);
    var best = bestUpside / _bestCase?.order ?? 1;

    log.finest("- uplifts average = $average");
    log.finest("- best = $best");

    var result = best + average;

    log.finest("- result = $result");
    assert(!result.isNaN);
    assert(!result.isInfinite);
    return result;
  }

  Iterable<String> generateTable() sync* {
    int i = 1;
    for (var key in firstActionScores.keys) {
      yield "$i) ${key.name}\t${firstActionScores[key].toStringAsFixed(2)}";
      i += 1;
    }
  }

  Action getBest() {
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

  PlannerRecommendation getRecommendations() {
    assert(_resultsReady);
    if (firstActionScores.isEmpty) {
      log.warning("There are no actions available for "
          "actorId=$actorId.");
      log.fine("Actions not available for $actorId and $_initial.");
    }
    return new PlannerRecommendation.fromScores(firstActionScores);
  }

  Future<Null> plan(
      {int maxOrder: 10,
      int maxConsequences: 100,
      Future<Null> waitFunction()}) async {
    firstActionScores.clear();

    var currentActor =
        _initial.world.actors.singleWhere((a) => a.id == actorId);
    var initialScore = currentActor.scoreWorld(_initial.world);

    log.fine("Planning for ${currentActor.name}, initialScore=$initialScore");

    for (var action in _generateAllActions(currentActor, _initial.world)) {
      log.finer("Evaluating action '${action.name}' for ${currentActor.name}");

      if (!action.isApplicable(currentActor, _initial.world)) {
        log.finer("- action '${action.name}' isn't applicable");
        // Bail early if action isn't possible at all.
        continue;
      }
      var consequenceStats = await _getConsequenceStats(
              _initial, action, maxOrder, maxConsequences, waitFunction)
          .toList();

      if (consequenceStats.isEmpty) {
        log.finer("- action '${action.name}' is possible but we couldn't get "
            "to any outcomes while planning. Scoring with negative infinity.");
        firstActionScores[action] = double.NEGATIVE_INFINITY;
        continue;
      }

      log.finer("- action '${action.name}' leads to ${consequenceStats.length} "
          "different ConsequenceStats, initialScore=$initialScore");
      var score = combineScores(consequenceStats, initialScore, maxOrder);
      assert(!score.isNaN);

      firstActionScores[action] = score;

      log.finer("- action '${action.name}' was scored $score");
    }

    _resultsReady = true;
  }

  Iterable<Action> _generateAllActions(Actor actor, WorldState world) sync* {
    yield* world.currentSituation.actions;
    for (var builder in world.currentSituation.actionGenerators) {
      assert(builder is EnemyTargetActionBuilder);
      yield* generateEnemyTargetActions(actor, world, builder);
    }
  }

  /// Returns the stats for consequences of a given [initial] state after
  /// applying [firstAction] and then up to [maxOrder] other steps.
  ///
  /// [firstAction] is the action which we evaluate. All following actions are
  /// consequences -- actions taken by the different actors after the main actor
  /// ([actorId]) chooses this path.
  Stream<ConsequenceStats> _getConsequenceStats(
      PlanConsequence initial,
      Action firstAction,
      int maxOrder,
      int maxConsequences,
      Future<Null> waitFunction()) async* {
    // Actor object changes during planning, so we need to look up via id.
    var mainActor = initial.world.actors.singleWhere((a) => a.id == actorId);

    log.finer("=====");
    log.finer(() => "_getConsequenceStats for firstAction "
        "'${firstAction.name}' of ${mainActor.name}");
    log.finer(() => "- firstAction == $firstAction");

    if (!firstAction.isApplicable(mainActor, initial.world)) {
      log.finer("- firstAction not applicable");
      return;
    }

    num initialScore = mainActor.scoreWorld(initial.world);

    log.finer(() => "- current: initialScore=$initialScore, "
        "cumProb=${initial.cumulativeProbability} "
        "(prob=${initial.probability}, "
        "ord=${initial.order})");
    log.finer(() => "- initial action: "
        "${' ' * initial.order}- ${initial.action}");

    Queue<PlanConsequence> open = new Queue<PlanConsequence>();
    final Set<WorldState> closed = new Set<WorldState>();

    var initialWorldHash = initial.world.hashCode;
    for (var firstConsequence
        in firstAction.apply(mainActor, initial, initial.world)) {
      if (initial.world.hashCode != initialWorldHash) {
        throw new StateError("Action ${firstAction} modified world state when "
            "producing $firstConsequence.");
      }
      open.add(firstConsequence);
    }

    int consequences = 0;

    while (open.isNotEmpty) {
      consequences += 1;

      if (waitFunction != null &&
          new DateTime.now().difference(_latestWait) >
              const Duration(milliseconds: 10)) {
        await waitFunction();
        _latestWait = new DateTime.now();
      }
      var current = open.removeFirst();

      log.finest("----");
      log.finest(() => "evaluating a PlanConsequence "
          "of '${current.action.name}'");
      log.finest(() => "- situation: "
          "${current.world.currentSituation.runtimeType}");

      if (current.order > maxOrder || consequences > maxConsequences) {
        log.finest(() => "- order (${current.order}) higher than "
            "maximum ($maxOrder), "
            "or consequences ($consequences) higher than maximum");
        log.finest(() {
          var ars = current.world.actionRecords.toList()
            ..sort((a, b) => a?.time?.compareTo(b?.time) ?? 1);
          String path = ars.map((a) => a.description).join(' <- ');
          return "- how we got here: $path";
        });

        // We can break because we go from lowest order to highest (because
        // new consequences are added to the end of the [open] queue).
        break;
      }

      if (current.world.situations.isEmpty) {
        log.finest("- leaf node: world.situations is empty (end of book)");

        var score = current.world.actors
            .singleWhere((a) => a.id == actorId)
            .scoreWorld(current.world);

        var stats = new ConsequenceStats(
            score, current.cumulativeProbability, current.order);

        log.finest(() => "- $stats");

        yield stats;
        continue;
      }

      var currentActor =
          current.world.currentSituation.getCurrentActor(current.world);
      assert(currentActor != null);

      // This actor is the one we originally started planning for.
      var mainActor = current.world.actors.singleWhere((a) => a.id == actorId);
      bool currentActorIsMain = currentActor == mainActor;

      log.finest("- actor: ${currentActor.name} (isMain==$currentActorIsMain)");
      log.finest("- mainActor: ${mainActor.name}");

      var score = mainActor.scoreWorld(current.world);
      var stats = new ConsequenceStats(
          score, current.cumulativeProbability, current.order);

      log.finest(() => "- mainActor's score == $stats (initial=$initialScore)");
      log.finest(() {
        var ars = current.world.actionRecords.toList()
          ..sort((a, b) => a?.time?.compareTo(b?.time) ?? 1);
        String path = ars.map((a) => a.description).join(' <- ');
        return "- how we got here: $path";
      });

      yield stats;

      log.finest("- generating all actions for ${currentActor.name}");
      var originalCount = open.length;
      for (Action action in _generateAllActions(currentActor, current.world)) {
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
            // TODO: is this a bug? shouldn't we add score even for visited worlds?
            continue;
          }

          open.add(next);
        }
      }

      log.finest("- added ${open.length - originalCount} new PlanConsequences");

      closed.add(current.world);
    }
  }
}

class PlannerRecommendation {
  static final Logger log = new Logger('PlannerRecommendation');

  /// The [weights] have to add up to this number.
  ///
  /// We're using [int] instead of [num] for weights because we want to
  /// avoid rounding errors (when all weights add up to 0.99 and a random
  /// function returns 0.995).
  static const int weightsResolution = 1000;
  static const num _worstOptionWeight = 0.1;

  final List<int> weights;
  final List<Action> actions;

  PlannerRecommendation(this.actions, this.weights) {
    assert(actions.length == weights.length);
    assert(weights.length == 0 || weights.fold(0, _sum) == weightsResolution);
    // TODO: assert that it's a gradient from best to worst
  }

  factory PlannerRecommendation.fromScores(Map<Action, num> scores) {
    if (scores.isEmpty) {
      log.warning("Created with no recommendations.");
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

  static num _sum(num a, num b) => a + b;
}
