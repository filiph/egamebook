library fractal_stories.anatomy;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/items/teeth.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:meta/meta.dart';

part 'anatomy.g.dart';

/// Encapsulates a living being's anatomy.
///
/// This is a tree of [BodyPart]s. What [Anatomy] provides
/// is convenience methods ([pickRandomBodyPartFromLeft], etc.).
abstract class Anatomy implements Built<Anatomy, AnatomyBuilder> {
  static Serializer<Anatomy> get serializer => _$anatomySerializer;

  factory Anatomy({@required BodyPart torso, bool isUndead}) = _$Anatomy._;

  Anatomy._();

  /// Returns in iterable of all the parts in this anatomy.
  @memoized
  List<BodyPart> get allParts =>
      torso.getDescendantParts().toList(growable: false);

  /// The anatomy is capable of wielding a weapon at this point.
  ///
  /// For a humanoid, this means that at least one of the hands is attached
  /// and not disabled.
  bool get anyWeaponAppendageAvailable =>
      primaryWeaponAppendageAvailable || secondaryWeaponAppendageAvailable;

  /// Returns the best body-part weapon currently available. This could
  /// be a fist for a humanoid, a claw for a monster, a stinger for
  /// a wasp.
  ///
  /// Returns `null` if there are no body parts that are alive and could
  /// be used as a weapon.
  @memoized
  Item get bodyPartWeapon {
    int scoreBodyPart(BodyPart part) =>
        part.damageCapability.bluntDamage +
        part.damageCapability.slashingDamage +
        part.damageCapability.thrustingDamage +
        part.damageCapability.tearingDamage +
        part.damageCapability.length;

    final candidates = torso
        .getDescendantParts()
        .where((p) => p.isAnimatedAndActive && p.damageCapability != null)
        .toList(growable: false);

    if (candidates.isEmpty) return null;

    candidates.sort((a, b) => -scoreBodyPart(a).compareTo(scoreBodyPart(b)));

    if (candidates.first.designation == BodyPartDesignation.teeth) {
      if (isHumanoid) {
        if (isUndead) {
          // Humanoids who are undead are not afraid to use their teeth.
          return createTeeth(candidates.first);
        }
      } else {
        // Solve for non-humanoid teethed creatures.
        throw UnimplementedError('Non-humanoid teeth not implemented yet');
      }
    }

    assert(isHumanoid, "Assumes the damage dealing body part is a fist.");
    return createFist(candidates.first);
  }

  /// Returns `true` if both legs are crippled or missing.
  @memoized
  bool get hasCrippledLegs {
    assert(isHumanoid, "This function is currently assuming humanoid anatomy.");
    for (final part in allParts) {
      if ((part.designation == BodyPartDesignation.leftLeg ||
              part.designation == BodyPartDesignation.rightLeg) &&
          part.isAnimated) {
        return false;
      }
    }
    return true;
  }

  /// Returns `true` when all eyes (and other parts with
  /// [BodyPartFunction.vision]) are dead.
  @memoized
  bool get isBlind {
    assert(torso.isAnimatedAndActive,
        "Finding out if an actor is blind when they're dead.");
    return !_hasPartWithFunction(torso, BodyPartFunction.vision);
  }

  /// Is this anatomy humanoid? That means, in general: 2 arms, 2 legs,
  /// one head on a neck.
  ///
  /// Humanoid creatures can still have extra appendages (like a tail)
  /// or missing ones (like an amputated leg) but the main idea is there.
  bool get isHumanoid => true;

  /// When `true`, this actor is undead.
  ///
  /// This field is separate from [Actor.isAnimated]. An actor can be [isUndead]
  /// but killed ([isAnimated] == `false`).
  bool get isUndead;

  /// The appendage that is used as the main weapon-wielding one. Returns
  /// `null` when there is no such body part (i.e. it was severed).
  ///
  /// It is used for holding swords, throwing spears, etc.
  @memoized
  BodyPart get primaryWeaponAppendage {
    assert(isHumanoid, "This function is currently assuming humanoid anatomy.");
    return allParts.singleWhere(
        (part) => part.designation == BodyPartDesignation.primaryHand,
        orElse: () => null);
  }

  bool get primaryWeaponAppendageAvailable =>
      primaryWeaponAppendage?.isAnimatedAndActive ?? false;

  /// The appendage that is used as the secondary weapon-wielding one. Returns
  /// `null` when there is no such body part (i.e. it was severed).
  ///
  /// It is used for holding a shield or supporting the [primaryWeaponAppendage]
  /// in holding a two-handed weapon. In a pinch (e.g. when the primary
  /// appendage is disabled), it can be used to everything that
  /// [primaryWeaponAppendage] can, but with a hefty penalty.
  @memoized
  BodyPart get secondaryWeaponAppendage {
    assert(isHumanoid, "This function is currently assuming humanoid anatomy.");
    return allParts.singleWhere(
        (part) => part.designation == BodyPartDesignation.secondaryHand,
        orElse: () => null);
  }

  bool get secondaryWeaponAppendageAvailable =>
      secondaryWeaponAppendage?.isAnimatedAndActive ?? false;

  /// The root of the anatomy tree. Often the part of the anatomy with
  /// a heart or a similarly 'core' organ.
  BodyPart get torso;

  /// Finds [BodyPart] of [designation] or returns `null`.
  ///
  /// There should be at most one [BodyPart] of any [BodyPartDesignation]. This
  /// function does not enforce that (if you have an invalid anatomy, it will
  /// return the first body part that satisfies the designation, and will
  /// not throw).
  BodyPart findByDesignation(BodyPartDesignation designation) {
    if (torso.designation == designation) return torso;
    for (final child in torso.children) {
      final result = findByDesignationFromPart(designation, child);
      if (result != null) return result;
    }
    return null;
  }

  /// Returns a body part that is about to be hit by an attack from the left.
  BodyPart pickRandomBodyPartFromLeft(
      RandomIntGetter randomIntGetter, bool avoidVital) {
    final parts = _getLeftPartsWithWeights(avoidVital);
    return pickRandomBodyPart(parts, randomIntGetter);
  }

  /// Returns a body part that is about to be hit by an attack from the right.
  BodyPart pickRandomBodyPartFromRight(
      RandomIntGetter randomIntGetter, bool avoidVital) {
    final parts = _getRightPartsWithWeights(avoidVital);
    return pickRandomBodyPart(parts, randomIntGetter);
  }

  /// Creates a map of parts to their weight. The weight is the [Map.value]
  /// part.
  ///
  /// When [avoidVital] is `true`, no vital parts will be in the resulting map.
  Map<BodyPart, int> _getLeftPartsWithWeights(bool avoidVital) {
    final map = <BodyPart, int>{};

    for (final part in torso.getDescendantParts()) {
      if (part.swingSurfaceLeft == 0) continue;
      if (avoidVital && part.isVital) continue;
      map[part] = part.swingSurfaceLeft;
    }
    return map;
  }

  /// Creates a map of parts to their weight. The weight is the [Map.value]
  /// part.
  ///
  /// When [avoidVital] is `true`, no vital parts will be in the resulting map.
  Map<BodyPart, int> _getRightPartsWithWeights(bool avoidVital) {
    final map = <BodyPart, int>{};

    for (final part in torso.getDescendantParts()) {
      if (part.swingSurfaceRight == 0) continue;
      if (avoidVital && part.isVital) continue;
      map[part] = part.swingSurfaceRight;
    }
    return map;
  }

  /// Walks the tree of body parts from [startingPart] downwards, and returns
  /// the first [BodyPart] found with [designation].
  @visibleForTesting
  static BodyPart findByDesignationFromPart(
      BodyPartDesignation designation, BodyPart startingPart) {
    if (startingPart.designation == designation) return startingPart;
    for (final child in startingPart.children) {
      final result = findByDesignationFromPart(designation, child);
      if (result != null) return result;
    }
    return null;
  }

  /// Given [bodyPartsWithWeights], selects a random part randomly. The higher
  /// the weight, the more likely the part is to be selected.
  ///
  /// This works as a wheel of fortune, with the weight being the proportional
  /// size of each body part's slice.
  @visibleForTesting
  static BodyPart pickRandomBodyPart(Map<BodyPart, int> bodyPartsWithWeights,
      RandomIntGetter randomIntGetter) {
    if (bodyPartsWithWeights.isEmpty) {
      throw ArgumentError("bodyPartsWithWeights cannot be empty");
    }
    final weightsTotal = bodyPartsWithWeights.values.reduce(_sum);
    final needle = randomIntGetter(weightsTotal);
    int current = 0;
    for (final part in bodyPartsWithWeights.keys) {
      current += bodyPartsWithWeights[part];
      if (needle < current) return part;
    }
    throw StateError("Part weights aren't adding up.");
  }

  /// Returns `true` if [part] or any of its animated (living) descendants
  /// has the [BodyPartFunction] specified in [function].
  static bool _hasPartWithFunction(BodyPart part, BodyPartFunction function) {
    assert(part.isAnimatedAndActive);
    if (part.function == BodyPartFunction.vision) {
      return true;
    }

    for (final child in part.children) {
      if (!child.isAnimatedAndActive) continue;
      if (_hasPartWithFunction(child, function)) {
        return true;
      }
    }

    return false;
  }

  static int _sum(int a, int b) => a + b;
}
