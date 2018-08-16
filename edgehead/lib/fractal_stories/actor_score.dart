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

  const ActorScore(this.selfPreservation, this.teamPreservation, this.enemy);

  ActorScoreChange operator -(ActorScore other) => new ActorScoreChange(
      selfPreservation - other.selfPreservation,
      teamPreservation - other.teamPreservation,
      enemy - other.enemy);

  @override
  String toString() => "ActorScore<"
      "self=${selfPreservation.toStringAsFixed(2)},"
      "team=${teamPreservation.toStringAsFixed(2)},"
      "enemy=${enemy.toStringAsFixed(2)}>";
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

  const ActorScoreChange(
      this.selfPreservation, this.teamPreservation, this.enemy);

  factory ActorScoreChange.average(Iterable<ActorScoreChange> changes) {
    int count = 0;
    num self = 0;
    num team = 0;
    num enemy = 0;
    for (var change in changes) {
      count += 1;
      self += change.selfPreservation;
      team += change.teamPreservation;
      enemy += change.enemy;
    }
    if (count == 0) {
      throw new ArgumentError("Cannot average empty iterable");
    }
    return new ActorScoreChange(self / count, team / count, enemy / count);
  }

  /// Action outcome cannot be computed at all.
  const ActorScoreChange.undefined()
      : this(double.negativeInfinity, double.negativeInfinity,
            double.negativeInfinity);

  /// Outcome has zero effect on the world from the scoring actor's perspective.
  const ActorScoreChange.zero() : this(0, 0, 0);

  /// Action outcome could not be computed at all.
  bool get isUndefined =>
      selfPreservation == double.negativeInfinity &&
      teamPreservation == double.negativeInfinity &&
      enemy == double.negativeInfinity;

  /// A simple combination of different scores, for AI.
  num get simpleCombination => selfPreservation + teamPreservation - enemy;

  /// Returns a score change multiplied by a scalar value.
  ActorScoreChange operator *(num value) => new ActorScoreChange(
      selfPreservation * value, teamPreservation * value, enemy * value);

  /// Returns the addition of two actor score changes.
  ActorScoreChange operator +(ActorScoreChange other) => new ActorScoreChange(
      selfPreservation + other.selfPreservation,
      teamPreservation + other.teamPreservation,
      enemy + other.enemy);

  /// Returns a score change divided by a scalar value.
  ActorScoreChange operator /(num value) => new ActorScoreChange(
      selfPreservation / value, teamPreservation / value, enemy / value);

  @override
  String toString() => "ActorScoreChange<"
      "self=${selfPreservation.toStringAsFixed(2)},"
      "team=${teamPreservation.toStringAsFixed(2)},"
      "enemy=${enemy.toStringAsFixed(2)}>";
}
