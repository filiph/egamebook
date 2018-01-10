import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:edgehead/writers_helpers.dart';
import 'package:edgehead/writers_input.dart';

const String carelessMonsterCombineFunctionHandle = "carelessMonster";

const String normalCombineFunctionHandle = "normal";

/// [edgeheadPlayer]'s [Actor.id].
const int playerId = 1;

final Actor edgeheadBriana = new Actor.initialized(brianaId, "Briana",
    nameIsProperNoun: true,
    pronoun: Pronoun.SHE,
    hitpoints: 2,
    maxHitpoints: 2,
    currentRoomName: _preStartBook.name,
    followingActorId: playerId);

final Situation edgeheadInitialSituation =
    new RoomRoamingSituation.initialized(_preStartBook, false);

final Actor edgeheadPlayer = new Actor.initialized(playerId, "Aren",
    nameIsProperNoun: true,
    isPlayer: true,
    pronoun: Pronoun.YOU,
    hitpoints: 2,
    maxHitpoints: 2,
    stamina: 1,
    initiative: 1000,
    currentRoomName: _preStartBook.name);

final Simulation edgeheadSimulation =
    new Simulation(_rooms, _events, _combineFunctions);

final Map<String, CombineFunction> _combineFunctions = {
  normalCombineFunctionHandle: normalCombineFunction,
  carelessMonsterCombineFunctionHandle: carelessMonsterCombineFunction,
};

final Map<String, EventCallback> _events = {
  "youre_dead_slave": (sim, w, s) {
    var agruth = w.getActorById(agruthId);
    var sword = new Weapon(WeaponType.sword);
    agruth.report(s, "<subject> {drop<s>|let<s> go of} the whip");
    agruth.report(s, "<subject> draw<s> <subject's> <object>", object: sword);
    w.updateActorById(agruthId, (b) => b..currentWeapon = sword.toBuilder());
    agruth.report(
        s,
        "\"You're dead, slave,\" <subject> growl<s> at <object> "
        "with hatred.",
        object: getPlayer(w.build()),
        wholeSentence: true);
  },
  "agruth_spits": (sim, w, s) {
    var agruth = w.getActorById(agruthId);
    agruth.report(s, "<subject> spit<s> on the cavern floor");
  },
  "agruth_enjoy_eating_flesh": (sim, w, s) {
    var agruth = w.getActorById(agruthId);
    s.addParagraph();
    agruth.report(
        s,
        "\"I'll enjoy eating your flesh, human,\" "
        "<subject> snarl<s>.",
        wholeSentence: true);
    s.addParagraph();
  },
  "agruth_grit_teeth": (sim, w, s) {
    var agruth = w.getActorById(agruthId);
    agruth.report(s, "<subject> grit<s> <subject's> teeth");
    agruth.report(s, "<subject> do<es>n't talk any more", but: true);
  },
  "agruth_scowls": (sim, w, s) {
    var agruth = w.getActorById(agruthId);
    agruth.report(s, "<subject> scowl<s> with pure hatred");
  },
  "escape_tunnel_look": (sim, w, s) {
    final built = w.build();
    final orc = getEscapeTunnelOrc(built);
    final goblin = getEscapeTunnelGoblin(built);
    final player = getPlayer(built);
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
  "escape_tunnel_insignificant": (sim, w, s) {
    final built = w.build();
    final orc = getEscapeTunnelOrc(built);
    final goblin = getEscapeTunnelGoblin(built);
    final actor = orc.isAliveAndActive ? orc : goblin;
    final player = getPlayer(built);
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
        : (player.currentShield != null ? 'shield' : player.currentWeapon.name);
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
  "escape_tunnel_loud_cries": (sim, w, s) {
    s.add(
        "From behind, you hear loud cries. Your pursuers must have reached "
        "the top of the stairs.",
        wholeSentence: true);
  },
  "escape_tunnel_earsplitting": (sim, w, s) {
    s.add(
        "Ear-splitting shouts come from behind. You wheel around and see "
        "a body of orcs and goblins approaching at top speed, their "
        "swords and spears at the ready.",
        wholeSentence: true);
  },
  "escape_tunnel_halfway": (sim, w, s) {
    s.add("The orcs and goblins are halfway here.", wholeSentence: true);
  },
  "escape_pursuers_reach": (sim, w, s) {
    final built = w.build();
    s.add(
        "Your pursuers reach you from behind and a sword pierces your chest "
        "with formidable power.",
        wholeSentence: true);
    w.updateActorById(getPlayer(built).id, (b) => b..hitpoints = 0);
    w.popSituationsUntil(RoomRoamingSituation.className, sim);
    w.popSituation(sim);
  },
  "mad_guardian_good": (sim, w, s) {
    var guardian = w.getActorById(madGuardianId);
    guardian.report(
        s, "\"Good good good,\" <subject> whisper<s>, eyeing <object>.",
        object: getPlayer(w.build()), wholeSentence: true);
  },
  "mad_guardian_pain": (sim, w, s) {
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
  "mad_guardian_shut_up": (sim, w, s) {
    var guardian = w.getActorById(madGuardianId);
    var player = getPlayer(w.build());
    s.addParagraph();
    guardian.report(
        s,
        "\"You'll make a nice addition to my collection,\" "
        "<subject> say<s>, laughing.",
        wholeSentence: true);
    guardian.report(
        s, "<subject> nod<s> towards the heap of rotting bodies nearby");
    s.addParagraph();
    player.report(
        s, "<subject> glance<s> over at Briana, then back at the orc.",
        wholeSentence: true);
    player.report(s, "_\"You had better shut up, and die.\"_",
        wholeSentence: true);
    s.addParagraph();
  },
  "slave_quarters_orc_looks": (sim, w, s) {
    final orc = getSlaveQuartersOrc(w);
    final goblin = getSlaveQuartersGoblin(w);
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
  "slave_quarters_mean_nothing": (sim, w, s) {
    final orc = getSlaveQuartersOrc(w);
    final goblin = getSlaveQuartersGoblin(w);
    final actor = orc.isAliveAndActive ? orc : goblin;
    actor.report(
        s,
        "\"You don't understand,\" <subject> growl<s>. "
        "\"No matter how many of us you kill, there will be more. "
        "And when we get you, we will eat your face alive.\"",
        wholeSentence: true);
    actor.report(s, "<subject> smirk<s>");
    actor.report(s, "\"You mean nothing.\"", wholeSentence: true);
  },
  "sleeping_goblin_thief": (sim, w, s) {
    final goblin = w.getActorById(sleepingGoblinId);
    final player = getPlayer(w.build());
    final tookSpear = w
        .actionHasBeenPerformedSuccessfully("take_spear_in_underground_church");
    if (tookSpear) {
      goblin.report(s, "<subject> look<s> at <object-owner's> <object>",
          objectOwner: player, object: sleepingGoblinsSpear);
      goblin.report(s, "\"Thief,\" <subject> hiss<es>.", wholeSentence: true);
    }
  }
};

final _preStartBook = new Room(
    "preStartBook",
    (c) => c.outputStoryline
        .add("UNUSED because this is the first choice", wholeSentence: true),
    (c) => throw new StateError("Room isn't to be revisited"),
    null,
    null,
    [new Exit("start_adventure", "", "")]);

final List<Room> _rooms = new List<Room>.from(allRooms)
  ..addAll([_preStartBook, endOfRoam]);

/// Lesser self-worth than normal combine function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessMonsterCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation - 2 * scoreChange.enemy;

num normalCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    scoreChange.teamPreservation -
    scoreChange.enemy;
