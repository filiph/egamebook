library stranded.plan_consequence;

import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';
import 'package:quiver/core.dart';

import 'action.dart';
import 'storyline/storyline.dart';
import 'simulation.dart';

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
  final Action action;
  final Storyline storyline;
  final num probability;
  final num cumulativeProbability;

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
  PlanConsequence(WorldState world, PlanConsequence previous, Action action,
      Storyline storyline, num probability,
      {bool isInitial: false, bool isFailure: false, bool isSuccess: false})
      : this._(
            world,
            action,
            storyline,
            probability,
            previous == null
                ? probability
                : probability * previous.cumulativeProbability,
            isInitial,
            isFailure,
            isSuccess,
            previous == null ? 0 : previous.order + 1);

  /// Create the first consequence (the start of planning). It's a consequence
  /// of nothing, with no previous state.
  PlanConsequence.initial(WorldState world)
      : this(world, null, null, new Storyline(), 1.0, isInitial: true);

  /// Returns a copy of the [consequence] with updated [PlanConsequence.world].
  ///
  /// This is useful when correcting the consequence's world after the action
  /// has been applied.
  factory PlanConsequence.withUpdatedWorld(
      PlanConsequence consequence, WorldState world) {
    return new PlanConsequence._(
        world,
        consequence.action,
        new Storyline()..concatenate(consequence.storyline),
        consequence.probability,
        consequence.cumulativeProbability,
        consequence.isInitial,
        consequence.isFailure,
        consequence.isSuccess,
        consequence.order);
  }

  PlanConsequence._(
      this.world,
      this.action,
      this.storyline,
      this.probability,
      this.cumulativeProbability,
      this.isInitial,
      this.isFailure,
      this.isSuccess,
      this.order) {
    storyline.time = world.time;
  }

  @override
  int get hashCode => hashObjects(<Object>[
        world,
        cumulativeProbability,
        action,
        probability,
        order,
        isInitial,
        isFailure,
        isSuccess
      ]);

  String get successOrFailure => isSuccess
      ? 'success'
      : (isFailure ? 'failure' : 'nor success nor failure');

  @override
  bool operator ==(Object o) => o is PlanConsequence && hashCode == o.hashCode;

  @override
  String toString() =>
      "PlanConsequence<${world.hashCode}, $world, $action, $probability, "
      "$order, ${isSuccess ? 'isSuccess' : ''}>";
}
