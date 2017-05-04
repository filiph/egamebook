library stranded.planner;

import 'dart:async';
import 'dart:collection';

import 'action.dart';
import 'actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:logging/logging.dart';
import 'plan_consequence.dart';
import 'world.dart';

class ActorPlanner {
  final Logger log = new Logger('ActorPlanner');

  /// We will stop processing a plan path once its leaf node has lower
  /// cumulative probability than this.
  static const num minimumCumulativeProbability = 0.05;

  /// Only consequences with cumulative probability over this threshold
  /// will be considered for best cases.
  static const num bestCaseProbabilityThreshold = 0.15;

  static DateTime _latestWait = new DateTime.now();
  final int actorId;

  final PlanConsequence _initial;
  int planConsequencesComputed = 0;

  bool _resultsReady = false;

  final Map<Action, ActorScoreChange> firstActionScores = new Map();

  ActorPlanner(Actor actor, WorldState initialWorld)
      : actorId = actor?.id,
        _initial = new PlanConsequence.initial(initialWorld) {
    if (actor == null) {
      throw new ArgumentError("Called ActorPlanner with actor == null. "
          "That may mean that a Situation returns getCurrentActor as null. "
          "Some action that you added should make sure it removes the "
          "Situation. "
          "World: $initialWorld. "
          "Situation: ${initialWorld.currentSituation}");
    }
    assert(actor.isAlive);
  }

  /// Computes the combined score for a bunch of consequences.
  ///
  /// TODO: allow to personalize this (for example, optimistic characters
  /// only take `isSuccess == true` consequences into account).
  ActorScoreChange combineScores(
      Iterable<ConsequenceStats> stats, ActorScore initialScore, int maxOrder) {
    log.finest("...");
    log.finest("combining scores");

    var uplifts = <ActorScoreChange>[];

    ConsequenceStats _bestCase;

    num combineForBestCase(ActorScore score) =>
        score.teamPreservation - score.enemy;

    for (var consequence in stats) {
      log.finest(() => "  - consequence: $consequence");
      if (consequence.cumulativeProbability > bestCaseProbabilityThreshold) {
        if (_bestCase == null) {
          log.finest("    - first _bestCase");
          _bestCase = consequence;
        } else if (combineForBestCase(consequence.score) >
            combineForBestCase(_bestCase.score)) {
          _bestCase = consequence;
          log.finest("    - new _bestCase");
        }
      }

      ActorScoreChange uplift = (consequence.score - initialScore) *
          consequence.cumulativeProbability;
      log.finest(() => "    - uplift = $uplift");
      uplifts.add(uplift);
    }

    // Look at average to see what kind of effect, on average, this action
    // will have.
    var average = new ActorScoreChange.average(uplifts);

    // Also look at the best possible outcome. If we only used the average,
    // an action that leads to a lot of bad outcomes but one great one
    // (presumably the one the actor has in mind) would receive a bad score.
    var bestUpside = _bestCase == null
        ? const ActorScoreChange.zero()
        : (_bestCase.score - initialScore);
    ActorScoreChange best = bestUpside / _bestCase?.order ?? 1;

    log.finest("- uplifts average = $average");
    log.finest("- best = $best");

    var result = best + average;

    log.finest("- result = $result");
    return result;
  }

  Iterable<String> generateTable() sync* {
    int i = 1;
    for (var key in firstActionScores.keys) {
      yield "$i) ${key.command}\t${firstActionScores[key]}";
      i += 1;
    }
  }

  PlannerRecommendation getRecommendations() {
    assert(_resultsReady);
    if (firstActionScores.isEmpty) {
      log.warning("There are no actions available for "
          "actorId=$actorId.");
      log.fine("Actions not available for $actorId and $_initial.");
    }
    return new PlannerRecommendation(firstActionScores);
  }

  Future<Null> plan(
      {int maxOrder: 10,
      int maxConsequences: 50,
      Future<Null> waitFunction()}) async {
    firstActionScores.clear();

    var currentActor =
        _initial.world.actors.singleWhere((a) => a.id == actorId);
    var initialScore = currentActor.scoreWorld(_initial.world);

    log.fine("Planning for ${currentActor.name}, initialScore=$initialScore");

    for (var action in _generateAllActions(currentActor, _initial.world)) {
      log.finer(() => "Evaluating action '${action.command}' "
          "for ${currentActor.name}");

      if (!action.isApplicable(currentActor, _initial.world)) {
        log.finer(() => "- action '${action.command}' isn't applicable");
        // Bail early if action isn't possible at all.
        continue;
      }
      var consequenceStats = await _getConsequenceStats(
              _initial, action, maxOrder, maxConsequences, waitFunction)
          .toList();

      if (consequenceStats.isEmpty) {
        log.finer(() => "- action '${action.command}' is possible but we "
            "couldn't get to any outcomes while planning. "
            "Scoring with negative infinity.");
        // For example, at the very end of a book, it is possible to have
        // 'no future'.
        firstActionScores[action] = const ActorScoreChange.undefined();
        continue;
      }

      log.finer(() => "- action '${action.command}' leads "
          "to ${consequenceStats.length} "
          "different ConsequenceStats, initialScore=$initialScore");
      var score = combineScores(consequenceStats, initialScore, maxOrder);

      firstActionScores[action] = score;

      log.finer(() => "- action '${action.command}' was scored $score");
    }

    _resultsReady = true;
  }

  Iterable<Action> _generateAllActions(Actor actor, WorldState world) sync* {
    yield* world.currentSituation.actions;
    for (var builder in world.currentSituation.actionGenerators) {
      if (builder is EnemyTargetActionBuilder) {
        yield* generateEnemyTargetActions(actor, world, builder);
      } else if (builder is ExitActionBuilder) {
        yield* generateExitActions(actor, world, builder);
      } else {
        throw new StateError("$builder is not one of the supported ones");
      }
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
        "'${firstAction.command}' of ${mainActor.name}");
    log.finer(() => "- firstAction == $firstAction");

    if (!firstAction.isApplicable(mainActor, initial.world)) {
      log.finer("- firstAction not applicable");
      return;
    }

    ActorScore initialScore = mainActor.scoreWorld(initial.world);

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
        throw new StateError("Action $firstAction modified world state when "
            "producing $firstConsequence.");
      }
      open.add(firstConsequence);
    }

    int consequences = 0;

    while (open.isNotEmpty) {
      consequences += 1;

      if (waitFunction != null &&
          new DateTime.now().difference(_latestWait) >
              const Duration(milliseconds: 5)) {
        await waitFunction();
        _latestWait = new DateTime.now();
      }
      var current = open.removeFirst();

      log.finest("----");
      log.finest(() => "evaluating a PlanConsequence "
          "of '${current.action.command}'");
      log.finest(() => "- situation: "
          "${current.world.currentSituation.runtimeType}");

      if (current.order > maxOrder || consequences > maxConsequences) {
        log.finest(() => "- order (${current.order}) higher than "
            "maximum ($maxOrder), "
            "or consequences ($consequences) higher than maximum");
        log.finest(() {
          String path = current.world.actionRecords
              .map((a) => a.description)
              .join(' <- ');
          return "- how we got here: $path";
        });

        // We can break because we go from lowest order to highest (because
        // new consequences are added to the end of the [open] queue).
        break;
      }

      if (current.world.situations.isEmpty) {
        log.finest("- leaf node: world.situations is empty (end of book)");

        var mainActor = current.world.actors
            .firstWhere((a) => a.id == actorId, orElse: () => null);

        if (mainActor == null) {
          log.finest("- this actor ($actorId) has been removed");
          continue;
        }

        var score = mainActor.scoreWorld(current.world);

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
      Actor mainActor;
      var mainActorDuplicates =
          current.world.actors.where((a) => a.id == actorId).length;
      if (mainActorDuplicates > 1) {
        throw new StateError("World has several duplicates of mainActor: "
            "${current.world}");
      } else if (mainActorDuplicates == 0) {
        log.info("mainActor $actorId dies and is removed in world - "
            "will use defaultScoreWhenDead");
      } else {
        mainActor = current.world.actors.singleWhere((a) => a.id == actorId);
      }
      bool currentActorIsMain = currentActor == mainActor;

      log.finest("- actor: ${currentActor.name} (isMain==$currentActorIsMain)");
      log.finest("- mainActor: ${mainActor?.name}");

      var score =
          mainActor?.scoreWorld(current.world) ?? Actor.defaultScoreWhenDead;
      var stats = new ConsequenceStats(
          score, current.cumulativeProbability, current.order);

      log.finest(() => "- mainActor's score == $stats (initial=$initialScore)");
      log.finest(() {
        String path =
            current.world.actionRecords.map((a) => a.description).join(' <- ');
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
