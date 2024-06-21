import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/punch_on_ground/actions/finish_punch.dart';

const String punchOnGroundSituationName = "PunchOnGroundSituation";

Situation createPunchOnGroundSituation(int id, Actor attacker, Actor target) =>
    AttackerSituation.initialized(
      id,
      punchOnGroundSituationName,
      [FinishPunchOnGround.singleton],
      [],
      attacker,
      target,
      "punch",
    );
