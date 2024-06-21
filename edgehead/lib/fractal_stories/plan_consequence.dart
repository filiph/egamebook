import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';
import 'package:quiver/core.dart';

/// A container for statistics for a [PlanConsequence].
@immutable
class ConsequenceStats {
  final ActorScore score;
  final num cumulativeProbability;
  final int order;
  const ConsequenceStats(this.score, this.cumulativeProbability, this.order);

  @override
  String toString() => "ConsequenceStats<order=$order, "
      "cumProb=${cumulativeProbability.toStringAsFixed(3)}, "
      "score=$score>";
}

@immutable
class PlanConsequence {
  final WorldState world;
  final Performance? performance;
  final Storyline storyline;

  /// Probability of [performance] leading to this [world].
  ///
  /// For example, an action that has a success chance of 30% will have
  /// 2 plan consequences. One of them will have probability of `0.3` and
  /// will contain the world if the action succeeds, and the other one
  /// will have probability of `0.7` and will contain the consequence
  /// of failing.
  ///
  /// Compare to [cumulativeProbability], which is all the probabilities
  /// in a string of actions combined.
  final double probability;

  /// Probability of the previous [WorldState], just before the [performance].
  final double previousCumulativeProbability;

  /// Probability that this [world] will happen.
  double get cumulativeProbability {
    // This is a heuristic. It assumes that every choice except the first one
    // (which we are planning) is taken randomly. In other words, when
    // an enemy has 4 moves to pick from, we assume that they will pick
    // each one with 25% probability.
    double chanceOfPick = 1 / choiceCount;
    return previousCumulativeProbability * chanceOfPick * probability;
  }

  /// How many [Performance] choices were given to the actor when they
  /// selected this [performance] (which resulted in this [world].
  ///
  /// This is used to compute [cumulativeProbability].
  final int choiceCount;

  final bool isInitial;
  final bool isFailure;
  final bool isSuccess;

  /// How far are we from initial world state.
  final int order;

  /// The main constructor for building consequences.
  ///
  /// It builds the new consequence out of previous consequence ([previous]),
  /// the newly updated [world], the [action] that lead to this world,
  /// the associated [storyline], and the [probability] with which
  /// the previous world turns into this world.
  PlanConsequence(
      WorldState world,
      PlanConsequence? previous,
      Performance<dynamic>? action,
      Storyline storyline,
      double probability,
      int choiceCount,
      {bool isInitial = false,
      bool isFailure = false,
      bool isSuccess = false})
      : this._(
            world,
            action,
            storyline,
            probability,
            previous == null ? 1 : previous.cumulativeProbability,
            choiceCount,
            isInitial,
            isFailure,
            isSuccess,
            previous == null ? 0 : previous.order + 1);

  /// Create the first consequence (the start of planning). It's a consequence
  /// of nothing, with no previous state.
  PlanConsequence.initial(WorldState world)
      : this(
          world,
          null,
          null,
          Storyline(
              referredEntities:
                  world.actors.where((actor) => !actor.isDirector)),
          1.0,
          1,
          isInitial: true,
        );

  /// Returns a copy of the [consequence] with updated [PlanConsequence.world].
  ///
  /// This is useful when correcting the consequence's world after the action
  /// has been applied.
  factory PlanConsequence.withUpdatedWorld(
      PlanConsequence consequence, WorldState world) {
    return PlanConsequence._(
        world,
        consequence.performance,
        Storyline(referredEntities: consequence.storyline.allEntities.values)
          ..concatenate(consequence.storyline),
        consequence.probability,
        consequence.previousCumulativeProbability,
        consequence.choiceCount,
        consequence.isInitial,
        consequence.isFailure,
        consequence.isSuccess,
        consequence.order);
  }

  PlanConsequence._(
      this.world,
      this.performance,
      this.storyline,
      this.probability,
      this.previousCumulativeProbability,
      this.choiceCount,
      this.isInitial,
      this.isFailure,
      this.isSuccess,
      this.order)
      : assert(choiceCount > 0) {
    storyline.time = world.time.millisecondsSinceEpoch ~/ 1000;
  }

  @override
  int get hashCode => hashObjects(<Object?>[
        world,
        performance,
        probability,
        previousCumulativeProbability,
        choiceCount,
        isInitial,
        isFailure,
        isSuccess,
        order,
      ]);

  String get successOrFailure => isSuccess
      ? 'success'
      : (isFailure ? 'failure' : 'nor success nor failure');

  @override
  bool operator ==(Object o) => o is PlanConsequence && hashCode == o.hashCode;

  @override
  String toString() =>
      "PlanConsequence<${world.hashCode}, $world, $performance, $probability, "
      "$choiceCount, $order, ${isSuccess ? 'isSuccess' : ''}>";
}
