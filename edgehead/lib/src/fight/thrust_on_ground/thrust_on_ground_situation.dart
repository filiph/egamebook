import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/thrust_on_ground/actions/finish_thrust_on_ground.dart';

const String thrustOnGroundSituationName = "ThrustOnGroundSituation";

Situation createThrustOnGroundSituation(int id, Actor attacker, Actor target) {
  return AttackerSituation.initialized(
    id,
    thrustOnGroundSituationName,
    [FinishThrustOnGround.singleton],
    [],
    attacker,
    target,
    "thrust",
  );
}
