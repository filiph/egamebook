library stranded.fight.on_ground_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/defense_situation_interface.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'on_ground_defense_situation.g.dart';

abstract class OnGroundDefenseSituation extends DefenseSituation
    implements
        Built<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder> {
  factory OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =
      _$OnGroundDefenseSituation;

  factory OnGroundDefenseSituation.initialized(
          Actor attacker, Actor targetOnGround,
          {Predetermination predeterminedResult = Predetermination.none}) =>
      new OnGroundDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = targetOnGround.id
        ..predeterminedResult = predeterminedResult);

  OnGroundDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [OnGroundParry.builder, RollOutOfWay.builder];

  @override
  int get attacker;

  @override
  int get id;

  @override
  String get name => "OnGroundDefenseSituation";

  @override
  Predetermination get predeterminedResult;

  @override
  int get target;

  @override
  int get time;

  @override
  OnGroundDefenseSituation elapseTime() => rebuild((b) => b..time += 1);
}
