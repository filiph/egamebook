part of storyline.shadow_graph;

/// Different ways to join _this_ sentence to the previous one.
enum SentenceJoinType {
  /// Nothing. The previous sentence may already end with something,
  /// or maybe this is the first sentence in a paragraph.
  none,

  /// Just plain period, without any "But" or "And".
  period,

  /// Comma, as in "The goblin picks up the sword, runs it through me."
  comma,

  /// A period followed by an "And".
  periodAnd,

  /// A period followed by a "But".
  periodBut,

  /// A new sentence starting with "And". The previous sentence either
  /// doesn't exist, or it took care of its own ending (e.g. it's a whole
  /// sentence ending with an exclamation mark).
  noneAnd,

  /// A new sentence starting with "But". The previous sentence either
  /// doesn't exist, or it took care of its own ending (e.g. it's a whole
  /// sentence ending with an exclamation mark).
  noneBut,

  /// A simple "and" in a sentence, such as "The goblin picks up the sword
  /// and runs it through me."
  and,

  /// A "but" in a sentence, like "The goblin tries to pick up the sword
  /// but falls to the ground instead."
  but,
}

extension JoinerSetHelper on Set<SentenceJoinType> {
  bool get hasPeriodOrNone =>
      contains(SentenceJoinType.period) || contains(SentenceJoinType.none);

  bool get hasAndOrBut =>
      contains(SentenceJoinType.and) || contains(SentenceJoinType.but);
}
