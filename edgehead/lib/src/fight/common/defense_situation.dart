// @dart=2.9

library stranded.fight.defense_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/pass_while_blind.dart';
import 'package:edgehead/src/fight/common/predeterminable_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'defense_situation.g.dart';

abstract class DefenseSituation extends Object
    with SituationBaseBehavior, Predeterminable
    implements Built<DefenseSituation, DefenseSituationBuilder> {
  static Serializer<DefenseSituation> get serializer =>
      _$defenseSituationSerializer;

  factory DefenseSituation([void updates(DefenseSituationBuilder b)]) =
      _$DefenseSituation;

  factory DefenseSituation.initialized(
          int id,
          String situationName,
          Iterable<OtherActorAction> builtOtherActorActionGenerators,
          Iterable<EnemyTargetAction> builtEnemyTargetActionGenerators,
          Actor attacker,
          Actor target,
          Predetermination predetermination) =>
      DefenseSituation((b) => b
        ..id = id
        ..name = situationName
        ..builtOtherActorActionGenerators =
            ListBuilder<OtherActorAction>(builtOtherActorActionGenerators)
        ..builtEnemyTargetActionGenerators =
            ListBuilder<EnemyTargetAction>(builtEnemyTargetActionGenerators)
        ..turn = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predetermination);

  DefenseSituation._();

  @override
  List<Action<dynamic>> get actions =>
      List<Action>.from(builtOtherActorActionGenerators)
        ..addAll(builtEnemyTargetActionGenerators)
        // Blind characters can't do much.
        ..add(PassWhileBlind.singleton);

  int get attacker;

  BuiltList<EnemyTargetAction> get builtEnemyTargetActionGenerators;

  BuiltList<OtherActorAction> get builtOtherActorActionGenerators;

  @override
  int get id;

  @override
  int get maxActionsToShow => 1000;

  @override
  String get name;

  @override
  Predetermination get predeterminedResult;

  /// The defender.
  int get target;

  @override
  int get turn;

  @override
  DefenseSituation elapseTurn() => rebuild((b) => b..turn += 1);

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState w) {
    if (turn == 0) return ActorTurn.byId(target, w);
    return ActorTurn.never;
  }

  @override
  Iterable<Actor> getActors(_, WorldState w) =>
      w.actors.where((actor) => actor.id == attacker || actor.id == target);
}
