library stranded.fight.defense_situation_interface;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/predeterminable_situation.dart';

/// All defense situations should extend [DefenseSituation] (to
/// get the [attacker] and [target] and [predeterminedResult] fields and
/// to get the [getActorAtTime] and [getActors] methods).
abstract class DefenseSituation extends Situation
    with Predeterminable {
  /// The attacker whose action this situation is hoping to prevent.
  int get attacker;

  /// The defender.
  int get target;

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(target);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
