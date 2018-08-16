library stranded.fight.break_neck_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/break_neck/actions/finish_break_neck.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String breakNeckOnGroundSituationName = "BreakNeckOnGroundSituation";

Situation createBreakNeckOnGroundSituation(
        Actor actor, Simulation _, WorldStateBuilder world, Actor enemy) =>
    new AttackerSituation.initialized(
      world.randomInt(),
      breakNeckOnGroundSituationName,
      [FinishBreakNeck.singleton],
      [],
      actor,
      enemy,
    );
