library stranded.fight.break_neck_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/break_neck/actions/finish_break_neck.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String breakNeckOnGroundSituationName = "BreakNeckOnGroundSituation";

Situation createBreakNeckOnGroundSituation(Actor attacker, Actor target) =>
    new AttackerSituation.initialized(breakNeckOnGroundSituationName,
        [finishBreakNeckBuilder], attacker, target);
