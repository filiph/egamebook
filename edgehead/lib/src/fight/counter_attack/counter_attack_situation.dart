library stranded.fight.counter_attack_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/pass.dart';
import 'package:edgehead/src/fight/actions/pass_while_blind.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_blunt_swing.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_slash.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_tackle.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_thrust.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_thrust_on_ground.dart';

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
        ..turn = 0
        ..counterAttacker = counterAttacker.id
        ..target = target.id);

  CounterAttackSituation._();

  @override
  List<Action<dynamic>> get actions => [
        Pass.singleton,
        PassWhileBlind.singleton,
        counterBluntSwingBuilder(),
        counterSlashBuilder(),
        counterThrustBuilder(),
        CounterTackle.singleton,
        counterThrustOnGroundBuilder(),
      ];

  int get counterAttacker;

  @override
  int get id;

  @override
  String get name => "CounterAttackSituation";

  int get target;

  @override
  int get turn;

  @override
  CounterAttackSituation elapseTurn() => rebuild((b) => b.turn = b.turn! + 1);

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState w) {
    if (turn == 0) return ActorTurn.byId(counterAttacker, w);
    return ActorTurn.never;
  }

  @override
  Iterable<Actor> getActors(_, WorldState w) => w.actors
      .where((actor) => actor.id == counterAttacker || actor.id == target);
}
