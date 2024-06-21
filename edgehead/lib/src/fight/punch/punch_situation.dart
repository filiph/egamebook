import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/punch/actions/finish_punch.dart';

const String punchSituationName = "PunchSituation";

Situation createPunchSituation(int id, Actor attacker, Actor target) =>
    AttackerSituation.initialized(
      id,
      punchSituationName,
      [FinishPunch.singleton],
      [],
      attacker,
      target,
      "punch",
    );
