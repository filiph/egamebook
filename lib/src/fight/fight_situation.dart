library stranded.fight.fight_situation;

import 'package:built_value/built_value.dart';
import 'package:built_collection/built_collection.dart';
import 'package:quiver/core.dart';

import 'package:stranded/actor.dart';
import 'package:stranded/situation.dart';
import 'package:stranded/util/alternate_iterables.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/action.dart';
import 'kick.dart';
import 'slash.dart';
import 'regain_balance.dart';
import 'slash_grounded_enemy.dart';
import 'stand_up.dart';

part 'fight_situation.g.dart';

abstract class FightSituation extends SituationState
    with ElapsingTime<FightSituation, FightSituationBuilder>
    implements Built<FightSituation, FightSituationBuilder> {
  String get name => "FightSituation";
  int get time;
  BuiltList<int> get playerTeamIds;
  BuiltList<int> get enemyTeamIds;
  BuiltMap<int, TimedEventCallback> get events;

  FightSituation._();
  factory FightSituation([updates(FightSituationBuilder b)]) = _$FightSituation;

  get actions => [regainBalance, standUp];
  List<ActionGenerator> get actionGenerators =>
      [kickOffBalance, startSlash, slashGroundedEnemy];

  @override
  bool shouldContinue(WorldState world) {
    bool canFight(Iterable<int> teamIds) =>
        teamIds.any((id) => world.getActorById(id).isAliveAndActive);
    bool isPlayerAndAlive(int id) {
      var actor = world.getActorById(id);
      return actor.isPlayer && actor.isAliveAndActive;
    }
    return canFight(playerTeamIds) &&
        canFight(enemyTeamIds) &&
        playerTeamIds.any(isPlayerAndAlive);
  }

  // We're using [onBeforeAction] because when using onAfterAction, we'd report
  // timed events at a time when an action in FightSituation might have
  // created other (child) situations.
  @override
  void onBeforeAction(WorldState world, Storyline s) {
    if (events.containsKey(time)) {
      events[time](world, s);
    }
  }

  @override
  Actor getActorAtTime(int i, WorldState world) {
    // TODO: add _lastActor and use that to offset [i] if needed (when one of
    //       the actors is removed during the fight.
    var allActorIds = alternate/*<int>*/(playerTeamIds, enemyTeamIds);
    var activeActorsIds = allActorIds
        .where((id) => world.getActorById(id).isAliveAndActive)
        .toList(growable: false);
    i = i % activeActorsIds.length;
    return world.getActorById(activeActorsIds[i]);
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((Actor actor) =>
          actor.isAliveAndActive &&
          (playerTeamIds.contains(actor.id) ||
              enemyTeamIds.contains(actor.id)));
}

abstract class FightSituationBuilder
    implements
        Builder<FightSituation, FightSituationBuilder>,
        SituationStateBuilderBase {
  int time = 0;
  BuiltList<int> playerTeamIds;
  BuiltList<int> enemyTeamIds;
  MapBuilder<int, TimedEventCallback> events =
      new MapBuilder<int, TimedEventCallback>();

  FightSituationBuilder._();
  factory FightSituationBuilder() = _$FightSituationBuilder;
}

typedef void TimedEventCallback(WorldState world, Storyline storyline);
