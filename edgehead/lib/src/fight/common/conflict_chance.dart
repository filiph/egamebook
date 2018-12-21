import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:meta/meta.dart';

/// This is a convenience method for constructing [ReasonedSuccessChance]
/// for the combat in Edgehead.
///
/// [performer] and [target] are the two actors at play. [performer] is the
/// actor who is trying to achieve something. [target] is the victim.
///
/// [base] is the base difficulty of the move, and must be between `0` and `1`,
/// exclusive. (For sure failures and sure successes, use
/// [ReasonedSuccessChance.sureFailure] and
/// [ReasonedSuccessChance.sureSuccess], respectively.)
///
/// [modifiers] is the list of adjustments to the [base] success chance.
///
/// Example:
///
///    return getCombatMoveChance(a, enemy, 0.5, [
///      const Bonus(100, CombatReason.dexterity),
///      const Bonus(30, CombatReason.balance),
///    ]);
///
/// The example above defines a combat move that has 50% chance of success when
/// [actor] and [performer] have the same dexterity and the actor is in combat
/// stance. The difference in dexterity of the two actors can nudge
/// the success chance all the way (`100`) up to 100%, or down to 0%. The
/// combat stance can change the final success chance, too, but only by 30%.
ReasonedSuccessChance<CombatReason> getCombatMoveChance(Actor performer,
    Actor target, double base, List<Modifier<CombatReason>> modifiers) {
  assert(base > 0.0, "For sureFailures, use ReasonedSuccessChance.sureFailure");
  assert(
      base < 1.0, "For sureSuccesses, use ReasonedSuccessChance.sureSuccess");

  double value = base;
  final successReasons = List<Reason<CombatReason>>();
  final failureReasons = List<Reason<CombatReason>>();

  for (final modifier in modifiers) {
    assert(
        modifier.maxAdjustment > 0,
        "There is no reason to have modifiers with maxAdjustment "
        "of 0 or below.");
    assert(
        !_reasonsRequiringModifiers.contains(modifier.reason) ||
            modifier is Modifier,
        "$modifier should be a Modifier");
    assert(
        !_reasonsRequiringBonuses.contains(modifier.reason) ||
            modifier is Bonus,
        "$modifier should be a Bonus");
    assert(
        !_reasonsRequiringPenalties.contains(modifier.reason) ||
            modifier is Penalty,
        "$modifier should be a Penalty");
    final scale = _getAdjustmentScale(performer, target, modifier.reason);
    assert(scale >= -1.0);
    assert(scale <= 1.0);
    assert(
        modifier is! Bonus || scale >= 0.0, "Bonuses must always be positive.");
    assert(modifier is! Penalty || scale <= 0.0,
        "Penalties must always be negative.");
    if (scale == 0.0) continue;

    final previous = value;
    final adjustment = modifier.maxAdjustment * scale;
    value = _lerp(value, adjustment.round());
    final difference = (value - previous).abs();
    final reason = Reason<CombatReason>(modifier.reason, difference);

    if (scale > 0) {
      successReasons.add(reason);
    } else {
      failureReasons.add(reason);
    }
  }

  return ReasonedSuccessChance<CombatReason>(value,
      successReasons: successReasons, failureReasons: failureReasons);
}

/// Returns the portion of body parts with given [function] that are disabled
/// ([BodyPart.isAlive] is `false`).
///
/// When [actor] has no parts with that [function], this method returns `1.0`.
/// It's possible that these parts were cleaved off.
double _fractionDisabled(Actor actor, BodyPartFunction function) {
  int total = 0;
  int disabled = 0;
  for (final part in actor.anatomy.allParts) {
    if (part.function != function) continue;
    total += 1;
    if (!part.isAlive) {
      disabled += 1;
    }
  }
  if (total == 0) return 1.0;
  return disabled / total;
}

/// Given the current state of [performer] and [target], to what degree
/// is [reason] applicable as a bonus.
///
/// For example, if both actors have the same dexterity, then this function
/// returns `0.0` for [CombatReason.dexterity]. When the [performer] is more
/// than `100` points of dexterity better, it will return `1.0`.
double _getAdjustmentScale(Actor performer, Actor target, CombatReason reason) {
  switch (reason) {
    case CombatReason.dexterity:
      return (performer.dexterity - target.dexterity).clamp(-100, 100) / 100;
    case CombatReason.balance:
      final difference =
          performer.pose.differenceFrom(target.pose).clamp(-2, 2);
      return difference / 2;
    case CombatReason.height:
      if (performer.isOnGround && !target.isOnGround) {
        return -1.0;
      } else if (!performer.isOnGround && target.isOnGround) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasShield:
      if (target.currentShield != null) {
        return -1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasPrimaryArmDisabled:
      if (_partDisabled(target, BodyPartDesignation.primaryArm)) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasSecondaryArmDisabled:
      if (_partDisabled(target, BodyPartDesignation.secondaryArm)) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasOneLegDisabled:
      final percent = _fractionDisabled(target, BodyPartFunction.mobile);
      if (percent > 0 && percent < 1) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasAllLegsDisabled:
      final percent = _fractionDisabled(target, BodyPartFunction.mobile);
      if (percent == 1.0) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasOneEyeDisabled:
      final percent = _fractionDisabled(target, BodyPartFunction.vision);
      if (percent > 0 && percent < 1) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetHasAllEyesDisabled:
      final percent = _fractionDisabled(target, BodyPartFunction.vision);
      if (percent == 1.0) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
  }

  throw ArgumentError("no rule for $reason");
}

double _lerp(double current, int bonus) {
  if (bonus >= 100) return 1.0;
  if (bonus <= -100) return 0.0;

  final distance = bonus.isNegative ? current : 1.0 - current;
  final portion = bonus / 100;
  return current + portion * distance;
}

/// Returns `true` if the (single) part that's defined by [designation]
/// is dead ([BodyPart.isAlive] is `false`).
bool _partDisabled(Actor actor, BodyPartDesignation designation) {
  return !actor.anatomy.findByDesignation(designation).isAlive;
}

/// A modification to the success chance. Can be either positive or negative.
///
/// For example, [CombatReason.dexterity] is a modification because the attacker
/// can be either more or less dexterous than the target.
@immutable
class Modifier<R> {
  final int maxAdjustment;
  final R reason;

  const Modifier(this.maxAdjustment, this.reason);

  @override
  String toString() => "Modifier<$R:$reason:$maxAdjustment>";
}

/// A [Modifier] that is always positive for the actor (and always negative
/// for the target).
///
/// Having a [Bonus] that results in a negative adjustment to a success
/// chance is a runtime error.
///
/// A [Bonus] can evaluate to `0` adjustment.
@immutable
class Bonus<R> extends Modifier<R> {
  const Bonus(int maxAdjustment, R reason) : super(maxAdjustment, reason);
}

/// A [Modifier] that is always negative for the actor (and always positive
/// for the target).
///
/// Having a [Penalty] that results in a positive adjustment to a success
/// chance is a runtime error.
///
/// A [Penalty] can evaluate to `0` adjustment.
@immutable
class Penalty<R> extends Modifier<R> {
  const Penalty(int maxAdjustment, R reason) : super(maxAdjustment, reason);
}

/// Reasons for the performer of a move (e.g. attacker) to be successful
/// or unsuccessful.
///
/// For example, if a [Bonus] has a [CombatReason.dexterity] and the
/// [Bonus.maxAdjustment] is positive, it means that the (possible) success was
/// partly because the performer was more dexterous than the target
/// (e.g. fast slash). If [Bonus.maxAdjustment] is negative, than the
/// (possible) failure was because the target was more dexterous
/// (e.g. dodged slash).
enum CombatReason {
  /// The general ability to move during combat. Includes ability to use
  /// weapons in case of humanoids.
  dexterity,

  /// The relative balance. Attacking out of balance is bad, especially if
  /// the enemy has good combat stance. And vice versa, defending while
  /// out of balance is bad.
  balance,

  /// Advantage for the actor who is standing above the enemy thanks to
  /// a) terrain or b) posture. For example, an actor on a table has
  /// a height advantage. An actor lying on the ground has a height
  /// disadvantage towards an actor who is standing (regardless whether
  /// the standing actor is in balance or not).
  height,

  /// The fact that the target doesn't have (or can't use) a shield to deflect
  /// or foil the move.
  ///
  /// This is always a [Penalty] to the attacker.
  targetHasShield,

  /// The fact that the target has disabled (or cleaved off) primary arm,
  /// meaning that he cannot move it to defend themselves.
  targetHasPrimaryArmDisabled,

  /// The fact that the target has disabled (or cleaved off) secondary arm,
  /// meaning that he cannot move it to defend themselves.
  targetHasSecondaryArmDisabled,

  /// One of the (probably two) legs is disabled. Dodging and movement
  /// is harder.
  targetHasOneLegDisabled,

  /// All legs (i.e. _both_ legs in case of humanoids) are disabled or
  /// cleaved-off. No dodging for the target, and severely impacted
  /// ability to defend oneself.
  targetHasAllLegsDisabled,

  /// One of target's eyes is non-functional. Makes fighting harder.
  targetHasOneEyeDisabled,

  /// All eyes (i.e. _both_ eyes, for most creatures) are non-functional.
  /// Severely impacts the target's ability to defend themselves.
  targetHasAllEyesDisabled,

  // TODO: weaponDexterity /// Lightness of weapon
  // TODO: reach /// Advantage of longer limbs and longer weapons
  // TODO: strength /// Brute force (e.g. withstanding a kick, still standing)
}

const List<CombatReason> _reasonsRequiringModifiers = [
  CombatReason.dexterity,
  CombatReason.balance,
  CombatReason.height
];

const List<CombatReason> _reasonsRequiringBonuses = [
  CombatReason.targetHasAllEyesDisabled,
  CombatReason.targetHasOneEyeDisabled,
  CombatReason.targetHasAllLegsDisabled,
  CombatReason.targetHasOneLegDisabled,
  CombatReason.targetHasPrimaryArmDisabled,
  CombatReason.targetHasSecondaryArmDisabled,
];

const List<CombatReason> _reasonsRequiringPenalties = [
  CombatReason.targetHasShield,
];
