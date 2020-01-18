import 'dart:math';

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
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

/// Mostly quotes that Briana says while roaming Bloodrock.
const _brianaQuotes = [
  '''Briana spits on the floor. "Can't wait to smell something other than 
  orc sweat and piss."
  
  _"You come from the country, then?"_
  
  "Not really. I had been living in Fort Ironcast the last five year."
  
  _"How does Fort Ironcast smell like?"_ 
  
  Briana frowns. "Mostly human sweat and piss."''',
  '''Somewhere in the distance, there are yells that rise in intensity, 
  then suddenly stop entirely.''',
  '''Briana turns to you with an intense whisper.
  
  "You know, I _have_ a right to hate orcs." 
  
  _"I did not know people needed to have a right to hate them, to be honest."_ 
  
  She observes you for a moment. "I'm glad we are in agreement."''',
  '''More yells from the distance.''',
  '''Briana stops and listens for a moment. "Aren, we're pushing our luck. 
  I'd hate to go all this way only to get
  my head smashed in by some random orc patrol."''',
  '''END''',
];

final Item lairOfGodStar = Item(
  lairOfGodStarId,
  name: "Lair of God Star",
);

final Item orcthorn = Item.weapon(orcthornId, WeaponType.sword,
    name: "Orcthorn",
    nameIsProperNoun: true,
    slashingDamage: 2,
    thrustingDamage: 2);

final Item sleepingGoblinsSpear = Item.weapon(
    sleepingGoblinsSpearId, WeaponType.spear,
    name: "spear", adjective: "sturdy");

final Item tamarasDagger = Item.weapon(tamarasDaggerId, WeaponType.dagger,
    name: "dagger", adjective: "long");

/// Ruleset created from [_brianaQuotes]. All quotes are `onlyOnce`. The last
/// quote is `"END"`, which will not print, and is there as the terminal
/// point.
final _brianaQuotesRuleset = Ruleset.unordered(_brianaQuotes.map((quote) {
  return Rule(quote.hashCode, 1, quote != 'END', (_) => true, (c) {
    if (quote == 'END') return;
    c.outputStoryline.add(quote, wholeSentence: true);
  });
}));

bool bothAreAlive(Actor a, Actor b) {
  return a.isAnimatedAndActive && b.isAnimatedAndActive;
}

void describeSuccessRate(ActionContext c) {
  final w = c.world;
  final s = c.outputStoryline;
  s.add("<p class='meta'>", wholeSentence: true);
  s.add("Thanks for playing _Insignificant Little Vermin._",
      wholeSentence: true);

  bool hasOrcthorn = w.actionHasBeenPerformedSuccessfully("take_orcthorn");
  bool destroyed = w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
  final player = c.player;

  player.report(
      s, "<subject> ${hasOrcthorn ? 'took' : 'didn\'t find'} Orcthorn");
  player.report(
      s,
      "<subject> ${destroyed ? 'destroyed' : 'didn\'t destroy'} "
      "the iron monster",
      but: hasOrcthorn != destroyed);

  String getWeaponDescription(WeaponType type, String name) {
    final count = player.inventory.countWeapons(type);
    return count > 1 ? '${name}s' : count == 1 ? 'a $name' : 'no $name';
  }

  // You're leaving Mount Bloodrock with swords, a scimitar and a shield.
  final sword = getWeaponDescription(WeaponType.sword, 'sword');
  final spear = getWeaponDescription(WeaponType.spear, 'spear');
  final shield = getWeaponDescription(WeaponType.shield, 'shield');
  player.report(s,
      "<subject> <is> leaving Mount Bloodrock with $sword, $spear and $shield.",
      wholeSentence: true);

  // You are in good health and with energy to spare.
  final health = player.hitpoints >= 2 ? 'in good health' : 'seriously injured';
  final stamina = player.stamina > 0 ? 'with energy to spare' : 'exhausted';
  player.report(s, "<subject> <is> $health and $stamina.", wholeSentence: true);

  // Briana is not in good health.
  final briana = w.getActorById(brianaId);
  final brianaHealth = briana.hitpoints >= 2 ? 'uninjured' : 'wounded';
  briana.report(s, "<subject> <is> $brianaHealth");

  s.add(
      "The important thing, though, is that you survived. "
      "<strong>Congratulations!</strong>",
      wholeSentence: true);

  s.add("</p>", wholeSentence: true);
}

void enterTunnelWithCancel(ActionContext c) {
  final w = c.world;
  bool hasOrcthorn = w.actionHasBeenPerformedSuccessfully("take_orcthorn");
  bool destroyedIronMonster =
      w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
  bool hasHadChanceToCancel = w.actionHasBeenPerformedSuccessfully(
      "guardpost_above_church_enter_tunnel_with_cancel");

  if (hasOrcthorn || destroyedIronMonster || hasHadChanceToCancel) {
    c.movePlayer("tunnel");
    return;
  }

  c.movePlayer("tunnel_cancel_chance");
}

void executeSpearThrowAtOgre(ActionContext c) {
  final player = c.player;
  final inventorySpears = player.inventory.weapons
      .where((item) => item.damageCapability.type == WeaponType.spear)
      .toList(growable: false);
  assert(inventorySpears.isNotEmpty,
      "executeSpearThrowAtOgre called without any spear in inventory");

  if (player.currentDamageCapability.type == WeaponType.spear) {
    // Spear is in the hand.
    c.outputWorld.updateActorById(
        player.id,
        (b) => b
          ..inventory.remove(player.inventory.currentWeapon)
          ..inventory.equipBestAvailable(player.anatomy));
  } else {
    // Remove the spear.
    c.outputWorld.updateActorById(
        player.id, (b) => b.inventory.remove(inventorySpears.first));
  }

  c.movePlayer("war_forge", silent: true);
}

FightSituation generateAgruthFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  var agruth = _generateAgruth();
  w.actors.add(agruth);
  return FightSituation.initialized(
      w.randomInt(),
      party,
      [agruth],
      "{rock|cavern} floor",
      roomRoamingSituation,
      {
        1: youre_dead_slave,
        5: agruth_spits,
        9: agruth_enjoy_eating_flesh,
        12: agruth_grit_teeth,
        17: agruth_scowls,
      });
}

/// Battlefield fight.
FightSituation generateBattlefieldFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final redOrc = Actor.initialized(w.randomInt(), "orc",
      nameIsProperNoun: false,
      adjective: 'red',
      pronoun: Pronoun.HE,
      currentWeapon:
          Item.weapon(w.randomInt(), WeaponType.sword, adjective: 'serrated'),
      constitution: 2,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  final leatherJerkinOrc = Actor.initialized(w.randomInt(), "orc",
      nameIsProperNoun: false,
      adjective: 'ordinary',
      pronoun: Pronoun.HE,
      currentWeapon:
          Item.weapon(w.randomInt(), WeaponType.axe, adjective: 'battle'),
      constitution: 1,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);

  w.actors.addAll([redOrc, leatherJerkinOrc]);

  return FightSituation.initialized(
    w.randomInt(),
    party,
    [redOrc, leatherJerkinOrc],
    "{battlefield|concrete} floor",
    roomRoamingSituation,
    {},
    items: const [],
  );
}

/// The fight west of The Bleeds.
FightSituation generateBleedsGoblinSkirmishPatrol(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  var goblin = Actor.initialized(w.randomInt(), "goblin",
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon:
          Item.weapon(w.randomInt(), WeaponType.spear, adjective: "gray"),
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  w.actors.add(goblin);
  return FightSituation.initialized(w.randomInt(), party, [goblin],
      "{muddy |wet |}ground", roomRoamingSituation, {});
}

FightSituation generateEscapeTunnelFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  var orc = _makeOrc(w, id: escapeTunnelOrcId);
  var goblin =
      _makeGoblin(w, id: escapeTunnelGoblinId, swordAdjective: 'goblin');
  var monsters = [orc, goblin];
  w.actors.addAll(monsters);
  return FightSituation.initialized(w.randomInt(), party, monsters,
      "{rock|cavern} floor", roomRoamingSituation, {
    1: escape_tunnel_look,
    4: escape_tunnel_insignificant,
    6: escape_tunnel_loud_cries,
    9: escape_tunnel_earsplitting,
    12: escape_tunnel_halfway,
    16: escape_pursuers_reach,
  });
}

/// God's lair fight.
FightSituation generateGodsLairFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final orcBerserker = Actor.initialized(w.randomInt(), "berserker",
      nameIsProperNoun: false,
      adjective: 'orc',
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.axe,
          name: 'battle axe', adjective: 'berserker'),
      constitution: 3,
      team: defaultEnemyTeam,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  final orcCaptain = Actor.initialized(w.randomInt(), 'captain',
      nameIsProperNoun: false,
      adjective: 'orc',
      pronoun: Pronoun.HE,
      currentWeapon:
          Item.weapon(w.randomInt(), WeaponType.sword, adjective: 'labelled'),
      constitution: 2,
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

FightSituation generateMadGuardianFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  var knowsAboutGuardian = w.actionHasBeenPerformed("talk_to_briana_3");
  var madGuardian = _generateMadGuardian(w, knowsAboutGuardian);
  w.actors.add(madGuardian);
  return FightSituation.initialized(
      w.randomInt(),
      party,
      [madGuardian],
      "{rock|cavern} floor",
      roomRoamingSituation,
      {
        1: mad_guardian_good,
        3: mad_guardian_pain,
        5: mad_guardian_shut_up,
      });
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
          wholeSentence: true);
      break;
    case 1:
      enemies.add(_makeOrc(w));
      s.add("An orc stands in front of me, wielding a sword.",
          wholeSentence: true);
      break;
    case 2:
      final orc = Actor.initialized(agruthId, "orc",
          pronoun: Pronoun.HE,
          constitution: 2,
          team: defaultEnemyTeam,
          initiative: 100,
          foldFunctionHandle: carelessMonsterFoldFunctionHandle);
      final equippedOrc = orc.rebuild((b) => b.inventory.equip(
          Item.weapon(w.randomInt(), WeaponType.sword, adjective: 'crude'),
          orc.anatomy));
      enemies.add(equippedOrc);
      final goblin = _makeGoblin(w, spear: true);
      enemies.add(goblin);
      s.add(
          "An orc and a goblin stand in front of me. "
          "The orc is wielding a crude sword, the goblin is holding a spear.",
          wholeSentence: true);
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
      items.add(Item.weapon(w.randomInt(), WeaponType.dagger, name: name));
    } else {
      name = w.randomBool() ? "axe" : "hatchet";
      items.add(Item.weapon(w.randomInt(), WeaponType.axe, name: name));
    }

    final numberOfUs = enemies.length == 1 ? "the two of " : "";
    s.add(
        "Between ${numberOfUs}us, "
        "{a plain|an ordinary} $name lies on the $groundMaterial.",
        wholeSentence: true);
  }

  if (w.randomBool()) {
    final name = w.randomBool() ? "rock" : "brick";
    items.add(Item.weapon(w.randomInt(), WeaponType.rock, name: name));
    s.add(
        "I ${items.isNotEmpty ? 'also' : ''} notice "
        "a nice, solid $name in the ${isInside ? 'rubble' : 'puddle'} "
        "on the ground.",
        wholeSentence: true);
  }

  if (items.isEmpty) {
    s.add("A quick glance reveals there's nothing useful on the ground.",
        wholeSentence: true);
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
          name: name, adjective: adjective);
      w.updateActorById(
          playerId, (b) => b.inventory.equip(sword, initialPlayer.anatomy));
      initialPlayer.report(s, "<subject> <is> {holding|wielding} a $name");
      break;
    case 3:
      final name = w.randomBool() ? "spear" : "pike";
      final spear = Item.weapon(w.randomInt(), WeaponType.spear, name: name);
      w.updateActorById(
          playerId, (b) => b.inventory.equip(spear, initialPlayer.anatomy));
      initialPlayer.report(s, "<subject> <is> {holding|wielding} a $name");
      break;
    default:
      throw UnimplementedError();
  }

  return FightSituation.initialized(
    w.randomInt(),
    party.where((a) => a.isPlayer),
    enemies,
    groundMaterial,
    roomRoamingSituation,
    {
      // TODO: optional reinforcement
    },
    items: items,
  );
}

FightSituation generateSlaveQuartersPassageFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  var orc = _makeOrc(w, id: slaveQuartersOrcId, swordAdjective: 'bluish');
  var goblin = _makeGoblin(w,
      id: slaveQuartersGoblinId, spear: true, spearAdjective: 'bent');
  var monsters = [orc, goblin];
  w.actors.addAll(monsters);
  return FightSituation.initialized(w.randomInt(), party, monsters,
      "{rough|stone} floor", roomRoamingSituation, {
    1: slave_quarters_orc_looks,
    3: slave_quarters_mean_nothing,
  });
}

/// The fight at the start of Knights of San Francisco, with Tamara.
FightSituation generateStartFight(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  var firstGoblin = Actor.initialized(firstGoblinId, "goblin",
      nameIsProperNoun: false,
      pronoun: Pronoun.HE,
      currentWeapon: Item.weapon(w.randomInt(), WeaponType.sword,
          name: "sword", adjective: "rusty"),
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
        1: start_make_goblin_not_invincible,
        2: start_tamara_bellows,
      });
}

/// Test fight. Do not use in production.
FightSituation generateTestFightWithGoblin(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final goblin = _makeGoblin(w, spear: true, spearAdjective: 'goblin');
  w.actors.add(goblin);
  return FightSituation.initialized(
    w.randomInt(),
    party.where((a) => a.isPlayer),
    [goblin],
    "{rock|cavern} floor",
    roomRoamingSituation,
    {},
    items: [
      Item.weapon(89892141, WeaponType.dagger),
      Item.weapon(89892142, WeaponType.rock),
    ],
  );
}

/// Test fight. Do not use in production.
FightSituation generateTestFightWithOrc(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final aguthsSword = Item.weapon(89892130, WeaponType.sword);
  final playersSword = Item.weapon(89892131, WeaponType.sword);
  // TODO: add dagger to player's inventory (instead of on ground)
  final agruth = _generateAgruth();
  final equippedAgruth =
      agruth.rebuild((b) => b.inventory.equip(aguthsSword, agruth.anatomy));
  w.actors.add(equippedAgruth);
  w.updateActorById(
      playerId, (b) => b.inventory.equip(playersSword, c.player.anatomy));
  return FightSituation.initialized(
    w.randomInt(),
    party.where((a) => a.isPlayer),
    [equippedAgruth],
    "{rock|cavern} floor",
    roomRoamingSituation,
    {},
    items: [Item.weapon(89892140, WeaponType.dagger)],
  );
}

/// Test fight. Do not use in production.
FightSituation generateTestFightWithOrcAndGoblin(ActionContext c,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  final w = c.outputWorld;
  final orcsSword = Item.weapon(898921730, WeaponType.sword,
      name: 'sword', adjective: 'orcish');
  final playersSword =
      Item.weapon(898921731, WeaponType.sword, adjective: 'heirloom');
  final orc = Actor.initialized(agruthId, "orc",
      pronoun: Pronoun.HE,
      constitution: 2,
      team: defaultEnemyTeam,
      initiative: 100,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
  final equippedOrc =
      orc.rebuild((b) => b.inventory.equip(orcsSword, orc.anatomy));
  w.actors.add(equippedOrc);
  final goblin = _makeGoblin(w, spear: true);
  w.actors.add(goblin);

  w.updateActorById(
      playerId, (b) => b.inventory.equip(playersSword, c.player.anatomy));
  return FightSituation.initialized(
    w.randomInt(),
    party.where((a) => a.isPlayer),
    [orc, goblin],
    "{cold|gray} floor",
    roomRoamingSituation,
    {},
  );
}

Actor getEscapeTunnelGoblin(WorldState w) =>
    w.getActorById(escapeTunnelGoblinId);

Actor getEscapeTunnelOrc(WorldState w) => w.getActorById(escapeTunnelOrcId);

Actor getSlaveQuartersGoblin(WorldStateBuilder w) =>
    w.getActorById(slaveQuartersGoblinId);

Actor getSlaveQuartersOrc(WorldStateBuilder w) =>
    w.getActorById(slaveQuartersOrcId);

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

void giveGoblinsSpearToPlayer(WorldStateBuilder w) =>
    w.updateActorById(playerId, (b) => b.inventory.add(sleepingGoblinsSpear));

/// Returns `true` while player is roaming through Bloodrock. Note that the list
/// of rooms contains only those that are actual rooms (it excludes the likes
/// of `just_after_agruth_fight`, which is a helper room for naming Agruth's
/// sword).
bool isRoamingInBloodrock(WorldState w) {
  if ((w.currentSituation as RoomRoamingSituation).monstersAlive) return false;
  const bloodrockRoamingRooms = [
    "cave_with_agruth",
    "guardpost_above_church",
    "orcthorn_room",
    "slave_quarters_passage",
    "smelter",
    "underground_church",
    "war_forge",
  ];
  return bloodrockRoamingRooms
      .contains((w.currentSituation as RoomRoamingSituation).currentRoomName);
}

void nameAgruthSword(WorldStateBuilder w, String name) {
  final built = w.build();
  var n = 0;
  for (final actor in built.actors
      .where((a) => a.isAnimatedAndActive && a.team == playerTeam)) {
    if (actor.currentWeapon != null &&
        actor.currentWeapon.damageCapability.type == WeaponType.sword) {
      var sword = actor.currentWeapon;
      var named = sword.toBuilder()
        ..name = name
        ..nameIsProperNoun = true;
      w.updateActorById(
          actor.id,
          (b) => b
            ..inventory.remove(sword)
            ..inventory.equip(named.build(), actor.anatomy));
      n += 1;
    }
  }
  assert(n == 1,
      "This assumes exactly one sword wielded by either Aren or Briana.");
}

void rollBrianaQuote(ActionContext context) {
  _brianaQuotesRuleset.apply(context);
}

/// Updates state according to whatever happened when Aren tried to steal
/// the shield from the sleeping guard. If he was successful, there will be
/// no fight, otherwise, there will be fight.
void setUpStealShield(ActionContext c, bool wasSuccess) {
  final a = c.actor;
  final w = c.outputWorld;
  final shield = Item.weapon(w.randomInt(), WeaponType.shield);
  if (a.anatomy.secondaryWeaponAppendageAvailable) {
    w.updateActorById(a.id, (b) => b.inventory.equipShield(shield, a.anatomy));
  } else {
    // Cannot equip shield, so at least take it.
    w.updateActorById(a.id, (b) => b.inventory.add(shield));
  }
  if (!wasSuccess) {
    final built = w.build();
    final playerParty = built.actors.where((a) => a.team == playerTeam);
    final roomRoamingSituation = c.getRoomRoaming();
    final goblin = _makeGoblin(w,
        id: sleepingGoblinId,
        currentRoomName: roomRoamingSituation.currentRoomName);
    w.actors.add(goblin);
    w.pushSituation(FightSituation.initialized(
        w.randomInt(),
        playerParty,
        [goblin],
        "{smooth |}rock floor",
        roomRoamingSituation,
        {
          1: sleeping_goblin_thief,
        }));
  }
}

void takeOrcthorn(Simulation sim, WorldStateBuilder w, Actor a) {
  w.updateActorById(a.id, (b) => b.inventory.equip(orcthorn, a.anatomy));
}

Actor _generateAgruth() {
  return Actor.initialized(agruthId, "Agruth",
      nameIsProperNoun: true,
      pronoun: Pronoun.HE,
      constitution: 2,
      team: defaultEnemyTeam,
      initiative: 100,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
}

Actor _generateMadGuardian(WorldStateBuilder w, bool playerKnowsAboutGuardian) {
  return Actor.initialized(
      madGuardianId, playerKnowsAboutGuardian ? "guardian" : "orc",
      pronoun: Pronoun.HE,
      currentWeapon:
          Item.weapon(w.randomInt(), WeaponType.sword, adjective: "heavy"),
      constitution: 3,
      team: defaultEnemyTeam,
      initiative: 100,
      foldFunctionHandle: carelessMonsterFoldFunctionHandle);
}

Actor _makeGoblin(WorldStateBuilder w,
        {int id,
        bool spear = false,
        String spearAdjective = 'crude',
        String swordAdjective = 'rusty',
        String currentRoomName}) =>
    Actor.initialized(id ?? w.randomInt(), "goblin",
        nameIsProperNoun: false,
        pronoun: Pronoun.HE,
        currentWeapon: spear
            ? Item.weapon(w.randomInt(), WeaponType.spear,
                adjective: spearAdjective)
            : Item.weapon(w.randomInt(), WeaponType.sword,
                adjective: swordAdjective),
        team: defaultEnemyTeam,
        currentRoomName: currentRoomName,
        foldFunctionHandle: carelessMonsterFoldFunctionHandle);

Actor _makeOrc(WorldStateBuilder w,
        {int id, int constitution = 2, String swordAdjective = 'orcish'}) =>
    Actor.initialized(id ?? w.randomInt(), "orc",
        nameIsProperNoun: false,
        pronoun: Pronoun.HE,
        currentWeapon: Item.weapon(w.randomInt(), WeaponType.sword,
            adjective: swordAdjective),
        constitution: constitution,
        team: defaultEnemyTeam,
        foldFunctionHandle: carelessMonsterFoldFunctionHandle);

extension ActionContextHelpers on ActionContext {
  void movePlayer(String locationName, {bool silent = false}) {
    getRoomRoaming().moveActor(this, locationName, silent: silent);
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

  /// Returns `true` if [actorId] is currently hurt.
  bool isHurt(int actorId) {
    final actor = world.getActorById(actorId);
    return actor.anatomy.woundedParts.isNotEmpty;
  }

  /// Checks whether player was just now at [fromRoomName].
  ///
  /// This only returns `true` if no other room was visited since then.
  ///
  /// If player was in a variant of [fromRoomName], then that counts as well.
  bool justCameFrom(String fromRoomName) {
    final latest = world.visitHistory.getLatestOnly(player);
    if (latest == null) return false;
    return latest.roomName == fromRoomName ||
        latest.parentRoomName == fromRoomName;
  }

  double playerDistanceTo(String roomName) {
    final otherRoom = simulation.getRoomByName(roomName);
    assert(
        otherRoom.positionX != null && otherRoom.positionY != null,
        'Trying to learn player distance to $roomName, '
        'which doesn\'t have position.');
    final room = playerParentRoom;
    if (room.positionX == null || room.positionY == null) {
      // Fail silently. The player is in a room with no position.
      return double.infinity;
    }
    return sqrt(pow(otherRoom.positionX - room.positionX, 2) +
        pow(otherRoom.positionY - room.positionY, 2));
  }

  /// Returns `true` if player has ever visited [roomName].
  bool playerHasVisited(String roomName) {
    final room = simulation.getRoomByName(roomName);
    return world.visitHistory.query(player, room).hasHappened;
  }
}
