import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/roll_back.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String slashDefenseSituationName = "SlashDefenseSituation";

DefenseSituation createSlashDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        slashDefenseSituationName,
        [
          DefensiveParrySlash.singleton,
          DodgeSlash.singleton,
          JumpBackFromSlash.singleton,
          ParrySlash.singleton,
          RollBackFromSlash.singleton,
          ShieldBlockSlash.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
