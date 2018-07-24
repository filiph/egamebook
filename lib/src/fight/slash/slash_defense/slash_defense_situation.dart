library stranded.fight.slash_defense_situation;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String slashDefenseSituationName = "SlashDefenseSituation";

DefenseSituation createSlashDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    new DefenseSituation.initialized(
        id,
        slashDefenseSituationName,
        [
          defensiveParrySlashBuilder,
          dodgeSlashBuilder,
          jumpBackFromSlashBuilder,
          parrySlashBuilder,
          shieldBlockSlashBuilder,
        ],
        [],
        attacker,
        target,
        predetermination);
