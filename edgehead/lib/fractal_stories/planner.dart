import 'dart:collection';

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/util/ai_logger.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:logging/logging.dart';

class ActorPlanner {
  /// We will stop processing a plan path once its leaf node has lower
  /// cumulative probability than this.
  ///
  /// This should be a very small number, like 0.01%, so that we don't
  /// accidentally prevent actors from coming up with some improbable plan
  /// with a huge reward. Note that the cumulative probability as seen
  /// by the planner can be significantly less than the actual probability,
  /// because the planner assumes choices are picked randomly.
  static const num minimumCumulativeProbability = 0.0001;

  static final Logger log = Logger('ActorPlanner');

  final int actorId;

  final PlanConsequence _initial;

  int planConsequencesComputed = 0;

  bool _resultsReady = false;

  final Simulation simulation;

  /// Maps from each performance (that is to be chosen) to a score.
  ///
  /// This is called [_firstActionScores] because the performances are
  /// the first actions that lead to a whole tree of possible other actions
  /// by different players.
  final Map<Performance, ActorScoreChange> _firstActionScores = {};

  ActorPlanner(Actor actor, this.simulation, WorldState initialWorld)
      : actorId = actor.id,
        _initial = PlanConsequence.initial(initialWorld),
        assert(actor.isAnimated);

  /// Computes the combined score for a bunch of consequences.
  ///
  /// This keeps the multi-dimensionality of [ActorScore].
  ActorScoreChange combineScores(
      Iterable<ConsequenceStats> stats, ActorScore initialScore, int maxOrder) {
    log.finest("...");
    log.finest("combining scores");

    // This algorithm merely averages statistics. It was identified by data
    // analysis (see `tool/ai/extract.sh`). The best SQL formula was merely:
    //
    //     avg(self_score_change * cumulative_probability)
    //       - avg(enemy_score_change * cumulative_probability)
    //
    // The algorithm below computes the averages.
    var uplifts = <ActorScoreChange>[];
    for (final consequence in stats) {
      log.finest(() => "  - consequence: $consequence");
      ActorScoreChange uplift = (consequence.score - initialScore) *
          consequence.cumulativeProbability;
      log.finest(() => "    - uplift = $uplift");
      uplifts.add(uplift);
    }
    var average = ActorScoreChange.average(uplifts);

    log.finest(() => "- uplifts average = $average");
    return average;
  }

  Iterable<String> generateTable() sync* {
    int i = 1;
    for (final key in _firstActionScores.keys) {
      yield "$i) ${key.commandPath.join(' -> ')}\t${_firstActionScores[key]}";
      i += 1;
    }
  }

  PlannerRecommendation getRecommendations() {
    assert(_resultsReady);
    if (_firstActionScores.isEmpty) {
      log.warning("There are no actions available for "
          "actorId=$actorId.");
      log.fine(() => "Actions not available for $actorId and $_initial.");
    }
    return PlannerRecommendation(_firstActionScores);
  }

  void plan({required int maxOrder, required int maxConsequences}) {
    _firstActionScores.clear();

    var currentActor = _initial.world.getActorById(actorId);
    var initialScore = currentActor.scoreWorld(_initial.world, simulation);

    log.fine(
        () => "Planning for ${currentActor.name}, initialScore=$initialScore");

    final context =
        ApplicabilityContext(currentActor, simulation, _initial.world);

    for (final performance in simulation.generateAllPerformances(context)) {
      assert(
          performance.action.isApplicable(context, currentActor, simulation,
              _initial.world, performance.object),
          "We got an unapplicable action '${performance.commandPath}' from "
          "Simulation.generateAllPerformances.");

      log.finer(() => "Evaluating action '${performance.commandPath}' "
          "for ${currentActor.name}");

      var consequenceStats = _getConsequenceStats(
              _initial, initialScore, performance, maxOrder, maxConsequences)
          .toList();

      if (consequenceStats.isEmpty) {
        log.finer(() => "- action '${performance.commandPath}' is possible "
            "but we couldn't get to any outcomes while planning. "
            "Scoring with negative infinity.");
        // For example, at the very end of a book, it is possible to have
        // 'no future'.
        _firstActionScores[performance] = const ActorScoreChange.undefined();
        continue;
      }

      log.finer(() => "- action '${performance.commandPath}' leads "
          "to ${consequenceStats.length} "
          "different ConsequenceStats, initialScore=$initialScore");
      var score = combineScores(consequenceStats, initialScore, maxOrder);

      _firstActionScores[performance] = score;

      log.finer(() => "- action '${performance.commandPath}' "
          "was scored $score");
    }

    _resultsReady = true;
  }

  /// Returns the stats for consequences of a given [initial] state after
  /// applying [firstPerformance] and then up to [maxOrder] other steps.
  ///
  /// [firstPerformance] is the action which we evaluate. All following
  /// actions are consequences -- actions taken by the different actors
  /// after the main actor ([actorId]) chooses this path.
  Iterable<ConsequenceStats> _getConsequenceStats(
      PlanConsequence initial,
      ActorScore initialScore,
      Performance<dynamic> firstPerformance,
      int maxOrder,
      int maxConsequences) sync* {
    // Actor object changes during planning, so we need to look up via id.
    var initialActor = initial.world.getActorById(actorId);
    var startTurn = ActorTurn(initialActor, initial.world.time);
    var context = ApplicabilityContext(initialActor, simulation, initial.world);

    log.finer("=====");
    log.finer(() => "_getConsequenceStats for firstAction "
        "'${firstPerformance.commandPath}' of ${initialActor.name}");
    log.finer(() => "- firstAction == $firstPerformance");

    if (!firstPerformance.action.isApplicable(context, initialActor, simulation,
        initial.world, firstPerformance.object)) {
      log.finer("- firstAction not applicable");
      return;
    }

    ActorScore initialScore =
        initialActor.scoreWorld(initial.world, simulation);

    log.finer(() => "- current: initialScore=$initialScore, "
        "cumProb=${initial.cumulativeProbability} "
        "(prob=${initial.probability}, "
        "ord=${initial.order})");
    log.finer(() => "- initial action: "
        "${' ' * initial.order}- ${initial.performance}");

    Queue<PlanConsequence> open = Queue<PlanConsequence>();
    final Set<WorldState> closed = <WorldState>{};

    var initialWorldHash = initial.world.hashCode;
    for (final firstConsequence in firstPerformance.apply(startTurn, 1, initial,
        simulation, initial.world, firstPerformance.object)) {
      if (initial.world.hashCode != initialWorldHash) {
        throw StateError("Action $firstPerformance modified world state when "
            "producing $firstConsequence.");
      }
      open.add(firstConsequence);
    }

    int consequences = 0;

    while (open.isNotEmpty) {
      consequences += 1;

      var current = open.removeFirst();

      log.finest("----");
      log.finest(() => "evaluating a PlanConsequence "
          "of '${current.performance!.commandPath}'");
      log.finest(() => "- situation: "
          "${current.world.currentSituation.runtimeType}");

      if (current.order > maxOrder || consequences > maxConsequences) {
        log.finest(() => "- order (${current.order}) higher than "
            "maximum ($maxOrder), "
            "or consequences ($consequences) higher than maximum");
        log.finest(() {
          String path = current.world.actionHistory.describe();
          return "- how we got here: $path";
        });

        // We can break because we go from lowest order to highest (because
        // new consequences are added to the end of the [open] queue).
        break;
      }

      if (current.world.situations.isEmpty) {
        log.finest("- leaf node: world.situations is empty (end of book)");

        var score = initialActor.scoreWorld(current.world, simulation);

        var stats = ConsequenceStats(
            score, current.cumulativeProbability, current.order);

        log.finest(() => "- $stats");
        log.finest(() => formatAiConsequence(initialActor, initial,
            firstPerformance, current, score, score - initialScore));

        yield stats;
        continue;
      }

      var currentActorTurn = current.world.currentSituation!
          .getNextTurn(simulation, current.world);
      assert(
          !currentActorTurn.isNever,
          "Situation ${current.world.currentSituation} "
          "returned never for getCurrentActor");
      var currentActor = currentActorTurn.actor!;

      // This actor is the one we originally started planning for.
      Actor? mainActor;
      var mainActorDuplicates =
          current.world.actors.where((a) => a.id == actorId).length;
      if (mainActorDuplicates > 1) {
        throw StateError("World has several duplicates of mainActor: "
            "${current.world}");
      } else if (mainActorDuplicates == 0) {
        log.info(() => "mainActor $actorId dies and is removed in world - "
            "will use defaultScoreWhenDead");
      } else {
        mainActor = current.world.actors.singleWhere((a) => a.id == actorId);
      }
      bool currentActorIsMain = currentActor == mainActor;

      log.finest(
          () => "- actor: ${currentActor.name} (isMain==$currentActorIsMain)");
      log.finest(() => "- mainActor: ${mainActor?.name}");

      var score = mainActor?.scoreWorld(current.world, simulation) ??
          Actor.defaultScoreWhenDead;
      var stats =
          ConsequenceStats(score, current.cumulativeProbability, current.order);

      log.finest(() => "- mainActor's score == $stats (initial=$initialScore)");
      log.finest(() {
        String path = current.world.actionHistory.describe();
        return "- how we got here: $path";
      });
      log.finest(() => formatAiConsequence(mainActor, initial, firstPerformance,
          current, score, score - initialScore));

      yield stats;

      log.finest(() => "- generating all actions for ${currentActor.name}");
      var originalCount = open.length;

      final context =
          ApplicabilityContext(currentActor, simulation, current.world);

      final performances =
          simulation.generateAllPerformances(context).toList(growable: false);

      for (final performance in performances) {
        assert(performance.action.isApplicable(context, currentActor,
            simulation, current.world, performance.object));

        var consequences = performance.apply(
            currentActorTurn,
            performances.length,
            current,
            simulation,
            current.world,
            performance.object);

        for (final next in consequences) {
          planConsequencesComputed++;

          // Ignore consequences that have a tiny probability of happening.
          var cumulativeProbability = next.cumulativeProbability;
          if (cumulativeProbability < minimumCumulativeProbability) {
            continue;
          }

          // Normally, we would check whether the consequence world doesn't
          // already exist (in closed). But that is almost impossible
          // (remember: WorldState includes the action history),
          // and the computation required to check involves computing
          // hashCode for the whole WorldState, which is expensive
          // (6.4% CPU time of a long-running test).
          open.add(next);
        }
      }

      log.finest(
          () => "- added ${open.length - originalCount} new PlanConsequences");

      closed.add(current.world);
    }
  }
}
