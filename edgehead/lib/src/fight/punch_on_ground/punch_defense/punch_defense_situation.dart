import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/punch_on_ground/punch_defense/actions/dodge_punch_on_ground.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String punchOnGroundDefenseSituationName =
    "PunchOnGroundDefenseSituation";

DefenseSituation createPunchOnGroundDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        punchOnGroundDefenseSituationName,
        [
          DodgePunchOnGround.singleton,
          // TODO: CutOffArm.builder,
        ],
        [],
        attacker,
        target,
        predetermination);
