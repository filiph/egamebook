import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';

bool isFollowedByAnUndead(ApplicabilityContext context, Actor necromancer) {
  final party = getPartyOf(necromancer, context.simulation, context.world);
  return party.any((actor) => actor.anatomy.isUndead);
}

/// Takes a dead [corpse] and transforms it into an undead [Actor], assigned
/// to the [necromancer]'s team.
///
/// Also heals vital body parts (torso, neck), so that the resulting creature
/// can function.
Actor turnUndead(Actor necromancer, Actor corpse) {
  final corpseBuilder = corpse.toBuilder();

  corpseBuilder
    // TODO: Fix this in Storyline because otherwise all actors that have
    //       been turned undead at any point will have the same name.
    ..name = 'undead'
    ..nameIsProperNoun = false
    ..anatomy.isUndead = true
    ..hitpoints = 1
    ..pose = corpse.anatomy.hasCrippledLegs ? Pose.onGround : corpse.poseMax
    ..isConfused = false
    ..npc.followingActorId = necromancer.id
    ..team = necromancer.team.toBuilder();

  // Heal all vital parts.
  deepReplaceBodyPart(
    corpseBuilder.build(),
    corpseBuilder,
    (part) => part.isVital,
    (b, isDescendant) {
      if (isDescendant) {
        // Ignore descendants, they aren't affected.
        return;
      }
      if (b.hitpoints > 0) return;
      b.hitpoints = 1;
    },
  );

  return corpseBuilder.build();
}
