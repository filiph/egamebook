import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/bite/actions/finish_bite.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String biteSituationName = "BiteSituation";

Situation createBiteSituation(int id, Actor attacker, Actor target,
    {required BodyPartDesignation designation}) {
  return AttackerSituation.initialized(
    id,
    biteSituationName,
    [FinishBite.singleton],
    [],
    attacker,
    target,
    "lunge",
    attackDirection: AttackDirection.fromBodyPartDesignation(designation),
  );
}
