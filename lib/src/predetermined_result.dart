/// A defense situation can be predetermined to succeed or fail.
enum Predetermination {
  /// Actions should behave as normal.
  none,

  /// All actions have 100% chance of success.
  successGuaranteed,

  /// All actions have 0% chance of success.
  failureGuaranteed
}
