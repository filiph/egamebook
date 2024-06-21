import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/dodge_leap.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/impale_leaper.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/swing_blunt_at_leaper.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String leapDefenseSituationName = "LeapDefenseSituation";

DefenseSituation createLeapDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        leapDefenseSituationName,
        [
          DodgeLeap.singleton,
        ],
        [
          ImpaleLeaper.singleton,
          SwingBluntAtLeaper.singleton,
        ],
        attacker,
        target,
        predetermination);
