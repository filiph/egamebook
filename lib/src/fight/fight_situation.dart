library stranded.fight.fight_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/alternate_iterables.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';
import 'package:edgehead/src/fight/actions/disarm_kick.dart';
import 'package:edgehead/src/fight/actions/kick_to_ground.dart';
import 'package:edgehead/src/fight/actions/pound.dart';
import 'package:edgehead/src/fight/actions/regain_balance.dart';
import 'package:edgehead/src/fight/actions/scramble.dart';
import 'package:edgehead/src/fight/actions/stand_up.dart';
import 'package:edgehead/src/fight/actions/start_break_neck_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_leap.dart';
import 'package:edgehead/src/fight/actions/start_punch.dart';
import 'package:edgehead/src/fight/actions/start_slash.dart';
import 'package:edgehead/src/fight/actions/start_slash_out_of_balance.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/actions/take_dropped_item.dart';
import 'package:edgehead/src/fight/actions/unconfuse.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

part 'fight_situation.g.dart';

String getGroundMaterial(WorldState w) {
  var fight = w.getSituationByName<FightSituation>("FightSituation");
  var groundMaterial = fight.groundMaterial;
  return groundMaterial;
}

typedef void TimedEventCallback(WorldState world, Storyline storyline);

abstract class FightSituation extends Situation
    implements Built<FightSituation, FightSituationBuilder> {
  /// The advantage that player has over all other actors in terms of frequency
  /// of turns.
  static const double _playerTurnAdvantage = 1.5;

  factory FightSituation([void updates(FightSituationBuilder b)]) =
      _$FightSituation;

  factory FightSituation.initialized(
          Iterable<Actor> playerTeam,
          Iterable<Actor> enemyTeam,
          String groundMaterial,
          RoomRoamingSituation roomRoamingSituation,
          Map<int, TimedEventCallback> events) =>
      new FightSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..playerTeamIds.replace(playerTeam.map((a) => a.id))
        ..enemyTeamIds.replace(enemyTeam.map((a) => a.id))
        ..groundMaterial = groundMaterial
        ..droppedItems = new ListBuilder<Item>()
        ..roomRoamingSituationId = roomRoamingSituation.id
        ..events = new MapBuilder<int, TimedEventCallback>(events));

  FightSituation._();
  @override
  List<ActionBuilder> get actionGenerators => [
        Confuse.builder,
        DisarmKick.builder,
        KickToGround.builder,
        Pound.builder,
        startBreakNeckOnGroundBuilder,
        startBreakNeckOnGroundPlayerBuilder,
        startLeapBuilder,
        startLeapPlayerBuilder,
        startPunchBuilder,
        startPunchPlayerBuilder,
        startSlashBuilder,
        startSlashPlayerBuilder,
        startStrikeDownBuilder,
        startStrikeDownPlayerBuilder,
        startSlashOutOfBalanceBuilder,
        startSlashOutOfBalancePlayerBuilder,
        TakeDroppedItem.builder,
      ];

  @override
  List<Action> get actions => <Action>[
        RegainBalance.singleton,
        StandUp.singleton,
        Scramble.singleton,
        Unconfuse.singleton
      ];

  /// The items dropped by dead combatants. The Map's `value` is a qualified
  /// name, such as "goblin's scimitar". The `key` is the actual item.
  BuiltList<Item> get droppedItems;

  BuiltList<int> get enemyTeamIds;

  BuiltMap<int, TimedEventCallback> get events;

  /// The material on the ground. It can be 'wooden floor' or 'grass'.
  ///
  /// This is used when describing how monsters and team members fall to the
  /// ground and how missiles get stuck in it.
  String get groundMaterial;

  @override
  int get id;

  @override
  int get maxActionsToShow => 1000;

  @override
  String get name => "FightSituation";

  BuiltList<int> get playerTeamIds;

  /// This is used to update the underlying [RoomRoamingSituation] with the
  /// fact that all monsters have been slain.
  int get roomRoamingSituationId;

  @override
  int get time;

  /// Returns `true` if any actor among `teamIds` can still fight
  /// (and is active).
  bool canFight(WorldState world, Iterable<int> teamIds) =>
      teamIds.any((id) => world.getActorById(id).isAliveAndActive);

  @override
  FightSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState world) {
    var allActorIds = alternate<int>(playerTeamIds, enemyTeamIds);
    var actors = allActorIds
        .map((id) => world.getActorById(id))
        .where((a) => a.isAliveAndActive)
        .toList(growable: false);
    var players = actors.where((a) => a.isPlayer).toList(growable: false);
    assert(players.length <= 1);
    Actor player = players.length == 1 ? players.single : null;

    if (time == 0) {
      // Always start with the player if possible.
      if (player != null) {
        return player;
      }
    }

    var best = 0.0;
    Actor chosen;

    for (var actor in actors) {
      // Compute the last time this actor did any pro-active action.
      var latestProactiveRecord = world.actionRecords.firstWhere(
          (rec) => rec.protagonist == actor.id && rec.wasProactive,
          orElse: () => null);
      int latestProactiveTime = latestProactiveRecord?.time ?? -1;
      int proactiveRecency = world.time - latestProactiveTime;
      // If actor did something just now, they shouldn't be chosen.
      if (proactiveRecency <= 0) continue;
      // Otherwise, let's look at who was aggressive recently.
      var latestAnyRecord = world.actionRecords
          .firstWhere((rec) => rec.protagonist == actor.id, orElse: () => null);
      int latestAnyTime = latestAnyRecord?.time ?? -1;
      int anyRecency = world.time - latestAnyTime;
      // We care about how long ago someone acted, but we especially care
      // about how long ago they made a pro-active action. This is because
      // otherwise an actor can be perpetually reacting to opponents and
      // never getting to their own action repertoire.
      num recency = (anyRecency + proactiveRecency) / 2;
      if (actor.isPlayer) {
        // Let player act more often.
        recency = recency * _playerTurnAdvantage;
      }
      if (recency > best) {
        chosen = actor;
        best = recency;
      }
    }

    return chosen;
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
  void onAfterTurn(WorldState world, Storyline s) {
    if (events.containsKey(time)) {
      events[time](world, s);
    }
  }

  @override
  void onPop(WorldState world) {
    if (roomRoamingSituationId != null &&
        !canFight(world, enemyTeamIds) &&
        canFight(world, playerTeamIds)) {
      // We should update the underlying roomRoamingSituation with the fact
      // that all monsters have been slain.
      RoomRoamingSituation situation =
          world.getSituationById(roomRoamingSituationId);
      world.replaceSituationById(
          situation.id, situation.rebuild((b) => b..monstersAlive = false));

      for (var id in playerTeamIds) {
        if (world.getActorById(id).isAliveAndActive) {
          world.updateActorById(id, (b) => b..pose = Pose.standing);
        }
      }

      // Allow player to take and distribute loot.
      world.pushSituation(new LootSituation.initialized(
          playerTeamIds, groundMaterial, droppedItems));
    } else if (!canFight(world, playerTeamIds)) {
      // Nothing to do here. The player's team is all dead.
    } else {
      assert(
          true,
          "$name is being popped but there are still players alive "
          "and we have no code path for that (for example, actors don't stand "
          "up). If this is a 'run away', you should probably implement a "
          "situation on top of $name");
    }
  }

  @override
  bool shouldContinue(WorldState world) {
    bool isPlayerAndAlive(int id) {
      var actor = world.getActorById(id);
      return actor.isPlayer && actor.isAliveAndActive;
    }

    return canFight(world, playerTeamIds) &&
        canFight(world, enemyTeamIds) &&
        playerTeamIds.any(isPlayerAndAlive);
  }
}
