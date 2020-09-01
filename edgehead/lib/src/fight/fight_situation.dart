library stranded.fight.fight_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/util/alternate_iterables.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/assume_stance.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';
import 'package:edgehead/src/fight/actions/cower.dart';
import 'package:edgehead/src/fight/actions/debug_kill_enemies.dart';
import 'package:edgehead/src/fight/actions/disarm_kick.dart';
import 'package:edgehead/src/fight/actions/drop_current_weapon.dart';
import 'package:edgehead/src/fight/actions/equip_weapon.dart';
import 'package:edgehead/src/fight/actions/kick_item_out_of_reach.dart';
import 'package:edgehead/src/fight/actions/punch_on_ground.dart';
import 'package:edgehead/src/fight/actions/raise_dead.dart';
import 'package:edgehead/src/fight/actions/regain_balance.dart';
import 'package:edgehead/src/fight/actions/scramble.dart';
import 'package:edgehead/src/fight/actions/smack_with_harmless_item.dart';
import 'package:edgehead/src/fight/actions/stand_up.dart';
import 'package:edgehead/src/fight/actions/start_bite.dart';
import 'package:edgehead/src/fight/actions/start_blunt_swing_at_head.dart';
import 'package:edgehead/src/fight/actions/start_break_neck_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_clash.dart';
import 'package:edgehead/src/fight/actions/start_crack_skull_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_feint_jab.dart';
import 'package:edgehead/src/fight/actions/start_feint_slash.dart';
import 'package:edgehead/src/fight/actions/start_leap.dart';
import 'package:edgehead/src/fight/actions/start_pull_down.dart';
import 'package:edgehead/src/fight/actions/start_punch.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_arm.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_body_part.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_leg.dart';
import 'package:edgehead/src/fight/actions/start_slash_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/actions/start_sweep_feet.dart';
import 'package:edgehead/src/fight/actions/start_throw_harmless.dart';
import 'package:edgehead/src/fight/actions/start_throw_rock.dart';
import 'package:edgehead/src/fight/actions/start_throw_thrusting_weapon.dart';
import 'package:edgehead/src/fight/actions/start_thrust.dart';
import 'package:edgehead/src/fight/actions/start_thrust_at_eye.dart';
import 'package:edgehead/src/fight/actions/start_thrust_down.dart';
import 'package:edgehead/src/fight/actions/start_thrust_on_ground.dart';
import 'package:edgehead/src/fight/actions/take_dropped_shield.dart';
import 'package:edgehead/src/fight/actions/take_dropped_weapon.dart';
import 'package:edgehead/src/fight/actions/thrash_around_blind.dart';
import 'package:edgehead/src/fight/actions/throw_grenade.dart';
import 'package:edgehead/src/fight/actions/unconfuse.dart';
import 'package:edgehead/src/fight/actions/wait.dart';
import 'package:edgehead/src/fight/actions/wrestle_weapon_on_ground.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:logging/logging.dart';

part 'fight_situation.g.dart';

String getGroundMaterial(WorldStateBuilder w) {
  var fight = w.getSituationByName<FightSituation>(FightSituation.className);
  var groundMaterial = fight.groundMaterial;
  return groundMaterial;
}

abstract class FightSituation extends Object
    with SituationBaseBehavior
    implements Built<FightSituation, FightSituationBuilder> {
  static const String className = "FightSituation";

  static final Logger _log = Logger('FightSituation');

  static Serializer<FightSituation> get serializer =>
      _$fightSituationSerializer;

  factory FightSituation([void updates(FightSituationBuilder b)]) =
      _$FightSituation;

  factory FightSituation.initialized(
      int id,
      List<Actor> playerTeam,
      List<Actor> enemyTeam,
      String groundMaterial,
      RoomRoamingSituation roomRoamingSituation,
      Map<int, EventCallback> events,
      {List<Item> items = const []}) {
    assert(_ensureUniqueIds(playerTeam.followedBy(enemyTeam), items));

    return FightSituation((b) => b
      ..id = id
      ..turn = 0
      ..playerTeamIds.replace(playerTeam.map<int>((a) => a.id))
      ..enemyTeamIds.replace(enemyTeam.map<int>((a) => a.id))
      ..groundMaterial = groundMaterial
      ..droppedItems = ListBuilder<Item>(items)
      ..droppedItemsOutOfReach = ListBuilder<Item>()
      ..roomRoamingSituationId = roomRoamingSituation.id
      ..events = MapBuilder<int, EventCallback>(events));
  }

  FightSituation._();

  @override
  List<Action<dynamic>> get actions => <Action<dynamic>>[
        StartClash.singleton,
        Confuse.singleton,
        DisarmKick.singleton,
        EquipWeapon.singleton,
        FeintJab.singleton,
        FeintSlash.singleton,
        PullDown.singleton,
        PunchOnGround.singleton,
        SmackWithHarmlessItem.singleton,
        SweepFeet.singleton,
        startBiteAtBodyPartGenerator(BodyPartDesignation.leftLeg),
        startBiteAtBodyPartGenerator(BodyPartDesignation.rightLeg),
        startBiteAtBodyPartGenerator(BodyPartDesignation.primaryArm),
        startBiteAtBodyPartGenerator(BodyPartDesignation.secondaryArm),
        startBiteAtBodyPartGenerator(BodyPartDesignation.neck),
        startBiteAtBodyPartGenerator(BodyPartDesignation.torso),
        startBluntSwingAtHead(),
        startBreakNeckOnGroundBuilder(),
        startCrackSkullOnGroundBuilder(),
        startLeapBuilder(),
        startPunchBuilder(),
        StartSlashAtArm.singleton,
        StartSlashAtRemainingArm.singleton,
        startSlashAtBodyPartGenerator(BodyPartDesignation.neck),
        StartSlashAtLeg.singleton,
        StartSlashAtRemainingLeg.singleton,
        startSlashOnGroundBuilder(),
        startStrikeDownBuilder(),
        startThrowHarmless(),
        startThrowRock(),
        StartThrustAtEye.singleton,
        StartThrustAtRemainingEye.singleton,
        startThrustAtBodyPartGenerator(BodyPartDesignation.torso),
        startThrustDownBuilder(),
        startThrustOnGroundBuilder(),
        TakeDroppedShield.singleton,
        TakeDroppedWeapon.singleton,
        startThrowThrustingWeapon(),
        // simple ones
        AssumeStance.singleton,
        Cower.singleton,
        DropCurrentWeapon.singleton,
        KickItemOutOfReach.singleton,
        RegainBalance.singleton,
        StandUp.singleton,
        Scramble.singleton,
        RaiseDead.singleton,
        ThrashAroundBlind.singleton,
        ThrowGrenade.singleton,
        Unconfuse.singleton,
        Wait.singleton,
        WrestleWeaponOnGround.singleton,
        // Debug & testing
        DebugKillEnemies.singleton,
      ];

  /// The items dropped by combatants, or lying around from the beginning of
  /// the fight.
  BuiltList<Item> get droppedItems;

  /// Items that cannot be used in the fight but can be picked up after it.
  /// For example, an arrow that went past someone's head will be only
  /// recoverable after combat.
  BuiltList<Item> get droppedItemsOutOfReach;

  BuiltSet<int> get enemyTeamIds;

  BuiltMap<int, EventCallback> get events;

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
  String get name => className;

  BuiltSet<int> get playerTeamIds;

  /// This is used to update the underlying [RoomRoamingSituation] with the
  /// fact that all monsters have been slain.
  int get roomRoamingSituationId;

  @override
  int get turn;

  /// Returns `true` if any actor among [teamIds] can still fight
  /// (and is active).
  bool canFight(
          Simulation sim, WorldStateBuilder world, Iterable<int> teamIds) =>
      teamIds.any((id) => world.getActorById(id).isAnimatedAndActive);

  @override
  FightSituation elapseTurn() => rebuild((b) => b..turn += 1);

  @override
  Iterable<Actor> getActors(_, WorldState w) => w.actors.where((Actor actor) =>
      actor.isAnimatedAndActive &&
      (playerTeamIds.contains(actor.id) || enemyTeamIds.contains(actor.id)));

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState world) {
    var allActorIds = alternate(playerTeamIds, enemyTeamIds);
    var actors = allActorIds
        .map((id) => world.getActorById(id))
        .where((a) => a.isAnimatedAndActive)
        .toList(growable: false);

    Actor readiest;
    for (final actor in actors) {
      if (readiest == null) {
        readiest = actor;
        continue;
      }

      if (actor.recoveringUntil.isBefore(readiest.recoveringUntil)) {
        readiest = actor;
      }
    }

    if (readiest == null) {
      return ActorTurn.never;
    }

    return ActorTurn(readiest, world.time);
  }

  @override
  void onAfterTurn(ActionContext context) {
    // We're using [onAfterTurn] because when using onAfterAction, we'd report
    // timed events at a time when an action in FightSituation might have
    // created other (child) situations.
    if (events.containsKey(turn)) {
      final callback = events[turn];
      callback.run(context, context.simulation, context.outputWorld,
          context.outputStoryline);
    }

    assert(_ensureUniqueIds(context.outputWorld.actors.build(),
        droppedItems.followedBy(droppedItemsOutOfReach)));
  }

  @override
  void onPop(ActionContext context) {
    final sim = context.simulation;
    final world = context.outputWorld;
    if (roomRoamingSituationId != null &&
        !canFight(sim, world, enemyTeamIds) &&
        canFight(sim, world, playerTeamIds)) {
      // We should update the underlying roomRoamingSituation with the fact
      // that all monsters have been slain.
      final situation = world.getSituationById(roomRoamingSituationId)
          as RoomRoamingSituation;
      world.replaceSituationById(
          situation.id, situation.rebuild((b) => b..monstersAlive = false));

      // We should also record this slaying so that the next time the player
      // visits, the monsters don't reappear.
      final room = sim.getRoomByName(situation.currentRoomName);
      world.recordSlaying(context.actor, room);

      for (final id in playerTeamIds) {
        if (world.getActorById(id).isAnimatedAndActive) {
          world.updateActorById(id, (b) => b..pose = b.poseMax);
        }
      }

      if (room.afterMonstersCleared != null) {
        room.afterMonstersCleared(context);
      }

      // Allow player to take and distribute loot.
      world.pushSituation(LootSituation.initialized(
          world.randomInt(),
          playerTeamIds,
          groundMaterial,
          droppedItems.toList()..addAll(droppedItemsOutOfReach)));
    } else if (!canFight(sim, world, playerTeamIds)) {
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
  bool shouldContinue(Simulation sim, WorldState world) {
    bool isPlayerAndAlive(int id) {
      var actor = world.getActorById(id);
      return actor.isPlayer && actor.isAnimatedAndActive;
    }

    final built = world.toBuilder();
    return canFight(sim, built, playerTeamIds) &&
        canFight(sim, built, enemyTeamIds) &&
        playerTeamIds.any(isPlayerAndAlive);
  }

  /// Because [FightSituation] is one of the more dynamic parts of the game,
  /// with lots of entities, it's especially important to check that duplicate
  /// ids can never happen.
  static bool _ensureUniqueIds(
      Iterable<Actor> actors, Iterable<Item> locationItems) {
    final ids = <int>{};
    final duplicates = <int>{};
    final map = <int, Entity>{};

    /// A map of locations: where the entity with given id was seen.
    final locations = <int, String>{};

    void checkDuplicate(Entity entity, String location) {
      final id = entity.id;

      if (ids.contains(id)) {
        duplicates.add(id);
        _log.warning('Entities have duplicate id ($entity): '
            '$entity vs ${map[id]}.  Previous one was in ${locations[id]}, '
            'this one is in $location');
        assert(
            false,
            'Entities have duplicate id ($entity): '
            '$entity vs ${map[id]}. Previous one was in ${locations[id]}, '
            'this one is in $location. Possible copy-paste error when '
            'making a new actor or new item and leaving the same '
            'id.');
      }
      ids.add(id);
      map[id] = entity;
      locations[id] = location;
    }

    for (final actor in actors) {
      checkDuplicate(actor, "actors");

      for (final e in actor.inventory.items) {
        checkDuplicate(e, "${actor.name}'s items");
      }
      for (final e in actor.anatomy.allParts) {
        checkDuplicate(e, "${actor.name}'s body parts");
      }
    }

    for (final e in locationItems) {
      checkDuplicate(e, "location items");
    }

    if (duplicates.isNotEmpty) {
      _log.severe('Duplicate ids: $duplicates.');
    }

    return duplicates.isEmpty;
  }
}
