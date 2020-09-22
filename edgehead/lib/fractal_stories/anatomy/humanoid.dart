import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:meta/meta.dart';

/// Builds a standard humanoid body (two legs, two arms, etc.).
/// Provide a unique seed (probably the actor's ID) so we can create
/// random ids for each body part.
Anatomy buildHumanoid(int id, RandomIdGetter randomIdGetter,
    {@required bool isUndead, int constitution = 1, bool isBlind = false}) {
  assert(constitution >= 1, "Cannot have creature with constitution below 1");

  final rightLeg = BodyPart(randomIdGetter(), "right leg",
      randomDesignation: "{right shin|right thigh}",
      designation: BodyPartDesignation.rightLeg,
      function: BodyPartFunction.mobile,
      swingSurfaceLeft: 7,
      swingSurfaceRight: 0,
      thrustSurface: 5,
      isSeverable: true,
      firstOwnerId: id);

  final leftLeg = BodyPart(randomIdGetter(), "left leg",
      randomDesignation: "{left shin|left thigh}",
      designation: BodyPartDesignation.leftLeg,
      function: BodyPartFunction.mobile,
      swingSurfaceRight: 7,
      swingSurfaceLeft: 0,
      thrustSurface: 5,
      isSeverable: true,
      firstOwnerId: id);

  final primaryHand = BodyPart(randomIdGetter(), "right hand",
      designation: BodyPartDesignation.primaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: DamageCapability(WeaponType.fist).toBuilder(),
      swingSurfaceLeft: 2,
      swingSurfaceRight: 0,
      thrustSurface: 1,
      isSeverable: true,
      firstOwnerId: id);

  final primaryArm = BodyPart(randomIdGetter(), "right arm",
      randomDesignation: "{right biceps|right shoulder}",
      designation: BodyPartDesignation.primaryArm,
      isSeverable: true,
      swingSurfaceLeft: 7,
      swingSurfaceRight: 0,
      thrustSurface: 5,
      children: [primaryHand],
      firstOwnerId: id);

  final secondaryHand = BodyPart(randomIdGetter(), "left hand",
      designation: BodyPartDesignation.secondaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: DamageCapability(WeaponType.fist).toBuilder(),
      swingSurfaceLeft: 0,
      swingSurfaceRight: 2,
      thrustSurface: 1,
      isSeverable: true,
      firstOwnerId: id);

  final secondaryArm = BodyPart(randomIdGetter(), "left arm",
      randomDesignation: "{left biceps|left shoulder}",
      designation: BodyPartDesignation.secondaryArm,
      isSeverable: true,
      swingSurfaceRight: 7,
      swingSurfaceLeft: 0,
      thrustSurface: 5,
      children: [secondaryHand],
      firstOwnerId: id);

  final leftEye = BodyPart(randomIdGetter(), "left eye",
      designation: BodyPartDesignation.leftEye,
      function: BodyPartFunction.vision,
      swingSurfaceLeft: 0,
      thrustSurface: 1,
      hitpoints: isBlind ? 0 : 1,
      firstOwnerId: id);

  final rightEye = BodyPart(randomIdGetter(), "right eye",
      designation: BodyPartDesignation.rightEye,
      function: BodyPartFunction.vision,
      swingSurfaceRight: 0,
      thrustSurface: 1,
      hitpoints: isBlind ? 0 : 1,
      firstOwnerId: id);

  final teeth = BodyPart(randomIdGetter(), "teeth",
      designation: BodyPartDesignation.teeth,
      function: BodyPartFunction.damageDealing,
      damageCapability: DamageCapability(WeaponType.teeth).toBuilder(),
      swingSurfaceLeft: 0,
      swingSurfaceRight: 0,
      thrustSurface: 0,
      firstOwnerId: id);

  final head = BodyPart(randomIdGetter(), "head",
      randomDesignation: "{forehead|face|cheek|chin|nose}",
      designation: BodyPartDesignation.head,
      isVital: true,
      swingSurfaceLeft: 2,
      swingSurfaceRight: 2,
      thrustSurface: 2,
      children: [leftEye, rightEye, teeth],
      firstOwnerId: id);

  final neck = BodyPart(randomIdGetter(), "neck",
      randomDesignation: "{throat|jugular}",
      designation: BodyPartDesignation.neck,
      isVital: true,
      isSeverable: true,
      swingSurfaceLeft: 1,
      swingSurfaceRight: 1,
      thrustSurface: 1,
      children: [head],
      firstOwnerId: id);

  final torso = BodyPart(randomIdGetter(), "torso",
      randomDesignation: "{abdomen|belly|chest|upper body|lower body}",
      hitpoints: constitution,
      designation: BodyPartDesignation.torso,
      isVital: true,
      swingSurfaceLeft: 6,
      swingSurfaceRight: 6,
      thrustSurface: 8,
      children: [neck, primaryArm, secondaryArm, leftLeg, rightLeg],
      firstOwnerId: id);

  return Anatomy(torso: torso, isUndead: isUndead);
}
