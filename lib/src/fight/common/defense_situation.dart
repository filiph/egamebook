library stranded.fight.defense_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/predeterminable_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'defense_situation.g.dart';

abstract class DefenseSituation extends Situation
    with Predeterminable
    implements Built<DefenseSituation, DefenseSituationBuilder> {
  static Serializer<DefenseSituation> get serializer =>
      _$defenseSituationSerializer;

  factory DefenseSituation([void updates(DefenseSituationBuilder b)]) =
      _$DefenseSituation;

  factory DefenseSituation.initialized(
          String situationName,
          Iterable<EnemyTargetActionBuilder> actionGenerators,
          Actor attacker,
          Actor target,
          Predetermination predetermination) =>
      new DefenseSituation((b) => b
        ..id = getRandomId()
        ..name = situationName
        ..builtActionGenerators =
            new ListBuilder<EnemyTargetActionBuilder>(actionGenerators)
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predetermination);

  DefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      builtActionGenerators.toList(growable: false);

  BuiltList<EnemyTargetActionBuilder> get builtActionGenerators;

  @override
  Predetermination get predeterminedResult;

  int get attacker;

  @override
  int get id;

  @override
  int get maxActionsToShow => 1000;

  @override
  String get name;

  /// The defender.
  int get target;

  @override
  int get time;

  @override
  DefenseSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(target);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
