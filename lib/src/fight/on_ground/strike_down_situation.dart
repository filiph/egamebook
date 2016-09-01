library stranded.fight.strike_down_situation;

import 'package:built_value/built_value.dart';

import 'package:stranded/situation.dart';
import 'package:stranded/actor.dart';
import 'package:quiver/core.dart';
import 'package:stranded/action.dart';
import 'package:stranded/world.dart';
import 'package:edgehead/src/fight/on_ground/slash_grounded_enemy.dart';

part 'strike_down_situation.g.dart';

abstract class StrikeDownSituation extends SituationState
    with ElapsingTime<StrikeDownSituation, StrikeDownSituationBuilder>
    implements Built<StrikeDownSituation, StrikeDownSituationBuilder> {
  String get name => "StrikeDownSituation";
  int get time;
  int get attacker;
  int get targetOnGround;

  StrikeDownSituation._();
  factory StrikeDownSituation([updates(StrikeDownSituationBuilder b)]) =
      _$StrikeDownSituation;
  factory StrikeDownSituation.withValues(Actor attacker, Actor targetOnGround,
          {int time: 0}) =>
      new StrikeDownSituation((b) => b
        ..attacker = attacker.id
        ..targetOnGround = targetOnGround.id
        ..time = time);

  List<ActionGenerator> get actionGenerators => [finishSlashGroundedEnemy];

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) => actors
      .where((actor) => actor.id == attacker || actor.id == targetOnGround);
}

abstract class StrikeDownSituationBuilder
    implements
        Builder<StrikeDownSituation, StrikeDownSituationBuilder>,
        SituationStateBuilderBase {
  int time = 0;
  int attacker;
  int targetOnGround;

  StrikeDownSituationBuilder._();
  factory StrikeDownSituationBuilder() = _$StrikeDownSituationBuilder;
}
