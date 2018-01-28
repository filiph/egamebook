library stranded.fight.strike_down_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_strike_down.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_thrust_spear_down.dart';

const String strikeDownSituationName = "StrikeDownSituation";

Situation createStrikeDownSituation(Actor attacker, Actor target) =>
    new AttackerSituation.initialized(
        strikeDownSituationName,
        [
          finishSlashGroundedEnemyBuilder,
          finishThrustSpearAtGroundedEnemyBuilder
        ],
        attacker,
        target);
