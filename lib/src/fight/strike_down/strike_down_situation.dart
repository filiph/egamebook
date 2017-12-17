library stranded.fight.strike_down_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_strike_down.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_thrust_spear_down.dart';

part 'strike_down_situation.g.dart';

abstract class StrikeDownSituation extends Situation
    implements Built<StrikeDownSituation, StrikeDownSituationBuilder> {
  factory StrikeDownSituation([void updates(StrikeDownSituationBuilder b)]) =
      _$StrikeDownSituation;

  factory StrikeDownSituation.initialized(
          Actor attacker, Actor targetOnGround) =>
      new StrikeDownSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..targetOnGround = targetOnGround.id);

  StrikeDownSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [
        FinishSlashGroundedEnemy.builder,
        FinishThrustSpearAtGroundedEnemy.builder
      ];

  int get attacker;

  @override
  int get id;

  @override
  String get name => "StrikeDownSituation";

  int get targetOnGround;

  @override
  int get time;

  @override
  StrikeDownSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) => actors
      .where((actor) => actor.id == attacker || actor.id == targetOnGround);
}
