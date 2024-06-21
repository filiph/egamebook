import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/actions/defensive_parry_blunt_swing.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/actions/dodge_blunt_swing.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/actions/jump_back_from_blunt_swing.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/actions/parry_blunt_swing.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/actions/roll_away_from_blunt_swing.dart';
import 'package:edgehead/src/fight/blunt_swing/blunt_swing_defense/actions/shield_block_blunt_swing.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String bluntSwingDefenseSituationName = "BluntSwingDefenseSituation";

DefenseSituation createBluntSwingDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        bluntSwingDefenseSituationName,
        [
          DefensiveParryBluntSwing.singleton,
          DodgeBluntSwing.singleton,
          JumpBackFromBluntSwing.singleton,
          ParryBluntSwing.singleton,
          RollAwayFromBluntSwing.singleton,
          ShieldBlockBluntSwing.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
