import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently.dart';

const String disarmedCustomEventName = "was_disarmed";

/// This will return `true` if the actor [a] was recently disarmed.
/// That's useful to know so that they can't immediately get the weapon.
bool recentlyDisarmed(Actor a, WorldState world) {
  final latestDisarmament = world.customHistory
      .query(name: disarmedCustomEventName, actorId: a.id)
      .latest;
  if (latestDisarmament == null) return false;

  final recency = world.time.difference(latestDisarmament.time);

  return recency <= getRecently(a);
}
