library stranded.fight.slash_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';
import 'package:edgehead/src/fight/slash/actions/finish_thrust_spear.dart';

const String slashSituationName = "SlashSituation";

Situation createSlashSituation(int id, Actor attacker, Actor target) =>
    new AttackerSituation.initialized(id, slashSituationName,
        [finishSlashBuilder, finishThrustSpearBuilder], attacker, target);
