library stranded.fight.on_ground_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/src/fight/on_ground/on_ground_parry.dart';
import 'package:edgehead/src/fight/on_ground/roll_out_of_way.dart';
import 'package:meta/meta.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';

part 'on_ground_defense_situation.g.dart';

abstract class OnGroundDefenseSituation extends SituationState
    with ElapsingTime<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder>
    implements
        Built<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder> {
  factory OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =
      _$OnGroundDefenseSituation;
  factory OnGroundDefenseSituation.withValues(
          Actor attacker, Actor targetOnGround,
          {int time: 0}) =>
      new OnGroundDefenseSituation((b) => b
        ..attacker = attacker.id
        ..targetOnGround = targetOnGround.id
        ..time = time);
  OnGroundDefenseSituation._();
  List<ActionGenerator> get actionGenerators => [onGroundParry, rollOutOfWay];

  int get attacker;
  String get name => "OnGroundDefenseSituation";
  int get targetOnGround;

  int get time;

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(targetOnGround);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) => actors
      .where((actor) => actor.id == attacker || actor.id == targetOnGround);
}

abstract class OnGroundDefenseSituationBuilder
    implements
        Builder<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder>,
        SituationStateBuilderBase {
  @virtual
  int time = 0;
  @virtual
  int attacker;
  @virtual
  int targetOnGround;

  factory OnGroundDefenseSituationBuilder() = _$OnGroundDefenseSituationBuilder;
  OnGroundDefenseSituationBuilder._();
}
