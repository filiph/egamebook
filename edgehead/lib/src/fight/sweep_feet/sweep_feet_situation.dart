import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/sweep_feet/actions/finish_sweep_feet.dart';

const String sweepFeetSituationName = "SweepFeetSituation";

Situation createSweepFeetSituation(int id, Actor attacker, Actor target) =>
    AttackerSituation.initialized(
      id,
      sweepFeetSituationName,
      [FinishSweepFeet.singleton],
      [],
      attacker,
      target,
      "sweep",
    );
