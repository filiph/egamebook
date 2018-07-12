library stranded.fight.slash_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';
import 'package:edgehead/src/fight/slash/actions/finish_thrust_spear.dart';

const String slashSituationName = "SlashSituation";

Situation createSlashSituation(int id, Actor attacker, Actor target,
    {SlashDirection direction, BodyPartDesignation designation}) {
  assert(
      (direction != null && designation == null) ||
          (direction == null && designation != null),
      "You must define only one of direction or designation.");
  return new AttackerSituation.initialized(id, slashSituationName,
      [finishSlashBuilder, finishThrustSpearBuilder], [], attacker, target,
      attackDirection: _convert(direction, designation));
}

/// Converts a slash direction from the simple [SlashDirection] enum
/// to the serializable [AttackDirection] value-class.
AttackDirection _convert(
    SlashDirection direction, BodyPartDesignation designation) {
  if (direction != null) {
    switch (direction) {
      case SlashDirection.left:
        return AttackDirection.fromLeft;
      case SlashDirection.right:
        return AttackDirection.fromRight;
    }
    throw new StateError(
        "Direction $direction wasn't covered by the switch statement above.");
  }

  // It's a designation.
  switch (designation) {
    case BodyPartDesignation.primaryArm:
      return AttackDirection.primaryArm;
    case BodyPartDesignation.secondaryArm:
      return AttackDirection.secondaryArm;
    case BodyPartDesignation.leftLeg:
      return AttackDirection.leftLeg;
    case BodyPartDesignation.rightLeg:
      return AttackDirection.rightLeg;
    case BodyPartDesignation.neck:
      return AttackDirection.neck;
  }

  throw new StateError(
      "Designation $designation wasn't covered by the switch statement above.");
}
