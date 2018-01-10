library stranded.fight.break_neck_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/break_neck/actions/finish_break_neck.dart';

part 'break_neck_situation.g.dart';

abstract class BreakNeckOnGroundSituation extends Situation
    implements
        Built<BreakNeckOnGroundSituation, BreakNeckOnGroundSituationBuilder> {
  static Serializer<BreakNeckOnGroundSituation> get serializer =>
      _$breakNeckOnGroundSituationSerializer;
  factory BreakNeckOnGroundSituation(
          [void updates(BreakNeckOnGroundSituationBuilder b)]) =
      _$BreakNeckOnGroundSituation;

  factory BreakNeckOnGroundSituation.initialized(
          Actor attacker, Actor target) =>
      new BreakNeckOnGroundSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  BreakNeckOnGroundSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [FinishBreakNeck.builder];

  int get attacker;

  @override
  int get id;

  @override
  String get name => "BreakNeckOnGroundSituation";

  int get target;

  @override
  int get time;

  @override
  BreakNeckOnGroundSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
