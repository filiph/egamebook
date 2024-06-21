import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/fatality_on_ground/wrestle_defense/actions/evade_on_ground.dart';
import 'package:edgehead/src/fight/fatality_on_ground/wrestle_defense/actions/on_ground_parry_blunt.dart';
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
        [
          EvadeOnGround.singleton,
          OnGroundParryBlunt.singleton,
        ],
        [],
        actor,
        enemy,
        predetermination);
