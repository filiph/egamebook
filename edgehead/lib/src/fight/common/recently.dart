// @dart=2.9

import 'package:edgehead/fractal_stories/actor.dart';

/// The definition of "recently" differs between player and all other
/// actors. When [a] is a player, the recency is almost immediate.
/// Everyone else takes a lot more time to recover.
///
/// This is so that the player can immediately react to situations created
/// by the AI, while she is free to exploit situations that she created.
///
/// We're using higher numbers here because it's safer. Sometimes, an action
/// by another actor is silent, so with a small number we would still get
/// 'you sweep his legs, he stands up'.
Duration getRecently(Actor a) =>
    a.isPlayer ? const Duration(milliseconds: 100) : const Duration(seconds: 1);
