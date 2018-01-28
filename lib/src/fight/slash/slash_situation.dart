library stranded.fight.slash_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';
import 'package:edgehead/src/fight/slash/actions/finish_thrust_spear.dart';

const String slashSituationName = "SlashSituation";

Situation createSlashSituation(Actor attacker, Actor target) =>
    new AttackerSituation.initialized(slashSituationName,
        [finishSlashBuilder, finishThrustSpearBuilder], attacker, target);
