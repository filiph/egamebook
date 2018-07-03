import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Builds a standard humanoid body (two legs, two arms, etc.).
/// Provide a unique seed (probably the actor's ID) so we can create
/// random ids for each body part.
Anatomy buildHumanoid(int seed, {int constitution: 1}) {
  assert(constitution >= 1, "Cannot have creature with constitution below 1");

  final random = new StatefulRandom(seed);

  final rightLeg = new BodyPart(random.next(), "right leg",
      hitpoints: constitution,
      randomDesignation: "{right leg|right thigh}",
      designation: BodyPartDesignation.rightLeg,
      function: BodyPartFunction.mobile,
      swingSurfaceRight: 0,
      isSeverable: true);

  final leftLeg = new BodyPart(random.next(), "left leg",
      hitpoints: constitution,
      randomDesignation: "{left leg|left thigh}",
      designation: BodyPartDesignation.leftLeg,
      function: BodyPartFunction.mobile,
      swingSurfaceLeft: 0,
      isSeverable: true);

  final primaryHand = new BodyPart(random.next(), "wielding hand",
      designation: BodyPartDesignation.primaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: new DamageCapability(WeaponType.fist).toBuilder(),
      swingSurfaceRight: 0,
      isSeverable: true);

  final primaryArm = new BodyPart(random.next(), "wielding arm",
      randomDesignation: "{right arm|right shoulder}",
      hitpoints: constitution,
      designation: BodyPartDesignation.primaryArm,
      isSeverable: true,
      swingSurfaceRight: 0,
      children: [primaryHand]);

  final secondaryHand = new BodyPart(random.next(), "wielding hand",
      designation: BodyPartDesignation.secondaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: new DamageCapability(WeaponType.fist).toBuilder(),
      swingSurfaceLeft: 0,
      isSeverable: true);

  final secondaryArm = new BodyPart(random.next(), "shield arm",
      randomDesignation: "{left arm|left shoulder}",
      hitpoints: constitution,
      designation: BodyPartDesignation.secondaryArm,
      function: BodyPartFunction.wielding,
      isSeverable: true,
      swingSurfaceLeft: 0,
      children: [secondaryHand]);

  final leftEye = new BodyPart(
    random.next(),
    "left eye",
    designation: BodyPartDesignation.leftEye,
    function: BodyPartFunction.vision,
    swingSurfaceLeft: 0,
  );

  final rightEye = new BodyPart(
    random.next(),
    "right eye",
    designation: BodyPartDesignation.rightEye,
    function: BodyPartFunction.vision,
    swingSurfaceRight: 0,
  );

  final head = new BodyPart(random.next(), "head",
      randomDesignation: "{forehead|face|cheek|chin|nose}",
      designation: BodyPartDesignation.head,
      isVital: true,
      children: [leftEye, rightEye]);

  final neck = new BodyPart(random.next(), "neck",
      randomDesignation: "{throat|neck}",
      designation: BodyPartDesignation.neck,
      isVital: true,
      isSeverable: true,
      children: [head]);

  final torso = new BodyPart(random.next(), "torso",
      randomDesignation: "{abdomen|belly|chest|upper body|lower body}",
      hitpoints: constitution,
      designation: BodyPartDesignation.torso,
      isVital: true,
      swingSurfaceLeft: 2,
      swingSurfaceRight: 2,
      children: [neck, primaryArm, secondaryArm, leftLeg, rightLeg]);

  return new Anatomy(torso: torso);
}
