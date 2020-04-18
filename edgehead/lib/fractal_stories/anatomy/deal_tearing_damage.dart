import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/get_weapons_held.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/pose.dart';

WeaponAssaultResult executeTearingHit(
    Actor target, Item weapon, BodyPartDesignation designation) {
  assert(target.hitpoints > 0);
  assert(weapon.damageCapability.isTearing);
  assert(designation != null);

  final part = target.anatomy.findByDesignation(designation);
  if (part == null) {
    throw ArgumentError("$designation not found in $target");
  }

  // We only have one type of success. No switch statement necessary
  // like in executeSlashingHit.

  return _addMajorTearingWound(target, part, weapon);
}

WeaponAssaultResult _addMajorTearingWound(
    Actor target, BodyPart designated, Item weapon) {
  assert(designated.hitpoints >= 0);

  if (designated.hitpoints == 1 && !target.isInvincible) {
    return _disableByTear(target, designated, weapon);
  }

  final ActorBuilder victim = target.toBuilder();

  // When a body part is vital, each major thrust removes one actor's hitpoint.
  if (designated.isVital && designated.isAnimated && !target.isInvincible) {
    victim.hitpoints -= 1;
  }

  // Add a major cut to the body part that was hit.
  deepReplaceBodyPart(
    victim,
    (part) => part.id == designated.id,
    (b) {
      b.majorCutsCount += 1;
      if (b.hitpoints > 0 && !target.isInvincible) {
        b.hitpoints -= 1;
      }
    },
  );

  return WeaponAssaultResult(
    victim.build(),
    designated,
    severedPart: null,
    slashSuccessLevel: null,
    // Disabling thrusts are covered by an if statement above.
    disabled: false,
    willFall: false,
    willDropCurrentWeapon: false,
    wasBlinding: false,
  );
}

/// A copy of `_disableBySlash`.
WeaponAssaultResult _disableByTear(
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
      b.majorCutsCount += 1;
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
