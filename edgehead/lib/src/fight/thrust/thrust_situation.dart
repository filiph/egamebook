import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/thrust/actions/finish_thrust.dart';

const String thrustSituationName = "ThrustSituation";

Situation createThrustSituation(int id, Actor attacker, Actor target,
    {required BodyPartDesignation designation}) {
  return AttackerSituation.initialized(
    id,
    thrustSituationName,
    [FinishThrust.singleton],
    [],
    attacker,
    target,
    "thrust",
    attackDirection: AttackDirection.fromBodyPartDesignation(designation),
  );
}
