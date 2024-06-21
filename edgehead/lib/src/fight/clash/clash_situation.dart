import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/clash/actions/finish_clash.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String clashSituationName = "ClashSituation";

Situation createClashSituation(int id, Actor attacker, Actor target) =>
    AttackerSituation.initialized(
      id,
      clashSituationName,
      [FinishClash.singleton],
      [],
      attacker,
      target,
      "pounding",
    );
