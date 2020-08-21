import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/edgehead_items.dart';
import 'package:edgehead/edgehead_simulation.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// The orc leader.
final Actor edgeheadDarg = Actor.initialized(
  dargId,
  StatefulRandom(~dargId).next,
  "Darg",
  nameIsProperNoun: true,
  pronoun: Pronoun.HE,
  currentRoomName: 'crowdsource',
  currentWeapon: akxe,
  team: defaultEnemyTeam,
  foldFunctionHandle: carelessMonsterFoldFunctionHandle,
);

/// Kat, the  knight at the entrance.
final Actor edgeheadKat = Actor.initialized(
  katId,
  StatefulRandom(~katId).next,
  "Kat",
  nameIsProperNoun: true,
  pronoun: Pronoun.SHE,
  currentRoomName: 'pyramid_entrance',
  currentWeapon: Item.weapon(234313, WeaponType.sword,
      adjective: "bastard", name: "sword", firstOwnerId: katId),
  poseMax: Pose.combat,
);

/// Lady Hope.
final Actor edgeheadLadyHope = Actor.initialized(
  ladyHopeId,
  StatefulRandom(~ladyHopeId).next,
  "Lady Hope",
  nameIsProperNoun: true,
  isSurvivor: true,
  pronoun: Pronoun.SHE,
  constitution: 2,
  dexterity: 130,
  poseMax: Pose.combat,
  currentRoomName: 'keep_dining',
  currentWeapon: katana,
  team: defaultEnemyTeam,
);

/// Trader Joseph's son.
final Actor edgeheadLeroy = Actor.initialized(
  leroyId,
  StatefulRandom(~leroyId).next,
  "Leroy",
  nameIsProperNoun: true,
  pronoun: Pronoun.HE,
  currentRoomName: 'bleeds_trader_hut',
  currentWeapon: Item.weapon(234234, WeaponType.dagger,
      adjective: "long", name: "dagger", firstOwnerId: leroyId),
  currentShield: Item.weapon(1188984, WeaponType.shield,
      adjective: "peasant", firstOwnerId: leroyId),
);

/// Miguel, the antsy knight at the entrance.
final Actor edgeheadMiguel = Actor.initialized(
  miguelId,
  StatefulRandom(~miguelId).next,
  "Miguel",
  nameIsProperNoun: true,
  pronoun: Pronoun.HE,
  currentRoomName: 'pyramid_entrance',
  currentWeapon: Item.weapon(234312, WeaponType.axe,
      adjective: "long", name: "halberd", firstOwnerId: miguelId),
  poseMax: Pose.combat,
);

/// The player.
final Actor edgeheadPlayer = Actor.initialized(
  playerId,
  StatefulRandom(~playerId).next,
  "Aren",
  nameIsProperNoun: true,
  isSurvivor: true,
  isPlayer: true,
  pronoun: Pronoun.I,
  constitution: 2,
  dexterity: 150,
  stamina: 3,
  sanity: 2,
  initiative: 1000,
  poseMax: Pose.combat,
  currentRoomName: Simulation.preStartBookName,
);

/// Tamara, player's guide.
final Actor edgeheadTamara = Actor.initialized(
  tamaraId,
  StatefulRandom(~tamaraId).next,
  "Tamara",
  nameIsProperNoun: true,
  pronoun: Pronoun.SHE,
  // Slightly quicker than the player but not quicker than the first goblin.
  initiative: 1500,
  currentRoomName: Simulation.preStartBookName,
  followingActorId: playerId,
  currentWeapon: Item.weapon(2342341, WeaponType.sword,
      adjective: "dented", firstOwnerId: tamaraId),
);

final Actor firstGoblin = Actor.initialized(
  firstGoblinId, StatefulRandom(~firstGoblinId).next, "goblin",
  adjective: "feral",
  pronoun: Pronoun.HE,
  currentRoomName: 'meadow_fight',
  currentWeapon: Item.weapon(rustySwordId, WeaponType.sword,
      name: "sword", adjective: "rusty", firstOwnerId: firstGoblinId),
  // The goblin starts the fight.
  initiative: 2000,
  // For the first 2 rounds, the goblin is invincible. We don't want
  // Tamara to kill him before the player has any chance to do something.
  isInvincible: true,
  team: defaultEnemyTeam,
  foldFunctionHandle: carelessMonsterFoldFunctionHandle,
);

final Actor sixtyFiverGoblin = Actor.initialized(
  sixtyFiverGoblinId,
  StatefulRandom(~sixtyFiverGoblinId).next,
  "goblin",
  adjective: 'angry',
  pronoun: Pronoun.HE,
  currentRoomName: 'battlefield',
  currentWeapon: Item.weapon(
    sixtyFiverGoblinHatchetId,
    WeaponType.axe,
    name: 'hatchet',
    adjective: 'bone',
    firstOwnerId: sixtyFiverGoblinId,
  ),
  dexterity: 100,
  team: defaultEnemyTeam,
  foldFunctionHandle: carelessMonsterFoldFunctionHandle,
);

/// The orc sixty-fiver.
final Actor sixtyFiverOrc = Actor.initialized(
  sixtyFiverOrcId,
  StatefulRandom(~sixtyFiverOrcId).next,
  "orc",
  adjective: "huge",
  pronoun: Pronoun.HE,
  currentRoomName: 'battlefield',
  currentWeapon: Item.weapon(
    sixtyFiverSwordId,
    WeaponType.sword,
    adjective: 'serrated',
    firstOwnerId: sixtyFiverOrcId,
  ),
  currentShield: sixtyFiverShield,
  team: defaultEnemyTeam,
  foldFunctionHandle: carelessMonsterFoldFunctionHandle,
);
