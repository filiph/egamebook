import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_shield_block.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String onGroundDefenseSituationName = "OnGroundDefenseSituation";

DefenseSituation createOnGroundDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        onGroundDefenseSituationName,
        [
          OnGroundParry.singleton,
          OnGroundShieldBlock.singleton,
          RollOutOfWay.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
