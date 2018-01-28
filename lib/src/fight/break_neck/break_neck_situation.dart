library stranded.fight.break_neck_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/break_neck/actions/finish_break_neck.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String breakNeckOnGroundSituationName = "BreakNeckOnGroundSituation";

Situation createBreakNeckOnGroundSituation(Actor attacker, Actor target) =>
    new AttackerSituation.initialized(breakNeckOnGroundSituationName,
        [finishBreakNeckBuilder], attacker, target);
