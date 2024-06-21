import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/blunt_swing/actions/finish_blunt_swing.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String bluntSwingSituationName = "BluntSwingSituation";

Situation createBluntSwingSituation(int id, Actor attacker, Actor target,
    {required BodyPartDesignation designation}) {
  return AttackerSituation.initialized(
    id,
    bluntSwingSituationName,
    [FinishBluntSwing.singleton],
    [],
    attacker,
    target,
    "swing",
    attackDirection: AttackDirection.fromBodyPartDesignation(designation),
  );
}
