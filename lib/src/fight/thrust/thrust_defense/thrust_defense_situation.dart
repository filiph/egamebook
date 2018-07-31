library stranded.fight.thrust_defense_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/actions/dodge_thrust.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/actions/shield_block_thrust.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String thrustDefenseSituationName = "ThrustDefenseSituation";

DefenseSituation createThrustDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    new DefenseSituation.initialized(
        id,
        thrustDefenseSituationName,
        [
          DodgeThrust.singleton,
          ShieldBlockThrust.singleton,
          JumpBackFromThrust.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
