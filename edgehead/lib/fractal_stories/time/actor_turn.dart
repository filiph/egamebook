import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

/// A tuple of [actor] and [time]. This signifies the time that an [Actor]
/// can move next.
class ActorTurn {
  /// Constructs a turn that will never happen.
  ///
  /// Implementations can return when they would normally return `null`.
  /// For example, this can be returned by a FightSituation that has
  /// no surviving actors.
  static const ActorTurn never = ActorTurn._never();
  final Actor actor;

  final DateTime time;

  const ActorTurn(this.actor, this.time)
      : assert(actor != null),
        assert(time != null);

  /// Returns a turn of actor with [actorId], at [WorldState.time].
  factory ActorTurn.nowById(int actorId, WorldState world) {
    final actor = world.getActorById(actorId);
    final now = world.time;
    return ActorTurn(actor, now);
  }

  const ActorTurn._never()
      : actor = null,
        time = null;

  /// When `true`, this turn will never happen.
  ///
  /// See [ActorTurn.never].
  bool get isNever => actor == null && time == null;
}
