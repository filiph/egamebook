import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:meta/meta.dart';

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
  targetWithoutShield,

  // TODO: weaponDexterity /// Lightness of weapon
  // TODO: reach /// Advantage of longer limbs and longer weapons
  // TODO: strength /// Brute force (e.g. withstanding a kick, still standing)
}

@immutable
class Bonus<R> {
  final int maxAdjustment;
  final R reason;

  const Bonus(this.maxAdjustment, this.reason);
}

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
/// [bonuses] is the list of adjustments to the [base] success chance.
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
    Actor target, double base, List<Bonus<CombatReason>> bonuses) {
  assert(base > 0.0, "For sureFailures, use ReasonedSuccessChance.sureFailure");
  assert(
      base < 1.0, "For sureSuccesses, use ReasonedSuccessChance.sureSuccess");

  double value = base;
  final successReasons = new List<Reason<CombatReason>>();
  final failureReasons = new List<Reason<CombatReason>>();

  for (final bonus in bonuses) {
    assert(bonus.maxAdjustment > 0,
        "There is no reason to have bonuses with maxAdjustment of 0 or below.");
    final scale = _getAdjustmentScale(performer, target, bonus.reason);
    assert(scale >= -1.0);
    assert(scale <= 1.0);
    if (scale == 0.0) continue;

    final previous = value;
    final adjustment = bonus.maxAdjustment * scale;
    value = _lerp(value, adjustment.round());
    final difference = (value - previous).abs();
    final reason = new Reason<CombatReason>(bonus.reason, difference);

    if (scale > 0) {
      successReasons.add(reason);
    } else {
      failureReasons.add(reason);
    }
  }

  return new ReasonedSuccessChance<CombatReason>(value,
      successReasons: successReasons, failureReasons: failureReasons);
}

double _getAdjustmentScale(Actor performer, Actor target, CombatReason reason) {
  switch (reason) {
    case CombatReason.dexterity:
      return (performer.dexterity - target.dexterity).clamp(-100, 100) / 100;
    case CombatReason.balance:
      if (performer.isOffBalance && !target.isOffBalance) {
        return -1.0;
      } else if (!performer.isOffBalance && target.isOffBalance) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw new StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.height:
      if (performer.isOnGround && !target.isOnGround) {
        return -1.0;
      } else if (!performer.isOnGround && target.isOnGround) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw new StateError("Forgotten logic branch"); // ignore: dead_code
    case CombatReason.targetWithoutShield:
      if (target.currentShield == null) {
        return 1.0;
      } else {
        return 0.0;
      }
      throw new StateError("Forgotten logic branch"); // ignore: dead_code
  }

  throw new ArgumentError("no rule for $reason");
}

double _lerp(double current, int bonus) {
  if (bonus >= 100) return 1.0;
  if (bonus <= -100) return 0.0;

  final distance = bonus.isNegative ? current : 1.0 - current;
  final portion = bonus / 100;
  return current + portion * distance;
}
