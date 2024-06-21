part of '../shadow_graph.dart';

class _ReportPair {
  final int index;

  final Report first;
  final Report second;
  const _ReportPair(this.index, this.first, this.second);

  bool get bothHaveObjects => first.object != null && second.object != null;

  bool get bothHaveSubjects => first.subject != null && second.subject != null;

  /// A role reversal. The object of the second report is the same entity
  /// as the subject of the first one. For example:
  ///
  ///     I stand up. The goblin hits me.
  bool get firstSubjectIsSecondObject =>
      first.subject != null &&
      second.object != null &&
      first.subject!.id == second.object!.id;

  bool get hasSameObject =>
      bothHaveObjects && first.object!.id == second.object!.id;

  bool get hasSameSubject =>
      bothHaveSubjects && first.subject!.id == second.subject!.id;

  /// Returns `true` if both [first] and [second] have either "is" verbs
  /// ("I am strong" and "I am powerful") or any other verb
  /// ("I stand up" and "I regain balance").
  ///
  /// You don't put the two types together in a single sentence.
  bool get hasSameVerbType =>
      // Either they are both "is" sentences
      first.string.contains(Storyline.VERB_BE) &&
          second.string.contains(Storyline.VERB_BE) ||
      // ... or neither of them has any "is" in it.
      (!first.string.contains(Storyline.VERB_BE) &&
          !second.string.contains(Storyline.VERB_BE) &&
          !first.string.contains(Storyline.VERB_BE_NOT) &&
          !second.string.contains(Storyline.VERB_BE_NOT));

  bool get positiveNegativeAreSame =>
      (first.positive && second.positive) ||
      (first.negative && second.negative);

  bool get positiveNegativeAreSwitched =>
      (first.positive && second.negative) ||
      (second.positive && first.negative);

  /// The opposite of [firstSubjectIsSecondObject].
  bool get secondSubjectIsFirstObject =>
      second.subject != null &&
      first.object != null &&
      second.subject!.id == first.object!.id;

  /// Returns `true` if both reports have a non-null subject, and they
  /// are enemies (via [Entity.team]).
  bool get subjectsAreEnemies {
    if (first.subject == null || second.subject == null) return false;
    return first.subject!.team.isEnemyWith(second.subject!.team);
  }

  static Iterable<_ReportPair> getPairs(List<Report> reports) sync* {
    for (int i = 0; i < reports.length - 1; i++) {
      yield _ReportPair(i, reports[i], reports[i + 1]);
    }
  }
}
