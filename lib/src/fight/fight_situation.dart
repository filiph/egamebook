library stranded.fight.fight_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:meta/meta.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/alternate_iterables.dart';
import 'package:edgehead/fractal_stories/world.dart';

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
      <ActionGenerator>[kickOffBalance, startSlash, slashGroundedEnemy];
  get actions => <ActorAction>[regainBalance, standUp];
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
  @virtual
  int time = 0;
  @virtual
  BuiltList<int> playerTeamIds;
  @virtual
  BuiltList<int> enemyTeamIds;
  @virtual
  MapBuilder<int, TimedEventCallback> events =
      new MapBuilder<int, TimedEventCallback>();

  factory FightSituationBuilder() = _$FightSituationBuilder;
  FightSituationBuilder._();
}
