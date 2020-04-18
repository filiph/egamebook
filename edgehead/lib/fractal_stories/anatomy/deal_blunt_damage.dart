import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/get_weapons_held.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/pose.dart';

/// All body parts can be bruised by a blunt weapon, but the only hitting
/// the following body parts will result in reduced hitpoints or disabling
/// of a body part.
///
/// For example, with a branch attack, hitting the legs will make the enemy
/// fall down. But hitting the head will actually release the head's hitpoints,
/// leading to death.
const bodyPartsVulnerableToBluntHits = [
  BodyPartDesignation.head,
  BodyPartDesignation.neck,
  BodyPartDesignation.teeth,
];

WeaponAssaultResult executeBluntHit(
    Actor target, Item weapon, BodyPartDesignation designation) {
  assert(target.hitpoints > 0);
  assert(weapon.damageCapability.isBlunt);
  assert(designation != null);

  final part = target.anatomy.findByDesignation(designation);
  if (part == null) {
    throw ArgumentError("$designation not found in $target");
  }

  // We only have one type of success. No switch statement necessary
  // like in executeSlashingHit.
  return _addMajorBluntWound(target, part, weapon);
}

WeaponAssaultResult _addMajorBluntWound(
    Actor target, BodyPart designated, Item weapon) {
  assert(designated.hitpoints >= 0);

  final vulnerableBodyPart =
      bodyPartsVulnerableToBluntHits.contains(designated.designation);

  if (vulnerableBodyPart && designated.hitpoints == 1 && !target.isInvincible) {
    return _disableByBluntHit(target, designated, weapon);
  }

  final ActorBuilder victim = target.toBuilder();

  // When a body part is vital and vulnerable to blunt hits, each major blunt
  // hit removes actor's hitpoint.
  if (vulnerableBodyPart &&
      designated.isVital &&
      designated.isAnimated &&
      !target.isInvincible) {
    victim.hitpoints -= 1;
  }

  // Add a major blunt hit to the body part that was hit.
  deepReplaceBodyPart(
    victim,
    (part) => part.id == designated.id,
    (b) {
      b.bluntHitsCount += 1;
      if (vulnerableBodyPart && b.hitpoints > 0 && !target.isInvincible) {
        b.hitpoints -= 1;
      }
    },
  );

  return WeaponAssaultResult(
    victim.build(),
    designated,
    severedPart: null,
    slashSuccessLevel: null,
    // Disabling hits are covered by an if statement above.
    disabled: false,
    willFall: false,
    willDropCurrentWeapon: false,
    wasBlinding: false,
  );
}

/// A copy of `_disableBySlash`.
WeaponAssaultResult _disableByBluntHit(
    Actor target, BodyPart bodyPart, Item weapon) {
  final ActorBuilder victim = target.toBuilder();

  if (bodyPart.isVital || bodyPart.hasVitalDescendants) {
    victim.hitpoints = 0;
  }

  bool startedBlind = target.anatomy.isBlind;

  deepReplaceBodyPart(
    victim,
    (part) => part.id == bodyPart.id,
    (b) {
      b.bluntHitsCount += 1;
      b.hitpoints = 0;
    },
  );

  bool victimWillFall = false;
  if (target.pose != Pose.onGround &&
      // Disabling any body part to which a mobile body part is recursively
      // attached makes the target fall down.
      //
      // The only realistic exception would be the torso (to which _everything_
      // is recursively attached). But that doesn't matter because if we
      // disable the torso, the target dies and falls anyway.
      bodyPart
          .getDescendantParts()
          .any((part) => part.function == BodyPartFunction.mobile)) {
    victimWillFall = true;
  }

  final builtVictim = victim.build();

  return WeaponAssaultResult(
    builtVictim,
    bodyPart,
    willFall: victimWillFall,
    disabled: true,
    willDropCurrentWeapon:
        isWeaponHeld(target.currentWeapon, bodyPart, target.inventory),
    severedPart: null,
    slashSuccessLevel: null,
    wasBlinding: builtVictim.isAnimatedAndActive &&
        !startedBlind &&
        builtVictim.anatomy.isBlind,
  );
}
