import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';

/// Executes the business logic of dealing damage to [bodyPart] with [weapon]
/// and [success]. Supports anything from minor cuts to decapitation.
SlashingResult executeSlashingHit(Actor target, BodyPartDesignation bodyPart,
    Weapon weapon, SlashSuccessLevel success) {
  assert(target.hitpoints > 0);

  final designated = BodyPart.findByDesignation(bodyPart, target.torso);
  if (designated == null) {
    throw new ArgumentError("$bodyPart not found in $target");
  }

  switch (success) {
    case SlashSuccessLevel.cleave:
      if (designated.isSeverable) {
        return _cleaveOff(target, designated, weapon);
      } else {
        return _disableBySlash(target, designated, weapon);
      }
      throw new StateError("Please fix non-exhaustive if-else above.");
    case SlashSuccessLevel.majorCut:
      return _addMajorCut(target, designated, weapon);
    case SlashSuccessLevel.minorCut:
      return _addMinorCut(target, designated, weapon);
  }

  throw new UnimplementedError("this type of slash not implemented yet");
}

SlashingResult _addMajorCut(Actor target, BodyPart designated, Weapon weapon) {
  assert(
      designated.isAlive, "Slashing a dead body part is not yet implemented");
  final ActorBuilder victim = target.toBuilder();

  // When a body part is vital, each major cut removes a hitpoint.
  if (designated.isVital) {
    victim.hitpoints -= 1;
  }

  // Add a major cut to the body part that was hit.
  _deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == designated.id,
    (b, isDescendant) {
      if (!isDescendant) {
        b.majorCutsCount += 1;
      }
    },
  );

  // When a body part takes as many hits as is the target's constitution,
  // it is disabled.
  if (designated.majorCutsCount + 1 == target.constitution) {
    return _disableBySlash(victim.build(), designated, weapon);
  }

  return new SlashingResult(victim.build(), null);
}

/// Minor cuts are merely recorded on the body part. They don't have any
/// combat effect.
SlashingResult _addMinorCut(Actor target, BodyPart designated, Weapon weapon) {
  assert(
      designated.isAlive, "Slashing a dead body part is not yet implemented");

  final victim = target.toBuilder();

  // Add a major cut to the body part that was hit.
  _deepReplaceBodyPart(
    target,
    victim,
    (part) => part.id == designated.id,
    (b, isDescendant) {
      if (!isDescendant) {
        b.minorCutsCount += 1;
      }
    },
  );

  return new SlashingResult(victim.build(), null);
}

/// Cuts off the body part. The [bodyPart] must be severable.
SlashingResult _cleaveOff(Actor target, BodyPart bodyPart, Weapon weapon) {
  assert(bodyPart.isSeverable);

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
      if (isDescendant) {
        // Ignore descendants, they are removed.
        return;
      }
      b.children.clear();
      b.isSevered = true;
      b.isAlive = false;
    },
  );

  final BodyPartBuilder severedPart = bodyPart.toBuilder();
  severedPart.isSevered = true;
  severedPart.isAlive = false;

  return new SlashingResult(victim.build(), severedPart.build());
}

/// Walks body parts from torso down the anatomy-tree, and calls [update]
/// on each [BodyPart] that satisfies [whereFilter] or which is below
/// such a body part in the hierarchy.
///
/// This is complex because we're dealing with an immutable tree of built
/// values that need to be updated.
void _deepReplaceBodyPart(Actor actor, ActorBuilder builder,
    bool whereFilter(BodyPart bodyPart), BodyPartUpdater update) {
  final torsoAfflicted = whereFilter(actor.torso);

  if (torsoAfflicted) {
    update(builder.torso, false);
  }

  _updateWalker(builder.torso.build(), builder.torso, whereFilter, update,
      torsoAfflicted);
}

SlashingResult _disableBySlash(Actor target, BodyPart bodyPart, Weapon weapon) {
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
      b.isAlive = false;
      if (!isDescendant) {
        b.majorCutsCount += 1;
      }
    },
  );

  return new SlashingResult(victim.build(), null);
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

class SlashingResult {
  /// The victim in their state after the slash (e.g. missing a limb).
  final Actor actor;

  /// The body part that was severed (and should be added to the ground).
  /// This can be (and often _will_ be) `null`.
  final BodyPart severedPart;

  const SlashingResult(this.actor, this.severedPart);
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
