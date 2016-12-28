library stranded.fight.strike_down_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/on_ground/slash_grounded_enemy.dart';

part 'strike_down_situation.g.dart';

abstract class StrikeDownSituation extends Situation
    implements Built<StrikeDownSituation, StrikeDownSituationBuilder> {

  factory StrikeDownSituation([updates(StrikeDownSituationBuilder b)]) =
      _$StrikeDownSituation;

  factory StrikeDownSituation.initialized(Actor attacker, Actor targetOnGround) =>
      new StrikeDownSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..targetOnGround = targetOnGround.id);

  StrikeDownSituation._();

  get actionGenerators => [FinishSlashGroundedEnemy.builder];

  int get attacker;

  int get id;

  String get name => "StrikeDownSituation";

  int get targetOnGround;

  int get time;

  @override
  StrikeDownSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) => actors
      .where((actor) => actor.id == attacker || actor.id == targetOnGround);
}
