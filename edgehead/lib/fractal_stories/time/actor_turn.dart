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

  final Actor? actor;

  final DateTime? time;

  /// Returns a turn of [actor] at the time they stop recovering from
  /// the previous move.
  ///
  /// Provide [notBefore] to limit the [time] of the turn. This is
  /// useful at the beginning of the game, when many actors have their
  /// [Actor.recoveringUntil] set in a distant past.
  factory ActorTurn(Actor actor, DateTime notBefore) {
    assert(notBefore != null);
    var time = actor.recoveringUntil;
    if (time.isBefore(notBefore)) {
      time = notBefore;
    }
    return ActorTurn._(actor, time);
  }

  /// Returns a turn of actor with [actorId].
  factory ActorTurn.byId(int actorId, WorldState world) {
    final actor = world.getActorById(actorId)!;
    return ActorTurn(actor, world.time);
  }

  const ActorTurn._(Actor this.actor, DateTime this.time)
      : assert(actor != null),
        assert(time != null);

  const ActorTurn._never()
      : actor = null,
        time = null;

  /// When `true`, this turn will never happen.
  ///
  /// See [ActorTurn.never].
  bool get isNever => actor == null && time == null;
}
