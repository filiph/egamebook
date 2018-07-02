import 'dart:math';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_damage.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:test/test.dart';

void main() {
  group("executeSlashingHit", () {
    test("decapitating kills", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .actor;
      expect(deadOrc.isAlive, isFalse);
    });

    test("cleaving neck removes head", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .actor;
      expect(
          deadOrc.anatomy.findByDesignation(BodyPartDesignation.head), isNull);
    });

    test("cleaving neck disables it", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .actor;
      expect(
          deadOrc.anatomy.findByDesignation(BodyPartDesignation.neck).isAlive,
          isFalse);
    });

    test("cleaving neck returns neck and head", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final severed = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .severedPart;
      expect(
          Anatomy.findByDesignationFromPart(BodyPartDesignation.head, severed),
          isNotNull);
    });

    test("cleaving non-severable body part kills it and its descendants", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.head)
          .actor;
      expect(
          deadOrc.anatomy.findByDesignation(BodyPartDesignation.head).isAlive,
          isFalse);
      expect(
          deadOrc.anatomy
              .findByDesignation(BodyPartDesignation.leftEye)
              .isAlive,
          isFalse);
    });

    test("cleaving non-severable body part downgrades to major cut", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final slashResult = executeSlashingHit(
          orc, sword, SlashSuccessLevel.cleave,
          designation: BodyPartDesignation.head);
      expect(slashResult.successLevel, SlashSuccessLevel.majorCut);
    });

    test("major-cutting actor with Con=2 once does not kill him", () {
      final orc = new Actor.initialized(1000, "orc", constitution: 2);
      final sword = new Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.torso)
          .actor;
      expect(cutOrc.isAlive, isTrue);
    });

    test(
        "major-cutting actor with Con=2 two times on a vital body part "
        "kills him", () {
      final orc = new Actor.initialized(1000, "orc", constitution: 2);
      final sword = new Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.torso)
          .actor;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.torso)
          .actor;
      expect(doublyCutOrc.isAlive, isFalse);
    });

    test(
        "major-cutting actor with Con=2 two times on a non-vital body part "
        "does not kill him", () {
      final orc = new Actor.initialized(1000, "orc", constitution: 2);
      final sword = new Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .actor;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .actor;
      expect(doublyCutOrc.isAlive, isTrue);
    });

    test(
        "major-cutting actor with Con=2 two times on a non-vital body part "
        "disables it", () {
      final orc = new Actor.initialized(1000, "orc", constitution: 2);
      final sword = new Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .actor;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .actor;
      expect(
          doublyCutOrc.anatomy
              .findByDesignation(BodyPartDesignation.rightLeg)
              .isAlive,
          isFalse);
    });

    test("minor-cutting several times does not kill", () {
      final orc = new Actor.initialized(1000, "orc");
      final sword = new Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.minorCut,
              designation: BodyPartDesignation.head)
          .actor;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.minorCut,
              designation: BodyPartDesignation.head)
          .actor;
      expect(doublyCutOrc.isAlive, isTrue);
    });
  });

  group("pickRandomBodyPartFromLeft/Right", () {
    final random = new Random();
    final randomIntGetter = (int max) => random.nextInt(max);

    test(
        "attack from right side (attacker's perspective) "
        "never hits right (primary) arm", () {
      // By default, all humanoids are right handed.
      final orc = new Actor.initialized(1000, "orc");

      for (int i = 0; i < 1000; i++) {
        final hit = orc.anatomy.pickRandomBodyPartFromRight(randomIntGetter);
        expect(hit.designation, isNot(BodyPartDesignation.primaryArm));
      }
    });

    test(
        "attack from left side (attacker's perspective) "
        "never hits left (secondary) arm", () {
      // By default, all humanoids are right handed.
      final orc = new Actor.initialized(1000, "orc");

      for (int i = 0; i < 1000; i++) {
        final hit = orc.anatomy.pickRandomBodyPartFromLeft(randomIntGetter);
        expect(hit.designation, isNot(BodyPartDesignation.secondaryArm));
      }
    });
  });

  group("pickRandomBodyPart", () {
    final head = new BodyPart(1, "head");
    final neck = new BodyPart(2, "neck");
    final random = new Random();
    final randomIntGetter = (int max) => random.nextInt(max);

    test("gets the one body part", () {
      final bodyPartsWithWeights = {
        head: 1,
      };

      final part =
          Anatomy.pickRandomBodyPart(bodyPartsWithWeights, randomIntGetter);
      expect(part, head);
    });

    test("gets one of the two body parts", () {
      final bodyPartsWithWeights = {
        head: 1,
        neck: 10,
      };

      final part =
          Anatomy.pickRandomBodyPart(bodyPartsWithWeights, randomIntGetter);
      expect(part, anyOf(head, neck));
    });

    test("throws if there are no body parts", () {
      expect(() => Anatomy.pickRandomBodyPart({}, randomIntGetter),
          throwsArgumentError);
    });
  });
}
