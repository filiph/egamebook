library stranded.fight.thrust_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/thrust/actions/finish_thrust.dart';
import 'package:meta/meta.dart';

const String thrustSituationName = "ThrustSituation";

Situation createThrustSituation(int id, Actor attacker, Actor target,
    {@required BodyPartDesignation designation}) {
  assert(designation != null, "You must define designation.");
  return new AttackerSituation.initialized(
      id, thrustSituationName, [FinishThrust.singleton], [], attacker, target,
      attackDirection: AttackDirection.fromBodyPartDesignation(designation));
}
