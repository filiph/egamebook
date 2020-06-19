import 'dart:math';

import 'package:edgehead/edgehead_actors.dart';
import 'package:edgehead/edgehead_event_callbacks_gather.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/edgehead_simulation.dart';
import 'package:edgehead/egamebook/elements/stat_update_element.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

export 'package:edgehead/edgehead_ids.dart';
export 'package:edgehead/edgehead_items.dart';

bool bothAreAlive(Actor a, Actor b) {
  return a.isAnimatedAndActive && b.isAnimatedAndActive;
}

/// Battlefield fight.
FightSituation generateBattlefieldFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;
  final weak = _orcsLackCockroachesDescribe(c);
  if (weak) {
    c.outputStoryline.add('They seem famished.');
  }
  final leatherJerkinOrcId = w.randomInt();
  final leatherJerkinOrc = Actor.initialized(
      leatherJerkinOrcId, w.randomInt, "orc",
      adjective: 'ordinary',
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.axe,
          adjective: 'battle', firstOwnerId: leatherJerkinOrcId),
      constitution: 1,
      dexterity: weak ? 50 : 100,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);

  w.actors.addAll([sixtyFiverOrc, leatherJerkinOrc]);

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [sixtyFiverOrc, leatherJerkinOrc],
    "{battlefield|concrete} floor",
    roomRoamingSituation,
    {},
    items: const [],
  );
}

/// The fight west of The Bleeds.
FightSituation generateBleedsGoblinSkirmishPatrol(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;
  var goblinId = w.randomInt();
  var goblin = Actor.initialized(goblinId, w.randomInt, "goblin",
      adjective: "snarky",
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.spear,
          adjective: "gray", firstOwnerId: goblinId),
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  w.actors.add(goblin);
  return FightSituation.initialized(w.randomInt(), party, [goblin],
      "{muddy |wet |}ground", roomRoamingSituation, {});
}

/// God's lair fight.
FightSituation generateGodsLairFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;
  final weak = _orcsLackCockroachesDescribe(c);
  if (weak) {
    c.outputStoryline.add('They seem famished.');
  }
  final orcBerserkerId = w.randomInt();
  final orcBerserker = Actor.initialized(
      orcBerserkerId, w.randomInt, "berserker",
      adjective: 'orc',
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.axe,
          name: 'battle axe',
          adjective: 'berserker',
          firstOwnerId: orcBerserkerId),
      constitution: weak ? 2 : 3,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  final orcCaptainId = w.randomInt();
  final orcCaptain = Actor.initialized(orcCaptainId, w.randomInt, 'captain',
      adjective: 'orc',
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.sword,
          adjective: 'labelled', firstOwnerId: orcCaptainId),
      constitution: weak ? 1 : 2,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);

  w.actors.addAll([orcBerserker, orcCaptain]);

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [orcBerserker, orcCaptain],
    "{|concrete} floor",
    roomRoamingSituation,
    {},
    items: const [],
  );
}

/// "Random encounter"
FightSituation generateRandomEncounter(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final s = c.outputStoryline;
  final initialPlayer = c.actor;

  final isInside = w.randomBool();
  final groundMaterial = isInside ? "{cold|gray} floor" : "{wet|muddy} ground";

  final enemies = <Actor>[];

  switch (w.randomInt(3)) {
    case 0:
      final hasSpear = w.randomBool();
      enemies.add(_makeGoblin(w, spear: hasSpear, spearAdjective: 'black'));
      s.add(
          "A goblin stands in front of me, "
          "wielding a ${hasSpear ? 'black spear' : 'rusty sword'}.",
          isRaw: true);
      break;
    case 1:
      enemies.add(_makeOrc(w));
      s.add("An orc stands in front of me, wielding a sword.", isRaw: true);
      break;
    case 2:
      final orc = Actor.initialized(6000, w.randomInt, "orc",
          pronoun: Pronoun.HE,
          constitution: 2,
          team: defaultEnemyTeam,
          initiative: 100,
          foldFunctionHandle: carelessMonsterFoldFunctionHandle);
      final equippedOrc = orc.rebuild((b) => b.inventory.equip(
          Item.weapon(w.randomInt(), WeaponType.sword,
              adjective: 'crude', firstOwnerId: orc.id),
          orc.anatomy));
      enemies.add(equippedOrc);
      final goblin = _makeGoblin(w, spear: true);
      enemies.add(goblin);
      s.add(
          "An orc and a goblin stand in front of me. "
          "The orc is wielding a crude sword, the goblin is holding a spear.",
          isRaw: true);
      break;
    default:
      throw UnimplementedError();
  }
  w.actors.addAll(enemies);

  final items = <Item>[];
  if (w.randomBool()) {
    String name;
    if (w.randomBool()) {
      name = w.randomBool() ? "dagger" : "knife";
      items.add(Item.weapon(w.randomInt(), WeaponType.dagger,
          name: name, adjective: 'plain'));
    } else {
      name = w.randomBool() ? "axe" : "hatchet";
      items.add(Item.weapon(w.randomInt(), WeaponType.axe,
          name: name, adjective: 'plain'));
    }

    final numberOfUs = enemies.length == 1 ? "the two of " : "";
    s.add(
        "Between ${numberOfUs}us, "
        "{a plain|an ordinary} $name lies on the $groundMaterial.",
        isRaw: true);
  }

  if (w.randomBool()) {
    String name;

    if (w.randomBool()) {
      name = w.randomBool() ? "rock" : "brick";
      items.add(Item.weapon(w.randomInt(), WeaponType.rock,
          name: name, adjective: 'hefty'));
    } else {
      name = "branch";
      items.add(Item.weapon(w.randomInt(), WeaponType.club,
          name: 'branch', adjective: 'hefty'));
    }

    s.add(
        "I ${items.isNotEmpty ? 'also' : ''} notice "
        "a nice, hefty $name in the ${isInside ? 'rubble' : 'puddle'} "
        "on the ground.",
        isRaw: true);
  }

  if (items.isEmpty) {
    s.add("A quick glance reveals there's nothing useful on the ground.",
        isRaw: true);
  }

  s.addParagraph();

  switch (w.randomInt(4)) {
    case 0:
      initialPlayer.report(s, "<subject> <is> barehanded");
      break;
    case 1:
    case 2:
      final name = w.randomBool() ? "sword" : "scimitar";
      final adjective = w.randomBool() ? "shiny" : "family";
      final sword = Item.weapon(w.randomInt(), WeaponType.sword,
          name: name, adjective: adjective, firstOwnerId: playerId);
      w.updateActorById(
          playerId, (b) => b.inventory.equip(sword, initialPlayer.anatomy));
      initialPlayer.report(s, "<subject> <is> {holding|wielding} a $name");
      break;
    case 3:
      final name = w.randomBool() ? "spear" : "pike";
      final spear = Item.weapon(w.randomInt(), WeaponType.spear,
          name: name, adjective: 'moldy', firstOwnerId: playerId);
      w.updateActorById(
          playerId, (b) => b.inventory.equip(spear, initialPlayer.anatomy));
      initialPlayer.report(s, "<subject> <is> {holding|wielding} a $name");
      break;
    default:
      throw UnimplementedError();
  }

  return FightSituation.initialized(
    w.randomInt(),
    party.where((a) => a.isPlayer).toList(),
    enemies,
    groundMaterial,
    roomRoamingSituation,
    {
      // TODO: optional reinforcement
    },
    items: items,
  );
}

/// The fight at the start of Knights of San Francisco, with Tamara.
FightSituation generateStartFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;
  var firstGoblin = Actor.initialized(firstGoblinId, w.randomInt, "goblin",
      adjective: "feral",
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.sword,
          name: "sword", adjective: "rusty", firstOwnerId: firstGoblinId),
      dexterity: 150,
      // The goblin starts the fight.
      initiative: 2000,
      // For the first 2 rounds, the goblin is invincible. We don't want
      // Tamara to kill him before the player has any chance to do something.
      isInvincible: true,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  w.actors.add(firstGoblin);
  return FightSituation.initialized(
    w.randomInt(),
    party,
    [firstGoblin],
    "{muddy |wet |}ground",
    roomRoamingSituation,
    {
      3: start_make_goblin_not_invincible,
      2: start_tamara_bellows,
    },
  );
}

/// Either returns `we` or `I`, depending on the current state of the party.
///
/// Calls [getPartyOf] in the background.
String getWeOrI(Actor a, Simulation sim, WorldState originalWorld,
    {@required bool capitalized}) {
  final party = getPartyOf(a, sim, originalWorld);
  if (party.length > 1) {
    return capitalized ? 'We' : 'we';
  } else {
    return 'I';
  }
}

Actor _makeGoblin(WorldStateBuilder w,
    {int id,
    bool spear = false,
    String spearAdjective = 'crude',
    String swordAdjective = 'rusty',
    String currentRoomName}) {
  final goblinId = id ?? w.randomInt();
  return Actor.initialized(goblinId, w.randomInt, "goblin",
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: spear
          ? Item.weapon(w.randomInt(), WeaponType.spear,
              adjective: spearAdjective, firstOwnerId: goblinId)
          : Item.weapon(w.randomInt(), WeaponType.sword,
              adjective: swordAdjective, firstOwnerId: goblinId),
      team: defaultEnemyTeam,
      currentRoomName: currentRoomName,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
}

Actor _makeOrc(WorldStateBuilder w,
    {int id, int constitution = 2, String swordAdjective = 'orcish'}) {
  final orcId = id ?? w.randomInt();
  return Actor.initialized(orcId, w.randomInt, "orc",
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.sword,
          adjective: swordAdjective, firstOwnerId: orcId),
      constitution: constitution,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
}

/// Returns `true` if the cockroach farm has been destroyed and so the orcs
/// and goblins are weak.
bool _orcsLackCockroachesDescribe(ApplicabilityContext c) {
  final event = c.world.customHistory.query(name: evOpenedDam).latest;
  if (event == null) return false;

  if (c.world.time.difference(event.time) > const Duration(minutes: 60)) {
    // It's been more than enough time for the lack of food to affect
    // performance.
    return true;
  }
  return false;
}

extension ActionContextHelpers on ActionContext {
  void movePlayer(String locationName) {
    getRoomRoaming().moveActor(this, locationName);
  }

  /// _Learning_ about something means that someone has already .
  void learnAbout(String topic) {
    outputWorld.recordCustom("learns_about_$topic", actor: player);

    // When someone learns about something, they automatically
    // also _hear_ about it.
    hearAbout(topic);
  }

  void markHappened(String eventId) {
    outputWorld.recordCustom(eventId);
  }

  /// _Hearing_ about something means we have heard it mentioned, but
  /// we haven't been told any details.
  ///
  /// For example, someone might have said "well and then there's the wizard"
  /// and nothing else. Then we have just heard about the wizard, and we might
  /// want to [learnAbout] him.
  void hearAbout(String topic) {
    outputWorld.recordCustom("hears_about_$topic", actor: player);
  }

  void giveStaminaToPlayer(int amount) {
    outputStoryline
        .addCustomElement(StatUpdate.stamina(player.stamina, amount));
    outputWorld.updateActorById(playerId, (b) => b..stamina += amount);
  }

  void giveNewItemToPlayer(Item item) {
    outputWorld.updateActorById(playerId, (b) => b..inventory.add(item));
  }

  void removeItemFromPlayer(int itemId) {
    final item =
        player.inventory.items.singleWhere((item) => item.id == itemId);
    outputWorld.updateActorById(playerId, (b) => b..inventory.remove(item));
  }

  Actor get player {
    return outputWorld.getActorById(playerId);
  }
}

extension ApplicabilityContextHelpers on ApplicabilityContext {
  /// Returns `true` while player is roaming through Knights and is in an idle
  /// room (i.e. can do things like chatting or reading).
  bool get isInIdleRoom {
    if (world.currentSituation is! RoomRoamingSituation) return false;
    final situation = world.currentSituation as RoomRoamingSituation;
    if (situation.monstersAlive) return false;
    return simulation.getRoomByName(situation.currentRoomName).isIdle;
  }

  Actor get player {
    return world.getActorById(playerId);
  }

  /// The room the player is currently in. If they are in a variant,
  /// then this reports the variant.
  Room get playerRoom {
    return simulation.getRoomByName(player.currentRoomName);
  }

  /// Same as [playerRoom] if the player is in a "base" room. If they are in
  /// a variant room, then this getter returns the base (i.e. parent) room.
  Room get playerParentRoom {
    return simulation.getRoomParent(playerRoom);
  }

  RoomRoamingSituation getRoomRoaming() {
    return world.getSituationByName<RoomRoamingSituation>(
        RoomRoamingSituation.className);
  }

  bool hasHappened(String eventId, {int actorId}) {
    return world.customHistory
        .query(name: eventId, actorId: actorId)
        .hasHappened;
  }

  /// Queries the history of [hearAbout].
  bool hasHeardAbout(String topic) {
    return world.customHistory
        .query(name: "hears_about_$topic", actorId: playerId)
        .hasHappened;
  }

  /// Queries the history of [learnAbout].
  bool hasLearnedAbout(String topic) {
    return world.customHistory
        .query(name: "learns_about_$topic", actorId: playerId)
        .hasHappened;
  }

  /// Returns `true` if player currently is in a room with [roomName],
  /// or a variant of that room.
  bool inRoomParent(String roomName) {
    final parentRoom = simulation.getRoomParent(playerRoom);
    return parentRoom.name == roomName;
  }

  bool get inPopulatedRoom =>
      inRoomParent('bleeds_main') ||
      inRoomParent('farmers_village') ||
      inRoomParent('staging_area') ||
      inRoomParent('slopes') ||
      inRoomParent('knights_hq_main') ||
      inRoomParent('deathless_village');

  /// Returns `true` if the player is currently in the same room as [actorId].
  ///
  /// Ignores variants, so it's safe even if one of the actors is in
  /// a different "variant".
  bool inRoomWith(int actorId) {
    final playerRoom = simulation.getRoomByName(player.currentRoomName);
    assert(playerRoom.parent == null, "Player is in a variant room.");
    final actor = world.getActorById(actorId);
    final actorRoom = simulation.getRoomByName(actor.currentRoomName);
    assert(actorRoom.parent == null, "Actor is in a variant room.");
    return playerRoom == actorRoom;
  }

  int minutesSinceFirstVisit(String roomName) {
    final first = world.visitHistory
        .query(player, simulation.getRoomByName(roomName))
        .oldest;
    if (first == null) {
      // Player has never been to [roomName].
      return -1;
    }

    final difference = world.time.difference(first.time);
    final result = difference.inMinutes;

    return result;
  }

  /// Returns `true` if [actorId] is currently hurt.
  bool isHurt(int actorId) {
    final actor = world.getActorById(actorId);
    return actor.anatomy.woundedParts.isNotEmpty;
  }

  bool hasItem(int itemId) {
    return player.inventory.items.where((item) => item.id == itemId).isNotEmpty;
  }

  double playerDistanceTo(String roomName) {
    final otherRoom = simulation.getRoomByName(roomName);
    assert(
        otherRoom.isOnMap,
        'Trying to learn player distance to $roomName, '
        'which doesn\'t have position.');
    final room = playerParentRoom;
    if (!room.isOnMap) {
      // Fail silently. The player is in a room with no position.
      return double.infinity;
    }
    return sqrt(pow(otherRoom.positionX - room.positionX, 2) +
        pow(otherRoom.positionY - room.positionY, 2));
  }

  /// Returns `true` if player has ever visited [roomName].
  bool playerHasVisited(String roomName, {bool includeVariants = false}) {
    final room = simulation.getRoomByName(roomName);
    return world.visitHistory
        .query(player, room, includeVariants: includeVariants)
        .hasHappened;
  }
}
