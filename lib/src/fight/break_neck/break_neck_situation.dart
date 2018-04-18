library stranded.fight.break_neck_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/break_neck/actions/finish_break_neck.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';

const String breakNeckOnGroundSituationName = "BreakNeckOnGroundSituation";

Situation createBreakNeckOnGroundSituation(
        int id, Actor attacker, Actor target) =>
    new AttackerSituation.initialized(id, breakNeckOnGroundSituationName,
        [finishBreakNeckBuilder], attacker, target);
