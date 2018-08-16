library stranded.fight.wrestle_defense_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/actions/evade_neck_breaking.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String onGroundWrestleDefenseSituationName =
    "OnGroundWrestleDefenseSituation";

DefenseSituation createOnGroundWrestleDefenseSituation(
        Actor actor,
        Simulation sim,
        WorldStateBuilder world,
        Actor enemy,
        Predetermination predetermination) =>
    DefenseSituation.initialized(
        world.randomInt(),
        onGroundWrestleDefenseSituationName,
        [EvadeNeckBreaking.singleton],
        [],
        actor,
        enemy,
        predetermination);
