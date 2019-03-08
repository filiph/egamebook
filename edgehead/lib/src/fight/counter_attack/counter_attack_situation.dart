library stranded.fight.counter_attack_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/pass.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_slash.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_tackle.dart';

part 'counter_attack_situation.g.dart';

abstract class CounterAttackSituation extends Object
    with SituationBaseBehavior
    implements Built<CounterAttackSituation, CounterAttackSituationBuilder> {
  static Serializer<CounterAttackSituation> get serializer =>
      _$counterAttackSituationSerializer;
  factory CounterAttackSituation(
          [void updates(CounterAttackSituationBuilder b)]) =
      _$CounterAttackSituation;

  factory CounterAttackSituation.initialized(
          int id, Actor counterAttacker, Actor target) =>
      CounterAttackSituation((b) => b
        ..id = id
        ..time = 0
        ..counterAttacker = counterAttacker.id
        ..target = target.id);

  CounterAttackSituation._();

  @override
  List<Action<dynamic>> get actions => [
        Pass.singleton,
        counterSlashBuilder(),
        CounterTackle.singleton,
      ];

  int get counterAttacker;

  @override
  int get id;

  @override
  String get name => "CounterAttackSituation";

  int get target;

  @override
  int get time;

  @override
  CounterAttackSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getCurrentActor(Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(counterAttacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) => actors
      .where((actor) => actor.id == counterAttacker || actor.id == target);
}
