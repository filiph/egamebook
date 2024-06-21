part of '../shadow_graph.dart';

enum SentenceConjunction {
  /// Just straight nothing (after a [SentenceJoinType.period], for example).
  nothing,

  /// "And" or "and".
  and,

  /// A "but" in a sentence, like "The goblin tries to pick up the sword
  /// but falls to the ground instead."
  but,
}

/// Different ways to join _this_ sentence to the previous one.
enum SentenceJoinType {
  /// Nothing. The previous sentence may already end with something,
  /// or maybe this is the first sentence in a paragraph.
  ///
  /// In combination with [SentenceConjunction.but] or
  /// [SentenceConjunction.and], this becomes "But" or "And".
  none,

  /// Just plain period.
  ///
  /// In combination with [SentenceConjunction.but] or
  /// [SentenceConjunction.and], this becomes ". But" or ". And".
  ///
  /// This is the default starting point.
  period,

  /// Comma, as in "The goblin picks up the sword, runs it through me."
  ///
  /// In combination with [SentenceConjunction.but] or
  /// [SentenceConjunction.and], this becomes "but" or "and".
  comma,
}

extension JoinerSetHelper on Set<SentenceJoinType> {
  bool get hasPeriodOrNone =>
      contains(SentenceJoinType.period) || contains(SentenceJoinType.none);

  bool get hasComma => contains(SentenceJoinType.comma);
}
