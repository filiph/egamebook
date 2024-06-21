import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_defense/actions/dodge_thrust_on_ground.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_defense/actions/jump_over_thrust_on_ground.dart';
import 'package:edgehead/src/fight/thrust_on_ground/thrust_on_ground_defense/actions/shield_block_thrust_on_ground.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String thrustDefenseOnGroundSituationName =
    "ThrustOnGroundDefenseSituation";

DefenseSituation createThrustOnGroundDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        thrustDefenseOnGroundSituationName,
        [
          DodgeThrustOnGround.singleton,
          JumpOverThrustOnGround.singleton,
          ShieldBlockThrustOnGround.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
