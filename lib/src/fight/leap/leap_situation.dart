library stranded.fight.leap_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/leap/actions/finish_leap.dart';

const String leapSituationName = "LeapSituation";

Situation createLeapSituation(Actor attacker, Actor target) =>
    new AttackerSituation.initialized(leapSituationName,
        [finishLeapBuilder], attacker, target);
