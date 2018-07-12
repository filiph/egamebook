import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/stateful_random/stateful_random.dart'
    show RandomIntGetter;
import 'package:meta/meta.dart';

/// Executes the business logic of dealing damage to a body part with [weapon]
/// and [success]. Supports anything from minor cuts to decapitation.
///
/// The affected body part is specified either directly with [bodyPart]
/// or indirectly with [designation]. For example, a slash can either
/// directly target a specific body part (selected at random in a previous
/// step), or at a body part "designation" (such as head, neck, etc.).
@visibleForTesting
SlashingResult executeSlashingHit(
  Actor target,
  Item weapon,
  SlashSuccessLevel success, {
  BodyPartDesignation designation,
  BodyPart bodyPart,
}) {
  assert(target.hitpoints > 0);
  assert(weapon.isWeapon);
  assert(designation != null || bodyPart != null);
  assert(designation == null || bodyPart == null);

  BodyPart part = bodyPart;

  if (part == null) {
    // Part not defined directly. We must find it first.
    part = target.anatomy.findByDesignation(designation);
    if (part == null) {
      throw new ArgumentError("$designation not found in $target");
    }
  }

  switch (success) {
    case SlashSuccessLevel.cleave:
      if (part.isSeverable) {
        return _cleaveOff(target, part, weapon);
      } else {
        return _disableBySlash(target, part, weapon);
      }
      break;
    case SlashSuccessLevel.majorCut:
      return _addMajorCut(target, part, weapon);
    case SlashSuccessLevel.minorCut:
      return _addMinorCut(target, part, weapon);
  }

  throw new UnimplementedError("this type of slash not implemented yet");
}

/// Resolves the logic of randomly selecting a body part based on
/// the [direction] of a slash, then dealing the damage to that part
/// with [weapon] and [success].
///
/// Supports anything from minor cuts to decapitation.
SlashingResult executeSlashingHitFromDirection(
    Actor target,
    SlashDirection direction,
    Item weapon,
    SlashSuccessLevel success,
    RandomIntGetter randomIntGenerator) {
  final fromLeft = direction == SlashDirection.left;
  assert(fromLeft || direction == SlashDirection.right,
      "The logic below assumes only two possible directions. Update it.");

  // Only slash vital parts if the enemy is almost ready to go down.
  final avoidVital = target.hitpoints > 1 || target.isSurvivor;

  final bodyPart = fromLeft
      ? target.anatomy
          .pickRandomBodyPartFromLeft(randomIntGenerator, avoidVital)
      : target.anatomy
          .pickRandomBodyPartFromRight(randomIntGenerator, avoidVital);

  return executeSlashingHit(target, weapon, success, bodyPart: bodyPart);
}

SlashingResult _addMajorCut(Actor target, BodyPart designated, Item weapon) {
  assert(designated.hitpoints >= 0);

  if (designated.hitpoints == 1) {
    return _disableBySlash(target, designated, weapon);
  }

  final ActorBuilder victim = target.toBuilder();

  // When a body part is vital, each major cut removes one actor's hitpoint.
  if (designated.isVital && designated.isAlive) {
    victim.hitpoints -= 1;
  }

  // Add a major cut to the body part that was hit.
  _deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == designated.id,
    (b, isDescendant) {
      if (isDescendant) {
        // Ignore descendants, they aren't affected.
        return;
      }
      b.majorCutsCount += 1;
      if (b.hitpoints > 0) {
        b.hitpoints -= 1;
      }
    },
  );

  return new SlashingResult(
      victim.build(), designated, null, SlashSuccessLevel.majorCut);
}

/// Minor cuts are merely recorded on the body part. They don't have any
/// combat effect.
SlashingResult _addMinorCut(Actor target, BodyPart designated, Item weapon) {
  assert(
      designated.isAlive, "Slashing a dead body part is not yet implemented");

  final victim = target.toBuilder();

  // Add a major cut to the body part that was hit.
  _deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == designated.id,
    (b, isDescendant) {
      if (isDescendant) {
        // Ignore descendants, they aren't affected.
        return;
      }
      b.minorCutsCount += 1;
    },
  );

  return new SlashingResult(
      victim.build(), designated, null, SlashSuccessLevel.minorCut);
}

/// Cuts off the body part. The [bodyPart] must be severable.
SlashingResult _cleaveOff(Actor target, BodyPart bodyPart, Item weapon) {
  assert(bodyPart.isSeverable);

  final ActorBuilder victim = target.toBuilder();
  if (bodyPart.isVital || bodyPart.hasVitalDescendants) {
    victim.hitpoints = 0;
  }

  _deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == bodyPart.id,
    (b, isDescendant) {
      if (isDescendant) {
        // Ignore descendants, they are removed.
        return;
      }
      b.children.clear();
      b.isSevered = true;
      b.hitpoints = 0;
    },
  );

  final BodyPartBuilder severedPart = bodyPart.toBuilder();
  severedPart.isSevered = true;
  severedPart.hitpoints = 0;

  return new SlashingResult(
      victim.build(), bodyPart, severedPart.build(), SlashSuccessLevel.cleave);
}

/// Walks body parts from torso down the anatomy-tree, and calls [update]
/// on each [BodyPart] that satisfies [whereFilter] or which is below
/// such a body part in the hierarchy.
///
/// This is complex because we're dealing with an immutable tree of built
/// values that need to be updated.
void _deepReplaceBodyPart(Actor actor, ActorBuilder builder,
    bool whereFilter(BodyPart bodyPart), BodyPartUpdater update) {
  final torsoAfflicted = whereFilter(actor.anatomy.torso);

  if (torsoAfflicted) {
    update(builder.anatomy.torso, false);
  }

  _updateWalker(builder.anatomy.torso.build(), builder.anatomy.torso,
      whereFilter, update, torsoAfflicted);
}

SlashingResult _disableBySlash(Actor target, BodyPart bodyPart, Item weapon) {
  final ActorBuilder victim = target.toBuilder();
  if (bodyPart.isVital || bodyPart.hasVitalDescendants) {
    // TODO: move from hitpoints to something else
    victim.hitpoints = 0;
  }

  _deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == bodyPart.id,
    (b, isDescendant) {
      if (!isDescendant) {
        b.majorCutsCount += 1;
      }
      b.hitpoints = 0;
    },
  );

  bool victimDidFall = false;
  if (bodyPart.function == BodyPartFunction.mobile &&
      target.pose != Pose.onGround) {
    victim.pose = Pose.onGround;
    victimDidFall = true;
  }

  return new SlashingResult(
    victim.build(),
    bodyPart,
    null,
    SlashSuccessLevel.majorCut,
    fell: victimDidFall,
  );
}

void _updateWalker(
    BodyPart built,
    BodyPartBuilder builder,
    bool whereFilter(BodyPart bodyPart),
    BodyPartUpdater update,
    bool afflictedDescendant) {
  builder.children.map((child) {
    final afflicted = whereFilter(child);
    final updated = child.toBuilder();
    _updateWalker(
        child, updated, whereFilter, update, afflictedDescendant || afflicted);

    if (afflicted || afflictedDescendant) {
      update(updated, afflictedDescendant);
    }

    return updated.build();
  });
}

/// An update function that modifies [b]. It also takes [afflictedDescendant],
/// which is `true` when the body part is a descendant of the target body part.
typedef void BodyPartUpdater(BodyPartBuilder b, bool afflictedDescendant);

/// Direction from which the slash is executed. This is from the attacker's
/// perspective.
///
/// Therefore, an attack from the (attacker's) [left] will likely land
/// on the target's _right_ hand.
enum SlashDirection {
  left,
  right,
}

class SlashingResult {
  /// The victim in their state after the slash (e.g. missing a limb).
  final Actor actor;

  /// The body part that was severed (and should be added to the ground).
  /// This can be (and often _will_ be) `null`.
  final BodyPart severedPart;

  /// The body part that was slashed.
  final BodyPart slashedPart;

  /// The victim fell as a result of the slash.
  final bool fell;

  /// Normally, this is the [SlashSuccessLevel] that [executeSlashingHit]
  /// was called with. But in some cases, the success level is upgraded
  /// or downgraded.
  ///
  /// For example, if the provided success level is [SlashSuccessLevel.cleave]
  /// but the body part is not severable, the final [successLevel] will be
  /// [SlashSuccessLevel.majorCut].
  final SlashSuccessLevel successLevel;

  const SlashingResult(
      this.actor, this.slashedPart, this.severedPart, this.successLevel,
      {this.fell: false});
}

enum SlashSuccessLevel {
  /// A slash capable of inflicting a minor gash that might bleed but
  /// won't have an effect on the function of the [BodyPart].
  minorCut,

  /// A slash capable of inflicting a major, bleeding cut.
  ///
  /// Will have effect on the organ, and will generally
  /// lead to loss of consciousness if not treated in the medium term (hours).
  majorCut,

  /// A slash capable of completely severing of organ.
  ///
  /// The organ will bleed a lot. This bleeding alone will
  /// generally lead to loss of consciousness in the short term (minutes).
  ///
  /// Cutting off a body part also disconnects all parts that are attached
  /// to this part from this part's parent (and therefore,
  /// from the root body part).
  ///
  /// When the target [BodyPart.isSeverable] is `false`, this will
  /// "merely" disable the body part and all its descendants.
  cleave,
}
