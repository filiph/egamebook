library stranded.fight.leap_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/defense_situation_interface.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/dodge_leap.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/impale_leaper.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'leap_defense_situation.g.dart';

abstract class LeapDefenseSituation extends DefenseSituation
    implements Built<LeapDefenseSituation, LeapDefenseSituationBuilder> {
  static Serializer<LeapDefenseSituation> get serializer =>
      _$leapDefenseSituationSerializer;
  factory LeapDefenseSituation([void updates(LeapDefenseSituationBuilder b)]) =
      _$LeapDefenseSituation;

  factory LeapDefenseSituation.initialized(Actor attacker, Actor target,
          {Predetermination predeterminedResult: Predetermination.none}) =>
      new LeapDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predeterminedResult);

  LeapDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [
        DodgeLeap.builder,
        ImpaleLeaper.builder,
        // TODO: WithstandImpactOfLeap.builder,
      ];

  @override
  int get attacker;

  @override
  int get id;

  @override
  String get name => "LeapDefenseSituation";

  @override
  Predetermination get predeterminedResult;

  @override
  int get target;

  @override
  int get time;

  @override
  LeapDefenseSituation elapseTime() => rebuild((b) => b..time += 1);
}
