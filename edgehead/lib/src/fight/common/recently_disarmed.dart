import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

const String disarmedCustomEventName = "was_disarmed";

/// This will return `true` if the actor [a] was recently pushed to the ground.
/// That's useful to know so that they can't immediately stand up.
bool recentlyDisarmed(Actor a, WorldState world) {
  final latestDisarmament =
      world.customHistory.query(name: disarmedCustomEventName, actor: a).latest;
  if (latestDisarmament == null) return false;

  final recency = world.time.difference(latestDisarmament.time).inSeconds;

  // We're using 2 here because it's safer. Sometimes, an action by another
  // actor is silent, so with 1 we would still get 'you sweep his legs, he
  // stands up'.
  return recency <= 2;
}
