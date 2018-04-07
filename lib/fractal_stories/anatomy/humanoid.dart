import 'package:edgehead/fractal_stories/anatomy/body_part.dart';

BodyPart buildHumanoid() {
  final leftLeg = new BodyPart("left leg",
      designation: BodyPartDesignation.leftLeg,
      function: BodyPartFunction.mobile,
      isSeverable: true);

  final rightLeg = new BodyPart("right leg",
      designation: BodyPartDesignation.rightLeg,
      function: BodyPartFunction.mobile,
      isSeverable: true);

  final primaryArm = new BodyPart("wielding arm",
      designation: BodyPartDesignation.primaryArm,
      function: BodyPartFunction.wielding,
      isSeverable: true);

  final secondaryArm = new BodyPart("shield arm",
      designation: BodyPartDesignation.secondaryArm,
      function: BodyPartFunction.wielding,
      isSeverable: true);

  final leftEye = new BodyPart("left eye",
      designation: BodyPartDesignation.leftEye,
      function: BodyPartFunction.vision);

  final rightEye = new BodyPart("right eye",
      designation: BodyPartDesignation.rightEye,
      function: BodyPartFunction.vision);

  final head = new BodyPart("head",
      designation: BodyPartDesignation.head,
      isVital: true,
      children: [leftEye, rightEye]);

  final neck = new BodyPart("neck",
      designation: BodyPartDesignation.neck,
      isVital: true,
      isSeverable: true,
      children: [head]);

  final torso = new BodyPart("torso",
      designation: BodyPartDesignation.torso,
      isVital: true,
      children: [neck, primaryArm, secondaryArm, leftLeg, rightLeg]);

  return torso;
}
