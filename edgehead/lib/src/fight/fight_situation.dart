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
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/util/alternate_iterables.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/assume_stance.dart';
import 'package:edgehead/src/fight/actions/start_bite.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';
import 'package:edgehead/src/fight/actions/cower.dart';
import 'package:edgehead/src/fight/actions/disarm_kick.dart';
import 'package:edgehead/src/fight/actions/equip_weapon.dart';
import 'package:edgehead/src/fight/actions/kick_item_out_of_reach.dart';
import 'package:edgehead/src/fight/actions/regain_balance.dart';
import 'package:edgehead/src/fight/actions/scramble.dart';
import 'package:edgehead/src/fight/actions/stand_up.dart';
import 'package:edgehead/src/fight/actions/start_break_neck_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_clash.dart';
import 'package:edgehead/src/fight/actions/start_crack_skull_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_feint_jab.dart';
import 'package:edgehead/src/fight/actions/start_feint_slash.dart';
import 'package:edgehead/src/fight/actions/start_leap.dart';
import 'package:edgehead/src/fight/actions/start_punch.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_arm.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_body_part.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_leg.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/actions/start_sweep_feet.dart';
import 'package:edgehead/src/fight/actions/start_throw_rock.dart';
import 'package:edgehead/src/fight/actions/start_throw_thrusting_weapon.dart';
import 'package:edgehead/src/fight/actions/start_thrust.dart';
import 'package:edgehead/src/fight/actions/start_thrust_at_eye.dart';
import 'package:edgehead/src/fight/actions/start_thrust_spear_down.dart';
import 'package:edgehead/src/fight/actions/take_dropped_shield.dart';
import 'package:edgehead/src/fight/actions/take_dropped_weapon.dart';
import 'package:edgehead/src/fight/actions/turn_undead.dart';
import 'package:edgehead/src/fight/actions/unconfuse.dart';
import 'package:edgehead/src/fight/actions/wait.dart';
import 'package:edgehead/src/fight/actions/wrestle_weapon_on_ground.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

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

  static Serializer<FightSituation> get serializer =>
      _$fightSituationSerializer;

  factory FightSituation([void updates(FightSituationBuilder b)]) =
      _$FightSituation;

  factory FightSituation.initialized(
          int id,
          Iterable<Actor> playerTeam,
          Iterable<Actor> enemyTeam,
          String groundMaterial,
          RoomRoamingSituation roomRoamingSituation,
          Map<int, EventCallback> events,
          {Iterable<Item> items = const []}) =>
      FightSituation((b) => b
        ..id = id
        ..turn = 0
        ..playerTeamIds.replace(playerTeam.map<int>((a) => a.id))
        ..enemyTeamIds.replace(enemyTeam.map<int>((a) => a.id))
        ..groundMaterial = groundMaterial
        ..droppedItems = ListBuilder<Item>(items)
        ..droppedItemsOutOfReach = ListBuilder<Item>()
        ..roomRoamingSituationId = roomRoamingSituation.id
        ..events = MapBuilder<int, EventCallback>(events));
  FightSituation._();

  @override
  List<Action<dynamic>> get actions => <Action<dynamic>>[
        StartClash.singleton,
        Confuse.singleton,
        DisarmKick.singleton,
        EquipWeapon.singleton,
        FeintJab.singleton,
        FeintSlash.singleton,
        SweepFeet.singleton,
        startBiteAtBodyPartGenerator(BodyPartDesignation.leftLeg),
        startBiteAtBodyPartGenerator(BodyPartDesignation.rightLeg),
        startBiteAtBodyPartGenerator(BodyPartDesignation.primaryArm),
        startBiteAtBodyPartGenerator(BodyPartDesignation.secondaryArm),
        startBiteAtBodyPartGenerator(BodyPartDesignation.neck),
        startBiteAtBodyPartGenerator(BodyPartDesignation.torso),
        startBreakNeckOnGroundBuilder(),
        startCrackSkullOnGroundBuilder(),
        startLeapBuilder(),
        startPunchBuilder(),
        StartSlashAtArm.singleton,
        StartSlashAtRemainingArm.singleton,
        startSlashAtBodyPartGenerator(BodyPartDesignation.neck),
        StartSlashAtLeg.singleton,
        StartSlashAtRemainingLeg.singleton,
        startStrikeDownBuilder(),
        startThrowRock(),
        StartThrustAtEye.singleton,
        StartThrustAtRemainingEye.singleton,
        startThrustAtBodyPartGenerator(BodyPartDesignation.torso),
        startThrustSpearDownBuilder(),
        TakeDroppedShield.singleton,
        TakeDroppedWeapon.singleton,
        startThrowThrustingWeapon(),
        // simple ones
        AssumeStance.singleton,
        Cower.singleton,
        KickItemOutOfReach.singleton,
        RegainBalance.singleton,
        StandUp.singleton,
        Scramble.singleton,
        TurnUndead.singleton,
        Unconfuse.singleton,
        Wait.singleton,
        WrestleWeaponOnGround.singleton,
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
  }

  @override
  void onPop(Simulation sim, WorldStateBuilder world) {
    if (roomRoamingSituationId != null &&
        !canFight(sim, world, enemyTeamIds) &&
        canFight(sim, world, playerTeamIds)) {
      // We should update the underlying roomRoamingSituation with the fact
      // that all monsters have been slain.
      final situation = world.getSituationById(roomRoamingSituationId)
          as RoomRoamingSituation;
      world.replaceSituationById(
          situation.id, situation.rebuild((b) => b..monstersAlive = false));

      for (final id in playerTeamIds) {
        if (world.getActorById(id).isAnimatedAndActive) {
          world.updateActorById(id, (b) => b..pose = b.poseMax);
        }
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
}
