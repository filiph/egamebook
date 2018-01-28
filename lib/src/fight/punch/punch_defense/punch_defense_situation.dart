library stranded.fight.punch_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/defense_situation_interface.dart';
import 'package:edgehead/src/fight/punch/punch_defense/actions/dodge_punch.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'punch_defense_situation.g.dart';

abstract class PunchDefenseSituation extends DefenseSituationInterface
    implements Built<PunchDefenseSituation, PunchDefenseSituationBuilder> {
  static Serializer<PunchDefenseSituation> get serializer =>
      _$punchDefenseSituationSerializer;

  factory PunchDefenseSituation(
      [void updates(PunchDefenseSituationBuilder b)]) = _$PunchDefenseSituation;

  factory PunchDefenseSituation.initialized(Actor attacker, Actor target,
          {Predetermination predeterminedResult: Predetermination.none}) =>
      new PunchDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predeterminedResult);

  PunchDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [
        DodgePunch.builder,
//        CutOffArm.builder,
      ];

  @override
  int get attacker;

  @override
  int get id;

  @override
  String get name => "PunchDefenseSituation";

  @override
  Predetermination get predeterminedResult;

  @override
  int get target;

  @override
  int get time;

  @override
  PunchDefenseSituation elapseTime() => rebuild((b) => b..time += 1);
}
