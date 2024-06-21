import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash_on_ground/actions/finish_slash_on_ground.dart';

const String slashOnGroundSituationName = "SlashOnGroundSituation";

Situation createSlashOnGroundSituation(int id, Actor attacker, Actor target) {
  return AttackerSituation.initialized(
    id,
    slashOnGroundSituationName,
    [FinishSlashOnGround.singleton],
    [],
    attacker,
    target,
    "slash",
  );
}
