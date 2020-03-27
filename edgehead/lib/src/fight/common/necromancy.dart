import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';

bool isFollowedByAnUndead(ApplicabilityContext context, Actor necromancer) {
  final party = getPartyOf(necromancer, context.simulation, context.world);
  return party.any((actor) => actor.anatomy.isUndead);
}

/// Takes a dead [corpse] and transforms it into an undead [Actor], assigned
/// to the [necromancer]'s team.
///
/// Also heals vital body parts (torso, neck), so that the resulting creature
/// can function.
Actor raiseDead(Actor necromancer, Actor corpse) {
  final corpseBuilder = corpse.toBuilder();

  String adjective, name;

  if (corpse.nameIsProperNoun) {
    // Tamara become "undead Tamara" (but since we mostly don't use adjectives
    // unless necessary, she will be reported as "Tamara").
    adjective = 'undead';
    name = corpse.name;
  } else {
    if (corpse.adjective != null) {
      // The "goblin captain" will become "the goblin captain undead".
      adjective = '${corpse.adjective} ${corpse.name}';
      name = 'undead';
    } else {
      // A goblin will become "the goblin undead".
      adjective = corpse.name;
      name = 'undead';
    }
  }

  assert(name != null);
  assert(adjective != null);

  corpseBuilder
    ..name = name
    ..adjective = adjective
    ..anatomy.isUndead = true
    ..hitpoints = 1
    ..pose = corpse.anatomy.hasCrippledLegs ? Pose.onGround : corpse.poseMax
    ..isConfused = false
    ..npc.followingActorId = necromancer.id
    ..team = necromancer.team.toBuilder();

  // Heal all vital parts.
  deepReplaceBodyPart(
    corpseBuilder,
    (part) => part.isVital,
    (b) {
      if (b.hitpoints > 0) return;
      b.hitpoints = 1;
    },
  );

  return corpseBuilder.build();
}

void reportRaiseDead(Actor a, Storyline s, Actor corpse) {
  final preposition =
      a.anatomy.isBlind ? "in the general direction of" : "over";

  a.report(s, "<subject> raise<s> <subject's> hands $preposition <object>",
      object: corpse);

  bool reportedSomething = false;

  // We cannot use Actor.isBlind because that only works for animated actors,
  // not corpses. See Actor.isBlind for more info.
  final functioningEyesBeforeDeath = corpse.anatomy.allParts
      .where((part) =>
          part.function == BodyPartFunction.vision && part.isAnimatedAndActive)
      .length;
  if (functioningEyesBeforeDeath > 0) {
    final eyeOrEyes = functioningEyesBeforeDeath > 1 ? "eyes" : "eye";
    corpse.report(s, "<subject> open<s> <subject's> $eyeOrEyes");
    reportedSomething = true;
  }

  if (!corpse.anatomy.hasCrippledLegs) {
    corpse.report(s, "<subject> stand<s> up");
    reportedSomething = true;
  }

  if (!reportedSomething) {
    corpse.report(s, "<subject> jolt<s> with sudden muscle movement");
  }
}
