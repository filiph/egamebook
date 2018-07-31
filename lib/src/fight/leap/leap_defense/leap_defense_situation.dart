library stranded.fight.leap_defense_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/dodge_leap.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/impale_leaper.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String leapDefenseSituationName = "LeapDefenseSituation";

DefenseSituation createLeapDefenseSituation(int id, Actor attacker, Actor target,
        Predetermination predetermination) =>
    new DefenseSituation.initialized(
        id,
        leapDefenseSituationName,
        [
          DodgeLeap.singleton,
          // TODO: WithstandImpactOfLeap.builder,
        ],
        [ImpaleLeaper.singleton],
        attacker,
        target,
        predetermination);
