import 'package:meta/meta.dart';

/// Scores a given [WorldState] according to [Actor]. The different fields
/// measure the different dimensions to look at the world.
@immutable
class ActorScore {
  /// How safe this outcome is to the actor.
  ///
  /// Also includes things like personal possession (a world in which actor
  /// has 10 coins is scored better than one in which they have 5 coins).
  final num selfPreservation;

  /// How safe this outcome is to the actor's team.
  final num teamPreservation;

  /// How healthy and generally well-off the enemy is. The higher the number,
  /// the worse this is for the Actor.
  final num enemy;

  /// How interesting the happenings have been lately. This is not subjective
  /// to the actor, but a more objective score.
  ///
  /// This goes up when there had been a lot of _different_ and _aggressive_
  /// actions.
  ///
  /// The variety is here to combat the
  /// [horizon effect](https://en.wikipedia.org/wiki/Horizon_effect).
  /// We can't solve this problem, but we can make it less significant
  /// by weighing active actions higher than inactive ones. This doesn't make
  /// the AI smarter, but it does make it less likely to "create diversions
  /// which ineffectively delay an unavoidable consequence".
  final num varietyOfAction;

  const ActorScore(this.selfPreservation, this.teamPreservation, this.enemy,
      this.varietyOfAction);

  ActorScoreChange operator -(ActorScore other) => ActorScoreChange(
      selfPreservation - other.selfPreservation,
      teamPreservation - other.teamPreservation,
      enemy - other.enemy,
      varietyOfAction - other.varietyOfAction);

  @override
  String toString() => "ActorScore<"
      "self=${selfPreservation.toStringAsFixed(2)},"
      "team=${teamPreservation.toStringAsFixed(2)},"
      "enemy=${enemy.toStringAsFixed(2)},"
      "variety=${varietyOfAction.toStringAsFixed(2)}>";
}

@immutable
class ActorScoreChange {
  /// How much safer an outcome is to the actor relative to another outcome.
  final num selfPreservation;

  /// How much safer this outcome is to the actor's team relative to another
  /// outcome.
  final num teamPreservation;

  /// How better-off the enemy is relative to another outcome.
  final num enemy;

  /// How much more interesting the history of this world is relative
  /// to another outcome. Look at [Actor.scoreWorld] to see how this gets
  /// computed.
  final num varietyOfAction;

  const ActorScoreChange(this.selfPreservation, this.teamPreservation,
      this.enemy, this.varietyOfAction);

  factory ActorScoreChange.average(Iterable<ActorScoreChange> changes) {
    int count = 0;
    num self = 0;
    num team = 0;
    num enemy = 0;
    num varietyOfAction = 0;
    for (final change in changes) {
      count += 1;
      self += change.selfPreservation;
      team += change.teamPreservation;
      enemy += change.enemy;
      varietyOfAction += change.varietyOfAction;
    }
    if (count == 0) {
      throw ArgumentError("Cannot average empty iterable");
    }
    return ActorScoreChange(
        self / count, team / count, enemy / count, varietyOfAction / count);
  }

  /// Action outcome cannot be computed at all.
  const ActorScoreChange.undefined()
      : this(double.negativeInfinity, double.negativeInfinity,
            double.negativeInfinity, double.negativeInfinity);

  /// Outcome has zero effect on the world from the scoring actor's perspective.
  const ActorScoreChange.zero() : this(0, 0, 0, 0);

  /// Action outcome could not be computed at all.
  bool get isUndefined =>
      selfPreservation == double.negativeInfinity &&
      teamPreservation == double.negativeInfinity &&
      enemy == double.negativeInfinity &&
      varietyOfAction == double.negativeInfinity;

  /// Returns a score change multiplied by a scalar value.
  ActorScoreChange operator *(num value) => ActorScoreChange(
      selfPreservation * value,
      teamPreservation * value,
      enemy * value,
      varietyOfAction * value);

  /// Returns the addition of two actor score changes.
  ActorScoreChange operator +(ActorScoreChange other) => ActorScoreChange(
      selfPreservation + other.selfPreservation,
      teamPreservation + other.teamPreservation,
      enemy + other.enemy,
      varietyOfAction + other.varietyOfAction);

  /// Returns a score change divided by a scalar value.
  ActorScoreChange operator /(num value) => ActorScoreChange(
      selfPreservation / value,
      teamPreservation / value,
      enemy / value,
      varietyOfAction / value);

  @override
  String toString() => "ActorScoreChange<"
      "self=${selfPreservation.toStringAsFixed(2)},"
      "team=${teamPreservation.toStringAsFixed(2)},"
      "enemy=${enemy.toStringAsFixed(2)},"
      "varietyOfAction=${varietyOfAction.toStringAsFixed(2)}>";
}
