library stranded.fight.wrestle_defense_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/actions/evade_neck_breaking.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String onGroundWrestleDefenseSituationName =
    "OnGroundWrestleDefenseSituation";

Situation createOnGroundWrestleDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    new DefenseSituation.initialized(id, onGroundWrestleDefenseSituationName,
        [evadeNeckBreakingBuilder], [], attacker, target, predetermination);
