import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/fatality_on_ground/actions/finish_break_neck.dart';
import 'package:edgehead/src/fight/fatality_on_ground/actions/finish_crack_skull.dart';

const String breakNeckOnGroundSituationName = "FatalityOnGroundSituation";

Situation createFatalityOnGroundSituation(
        Actor actor, Simulation _, WorldStateBuilder world, Actor enemy) =>
    AttackerSituation.initialized(
      world.randomInt(),
      breakNeckOnGroundSituationName,
      [
        FinishBreakNeck.singleton,
        FinishCrackSkull.singleton,
      ],
      [],
      actor,
      enemy,
      "maneuver",
    );
