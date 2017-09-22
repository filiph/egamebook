import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/edgehead_lib.dart'
    show brianaId, carelessCombineFunction, playerId;
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

final _goblinsSpear = new Spear();

final _uniqueId = new UniqueIdMaker();

void enterTunnelWithCancel(WorldState w, Storyline s) {
  bool hasOrcthorn = w.actionHasBeenPerformedSuccessfully("take_orcthorn");
  bool destroyedIronMonster =
      w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
  bool hasHadChanceToCancel = w.actionHasBeenPerformedSuccessfully(
      "guardpost_above_church_enter_tunnel_with_cancel");

  if (hasOrcthorn || destroyedIronMonster || hasHadChanceToCancel) {
    movePlayer(w, s, "tunnel");
    return;
  }

  movePlayer(w, s, "tunnel_cancel_chance");
}

void describeSuccessRate(WorldState w, Storyline s) {
  s.add("<p class='meta'>", wholeSentence: true);
  s.add("Thanks for playing _Insignificant Little Vermin._",
      wholeSentence: true);

  bool hasOrcthorn = w.actionHasBeenPerformedSuccessfully("take_orcthorn");
  bool destroyed = w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
  final player = getPlayer(w);

  player.report(
      s, "<subject> ${hasOrcthorn ? 'took' : 'didn\'t find'} Orcthorn");
  player.report(
      s,
      "<subject> ${destroyed ? 'destroyed' : 'didn\'t destroy'} "
      "the iron monster",
      but: hasOrcthorn != destroyed);

  String getItemDescription(ItemType type, String name) {
    final count = player.countItems(type);
    return count > 1 ? '${name}s' : count == 1 ? 'a $name' : 'no $name';
  }

  // You're leaving Mount Bloodrock with swords, a scimitar and a shield.
  final sword = getItemDescription(ItemType.sword, 'sword');
  final spear = getItemDescription(ItemType.spear, 'spear');
  final shield = getItemDescription(ItemType.shield, 'shield');
  player.report(s,
      "<subject> <is> leaving Mount Bloodrock with $sword, $spear and $shield.",
      wholeSentence: true);

  // You are in good health and with energy to spare.
  final health = player.hitpoints >= 2 ? 'in good health' : 'seriously injured';
  final stamina = player.stamina > 0 ? 'with energy to spare' : 'exhausted';
  player.report(s, "<subject> <is> $health and $stamina.", wholeSentence: true);

  // Briana is not in good health.
  final briana = w.getActorById(brianaId);
  final brianaHealth = briana.hitpoints >= 2 ? 'uninjured' : 'badly wounded';
  briana.report(s, "<subject> <is> $brianaHealth");

  s.add("The important thing, though, is that you survived. Congratulations!",
      wholeSentence: true);

  s.add("</p>", wholeSentence: true);
}

void executeSpearThrowAtOgre(WorldState w, Storyline s) {
  final player = getPlayer(w);
  final spear =
      player.items.firstWhere((item) => item.types.contains(ItemType.spear));
  w.updateActorById(getPlayer(w).id, (b) => b..items.remove(spear));
  movePlayer(w, s, "war_forge", silent: true);
}

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
  var orc = _makeOrc();
  var goblin = _makeGoblin();
  final orcId = orc.id;
  final goblinId = goblin.id;

  Actor getOrc(WorldState w) => w.getActorById(orcId);
  Actor getGoblin(WorldState w) => w.getActorById(goblinId);
  bool bothAreAlive(Actor orc, Actor goblin) {
    return orc.isAliveAndActive && goblin.isAliveAndActive;
  }

  var monsters = [orc, goblin];
  w.actors.addAll(monsters);
  return new FightSituation.initialized(
      party, monsters, "{rock|cavern} floor", roomRoamingSituation, {
    1: (w, s) {
      final orc = getOrc(w);
      final goblin = getGoblin(w);
      final player = getPlayer(w);
      if (bothAreAlive(orc, goblin)) {
        final actor = orc.isConfused ? goblin : orc;
        final otherActor = actor == orc ? goblin : orc;
        actor.report(
            s,
            "\"Look, Sgarr,\" <subject> say<s>. \"Look at them. "
            "Give a puny slave some steel and suddenly they think "
            "they're mighty slayers.\"",
            wholeSentence: true);
        otherActor.report(s, "<subject> laugh<s>");
        if (player.currentWeapon.name == orcthorn.name) {
          otherActor.report(s, "<subject> stop<s> almost instantly", but: true);
          otherActor.report(s, "<subject> see<s> <object> in your hand.",
              object: player.currentWeapon, wholeSentence: true);
        }
      } else {
        final actor = orc.isAliveAndActive ? orc : goblin;
        assert(actor.isAliveAndActive);
        actor.report(
            s,
            "\"Look at you,\" <subject> laugh<s>. "
            "\"Give a puny slave some steel and suddenly you think "
            "you're mighty slayers.\"",
            wholeSentence: true);
        if (player.currentWeapon.name == orcthorn.name) {
          actor.report(
              s,
              "But then <subject> see<s> <object> in your hand "
              "and his face hardens.",
              object: player.currentWeapon,
              but: true,
              wholeSentence: true);
        }
      }
    },
    4: (w, s) {
      final orc = getOrc(w);
      final goblin = getGoblin(w);
      final actor = orc.isAliveAndActive ? orc : goblin;
      final player = getPlayer(w);
      assert(actor.isAliveAndActive);
      assert(player.isAliveAndActive);
      final kicking = actor.isBarehanded ||
          (player.isBarehanded && player.currentShield == null);
      var assaultVerbing = kicking ? 'kicking' : 'slashing';
      var sounds = kicking
          ? ['Whoosh!', 'Swah!', 'Slam!']
          : ['Swish!', 'Whoosh!', 'Thunk!'];
      actor.report(
          s,
          "<subject> start<s> wildly $assaultVerbing "
          "in your direction",
          positive: true);
      s.add(
          "\"Insignificant...\" ${sounds[0]} "
          "\"... little ...\" ${sounds[1]} "
          "\"... vermin!\" ${sounds[2]}",
          wholeSentence: true);
      var target = kicking
          ? ('knee')
          : (player.currentShield != null
              ? 'shield'
              : player.currentWeapon.name);
      s.add(
          "That last blow hits your $target hard"
          "${player.isOnGround ?
            '' :
            ' and sends you a couple of steps back'}.",
          wholeSentence: true);
      final eyes = new Entity(name: "eyes", pronoun: Pronoun.THEY);
      s.add("<owner's> <subject> glint<s> with intensity",
          owner: actor, subject: eyes);
    },
    6: (w, s) {
      s.add(
          "From behind, you hear loud cries. Your pursuers must have reached "
          "the top of the stairs.",
          wholeSentence: true);
    },
    9: (w, s) {
      s.add(
          "Ear-splitting shouts come from behind. You wheel around and see "
          "a body of orcs and goblins approaching at top speed, their "
          "swords and spears at the ready.",
          wholeSentence: true);
    },
    12: (w, s) {
      s.add("The orcs are goblins are halfway here.", wholeSentence: true);
    },
    16: (w, s) {
      s.add(
          "Your pursuers reach you from behind and a sword pierces your chest "
          "with formidable power.",
          wholeSentence: true);
      w.updateActorById(getPlayer(w).id, (b) => b..hitpoints = 0);
      w.popSituationsUntil(RoomRoamingSituation.className);
      w.popSituation();
    }
  });
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
        3: (w, s) {
          var guardian = w.getActorById(madGuardianId);
          var briana = w.getActorById(brianaId);
          s.addParagraph();
          guardian.report(s, "\"Pain is good,\" <subject> chuckle<s>.",
              wholeSentence: true);
          s.addParagraph();
          if (briana.isAliveAndActive) {
            briana.report(s, "<subject> glare<s> at him");
            briana.report(s, "\"Shut up and die.\"", wholeSentence: true);
            s.addParagraph();
          }
        },
        5: (w, s) {
          var guardian = w.getActorById(madGuardianId);
          var player = getPlayer(w);
          s.addParagraph();
          guardian.report(
              s,
              "\"You'll make a nice addition to my collection,\" "
              "<subject> say<s>, laughing.",
              wholeSentence: true);
          guardian.report(
              s, "<subject> nod<s> towards a heap of rotting bodies nearby");
          s.addParagraph();
          player.report(
              s, "<subject> glance<s> over at Briana, then back at the orc.",
              wholeSentence: true);
          player.report(s, "_\"You had better shut up, and die.\"_",
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
  var orc = _makeOrc();
  var goblin = _makeGoblin(spear: true);
  final orcId = orc.id;
  final goblinId = goblin.id;

  Actor getOrc(WorldState w) => w.getActorById(orcId);
  Actor getGoblin(WorldState w) => w.getActorById(goblinId);
  bool bothAreAlive(Actor orc, Actor goblin) {
    return orc.isAliveAndActive && goblin.isAliveAndActive;
  }

  var monsters = [orc, goblin];
  w.actors.addAll(monsters);
  return new FightSituation.initialized(
      party, monsters, "{rough|stone} floor", roomRoamingSituation, {
    1: (w, s) {
      final orc = getOrc(w);
      final goblin = getGoblin(w);
      if (!goblin.isAlive) {
        orc.report(s, "<subject> look<s> at <object's> body", object: goblin);
        orc.report(s, "\"You'll pay for this, vermin,\" <subject> snarl<s>.",
            wholeSentence: true);
        return;
      }
      if (bothAreAlive(orc, goblin)) {
        orc.report(s, "<subject> look<s> at <object>", object: goblin);
        orc.report(
            s, "\"Now that is practice,\" <subject> say<s> to <objectPronoun>.",
            object: goblin, wholeSentence: true);
      }
    },
    3: (w, s) {
      final orc = getOrc(w);
      final goblin = getGoblin(w);
      final actor = orc.isAliveAndActive ? orc : goblin;
      actor.report(
          s,
          "\"You don't understand,\" <subject> growl<s>. "
          "\"No matter how many of us you kill, there will be more. "
          "And when we get you, we will eat your face alive.\"",
          wholeSentence: true);
      actor.report(s, "<subject> smirk<s>");
      actor.report(s, "\"You mean nothing.\"", wholeSentence: true);
    }
  });
}

EdgeheadGlobalState getGlobal(WorldState w) => w.global as EdgeheadGlobalState;

Actor getPlayer(WorldState w) => w.getActorById(playerId);

RoomRoamingSituation getRoomRoaming(WorldState w) {
  return w
      .getSituationByName<RoomRoamingSituation>(RoomRoamingSituation.className);
}

void giveGoblinsSpearToPlayer(WorldState w) =>
    w.updateActorById(getPlayer(w).id, (b) => b..items.add(_goblinsSpear));

void giveGoldToPlayer(WorldState w, int amount) {
  w.updateActorById(getPlayer(w).id, (b) => b..gold += amount);
}

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

void movePlayer(WorldState w, Storyline s, String locationName,
    {bool silent: false}) {
  getRoomRoaming(w).moveActor(w, getPlayer(w), locationName, s, silent: silent);
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

bool playerHasVisited(WorldState w, String roomName) =>
    getRoomRoaming(w).hasBeenVisited(w, getPlayer(w), roomName);

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
    final playerParty = w.actors.where((a) => a.team == playerTeam);
    final goblin = _makeGoblin();
    final goblinId = goblin.id;
    w.actors.add(goblin);
    final roomRoamingSituation = getRoomRoaming(w);
    w.pushSituation(new FightSituation.initialized(
        playerParty,
        [goblin],
        "{smooth|} rock",
        roomRoamingSituation,
        {
          1: (w, s) {
            final goblin = w.getActorById(goblinId);
            final player = getPlayer(w);
            final tookSpear = w.actionHasBeenPerformedSuccessfully(
                "take_spear_in_underground_church");
            if (tookSpear) {
              goblin.report(s, "<subject> look<s> at <object-owner's> <object>",
                  objectOwner: player, object: _goblinsSpear);
              goblin.report(s, "\"Thief,\" <subject> hiss<es>.",
                  wholeSentence: true);
            }
          }
        }));
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

Actor _makeOrc({int hitpoints: 2}) =>
    new Actor.initialized(_uniqueId.generateNext(), "orc",
        nameIsProperNoun: false,
        pronoun: Pronoun.HE,
        currentWeapon: new Sword(),
        hitpoints: hitpoints,
        maxHitpoints: hitpoints,
        team: defaultEnemyTeam,
        combineFunction: carelessCombineFunction);
