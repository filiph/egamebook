import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/throw/throw_defense/actions/catch_projectile.dart';
import 'package:edgehead/src/fight/throw/throw_defense/actions/dodge_throw.dart';
import 'package:edgehead/src/fight/throw/throw_defense/actions/shield_block_throw.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String throwDefenseSituationName = "ThrowDefenseSituation";

DefenseSituation createThrowDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        throwDefenseSituationName,
        [
          DodgeThrow.singleton,
          ShieldBlockThrow.singleton,
          CatchProjectile.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
