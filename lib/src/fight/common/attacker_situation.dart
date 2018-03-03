library stranded.fight.attacker_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

part 'attacker_situation.g.dart';

abstract class AttackerSituation extends Situation
    implements Built<AttackerSituation, AttackerSituationBuilder> {
  static Serializer<AttackerSituation> get serializer =>
      _$attackerSituationSerializer;

  factory AttackerSituation([void updates(AttackerSituationBuilder b)]) =
      _$AttackerSituation;

  factory AttackerSituation.initialized(
          String situationName,
          Iterable<EnemyTargetActionBuilder> actionGenerators,
          Actor attacker,
          Actor target) =>
      new AttackerSituation((b) => b
        ..id = getRandomId()
        ..name = situationName
        ..builtActionGenerators =
            new ListBuilder<EnemyTargetActionBuilder>(actionGenerators)
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  AttackerSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      builtActionGenerators.toList(growable: false);

  BuiltList<EnemyTargetActionBuilder> get builtActionGenerators;

  int get attacker;

  @override
  int get id;

  @override
  String get name;

  int get target;

  @override
  int get time;

  @override
  AttackerSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
