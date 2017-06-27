import 'dart:math';

import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/edgehead_lib.dart' show carelessCombineFunction;
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

final _rand = new Random();

Iterable<Actor> escapeTunnelMonsters(WorldState w) {
  return [_makeOrc(), _makeGoblin()];
}

Iterable<Actor> generateArguth(WorldState w) {
  // TODO: give him sword in hand or not, according to player's first choice
  // TODO: name the orc "Arguth" (storyline should alternate between "the orc"
  //       and "Arguth"
  return [
    new Actor.initialized(_makeUniqueId(), "Arguth",
        nameIsProperNoun: true,
        pronoun: Pronoun.HE,
        currentWeapon: new Sword('scimitar'),
        hitpoints: 2,
        maxHitpoints: 2,
        team: defaultEnemyTeam,
        initiative: 100,
        combineFunction: carelessCombineFunction)
  ];
}

EdgeheadGlobalState getGlobal(WorldState w) => w.global as EdgeheadGlobalState;

Actor getPlayer(WorldState w) => w.actors.singleWhere((a) => a.isPlayer);

RoomRoamingSituation getRoomRoaming(WorldState w) {
  return w.getSituationByName<RoomRoamingSituation>("RoomRoamingSituation");
}

void giveGoldToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..gold += amount);
}

void giveStaminaToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..stamina += amount);
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

void updateGlobal(WorldState w,
    EdgeheadGlobalStateBuilder updates(EdgeheadGlobalStateBuilder b)) {
  var builder = (w.global as EdgeheadGlobalState).toBuilder();
  w.global = updates(builder).build();
}

Actor _makeGoblin() => new Actor.initialized(_makeUniqueId(), "goblin",
    nameIsProperNoun: false,
    pronoun: Pronoun.HE,
    currentWeapon: new Sword("scimitar"),
    team: defaultEnemyTeam,
    combineFunction: carelessCombineFunction);

Actor _makeOrc() => new Actor.initialized(_makeUniqueId(), "orc",
    nameIsProperNoun: false,
    pronoun: Pronoun.HE,
    currentWeapon: new Sword(),
    hitpoints: 2,
    maxHitpoints: 2,
    team: defaultEnemyTeam,
    combineFunction: carelessCombineFunction);

int _makeUniqueId() => 1000 + _rand.nextInt(99999);
