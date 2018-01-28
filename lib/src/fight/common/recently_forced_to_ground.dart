import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/kick_to_ground.dart';
import 'package:edgehead/src/fight/actions/pound.dart';
import 'package:edgehead/src/fight/leap/actions/finish_leap.dart';
import 'package:edgehead/src/fight/punch/actions/finish_punch.dart';

/// This will return `true` if the actor [a] was recently pushed to the ground.
/// That's useful to know so that they can't immediately stand up.
bool recentlyForcedToGround(Actor a, WorldState world) {
  var sweepRecency = world.timeSinceLastActionRecord(
      actionName: KickToGround.className, sufferer: a, wasSuccess: true);
  // We're using 2 here because it's safer. Sometimes, an action by another
  // actor is silent, so with 1 we would still get 'you sweep his legs, he
  // stands up'.
  if (sweepRecency != null && sweepRecency <= 2) {
    return true;
  }
  // If this actor was just pounded to ground, do not let him stand up.
  var poundRecency = world.timeSinceLastActionRecord(
      actionName: Pound.className, sufferer: a, wasSuccess: true);
  if (poundRecency != null && poundRecency <= 2) {
    return true;
  }
  // If this actor was just punched to ground, do not let him stand up.
  var punchRecency = world.timeSinceLastActionRecord(
      actionName: FinishPunch.className, sufferer: a, wasSuccess: true);
  if (punchRecency != null && punchRecency <= 2) {
    return true;
  }
  // If this actor was just successfully leaped at, do not let him stand up.
  var leapRecency = world.timeSinceLastActionRecord(
      actionName: FinishLeap.className, sufferer: a, wasSuccess: true);
  if (leapRecency != null && leapRecency <= 2) {
    return true;
  }
  return false;
}
