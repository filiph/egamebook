import 'package:edgehead/edgehead_actors.dart';
import 'package:edgehead/edgehead_event_callbacks_gather.dart';
import 'package:edgehead/edgehead_facts_strings.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/edgehead_simulation.dart';
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
import 'package:edgehead/writers_context_extensions.dart';

export 'package:edgehead/edgehead_facts_enums.dart';
export 'package:edgehead/edgehead_facts_strings.dart';
export 'package:edgehead/edgehead_ids.dart';
export 'package:edgehead/edgehead_items.dart';
export 'package:edgehead/src/fight/common/necromancy.dart';
export 'package:edgehead/writers_context_extensions.dart';

final Entity cultists = Entity(
  id: 978001,
  name: "the Deathless",
  nameIsProperNoun: true,
  pronoun: Pronoun.THEY,
);

final Entity farmers = Entity(
  id: 978002,
  name: "farmers",
  pronoun: Pronoun.THEY,
);

final Entity oracle = Entity(
  id: 978003,
  name: "the Oracle",
  nameIsProperNoun: true,
  pronoun: Pronoun.SHE,
);

final Entity bleedsVillagers = Entity(
  id: 978004,
  name: "villagers",
  pronoun: Pronoun.THEY,
);

bool bothAreAlive(Actor a, Actor b) {
  return a.isAnimatedAndActive && b.isAnimatedAndActive;
}

/// Describes the usage of the compass.
void describeCompass(ActionContext c) {
  final w = c.world;
  final s = c.outputStoryline;

  assert(c.world.currentSituation is RoomRoamingSituation);
  final room = c.playerRoom;
  assert(room.isOnMap);

  Room target;
  if (c.hasItem(northSkullId)) {
    // The skull is with the player.
    target = room;
  } else if (w.actionHasBeenPerformed('oracle_give_north_skull')) {
    if (c.hasHappened(evOrcOffensive)) {
      target = c.simulation.getRoomByName('big_o_observatory');
    } else {
      target = c.simulation.getRoomByName('oracle_main');
    }
  } else {
    target = c.simulation.getRoomByName('keep_servants');
  }
  assert(target.isOnMap);

  final dx = target.positionX! - room.positionX!;
  final dy = target.positionY! - room.positionY!;

  /// The direction computation is taken from package:piecemeal.
  /// https://github.com/munificent/piecemeal/blob/71aa6567b75aad358328ee8eab0f062c1ea3ed2d/lib/src/vec.dart#L64-L102
  String getDirection(int x, int y) {
    if (x == 0) {
      if (y < 0) {
        return 'above';
      } else if (y == 0) {
        return 'to the skull-shaped device';
      } else {
        return 'below';
      }
    }

    var slope = y / x;

    if (x < 0) {
      if (slope >= 2.0) {
        return 'roughly above';
      } else if (slope >= 0.5) {
        return 'above and to the west';
      } else if (slope >= -0.5) {
        return 'roughly to the west';
      } else if (slope >= -2.0) {
        return 'below and to the west';
      } else {
        return 'roughly below';
      }
    } else {
      if (slope >= 2.0) {
        return 'roughly below';
      } else if (slope >= 0.5) {
        return 'below and to the east';
      } else if (slope >= -0.5) {
        return 'roughly to the east';
      } else if (slope >= -2.0) {
        return 'above and to the east';
      } else {
        return 'roughly above';
      }
    }
  }

  s.add('The compass currently points ${getDirection(dx, dy)}.', isRaw: true);

  if (room.name == 'keep_bedroom' && !c.knows(kbKeepServantsLocation)) {
    s.add('After a short while, I realize the compass is pointing to a hidden '
        'door in the wall. I open it, and the compass leads me through '
        'twisty little passages to the servants room.');
    c.learn(kbKeepServantsLocation);
    c.movePlayer('keep_servants');
  }
}

/// Battlefield fight.
FightSituation generateBattlefieldFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  final weak = _orcsLackCockroaches(c);
  if (weak) {
    c.outputStoryline.add('They seem famished.', isRaw: true);
    w.updateActorById(sixtyFiverOrcId, (b) => b.dexterity = 50);
    w.updateActorById(sixtyFiverGoblinId, (b) => b.dexterity = 70);
  }
  final stripped = _orcsLackWeapons(c);
  if (stripped) {
    c.outputStoryline.add('Their weapons look battered.', isRaw: true);
    // Currently, this has no gameplay effect.
  }

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [sixtyFiverOrc, sixtyFiverGoblin],
    "{battlefield|concrete} floor",
    roomRoamingSituation,
    {
      4: battlefield_floor_have_that_scalp,
      6: battlefield_floor_spit,
    },
    items: const [],
  );
}

/// Fight with Big O (Osiris) at the end.
FightSituation generateBigOFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [bigO],
    "marble floor",
    roomRoamingSituation,
    {
      3: big_o_shame,
      6: big_o_realize,
    },
    items: const [],
  );
}

/// The fight west of The Bleeds.
FightSituation generateBleedsGoblinSkirmishPatrol(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;
  return FightSituation.initialized(
    w.randomInt(),
    party,
    [albinoGoblin],
    "{muddy |wet |}ground",
    roomRoamingSituation,
    {
      3: amak_will_teach_you,
    },
  );
}

/// Fight in Conet.
FightSituation generateConetFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  final weak = _orcsLackCockroaches(c);
  if (weak) {
    c.outputStoryline.add('He seem famished.', isRaw: true);
    w.updateActorById(
        conetKoboldId, (b) => b.dexterity = (b.dexterity! * 0.7).floor());
  }

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [conetKobold],
    "{cracked |}floor",
    roomRoamingSituation,
    {
      4: kobold_fight_not_fun,
    },
    items: const [],
  );
}

/// Fight with Darg and the shaman in the temple.
FightSituation generateCrowdsourceFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  final weak = _orcsLackCockroaches(c);
  if (weak) {
    c.outputStoryline.add('They seem famished.', isRaw: true);
    w.updateActorById(sixtyFiverOrcId, (b) => b.dexterity = 50);
    w.updateActorById(sixtyFiverGoblinId, (b) => b.dexterity = 70);
  }
  final stripped = _orcsLackWeapons(c);
  if (stripped) {
    c.outputStoryline.add('Their weapons look battered.', isRaw: true);
    // Currently, this has no gameplay effect.
  }

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [shaman, edgeheadDarg],
    "{temple |}floor",
    roomRoamingSituation,
    {
      5: darg_fight_impressed,
      9: darg_fight_berserk,
    },
    items: const [],
  );
}

/// Fight with Darg near his tent.
FightSituation generateDargTentFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  final weak = _orcsLackCockroaches(c);
  if (weak) {
    c.outputStoryline.add('He seems famished.', isRaw: true);
    w.updateActorById(
        dargId, (b) => b.dexterity = (b.dexterity! * 0.7).floor());
  }
  final stripped = _orcsLackWeapons(c);
  if (stripped) {
    c.outputStoryline.add('His weapon looks battered.', isRaw: true);
    // Currently, this has no gameplay effect.
  }

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [edgeheadDarg],
    "flat roof",
    roomRoamingSituation,
    {
      3: darg_fight_impressed,
      7: darg_fight_berserk,
    },
    items: const [],
  );
}

/// The goblin camp fight near the Bleeds.
FightSituation generateGoblinCampFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [campNakedGoblin, campLeaderGoblin],
    "ash-covered ground",
    roomRoamingSituation,
    {
      4: goblin_camp_thats_new,
    },
    items: const [],
  );
}

/// God's lair fight.
FightSituation generateGodsLairFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  final weak = _orcsLackCockroaches(c);
  if (weak) {
    c.outputStoryline.add('They seem famished.', isRaw: true);
    w.updateActorById(
        orcBerserkerId, (b) => b.dexterity = (b.dexterity! * 0.7).floor());
    w.updateActorById(
        orcCaptainId, (b) => b.dexterity = (b.dexterity! * 0.7).floor());
  }
  final stripped = _orcsLackWeapons(c);
  if (stripped) {
    c.outputStoryline.add('Their weapons look battered.', isRaw: true);
    // Currently, this has no gameplay effect.
  }

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [orcBerserker, orcCaptain],
    "{concrete |}floor",
    roomRoamingSituation,
    {
      3: gods_lair_stand_still,
    },
    items: const [],
  );
}

/// Fight with Big O (Osiris) at the end.
FightSituation generateHawkmanFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [hawkman],
    "flat roof",
    roomRoamingSituation,
    {},
    items: const [],
  );
}

/// The fight in the smithy with the orc jailer.
FightSituation generateJailerFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;
  final weak = _orcsLackCockroaches(c);
  if (weak) {
    c.outputStoryline.add('He seems famished.', isRaw: true);
    w.updateActorById(jailerId, (b) => b.dexterity = b.dexterity! ~/ 1.5);
  }

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [jailer],
    "{|concrete} floor",
    roomRoamingSituation,
    {
      3: jailer_fight_sarn_looking,
      5: jailer_fight_spit,
    },
    items: const [
      // TODO: some kind of a weapon?
    ],
  );
}

/// The fight in the Keep with Lady Hope.
FightSituation generateLadyHopeFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [edgeheadLadyHope],
    "wooden floor",
    roomRoamingSituation,
    {
      2: lady_hope_interested,
      5: lady_hope_worm,
    },
    items: const [],
  );
}

/// The fight with the lizardman in the pond.
FightSituation generateLizardmanFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party) {
  final w = c.outputWorld;

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [lizardman],
    "grass",
    roomRoamingSituation,
    {
      3: lizardman_good_fight,
    },
    items: [
      Item.weapon(
        w.randomInt(),
        WeaponType.club,
        name: 'leg',
        adjective: 'half-eaten',
      ),
    ],
  );
}

/// "Random encounter"
FightSituation generateRandomEncounter(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final s = c.outputStoryline;
  final initialPlayer = c.actor;

  // De-buff player so the encounters are more interesting.
  w.updateActorById(
      initialPlayer.id,
      (b) => b
        ..hitpoints = 1
        ..dexterity = 90);

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
    case 1:
      enemies.add(_makeOrc(w));
      s.add("An orc stands in front of me, wielding a sword.", isRaw: true);
    case 2:
      final orc = Actor.initialized(6000, w.randomInt, "orc",
          adjective:
              w.randomChoose(['large', 'bloodthirsty', 'murderous', 'cruel']),
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
    case 1:
    case 2:
      final name = w.randomBool() ? "sword" : "scimitar";
      final adjective = w.randomBool() ? "shiny" : "family";
      final sword = Item.weapon(w.randomInt(), WeaponType.sword,
          name: name, adjective: adjective, firstOwnerId: playerId);
      w.updateActorById(
          playerId, (b) => b.inventory.equip(sword, initialPlayer.anatomy));
      initialPlayer.report(s, "<subject> <is> {holding|wielding} a $name");
    case 3:
      final name = w.randomBool() ? "spear" : "pike";
      final spear = Item.weapon(w.randomInt(), WeaponType.spear,
          name: name, adjective: 'moldy', firstOwnerId: playerId);
      w.updateActorById(
          playerId, (b) => b.inventory.equip(spear, initialPlayer.anatomy));
      initialPlayer.report(s, "<subject> <is> {holding|wielding} a $name");
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
  return FightSituation.initialized(
    w.randomInt(),
    party,
    [firstGoblin],
    "{muddy |wet |}ground",
    roomRoamingSituation,
    {
      2: start_tamara_bellows,
      3: start_make_goblin_not_invincible,
    },
  );
}

/// Either returns `we` or `I`, depending on the current state of the party.
///
/// Calls [getPartyOf] in the background.
String getWeOrI(Actor a, Simulation sim, WorldState originalWorld,
    {required bool capitalized}) {
  final party = getPartyOf(a, sim, originalWorld);
  if (party.length > 1) {
    return capitalized ? 'We' : 'we';
  } else {
    return 'I';
  }
}

/// Returns `true` if the current room has a special Necromancy action
/// attached. This has precedence over the usual necromancy in idle room.
///
/// For example, a puzzle might call for the player to raise dead at a specific
/// room. In that case, we don't want the menu to show _two_ necromancy actions.
bool storyNecromancyHasPrecedence(ApplicabilityContext c) {
  // Keep in sync with karl_necromancy.egb.
  if (c.playerRoom.name == 'maintenance_shaft' &&
      !c.world.actionHasBeenPerformedSuccessfully('karl_use_necromancy') &&
      !c.hasHappened(evKarlGuardsKilled)) {
    return true;
  }

  return false;
}

/// This is called when the player reaches the Bleeds for the first time.
/// It is here to remind the player about the items and that they can interact
/// with them.
void takeInventory(ActionContext c) {
  final s = c.outputStoryline;
  final player = c.player;

  s.add("I take inventory of my items.", isRaw: true);

  if (player.inventory.items.isEmpty) {
    s.add(
        "I have reached the Pyramid with absolutely nothing in my possession.",
        isRaw: true);
    return;
  }

  final hasFathersLetter = c.hasItem(letterFromFatherId);

  if (hasFathersLetter) {
    s.add("I have my father's letter in a pocket.", isRaw: true);
  }

  final otherItems = player.inventory.items.toSet()
    ..removeWhere((item) => item.id == letterFromFatherId);

  if (otherItems.isEmpty) {
    assert(
        hasFathersLetter,
        "We did check that items are non-empty, "
        "and so if otherItems are empty, that means that the only item "
        "in the player's possession is the father's letter.");
    s.add("And that is all.", isRaw: true);
    return;
  }

  s.addEnumeration("And I <also> carry ", otherItems, null, maxPerSentence: 10);
  s.add("I must hope it is enough.", isRaw: true);
}

Actor _makeGoblin(WorldStateBuilder w,
    {int? id,
    bool spear = false,
    String spearAdjective = 'crude',
    String swordAdjective = 'rusty',
    String? currentRoomName}) {
  final goblinId = id ?? w.randomInt();
  return Actor.initialized(goblinId, w.randomInt, "goblin",
      adjective: w.randomChoose(['vicious', 'fierce', 'angry', 'evil']),
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: spear
          ? Item.weapon(w.randomInt(), WeaponType.spear,
              adjective: spearAdjective, firstOwnerId: goblinId)
          : Item.weapon(w.randomInt(), WeaponType.sword,
              adjective: swordAdjective, firstOwnerId: goblinId),
      dexterity: 150,
      team: defaultEnemyTeam,
      currentRoomName: currentRoomName,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
}

Actor _makeOrc(WorldStateBuilder w,
    {int? id, int constitution = 2, String swordAdjective = 'orcish'}) {
  final orcId = id ?? w.randomInt();
  return Actor.initialized(orcId, w.randomInt, "orc",
      adjective:
          w.randomChoose(['large', 'bloodthirsty', 'murderous', 'cruel']),
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.sword,
          adjective: swordAdjective, firstOwnerId: orcId),
      constitution: constitution,
      dexterity: 170,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
}

/// Returns `true` if the cockroach farm has been destroyed and so the orcs
/// and goblins are weak.
bool _orcsLackCockroaches(ApplicabilityContext c) {
  final event = c.world.customHistory.query(name: evOpenedDam).latest;
  if (event == null) return false;

  if (c.world.time.difference(event.time) >= const Duration(minutes: 30)) {
    // It's been more than enough time for the lack of food to affect
    // performance.
    return true;
  }
  return false;
}

/// Returns `true` if Sarn has been saved and so the orcs
/// and goblins have worse weapons.
bool _orcsLackWeapons(ApplicabilityContext c) {
  final event = c.world.customHistory.query(name: evSavedSarn).latest;
  if (event == null) return false;

  if (c.world.time.difference(event.time) > const Duration(minutes: 60)) {
    // It's been more than enough time for the lack of a smith to affect
    // weaponry.
    return true;
  }
  return false;
}
