library stranded.fight.counter_attack_situation;

import 'package:built_value/built_value.dart';

import 'package:stranded/situation.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/action.dart';
import 'package:stranded/world.dart';
import 'package:edgehead/src/fight/pass.dart';
import 'package:edgehead/src/fight/counter_slash.dart';

part 'counter_attack_situation.g.dart';

abstract class CounterAttackSituation extends SituationState
    with ElapsingTime<CounterAttackSituation, CounterAttackSituationBuilder>
    implements Built<CounterAttackSituation, CounterAttackSituationBuilder> {
  String get name => "CounterAttackSituation";
  int get time;
  int get counterAttacker;
  int get target;

  CounterAttackSituation._();
  factory CounterAttackSituation([updates(CounterAttackSituationBuilder b)]) =
      _$CounterAttackSituation;
  factory CounterAttackSituation.withValues(Actor counterAttacker, Actor target,
          {int time: 0}) =>
      new CounterAttackSituation((b) => b
        ..counterAttacker = counterAttacker.id
        ..target = target.id
        ..time = time);

  List<ActorAction> get actions => [pass];
  List<ActionGenerator> get actionGenerators => [counterSlash];

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(counterAttacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) => actors
      .where((actor) => actor.id == counterAttacker || actor.id == target);
}

abstract class CounterAttackSituationBuilder
    implements
        Builder<CounterAttackSituation, CounterAttackSituationBuilder>,
        SituationStateBuilderBase {
  int time = 0;
  int counterAttacker;
  int target;

  CounterAttackSituationBuilder._();
  factory CounterAttackSituationBuilder() = _$CounterAttackSituationBuilder;
}
