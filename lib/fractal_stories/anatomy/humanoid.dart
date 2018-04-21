import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Builds a standard humanoid body (two legs, two arms, etc.).
/// Provide a unique seed (probably the actor's ID) so we can create
/// random ids for each body part.
BodyPart buildHumanoid(int seed) {
  final random = new StatefulRandom(seed);

  final leftLeg = new BodyPart(random.next(), "left leg",
      designation: BodyPartDesignation.leftLeg,
      function: BodyPartFunction.mobile,
      isSeverable: true);

  final rightLeg = new BodyPart(random.next(), "right leg",
      designation: BodyPartDesignation.rightLeg,
      function: BodyPartFunction.mobile,
      isSeverable: true);

  final primaryHand = new BodyPart(random.next(), "wielding hand",
      designation: BodyPartDesignation.primaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: new DamageCapability(WeaponType.fist).toBuilder(),
      isSeverable: true);

  final primaryArm = new BodyPart(random.next(), "wielding arm",
      designation: BodyPartDesignation.primaryArm,
      isSeverable: true,
      children: [primaryHand]);

  final secondaryHand = new BodyPart(random.next(), "wielding hand",
      designation: BodyPartDesignation.secondaryHand,
      function: BodyPartFunction.wielding,
      damageCapability: new DamageCapability(WeaponType.fist).toBuilder(),
      isSeverable: true);

  final secondaryArm = new BodyPart(random.next(), "shield arm",
      designation: BodyPartDesignation.secondaryArm,
      function: BodyPartFunction.wielding,
      isSeverable: true,
      children: [secondaryHand]);

  final leftEye = new BodyPart(random.next(), "left eye",
      designation: BodyPartDesignation.leftEye,
      function: BodyPartFunction.vision);

  final rightEye = new BodyPart(random.next(), "right eye",
      designation: BodyPartDesignation.rightEye,
      function: BodyPartFunction.vision);

  final head = new BodyPart(random.next(), "head",
      designation: BodyPartDesignation.head,
      isVital: true,
      children: [leftEye, rightEye]);

  final neck = new BodyPart(random.next(), "neck",
      designation: BodyPartDesignation.neck,
      isVital: true,
      isSeverable: true,
      children: [head]);

  final torso = new BodyPart(random.next(), "torso",
      designation: BodyPartDesignation.torso,
      isVital: true,
      children: [neck, primaryArm, secondaryArm, leftLeg, rightLeg]);

  return torso;
}
