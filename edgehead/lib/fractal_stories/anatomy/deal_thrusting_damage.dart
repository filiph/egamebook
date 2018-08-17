import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/pose.dart';

WeaponAssaultResult executeThrustingHit(
    Actor target, Item weapon, BodyPartDesignation designation) {
  assert(target.hitpoints > 0);
  assert(weapon.isWeapon);
  assert(designation != null);

  final part = target.anatomy.findByDesignation(designation);
  if (part == null) {
    throw ArgumentError("$designation not found in $target");
  }

  // We only have one type of success. No switch statement necessary
  // like in executeSlashingHit.

  return _addMajorThrustingWound(target, part, weapon);
}

WeaponAssaultResult _addMajorThrustingWound(
    Actor target, BodyPart designated, Item weapon) {
  assert(designated.hitpoints >= 0);

  if (designated.hitpoints == 1) {
    return _disableByThrust(target, designated, weapon);
  }

  final ActorBuilder victim = target.toBuilder();

  // When a body part is vital, each major thrust removes one actor's hitpoint.
  if (designated.isVital && designated.isAlive) {
    victim.hitpoints -= 1;
  }

  // Add a major cut to the body part that was hit.
  deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == designated.id,
    (b, isDescendant) {
      if (isDescendant) {
        // Ignore descendants, they aren't affected.
        return;
      }
      b.majorCutsCount += 1;
      if (b.hitpoints > 0) {
        b.hitpoints -= 1;
      }
    },
  );

  return WeaponAssaultResult(victim.build(), designated);
}

/// TODO: Unify with _disableBySlash
WeaponAssaultResult _disableByThrust(
    Actor target, BodyPart bodyPart, Item weapon) {
  final ActorBuilder victim = target.toBuilder();
  if (bodyPart.isVital || bodyPart.hasVitalDescendants) {
    victim.hitpoints = 0;
  }

  deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == bodyPart.id,
    (b, isDescendant) {
      if (!isDescendant) {
        b.majorCutsCount += 1;
      }
      b.hitpoints = 0;
    },
  );

  bool victimDidFall = false;
  if (bodyPart.function == BodyPartFunction.mobile &&
      target.pose != Pose.onGround) {
    victim.pose = Pose.onGround;
    victimDidFall = true;
  }

  return WeaponAssaultResult(
    victim.build(),
    bodyPart,
    fell: victimDidFall,
    disabled: true,
  );
}
