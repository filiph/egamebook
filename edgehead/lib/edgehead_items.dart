import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';

final Item akxe = Item.weapon(
  akxeId,
  WeaponType.axe,
  name: 'akxe',
  adjective: 'steel',
  firstOwnerId: dargId,
  isCleaving: true,
);

final Item banner = Item(
  bannerId,
  name: 'banner',
  adjective: 'red',
);

final Item compass = Item(
  compassId,
  name: 'compass',
  adjective: 'iron',
);

final Item dragonEgg = Item(
  dragonEggId,
  name: 'egg',
  adjective: 'dragon',
);

final Item familyPortrait = Item.weapon(
  familyPortraitId,
  WeaponType.shield,
  name: 'portrait',
  adjective: 'family',
  firstOwnerId: ladyHopeId,
  /* TODO: make this useless as a shield, except Lady Hope doesn't attack */
);

final Item katana = Item.weapon(
  katanaId,
  WeaponType.sword,
  name: "katana",
  adjective: "ancient",
  firstOwnerId: ladyHopeId,
  isCleaving: true,
);

final Item lairOfGodStar = Item(
  lairOfGodStarId,
  name: "Lair of God Star",
  nameIsProperNoun: true,
);

final Item letterFromFather = Item(
  letterFromFatherId,
  name: "letter",
  adjective: "father's",
);

final Item rockFromMeadow = Item.weapon(
  rockFromMeadowId,
  WeaponType.rock,
  name: "rock",
  adjective: "moldy",
);

final Item sixtyFiverShield = Item.weapon(
  sixtyFiverShieldId,
  WeaponType.shield,
  name: 'shield',
  adjective: 'sixty-fiver',
  firstOwnerId: sixtyFiverOrcId,
);

final Item tamarasDagger = Item.weapon(
  tamarasDaggerId,
  WeaponType.dagger,
  name: "dagger",
  adjective: "long",
  firstOwnerId: tamaraId,
);
