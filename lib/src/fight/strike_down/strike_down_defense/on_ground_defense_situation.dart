library stranded.fight.on_ground_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'on_ground_defense_situation.g.dart';

abstract class OnGroundDefenseSituation extends Situation
    implements
        Built<OnGroundDefenseSituation, OnGroundDefenseSituationBuilder> {
  factory OnGroundDefenseSituation(
          [updates(OnGroundDefenseSituationBuilder b)]) =
      _$OnGroundDefenseSituation;

  factory OnGroundDefenseSituation.initialized(
          Actor attacker, Actor targetOnGround,
          {Predetermination predeterminedResult = Predetermination.none,
          bool extraForce: false}) =>
      new OnGroundDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..targetOnGround = targetOnGround.id
        ..predeterminedResult = predeterminedResult);

  OnGroundDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [OnGroundParry.builder, RollOutOfWay.builder];

  bool get actionsGuaranteedToFail =>
      predeterminedResult == Predetermination.failureGuaranteed;

  bool get actionsGuaranteedToSucceed =>
      predeterminedResult == Predetermination.successGuaranteed;

  int get attacker;

  @override
  int get id;

  @override
  String get name => "OnGroundDefenseSituation";

  Predetermination get predeterminedResult;

  int get targetOnGround;

  @override
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
