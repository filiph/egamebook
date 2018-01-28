library stranded.fight.defense_situation_interface;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/predeterminable_situation.dart';

/// All defense situations should extend [DefenseSituationInterface] (to
/// get the [attacker] and [target] and [predeterminedResult] fields and
/// to get the [getActorAtTime] and [getActors] methods).
@deprecated
abstract class DefenseSituationInterface extends Situation with Predeterminable {
  /// The attacker whose action this situation is hoping to prevent.
  int get attacker;

  @override
  int get maxActionsToShow => 1000;

  /// The defender.
  int get target;

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(target);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
