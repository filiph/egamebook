import 'dart:math';

import 'package:edgehead/edgehead_facts.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/edgehead_lib.dart';
import 'package:edgehead/egamebook/elements/stat_update_element.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/actions/slay_monsters.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

extension ActionContextHelpers on ActionContext {
  void movePlayer(String locationName) {
    getRoomRoaming().moveActor(player, this, locationName);
  }

  /// Learns a fact in a chain of facts.
  void learn(Object o) {
    ChainedFacts.singleton.learnFact(this, o);
  }

  void markHappened(String eventId) {
    outputWorld.recordCustom(eventId);
  }

  void giveStaminaToPlayer(int amount) {
    var staminaUpdate = amount;
    final newStamina = player.stamina + staminaUpdate;
    if (newStamina < 0) {
      // Don't go below 0. Just remove all current stamina.
      staminaUpdate = -player.stamina;
    } else if (newStamina > EdgeheadGame.staminaSetting.maxValue) {
      // Don't go over max value.
      staminaUpdate = EdgeheadGame.staminaSetting.maxValue - player.stamina;
    }

    outputStoryline
        .addCustomElement(StatUpdate.stamina(player.stamina, staminaUpdate));
    outputWorld.updateActorById(
        playerId, (b) => b.stamina = b.stamina! + staminaUpdate);
  }

  void giveSanityToPlayer(int amount) {
    var sanityUpdate = amount;
    final newSanity = player.sanity + sanityUpdate;
    if (newSanity < 0) {
      // Don't go below 0. Just remove all current sanity.
      sanityUpdate = -player.sanity;
    } else if (newSanity > EdgeheadGame.sanitySetting.maxValue) {
      // Don't go over max value.
      sanityUpdate = EdgeheadGame.sanitySetting.maxValue - player.sanity;
    }

    outputStoryline
        .addCustomElement(StatUpdate.sanity(player.sanity, sanityUpdate));
    outputWorld.updateActorById(
        playerId, (b) => b.sanity = b.sanity! + sanityUpdate);
  }

  void giveNewItemToPlayer(Item item) {
    outputWorld.updateActorById(playerId, (b) => b..inventory.add(item));
  }

  void removeItemFromPlayer(int itemId) {
    final item =
        player.inventory.items.singleWhere((item) => item.id == itemId);
    outputWorld.updateActorById(playerId, (b) => b..inventory.remove(item));
  }

  void increaseSanityFromPeople() {
    if (player.sanity >= EdgeheadGame.sanitySetting.maxValue) {
      // Already at max.
      return;
    }

    /// Minutes between this works again.
    const coolOffMinutes = 30;
    const customEventName = "increased_sanity_from_people";

    final latest = world.customHistory
        .query(name: customEventName, actorId: playerId)
        .latest;

    if (latest != null &&
        latest.time.difference(world.time).inMinutes < coolOffMinutes) {
      // Too soon. Do nothing.
      return;
    }

    giveSanityToPlayer(2);
    outputWorld.recordCustom(customEventName, actor: player);

    outputStoryline.add(
        'Being around people lifts a weight from my mind, '
        'and my sanity increases.',
        isRaw: true);
  }

  /// The default is female. This is the name of the custom event that sets
  /// this to male.
  static const String _playerIsMale = "player_is_male";

  static const String _playerHairColor = "player_hair_color";

  @Deprecated('use playerHasBurntFace')
  static const String _playerHasDebt = "player_has_debt";

  static const String _playerHasBurntFace = "player_has_burnt_face";

  static const String _playerHasWoodenFoot = "player_has_wooden_foot";

  static const String _playerHasAsthma = "player_has_asthma";

  void recordCharacterChoice(int gender, int hair, int debilitation) {
    void set(String name, [String? value]) {
      outputWorld.recordCustom(name, data: value);
    }

    switch (gender) {
      case 0:
        // Player is female by default, nothing to do here.
        break;
      case 1:
        set(_playerIsMale);
    }

    switch (hair) {
      case 0:
        set(_playerHairColor, "black");
      case 1:
        set(_playerHairColor, "brown");
      case 2:
        set(_playerHairColor, "blond");
    }

    switch (debilitation) {
      case 0:
        set(_playerHasBurntFace);
      case 1:
        set(_playerHasWoodenFoot);
      case 2:
        set(_playerHasAsthma);
    }
  }

  static const String _describedWorthinessEvent = "described_worthiness";

  void describeWorthiness(
      {required Entity who,
      required List<int> what,
      List<int> especially = const [],
      String how = 'approvingly'}) {
    // Player's items that...
    final items = player.inventory.items
        // ... are impressing the [who] actor ...
        .where((item) => what.contains(item.id))
        // ... and haven't been mentioned by them.
        .where((item) => !world.customHistory
            .query(
                name: _describedWorthinessEvent, actorId: who.id, data: item.id)
            .hasHappened)
        .toList(growable: false);

    if (items.isEmpty) {
      // Nothing to say.
      return;
    }

    final especiallyItems = items
        .where((item) => especially.contains(item.id))
        .toList(growable: false);

    outputStoryline.addEnumeration(
      "<subject> <also> look<s> $how at",
      items,
      null,
      subject: who,
    );

    if (especiallyItems.isNotEmpty && especiallyItems.length < items.length) {
      outputStoryline.addEnumeration(
        "<subject> <is> especially "
        "{entranced|captivated|mesmerized|delighted} by",
        especiallyItems,
        null,
        subject: who,
        maxPerSentence: 5,
      );
    }

    for (final item in items) {
      outputWorld.recordCustom(_describedWorthinessEvent,
          data: item.id, actor: who);
    }
  }

  /// Starts a fight, assuming the current room's fight is optional
  /// and the monsters are still alive.
  void startOptionalFight() {
    assert(outputWorld
        .getSituationByName<RoomRoamingSituation>(
            RoomRoamingSituation.className)
        .monstersAlive);
    assert(simulation
        .getRoomParent(simulation.getRoomByName(outputWorld
            .getSituationByName<RoomRoamingSituation>(
                RoomRoamingSituation.className)
            .currentRoomName))
        .fightIsOptional);
    AutoSlayMonstersAction.pushFightSituation(this);
  }
}

extension ApplicabilityContextHelpers on ApplicabilityContext {
  /// Returns `true` while player is roaming through Knights and is in an idle
  /// room (i.e. can do things like chatting or reading).
  bool get isInIdleRoom {
    if (world.currentSituation is! RoomRoamingSituation) return false;
    final situation = world.currentSituation! as RoomRoamingSituation;
    if (situation.monstersAlive) return false;
    return simulation.getRoomByName(situation.currentRoomName).isIdle;
  }

  bool get monstersAlive {
    if (world.currentSituation is! RoomRoamingSituation) return false;
    final situation = world.currentSituation! as RoomRoamingSituation;
    if (situation.monstersAlive) return false;
    return simulation.getRoomByName(situation.currentRoomName).isIdle;
  }

  bool get playerIsAlone {
    return getPartyOf(actor, simulation, world).length == 1;
  }

  bool get playerIsMale {
    final query =
        world.customHistory.query(name: ActionContextHelpers._playerIsMale);
    return query.hasHappened;
  }

  String get playerHairColor {
    final query =
        world.customHistory.query(name: ActionContextHelpers._playerHairColor);
    return query.latest!.data! as String;
  }

  bool get playerHasBlondHair => playerHairColor == "blond";

  bool get playerHasBrownHair => playerHairColor == "brown";

  bool get playerHasBlackHair => playerHairColor == "black";

  @Deprecated('use playerHasBurntFace')
  bool get playerHasDebt {
    final query =
        world.customHistory.query(name: ActionContextHelpers._playerHasDebt);
    return query.hasHappened;
  }

  bool get playerHasBurntFace {
    final query = world.customHistory
        .query(name: ActionContextHelpers._playerHasBurntFace);
    return query.hasHappened;
  }

  bool get playerHasWoodenFoot {
    final query = world.customHistory
        .query(name: ActionContextHelpers._playerHasWoodenFoot);
    return query.hasHappened;
  }

  bool get playerHasAsthma {
    final query =
        world.customHistory.query(name: ActionContextHelpers._playerHasAsthma);
    return query.hasHappened;
  }

  int get playerWorthiness {
    final query = world.customHistory
        .query(name: ActionContextHelpers._describedWorthinessEvent);
    final count = query.count;
    return min(count, 3);
  }

  String get playerSalutation {
    final worthiness = playerWorthiness;
    final isMale = playerIsMale;
    switch (worthiness) {
      case 0:
        return isMale ? 'boy' : 'girl';
      case 1:
        return 'young one';
      case 2:
        return isMale ? 'young sir' : 'young lady';
      case 3:
        return isMale ? 'Sir' : 'Lady';
    }
    throw StateError('Wrong worthiness: $worthiness');
  }

  /// The room the player is currently in. If they are in a variant,
  /// then this reports the variant.
  Room get playerRoom {
    return simulation.getRoomByName(player.currentRoomName!);
  }

  /// Checks if player knows this fact, or a higher fact.
  ///
  /// For example, if checking [Doghead.somethingCalledDoghead], this method
  /// will return `true` if the player knows the whole
  /// [Doghead.dogheadMyth]. Because of course if you know the whole Doghead
  /// myth, you'll also know that there is something called Doghead.
  bool knows(Object o) {
    return ChainedFacts.singleton.knowsFact(this, o);
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

  bool hasHappened(String eventId, {int? actorId}) {
    return world.customHistory
        .query(name: eventId, actorId: actorId)
        .hasHappened;
  }

  /// Returns `true` if player currently is in [roomName],
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
    final playerRoom = simulation.getRoomByName(player.currentRoomName!);
    assert(playerRoom.parent == null, "Player is in a variant room.");
    final actor = world.getActorById(actorId);
    final actorRoom = simulation.getRoomByName(actor.currentRoomName!);
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
    return sqrt(pow(otherRoom.positionX! - room.positionX!, 2) +
        pow(otherRoom.positionY! - room.positionY!, 2));
  }

  /// Returns `true` if player has ever visited [roomName].
  bool playerHasVisited(String roomName,
      {bool includeVariants = false, String? from}) {
    final room = simulation.getRoomByName(roomName);
    return world.visitHistory
        .query(player, room,
            includeVariants: includeVariants, fromRoomName: from)
        .hasHappened;
  }
}
