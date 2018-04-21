import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:test/test.dart';

void main() {
  test("decapitating kills", () {
    final orc = new Actor.initialized(1000, "orc");
    final sword = new Item.weapon(42, WeaponType.sword);

    final deadOrc = executeSlashingHit(
            orc, BodyPartDesignation.neck, sword, SlashSuccessLevel.cleave)
        .actor;
    expect(deadOrc.isAlive, isFalse);
  });

  test("cleaving neck removes head", () {
    final orc = new Actor.initialized(1000, "orc");
    final sword = new Item.weapon(42, WeaponType.sword);

    final deadOrc = executeSlashingHit(
            orc, BodyPartDesignation.neck, sword, SlashSuccessLevel.cleave)
        .actor;
    expect(BodyPart.findByDesignation(BodyPartDesignation.head, deadOrc.torso),
        isNull);
  });

  test("cleaving neck disables it", () {
    final orc = new Actor.initialized(1000, "orc");
    final sword = new Item.weapon(42, WeaponType.sword);

    final deadOrc = executeSlashingHit(
            orc, BodyPartDesignation.neck, sword, SlashSuccessLevel.cleave)
        .actor;
    expect(
        BodyPart
            .findByDesignation(BodyPartDesignation.neck, deadOrc.torso)
            .isAlive,
        isFalse);
  });

  test("cleaving neck returns neck and head", () {
    final orc = new Actor.initialized(1000, "orc");
    final sword = new Item.weapon(42, WeaponType.sword);

    final severed = executeSlashingHit(
            orc, BodyPartDesignation.neck, sword, SlashSuccessLevel.cleave)
        .severedPart;
    expect(BodyPart.findByDesignation(BodyPartDesignation.head, severed),
        isNotNull);
  });

  test("cleaving non-severable body part kills it and its descendants", () {
    final orc = new Actor.initialized(1000, "orc");
    final sword = new Item.weapon(42, WeaponType.sword);

    final deadOrc = executeSlashingHit(
            orc, BodyPartDesignation.head, sword, SlashSuccessLevel.cleave)
        .actor;
    expect(
        BodyPart
            .findByDesignation(BodyPartDesignation.head, deadOrc.torso)
            .isAlive,
        isFalse);
    expect(
        BodyPart
            .findByDesignation(BodyPartDesignation.leftEye, deadOrc.torso)
            .isAlive,
        isFalse);
  });

  test("major-cutting actor with Con=2 once does not kill him", () {
    final orc = new Actor.initialized(1000, "orc", constitution: 2);
    final sword = new Item.weapon(42, WeaponType.sword);

    final cutOrc = executeSlashingHit(
            orc, BodyPartDesignation.torso, sword, SlashSuccessLevel.majorCut)
        .actor;
    expect(cutOrc.isAlive, isTrue);
  });

  test(
      "major-cutting actor with Con=2 two times on a vital body part "
      "kills him", () {
    final orc = new Actor.initialized(1000, "orc", constitution: 2);
    final sword = new Item.weapon(42, WeaponType.sword);

    final cutOrc = executeSlashingHit(
            orc, BodyPartDesignation.torso, sword, SlashSuccessLevel.majorCut)
        .actor;
    final doublyCutOrc = executeSlashingHit(cutOrc, BodyPartDesignation.torso,
            sword, SlashSuccessLevel.majorCut)
        .actor;
    expect(doublyCutOrc.isAlive, isFalse);
  });

  test(
      "major-cutting actor with Con=2 two times on a non-vital body part "
      "does not kill him", () {
    final orc = new Actor.initialized(1000, "orc", constitution: 2);
    final sword = new Item.weapon(42, WeaponType.sword);

    final cutOrc = executeSlashingHit(orc, BodyPartDesignation.rightLeg, sword,
            SlashSuccessLevel.majorCut)
        .actor;
    final doublyCutOrc = executeSlashingHit(cutOrc,
            BodyPartDesignation.rightLeg, sword, SlashSuccessLevel.majorCut)
        .actor;
    expect(doublyCutOrc.isAlive, isTrue);
  });

  test(
      "major-cutting actor with Con=2 two times on a non-vital body part "
      "disables it", () {
    final orc = new Actor.initialized(1000, "orc", constitution: 2);
    final sword = new Item.weapon(42, WeaponType.sword);

    final cutOrc = executeSlashingHit(orc, BodyPartDesignation.rightLeg, sword,
            SlashSuccessLevel.majorCut)
        .actor;
    final doublyCutOrc = executeSlashingHit(cutOrc,
            BodyPartDesignation.rightLeg, sword, SlashSuccessLevel.majorCut)
        .actor;
    expect(
        BodyPart
            .findByDesignation(BodyPartDesignation.rightLeg, doublyCutOrc.torso)
            .isAlive,
        isFalse);
  });

  test("minor-cutting several times does not kill", () {
    final orc = new Actor.initialized(1000, "orc");
    final sword = new Item.weapon(42, WeaponType.sword);

    final cutOrc = executeSlashingHit(
            orc, BodyPartDesignation.head, sword, SlashSuccessLevel.minorCut)
        .actor;
    final doublyCutOrc = executeSlashingHit(
            cutOrc, BodyPartDesignation.head, sword, SlashSuccessLevel.minorCut)
        .actor;
    expect(doublyCutOrc.isAlive, isTrue);
  });
}
