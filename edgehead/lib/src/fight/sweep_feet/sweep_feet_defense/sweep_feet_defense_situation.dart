import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/sweep_feet/sweep_feet_defense/actions/avoid_sweep_feet.dart';
import 'package:edgehead/src/fight/sweep_feet/sweep_feet_defense/actions/counter_sweep_feet.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String sweepFeetDefenseSituationName = "SweepFeetDefenseSituation";

DefenseSituation createSweepFeetDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
      id,
      sweepFeetDefenseSituationName,
      [
        AvoidSweepFeet.singleton,
        CounterSweepFeet.singleton,
      ],
      [],
      attacker,
      target,
      predetermination,
    );
