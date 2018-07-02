library fractal_stories.anatomy;

import 'dart:math';

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:meta/meta.dart';

part 'anatomy.g.dart';

/// Encapsulates a living being's anatomy.
///
/// This is a tree of [BodyPart]s. What [Anatomy] provides
/// is convenience methods ([pickRandomBodyPartFromLeft], etc.).
///
/// TODO: performance improvements (*O(1)* access to major body parts etc.).
///       use a `Map<int, List<int>> attachments` to build the tree of parts,
///       and a `List` of body parts for faster access.
abstract class Anatomy implements Built<Anatomy, AnatomyBuilder> {
  static Serializer<Anatomy> get serializer => _$anatomySerializer;

  factory Anatomy({@required BodyPart torso}) = _$Anatomy._;

  Anatomy._();

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
  BodyPart pickRandomBodyPartFromLeft(Random random) {
    final parts = _getLeftPartsWithWeights();
    return pickRandomBodyPart(parts, random);
  }

  /// Returns a body part that is about to be hit by an attack from the right.
  BodyPart pickRandomBodyPartFromRight(Random random) {
    final parts = _getRightPartsWithWeights();
    return pickRandomBodyPart(parts, random);
  }

  /// Creates a map of parts to their weight. The weight is the [Map.value]
  /// part.
  Map<BodyPart, int> _getLeftPartsWithWeights() {
    final map = <BodyPart, int>{};

    for (final part in _walk(torso)) {
      if (part.swingSurfaceLeft == 0) continue;
      map[part] = part.swingSurfaceLeft;
    }
    return map;
  }

  /// Creates a map of parts to their weight. The weight is the [Map.value]
  /// part.
  Map<BodyPart, int> _getRightPartsWithWeights() {
    final map = <BodyPart, int>{};

    for (final part in _walk(torso)) {
      if (part.swingSurfaceRight == 0) continue;
      map[part] = part.swingSurfaceRight;
    }
    return map;
  }

  Iterable<BodyPart> _walk(BodyPart startingPart) sync* {
    yield startingPart;
    for (final child in startingPart.children) {
      yield* _walk(child);
    }
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
  static BodyPart pickRandomBodyPart(
      Map<BodyPart, int> bodyPartsWithWeights, Random random) {
    if (bodyPartsWithWeights.isEmpty) {
      throw new ArgumentError("bodyPartsWithWeights cannot be empty");
    }
    final weightsTotal = bodyPartsWithWeights.values.reduce(_sum);
    final needle = random.nextInt(weightsTotal);
    int current = 0;
    for (final part in bodyPartsWithWeights.keys) {
      current += bodyPartsWithWeights[part];
      if (needle < current) return part;
    }
    throw new StateError("Part weights aren't adding up.");
  }

  static int _sum(int a, int b) => a + b;
}
