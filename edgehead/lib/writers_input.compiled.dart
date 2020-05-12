// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// WritersInputGenerator
// **************************************************************************

// ignore_for_file: constant_identifier_names
// ignore_for_file: unused_local_variable
// ignore_for_file: unused_import
// ignore_for_file: unnecessary_parenthesis
// ignore_for_file: lines_longer_than_80_chars
// ignore_for_file: type_annotate_public_apis

import 'package:edgehead/fractal_stories/context.dart' show ActionContext;
import 'package:edgehead/fractal_stories/writer_action.dart' show RoamingAction;
import 'package:edgehead/fractal_stories/actor.dart' show Actor;
import 'package:edgehead/fractal_stories/time/actor_turn.dart' show ActorTurn;
import 'package:edgehead/fractal_stories/room_approach.dart' show Approach;
import 'package:edgehead/fractal_stories/context.dart'
    show ApplicabilityContext;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkAst;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkChoiceNode;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkForkNode;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkParagraphNode;
import 'package:edgehead/src/ink/ink_situation.dart' show InkSituation;
import 'package:edgehead/fractal_stories/action.dart' show Nothing;
import 'package:edgehead/ruleset/ruleset.dart' show Prerequisite;
import 'package:edgehead/fractal_stories/action.dart'
    show ReasonedSuccessChance;
import 'package:edgehead/fractal_stories/action.dart' show Resource;
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart'
    show RoomRoamingSituation;
import 'package:edgehead/fractal_stories/room.dart' show Room;
import 'package:edgehead/ruleset/ruleset.dart' show Rule;
import 'package:edgehead/ruleset/ruleset.dart' show Ruleset;
import 'package:edgehead/fractal_stories/writer_action.dart' show SimpleAction;
import 'package:edgehead/fractal_stories/simulation.dart' show Simulation;
import 'package:edgehead/fractal_stories/situation.dart'
    show SituationBaseBehavior;
import 'package:edgehead/fractal_stories/situation.dart' show Situation;
import 'package:edgehead/fractal_stories/storyline/storyline.dart'
    show Storyline;
import 'package:edgehead/fractal_stories/items/weapon_type.dart'
    show WeaponType;
import 'package:edgehead/fractal_stories/world_state.dart'
    show WorldStateBuilder;
import 'package:edgehead/fractal_stories/world_state.dart' show WorldState;
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/writers_helpers.dart';
import 'package:edgehead/edgehead_ids.dart';
part 'writers_input.compiled.g.dart';

const bool DEV_MODE = false;
final Approach endOfRoamFromTestRandomEncounter =
    Approach('test_random_encounter', '__END_OF_ROAM__', 'End encounter',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
});
final Approach testRandomEncounterFromStartTesterBuild =
    Approach('start_tester_build', 'test_random_encounter', 'Random encounter',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
});
final Room testRandomEncounter = Room('test_random_encounter',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, generateRandomEncounter, null,
    positionX: 0, positionY: 0, mapName: 'N/A');
final Approach bigOObservatoryFromBigOAntechamber =
    Approach('big_o_antechamber', 'big_o_observatory', '', null);
final Room bigOObservatory = Room('big_o_observatory', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A tiny floor overlooking the Bay and the ruins of San Francisco.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 26, positionY: 8, mapName: 'Observatory');
final Approach bigOAntechamberFromBigOObservatory =
    Approach('big_o_observatory', 'big_o_antechamber', '', null);
final Approach bigOAntechamberFromCrowdsource =
    Approach('crowdsource', 'big_o_antechamber', '', null);
final Room bigOAntechamber = Room('big_o_antechamber', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A dark room without windows. A stone staircase leads up to a trap door in the ceiling.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 26, positionY: 12, mapName: 'Antechamber');
final Approach topOfClimbFromBarracks =
    Approach('barracks', 'top_of_climb', '', null);
final Room topOfClimb = Room('top_of_climb', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A huge, dark pit. The bottom is unseen, in complete darkness.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 19, positionY: 26, mapName: 'Top of the climb');
final Approach crowdsourceFromBarracks =
    Approach('barracks', 'crowdsource', '', null);
final Approach crowdsourceFromBigOAntechamber =
    Approach('big_o_antechamber', 'crowdsource', '', null);
final Room crowdsource = Room('crowdsource', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A temple.\n', isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 27, positionY: 29, mapName: 'Crowd\'s Temple');
final Approach barracksFromCrowdsource =
    Approach('crowdsource', 'barracks', '', null);
final Approach barracksFromJunction =
    Approach('junction', 'barracks', '', null);
final Approach barracksFromTopOfClimb =
    Approach('top_of_climb', 'barracks', '', null);
final Room barracks = Room('barracks', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A large room taking up two floors. Bunk beds, and a dining area.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 34, positionY: 31, mapName: 'Barracks');
final Approach conetFromSmithy = Approach('smithy', 'conet', '', null);
final Room conet = Room('conet', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('Some kobolds operating a large "woodpecker".\n', isRaw: true);
}, null, null, positionX: 17, positionY: 34, mapName: 'Conet');
final Approach maintenanceShaftFromElevator28 =
    Approach('elevator_28', 'maintenance_shaft', '', null);

class KarlListenToGuards extends RoamingAction {
  @override
  final String name = 'karl_listen_to_guards';

  static final KarlListenToGuards singleton = KarlListenToGuards();

  @override
  List<String> get commandPathTemplate => ['Guards', 'Listen'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('maintenance_shaft') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKarlKilled) && !c.hasHappened(evKarlGuardsKilled))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The two are laughing.\n\n"He ate it whole, didn\'t he?" the orc captain says. "I\'ve never seen Karl do that."\n\n"We should feed him something even bigger next time," the berserker smirks. "A horse, maybe."\n\n"Get a horse carcass up here and we\'ll do it. The fucker is sleeping like a baby, and I think it\'s because of the size of the food."\n\nThe berserker nods. "Even better, it looks like we don\'t need to worry about chopping the carcasses from now on."\n\n"Yah. A whole taheen in one swallow." The captain shakes his head. "Karl is full of surprises, isn\'t he."\n',
        isRaw: true);
    return '${a.name} successfully performs KarlListenToGuards';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class KarlUseNecromancy extends RoamingAction {
  @override
  final String name = 'karl_use_necromancy';

  static final KarlUseNecromancy singleton = KarlUseNecromancy();

  @override
  List<String> get commandPathTemplate => ['Skills', 'Necromancy'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('maintenance_shaft') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKarlKilled))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Terrible roar and thrashing comes from beyond the gate.\n\n"What\'s going on?" the berserker asks and picks up his battle axe. "What\'s goind on with Karl?"\n\nThey go in, and are killed. Then, some more thrashing, then silence.\n\n',
        isRaw: true);
    c.markHappened(evKarlKilled);
    c.markHappened(evKarlGuardsKilled);
    c.markHappened(evKarlKilledViaNecromancy);

    return '${a.name} successfully performs KarlUseNecromancy';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room maintenanceShaft = Room('maintenance_shaft', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final ifBlock_373b22f49 = !c.hasHappened(evKarlGuardsKilled)
      ? '''Going to the end of the shaft, I can see two orcs below, guarding some kind of a large gate. A berserker and a captain.'''
      : '''''';
  s.add(
      'Musty, dark place. Through cracks, I can see rooms under me.\n\n$ifBlock_373b22f49\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('Musty, dark place.\n', isRaw: true);
}, null, null,
    positionX: 34,
    positionY: 40,
    mapName: 'Maintenance Shaft above 28th Floor');
final Approach smithyFromConet = Approach('conet', 'smithy', '', null);
final Approach smithyFromJunction = Approach('junction', 'smithy', '', null);
final Room smithy = Room('smithy', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('My brother, Sarn, working for the orcs, forging weapons.\n',
      isRaw: true);
}, null, null, positionX: 24, positionY: 40, mapName: 'Smithy');
final Approach elevator28FromElevator12 =
    Approach('elevator_12', 'elevator_28', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add('$weSubstitutionCapitalized climb up using an ancient rusty ladder.\n',
      isRaw: true);
});
final Approach elevator28FromGodsLair =
    Approach('gods_lair', 'elevator_28', '', null);
final Approach elevator28FromJunction =
    Approach('junction', 'elevator_28', '', null);
final Approach elevator28FromMaintenanceShaft =
    Approach('maintenance_shaft', 'elevator_28', '', null);
final Room elevator28 = Room('elevator_28', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final ifBlock_753ddd0b = !c.hasHappened(evKarlGuardsKilled)
      ? '''Brutal laughter from the east.'''
      : '''''';
  s.add(
      'Orc noises from all around, but thankfully no orc in sight. $ifBlock_753ddd0b\n',
      isRaw: true);
}, null, null,
    positionX: 32,
    positionY: 42,
    mapName: 'Elevator Shaft Entrance on 28th Floor');
final Approach godsLairFromElevator28 =
    Approach('elevator_28', 'gods_lair', '', null);

class KarlTakeStar extends RoamingAction {
  @override
  final String name = 'karl_take_star';

  static final KarlTakeStar singleton = KarlTakeStar();

  @override
  List<String> get commandPathTemplate => ['Star', 'Take'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('gods_lair') != true) {
      return false;
    }
    if (!(c.isInIdleRoom)) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('I take the star. It fits into my palm. It says "Lair of God".\n\n\n',
        isRaw: true);
    w.updateActorById(playerId, (b) => b..inventory.add(lairOfGodStar));

    return '${a.name} successfully performs KarlTakeStar';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room godsLair = Room(
    'gods_lair',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Two orcs, a berserker and a captain, watch me approach in amazement.\n\n"You!" the captain bellows. "Stand still so I can chop off your head."\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The gate to God\'s lair.\n', isRaw: true);
    },
    generateGodsLairFight,
    null,
    isIdle: true,
    positionX: 35,
    positionY: 42,
    mapName: 'God\'s Lair',
    afterMonstersCleared: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'A grumbling from behind the gate. On the gate, a little star decoration.\n\n',
          isRaw: true);
      c.markHappened(evKarlGuardsKilled);
    });
final Room godsLairAfterNecromancy = Room('gods_lair_after_necromancy', null,
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The gate is open. On it, there is a small star decoration.\n\nBeyond the gate, a giant\'s carcass lies. It\'s belly is teared open from the inside, by a humanoid figure with a bird head. Two dead orcs lie next to a wall.\n',
      isRaw: true);
}, null, null,
    parent: 'gods_lair',
    prerequisite: Prerequisite(727361369, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evKarlKilledViaNecromancy);
    }),
    isIdle: true,
    positionX: 35,
    positionY: 42,
    mapName: 'God\'s Lair');
final Approach junctionFromBarracks =
    Approach('barracks', 'junction', '', null);
final Approach junctionFromCockroachFarm =
    Approach('cockroach_farm', 'junction', '', null);
final Approach junctionFromElevator28 =
    Approach('elevator_28', 'junction', '', null);
final Approach junctionFromReservoir =
    Approach('reservoir', 'junction', '', null);
final Approach junctionFromSmithy = Approach('smithy', 'junction', '', null);
final Room junction = Room('junction', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      'A place of increased orc foot traffic. $weSubstitutionCapitalized stay hidden.\n',
      isRaw: true);
}, null, null, positionX: 27, positionY: 45, mapName: 'Junction on 26th Floor');
final Approach reservoirFromJunction =
    Approach('junction', 'reservoir', '', null);
final Approach reservoirFromTrainingGrounds =
    Approach('training_grounds', 'reservoir', '', null);

class ReservoirOpenDam extends RoamingAction {
  @override
  final String name = 'reservoir_open_dam';

  static final ReservoirOpenDam singleton = ReservoirOpenDam();

  @override
  List<String> get commandPathTemplate => ['Dam', 'Open'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('reservoir') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'I open the dam and the reservoir quickly empties. Water rushes past me, into corridors of the Pyramid.\n\n',
        isRaw: true);
    c.markHappened(evOpenedDam);

    return '${a.name} successfully performs ReservoirOpenDam';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room reservoir = Room('reservoir', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A filthy pool covered with a layer of green sludge.\n', isRaw: true);
}, null, null,
    isIdle: true, positionX: 25, positionY: 48, mapName: 'Reservoir');
final Room reservoirAfterOpenDam = Room('reservoir_after_open_dam', null,
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A huge empty room, with the floor covered with sludge and slimy carcasses.\n',
      isRaw: true);
}, null, null,
    parent: 'reservoir',
    prerequisite: Prerequisite(364228247, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    }),
    positionX: 25,
    positionY: 48,
    mapName: 'Reservoir');
final Approach cockroachFarmFromJunction =
    Approach('junction', 'cockroach_farm', '', null);
final Room cockroachFarm = Room('cockroach_farm', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'I am in a maze of twisty little passages, all alike. All crawling with cockroaches.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 29, positionY: 52, mapName: 'Cockroach Farm');
final Approach trainingGroundsFromBattlefield =
    Approach('battlefield', 'training_grounds', '', null);
final Approach trainingGroundsFromReservoir =
    Approach('reservoir', 'training_grounds', '', null);
final Room trainingGrounds = Room('training_grounds', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('An army of orcs, goblins and kobolds, all training for war.\n',
      isRaw: true);
}, null, null, positionX: 21, positionY: 54, mapName: 'Training Grounds');
final Approach battlefieldFromKnightsHqMain =
    Approach('knights_hq_main', 'battlefield', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      '$weSubstitutionCapitalized climb up the stairs to the sixteenth floor.\n',
      isRaw: true);
});
final Approach battlefieldFromTrainingGrounds =
    Approach('training_grounds', 'battlefield', '', null);
final Room battlefield = Room(
    'battlefield',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      final weSubstitution =
          getWeOrI(a, sim, originalWorld, capitalized: false);
      s.add(
          'It\'s very different from the other floors. There are no walls, and from the staircase opening one can see all the windows. There are rows of columns and two larger structures housing the staircases and the elevator, but this is the closest the Pyramid has to an open field. There is a strange smell here that I can\'t quite place.\n\nAs soon as $weSubstitution climb the last stair and enter the floor proper, two orcs step out from behind the columns. One of them is wearing a red tunic and wields a serrated sword. Possibly a captain of some kind. The other one has the usual brown leather jerkin and wields a battle axe.\n\n"Big mistake," the red orc is saying with mock sadness. "Big mistake for you. This is no longer a place for human swine."\n\n"Big mistake for him," the leather jerkin agrees. "But good news for us. XYZ rewards human scalps."\n\nThe two orcs attack.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    generateBattlefieldFight,
    null,
    positionX: 28,
    positionY: 64,
    mapName: 'Battlefield Floor',
    afterMonstersCleared: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      final weSubstitutionCapitalized =
          getWeOrI(a, sim, originalWorld, capitalized: true);
      s.add(
          '$weSubstitutionCapitalized stand in the middle of this large room and for the first time I notice the faint smell of old, dried blood. Except for the new ones, there is no corpse here. The orcs moved them elsewhere, or maybe they just tossed them through the window panes. The blood, though, they did not clear. And so death is here, filling the room, like steam fills a room after hot bath.\n\nA glorious battle this was, I\'m sure. It became a scab.\n\nWhatever the reason for this cleared space had been in the ancient times, I can imagine how the Knights preferred it for battle when they still had the numbers. There is no way to go past it, and the plan is so open you can conceivably use archers, and formations.\n',
          isRaw: true);
    },
    whereDescription: 'among the columns');
final Approach oracleMainFromKnightsHqMain =
    Approach('knights_hq_main', 'oracle_main', '', null);
final Room oracleMain = Room('oracle_main', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The Oracle is here.\n', isRaw: true);
}, null, null,
    isIdle: true, positionX: 39, positionY: 65, mapName: 'Oracle\'s');
final Approach jungleEntranceFromDeathlessVillage =
    Approach('deathless_village', 'jungle_entrance', '', null);
final Approach jungleEntranceFromStagingArea =
    Approach('staging_area', 'jungle_entrance', '', null);
final Room jungleEntrance = Room('jungle_entrance', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Corridors full of vegetation. Path through that, like a path in a forest, but indoors.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 21, positionY: 72, mapName: 'Jungle');
final Approach deathlessVillageFromDragonEgg =
    Approach('dragon_egg', 'deathless_village', '', null);
final Approach deathlessVillageFromJungleEntrance =
    Approach('jungle_entrance', 'deathless_village', '', null);

class GiveLairOfGodStarToDeathless extends RoamingAction {
  @override
  final String name = 'give_lair_of_god_star_to_deathless';

  static final GiveLairOfGodStarToDeathless singleton =
      GiveLairOfGodStarToDeathless();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'Lair of God star', 'give to the Deathless'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    if (!(c.hasItem(lairOfGodStarId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('They are happy.\n\n', isRaw: true);
    c.markHappened(evDeathlessRespectGained);
    c.removeItemFromPlayer(lairOfGodStarId);

    return '${a.name} successfully performs GiveLairOfGodStarToDeathless';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room deathlessVillage = Room('deathless_village', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('On a ledge overlooking the jungle, a village of cargo cultists.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    positionX: 18, positionY: 68, mapName: 'Village of the Deathless');
final Approach dragonEggFromDeathlessVillage =
    Approach('deathless_village', 'dragon_egg', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasHappened(evDeathlessRespectGained);
});
final Room dragonEgg = Room('dragon_egg', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The sacred place for the Deathless.\n', isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 15, positionY: 67, mapName: 'Sacred Place');
final Approach knightsHqMainFromBattlefield =
    Approach('battlefield', 'knights_hq_main', '', null);
final Approach knightsHqMainFromElevator12 =
    Approach('elevator_12', 'knights_hq_main', '', null);
final Approach knightsHqMainFromOracleMain =
    Approach('oracle_main', 'knights_hq_main', '', null);
final Approach knightsHqMainFromStagingArea =
    Approach('staging_area', 'knights_hq_main', '', null);
final Room knightsHqMain = Room('knights_hq_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      '(NOTE FOR TESTERS: This area is very much in development.)\n\nI come to the headquarters. A large room overlooking the bay. Latrines on the right, hanging out of the window frames, providing fertilizer to the farmer slope below. To the left, as far from the latrines as possible, the bunks where a few of the knights sleep, and the command tent.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true,
    positionX: 37,
    positionY: 70,
    mapName: 'Knights Headquarters');
final Approach elevator12FromElevator28 =
    Approach('elevator_28', 'elevator_12', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      '$weSubstitutionCapitalized climb down using an ancient rusty ladder.\n',
      isRaw: true);
});
final Approach elevator12FromKnightsHqMain =
    Approach('knights_hq_main', 'elevator_12', '', null);
final Room elevator12 = Room('elevator_12', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A rare access to the ancient elevator shaft.\n', isRaw: true);
}, null, null,
    isIdle: true,
    positionX: 32,
    positionY: 72,
    mapName: 'Elevator Shaft Entrance on 12th Floor');
final Approach slopesFromFarmersVillage =
    Approach('farmers_village', 'slopes', '', null);
final Room slopes = Room('slopes', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The steep slope of the Pyramid is covered in vines from this point down. Young men and women are picking mana pods.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, isIdle: true, positionX: 42, positionY: 78, mapName: 'Slopes');
final Approach stagingAreaFromFarmersVillage =
    Approach('farmers_village', 'staging_area', '', null);
final Approach stagingAreaFromJungleEntrance =
    Approach('jungle_entrance', 'staging_area', '', null);
final Approach stagingAreaFromKeepGate =
    Approach('keep_gate', 'staging_area', '', null);
final Approach stagingAreaFromKnightsHqMain =
    Approach('knights_hq_main', 'staging_area', '', null);
final Approach stagingAreaFromPyramidEntrance =
    Approach('pyramid_entrance', 'staging_area', '', null);
final Room stagingArea = Room('staging_area', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'This is a large room without windows. It is teeming with knights and their servants, who are carrying chests, bedding and furniture. All these items are being lined up against the north wall, and an officer with a large book is walking left and right, making notes.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 23, positionY: 82, mapName: 'Staging Area');
final Approach farmersVillageFromFloatingPoint =
    Approach('floating_point', 'farmers_village', '', null);
final Approach farmersVillageFromPyramidEntrance =
    Approach('pyramid_entrance', 'farmers_village', '', null);
final Approach farmersVillageFromSlopes =
    Approach('slopes', 'farmers_village', '', null);
final Approach farmersVillageFromStagingArea =
    Approach('staging_area', 'farmers_village', '', null);
final Room farmersVillage = Room('farmers_village', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well dressed people go about their business. Polite nods in my direction.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 35, positionY: 83, mapName: 'Farmers\' village');
final Approach keepGateFromKeepBedroom =
    Approach('keep_bedroom', 'keep_gate', '', null);
final Approach keepGateFromStagingArea =
    Approach('staging_area', 'keep_gate', '', null);

class DebugSearchForKatana extends RoamingAction {
  @override
  final String name = 'debug_search_for_katana';

  static final DebugSearchForKatana singleton = DebugSearchForKatana();

  @override
  List<String> get commandPathTemplate => ['Rubble', 'Examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Something\'s sticking from the rubble. I pull it out. It\'s a katana. I take it.\n\n',
        isRaw: true);
    c.giveNewItemToPlayer(katana);

    return '${a.name} successfully performs DebugSearchForKatana';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room keepGate = Room('keep_gate', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The plain, ancient geometry of the Pyramid\'s hallways is suddenly disrupted by a massive gate. The gate is from dark, richly ornamented redwood. \n\nThis is a lord\'s house, except it doesn\'t stand on top of a hill or next to a lake. Instead, it is embedded in the ancient building.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 20, positionY: 86, mapName: 'The Keep\'s Gate');
final Approach keepBedroomFromKeepDining =
    Approach('keep_dining', 'keep_bedroom', '', null);
final Approach keepBedroomFromKeepGate =
    Approach('keep_gate', 'keep_bedroom', '', null);
final Approach keepBedroomFromKeepServants =
    Approach('keep_servants', 'keep_bedroom', '', null);

class UseCompass extends RoamingAction {
  @override
  final String name = 'use_compass';

  static final UseCompass singleton = UseCompass();

  @override
  List<String> get commandPathTemplate => ['inventory', 'compass', 'use'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_bedroom') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The compass leads me through twisty little passages to the servants room.\n\n',
        isRaw: true);
    c.learnAbout(kbKeepServantsLocation);
    c.movePlayer('keep_servants');

    return '${a.name} successfully performs UseCompass';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room keepBedroom = Room('keep_bedroom', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('TBA\n', isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 15, positionY: 86, mapName: 'Lord\'s quarters');
final Approach keepDiningFromKeepBedroom =
    Approach('keep_bedroom', 'keep_dining', '', null);
final Room keepDining = Room('keep_dining', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('TBA + lady hope\n', isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 9, positionY: 86, mapName: 'Dining Room');
final Approach keepServantsFromKeepBedroom =
    Approach('keep_bedroom', 'keep_servants', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasLearnedAbout(kbKeepServantsLocation);
});
final Approach keepServantsFromTopOfClimb =
    Approach('top_of_climb', 'keep_servants', '', null);
final Room keepServants = Room('keep_servants', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 19, positionY: 89, mapName: 'Servants\' quarters');
final Approach floatingPointFromFarmersVillage =
    Approach('farmers_village', 'floating_point', '', null);
final Room floatingPoint = Room('floating_point', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('A thin place. Objects floating in mid air.\n', isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true, positionX: 32, positionY: 90, mapName: 'Floating Point');
final Approach pyramidEntranceFromBleedsMain =
    Approach('bleeds_main', 'pyramid_entrance', '', null);
final Approach pyramidEntranceFromFarmersVillage =
    Approach('farmers_village', 'pyramid_entrance', '', null);
final Approach pyramidEntranceFromStagingArea =
    Approach('staging_area', 'pyramid_entrance', '', null);
final Room pyramidEntrance = Room('pyramid_entrance', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
  s.add(
      'As $weSubstitution approach, I can\'t stop looking up at the structure. The wind changes here, and there is a musty smell coming from the vines that envelop the bottom of the building. From this perspective, the Pyramid is especially massive.\n\nTwo knights, a woman and a man, are on guard.\n\nFour stories above, in a corner room of the Pyramid, an eerily motionless woman stands, looking out.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The two knights are still here.\n', isRaw: true);
}, null, null,
    isIdle: true,
    positionX: 26,
    positionY: 94,
    mapName: 'Pyramid\'s Main Entrance');
final talkToKatGreetingsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Greetings to you!" The woman smiles. "My name is Kat."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Kat?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'The woman\'s face sharpens. "Kat, yes. That\'s my name. What\'s yours?"\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "Aren." """.trim(),
            consequence: [],
          ),
          InkChoiceNode(
            command: r""" "Kat with a K. Like Katherine?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('"Yes. But don\'t call me that. And your name is..."\n',
                    isRaw: true);
              }),
              InkForkNode([
                InkChoiceNode(
                  command: r""" "[Aren]." """.trim(),
                  consequence: [],
                ),
              ]),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "Mine's [Aren]." """.trim(),
      consequence: [],
    ),
  ]),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Good to meet you, [Aren]."\n', isRaw: true);
  }),
]);

class TalkToKatAboutBrother extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_brother';

  static final TalkToKatAboutBrother singleton = TalkToKatAboutBrother();

  @override
  List<String> get commandPathTemplate => [
        'Kat, the guardswoman',
        'Talk',
        '"I\'m looking for a Sarn of Falling Rock."'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_kat_greetings") &&
        w.actionNeverUsed("talk_to_miguel_about_brother"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Sarn of Falling Rock," she repeats. But before she can continue, the man steps in. Kat looks at him. "You know a Sarn of Falling Rock, Miguel?"\n\n',
        isRaw: true);
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "talk_to_miguel_about_brother_ink",
    ));

    return '${a.name} successfully performs TalkToKatAboutBrother';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class TalkToKatGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_kat_greetings';

  static final TalkToKatGreetings singleton = TalkToKatGreetings();

  @override
  List<String> get commandPathTemplate =>
      ['Guardswoman', 'Talk', '"Greetings."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "talk_to_kat_greetings_ink",
    ));
    return '${a.name} successfully performs TalkToKatGreetings';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final talkToMiguelAboutBrotherInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Sarn? Doesn\'t ring the bell. Who is he?"\n', isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "He came here with the Knights." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('Miguel looks surprised. "He\'s a knight, then?"\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "No, a blacksmith." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('"Ah. He\'s a mender with the Knights."\n', isRaw: true);
              }),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "A blacksmith." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"There are no blacksmiths here." Miguel gestures around, towards the ruins and the forest.\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "Whose work is your sword, then?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"Her?" He looks at his sword and pats it. "She\'s not from here. I bought her in Lywood, years ago, for more coins that I will admit." He smiles for the first time since we met.\n',
                    isRaw: true);
              }),
              InkForkNode([
                InkChoiceNode(
                  command: r""" "The sword looks great." """.trim(),
                  consequence: [
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                          'Miguel\'s smile widens. "You get what you pay for. And I\'m taking good care of her, taking her to ..." Miguel stops. "Oh!" He shakes his head, still smiling.\n',
                          isRaw: true);
                    }),
                  ],
                ),
                InkChoiceNode(
                  command:
                      r""" "Who repairs it when there's a chink in the blade?" """
                          .trim(),
                  consequence: [
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add('"Oh!" he says.\n', isRaw: true);
                    }),
                  ],
                ),
              ]),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"I know what you\'re driving at. You mean a mender. Your Sarn is a mender with the Knights."\n',
                    isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "The Knights recruited him." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('"Oh, you mean a mender."\n', isRaw: true);
              }),
            ],
          ),
        ]),
      ],
    ),
  ]),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('He looks to the woman. "Do you know of a mender called Sarn?"\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"No," she says.\n', isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "But he might be in." """.trim(),
      consequence: [],
    ),
  ]),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Miguel looks over his shoulder at the Pyramid, then back at me. "Even if he is, you would not want to get in. You would want to get out."\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The woman looks at him with a mix of puzzlement and exasperation, then she turns to me.\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"This place is no longer safe. Unless you have business with one of the farmers, you shouldn\'t go in."\n',
        isRaw: true);
  }),
]);
final talkToMiguelGreetingsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('The knight nods.\n', isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Welcome," he says, and there is a bit of sarcasm in his voice.\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I am [Aren]." """.trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command: r""" "What's your name?" """.trim(),
      consequence: [],
    ),
  ]),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Miguel."\n', isRaw: true);
  }),
]);

class TalkToMiguelAboutBrother extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_brother';

  static final TalkToMiguelAboutBrother singleton = TalkToMiguelAboutBrother();

  @override
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '"I\'m looking for a Sarn of Falling Rock."'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        w.actionNeverUsed("talk_to_kat_about_brother"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "talk_to_miguel_about_brother_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAboutBrother';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class TalkToMiguelGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_greetings';

  static final TalkToMiguelGreetings singleton = TalkToMiguelGreetings();

  @override
  List<String> get commandPathTemplate => ['Guardsman', 'Talk', '"Greetings."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "talk_to_miguel_greetings_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelGreetings';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Approach bleedsMainFromBleedsTraderHut =
    Approach('bleeds_trader_hut', 'bleeds_main', '', null);
final Approach bleedsMainFromGoblinSkirmishMain =
    Approach('goblin_skirmish_main', 'bleeds_main', '', null);
final Approach bleedsMainFromGoblinSkirmishSneak =
    Approach('goblin_skirmish_sneak', 'bleeds_main', '', null);
final Approach bleedsMainFromMeadowFight =
    Approach('meadow_fight', 'bleeds_main', '', null);
final Approach bleedsMainFromPyramidEntrance =
    Approach('pyramid_entrance', 'bleeds_main', '', null);
final Approach bleedsMainFromStartTesterBuild = Approach(
    'start_tester_build',
    'bleeds_main',
    'Set piece >> from the start of the game, skipping the first fight',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
});

class BleedsMainObserveSmoke extends RoamingAction {
  @override
  final String name = 'bleeds_main_observe_smoke';

  static final BleedsMainObserveSmoke singleton = BleedsMainObserveSmoke();

  @override
  List<String> get commandPathTemplate => ['Smoke', 'observe'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evGoblinCampCleared))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The smoke is black as death but the pillar is narrow. Looks like nothing more than a camp fire.\n\nSomeone is not afraid to be found.\n',
        isRaw: true);
    return '${a.name} successfully performs BleedsMainObserveSmoke';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class BleedsMainObserveVillage extends RoamingAction {
  @override
  final String name = 'bleeds_main_observe_village';

  static final BleedsMainObserveVillage singleton = BleedsMainObserveVillage();

  @override
  List<String> get commandPathTemplate => ['Village', 'observe'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'At any point I can see at least a few villagers going about their business. They all walk fast and seldom talk to each other. Something bad is happening.\n\nEvery door is shut except for two. One is the entrance into the trader\'s shop. The second open door belongs to a small dwelling with a porch. A blind man sits outside on a stool, wearing a coat.\n\n',
        isRaw: true);
    c.learnAbout(kbBlindGuide);

    return '${a.name} successfully performs BleedsMainObserveVillage';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room bleedsMain = Room('bleeds_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'I finally see it. The Pyramid.\n\n\nBelow the Pyramid there\'s a small village. It huddles around the entrance to the structure. Later, I learn the locals call the settlement “The Bleeds”.\n\nThere is a trader\'s shop here. A mile to the west, I see a pillar of black smoke rising to the sky.\n\n',
      isRaw: true);
  c.learnAbout(kbTrader);
  c.learnAbout(kbGoblinCampSmoke);

  w.updateActorById(tamaraId, (b) => b.isActive = false);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null,
    isIdle: true,
    positionX: 37,
    positionY: 98,
    mapName: 'The Bleeds',
    firstMapName: 'Some buildings',
    hint: 'This is a small village around the entrance to the Pyramid.',
    firstHint:
        'There seems to be a village or at least a homestead next to the Pyramid.');

class BleedsBlindGuideGoblins extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_goblins';

  static final BleedsBlindGuideGoblins singleton = BleedsBlindGuideGoblins();

  @override
  List<String> get commandPathTemplate =>
      ['Blind Guide', '“The goblins are new here?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Not completely, of course. There were always raiders. But not like this." The man shakes his head. "It\'s like the goblins are being drawn here."\n\n_"What do they want?"_\n\n"They\'re goblins. They want to raid. They want steel and slaves." He thinks for a while. "But it\'s strange. They come in larger numbers than you would think makes sense. They\'d get more slaves and more steel elsewhere."\n\n_"They want into the Pyramid, perhaps?"_\n\n"Nonsense. Goblins fear these kinds of things. Even if they didn\'t, they\'d probably get slaughtered by the orcs. Oh, that\'s something I\'d like to see." He absentmindedly touches his face just under the left eye.\n\n',
        isRaw: true);
    Ruleset(
        Rule(126964403, 1, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return !c.hasHappened(evGoblinCampCleared);
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '\n"Anyway. The goblins aren\'t stupid, but they _are_ getting awfully bold. I\'ve heard a band has made their camp not far from here. So close that people can see their campfire\'s smoke sometimes." He shudders. "Can you see it?"\n\n_"Yes."_\n\n"It must be a harrowing sight. A herald of our own future, possibly."\n\n',
              isRaw: true);
        }),
        Rule(775067539, 0, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
        })).apply(c);
    return '${a.name} successfully performs BleedsBlindGuideGoblins';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class BleedsBlindGuideGreet extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_greet';

  static final BleedsBlindGuideGreet singleton = BleedsBlindGuideGreet();

  @override
  List<String> get commandPathTemplate => ['Blind man', '“Hello!”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasLearnedAbout(kbBlindGuide))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'I come over to the blind man and introduce myself.\n\n"Nice to meet you! I am Jisad. But because I know a lot about this place, and because I am — you know — blind, everyone around here calls me the Blind Guide." He smiles and leans over, lowering his voice. "I think they find it funny."\n\n_"Hilarious."_\n\n"So what brings you here?"\n\nI have decided long ago that my skill in necromancy is best kept to myself. So is my quest for the Manual.\n\n\n_"I seek treasure."_\n\n"Ahh!" The man leans back, resting his back against the wall of his house. "A terrible idea."\n\n',
        isRaw: true);
    c.learnAbout(kbBlindGuide);

    return '${a.name} successfully performs BleedsBlindGuideGreet';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class BleedsBlindGuideTerribleIdea extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_terrible_idea';

  static final BleedsBlindGuideTerribleIdea singleton =
      BleedsBlindGuideTerribleIdea();

  @override
  List<String> get commandPathTemplate => [
        'Blind Guide',
        '“Why is hunting for treasure in the Pyramid a terrible idea?”'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"So you want to explore the Pyramid."\n\n_"I need something that\'s in there."_\n\n"A lot of people think that. There are whole religions built on the idea that there is _something_ in this building. Something that made it survive the ages. You seek magic?"\n\nI don\'t want to reveal more than needed. But "magic" is vague enough. So I just say yes.\n\nThe man purses his lips. "I hate magic." He shifts on his stool and the wood creaks. "Even though I built my life on knowing this ancient place, I hate magic. For a while it seems useful, in small doses. But something happens, and everything goes to hell. Look at this place." He gestures around.\n\n',
        isRaw: true);
    c.hearAbout(kbJisadHatesMagic);

    s.add(
        '\n_"What about it?"_\n\n"I was born and raised in these ancient ruins. It was always a little bit crazy here but never like this. The Knights are leaving. The orcs at the upper floors are getting bolder every day. There are bands of goblins closing in on this place, for no apparent reason."\n\n',
        isRaw: true);
    c.hearAbout(kbOrcsInPyramid);
    c.hearAbout(kbKnightsLeaving);

    s.add(
        '\n_"And this is because of magic?"_\n\nThe otherwise calm face of the blind man twists with rage. "Of course it is. Magic is power and power corrupts. This place is _infused_ with magic. And the world has noticed."\n\nThe man calms down again and turns his unseeing face almost precisely to me. "Go away. Leave this place. Forgo the magic and keep your life."\n',
        isRaw: true);
    return '${a.name} successfully performs BleedsBlindGuideTerribleIdea';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Approach bleedsTraderHutFromBleedsMain =
    Approach('bleeds_main', 'bleeds_trader_hut', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasLearnedAbout(kbTrader);
});

class BleedsTraderGoblinSmoke extends RoamingAction {
  @override
  final String name = 'bleeds_trader_goblin_smoke';

  static final BleedsTraderGoblinSmoke singleton = BleedsTraderGoblinSmoke();

  @override
  List<String> get commandPathTemplate =>
      ['Leroy', '“Can you tell me more about that goblin camp?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_trader_hut') != true) {
      return false;
    }
    if (!(c.hasLearnedAbout(kbLeroy) &&
        c.hasLearnedAbout(kbLeroyKnowsGoblinSmoke) &&
        !c.hasHappened(evGoblinCampCleared))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    assert(c.inRoomWith(leroyId));

    s.add(
        '\n"They are to the west. It doesn\'t seem like there is a lot of them. We thought the Knights would get rid of them for sure."\n\n"But the Knights are leaving." The trader looks at me for reaction and when he doesn\'t get any, he turns back to his son. "The Knights are leaving," he repeats.\n\n',
        isRaw: true);
    c.hearAbout(kbKnightsLeaving);

    s.add(
        '\n"Well, if we aren\'t leaving this place like they are, it looks like we\'ll have to learn how to live here, without the Knights. We could take up the fight ourselves."\n\nThe trader groans. "Don\'t be stupid, Leroy."\n\n"I mean it! Sir, you seem as an adventurous soul. If you ever want my help, just ask." He points to a chest near where he sits. "I have a long dagger and a decent shield, and I can use both."\n\n',
        isRaw: true);
    w.updateActorById(leroyId, (b) => b.npc.isHireable = true);

    s.add(
        '\n"The hell you can! You\'re a trader, Leroy! You\'re no fighter." Leroy\'s father is shaking. When he remembers that I\'m there with them, he apologizes, then turns back to Leroy. "Son, I forget that you are a grown man now. But... it is my wish that you don\'t go."\n',
        isRaw: true);
    return '${a.name} successfully performs BleedsTraderGoblinSmoke';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class BleedsTraderGoblins extends RoamingAction {
  @override
  final String name = 'bleeds_trader_goblins';

  static final BleedsTraderGoblins singleton = BleedsTraderGoblins();

  @override
  List<String> get commandPathTemplate =>
      ['Trader', '“What\'s with all the goblins around here?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_trader_hut') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_trader_greet"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The trader bangs on the wooden counter, immediately angry. "Goblins! The suckers are getting cockier and cockier. Among all the problems we have, they\'re the worst. I fear we won\'t get a caravan anytime soon because of them. No caravan means no goods. No goods mean no trade."\n\n',
        isRaw: true);
    assert(c.inRoomWith(leroyId));

    s.add(
        '\nLeroy smiles wryly. "No trade means no money."\n\nHis father looks at him, annoyed. "No money means no food."\n\nLeroy looks as if he wants to add something, but thinks better of it.\n\nThe trader, obviously satisfied, turns back to me. "The suckers are closing in from all sides. A few months ago they wouldn\'t dare approach the Pyramid. But lately, they come much closer."\n\n"I could see the smoke from one of their camps a while back." Leroy talks to his leather strip.\n\n"What smoke?" the trader says.\n\n"There\'s a camp to the west, less than a mile from here."\n\n"There\'s a goblin camp _less than a mile_ from The Bleeds? How do I not know this?"\n\nLeroy seems genuinely surprised. "I thought you knew. Everyone knows."\n\n',
        isRaw: true);
    c.learnAbout(kbLeroyKnowsGoblinSmoke);

    return '${a.name} successfully performs BleedsTraderGoblins';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class BleedsTraderGreet extends RoamingAction {
  @override
  final String name = 'bleeds_trader_greet';

  static final BleedsTraderGreet singleton = BleedsTraderGreet();

  @override
  List<String> get commandPathTemplate => ['Trader', '“How is business?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_trader_hut') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The trader shrugs.\n\n"It\'s terrible. Everyone is afraid, nobody buys anything. Well, except for travel gear. But we\'re out of that until the next caravan." He glides his hand over the counter to suggest that there is nothing left.\n\n_"Why travel gear?"_\n\n"People are leaving. Even _he_ wants to leave."\n\nThis is the first time I notice a person sitting in one corner of the room, quietly {polishing a strip of leather|sewing two strips of leather together|pinching holes into a strip of leather}. The man introduces himself as Leroy. He is the trader\'s son.\n\n"Well why wouldn\'t I leave, father? We all should. What awaits us here?"\n\nThe trader shakes his head and interjects: "What awaits us anywhere else?"\n\n"Death or slavery." Leroy deems his point made, ignoring his father\'s interjection. He goes back to his work.\n\n',
        isRaw: true);
    c.learnAbout(kbLeroy);

    return '${a.name} successfully performs BleedsTraderGreet';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class BleedsTraderTellAboutClearedCamp extends RoamingAction {
  @override
  final String name = 'bleeds_trader_tell_about_cleared_camp';

  static final BleedsTraderTellAboutClearedCamp singleton =
      BleedsTraderTellAboutClearedCamp();

  @override
  List<String> get commandPathTemplate =>
      ['Trader', '“No need to worry about that camp anymore.”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_trader_hut') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_trader_greet") &&
        c.hasHappened(evGoblinCampCleared))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('“What happened?”\n\nI describe the battle to him.\n', isRaw: true);
    return '${a.name} successfully performs BleedsTraderTellAboutClearedCamp';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room bleedsTraderHut = Room('bleeds_trader_hut', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      '$weSubstitutionCapitalized enter a small building made of stone. It\'s dark in here but cozy.\nA gray haired trader greets me and gestures around.\n\n"Everything is for sale. And for good price, too."\n\nI don\'t really have any money, so I just nod and smile.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
  s.add(
      'The trader {nods|pretends to smile} as $weSubstitution enter his shop.\n\n',
      isRaw: true);
  if (c.inRoomWith(leroyId) &&
      w.getActorById(leroyId).anatomy.isUndead &&
      !c.hasHappened(evJisadSeesUndeadLeroy)) {
    s.add(
        'He then takes a second look at his son, and freezes. After a long while of silence, he turns to me. "Sir," he says, his eyes wet, "please have mercy on the soul of this young boy. Please release him from... this. Please give him back his death." He looks back at Leroy, and then down on the wooden counter.',
        wholeSentence: true);
    w.recordCustom(evJisadSeesUndeadLeroy);
  }
}, null, null,
    isIdle: true, positionX: 36, positionY: 97, mapName: 'Trader\'s Shop');
final Approach endOfRoamFromBleedsMain =
    Approach('bleeds_main', '__END_OF_ROAM__', 'go >> back home (ENDS GAME)',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You realize this adventuring life is not for you.\n', isRaw: true);
});
final Approach goblinSkirmishPatrolFromBleedsMain =
    Approach('bleeds_main', 'goblin_skirmish_patrol', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      'There is no path in the direction of the smoke. $weSubstitutionCapitalized go through the brush and step over logs and ancient rubble.\n',
      isRaw: true);
}, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasLearnedAbout(kbGoblinCampSmoke) &&
      !c.playerHasVisited("goblin_skirmish_patrol");
});
final Room goblinSkirmishPatrol = Room('goblin_skirmish_patrol',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
  s.add(
      'When $weSubstitution come out of a particularly nasty shrub, I hear a short, guttural sound. I look up and see a lone goblin with a gray spear.\n\n"You lost, peasant?"\n',
      isRaw: true);
}, null, generateBleedsGoblinSkirmishPatrol, null,
    positionX: 15, positionY: 97, mapName: 'Towards the smoke');
final Approach goblinSkirmishSneakFromBleedsMain = Approach(
    'bleeds_main',
    'goblin_skirmish_sneak',
    'Go >> Near the Goblin Outpost',
    null, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.playerHasVisited("goblin_skirmish_sneak") &&
      !c.hasHappened(evGoblinCampCleared);
});
final Approach goblinSkirmishSneakFromGoblinSkirmishPatrol = Approach(
    'goblin_skirmish_patrol',
    'goblin_skirmish_sneak',
    'Smoke >> Come closer',
    null);

class GoblinCampAttack extends RoamingAction {
  @override
  final String name = 'goblin_camp_attack';

  static final GoblinCampAttack singleton = GoblinCampAttack();

  @override
  List<String> get commandPathTemplate => ['Camp', 'Attack'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_sneak') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
        '$weSubstitutionCapitalized come out of the hiding and charge the goblins.\n\n',
        isRaw: true);
    c.movePlayer('goblin_skirmish_main');

    return '${a.name} successfully performs GoblinCampAttack';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class ListenContinue extends RoamingAction {
  @override
  final String name = 'listen_continue';

  static final ListenContinue singleton = ListenContinue();

  @override
  List<String> get commandPathTemplate => ['Goblins', 'Continue listening'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_sneak') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("listen_to_them_arguing"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The higher ranked goblin takes something out of a leather bag and shoves it into the other\'s face.\n\n"The only reason we are here, shithead, is the graytower. Look at the device."\n\nThe lower ranked goblin\'s face wrinkles, almost showing his teeth but not quite.\n\n"The kh\'ompakh is just a stupid piece of metal. Its maker wants us here, _around_ the graytower. Not _in_ it."\n\n"Oh, you know what the maker wants, do you?" The higher ranked goblin, who I decide is a captain, places the device back in the bag.\n',
        isRaw: true);
    return '${a.name} successfully performs ListenContinue';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class ListenMore extends RoamingAction {
  @override
  final String name = 'listen_more';

  static final ListenMore singleton = ListenMore();

  @override
  List<String> get commandPathTemplate => ['Goblins', 'Continue listening'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_sneak') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("listen_continue"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The two goblins don\'t speak anymore. They each look into the fire.\n',
        isRaw: true);
    return '${a.name} successfully performs ListenMore';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class ListenToThemArguing extends RoamingAction {
  @override
  final String name = 'listen_to_them_arguing';

  static final ListenToThemArguing singleton = ListenToThemArguing();

  @override
  List<String> get commandPathTemplate => ['Goblins', 'Listen'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_sneak') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Why not go now?" a goblin says in a screeching voice. "They are weak. It will be an easy take."\n\n"How do you know they are weak?" This other goblin\'s voice is lower. This tells me he is ranked above the first one. "They can have a platoon of guards."\n\n"Amak was there. He saw no guards!" \n\n"Amak is a fool, and so are you. The guards can be in the graytower." He means the Pyramid.\n\n"Another reason why not to go there."\n',
        isRaw: true);
    return '${a.name} successfully performs ListenToThemArguing';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class ObserveGoblinCamp extends RoamingAction {
  @override
  final String name = 'observe_goblin_camp';

  static final ObserveGoblinCamp singleton = ObserveGoblinCamp();

  @override
  List<String> get commandPathTemplate => ['Camp', 'Observe'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_sneak') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
        '$weSubstitutionCapitalized find a hiding spot behind a tree stump and gingerly look over it. I see a camp ground with a fire pit and a small shelter made of some animal\'s hide. There are three goblins, not two. The third goblin is sleeping. There may be more that I don\'t see, but looking at the size of the camp ground, it\'s not likely.\n',
        isRaw: true);
    return '${a.name} successfully performs ObserveGoblinCamp';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room goblinSkirmishSneak =
    Room('goblin_skirmish_sneak', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Suddenly, I hear voices ahead. Two goblins are arguing about something.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The goblins are still here.\n', isRaw: true);
}, null, null, positionX: 13, positionY: 98, mapName: 'The Camp');
final Approach goblinSkirmishMainFromBleedsMain =
    Approach('bleeds_main', 'goblin_skirmish_main', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasHappened(evGoblinCampCleared);
});
final Room goblinSkirmishMain = Room('goblin_skirmish_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      '(To be done: actual battle. Assume you won.)\n\nI take a curious device from the ground. Some kind of a compass.\n\n',
      isRaw: true);
  c.markHappened(evGoblinCampCleared);
  c.giveNewItemToPlayer(compass);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The goblin camp is deserted.\n', isRaw: true);
}, null, null, positionX: 11, positionY: 97, mapName: 'The Camp');
final Approach startTesterBuildFromPreStartBook =
    Approach('pre_start_book', 'start_tester_build', r'$IMPLICIT', null);
final Room startTesterBuild = Room('start_tester_build', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Welcome to the test build of this game. Thank you for taking the time to make the game better.\n',
      isRaw: true);
}, null, null, null, positionX: 0, positionY: 0, mapName: 'N/A');
final Approach startFromStartTesterBuild = Approach('start_tester_build',
    'start', 'Set piece >> from the start of the game', null);
final startInkInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Here I am in the ancient ruins of San Francisco. After a month long journey, I have finally reached my destination. My brother is here, somewhere.\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command:
          r""" I am a young woman >> with black curly hair >> and a large debt. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with black curly hair >> and a wooden stump for a leg. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with black curly hair >> and tuberculosis. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with straight white hair >> and a large debt. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with straight white hair >> and a wooden stump for a leg. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with straight white hair >> and tuberculosis. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with blond wavy hair >> and a large debt. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with blond wavy hair >> and a wooden stump for a leg. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> with blond wavy hair >> and tuberculosis. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with black curly hair >> and a large debt. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with black curly hair >> and a wooden stump for a leg. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with black curly hair >> and tuberculosis. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with straight white hair >> and a large debt. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with straight white hair >> and a wooden stump for a leg. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with straight white hair >> and tuberculosis. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with blond wavy hair >> and a large debt. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with blond wavy hair >> and a wooden stump for a leg. """
              .trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> with blond wavy hair >> and tuberculosis. """
              .trim(),
      consequence: [],
    ),
  ]),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('I am also a necromancer. Which might come in handy around here.\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"This place is dangerous, young sir." This is Tamara, my hired guide. She\'s walking a few paces in front of me, trying to see through the fog and the wild forest that was once a major city. The air is damp and raw.\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Dangerous? This place? What an insight!" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('Tamara gives me a look. "Extremely funny," she whispers.\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command:
                r""" "It can't be more dangerous than the journey here." """
                    .trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('Then again, I _have_ seen\n', isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "Sorry." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    'Tamara shrugs, and starts walking again. I look around, at the thick overgrowth. I\'ve seen\n',
                    isRaw: true);
              }),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "Do you see anything?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"No," she whispers. "Trees and leaves and fog. And corpses."\n',
              isRaw: true);
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('It\'s true. I\'ve also seen\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I will keep my eyes open." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'Tamara nods. "Good," she whispers, and starts walking again. I look around, at the thick overgrowth. I\'ve seen\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'quite a few corpses in the few hours we have been here. (All of them way too old and blood-dry to raise, though.)\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Tamara stops. For a moment, she\'s as still as a painting, and I try to mirror her. Then, she nods in the direction of a brush just ahead. It\'s shaking. Then something, something evil and fierce, steps right out of it.\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('[IMAGE alt="A ferocious goblin is stepping out of hiding"]\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Keeping her teeth together, Tamara says: "I might need your help with this. Take my dagger."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "No. I'm not a warrior." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(tamaraId, (b) => b.inventory.add(tamarasDagger));
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'Tamara purses her lips but says nothing. Then, without warning,\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Keep it. I'll improvise." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(
              playerId, (b) => b.inventory.equip(rockFromMeadow, a.anatomy));
          w.updateActorById(tamaraId, (b) => b.inventory.add(tamarasDagger));
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'I pick up a moldy rock that lies right next to my {left|right} foot. It\'s hard and heavy in my palm. As soon as I straighten up,\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Thanks, I'll take it." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(
              playerId, (b) => b.inventory.equip(tamarasDagger, a.anatomy));
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'I take the dagger and point it in the direction of the goblin. The hilt is thick, and the weapon feels heavy but balanced. Before I know it,\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'the goblin is out of the brush and ready to attack. He\'s gnashing his teeth and growls like a wolf. He taps his thigh with the blunt side of a rusty sword.\n',
        isRaw: true);
  }),
]);

class StartInk extends RoamingAction {
  @override
  final String name = 'start_ink';

  static final StartInk singleton = StartInk();

  @override
  List<String> get commandPathTemplate => ['N/A'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('start_bogus_location') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "start_ink_ink",
    ));
    return '${a.name} successfully performs StartInk';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room start = Room('start', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  w.pushSituation(InkSituation.initialized(
    w.randomInt(),
    "start_ink_ink",
  ));
}, null, null, null);
final Approach meadowFightFromStart =
    Approach('start', 'meadow_fight', r'$IMPLICIT', null);
final Room meadowFight = Room(
    'meadow_fight',
    null,
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    generateStartFight,
    null,
    positionX: 49,
    positionY: 99,
    mapName: 'Meadow',
    afterMonstersCleared: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      final ifBlock_3c0f034e2 = c.isHurt(tamaraId)
          ? '''Tamara is sitting on the ground now and tending to her wounds. "I'll survive, young sir. But you might not." She winces, and looks at me.'''
          : '''Tamara checks her gear and sheathes her sword. Then she looks at me.''';
      s.add(
          'My hands are shaking and I put them on the sides of my neck to stop the shudder. As a necromancer, I am used to death. The long, unmoving part of it, mostly. The lying in the earth. The peaceful, waiting death. \n\nBut this, this was something different entirely. Fast. Violent. Messy. This was the wild and savage face of death that I have not seen before. My hands are still shaking.\n\n\n',
          isRaw: true);
      Ruleset(
          Rule(1072603126, 2, false, (ApplicabilityContext c) {
            final WorldState w = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            return w.wasKilled(tamaraId) &&
                !w.getActorById(tamaraId).isAnimated;
          }, (ActionContext c) {
            final WorldState originalWorld = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            final WorldStateBuilder w = c.outputWorld;
            final Storyline s = c.outputStoryline;
            s.add(
                '"Sorry, Tamara." I kneel next to her and put her in the position of a proper warrior death, with back to the ground and arms crossed over the body.\n',
                isRaw: true);
          }),
          Rule(906032650, 2, false, (ApplicabilityContext c) {
            final WorldState w = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            return w.wasKilled(tamaraId) &&
                w.getActorById(tamaraId).anatomy.isUndead;
          }, (ActionContext c) {
            final WorldState originalWorld = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            final WorldStateBuilder w = c.outputWorld;
            final Storyline s = c.outputStoryline;
            s.add(
                'I look into Tamara\'s undead eyes.\n\n"I\'m sorry."\n\nShe doesn\'t respond, so I nod, and tell her corpse to follow me.\n',
                isRaw: true);
          }),
          Rule(708888700, 1, false, (ApplicabilityContext c) {
            final WorldState w = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            return !w.wasKilled(tamaraId);
          }, (ActionContext c) {
            final WorldState originalWorld = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            final WorldStateBuilder w = c.outputWorld;
            final Storyline s = c.outputStoryline;
            s.add('\nThe fight is over.\n\n', isRaw: true);
            Ruleset(Rule(827330017, 0, false, (ApplicabilityContext c) {
              final WorldState w = c.world;
              final Simulation sim = c.simulation;
              final Actor a = c.actor;
              return true;
            }, (ActionContext c) {
              final WorldState originalWorld = c.world;
              final Simulation sim = c.simulation;
              final Actor a = c.actor;
              final WorldStateBuilder w = c.outputWorld;
              final Storyline s = c.outputStoryline;
              s.add('"Well, that was (TBD)."\n\n', isRaw: true);
            })).apply(c);
            s.add(
                '\n$ifBlock_3c0f034e2 "Come with me back to safety. I\'ll give you a discount for the way back."\n\n_"Thanks for your service, Tamara. But I\'ve come this far."_\n\nTamara nods, and leaves without ceremony. In a few moments, she disappears among the trees and the bushes.\n\n',
                isRaw: true);
            w.updateActorById(tamaraId, (b) => b.isActive = false);
          }),
          Rule(991926294, 0, false, (ApplicabilityContext c) {
            final WorldState w = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            return true;
          }, (ActionContext c) {
            final WorldState originalWorld = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            final WorldStateBuilder w = c.outputWorld;
            final Storyline s = c.outputStoryline;
            throw StateError(
                "Tamara's state wasn't planned for: ${w.getActorById(tamaraId)}");
          })).apply(c);
      w.updateActorById(playerId, (b) => b..inventory.add(letterFromFather));
    },
    whereDescription: 'among the trees',
    groundMaterial: '{earth|dirt}');

class ReadLetterFromFather extends RoamingAction {
  @override
  final String name = 'read_letter_from_father';

  static final ReadLetterFromFather singleton = ReadLetterFromFather();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'letter from my father', 'read'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(c.isInIdleRoom && c.hasItem(letterFromFatherId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'I take the letter from my pocket and read it.\n\nSon,\n\nI learned about your plans from a family friend. Although I hope you don\'t mean to execute them, I am writing this letter. I will come back home as soon as I am able.\n\nThere is good life for you in Zamora, despite everything. The plains may seem dull to your young heart, but they are safe, and bountiful.\n\nI am surprised by the brash move. From you, of all people. Remember your health. Stay home and continue your training.\n\nAnd remember, revenge won\'t bring your brother back from the dead.\n\n- Father\n',
        isRaw: true);
    return '${a.name} successfully performs ReadLetterFromFather';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

class GuardpostAboveChurchTakeShield extends RoamingAction {
  @override
  final String name = 'guardpost_above_church_take_shield';

  static final GuardpostAboveChurchTakeShield singleton =
      GuardpostAboveChurchTakeShield();

  @override
  List<String> get commandPathTemplate => ['Cautiously take the shield'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('guardpost_above_church') != true) {
      return false;
    }
    if (!(w.actionNeverUsed(name))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'You silently approach the goblin, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs and leans his head to the side, but stays asleep.\n\n\nYou take a few slow steps back, then grip the shield in your left hand, ready for anything.\n',
        isRaw: true);
    return '${a.name} successfully performs GuardpostAboveChurchTakeShield';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'You silently approach the goblin, then wait a few moments. The goblin sniffs, moves, but stays asleep. You shift your weight on your right leg, leaning over the goblin and using the other leg as a counterweight. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move an inch, he\'ll wake up.\n',
        isRaw: true);
    w.pushSituation(GuardpostAboveChurchTakeShieldRescueSituation.initialized(
        w.randomInt()));
    return '${a.name} fails to perform GuardpostAboveChurchTakeShield';
  }

  @override
  ReasonedSuccessChance<Nothing> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return const ReasonedSuccessChance<Nothing>(0.3);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage =>
      'The goblin is asleep, but not soundly — the floor here is cold and uncomfortable, and the wall isn’t much of a headrest. Taking the shield from the goblin\'s lap will likely wake him up.';
  @override
  bool get isAggressive => false;
}

abstract class GuardpostAboveChurchTakeShieldRescueSituation extends Object
    with
        SituationBaseBehavior
    implements
        Built<GuardpostAboveChurchTakeShieldRescueSituation,
            GuardpostAboveChurchTakeShieldRescueSituationBuilder> {
  factory GuardpostAboveChurchTakeShieldRescueSituation(
      [void Function(GuardpostAboveChurchTakeShieldRescueSituationBuilder)
          updates]) = _$GuardpostAboveChurchTakeShieldRescueSituation;

  factory GuardpostAboveChurchTakeShieldRescueSituation.initialized(int id) {
    return GuardpostAboveChurchTakeShieldRescueSituation((b) {
      b.id = id;
      b.turn = 0;
    });
  }

  GuardpostAboveChurchTakeShieldRescueSituation._();

  static Serializer<GuardpostAboveChurchTakeShieldRescueSituation>
      get serializer =>
          _$guardpostAboveChurchTakeShieldRescueSituationSerializer;
  @override
  List<RoamingAction> get actions {
    return [
      SimpleAction(
          'guardpost_above_church_take_shield_rescue',
          'Stay perfectly still',
          (ActionContext c, self) {
            final WorldState originalWorld = c.world;
            final Simulation sim = c.simulation;
            final Actor a = c.actor;
            final WorldStateBuilder w = c.outputWorld;
            final Storyline s = c.outputStoryline;
            s.add(
                'You stay completely still. After a while, the strain of holding the awkward position start to show. Your left leg starts shaking. A bead of sweat is forming on your nose, threatening to fall on the goblin\'s leg.\n\n\n<p class="toast">Your stamina decreases by 1.</p>\n\n\nFortunately, the goblin shifts again and his expression gets visibly more relaxed. His breathing is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then grip the shield in your left hand, ready for anything.',
                isRaw: true);
            w.popSituation(c);
            w.updateActorById(a.id, (b) => b..stamina -= 1);

            return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)';
          },
          'If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)',
          isApplicableClosure: (ApplicabilityContext c, Actor a, Simulation sim,
              WorldState w, self) {
            return a.stamina > 0;
          }),
      SimpleAction('guardpost_above_church_take_shield_continuation_of_failure',
          'Snatch the shield', (ActionContext c, self) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'You snatch the shield and jump back next to Briana. The goblin wakes up instantly, and he gets his bearings surprisingly fast. He jumps up and points his scimitar at you.\n\n\nYou look at Briana. Both of you are ready to fight.',
            isRaw: true);
        w.popSituation(c);
        return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)';
      }, 'You can quickly snatch the shield, jump back and prepare for a fight.')
    ];
  }

  @override
  int get id;
  @override
  int get turn;
  @override
  String get name {
    return 'guardpost_above_church_take_shield';
  }

  @override
  Situation elapseTurn() => rebuild((b) {
        return b..turn += 1;
      });
  @override
  ActorTurn getNextTurn(Simulation sim, WorldState w) {
    if (turn != 0) return ActorTurn.never;
    var player = w.actors.singleWhere((a) => a.isPlayer);
    return ActorTurn(player, w.time);
  }

  @override
  Iterable<Actor> getActors(Simulation sim, WorldState w) {
    return [
      w.actors.singleWhere((Actor a) {
        return a.isPlayer;
      })
    ];
  }
}

final allRooms = <Room>[
  testRandomEncounter,
  bigOObservatory,
  bigOAntechamber,
  topOfClimb,
  crowdsource,
  barracks,
  conet,
  maintenanceShaft,
  smithy,
  elevator28,
  godsLair,
  godsLairAfterNecromancy,
  junction,
  reservoir,
  reservoirAfterOpenDam,
  cockroachFarm,
  trainingGrounds,
  battlefield,
  oracleMain,
  jungleEntrance,
  deathlessVillage,
  dragonEgg,
  knightsHqMain,
  elevator12,
  slopes,
  stagingArea,
  farmersVillage,
  keepGate,
  keepBedroom,
  keepDining,
  keepServants,
  floatingPoint,
  pyramidEntrance,
  bleedsMain,
  bleedsTraderHut,
  goblinSkirmishPatrol,
  goblinSkirmishSneak,
  goblinSkirmishMain,
  startTesterBuild,
  start,
  meadowFight
];
final allApproaches = <Approach>[
  endOfRoamFromTestRandomEncounter,
  testRandomEncounterFromStartTesterBuild,
  bigOObservatoryFromBigOAntechamber,
  bigOAntechamberFromBigOObservatory,
  bigOAntechamberFromCrowdsource,
  topOfClimbFromBarracks,
  crowdsourceFromBarracks,
  crowdsourceFromBigOAntechamber,
  barracksFromCrowdsource,
  barracksFromJunction,
  barracksFromTopOfClimb,
  conetFromSmithy,
  maintenanceShaftFromElevator28,
  smithyFromConet,
  smithyFromJunction,
  elevator28FromElevator12,
  elevator28FromGodsLair,
  elevator28FromJunction,
  elevator28FromMaintenanceShaft,
  godsLairFromElevator28,
  junctionFromBarracks,
  junctionFromCockroachFarm,
  junctionFromElevator28,
  junctionFromReservoir,
  junctionFromSmithy,
  reservoirFromJunction,
  reservoirFromTrainingGrounds,
  cockroachFarmFromJunction,
  trainingGroundsFromBattlefield,
  trainingGroundsFromReservoir,
  battlefieldFromKnightsHqMain,
  battlefieldFromTrainingGrounds,
  oracleMainFromKnightsHqMain,
  jungleEntranceFromDeathlessVillage,
  jungleEntranceFromStagingArea,
  deathlessVillageFromDragonEgg,
  deathlessVillageFromJungleEntrance,
  dragonEggFromDeathlessVillage,
  knightsHqMainFromBattlefield,
  knightsHqMainFromElevator12,
  knightsHqMainFromOracleMain,
  knightsHqMainFromStagingArea,
  elevator12FromElevator28,
  elevator12FromKnightsHqMain,
  slopesFromFarmersVillage,
  stagingAreaFromFarmersVillage,
  stagingAreaFromJungleEntrance,
  stagingAreaFromKeepGate,
  stagingAreaFromKnightsHqMain,
  stagingAreaFromPyramidEntrance,
  farmersVillageFromFloatingPoint,
  farmersVillageFromPyramidEntrance,
  farmersVillageFromSlopes,
  farmersVillageFromStagingArea,
  keepGateFromKeepBedroom,
  keepGateFromStagingArea,
  keepBedroomFromKeepDining,
  keepBedroomFromKeepGate,
  keepBedroomFromKeepServants,
  keepDiningFromKeepBedroom,
  keepServantsFromKeepBedroom,
  keepServantsFromTopOfClimb,
  floatingPointFromFarmersVillage,
  pyramidEntranceFromBleedsMain,
  pyramidEntranceFromFarmersVillage,
  pyramidEntranceFromStagingArea,
  bleedsMainFromBleedsTraderHut,
  bleedsMainFromGoblinSkirmishMain,
  bleedsMainFromGoblinSkirmishSneak,
  bleedsMainFromMeadowFight,
  bleedsMainFromPyramidEntrance,
  bleedsMainFromStartTesterBuild,
  bleedsTraderHutFromBleedsMain,
  endOfRoamFromBleedsMain,
  goblinSkirmishPatrolFromBleedsMain,
  goblinSkirmishSneakFromBleedsMain,
  goblinSkirmishSneakFromGoblinSkirmishPatrol,
  goblinSkirmishMainFromBleedsMain,
  startTesterBuildFromPreStartBook,
  startFromStartTesterBuild,
  meadowFightFromStart
];
final allActions = <RoamingAction>[
  KarlListenToGuards.singleton,
  KarlUseNecromancy.singleton,
  KarlTakeStar.singleton,
  ReservoirOpenDam.singleton,
  GiveLairOfGodStarToDeathless.singleton,
  DebugSearchForKatana.singleton,
  UseCompass.singleton,
  TalkToKatAboutBrother.singleton,
  TalkToKatGreetings.singleton,
  TalkToMiguelAboutBrother.singleton,
  TalkToMiguelGreetings.singleton,
  BleedsMainObserveSmoke.singleton,
  BleedsMainObserveVillage.singleton,
  BleedsBlindGuideGoblins.singleton,
  BleedsBlindGuideGreet.singleton,
  BleedsBlindGuideTerribleIdea.singleton,
  BleedsTraderGoblinSmoke.singleton,
  BleedsTraderGoblins.singleton,
  BleedsTraderGreet.singleton,
  BleedsTraderTellAboutClearedCamp.singleton,
  GoblinCampAttack.singleton,
  ListenContinue.singleton,
  ListenMore.singleton,
  ListenToThemArguing.singleton,
  ObserveGoblinCamp.singleton,
  StartInk.singleton,
  ReadLetterFromFather.singleton,
  GuardpostAboveChurchTakeShield.singleton
];
final allInks = <String, InkAst>{
  'talk_to_kat_greetings_ink': talkToKatGreetingsInk,
  'talk_to_miguel_about_brother_ink': talkToMiguelAboutBrotherInk,
  'talk_to_miguel_greetings_ink': talkToMiguelGreetingsInk,
  'start_ink_ink': startInkInk
};
