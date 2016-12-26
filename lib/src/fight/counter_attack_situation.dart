library stranded.fight.counter_attack_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/counter_slash.dart';
import 'package:edgehead/src/fight/pass.dart';

part 'counter_attack_situation.g.dart';

abstract class CounterAttackSituation extends Situation
    implements Built<CounterAttackSituation, CounterAttackSituationBuilder> {
  factory CounterAttackSituation([updates(CounterAttackSituationBuilder b)]) =
      _$CounterAttackSituation;

  factory CounterAttackSituation.initialized(
          Actor counterAttacker, Actor target) =>
      new CounterAttackSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..counterAttacker = counterAttacker.id
        ..target = target.id);

  CounterAttackSituation._();

  List<ActionGenerator> get actionGenerators => [counterSlash];

  List<ActorAction> get actions => [pass];

  int get counterAttacker;

  int get id;

  String get name => "CounterAttackSituation";

  int get target;

  int get time;

  @override
  CounterAttackSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(counterAttacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) => actors
      .where((actor) => actor.id == counterAttacker || actor.id == target);
}
