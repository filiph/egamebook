import 'package:edgehead/edgehead_lib.dart' show carelessCombineFunction;
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';

Iterable<Actor> mountainPassGuardPostMonsters(WorldState w) {
  var orc = new Actor((b) => b
    ..id = 2000
    ..name = "orc"
    ..nameIsProperNoun = false
    ..pronoun = Pronoun.HE
    ..currentWeapon = new Sword()
    ..hitpoints = 2
    ..maxHitpoints = 2
    ..team = defaultEnemyTeam
    ..combineFunction = carelessCombineFunction);

  var goblin = new Actor((b) => b
    ..id = 2001
    ..name = "goblin"
    ..nameIsProperNoun = false
    ..pronoun = Pronoun.HE
    ..currentWeapon = new Sword("scimitar")
    ..team = defaultEnemyTeam
    ..combineFunction = carelessCombineFunction);

  if (w.actionHasBeenPerformedSuccessfully("take_out_gate_guards") ||
      w.actionHasBeenPerformedSuccessfully("take_out_gate_guards_rescue")) {
    return [orc];
  } else {
    return [orc, goblin];
  }
}
