library stranded.fight.fight_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/alternate_iterables.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/kick.dart';
import 'package:edgehead/src/fight/on_ground/slash_grounded_enemy.dart';
import 'package:edgehead/src/fight/on_ground/stand_up.dart';
import 'package:edgehead/src/fight/regain_balance.dart';
import 'package:edgehead/src/fight/slash.dart';

part 'fight_situation.g.dart';

typedef void TimedEventCallback(WorldState world, Storyline storyline);

abstract class FightSituation extends Situation
    implements Built<FightSituation, FightSituationBuilder> {
  factory FightSituation([updates(FightSituationBuilder b)]) = _$FightSituation;

  factory FightSituation.initialized(
          Iterable<Actor> playerTeam, Iterable<Actor> enemyTeam) =>
      new FightSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..playerTeamIds.replace(playerTeam.map((a) => a.id))
        ..enemyTeamIds.replace(enemyTeam.map((a) => a.id)));
  FightSituation._();

  get actionGenerators =>
      [Kick.builder, StartSlash.builder, StartSlashGroundedEnemy.builder];

  get actions => <ActorAction>[RegainBalance.singleton, StandUp.singleton];

  BuiltList<int> get enemyTeamIds;

  BuiltMap<int, TimedEventCallback> get events;

  int get id;

  String get name => "FightSituation";

  BuiltList<int> get playerTeamIds;

  int get time;

  @override
  FightSituation elapseTime() => rebuild((b) => b..time += 1);

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
