library stranded.fight.wrestle_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/actions/evade_neck_breaking.dart';
import 'package:edgehead/src/fight/defense_situation_interface.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'wrestle_defense_situation.g.dart';

abstract class OnGroundWrestleDefenseSituation extends DefenseSituation
    implements
        Built<OnGroundWrestleDefenseSituation,
            OnGroundWrestleDefenseSituationBuilder> {
  factory OnGroundWrestleDefenseSituation(
          [updates(OnGroundWrestleDefenseSituationBuilder b)]) =
      _$OnGroundWrestleDefenseSituation;

  factory OnGroundWrestleDefenseSituation.initialized(
          Actor attacker, Actor target,
          {Predetermination predeterminedResult: Predetermination.none}) =>
      new OnGroundWrestleDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predeterminedResult);

  OnGroundWrestleDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [EvadeNeckBreaking.builder];

  @override
  int get attacker;

  @override
  int get id;

  @override
  String get name => "OnGroundWrestleDefenseSituation";

  @override
  Predetermination get predeterminedResult;

  @override
  int get target;

  @override
  int get time;

  @override
  OnGroundWrestleDefenseSituation elapseTime() => rebuild((b) => b..time += 1);
}
