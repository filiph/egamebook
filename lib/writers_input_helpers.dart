import 'dart:math';
import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/edgehead_lib.dart' show carelessCombineFunction;
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

EdgeheadGlobalState getGlobal(WorldState w) => w.global as EdgeheadGlobalState;

Actor getPlayer(WorldState w) => w.actors.singleWhere((a) => a.isPlayer);

RoomRoamingSituation getRoomRoaming(WorldState w) {
  return w.getSituationByName<RoomRoamingSituation>("RoomRoamingSituation");
}

final _rand = new Random();

int _makeUniqueId() => 1000 + _rand.nextInt(99999);

Actor _makeOrc() => new Actor.initialized(_makeUniqueId(), "orc",
    nameIsProperNoun: false,
    pronoun: Pronoun.HE,
    currentWeapon: new Sword(),
    hitpoints: 2,
    maxHitpoints: 2,
    team: defaultEnemyTeam,
    combineFunction: carelessCombineFunction);

Actor _makeGoblin() => new Actor.initialized(_makeUniqueId(), "goblin",
    nameIsProperNoun: false,
    pronoun: Pronoun.HE,
    currentWeapon: new Sword("scimitar"),
    team: defaultEnemyTeam,
    combineFunction: carelessCombineFunction);

Iterable<Actor> escapeTunnelMonsters(WorldState w) {
  return [_makeOrc(), _makeGoblin()];
}

Iterable<Actor> mountainPassGuardPostMonsters(WorldState w) {
  if (w.actionHasBeenPerformedSuccessfully("take_out_gate_guards") ||
      w.actionHasBeenPerformedSuccessfully("take_out_gate_guards_rescue")) {
    return [_makeOrc()];
  } else {
    return [_makeOrc(), _makeGoblin()];
  }
}

void movePlayer(WorldState w, Storyline s, String locationName) {
  getRoomRoaming(w).moveActor(w, getPlayer(w), locationName, s);
}

void giveGoldToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..gold += amount);
}

void giveStaminaToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..stamina += amount);
}

void updateGlobal(WorldState w,
    EdgeheadGlobalStateBuilder updates(EdgeheadGlobalStateBuilder b)) {
  var builder = (w.global as EdgeheadGlobalState).toBuilder();
  w.global = updates(builder).build();
}
