import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

/// This is all the context an action needs to apply itself. It is provided
/// to [Action.applySuccess] and [Action.applyFailure] (and [ApplyFunction]s
/// in general).
///
/// [outputStoryline] should only be used to
/// add new reports ([Storyline.add] and [Actor.report]).
///
/// [actor] is the perpetrator of the action. The [target] is the entity that
/// the action is directed to. It can be `null`.
@immutable
class ActionContext extends ApplicabilityContext {
  /// This is the object which should be mutated in order to provide the
  /// result of the action.
  final WorldStateBuilder outputWorld;

  /// This is set to the current action as that action is being applied.
  ///
  /// This is so that, for example, descriptions of Rooms can access this
  /// information and provide text according to how the Room is being reached.
  final Action currentAction;

  /// This is the output of [Action.getSuccessChance]. It is possible to
  /// check this for reasons that we can report in [Action.applySuccess]
  /// or [Action.applyFailure].
  final ReasonedSuccessChance successChance;

  /// The [Storyline] instance that actions can use to report what happened.
  final Storyline outputStoryline;

  const ActionContext(
      this.currentAction,
      Actor actor,
      Simulation simulation,
      WorldState world,
      this.outputWorld,
      this.outputStoryline,
      this.successChance)
      : super(actor, simulation, world);

  /// Creates a copy of [other] with updated values from [other.outputWorld].
  ActionContext.updatedFrom(ActionContext other)
      : this(
            other.currentAction,
            other.outputWorld.getActorById(other.actor.id),
            other.simulation,
            other.outputWorld.build(),
            other.outputWorld,
            other.outputStoryline,
            other.successChance);

  /// Same as [ApplicabilityContext.player], except this getter gets
  /// the most recent player (updates in [outputWorld] count).
  @override
  Actor get player {
    return outputWorld.getActorById(Actor.playerId);
  }
}

/// This is all the context an action (or rule) needs to see if it's applicable.
///
/// In contrast to [ActionContext], this class doesn't have any "output"
/// members, and is completely, recursively immutable.
@immutable
class ApplicabilityContext {
  final Actor actor;

  final Simulation simulation;

  final WorldState world;

  const ApplicabilityContext(this.actor, this.simulation, this.world);

  /// A convenience accessor of the actor with [Actor.playerId].
  ///
  /// This throws if there is no actor with that id.
  Actor get player {
    return world.getActorById(Actor.playerId);
  }
}
