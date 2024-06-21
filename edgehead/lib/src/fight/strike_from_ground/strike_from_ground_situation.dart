import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/strike_from_ground/actions/finish_pull_down.dart';

const String strikeFromGroundSituationName = "StrikeFromGroundSituation";

Situation createStrikeFromGroundSituation(
        int id, Actor attacker, Actor target) =>
    AttackerSituation.initialized(
      id,
      strikeFromGroundSituationName,
      [
        FinishPullDown.singleton,
      ],
      [],
      attacker,
      target,
      "pull",
    );
