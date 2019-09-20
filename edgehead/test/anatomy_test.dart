import 'dart:math';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_slashing_damage.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/anatomy/humanoid.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:test/test.dart';

void main() {
  group("executeSlashingHit", () {
    test("decapitating kills", () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .victim;
      expect(deadOrc.isAnimated, isFalse);
    });

    test("cleaving neck removes head", () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .victim;
      expect(
          deadOrc.anatomy.findByDesignation(BodyPartDesignation.head), isNull);
    });

    test("disabling a part that leads to a single eye will make actor blind",
        () {
      final monster = Actor.initialized(1000, "monster").toBuilder();
      // This monster has no neck.
      monster.anatomy.torso.children
          .removeWhere((part) => part.designation == BodyPartDesignation.neck);
      // It has some tail-like outgrowth with an eye.
      monster.anatomy.torso.children.add(BodyPart(
        123123,
        "tail",
        designation: BodyPartDesignation.tail,
        children: [
          BodyPart(1234123222, "eye", designation: BodyPartDesignation.leftEye)
        ],
      ));
      final sword = Item.weapon(42, WeaponType.sword);

      final blindMonster = executeSlashingHit(
              monster.build(), sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.tail)
          .victim;
      expect(blindMonster.anatomy.isBlind, isTrue);
    });

    test("cleaving neck disables it", () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .victim;
      expect(
          deadOrc.anatomy
              .findByDesignation(BodyPartDesignation.neck)
              .isAnimated,
          isFalse);
    });

    test("cleaving neck returns neck and head", () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final severed = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.neck)
          .severedPart;
      expect(
          Anatomy.findByDesignationFromPart(BodyPartDesignation.head, severed),
          isNotNull);
    });

    test("cleaving non-severable body part kills it but not its descendants",
        () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final deadOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.cleave,
              designation: BodyPartDesignation.head)
          .victim;
      expect(
          deadOrc.anatomy
              .findByDesignation(BodyPartDesignation.head)
              .isAnimated,
          isFalse);
      expect(
          deadOrc.anatomy
              .findByDesignation(BodyPartDesignation.leftEye)
              .isAnimated,
          isTrue);
    });

    test("cleaving non-severable body part downgrades to major cut", () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final slashResult = executeSlashingHit(
          orc, sword, SlashSuccessLevel.cleave,
          designation: BodyPartDesignation.head);
      expect(slashResult.slashSuccessLevel, SlashSuccessLevel.majorCut);
    });

    test("major-cutting actor with Con=2 once does not kill him", () {
      final orc = Actor.initialized(1000, "orc", constitution: 2);
      final sword = Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.torso)
          .victim;
      expect(cutOrc.isAnimated, isTrue);
    });

    test(
        "major-cutting actor with Con=2 two times on a vital body part "
        "kills him", () {
      final orc = Actor.initialized(1000, "orc", constitution: 2);
      final sword = Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.torso)
          .victim;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.torso)
          .victim;
      expect(doublyCutOrc.isAnimated, isFalse);
    });

    test(
        "major-cutting actor with Con=2 two times on a non-vital body part "
        "does not kill him", () {
      final orc = Actor.initialized(1000, "orc", constitution: 2);
      final sword = Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      expect(doublyCutOrc.isAnimated, isTrue);
    });

    test(
        "major-cutting actor with Con=2 two times on a non-vital body part "
        "disables it", () {
      final orc = Actor.initialized(1000, "orc", constitution: 2);
      final sword = Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.majorCut,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      expect(
          doublyCutOrc.anatomy
              .findByDesignation(BodyPartDesignation.rightLeg)
              .isAnimated,
          isFalse);
    });

    test("minor-cutting several times does not kill", () {
      final orc = Actor.initialized(1000, "orc");
      final sword = Item.weapon(42, WeaponType.sword);

      final cutOrc = executeSlashingHit(orc, sword, SlashSuccessLevel.minorCut,
              designation: BodyPartDesignation.head)
          .victim;
      final doublyCutOrc = executeSlashingHit(
              cutOrc, sword, SlashSuccessLevel.minorCut,
              designation: BodyPartDesignation.head)
          .victim;
      expect(doublyCutOrc.isAnimated, isTrue);
    });
  });

  group("executeThrustingHit", () {
    test("disabling primary hand drops weapon", () {
      final orc = Actor.initialized(1000, "orc",
          currentWeapon: Item.weapon(10000, WeaponType.sword));
      final dagger = Item.weapon(42, WeaponType.dagger);

      final result =
          executeThrustingHit(orc, dagger, BodyPartDesignation.primaryHand);
      expect(result.willDropCurrentWeapon, isTrue);
    });

    test("disabling primary arm drops weapon", () {
      final orc = Actor.initialized(1000, "orc",
          currentWeapon: Item.weapon(10000, WeaponType.sword));
      final dagger = Item.weapon(42, WeaponType.dagger);

      final result =
          executeThrustingHit(orc, dagger, BodyPartDesignation.primaryArm);
      expect(result.willDropCurrentWeapon, isTrue);
    });

    test("disabling secondary hand doesn't drop weapon", () {
      final orc = Actor.initialized(1000, "orc",
          currentWeapon: Item.weapon(10000, WeaponType.sword));
      final dagger = Item.weapon(42, WeaponType.dagger);

      final result =
          executeThrustingHit(orc, dagger, BodyPartDesignation.secondaryHand);
      expect(result.willDropCurrentWeapon, isFalse);
    });
  });

  group("pickRandomBodyPartFromLeft/Right", () {
    final random = Random();
    final randomIntGetter = random.nextInt;

    test(
        "attack from right side (attacker's perspective) "
        "never hits right (primary) arm", () {
      // By default, all humanoids are right handed.
      final orc = Actor.initialized(1000, "orc");

      for (int i = 0; i < 1000; i++) {
        final hit =
            orc.anatomy.pickRandomBodyPartFromRight(randomIntGetter, false);
        expect(hit.designation, isNot(BodyPartDesignation.primaryArm));
      }
    });

    test(
        "attack from left side (attacker's perspective) "
        "never hits left (secondary) arm", () {
      // By default, all humanoids are right handed.
      final orc = Actor.initialized(1000, "orc");

      for (int i = 0; i < 1000; i++) {
        final hit =
            orc.anatomy.pickRandomBodyPartFromLeft(randomIntGetter, false);
        expect(hit.designation, isNot(BodyPartDesignation.secondaryArm));
      }
    });
  });

  group("pickRandomBodyPart", () {
    final head = BodyPart(1, "head");
    final neck = BodyPart(2, "neck");
    final random = Random();
    final randomIntGetter = random.nextInt;

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

    test("does not get the body part with weight 0", () {
      final bodyPartsWithWeights = {
        head: 0,
        neck: 1,
      };

      final part =
          Anatomy.pickRandomBodyPart(bodyPartsWithWeights, randomIntGetter);
      expect(part, neck);
    });

    test("throws if there are no body parts", () {
      expect(() => Anatomy.pickRandomBodyPart({}, randomIntGetter),
          throwsArgumentError);
    });

    test("pickRandomBodyPartFromLeft never picks teeth", () {
      final humanoid = buildHumanoid(42, isUndead: false);

      for (int i = 0; i < 10000; i++) {
        final bodyPart =
            humanoid.pickRandomBodyPartFromLeft(randomIntGetter, false);
        expect(bodyPart.designation, isNot(BodyPartDesignation.teeth));
      }
    });
  });
}
