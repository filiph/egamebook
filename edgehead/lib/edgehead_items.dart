import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/edibility.dart';
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

final Item barbecuedBat = Item(
  barbecuedBatId,
  name: 'barbecued',
  adjective: 'bat',
  damageCapability: DamageCapability(WeaponType.harmless).toBuilder(),
  edibility: Edibility.food(
          2,
          'I have never eaten a bat so I approach it with disgust. '
          'But the meal is nutritious and tastes fairly well.')
      .toBuilder(),
);

final Item barbecuedSquirrel = Item(
  barbecuedSquirrelId,
  name: 'barbecued',
  adjective: 'squirrel',
  damageCapability: DamageCapability(WeaponType.harmless).toBuilder(),
  edibility: Edibility.food(
          2,
          'The meat is dry and plain. '
          'But the meal is nutritious nonetheless.')
      .toBuilder(),
);

final Item compass = Item(
  compassId,
  name: 'compass',
  adjective: 'iron',
);

final Item dragonEgg = Item.weapon(
  dragonEggId,
  WeaponType.rock,
  name: 'egg',
  adjective: 'dragon',
);

final Item familyPortrait = Item(
  familyPortraitId,
  name: 'portrait',
  adjective: 'family',
  firstOwnerId: ladyHopeId,
);

final Item jisadApple = Item(
  jisadAppleId,
  name: 'apple',
  adjective: 'green',
  damageCapability: DamageCapability(WeaponType.harmless).toBuilder(),
  edibility:
      Edibility.food(3, "The apple is crisp and invigorating.").toBuilder(),
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
  name: "the Artifact Star",
  nameIsProperNoun: true,
);

final Item letterFromFather = Item(
  letterFromFatherId,
  name: "letter",
  adjective: "father's",
);

final Item northSkull = Item.weapon(
  northSkullId,
  WeaponType.rock,
  name: "the North Skull",
  nameIsProperNoun: true,
);

final Item oracleApple = Item(
  oracleAppleId,
  name: 'apple',
  adjective: 'red',
  damageCapability: DamageCapability(WeaponType.harmless).toBuilder(),
  edibility:
      Edibility.food(5, "The apple is the freshest thing I've ever eaten.")
          .toBuilder(),
);

final Item rockFromMeadow = Item.weapon(
  rockFromMeadowId,
  WeaponType.rock,
  name: "rock",
  adjective: "moldy",
);

final Item sarnHammer = Item.weapon(
  sarnHammerId,
  WeaponType.club,
  name: 'hammer',
  adjective: 'giant',
  bluntDamage: 2,
);

final Item sixtyFiverShield = Item.weapon(
  sixtyFiverShieldId,
  WeaponType.shield,
  name: 'shield',
  adjective: 'sixty-fiver',
  firstOwnerId: sixtyFiverOrcId,
);

final Item staleBread = Item(
  staleBreadId,
  name: 'bread',
  adjective: 'stale',
  damageCapability: DamageCapability(WeaponType.rock).toBuilder(),
  edibility: Edibility.food(
          2,
          "The bread is extremely hard to bite and swallow, "
          "but it does fill the belly nicely.")
      .toBuilder(),
);

final Item tamarasDagger = Item.weapon(
  tamarasDaggerId,
  WeaponType.dagger,
  name: "dagger",
  adjective: "long",
  firstOwnerId: tamaraId,
);
