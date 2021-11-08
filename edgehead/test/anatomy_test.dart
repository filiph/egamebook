// @dart=2.9

import 'dart:math';

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_thrusting_damage.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/humanoid.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:test/test.dart';

import 'src/test_random.dart';

void main() {
  group("deepReplaceBodyPart", () {
    test("damages head correctly", () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");
      final orcBuilder = orc.toBuilder();

      deepReplaceBodyPart(
          orcBuilder,
          (p) => p.designation == BodyPartDesignation.head,
          (b) => b.hitpoints = 0);

      final newOrc = orcBuilder.build();

      expect(
        newOrc.anatomy.findByDesignation(BodyPartDesignation.head).hitpoints,
        0,
      );
    });

    test("heals head correctly", () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");
      final orcBuilder = orc.toBuilder();

      // Damage first
      deepReplaceBodyPart(
          orcBuilder,
          (p) => p.designation == BodyPartDesignation.head,
          (b) => b.hitpoints = 0);

      // Heal next
      deepReplaceBodyPart(
          orcBuilder,
          (p) => p.designation == BodyPartDesignation.head,
          (b) => b.hitpoints = 1);

      final newOrc = orcBuilder.build();

      expect(
        newOrc.anatomy.findByDesignation(BodyPartDesignation.head).hitpoints,
        greaterThan(0),
      );
    });
  });

  group("executeSlashingHit", () {
    final katana = Item.weapon(42, WeaponType.sword,
        name: 'katana', adjective: 'sharp', isCleaving: true);

    final sword = Item.weapon(42, WeaponType.sword, adjective: 'ordinary');

    test("decapitating kills", () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      final deadOrc = decideSlashingHit(orc, katana, randomIntGetter,
              designation: BodyPartDesignation.neck)
          .victim;
      expect(deadOrc.isAnimated, isFalse);
    });

    test("cleaving neck removes head", () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      final deadOrc = decideSlashingHit(orc, katana, randomIntGetter,
              designation: BodyPartDesignation.neck)
          .victim;
      expect(
          deadOrc.anatomy.findByDesignation(BodyPartDesignation.head), isNull);
    });

    test("disabling a part that leads to a single eye will make actor blind",
        () {
      final monster =
          Actor.initialized(1000, testRandomIdGetter, "monster").toBuilder();
      // This monster has no neck.
      monster.anatomy.torso.children
          .removeWhere((part) => part.designation == BodyPartDesignation.neck);
      // It has some tail-like outgrowth with an eye.
      monster.anatomy.torso.children.add(BodyPart(
        123123,
        "tail",
        designation: BodyPartDesignation.tail,
        children: [
          BodyPart(1234123222, "eye",
              designation: BodyPartDesignation.leftEye,
              firstOwnerId: monster.id)
        ],
        firstOwnerId: monster.id,
      ));

      final blindMonster = decideSlashingHit(
              monster.build(), katana, randomIntGetter,
              designation: BodyPartDesignation.tail)
          .victim;
      expect(blindMonster.anatomy.isBlind, isTrue);
    });

    test("cleaving neck disables it", () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      final deadOrc = decideSlashingHit(orc, katana, randomIntGetter,
              designation: BodyPartDesignation.neck)
          .victim;
      expect(
          deadOrc.anatomy
              .findByDesignation(BodyPartDesignation.neck)
              .isAnimated,
          isFalse);
    });

    test("cleaving neck returns neck and head", () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      final severed = decideSlashingHit(orc, katana, randomIntGetter,
              designation: BodyPartDesignation.neck)
          .severedPart;
      expect(
          Anatomy.findByDesignationFromPart(
              BodyPartDesignation.head, severed.bodyPart),
          isNotNull);
    });

    test("cleaving non-severable body part kills it but not its descendants",
        () {
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      final deadOrc = decideSlashingHit(orc, katana, randomIntGetter,
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
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      final slashResult = decideSlashingHit(orc, katana, randomIntGetter,
          designation: BodyPartDesignation.head);
      expect(slashResult.slashSuccessLevel, SlashSuccessLevel.majorCut);
    });

    test("major-cutting actor with Con=2 once does not kill him", () {
      final orc =
          Actor.initialized(1000, testRandomIdGetter, "orc", constitution: 2);

      final cutOrc = decideSlashingHit(orc, sword, randomIntGetter,
              designation: BodyPartDesignation.torso)
          .victim;
      expect(cutOrc.isAnimated, isTrue);
    });

    test(
        "major-cutting actor with Con=2 two times on a vital body part "
        "kills him", () {
      final orc =
          Actor.initialized(1000, testRandomIdGetter, "orc", constitution: 2);

      final cutOrc = decideSlashingHit(orc, sword, randomIntGetter,
              designation: BodyPartDesignation.torso)
          .victim;
      final doublyCutOrc = decideSlashingHit(cutOrc, sword, randomIntGetter,
              designation: BodyPartDesignation.torso)
          .victim;
      expect(doublyCutOrc.isAnimated, isFalse);
    });

    test(
        "major-cutting actor with Con=2 two times on a non-vital body part "
        "does not kill him", () {
      final orc =
          Actor.initialized(1000, testRandomIdGetter, "orc", constitution: 2);

      final cutOrc = decideSlashingHit(orc, sword, randomIntGetter,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      final doublyCutOrc = decideSlashingHit(cutOrc, sword, randomIntGetter,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      expect(doublyCutOrc.isAnimated, isTrue);
    });

    test(
        "major-cutting actor with Con=2 two times on a non-vital body part "
        "disables it", () {
      final orc =
          Actor.initialized(1000, testRandomIdGetter, "orc", constitution: 2);

      final cutOrc = decideSlashingHit(orc, sword, randomIntGetter,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      final doublyCutOrc = decideSlashingHit(cutOrc, sword, randomIntGetter,
              designation: BodyPartDesignation.rightLeg)
          .victim;
      expect(
          doublyCutOrc.anatomy
              .findByDesignation(BodyPartDesignation.rightLeg)
              .isAnimated,
          isFalse);
    });
  });

  group("executeThrustingHit", () {
    final dagger = Item.weapon(42, WeaponType.dagger, adjective: 'ordinary');

    test("disabling primary hand drops weapon", () {
      const orcId = 1000;
      final orc = Actor.initialized(orcId, testRandomIdGetter, "orc",
          currentWeapon: Item.weapon(10000, WeaponType.sword,
              adjective: 'orcish', firstOwnerId: orcId));

      final result =
          executeThrustingHit(orc, dagger, BodyPartDesignation.primaryHand);
      expect(result.willDropCurrentWeapon, isTrue);
    });

    test("disabling primary arm drops weapon", () {
      const orcId = 1000;
      final orc = Actor.initialized(orcId, testRandomIdGetter, "orc",
          currentWeapon: Item.weapon(10000, WeaponType.sword,
              adjective: 'orcish', firstOwnerId: orcId));

      final result =
          executeThrustingHit(orc, dagger, BodyPartDesignation.primaryArm);
      expect(result.willDropCurrentWeapon, isTrue);
    });

    test("disabling secondary hand doesn't drop weapon", () {
      const orcId = 1000;
      final orc = Actor.initialized(orcId, testRandomIdGetter, "orc",
          currentWeapon: Item.weapon(10000, WeaponType.sword,
              adjective: 'orcish', firstOwnerId: orcId));

      final result =
          executeThrustingHit(orc, dagger, BodyPartDesignation.secondaryHand);
      expect(result.willDropCurrentWeapon, isFalse);
    });
  });

  group("pickRandomBodyPartFromLeft/Right", () {
    test(
        "attack from right side (attacker's perspective) "
        "never hits right (primary) arm", () {
      // By default, all humanoids are right handed.
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

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
      final orc = Actor.initialized(1000, testRandomIdGetter, "orc");

      for (int i = 0; i < 1000; i++) {
        final hit =
            orc.anatomy.pickRandomBodyPartFromLeft(randomIntGetter, false);
        expect(hit.designation, isNot(BodyPartDesignation.secondaryArm));
      }
    });
  });

  group("pickRandomBodyPart", () {
    final actor = Actor.initialized(1000, testRandomIdGetter, "orc");
    final head = BodyPart(1, "head", firstOwnerId: actor.id);
    final neck = BodyPart(2, "neck", firstOwnerId: actor.id);

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
      final humanoid = buildHumanoid(42, testRandomIdGetter, isUndead: false);

      for (int i = 0; i < 10000; i++) {
        final bodyPart =
            humanoid.pickRandomBodyPartFromLeft(randomIntGetter, false);
        expect(bodyPart.designation, isNot(BodyPartDesignation.teeth));
      }
    });
  });
}

final _random = Random();
int randomIntGetter([int max]) => _random.nextInt(max ?? 0xFFFFFF);
