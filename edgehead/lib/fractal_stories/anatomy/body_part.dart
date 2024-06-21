library fractal_stories.anatomy.body_part;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';

part 'body_part.g.dart';

/// [BodyPart]s are the source of most of the actor's actions.
/// Functioning legs allow the actor to move, functioning arms allow them to
/// swing weapons, functioning tentacles allow them to grab and suffocate,
/// functioning tails allow them to swing or sting.
abstract class BodyPart extends Object
    with EntityBehavior
    implements Built<BodyPart, BodyPartBuilder>, Entity {
  static Serializer<BodyPart> get serializer => _$bodyPartSerializer;

  factory BodyPart(
    int id,
    String name, {
    String? randomDesignation,
    Iterable<BodyPart>? children,
    BodyPartDesignation? designation,
    BodyPartFunction? function,
    int? hitpoints,
    bool? isVital,
    bool? isSeverable,
    bool? isSevered,
    int? bluntHitsCount,
    int? majorCutsCount,
    int? minorCutsCount,
    DamageCapabilityBuilder? damageCapability,
    int swingSurfaceLeft = 1,
    int swingSurfaceRight = 1,
    int thrustSurface = 1,
    int? firstOwnerId,
  }) =>
      _$BodyPart((b) => b
        ..id = id
        ..name = name
        ..randomDesignation =
            randomDesignation ?? (designation?.toHumanString() ?? name)
        ..children = ListBuilder<BodyPart>(children ?? const <BodyPart>[])
        ..designation = designation ?? BodyPartDesignation.none
        ..function = function ?? BodyPartFunction.none
        ..hitpoints = hitpoints ?? 1
        ..maxHitpoints = hitpoints ?? 1
        ..isVital = isVital ?? false
        ..isSeverable = isSeverable ?? false
        ..isSevered = isSevered ?? false
        ..bluntHitsCount = bluntHitsCount ?? 0
        ..majorCutsCount = majorCutsCount ?? 0
        ..minorCutsCount = minorCutsCount ?? 0
        ..damageCapability =
            damageCapability ?? DamageCapability.invalid.toBuilder()
        ..swingSurfaceLeft = swingSurfaceLeft
        ..swingSurfaceRight = swingSurfaceRight
        ..thrustSurface = thrustSurface
        ..firstOwnerId = firstOwnerId
        ..isActive = true);

  BodyPart._();

  /// Body parts don't have adjectives. The assumption is that you won't have
  /// situations when this would be helpful.
  ///
  /// For example, 'left eye' and 'right eye' are already distinct. If we add
  /// something like 'injured left eye', that's going to be _only_ used
  /// when there is another 'left eye' in the discourse. And in that case,
  /// it's much better to use something like "the goblin's left eye".
  @override
  String? get adjective => null;

  /// The number of blunt hits (from fists, clubs, falls, etc.) that the
  /// body part received.
  int get bluntHitsCount;

  BuiltList<BodyPart> get children;

  /// Fists, thorns, tails and similar body parts can have the ability
  /// to deal damage. Actor can spawn an item that acts as a weapon
  /// and which uses this [damageCapability].
  DamageCapability? get damageCapability;

  BodyPartDesignation get designation;

  @override
  int get firstOwnerId;

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

  /// How many hitpoints does this body part have. After this goes
  /// to `0`, the body part is disabled.
  ///
  /// This is `1` by default.
  int get hitpoints;

  @override
  int get id;

  @override
  bool get isActive;

  @override
  bool get isAnimated => hitpoints > 0;

  /// Body parts are all over the place. In any given fight, there are
  /// several eyes and a bunch of legs. But all these eyes have different
  /// owners, and it would be confusing if we had reports such as
  /// "I hit the leg" (when there are at least four legs in the fight).
  @override
  bool get isCommon => false;

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
  /// It's descendants are not "[isSevered]" (they just happen to be attached to
  /// a severed part).
  ///
  /// A body part that is [isSevered] is part of the anatomy (as a stub of
  /// the former limb, for example). But it is dead ([hitpoints] should be
  /// set to `0`) and it won't show up in [getDescendantParts] (and therefore
  /// no in [Anatomy.allParts]).
  bool get isSevered;

  /// When this body part is destroyed or severed, does the owner die?
  bool get isVital;

  /// The number of unhealed major cuts (from slashes and thrusts) that the
  /// body part received.
  int get majorCutsCount;

  /// The number of hitpoints that this body part has when it is completely
  /// healthy or healed.
  int get maxHitpoints;

  /// The number of unhealed minor cuts (from slashes and thrusts and thorns)
  /// that the body part received. Minor cuts are also known as nicks
  /// or gashes.
  int get minorCutsCount;

  @override
  String get name;

  @override
  bool get nameIsProperNoun => false;

  @override
  Pronoun get pronoun {
    // Special case for teeth. If we have more plurals in body parts,
    // we might want to save the actual pronoun with each body part.
    if (designation == BodyPartDesignation.teeth) return Pronoun.THEY;
    return Pronoun.IT;
  }

  /// A designation that can be used in storyline to refer to this part, e.g.
  /// `"{abdomen|chest|belly}"` for torso.
  ///
  /// Note that the resulting string (after being processed by
  /// [Randomly.parseAndPick]) will really be random. Don't use
  /// [randomDesignation] of the same body part two times in a row.
  ///
  /// This is useful when you want to, for example, report a slash of a torso,
  /// and you'd like to make the report a little more specific, with something
  /// like "you cut the orc's abdomen" or "you slash across the orc's chest".
  ///
  /// By default, this is the same as [name].
  String get randomDesignation;

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
  int get swingSurfaceLeft;

  /// See [swingSurfaceLeft] doc comment.
  int get swingSurfaceRight;

  /// See [swingSurfaceLeft] doc comment.
  int get swingSurfaceTop => 1;

  @override
  Team get team => neutralTeam;

  /// See [swingSurfaceLeft] doc comment.
  int get thrustSurface;

  /// Returns this part and all descendants of it.
  ///
  /// Use this to get everything that is attached to a body part. For example,
  /// descendants of the left shoulder include the left shoulder, the left arm,
  /// the left hand, and all the fingers on the left hand.
  ///
  /// Because anatomies start with the torso (where the heart is), descendants
  /// of [torso] include every part of the anatomy. (Use [allParts] for that.)
  ///
  /// When a part is severed ([BodyPart.isSevered]) it will be skipped
  /// from the return of this function (and so will its descendants).
  Iterable<BodyPart> getDescendantParts() sync* {
    yield this;
    for (final child in children) {
      if (child.isSevered) continue;
      yield* child.getDescendantParts();
    }
  }

  @override
  String toString() => 'BodyPart<$name, hp=$hitpoints, '
      '${isSevered ? 'severed, ' : ''}'
      '${isVital ? 'vital, ' : ''}'
      '${hasVitalDescendants ? 'vitalDescendants, ' : ''}'
      'children: [${children.map((c) => c.name).join(', ')}]>';
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

  /// The teeth of a creature.
  static const BodyPartDesignation teeth = _$teeth;

  /// Left eye of a humanoid (two-eyed) creature.
  static const BodyPartDesignation leftEye = _$leftEye;

  /// Right eye of a humanoid (two-eyed) creature.
  static const BodyPartDesignation rightEye = _$rightEye;

  /// The arm of a humanoid (two-armed) creature that wields a weapon
  /// and ends with [primaryHand]. Also known as 'weapon arm'.
  ///
  /// This will normally be the humanoid's right arm. From the perspective
  /// of an attacker, it will be on the left.
  static const BodyPartDesignation primaryArm = _$primaryArm;

  /// The hand of a humanoid (two-armed) creature that holds the weapon
  /// or deals fist damage. Also known as 'weapon hand'.
  static const BodyPartDesignation primaryHand = _$primaryHand;

  /// The arm of a humanoid (two-armed) creature that does not normally
  /// wield a weapon. It might not wield anything, or it can wield a shield.
  /// It ends with a [secondaryHand].
  static const BodyPartDesignation secondaryArm = _$secondaryArm;

  /// The hand of a humanoid (two-armed) creature that does not normally
  /// hold the weapon. It might not hold anything, or it might hold a shield.
  static const BodyPartDesignation secondaryHand = _$secondaryHand;

  /// The central part of a creature. This is normally where the heart is,
  /// and so this tends to be the root of the anatomy.
  static const BodyPartDesignation torso = _$torso;

  /// A part not normally present in humanoid creatures.
  static const BodyPartDesignation tail = _$tail;

  /// The body part is not "named".
  static const BodyPartDesignation none = _$noSpecification;

  static Serializer<BodyPartDesignation> get serializer =>
      _$bodyPartDesignationSerializer;

  static BuiltSet<BodyPartDesignation> get values => _$specificBodyPartValues;

  const BodyPartDesignation._(super.name);

  /// This is `false` for [primaryHand] and [secondaryHand]. Just the arm
  /// counts.
  bool get isArm => this == primaryArm || this == secondaryArm;

  bool get isHand => this == primaryHand || this == secondaryHand;

  /// Assumes humanoid anatomy (2 eyes).
  bool get isHumanoidEye => this == leftEye || this == rightEye;

  /// This is `true` for any part of a limb.
  ///
  /// Assumes humanoid anatomy (e.g. will not be `true` for tentacles).
  bool get isHumanoidLimb => isArm || isHand || isLeg;

  bool get isLeg => this == leftLeg || this == rightLeg;

  String toHumanString() {
    switch (this) {
      case neck:
        return "neck";
      case head:
        return "head";
      case leftLeg:
        return "left leg";
      case rightLeg:
        return "right leg";
      case primaryArm:
        return "main arm";
      case secondaryArm:
        return "off arm";
      case primaryHand:
        return "main hand";
      case secondaryHand:
        return "off hand";
      case teeth:
        return "teeth";
      case leftEye:
        return "left eye";
      case rightEye:
        return "right eye";
      case torso:
        return "torso";
      case tail:
        return "tail";
      default:
        assert(false, "No human string defined for $this.");
        return name;
    }
  }

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

  const BodyPartFunction._(super.name);

  static BodyPartFunction valueOf(String name) =>
      _$valueOfBodyPartFunction(name);
}
