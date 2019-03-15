import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Builds a standard humanoid body (two legs, two arms, etc.).
/// Provide a unique seed (probably the actor's ID) so we can create
/// random ids for each body part.
Anatomy buildHumanoid(int seed, {int constitution = 1}) {
  assert(constitution >= 1, "Cannot have creature with constitution below 1");

  final random = StatefulRandom(seed);

  final rightLeg = BodyPart(random.next(), "right leg",
      randomDesignation: "{right leg|right thigh}",
      designation: BodyPartDesignation.rightLeg,
      function: BodyPartFunction.mobile,
      swingSurfaceLeft: 7,
      swingSurfaceRight: 0,
      thrustSurface: 5,
      isSeverable: true);

  final leftLeg = BodyPart(random.next(), "left leg",
      randomDesignation: "{left leg|left thigh}",
      designation: BodyPartDesignation.leftLeg,
      function: BodyPartFunction.mobile,
      swingSurfaceRight: 7,
      swingSurfaceLeft: 0,
      thrustSurface: 5,
      isSeverable: true);

  final primaryHand = BodyPart(random.next(), "wielding hand",
      designation: BodyPartDesignation.primaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: DamageCapability(WeaponType.fist).toBuilder(),
      swingSurfaceLeft: 2,
      swingSurfaceRight: 0,
      thrustSurface: 1,
      isSeverable: true);

  final primaryArm = BodyPart(random.next(), "wielding arm",
      randomDesignation: "{right arm|right shoulder}",
      designation: BodyPartDesignation.primaryArm,
      isSeverable: true,
      swingSurfaceLeft: 7,
      swingSurfaceRight: 0,
      thrustSurface: 5,
      children: [primaryHand]);

  final secondaryHand = BodyPart(random.next(), "wielding hand",
      designation: BodyPartDesignation.secondaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: DamageCapability(WeaponType.fist).toBuilder(),
      swingSurfaceLeft: 0,
      swingSurfaceRight: 2,
      thrustSurface: 1,
      isSeverable: true);

  final secondaryArm = BodyPart(random.next(), "shield arm",
      randomDesignation: "{left arm|left shoulder}",
      designation: BodyPartDesignation.secondaryArm,
      function: BodyPartFunction.wielding,
      isSeverable: true,
      swingSurfaceRight: 7,
      swingSurfaceLeft: 0,
      thrustSurface: 5,
      children: [secondaryHand]);

  final leftEye = BodyPart(
    random.next(),
    "left eye",
    designation: BodyPartDesignation.leftEye,
    function: BodyPartFunction.vision,
    swingSurfaceLeft: 0,
    thrustSurface: 1,
  );

  final rightEye = BodyPart(
    random.next(),
    "right eye",
    designation: BodyPartDesignation.rightEye,
    function: BodyPartFunction.vision,
    swingSurfaceRight: 0,
    thrustSurface: 1,
  );

  final head = BodyPart(random.next(), "head",
      randomDesignation: "{forehead|face|cheek|chin|nose}",
      designation: BodyPartDesignation.head,
      isVital: true,
      swingSurfaceLeft: 2,
      swingSurfaceRight: 2,
      thrustSurface: 2,
      children: [leftEye, rightEye]);

  final neck = BodyPart(random.next(), "neck",
      randomDesignation: "{throat|neck}",
      designation: BodyPartDesignation.neck,
      isVital: true,
      isSeverable: true,
      swingSurfaceLeft: 1,
      swingSurfaceRight: 1,
      thrustSurface: 1,
      children: [head]);

  final torso = BodyPart(random.next(), "torso",
      randomDesignation: "{abdomen|belly|chest|upper body|lower body}",
      hitpoints: constitution,
      designation: BodyPartDesignation.torso,
      isVital: true,
      swingSurfaceLeft: 6,
      swingSurfaceRight: 6,
      thrustSurface: 8,
      children: [neck, primaryArm, secondaryArm, leftLeg, rightLeg]);

  return Anatomy(torso: torso);
}
