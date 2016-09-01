library stranded.fight.fight_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:quiver/core.dart';
import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/situation.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/util/alternate_iterables.dart';
import 'package:stranded/world.dart';

import 'kick.dart';
import 'on_ground/slash_grounded_enemy.dart';
import 'on_ground/stand_up.dart';
import 'regain_balance.dart';
import 'slash.dart';

part 'fight_situation.g.dart';

typedef void TimedEventCallback(WorldState world, Storyline storyline);

abstract class FightSituation extends SituationState
    with ElapsingTime<FightSituation, FightSituationBuilder>
    implements Built<FightSituation, FightSituationBuilder> {
  factory FightSituation([updates(FightSituationBuilder b)]) = _$FightSituation;
  FightSituation._();
  List<ActionGenerator> get actionGenerators =>
      [kickOffBalance, startSlash, slashGroundedEnemy];
  get actions => [regainBalance, standUp];
  BuiltList<int> get enemyTeamIds;

  BuiltMap<int, TimedEventCallback> get events;
  String get name => "FightSituation";

  BuiltList<int> get playerTeamIds;
  int get time;

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

  // We're using [onBeforeAction] because when using onAfterAction, we'd report
  // timed events at a time when an action in FightSituation might have
  // created other (child) situations.
  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((Actor actor) =>
          actor.isAliveAndActive &&
          (playerTeamIds.contains(actor.id) ||
              enemyTeamIds.contains(actor.id)));

  @override
  void onBeforeAction(WorldState world, Storyline s) {
    if (events.containsKey(time)) {
      events[time](world, s);
    }
  }

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

  factory FightSituationBuilder() = _$FightSituationBuilder;
  FightSituationBuilder._();
}
