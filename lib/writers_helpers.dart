import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/edgehead_lib.dart' show carelessCombineFunction;
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/shield.dart';
import 'package:edgehead/fractal_stories/items/spear.dart';
import 'package:edgehead/fractal_stories/items/sword.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/unique_id.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/actions/take_exit.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

/// Mostly quotes that Briana says while roaming Bloodrock.
const _brianaQuotes = const [
  '''Briana spits on the floor. "Can't wait to see some actual architecture 
  when we get out of here."''',
  '''Somewhere in the distance, there are yells that rise in intensity, 
  then suddenly stop entirely.''',
  '''Briana turns to you with an intense whisper. 
  "You know, I _have_ a right to hate orcs." 
  
  "I didn't know people need to have a right to hate them, to be honest." 
  
  She observes you for a moment. "I'm glad we are in agreement."''',
  '''More yells from the distance.''',
  '''Briana stops and listens for a moment. "Aren, we're pushing our luck. 
  I'd hate to go all this way only to get 
  my head smashed in by some random orc patrol.''',
];

final Sword orcthorn = new Sword(
    name: "Orcthorn",
    nameIsProperNoun: true,
    slashingDamage: 2,
    thrustingDamage: 2);

final _uniqueId = new UniqueIdMaker();

FightSituation generateAgruthFight(WorldState w,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  var agruth = _generateAgruth(w);
  var agruthId = agruth.id;
  w.actors.add(agruth);
  return new FightSituation.initialized(
      party,
      [agruth],
      "{rock|cavern} floor",
      roomRoamingSituation,
      {
        1: (w, s) {
          var agruth = w.getActorById(agruthId);
          var sword = new Sword();
          agruth.report(s, "<subject> {drop<s>|let<s> go of} the whip");
          agruth.report(s, "<subject> draw<s> <subject's> <object>",
              object: sword);
          w.updateActorById(agruthId, (b) => b..currentWeapon = sword);
          agruth.report(
              s,
              "\"You're dead, slave,\" <subject> growl<s> at <object> "
              "with hatred.",
              object: getPlayer(w),
              wholeSentence: true);
        },
        5: (w, s) {
          var agruth = w.getActorById(agruthId);
          agruth.report(s, "<subject> spit<s> on the cavern floor");
        },
        9: (w, s) {
          var agruth = w.getActorById(agruthId);
          s.addParagraph();
          agruth.report(
              s,
              "\"I'll enjoy eating your flesh, human,\" "
              "<subject> snarl<s>.",
              wholeSentence: true);
          s.addParagraph();
        },
        12: (w, s) {
          var agruth = w.getActorById(agruthId);
          agruth.report(s, "<subject> grit<s> <subject's> teeth");
          agruth.report(s, "<subject> do<es>n't talk any more", but: true);
        },
        17: (w, s) {
          var agruth = w.getActorById(agruthId);
          agruth.report(s, "<subject> scowl<s> with pure hatred");
        }
      });
}

FightSituation generateEscapeTunnelFight(WorldState w,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  var monsters = [_makeOrc(), _makeGoblin()];
  w.actors.addAll(monsters);
  return new FightSituation.initialized(
      party, monsters, "{rock|cavern} floor", roomRoamingSituation, {});
}

FightSituation generateMadGuardianFight(WorldState w,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  var knowsAboutGuardian = w.actionHasBeenPerformed("talk_to_briana_3");
  var madGuardian = _generateMadGuardian(w, knowsAboutGuardian);
  var madGuardianId = madGuardian.id;
  w.actors.add(madGuardian);
  return new FightSituation.initialized(
      party,
      [madGuardian],
      "{rock|cavern} floor",
      roomRoamingSituation,
      {
        1: (w, s) {
          var guardian = w.getActorById(madGuardianId);
          guardian.report(
              s, "\"Good good good,\" <subject> whisper<s>, eyeing <object>.",
              object: getPlayer(w), wholeSentence: true);
        },
        9: (w, s) {
          var guardian = w.getActorById(madGuardianId);
          s.addParagraph();
          guardian.report(s, "\"Pain is good,\" <subject> chuckle<s>.",
              wholeSentence: true);
          s.addParagraph();
        },
      });
}

FightSituation generateMountainPassGuardPostFight(WorldState w,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  List<Actor> monsters;
  if (w.actionHasBeenPerformedSuccessfully("take_out_gate_guards") ||
      w.actionHasBeenPerformedSuccessfully("take_out_gate_guards_rescue")) {
    monsters = [_makeOrc()];
  } else {
    monsters = [_makeOrc(), _makeGoblin()];
  }
  w.actors.addAll(monsters);

  return new FightSituation.initialized(
      party, monsters, "ground", roomRoamingSituation, {});
}

FightSituation generateSlaveQuartersPassageFight(WorldState w,
    RoomRoamingSituation roomRoamingSituation, Iterable<Actor> party) {
  var monsters = [_makeOrc(), _makeGoblin(spear: true)];
  w.actors.addAll(monsters);
  return new FightSituation.initialized(
      party, monsters, "{rough|stone} floor", roomRoamingSituation, {});
}

EdgeheadGlobalState getGlobal(WorldState w) => w.global as EdgeheadGlobalState;

Actor getPlayer(WorldState w) => w.actors.singleWhere((a) => a.isPlayer);

RoomRoamingSituation getRoomRoaming(WorldState w) {
  return w
      .getSituationByName<RoomRoamingSituation>(RoomRoamingSituation.className);
}

void giveGoldToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..gold += amount);
}

void giveSpearToPlayer(WorldState w) =>
    w.updateActorById(getPlayer(w).id, (b) => b..items.add(new Spear()));

void giveStaminaToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..stamina += amount);
}

/// Returns `true` while player is roaming through Bloodrock. Note that the list
/// of rooms contains only those that are actual rooms (it excludes the likes
/// of `just_after_agruth_fight`, which is a helper room for naming Agruth's
/// sword).
bool isRoamingInBloodrock(WorldState w) {
  if ((w.currentSituation as RoomRoamingSituation).monstersAlive) return false;
  const bloodrockRoamingRooms = const [
    "cave_with_agruth",
    "guardpost_above_church",
    "orcthorn_room",
    "slave_quarters_passage",
    "smelter",
    "underground_church",
    "war_forge",
  ];
  return bloodrockRoamingRooms
      .contains((w.currentSituation as RoomRoamingSituation).currentRoomName);
}

/// Checks whether player was just now at [roomName].
bool justCameFrom(WorldState w, String roomName) {
  var player = getPlayer(w);
  for (final rec in w.actionRecords) {
    if (rec.protagonist != player.id) continue;
    if (rec.actionName != TakeExitAction.className) continue;
    if (rec.dataString == roomName) return true;
    return false;
  }
  return false;
}

void movePlayer(WorldState w, Storyline s, String locationName) {
  getRoomRoaming(w).moveActor(w, getPlayer(w), locationName, s);
}

void nameAgruthSword(WorldState w, String name) {
  // Assume only one sword wielded by either Aren or Briana.
  for (var actor in w.actors.where((a) => a.team == playerTeam)) {
    if (!actor.isBarehanded) {
      var sword = actor.currentWeapon as Sword;
      var named = new Sword.from(sword, name: name, nameIsProperNoun: true);
      w.updateActorById(actor.id, (b) => b..currentWeapon = named);
      break;
    }
  }
}

void removeSpearFromPlayer(WorldState w) {
  final player = getPlayer(w);
  final spear =
      player.items.firstWhere((item) => item.types.contains(ItemType.spear));
  w.updateActorById(getPlayer(w).id, (b) => b..items.remove(spear));
}

void rollBrianaQuote(WorldState w, Storyline s) {
  int index = (w.global as EdgeheadGlobalState).brianaQuoteIndex;
  if (index >= _brianaQuotes.length) return;
  final current = _brianaQuotes[index];
  s.add(current, wholeSentence: true);
  updateGlobal(w, (b) => b..brianaQuoteIndex += 1);
}

/// Updates state according to whatever happened when Aren tried to steal
/// the shield from the sleeping guard. If he was successful, there will be
/// no fight, otherwise, there will be fight.
void setUpStealShield(Actor a, WorldState w, Storyline s, bool wasSuccess) {
  w.updateActorById(a.id, (b) => b..currentShield = new Shield());
  if (!wasSuccess) {
    s.add("TODO: create fight");
  }
}

void takeOrcthorn(WorldState w, Actor a) {
  w.updateActorById(a.id, (b) {
    if (!a.isBarehanded) {
      b.items.add(a.currentWeapon);
    }
    b.currentWeapon = orcthorn;
  });
}

void updateGlobal(WorldState w,
    EdgeheadGlobalStateBuilder updates(EdgeheadGlobalStateBuilder b)) {
  var builder = (w.global as EdgeheadGlobalState).toBuilder();
  w.global = updates(builder).build();
}

Actor _generateAgruth(WorldState w) {
  return new Actor.initialized(6666, "Agruth",
      nameIsProperNoun: true,
      pronoun: Pronoun.HE,
      hitpoints: 2,
      maxHitpoints: 2,
      team: defaultEnemyTeam,
      initiative: 100);
}

Actor _generateMadGuardian(WorldState w, bool playerKnowsAboutGuardian) {
  return new Actor.initialized(
      6667, playerKnowsAboutGuardian ? "guardian" : "orc",
      pronoun: Pronoun.HE,
      currentWeapon: new Sword(name: "rusty sword"),
      hitpoints: 3,
      maxHitpoints: 3,
      team: defaultEnemyTeam,
      initiative: 100);
}

Actor _makeGoblin({bool spear: false}) =>
    new Actor.initialized(_uniqueId.generateNext(), "goblin",
        nameIsProperNoun: false,
        pronoun: Pronoun.HE,
        currentWeapon: spear ? new Spear() : new Sword(name: "scimitar"),
        team: defaultEnemyTeam,
        combineFunction: carelessCombineFunction);

Actor _makeOrc() => new Actor.initialized(_uniqueId.generateNext(), "orc",
    nameIsProperNoun: false,
    pronoun: Pronoun.HE,
    currentWeapon: new Sword(),
    hitpoints: 2,
    maxHitpoints: 2,
    team: defaultEnemyTeam,
    combineFunction: carelessCombineFunction);
