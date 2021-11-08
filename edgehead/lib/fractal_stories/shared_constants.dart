/// Constants that we need to access from outside `fractal_stories`.
/// For example, [endOfRoamName] needs to be accessed from the file watcher
/// _before_ some of the `fractal_stories` files is even generated.

// @dart=2.9

library stranded.shared_constants;

/// Magic name of a room that marks the end of a roam situation.
const String endOfRoamName = "__END_OF_ROAM__";
