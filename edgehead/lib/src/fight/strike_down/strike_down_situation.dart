library stranded.fight.strike_down_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_strike_down.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_thrust_spear_down.dart';

const String strikeDownSituationName = "StrikeDownSituation";

Situation createStrikeDownSituation(int id, Actor attacker, Actor target) =>
    AttackerSituation.initialized(
      id,
      strikeDownSituationName,
      [
        FinishSlashGroundedEnemy.singleton,
        FinishThrustSpearAtGroundedEnemy.singleton,
      ],
      [],
      attacker,
      target,
      "swing",
    );
