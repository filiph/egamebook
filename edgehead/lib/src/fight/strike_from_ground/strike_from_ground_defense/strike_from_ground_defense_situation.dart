import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_defense/actions/jump_to_side_and_counter.dart';
import 'package:edgehead/src/fight/strike_from_ground/strike_from_ground_defense/actions/step_back.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String strikeFromGroundDefenseSituationName =
    "StrikeFromGroundDefenseSituation";

DefenseSituation createStrikeFromGroundDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        strikeFromGroundDefenseSituationName,
        [
          StepBackFromStrikeFromGround.singleton,
          JumpToSideFromStrikeFromGround.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
