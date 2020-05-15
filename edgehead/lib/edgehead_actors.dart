import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

final Actor edgeheadDirector = Actor.initialized(
  directorId,
  StatefulRandom(directorId + ~42).next,
  "DIRECTOR",
  isDirector: true,
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

final Actor edgeheadPlayer = Actor.initialized(
  playerId,
  StatefulRandom(~playerId).next,
  "Aren",
  isSurvivor: true,
  nameIsProperNoun: true,
  isPlayer: true,
  pronoun: Pronoun.I,
  constitution: 2,
  dexterity: 150,
  stamina: 3,
  initiative: 1000,
  poseMax: Pose.combat,
  currentRoomName: Simulation.preStartBookName,
);

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
      adjective: "mercenary", firstOwnerId: tamaraId),
);
