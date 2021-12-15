import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';

/// Puts [actor] on the ground and records [fellToGroundCustomEventName].
///
/// For player and on their first fall, it also warns about the dangers
/// of lying on the ground during combat.
void makeActorFall(
    WorldState originalWorld, WorldStateBuilder w, Storyline s, Actor actor) {
  if (actor.isPlayer &&
      !originalWorld.customHistory
          .query(name: fellToGroundCustomEventName, actorId: actor.id)
          .hasHappened) {
    // This is the first time the player has fallen. Make sure she understands
    // that being on the ground is a terrible idea.
    s.add(
        "This is bad. If there is one thing I know about sword fighting, "
        "it is that lying on the ground is considered a great disadvantage.",
        isRaw: true);
  }

  w.updateActorById(actor.id, (b) => b.pose = Pose.onGround);
  w.recordCustom(fellToGroundCustomEventName, actor: actor);
}
