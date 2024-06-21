import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/slash_on_ground/slash_on_ground_defense/actions/dodge_slash_on_ground.dart';
import 'package:edgehead/src/fight/slash_on_ground/slash_on_ground_defense/actions/shield_block_slash_on_ground.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String slashDefenseOnGroundSituationName =
    "SlashOnGroundDefenseSituation";

DefenseSituation createSlashOnGroundDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        slashDefenseOnGroundSituationName,
        [
          DodgeSlashOnGround.singleton,
          ShieldBlockSlashOnGround.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
