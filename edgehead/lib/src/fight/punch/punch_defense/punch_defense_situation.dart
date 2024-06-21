import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/punch/punch_defense/actions/dodge_punch.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String punchDefenseSituationName = "PunchDefenseSituation";

DefenseSituation createPunchDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        punchDefenseSituationName,
        [
          DodgePunch.singleton,
          // TODO: CutOffArm.builder,
        ],
        [],
        attacker,
        target,
        predetermination);
