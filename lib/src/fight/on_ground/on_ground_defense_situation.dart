library stranded.fight.on_ground_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/on_ground/on_ground_parry.dart';
import 'package:edgehead/src/fight/on_ground/roll_out_of_way.dart';

part 'on_ground_defense_situation.g.dart';

abstract class OnGroundDefenseSituation extends Situation
    implements
        Built<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder> {
  factory OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =
      _$OnGroundDefenseSituation;

  factory OnGroundDefenseSituation.initialized(
          Actor attacker, Actor targetOnGround) =>
      new OnGroundDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..targetOnGround = targetOnGround.id);

  OnGroundDefenseSituation._();

  get actionGenerators => [OnGroundParry.builder, RollOutOfWay.builder];

  int get attacker;

  int get id;

  String get name => "OnGroundDefenseSituation";

  int get targetOnGround;

  int get time;

  @override
  OnGroundDefenseSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(targetOnGround);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) => actors
      .where((actor) => actor.id == attacker || actor.id == targetOnGround);
}
