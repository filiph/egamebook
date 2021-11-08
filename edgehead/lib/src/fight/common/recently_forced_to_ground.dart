// @dart=2.9

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently.dart';

const String fellToGroundCustomEventName = "fell_to_ground";

/// This will return `true` if the actor [a] was recently pushed to the ground.
/// That's useful to know so that they can't immediately stand up.
bool recentlyForcedToGround(Actor a, WorldState world) {
  final latestFall = world.customHistory
      .query(name: fellToGroundCustomEventName, actorId: a.id)
      .latest;
  if (latestFall == null) return false;

  final recency = world.time.difference(latestFall.time);

  return recency <= getRecently(a);
}
