library stranded.fight.slash_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';
import 'package:edgehead/src/fight/slash/actions/finish_thrust_spear.dart';

const String slashSituationName = "SlashSituation";

Situation createSlashSituation(
        int id, Actor attacker, Actor target, SlashDirection direction) =>
    new AttackerSituation.initialized(id, slashSituationName,
        [finishSlashBuilder, finishThrustSpearBuilder], [], attacker, target,
        attackDirection: _convert(direction));

/// Converts a slash direction from the simple [SlashDirection] enum
/// to the serializable [AttackDirection] value-class.
AttackDirection _convert(SlashDirection direction) {
  switch (direction) {
    case SlashDirection.left:
      return AttackDirection.left;
    case SlashDirection.right:
      return AttackDirection.right;
  }
  throw new StateError(
      "Direction $direction wasn't covered by the switch statement above.");
}
