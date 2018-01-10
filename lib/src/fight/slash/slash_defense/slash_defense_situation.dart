library stranded.fight.slash_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/defense_situation_interface.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_thrust_spear.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'slash_defense_situation.g.dart';

abstract class SlashDefenseSituation extends DefenseSituation
    implements Built<SlashDefenseSituation, SlashDefenseSituationBuilder> {
  static Serializer<SlashDefenseSituation> get serializer =>
      _$slashDefenseSituationSerializer;

  factory SlashDefenseSituation(
      [void updates(SlashDefenseSituationBuilder b)]) = _$SlashDefenseSituation;

  factory SlashDefenseSituation.initialized(Actor attacker, Actor target,
          {Predetermination predeterminedResult: Predetermination.none}) =>
      new SlashDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predeterminedResult);

  SlashDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [
        DefensiveParrySlash.builder,
        DodgeSlash.builder,
        DodgeThrustSpear.builder,
        JumpBackFromSlash.builder,
        ParrySlash.builder,
        ShieldBlockSlash.builder,
      ];

  @override
  int get attacker;

  @override
  int get id;

  @override
  String get name => "SlashDefenseSituation";

  @override
  Predetermination get predeterminedResult;

  @override
  int get target;

  @override
  int get time;

  @override
  SlashDefenseSituation elapseTime() => rebuild((b) => b..time += 1);
}
