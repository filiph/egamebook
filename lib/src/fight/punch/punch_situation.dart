library stranded.fight.punch_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/punch/actions/finish_punch.dart';

const String punchSituationName = "PunchSituation";

Situation createPunchSituation(Actor attacker, Actor target) =>
    new AttackerSituation.initialized(punchSituationName,
        [finishPunchBuilder], attacker, target);
