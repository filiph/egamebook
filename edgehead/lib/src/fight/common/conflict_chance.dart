import 'dart:math';

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:meta/meta.dart';

/// Modifiers applicable to most combat situations. These will make it easier
/// for the performer to succeed when the target has disabled legs or arms
/// or eyes, and harder to succeed when the _performer_ has limited mobility
/// or visibility.
///
/// This does not take into account anything else, such as shields, dexterity,
/// weapon reach, etc.
const disabledModifiers = [
  Bonus(20, CombatReason.targetHasSecondaryArmDisabled),
  Bonus(50, CombatReason.targetHasPrimaryArmDisabled),
  Bonus(30, CombatReason.targetHasOneLegDisabled),
  Bonus(90, CombatReason.targetHasAllLegsDisabled),
  Bonus(50, CombatReason.targetHasOneEyeDisabled),
  Bonus(90, CombatReason.targetHasAllEyesDisabled),
  Penalty(30, CombatReason.performerHasLimitedMobility),
  Penalty(30, CombatReason.performerHasLimitedVision),
];

@visibleForTesting
const List<CombatReason> reasonsRequiringBonuses = [
  CombatReason.performerIsPlayer,
  CombatReason.targetHasAllEyesDisabled,
  CombatReason.targetHasOneEyeDisabled,
  CombatReason.targetHasAllLegsDisabled,
  CombatReason.targetHasOneLegDisabled,
  CombatReason.targetHasPrimaryArmDisabled,
  CombatReason.targetHasSecondaryArmDisabled,
];

@visibleForTesting
const List<CombatReason> reasonsRequiringModifiers = [
  CombatReason.dexterity,
  CombatReason.balance,
  CombatReason.height,
  CombatReason.weaponReach,
];

@visibleForTesting
const List<CombatReason> reasonsRequiringPenalties = [
  CombatReason.performerHasLimitedMobility,
  CombatReason.performerHasLimitedVision,
  CombatReason.targetHasWeapon,
  CombatReason.targetHasShield,
];

/// Used in [varyChance].
final StatefulRandom _statefulRandom = StatefulRandom(42);

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
///    return getCombatMoveChance(a, enemy, 0.5, w.statefulRandomState, [
///      const Bonus(90, CombatReason.dexterity),
///      const Bonus(30, CombatReason.balance),
///    ]);
///
/// The example above defines a combat move that has 50% chance of success when
/// [actor] and [performer] have the same dexterity and the actor is in combat
/// stance. The difference in dexterity of the two actors can nudge
/// the success chance almost all the way (`90`) up to 100%, or down to 0%. The
/// combat stance can change the final success chance, too, but only by 30%.
///
/// If [randomSeed] isn't `null`, then the combat chance will be varied
/// according to [varyChance].
ReasonedSuccessChance<CombatReason> getCombatMoveChance(
  Actor performer,
  Actor target,
  double base,
  int? randomSeed,
  List<Modifier<CombatReason>> modifiers,
) {
  assert(base > 0.0, "For sureFailures, use ReasonedSuccessChance.sureFailure");
  assert(
      base < 1.0, "For sureSuccesses, use ReasonedSuccessChance.sureSuccess");

  double value = base;
  final successReasons = <Reason<CombatReason>>[];
  final failureReasons = <Reason<CombatReason>>[];

  for (final modifier in modifiers) {
    assert(
        modifier.maxAdjustment > 0,
        "There is no reason to have modifiers with maxAdjustment "
        "of 0 or below.");
    assert(
        !reasonsRequiringModifiers.contains(modifier.reason) ||
            (modifier is! Bonus && modifier is! Penalty),
        "$modifier should be a Modifier");
    assert(
        !reasonsRequiringBonuses.contains(modifier.reason) || modifier is Bonus,
        "$modifier should be a Bonus");
    assert(
        !reasonsRequiringPenalties.contains(modifier.reason) ||
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

  if (randomSeed != null) {
    value = varyChance(value, randomSeed);
  }

  return ReasonedSuccessChance<CombatReason>(value,
      successReasons: successReasons, failureReasons: failureReasons);
}

/// Takes a chance [value] (from 0.0 to 1.0) and a [randomSeed], and varies
/// the chance.
@visibleForTesting
double varyChance(double value, int randomSeed) {
  assert(value >= 0.0);
  assert(value <= 1.0);

  /// The minimum distance between the resulting value and any of
  /// the extremities (0 and 1).
  const padding = 0.02;

  if (value < padding || value > 1.0 - padding) return value;

  // Set random according to the current state of the world.
  _statefulRandom.loadState(randomSeed);

  /// The max value change. For example, if initial value is 0.5, then
  /// the resulting value must be 0.5 ± maxVariance.
  const maxVariance = 0.3;

  /// The max value change represented as a ratio of the distance between
  /// the initial value and one of the extremities (0 or 1).
  const scale = 0.7;

  final distanceToClosestExtremity = min(
    (value - 0.0).abs(),
    (1.0 - value).abs(),
  );

  final scaledDistance = distanceToClosestExtremity * scale;
  final clampedDistance = min(scaledDistance, maxVariance);

  /// A random position on the scale from 0 to 2 times clamped distance
  /// (from the value minus the distance to the value plus the distance,
  /// so 2 distance in total).
  final randomPosition = _statefulRandom.nextDouble() * clampedDistance * 2;

  // The final number is the minimum (value minus distance) plus the random
  // position.
  return (value - clampedDistance) + randomPosition;
}

/// Returns the portion of body parts with given [function] that are disabled
/// ([BodyPart.isAnimated] is `false`).
///
/// When [actor] has no parts with that [function], this method returns `1.0`.
/// It's possible that these parts were cleaved off.
double _fractionDisabled(Actor actor, BodyPartFunction function) {
  int total = 0;
  int disabled = 0;
  for (final part in actor.anatomy.allParts) {
    if (part.function != function) continue;
    total += 1;
    if (!part.isAnimated) {
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
      final num difference =
          performer.pose.differenceFrom(target.pose).clamp(-2, 2);
      return difference / 2;
    case CombatReason.height:
      if (performer.isOnGround && !target.isOnGround) {
        return -1.0;
      } else if (!performer.isOnGround && target.isOnGround) {
        return 1.0;
      }
      return 0.0;
    case CombatReason.weaponReach:
      final performerReach = performer.currentDamageCapability.length;
      final targetReach = target.currentDamageCapability.length;
      final num difference = (performerReach - targetReach).clamp(-2, 2);
      return difference / 2;
    case CombatReason.performerIsPlayer:
      if (performer.isPlayer) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.performerHasLimitedMobility:
      final percent = _fractionDisabled(target, BodyPartFunction.mobile);
      return -percent;
    case CombatReason.performerHasLimitedVision:
      final percent = _fractionDisabled(target, BodyPartFunction.vision);
      return -percent;
    case CombatReason.targetHasWeapon:
      if (target.currentWeapon != null) {
        return -1.0;
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
      if (target.anatomy.isBlind) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw StateError("Forgotten logic branch"); // ignore: dead_code
  }
}

double _lerp(double current, int bonus) {
  if (bonus >= 100) return 1.0;
  if (bonus <= -100) return 0.0;

  final distance = bonus.isNegative ? current : 1.0 - current;
  final portion = bonus / 100;
  return current + portion * distance;
}

/// Returns `true` if the (single) part that's defined by [designation]
/// is dead ([BodyPart.isAnimated] is `false`).
bool _partDisabled(Actor actor, BodyPartDesignation designation) {
  return !actor.anatomy.findByDesignation(designation)!.isAnimated;
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
  const Bonus(super.maxAdjustment, super.reason);
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

  /// Advantage for the actor whose weapon has a longer reach. For example,
  /// a knife-wielding combatant should have a disadvantage when fighting
  /// a sword-wielding one.
  weaponReach,

  /// Some moves should just be way easier for the player, to make the game more
  /// fun. For example, nobody wants to consistently fail at withstanding
  /// a feint attack. But the player _will_ want to make others see fail
  /// that same test.
  performerIsPlayer,

  /// The performer of the action doesn't see well.
  performerHasLimitedVision,

  /// The performer of this action cannot move well.
  performerHasLimitedMobility,

  /// The fact that the target doesn't have (or can't use) a weapon to deflect
  /// or foil the move.
  ///
  /// This is always a [Penalty] to the attacker.
  targetHasWeapon,

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
  // TODO: strength /// Brute force (e.g. withstanding a kick, still standing)
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

/// A [Modifier] that is always negative for the actor (and always positive
/// for the target).
///
/// Having a [Penalty] that results in a positive adjustment to a success
/// chance is a runtime error.
///
/// A [Penalty] can evaluate to `0` adjustment.
@immutable
class Penalty<R> extends Modifier<R> {
  const Penalty(super.maxAdjustment, super.reason);
}
