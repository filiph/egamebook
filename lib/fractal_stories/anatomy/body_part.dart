library fractal_stories.anatomy.body_part;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/unique_id.dart';
import 'package:meta/meta.dart';

part 'body_part.g.dart';

/// [BodyPart]s are the source of most of the actor's actions.
/// Functioning legs allow the actor to move, functioning arms allow them to
/// swing weapons, functioning tentacles allow them to grab and suffocate,
/// functioning tails allow them to swing or sting.
abstract class BodyPart extends Built<BodyPart, BodyPartBuilder>
    with EntityBehavior
    implements Entity {
  static Serializer<BodyPart> get serializer => _$bodyPartSerializer;

  factory BodyPart(
    String name, {
    int id,
    List<String> categories,
    Iterable<BodyPart> children,
    BodyPartDesignation designation,
    BodyPartFunction function,
    bool isAlive,
    bool isVital,
    bool isSeverable,
    bool isSevered,
    int bluntHitsCount,
    int majorCutsCount,
    int minorCutsCount,
  }) =>
      new _$BodyPart((b) => b
        ..id = id ?? uniqueIdMaker.generateNext()
        ..name = name
        ..categories = new ListBuilder<String>(categories ?? const <String>[])
        ..children = new ListBuilder<BodyPart>(children ?? const <BodyPart>[])
        ..designation = designation ?? BodyPartDesignation.none
        ..function = function ?? BodyPartFunction.none
        ..isAlive = isAlive ?? true
        ..isVital = isVital ?? false
        ..isSeverable = isSeverable ?? false
        ..isSevered = isSevered ?? false
        ..bluntHitsCount = bluntHitsCount ?? 0
        ..majorCutsCount = majorCutsCount ?? 0
        ..minorCutsCount = minorCutsCount ?? 0
        ..isActive = true);

  BodyPart._();

  /// The number of blunt hits (from fists, clubs, falls, etc.) that the
  /// body part received.
  int get bluntHitsCount;

  @override
  BuiltList<String> get categories;

  BuiltList<BodyPart> get children;

  BodyPartDesignation get designation;

  BodyPartFunction get function;

  /// Returns `true` if any [BodyPart] attached (even indirectly) to this one
  /// is vital.
  bool get hasVitalDescendants {
    for (final child in children) {
      if (child.isVital) return true;
      if (child.hasVitalDescendants) return true;
    }
    return false;
  }

  /// How many hitpoints does this body part take before being destroyed
  /// or severed.
  int get health => 1;

  @override
  int get id;

  @override
  bool get isActive;

  @override
  bool get isAlive;

  @override
  bool get isPlayer => false;

  /// Can a slashing swing sever the body part?
  ///
  /// Special actions can try to sever the limb with one go ("cut off head").
  /// A body part can also be severed merely by receiving a large-enough hit.
  ///
  /// Things like eyes are not severable.
  bool get isSeverable;

  /// Is the body part severed (cleaved in half)?
  ///
  /// This is only `true` for the body part that was actually cleaved in half.
  /// It's descendants are not severed (they just happen to be attached to
  /// a severed part).
  bool get isSevered;

  /// When this body part is destroyed or severed, does the owner die?
  bool get isVital;

  /// The number of unhealed major cuts (from slashes and thrusts) that the
  /// body part received.
  int get majorCutsCount;

  /// The number of unhealed minor cuts (from slashes and thrusts and thorns)
  /// that the body part received. Minor cuts are also known as nicks
  /// or gashes.
  int get minorCutsCount;

  @override
  String get name;

  @override
  bool get nameIsProperNoun => false;

  @override
  Pronoun get pronoun => Pronoun.IT;

  /// See [swingSurfaceLeft] doc comment.
  int get swingSurfaceBottom => 1;

  /// The relative probability that a successful swinging attack from the left
  /// will hit this body part.
  ///
  /// For example, the right arm will be more likely to be hit than the head
  /// (it's "surface area" for the weapon is larger). The left hand will
  /// not be hit because it's on the other side of the body. Torso will have
  /// some chance to be hit. In this example, head has `1`, right arm has `3`,
  /// right leg has `3`, torso has `1` and the rest of the body parts have `0`.
  ///
  /// In the end, this means that an un-targeted swing from the left will result
  /// in 1 / (1 + 3 + 3 + 1) == 12.5% chance of hitting the head, for example.
  ///
  /// This also informs how difficult it will be to target a body part with
  /// the swing.
  ///
  /// When a limb is severed, its surface area is no longer counted.
  /// So, severing the right arm in this scenario will suddenly make the head
  /// be much more easily hit: 1 / (1 + 0 + 3 + 1) == 20%.
  int get swingSurfaceLeft => 1;

  /// See [swingSurfaceLeft] doc comment.
  int get swingSurfaceRight => 1;

  /// See [swingSurfaceLeft] doc comment.
  int get swingSurfaceTop => 1;

  @override
  Team get team => neutralTeam;

  /// See [swingSurfaceLeft] doc comment.
  int get thrustSurface => 1;

  /// Finds [BodyPart] of [designation] or returns `null`.
  ///
  /// There should be at most one [BodyPart] of any [BodyPartDesignation]. This
  /// function does not enforce that (if you have an invalid anatomy, it will
  /// return the first body part that satisfies the designation, and will
  /// not throw).
  static BodyPart findByDesignation(
      BodyPartDesignation designation, BodyPart root) {
    if (root.designation == designation) return root;
    for (final child in root.children) {
      final result = findByDesignation(designation, child);
      if (result != null) return result;
    }
    return null;
  }
}

/// This uniquely identifies a [BodyPart] in a body.
///
/// In each body, there can only be one [BodyPart] of the specified type.
/// But there can also be zero.
///
/// This is useful for targeting (or getting status of) a concrete organ.
/// It makes it possible for a swing to target the [neck] or a sweep to
/// target the [leftLeg].
class BodyPartDesignation extends EnumClass {
  /// A neck of a creature with a [head].
  static const BodyPartDesignation neck = _$neck;

  /// The head of a one-headed creature.
  static const BodyPartDesignation head = _$head;

  /// Left leg of a humanoid (two-legged) creature.
  static const BodyPartDesignation leftLeg = _$leftLeg;

  /// Right leg of a humanoid (two-legged) creature.
  static const BodyPartDesignation rightLeg = _$rightLeg;

  /// Left eye of a humanoid (two-eyed) creature.
  static const BodyPartDesignation leftEye = _$leftEye;

  /// Right eye of a humanoid (two-eyed) creature.
  static const BodyPartDesignation rightEye = _$rightEye;

  /// The arm of a humanoid (two-armed) creature that wields a weapon.
  static const BodyPartDesignation primaryArm = _$primaryArm;

  /// The arm of a humanoid (two-armed) creature that does not normally
  /// wield a weapon. It might not wield anything, or it can wield a shield.
  static const BodyPartDesignation secondaryArm = _$secondaryArm;

  /// The central part of a creature. This is normally where the heart is,
  /// and so this tends to be the root of the anatomy.
  static const BodyPartDesignation torso = _$torso;

  /// The body part is not "named".
  static const BodyPartDesignation none = _$noSpecification;

  static Serializer<BodyPartDesignation> get serializer =>
      _$bodyPartDesignationSerializer;

  static BuiltSet<BodyPartDesignation> get values => _$specificBodyPartValues;

  const BodyPartDesignation._(String name) : super(name);

  static BodyPartDesignation valueOf(String name) =>
      _$valueOfSpecifiedBodyPart(name);
}

/// This categorizes a [BodyPart] by its function.
///
/// One body part can only have one function.
///
/// One body can have several [BodyPart]s of the same function (e.g. left
/// eye, right eye).
class BodyPartFunction extends EnumClass {
  /// Things like hands or tentacles.
  static const BodyPartFunction wielding = _$wielding;

  /// Things like legs or tentacles.
  static const BodyPartFunction mobile = _$mobile;

  /// Things like eyes.
  static const BodyPartFunction vision = _$vision;

  /// Things like claws, teeth, stingers.
  static const BodyPartFunction damageDealing = _$damageDealing;

  /// Things like necks, that don't have a function themselves, but can
  /// be used for wearing things, and support other organs.
  static const BodyPartFunction none = _$noFunction;

  static Serializer<BodyPartFunction> get serializer =>
      _$bodyPartFunctionSerializer;

  static BuiltSet<BodyPartFunction> get values => _$bodyPartFunctionValues;

  const BodyPartFunction._(String name) : super(name);

  static BodyPartFunction valueOf(String name) =>
      _$valueOfBodyPartFunction(name);
}
