// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// WritersInputGenerator
// **************************************************************************

// ignore_for_file: constant_identifier_names
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: unused_local_variable
// ignore_for_file: unused_import
// ignore_for_file: unnecessary_parenthesis
// ignore_for_file: lines_longer_than_80_chars
// ignore_for_file: type_annotate_public_apis
// ignore_for_file: prefer_const_constructors

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
    Approach('big_o_antechamber', 'big_o_observatory', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return w.actionHasBeenPerformed('open_antechamber_lock');
});
final Room bigOObservatory = Room('big_o_observatory', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A tiny floor overlooking the Bay and the ruins of San Francisco.\n\nTODO: A device similar to Conet is here.\n\nTODO: during a pre-fight dialogue sequence, we find out Big O is actually a human with a dog head. He\'s a necromancer who has lived hundreds of years, and he seeded the "Doghead will save us" myth generations ago, as an escape hatch. His ultimate goal was to prevent another apocalypse by instituting strict order, amassing power, and knowledge. Humanity cannot lose knowledge if it\'s in the mind of an immortal. The quakes were a way to attract mountain giants. The Orcs and goblins were brought on the myth of Doghead, and the promise of power over the other races.\n\nTODO: fight with Osiris. Assuming a win (otherwise, death).\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 26, positionY: 8, mapName: 'Observatory');
final Approach endOfRoamFromBigOObservatory = Approach(
    'big_o_observatory', '__END_OF_ROAM__', r'$IMPLICIT', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'I have prevailed.\n\nTODO: an end, in which Aren (the player) shows the Dog\'s head to the people. Most of the Orcs and goblins flee. Aren is revered. A darkness is lifted from Sarn\'s mind, and he is no longer insane. He explains his past mistakes, and apologizes.\n\nThe end.\n',
      isRaw: true);
});
final Approach bigOAntechamberFromCrowdsource =
    Approach('crowdsource', 'big_o_antechamber', '', null);
final Approach bigOAntechamberFromTopOfClimb =
    Approach('top_of_climb', 'big_o_antechamber', '', null);

class ExamineAntechamberLock extends RoamingAction {
  @override
  final String name = 'examine_antechamber_lock';

  static final ExamineAntechamberLock singleton = ExamineAntechamberLock();

  @override
  List<String> get commandPathTemplate => ['lock mechanism', 'examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('big_o_antechamber') != true) {
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
    final ifBlock_6892af2b6 = c.hasItem(akxeId)
        ? '''After a few moments, I realize the shape of the lock reminds me of something ancient. I look at the akxe and its hilt. It will fit.'''
        : '''''';
    s.add(
        'It is a long slit with an irregular shape. If it\'s meant to be opened by a key, the key must be massive, and weirdly shaped.\n\n\n$ifBlock_6892af2b6\n',
        isRaw: true);
    return '${a.name} successfully performs ExamineAntechamberLock';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ExamineAntechamberLock';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class OpenAntechamberLock extends RoamingAction {
  @override
  final String name = 'open_antechamber_lock';

  static final OpenAntechamberLock singleton = OpenAntechamberLock();

  @override
  List<String> get commandPathTemplate => ['lock mechanism', 'open with akxe'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('big_o_antechamber') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('examine_antechamber_lock') &&
        c.hasItem(akxeId))) {
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
        'I insert the hilt of Darg\'s akxe to the lock mechanism. It fits perfectly. Something in the trapdoor clicks, and it slowly opens.\n',
        isRaw: true);
    return '${a.name} successfully performs OpenAntechamberLock';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OpenAntechamberLock';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room bigOAntechamber = Room('big_o_antechamber', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A dark room without windows. A stone staircase leads up to a trap door in the ceiling.\n\nA curious lock mechanism guards the trap door from being opened.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 26, positionY: 12, mapName: 'Antechamber');
final Approach dargTentFromBarracks =
    Approach('barracks', 'darg_tent', '', null);

class DargTentAttack extends RoamingAction {
  @override
  final String name = 'darg_tent_attack';

  static final DargTentAttack singleton = DargTentAttack();

  @override
  List<String> get commandPathTemplate => ['Darg', 'Attack'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('darg_tent_after_darg_arrived') != true) {
      return false;
    }
    if (!(c.hasHappened(evDargLeftCrowdsource) &&
        !c.hasHappened(evKilledDarg))) {
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
    s.add('TODO: a fight with Darg and his one guard. Assume victory.\n\n',
        isRaw: true);
    w.updateActorById(
        dargId,
        (b) => b
          ..inventory.remove(akxe)
          ..hitpoints = 0);
    c.giveNewItemToPlayer(akxe);
    c.markHappened(evKilledDarg);

    s.add(
        '\nTODO: After I defeat him, Darg\'s head starts to talk. There is no question that this is a necromancer talking through the newly deceased Darg. I am (once again?) impressed that a necromancer can be so precise at their craft. The necromancer discourages me from going to the very top of the Pyramid. "Last chance to turn around."\n\nI take Darg\'s akxe.\n',
        isRaw: true);
    return '${a.name} successfully performs DargTentAttack';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DargTentAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room dargTent = Room('darg_tent', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Tent outside, at the top of the elevator structure. Overlooking the bay. Some important orc must be stationed here.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 33, positionY: 24, mapName: 'Darg\'s tent');
final Room dargTentAfterDargArrived = Room(
    'darg_tent_after_darg_arrived',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Tent outside, at the top of the elevator structure. Overlooking the bay. Darg is here.\n\nTODO: Image of Darg, a huge orc with a big axe ("akxe").\n',
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
    null,
    null,
    parent: 'darg_tent',
    prerequisite: Prerequisite(910482930, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evDargLeftCrowdsource) &&
          !c.hasHappened(evKilledDarg);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Darg is here.\n\nTODO: Image of Darg, a huge orc with a big axe ("akxe").\n',
          isRaw: true);
    },
    positionX: 33,
    positionY: 24,
    mapName: 'Darg\'s tent');
final Room dargTentAfterDargKilled = Room(
    'darg_tent_after_darg_killed',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Tent outside, at the top of the elevator structure. Overlooking the bay. Some important orc must be stationed here.\n',
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
    null,
    null,
    parent: 'darg_tent',
    prerequisite: Prerequisite(831974385, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evKilledDarg);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('Darg won\'t be needing this tent anymore.\n', isRaw: true);
    },
    positionX: 33,
    positionY: 24,
    mapName: 'Darg\'s tent');
final Approach topOfClimbFromBarracks =
    Approach('barracks', 'top_of_climb', '', null);
final Approach topOfClimbFromBigOAntechamber =
    Approach('big_o_antechamber', 'top_of_climb', '', null);
final Approach topOfClimbFromKeepServants =
    Approach('keep_servants', 'top_of_climb', '', null);
final Room topOfClimb = Room('top_of_climb', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A huge, dark pit. The bottom is unseen, in complete darkness.\n\nOrc language is heard from behind the walls.\n\n',
      isRaw: true);
  c.learn(OrcsFacts.inPyramid);
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

class CrowdsourceAttack extends RoamingAction {
  @override
  final String name = 'crowdsource_attack';

  static final CrowdsourceAttack singleton = CrowdsourceAttack();

  @override
  List<String> get commandPathTemplate => ['Orcs', 'Attack'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('crowdsource') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('crowdsource_listen') &&
        !c.hasHappened(evDargLeftCrowdsource) &&
        !c.hasHappened(evKilledDarg))) {
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
        'TODO: a big fight, probably lost cause unless player is really powerful. Debug assumes victory here (because the alternative is always death).\n\n',
        isRaw: true);
    w.updateActorById(
        dargId,
        (b) => b
          ..inventory.remove(akxe)
          ..hitpoints = 0);
    c.giveNewItemToPlayer(akxe);
    c.markHappened(evKilledDarg);

    s.add(
        '\nTODO: After I defeat him, Darg\'s head starts to talk. There is no question that this is a necromancer talking through the newly deceased Darg. I am (once again?) impressed that a necromancer can be so precise at their craft. The necromancer discourages me from going to the very top of the Pyramid. "Last chance to turn around."\n\nI take Darg\'s akxe.\n',
        isRaw: true);
    return '${a.name} successfully performs CrowdsourceAttack';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CrowdsourceAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class CrowdsourceListen extends RoamingAction {
  @override
  final String name = 'crowdsource_listen';

  static final CrowdsourceListen singleton = CrowdsourceListen();

  @override
  List<String> get commandPathTemplate => ['Orcs', 'Listen'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('crowdsource') != true) {
      return false;
    }
    if (!(!c.hasHappened(evDargLeftCrowdsource) &&
        !c.hasHappened(evKilledDarg))) {
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
        'I hear a heated debate. There\'s the leader of the orcs, called Darg. There is another orc, and a high-ranking goblin.\n\nThe others are trying to persuade Darg to open the antechamber\n\nTODO: Image of Darg, a huge orc with a big axe ("akxe").\n\nTODO: It is obvious that attacking now would be inadvisable unless the player is well prepared.\n',
        isRaw: true);
    return '${a.name} successfully performs CrowdsourceListen';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CrowdsourceListen';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room crowdsource = Room('crowdsource', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      'A temple. Some orcs are talking. $weSubstitutionCapitalized stay hidden.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 27, positionY: 29, mapName: 'Crowd\'s Temple');
final Room crowdsourceAfterOrcsLeft = Room(
    'crowdsource_after_orcs_left',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      final weSubstitutionCapitalized =
          getWeOrI(a, sim, originalWorld, capitalized: true);
      s.add(
          'A temple. Some orcs are talking. $weSubstitutionCapitalized stay hidden.\n',
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
    null,
    null,
    parent: 'crowdsource',
    prerequisite: Prerequisite(586291809, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evDargLeftCrowdsource) &&
          !c.hasHappened(evKilledDarg);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The orcs are gone.\n', isRaw: true);
    },
    positionX: 27,
    positionY: 29,
    mapName: 'Crowd\'s Temple');
final Approach barracksFromCrowdsource =
    Approach('crowdsource', 'barracks', '', null);
final Approach barracksFromDargTent =
    Approach('darg_tent', 'barracks', '', null);
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
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      'A large room taking up two floors. Bunk beds, and a dining area. $weSubstitutionCapitalized stay hidden.\n',
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
final conetExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'TODO: Explain that this device is obviously what makes the quakes. There are massive stones being lifted. There are cracks in the walls and the floor, radiating from the center of the device.\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('The kobolds are complaining about being worked to death this day.\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.sawConet);
  }),
]);

class ConetAttack extends RoamingAction {
  @override
  final String name = 'conet_attack';

  static final ConetAttack singleton = ConetAttack();

  @override
  List<String> get commandPathTemplate => ['Kobolds', 'Attack'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('conet') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('conet_examine'))) {
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
        'TODO: actual fight. Assuming victory.\n\nTODO: one of the kobolds is actually undead. He talks to me during the fight and after I kill him. It is obvious that the talking is done remotely, by some necromancer with amazing skill. The necromancer is discouraging me from getting involved.\n\n',
        isRaw: true);
    c.markHappened(evConetDestroyed);

    return '${a.name} successfully performs ConetAttack';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ConetAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class ConetExamine extends RoamingAction {
  @override
  final String name = 'conet_examine';

  static final ConetExamine singleton = ConetExamine();

  @override
  List<String> get commandPathTemplate => ['Kobolds', 'Examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('conet') != true) {
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
      "conet_examine_ink",
    ));
    return '${a.name} successfully performs ConetExamine';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ConetExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room conet = Room('conet', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      'Some kobolds operating a large device. They are turning a huge wheel, drawing some kind of spring, and lifting huge rocks into position.\n\nA primitive writing on the entrance says "Conet".\n\n$weSubstitutionCapitalized stay hidden.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 17, positionY: 34, mapName: 'Conet');
final Room conetAfterClearing = Room(
    'conet_after_clearing',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The room is silent.\n', isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'conet',
    prerequisite: Prerequisite(357396258, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evConetDestroyed);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('Now, the room is silent.\n', isRaw: true);
    },
    positionX: 17,
    positionY: 34,
    mapName: 'Conet');
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
        'The two are laughing.\n\n"He ate it whole, didn\'t he?" the orc captain says. "I\'ve never seen Karl do that."\n\n"We should feed him something even bigger next time," the berserker smirks. "A horse, maybe."\n\n"Get a horse carcass up here and we\'ll do it. The fucker is sleeping like a baby, and I think it\'s because of the size of the food."\n\nThe berserker nods. "Even better, it looks like we don\'t need to worry about chopping the carcasses from now on."\n\n"Yah. A whole hawkman in one swallow." The captain shakes his head. "Karl is full of surprises, isn\'t he."\n',
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
    return '${a.name} fails to perform KarlListenToGuards';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
        'TODO: I perform necromancy. I feel I have awaken something human-sized but not entirely human. Then, terrible roar and thrashing comes from beyond the gate.\n\n',
        isRaw: true);
    Ruleset(
        Rule(715270306, 1, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return !c.hasHappened(evKarlGuardsKilled);
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '\n"What\'s going on?" the berserker asks and picks up his battle axe. "What\'s going on with Karl?"\n\nTODO: They go in, and are killed. Then, some more thrashing, then silence.\n\n',
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
    return '${a.name} fails to perform KarlUseNecromancy';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  s.add('', isRaw: true);
}, null, null,
    positionX: 34,
    positionY: 40,
    mapName: 'Maintenance Shaft above 28th Floor');
final Approach smithyFromConet = Approach('conet', 'smithy', '', null);
final Approach smithyFromJunction = Approach('junction', 'smithy', '', null);

class SaveSarn extends RoamingAction {
  @override
  final String name = 'save_sarn';

  static final SaveSarn singleton = SaveSarn();

  @override
  List<String> get commandPathTemplate => ['Jailer', 'Attack'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('smithy') != true) {
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
        'TODO: fight. Assuming victory.\n\nTODO: I try to talk to Sarn, but he doesn\'t respond. He\'s trying to keep forging the weapons. "I must do this, the jailer told me to do this." Finally, I snap Sarn out of it, at least to stop forging and follow me.\n\nTODO: I take Sarn (and his hammer) through the Pyramid and outside, where he starts sobbing. I try to be mad at Sarn but instead I just take Sarn to Jisad and leave him there. He\'ll be safe at Jisad\'s.\n\n\nAs I leave the hut, I nod to both men, and Jisad, though blind, seems to notice the nod while Sarn doesn\'t.\n\nI sigh and turn my back to them, and walk out to The Bleeds. This has not happened the way I imagined it.\n\n',
        isRaw: true);
    c.markHappened(evSavedSarn);
    c.movePlayer('bleeds_main');

    return '${a.name} successfully performs SaveSarn';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SaveSarn';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room smithy = Room('smithy', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'My brother, Sarn, working for the orcs, forging weapons. He seems not fully aware of his surroundings.\n\n',
      isRaw: true);
  c.learn(SarnFacts.seenPersonally);

  s.add(
      '\nHe is being guarded by an orcish jailer.\n\nTODO: Image of the two.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 24, positionY: 40, mapName: 'Smithy');
final Room smithyAfterSarnSaved = Room(
    'smithy_after_sarn_saved',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The smithy is empty and silent.\n', isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'smithy',
    prerequisite: Prerequisite(476050921, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evSavedSarn);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The smithy is empty and silent now.\n', isRaw: true);
    },
    positionX: 24,
    positionY: 40,
    mapName: 'Smithy');
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
      'Orc noises from all around, but thankfully no orc in sight. $ifBlock_753ddd0b\n\n',
      isRaw: true);
  c.learn(OrcsFacts.inPyramid);
}, null, null,
    positionX: 32,
    positionY: 42,
    mapName: 'Elevator Shaft Entrance on 28th Floor');
final Approach godsLairFromElevator28 =
    Approach('elevator_28', 'gods_lair', '', null);

class KarlExamineStar extends RoamingAction {
  @override
  final String name = 'karl_examine_star';

  static final KarlExamineStar singleton = KarlExamineStar();

  @override
  List<String> get commandPathTemplate => ['star decoration', 'Examine'];
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
    s.add(
        'The star is small enough to fit into my palm. It says "Lair of God".\n\nTODO: image of a "Lamb of God" christmas star, but the writing is so mangled that it could be mistaken for "Lair of God"\n\n',
        isRaw: true);
    c.learn(ArtifactStarFacts.artifactStarSeen);

    return '${a.name} successfully performs KarlExamineStar';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform KarlExamineStar';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class KarlTakeStar extends RoamingAction {
  @override
  final String name = 'karl_take_star';

  static final KarlTakeStar singleton = KarlTakeStar();

  @override
  List<String> get commandPathTemplate => ['Artifact Star', 'Take'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('gods_lair') != true) {
      return false;
    }
    if (!(c.isInIdleRoom && w.actionHasBeenPerformed("karl_examine_star"))) {
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
    s.add('I take the star.\n\n', isRaw: true);
    c.giveNewItemToPlayer(lairOfGodStar);

    return '${a.name} successfully performs KarlTakeStar';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform KarlTakeStar';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
      s.add('', isRaw: true);
    },
    generateGodsLairFight,
    null,
    isIdle: true,
    positionX: 35,
    positionY: 42,
    mapName: 'God\'s Lair',
    firstMapName: 'A guard room',
    hint:
        'A temple to the ancients, overtaken by the orcs some time ago. For them, it serves as a pen for a huge creature, Karl.',
    firstHint:
        'An antechamber to a much bigger room, with a guard post and a huge, reinforced gate.',
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
final Room godsLairAfterNecromancy = Room(
    'gods_lair_after_necromancy',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The gate is open. On it, there is a small star decoration.\n\nBeyond the gate, a giant\'s carcass lies. Its belly is teared open from the inside, by a humanoid figure with a bird head. Two dead orcs lie next to a wall.\n',
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
    null,
    null,
    parent: 'gods_lair',
    prerequisite: Prerequisite(727361369, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evKarlKilledViaNecromancy);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The gate is severly damaged. Through a crack, I can see a giant\'s carcass. Its belly is teared open from the inside, by a humanoid figure with a bird head.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 35,
    positionY: 42,
    mapName: 'God\'s Lair',
    firstMapName: 'A guard room',
    hint:
        'A temple to the ancients, overtaken by the orcs some time ago. For them, it serves as a pen for a huge creature, Karl.',
    firstHint:
        'An antechamber to a much bigger room, with a guard post and a huge, reinforced gate.',
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
    return '${a.name} fails to perform ReservoirOpenDam';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  s.add(
      'A large, filthy pool in the middle of the building, covered with a layer of green sludge. The reservoir was clearly built by the ancients, with their straight lines and craftsmanship of the highest quality.\n\nThere\'s an iron dam here.\n',
      isRaw: true);
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
    isIdle: true,
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
final Room cockroachFarmAfterOpenDam = Room(
    'cockroach_farm_after_open_dam',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'I am in a maze of twisty little passages, all alike. A few wet cockroaches are crawling around, but most of the place is empty.\n',
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
    null,
    null,
    parent: 'cockroach_farm',
    prerequisite: Prerequisite(743707558, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The whole area is wet. There are puddles of water everywhere, and a few cockroaches scurrying between them.\n',
          isRaw: true);
    },
    positionX: 29,
    positionY: 52,
    mapName: 'Cockroach Farm');
final Approach trainingGroundsFromBattlefield =
    Approach('battlefield', 'training_grounds', '', null);
final Approach trainingGroundsFromReservoir =
    Approach('reservoir', 'training_grounds', '', null);
final Room trainingGrounds = Room('training_grounds', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('An army of orcs, goblins and kobolds, all training for war.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 21, positionY: 54, mapName: 'Training Grounds');
final Room trainingGroundsAfterDamOpened = Room(
    'training_grounds_after_dam_opened',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'An army of orcs, goblins and kobolds, all training for war.\n\nThe training grounds are dripping wet.\n',
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
    null,
    null,
    parent: 'training_grounds',
    prerequisite: Prerequisite(254551937, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The training grounds are dripping wet.\n', isRaw: true);
    },
    positionX: 21,
    positionY: 54,
    mapName: 'Training Grounds');
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
          'It\'s very different from the other floors. There are no walls, and from the staircase opening one can see all the windows. There are rows of columns and two larger structures housing the staircases and the elevator, but this is the closest the Pyramid has to an open field. There is a strange smell here that I can\'t quite place.\n\nAs soon as $weSubstitution climb the last stair and enter the floor proper, two orcs step out from behind the columns. One of them is wearing a red tunic and wields a serrated sword. Possibly a captain of some kind. The other one has the usual brown leather jerkin and wields a battle axe.\n\n"Big mistake," the red orc is saying with mock sadness. "Big mistake for you. This is no longer a place for human swine."\n\n"Big mistake for him," the leather jerkin agrees. "But good news for us. Darg rewards human scalps."\n\nThe two orcs attack.\n\n',
          isRaw: true);
      c.learn(OrcsFacts.inPyramid);
      c.learn(SixtyFiversFacts.shieldSeen);
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
          '$weSubstitutionCapitalized stand in the middle of this large room and for the first time I notice the faint smell of old, dried blood. Except for the new ones, there is no corpse here. The orcs moved them elsewhere, or maybe they just tossed them through the window panes. The blood, though, they did not clear. And so death is here, filling the room, like steam fills a room after hot bath.\n\nA glorious battle this was, I\'m sure. It became a scab.\n\nWhatever the reason for this cleared space had been in the ancient times, I can imagine how the Knights preferred it for battle when they still had the numbers. There is no way to go past it, and the plan is so open you can conceivably use archers, and formations.\n\nTODO: explain the banner - an important source of pride for the Knights\n\nI take the banner.\n\n',
          isRaw: true);
      c.giveNewItemToPlayer(banner);
    },
    whereDescription: 'among the columns');
final Approach oracleMainFromKnightsHqMain =
    Approach('knights_hq_main', 'oracle_main', '', null);
final Room oracleMain = Room('oracle_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('An old woman is here.\n\n', isRaw: true);
  c.describeWorthiness(
      who: oracle,
      what: [
        akxeId,
        compassId,
        dragonEggId,
        lairOfGodStarId,
        northSkullId,
        sixtyFiverShieldId
      ],
      especially: [compassId, northSkullId],
      how: "{approvingly|with respect}");
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  c.describeWorthiness(
      who: oracle,
      what: [
        akxeId,
        compassId,
        dragonEggId,
        lairOfGodStarId,
        northSkullId,
        sixtyFiverShieldId
      ],
      especially: [compassId, northSkullId],
      how: "{approvingly|with respect}");
}, null, null,
    isIdle: true, positionX: 39, positionY: 65, mapName: 'Oracle\'s');
final talkToOracleDeathlessInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"They are a cult. They worship the ancients, and all artifacts from them. They\'ve been here in the Pyramid for longer than the farmers, or the Knight, or the orcs."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OrcsFacts.inPyramid);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"They used to inhabit a lot more of the Pyramid. These days, they live in a village in the part known as the Jungle. It\'s the big hole in the building on the west side, overgrown with vegetation."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(DeathlessFacts.location);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"The Deathless are not dangerous. I think they want to live forever but... who doesn\'t."\n',
        isRaw: true);
  }),
]);
final talkToOracleDogheadInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"There\'s a prophesy. A man with a dog\'s head will come and save this place. The Pyramid was never an easy place to live in. Even before the Orcs came, death and violence was common."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OrcsFacts.inPyramid);
    c.learn(DogheadFacts.dogheadMyth);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"The Knights have been stationed here for generations, but even a force such as that cannot fully prevent peril in a place like San Francisco. The woods have been always crawling with vile creatures. The power of the Pyramid has always attracted the corrupt and the evil. I think the villagers and the farmers clinged to this tale. It gives them hope."\n',
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
        '"Now, with the Orcs and Big O and goblins, the popularity of the tale of the Doghead is only getting stronger."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(BigOFacts.someoneCalledBigO);
  }),
]);
final talkToOracleDragonEggInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"What can I tell you about the Dragon Egg! Ha! A small, powerful thing. An end to any dispute. Shame it\'s in the wrong hands."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Whose hands?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"The Deathless! They have had it for generations. It\'s ancient, after all. But in a remarkably good shape, I\'ll tell you. Something about this place just makes ancient things last."\n',
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
    c.learn(DragonEggFacts.deathlessHaveIt);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why are Deathless the 'wrong hands' for it?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"They won\'t use it. It\'s a relic for them."\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "How can I get it?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Ha! You can\'t, young sir. The Deathless have been using it as a holy symbol for generations. They won\'t just give it away."\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
]);
final talkToOracleEarthquakesInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"The quakes." She stomps her foot on the ground and grins. "The quakes are terrible. Terrible! Fascinating. I have a little theory."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What theory?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"A theory is when you have an explanation for something but can\'t prove it yet."\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "I knew that." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"Did you, now." Oracle looks at you with piercing eyes. "I guess you did, young sir." She smiles.\n',
                    isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "Tell me your earthquake theory." """.trim(),
            consequence: [],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "Tell me." """.trim(),
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
        '"I think that Big O is behind the quakes. I think they\'re not earthquakes, really. I think that they\'re coming from the top of the Pyramid, not the ground."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(BigOFacts.someoneCalledBigO);
    c.learn(ConetFacts.quakesFromTop);
  }),
]);
final talkToOracleGreetingsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Greetings to you, too, young sir. I am Oracle. Bring me good information, and I will repay you with good information."\n',
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
        'TODO: she has a raven who can talk and sometimes interrupts conversation\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OracleFacts.personally);
  }),
]);
final talkToOracleOrcsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"There are still things I\'d like to see again, up there. The Lair of God is one. It was a beautiful temple, 2 floors high, with spectacular views of the Bay. Built by the Deathless. It had an artifact in it, an ancient star. But it was taken over by the orcs, and they have some creature there. Something big."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ArtifactStarFacts.lairOfGodTempleTakenByOrcs);
    c.learn(ArtifactStarFacts.artifactStarInLairOfGod);
    c.learn(DeathlessFacts.somethingCalledDeathless);
  }),
]);
final talkToOracleQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Ah yes, these happen quite often."\n', isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.quakesOften);
  }),
]);
final talkToOracleSixtyFiverInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"These are artifacts left by the ancients that puzzle the good and delight the evil. Why would the ancients, in their wisdom, leave behind such beatiful renditions of an evil number?"\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why is 65 evil?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"You know the two forces, four directions, eight gods, and so on. All the good things, all the true things, come in perfect numbers. Sixty four is one of them. Sixty four callings. Sixty five is a spit in the face of truth. It\'s like taking a symbol of Tengri, but putting it upside down. We don\'t know why the ancients chose 65 as a number to be printed and shown, to be _obeyed._ They must have had their reason." Oracle runs her fingers through her hair.\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Do you have a theory?" """.trim(),
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
        '"I think the orcs love it. It gives them a way to say: Look! The ancients had evil in them. The culture you so revere is a failed, evil empire. Something like that."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(SixtyFiversFacts.significance);
  }),
]);

class AskOracleAboutKeep extends RoamingAction {
  @override
  final String name = 'ask_oracle_about_keep';

  static final AskOracleAboutKeep singleton = AskOracleAboutKeep();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"What can you tell me about the Keep?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings"))) {
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
    s.add('"I worked there as a kid."\n\n', isRaw: true);
    c.learn(KeepGateFacts.oracleWorkedInKeep);

    return '${a.name} successfully performs AskOracleAboutKeep';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AskOracleAboutKeep';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class AskOracleAboutKeepGate extends RoamingAction {
  @override
  final String name = 'ask_oracle_about_keep_gate';

  static final AskOracleAboutKeepGate singleton = AskOracleAboutKeepGate();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"Can you help me open the Keep?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.knows(KeepGateFacts.oracleWorkedInKeep))) {
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
    s.add('Oracle describes a convoluted series of steps to open the gate.\n\n',
        isRaw: true);
    c.learn(KeepGateFacts.keepGateUnlock);

    return '${a.name} successfully performs AskOracleAboutKeepGate';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AskOracleAboutKeepGate';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class OracleGiveNorthSkull extends RoamingAction {
  @override
  final String name = 'oracle_give_north_skull';

  static final OracleGiveNorthSkull singleton = OracleGiveNorthSkull();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'North Skull', 'Give to Oracle'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.hasItem(northSkullId))) {
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
    s.add('Oracle is very thankful.\n\n', isRaw: true);
    c.removeItemFromPlayer(northSkullId);

    return '${a.name} successfully performs OracleGiveNorthSkull';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OracleGiveNorthSkull';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleDeathless extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_deathless';

  static final TalkToOracleDeathless singleton = TalkToOracleDeathless();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"Who are the Deathless?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.knows(DeathlessFacts.somethingCalledDeathless))) {
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
      "talk_to_oracle_deathless_ink",
    ));
    return '${a.name} successfully performs TalkToOracleDeathless';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleDeathless';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleDoghead extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_doghead';

  static final TalkToOracleDoghead singleton = TalkToOracleDoghead();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"Tell me about Doghead."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        c.knows(DogheadFacts.somethingCalledDoghead) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings"))) {
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
      "talk_to_oracle_doghead_ink",
    ));
    return '${a.name} successfully performs TalkToOracleDoghead';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleDoghead';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleDragonEgg extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_dragon_egg';

  static final TalkToOracleDragonEgg singleton = TalkToOracleDragonEgg();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"What can you tell me about the Dragon Egg?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.knows(DragonEggFacts.anAncientWeapon) &&
        !c.knows(DragonEggFacts.deathlessHaveIt))) {
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
      "talk_to_oracle_dragon_egg_ink",
    ));
    return '${a.name} successfully performs TalkToOracleDragonEgg';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleEarthquakes extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_earthquakes';

  static final TalkToOracleEarthquakes singleton = TalkToOracleEarthquakes();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"What can you tell me about the earthquakes here?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        c.knows(ConetFacts.quakesOften) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings"))) {
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
      "talk_to_oracle_earthquakes_ink",
    ));
    return '${a.name} successfully performs TalkToOracleEarthquakes';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleEarthquakes';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_greetings';

  static final TalkToOracleGreetings singleton = TalkToOracleGreetings();

  @override
  List<String> get commandPathTemplate => ['Woman', 'Talk', '"Greetings."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive))) {
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
      "talk_to_oracle_greetings_ink",
    ));
    return '${a.name} successfully performs TalkToOracleGreetings';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleOrcs extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_orcs';

  static final TalkToOracleOrcs singleton = TalkToOracleOrcs();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"Tell me about the orcs."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        c.knows(OrcsFacts.inPyramid) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings"))) {
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
      "talk_to_oracle_orcs_ink",
    ));
    return '${a.name} successfully performs TalkToOracleOrcs';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleOrcs';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleQuake1 extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_quake_1';

  static final TalkToOracleQuake1 singleton = TalkToOracleQuake1();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"Was that an earthquake?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.knows(ConetFacts.quakeHappened) &&
        !c.knows(ConetFacts.quakesOften))) {
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
      "talk_to_oracle_quake_1_ink",
    ));
    return '${a.name} successfully performs TalkToOracleQuake1';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToOracleSixtyFiver extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_sixty_fiver';

  static final TalkToOracleSixtyFiver singleton = TalkToOracleSixtyFiver();

  @override
  List<String> get commandPathTemplate =>
      ['Oracle', 'Talk', '"What\'s the significance of \'65\'?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.knows(SixtyFiversFacts.shieldSeen) &&
        !c.knows(SixtyFiversFacts.significance))) {
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
      "talk_to_oracle_sixty_fiver_ink",
    ));
    return '${a.name} successfully performs TalkToOracleSixtyFiver';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleSixtyFiver';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room oracleAfterOrcOffensive = Room(
    'oracle_after_orc_offensive',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The place was recently ruined. Blood is everywhere. An old woman lies dead, and next to her, a dead bird.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: oracle,
          what: [
            akxeId,
            compassId,
            dragonEggId,
            lairOfGodStarId,
            northSkullId,
            sixtyFiverShieldId
          ],
          especially: [compassId, northSkullId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'oracle_main',
    prerequisite: Prerequisite(584629209, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The place is ruined. Blood is everywhere. Oracle is dead, and so is the bird.\n\nSmell of coffee still lingers.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 39,
    positionY: 65,
    mapName: 'Oracle\'s');
final Approach jungleEntranceFromDeathlessVillage =
    Approach('deathless_village', 'jungle_entrance', '', null);
final Approach jungleEntranceFromPond =
    Approach('pond', 'jungle_entrance', '', null);
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
final Room jungleEntranceMuddyFootprints = Room(
    'jungle_entrance_muddy_footprints',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Corridors full of vegetation. Path through that, like a path in a forest, but indoors. Muddy footprints.\n',
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
    null,
    null,
    parent: 'jungle_entrance',
    prerequisite: Prerequisite(330398558, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('Muddy footprints.\n', isRaw: true);
    },
    positionX: 21,
    positionY: 72,
    mapName: 'Jungle');
final Approach deathlessVillageFromDragonEggRoom =
    Approach('dragon_egg_room', 'deathless_village', '', null);
final Approach deathlessVillageFromJungleEntrance =
    Approach('jungle_entrance', 'deathless_village', '', null);

class GiveLairOfGodStarToDeathless extends RoamingAction {
  @override
  final String name = 'give_lair_of_god_star_to_deathless';

  static final GiveLairOfGodStarToDeathless singleton =
      GiveLairOfGodStarToDeathless();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'Artifact Star', 'give to the Deathless'];
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
    s.add(
        'They are extremely happy.\n\nTODO: explain how I gained there respect, and they allow me to visit their shrine\n\n',
        isRaw: true);
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
    return '${a.name} fails to perform GiveLairOfGodStarToDeathless';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  s.add(
      'On a ledge overlooking the jungle, a village of cultists. They call themselves the Deathless, and they worship the ancients. Their leader is a child.\n\n',
      isRaw: true);
  c.learn(DeathlessFacts.sawDeathless);

  c.describeWorthiness(
      who: cultists,
      what: [lairOfGodStarId, akxeId, sixtyFiverShieldId],
      especially: [lairOfGodStarId],
      how: "{approvingly|with respect}");
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  c.describeWorthiness(
      who: cultists,
      what: [lairOfGodStarId, akxeId, sixtyFiverShieldId],
      especially: [lairOfGodStarId],
      how: "{approvingly|with respect}");
}, null, null,
    positionX: 18, positionY: 68, mapName: 'Village of the Deathless');
final Approach dragonEggRoomFromDeathlessVillage =
    Approach('deathless_village', 'dragon_egg_room', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasHappened(evDeathlessRespectGained);
});
final Room dragonEggRoom = Room('dragon_egg_room', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The sacred shrine of the Deathless.\n\nTODO: Image of Dragon Egg - a frag grenade on a pedestal.\n\nTODO: The Deathless decide they will give me the Dragon Egg, to aid in my quest. It\'s a big deal. I receive the dragon egg. The Deathless explain to me its operation. (It\'s a frag grenade.)\n\n',
      isRaw: true);
  c.giveNewItemToPlayer(dragonEgg);
  c.markHappened(evReceivedDragonEgg);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 15, positionY: 67, mapName: 'Sacred Place');
final Approach pondFromJungleEntrance =
    Approach('jungle_entrance', 'pond', '', null);

class AttackLizardNearPond extends RoamingAction {
  @override
  final String name = 'attack_lizard_near_pond';

  static final AttackLizardNearPond singleton = AttackLizardNearPond();

  @override
  List<String> get commandPathTemplate => ['Lizardman', 'Attack'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pond') != true) {
      return false;
    }
    if (!(c.hasHappened(evOpenedDam) && !c.hasHappened(evKilledLizardman))) {
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
    s.add('TODO: fight. Assuming victory.\n\n', isRaw: true);
    c.markHappened(evKilledLizardman);

    return '${a.name} successfully performs AttackLizardNearPond';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AttackLizardNearPond';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room pond = Room('pond', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A crashed army helicopter in a clearing in the jungle. Below the vehicle, a pond.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, positionX: 14, positionY: 74, mapName: 'Pond');
final Room pondWithLizardman = Room(
    'pond_with_lizardman',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'A crashed army helicopter in a clearing in the jungle. Below the vehicle, a pond. In front of the pond, a lizardman.\n\nTODO: image of the lizardman\n\nNext to the Lizardman, a dead member of the Deathless tribe.\n',
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
    null,
    null,
    parent: 'pond',
    prerequisite: Prerequisite(984337484, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'A lizardman stands in front of the pond.\n\nTODO: image of the lizardman\n\nNext to the Lizardman, a dead member of the Deathless tribe.\n',
          isRaw: true);
    },
    positionX: 14,
    positionY: 74,
    mapName: 'Pond');
final argoAskDeathlessInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"There\'s only one thing the Deathless regret. The Lair of God was taken by the orcs long before I was born. They now use it as some kind of a prison, or a sty. Disgusting. But the temple had an artifact in it, a star made in the age of the ancients, and we think it\'s still there. That star means a lot to our people. Our Founder had it a hundred years ago, and it inspired her to bring the community to this place, to start the worship of the ancients, and to build the Lair of God."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ArtifactStarFacts.lairOfGodTempleTakenByOrcs);
    c.learn(ArtifactStarFacts.artifactStarInLairOfGod);
  }),
]);
final argoAskDragonEggInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The child named Argo tries to conceal her pride. She says: "We do have the holy artifact you speak of. The Dragon Egg. We know many want it, for unholy reasons, so we keep it hidden."\n',
        isRaw: true);
  }),
]);
final argoAskQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"The Deathless are not afraid of quaking earth. The ancients weren\'t, either. They built this holy place here for a reason."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "None of your tribe is worried?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"It would be false to claim that. The quakes are getting frequent in the recent months.\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I've seen some real damage here." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"True. It is an incredible force. And it is coming on an almost daily basis these past few months. I have become accustomed to it.\n',
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
        'Some of the older members remember quieter times. Of course, we are only people. We are afraid when bigger things happen to us. But we can trust the wisdom of the ancients."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.quakesOften);
  }),
]);
final argoGreetInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Greetings, traveler. My name is Argo. I am of this tribe that calls itself the Deathless." The child is younger than me, and has to look up when speaking to me. Nevertheless, she holds herself as a queen.\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "It is a pleasure to meet you, Argo." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('She nods. "And what is\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Hi, Argo." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'There\'s a murmur among the onlookers of the tribe. "You seem to think I am your lesser because of my age and my height. That is not how the Deathless think. Now, please will you tell me\n',
              isRaw: true);
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
    s.add('your name?"\n', isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Aren." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Well met, Aren."\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Aren, your majesty." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('She smiles. "Well met, sir."\n', isRaw: true);
        }),
      ],
    ),
  ]),
]);

class ArgoAskDeathless extends RoamingAction {
  @override
  final String name = 'argo_ask_deathless';

  static final ArgoAskDeathless singleton = ArgoAskDeathless();

  @override
  List<String> get commandPathTemplate =>
      ['Argo', 'Talk', '“Who are the Deathless?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("argo_greet"))) {
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
      "argo_ask_deathless_ink",
    ));
    return '${a.name} successfully performs ArgoAskDeathless';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoAskDeathless';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class ArgoAskDragonEgg extends RoamingAction {
  @override
  final String name = 'argo_ask_dragon_egg';

  static final ArgoAskDragonEgg singleton = ArgoAskDragonEgg();

  @override
  List<String> get commandPathTemplate =>
      ['Argo', 'Talk', '“You have the Dragon Egg?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("argo_greet") &&
        c.knows(DragonEggFacts.deathlessHaveIt) &&
        !c.hasHappened(evReceivedDragonEgg))) {
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
      "argo_ask_dragon_egg_ink",
    ));
    return '${a.name} successfully performs ArgoAskDragonEgg';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoAskDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class ArgoAskQuake1 extends RoamingAction {
  @override
  final String name = 'argo_ask_quake_1';

  static final ArgoAskQuake1 singleton = ArgoAskQuake1();

  @override
  List<String> get commandPathTemplate =>
      ['Argo', 'Talk', '“Was that an earthquake?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("argo_greet") &&
        c.knows(ConetFacts.quakeHappened) &&
        !c.knows(ConetFacts.quakesOften))) {
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
      "argo_ask_quake_1_ink",
    ));
    return '${a.name} successfully performs ArgoAskQuake1';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoAskQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class ArgoGreet extends RoamingAction {
  @override
  final String name = 'argo_greet';

  static final ArgoGreet singleton = ArgoGreet();

  @override
  List<String> get commandPathTemplate => ['Child', 'Talk', '“Greetings!”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('deathless_village') != true) {
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
      "argo_greet_ink",
    ));
    return '${a.name} successfully performs ArgoGreet';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoGreet';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room deathlessVillageOrcOffensive = Room(
    'deathless_village_orc_offensive',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'On a ledge overlooking the jungle, a village of cultists. They call themselves the Deathless, and they worship the ancients. Their leader is a child.\n\nThe tribe is in a state of disarray. They weild the few weapons that they have, and seem to be preparing for a siege.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: cultists,
          what: [lairOfGodStarId, akxeId, sixtyFiverShieldId],
          especially: [lairOfGodStarId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'deathless_village',
    prerequisite: Prerequisite(218483559, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive) && !c.hasHappened(evQuake3);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The tribe is in a state of disarray. They weild the few weapons that they have, and seem to be preparing for a siege.\n',
          isRaw: true);
    },
    positionX: 18,
    positionY: 68,
    mapName: 'Village of the Deathless');
final Room deathlessVillageQuake2 = Room(
    'deathless_village_quake2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'On a ledge overlooking the jungle, a village of cultists. They call themselves the Deathless, and they worship the ancients. Their leader is a child.\n\nThey are freaked out by the most recent quake.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: cultists,
          what: [lairOfGodStarId, akxeId, sixtyFiverShieldId],
          especially: [lairOfGodStarId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'deathless_village',
    prerequisite: Prerequisite(272717691, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The cargo cultists are freaked out by the most recent quake.\n',
          isRaw: true);
    },
    positionX: 18,
    positionY: 68,
    mapName: 'Village of the Deathless');
final Room deathlessVillageQuake3 = Room(
    'deathless_village_quake3',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'On a ledge overlooking the jungle, a village of cultists. They call themselves the Deathless, and they worship the ancients. Their leader is a child.\n\nThe village is seriously damaged.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: cultists,
          what: [lairOfGodStarId, akxeId, sixtyFiverShieldId],
          especially: [lairOfGodStarId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'deathless_village',
    prerequisite: Prerequisite(1025683774, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake3);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The village has been seriously damaged by the latest quake.\n',
          isRaw: true);
    },
    positionX: 18,
    positionY: 68,
    mapName: 'Village of the Deathless');
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
      'I come to the headquarters. A large room overlooking the bay. Latrines on the right, hanging out of the window frames, providing fertilizer to the farmer slope below. To the left, as far from the latrines as possible, the bunks where a few of the knights sleep.\n',
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
final talkToMiguelAboutDesertingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"I can\'t just guard down there. What am I, an onlooker? I have to change things."\n',
        isRaw: true);
  }),
]);
final talkToMiguelAfterCaravanDepartedInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"The Knights of San Francisco are no more. Look, if you are in the business of hurting the orcs, take me with you."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    assert(c.world.getActorById(miguelId).isAnimatedAndActive);
    c.outputWorld.updateActorById(miguelId, (b) {
      b.npc.isHireable = true;
      assert(b.currentRoomName == 'knights_hq_main');
    });
  }),
]);

class TalkToMiguelAboutDeserting extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_deserting';

  static final TalkToMiguelAboutDeserting singleton =
      TalkToMiguelAboutDeserting();

  @override
  List<String> get commandPathTemplate =>
      ['Miguel, the guardsman', 'Talk', '"What are you doing here?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('knights_hq_main') != true) {
      return false;
    }
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.hasHappened(evQuake2))) {
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
      "talk_to_miguel_about_deserting_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAboutDeserting';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutDeserting';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToMiguelAfterCaravanDeparted extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_after_caravan_departed';

  static final TalkToMiguelAfterCaravanDeparted singleton =
      TalkToMiguelAfterCaravanDeparted();

  @override
  List<String> get commandPathTemplate =>
      ['Miguel, the guardsman', 'Talk', '"Why are you still here?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('knights_hq_main') != true) {
      return false;
    }
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.hasHappened(evCaravanDeparted))) {
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
      "talk_to_miguel_after_caravan_departed_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAfterCaravanDeparted';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAfterCaravanDeparted';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room knightsHqCaravanDeparture = Room(
    'knights_hq_caravan_departure',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      throw StateError(
          "Player should have been here, as the rule above stipulates.");
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'knights_hq_main',
    prerequisite: Prerequisite(294899248, 3, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanDeparted) &&
          !c.hasHappened(evOrcOffensive) &&
          c.playerHasVisited("knights_hq_quake2");
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The circle of women and men is no longer here. Most of them left.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 70,
    mapName: 'Knights Headquarters');
final Room knightsHqOrcOffensive = Room(
    'knights_hq_orc_offensive',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'A large room overlooking the bay. Latrines on the right, hanging out of the window frames, providing fertilizer to the farmer slope below. To the left, as far from the latrines as possible, the bunks.\n\nThere is a handful of wounded knights here, tended by a pair of servants.\n',
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
    null,
    null,
    parent: 'knights_hq_main',
    prerequisite: Prerequisite(879699967, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive) && !c.hasHappened(evQuake3);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('A handful of wounded knights are tended by a pair of servants.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 70,
    mapName: 'Knights Headquarters');
final Room knightsHqQuake2 = Room(
    'knights_hq_quake2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'I come to the headquarters. A large room overlooking the bay. Latrines on the right, hanging out of the window frames, providing fertilizer to the farmer slope below. To the left, as far from the latrines as possible, the bunks where a few of the knights sleep.\n\nThere\'s a small circle of armed men and women talking excitedly in the middle of the room.\n',
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
    null,
    null,
    parent: 'knights_hq_main',
    prerequisite: Prerequisite(617622573, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'There\'s a small circle of armed men and women talking excitedly in the middle of the room.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 70,
    mapName: 'Knights Headquarters');
final Room knightsHqQuake3 = Room(
    'knights_hq_quake3',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'I come to the headquarters. A large room overlooking the bay. Latrines on the right, hanging out of the window frames, providing fertilizer to the farmer slope below. To the left, as far from the latrines as possible, the deserted bunks of the Knights of San Francisco.\n\nSilence. The knights have left.\n',
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
    null,
    null,
    parent: 'knights_hq_main',
    prerequisite: Prerequisite(1010227962, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake3);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('Silence. The knights have left.\n', isRaw: true);
    },
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
      'The steep slope of the Pyramid is covered in vines from this point down. Young men and women are picking Fruit.\n\nA large writing on the wall says "Doghead will come".\n\n',
      isRaw: true);
  c.learn(DogheadFacts.somethingCalledDoghead);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', isRaw: true);
}, null, null, isIdle: true, positionX: 42, positionY: 78, mapName: 'Slopes');
final Room slopesQuake1 = Room(
    'slopes_quake1',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The steep slope of the Pyramid is covered in vines from this point down. Young men and women are picking Fruit.\n\nSome of them are talking about how the quakes are getting more frequent.\n\nIn the distance, a large group is traveling the main road, towards the Pyramid.\n',
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
    null,
    null,
    parent: 'slopes',
    prerequisite: Prerequisite(867577495, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'There is talk among the young men and women about how the quakes are getting more frequent.\n\nIn the distance, a large group is traveling the main road, towards the Pyramid.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 42,
    positionY: 78,
    mapName: 'Slopes');
final talkToGreenWomanAboutSlopesDeathInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'She clicks her tongue. "They should have been more careful, that\'s what happened."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command:
          r""" "Was it the scream I heard, when the quake struck?" """.trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command:
          r""" "Hard to be careful on the face of a building when a quake hits." """
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
    s.add('"Maybe."\n', isRaw: true);
  }),
]);

class TalkToGreenWomanAboutSlopesDeath extends RoamingAction {
  @override
  final String name = 'talk_to_green_woman_about_slopes_death';

  static final TalkToGreenWomanAboutSlopesDeath singleton =
      TalkToGreenWomanAboutSlopesDeath();

  @override
  List<String> get commandPathTemplate =>
      ['Green woman', 'Talk', '"What happened here?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('slopes') != true) {
      return false;
    }
    if (!(c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted))) {
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
      "talk_to_green_woman_about_slopes_death_ink",
    ));
    return '${a.name} successfully performs TalkToGreenWomanAboutSlopesDeath';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToGreenWomanAboutSlopesDeath';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room slopesQuake2 = Room(
    'slopes_quake2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The steep slope of the Pyramid is covered in vines from this point down. Young men and women who would normally be picking Fruit on the slopes are all down on the ground, gathered around a dead body.\n\nA woman dressed in green is standing next to me, looking down.\n',
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
    null,
    null,
    parent: 'slopes',
    prerequisite: Prerequisite(25414194, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The young men and women are all down on the ground, gathered around a dead body.\n\nA woman dressed in green is standing next to me, looking down.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 42,
    positionY: 78,
    mapName: 'Slopes');
final Approach stagingAreaFromFarmersVillage =
    Approach('farmers_village', 'staging_area', '', null);
final Approach stagingAreaFromJungleEntrance =
    Approach('jungle_entrance', 'staging_area', '', null);
final Approach stagingAreaFromKeepGate =
    Approach('keep_gate', 'staging_area', '', null);
final Approach stagingAreaFromKnightsHqMain =
    Approach('knights_hq_main', 'staging_area', '', null);
final Approach stagingAreaFromPyramidEntrance =
    Approach('pyramid_entrance', 'staging_area', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final ifBlock_6718c6f98 = c.knows(DogheadFacts.somethingCalledDoghead)
      ? '''Doghead'''
      : '''a "Doghead"''';
  Ruleset(
      Rule(253556709, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return !c.playerHasVisited("staging_area");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'As I climb the Infinite Staircase, I read the writings on the wall. Many of them refer to $ifBlock_6718c6f98. Messages like "Where is Doghead?" and "Doghead save us".\n\n',
            isRaw: true);
        c.learn(DogheadFacts.somethingCalledDoghead);

        s.add(
            '\nFinally I reach a point where the stairs are too damaged to continue up. There\'s a doorway, and I go through it.\n\n',
            isRaw: true);
      }),
      Rule(389695249, 0, false, (ApplicabilityContext c) {
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
});
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
    isIdle: true,
    positionX: 23,
    positionY: 82,
    mapName: 'The Staging Area',
    firstMapName: 'Up the stairs',
    hint:
        'This is a large room without doors which the Knights of San Francisco are using as the logistic base for their retreat.',
    firstHint:
        'The Entrance leads directly to what the locals call the Infinite Staircase. From a few floors above, I can hear simple commands spoken in bored voices, and loud shuffling.');
final talkToHorsemanWhiteAboutOracleInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"An old woman with books. She insists on living on the fifteenth floor. I told her several times she\'s practically asking to be killed by a rogue orc skirmisher, living that close to them." He waves his hand. "Bah."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OracleFacts.location);
  }),
]);
final talkToHorsemanWhiteDogheadInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('Horseman White seems offended. "Why are you asking me this?"\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "There are writings on the wall with the name." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Not written by me, or any other Knight.\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "You seem knowledgeable." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'Horseman White smirks. "Well done, kid. You might yet have a future in leadership.\n',
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
        'Doghead is a local myth. A creature with a dog\'s head and a human\'s body. He or she is supposed to come and save the day at some point. Just turns up and solves everyone\'s problems. It\'s magical thinking. Bullshit from centuries ago. Go ask Oracle."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(DogheadFacts.dogheadMyth);
    c.learn(OracleFacts.someoneCalledOracle);
  }),
]);
final talkToHorsemanWhiteGreetingsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Greetings. What\'s your business here?" The knight takes a second good look at me. "You look far from home."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I am far from home, yes." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Let me guess, a backwater place somewhere to the East?" He snickers. "No matter. Why are you here?"\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command:
                r""" "I am searching for a Sarn of Falling Rock" """.trim(),
            consequence: [],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command:
          r""" "I am looking for my brother, Sarn of Falling Rock." """.trim(),
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
        '"Why would Sarn of Falling Rock be here, of all places? Any thinking man will go as far away from here as possible."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Yet you are here." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"I wouldn\'t be a very good Knight if I fled from my company, would I. But if you ask me... Wait." The knight shouts some commands at the servants, makes a short note in his book, and continues. "If you ask me, the withdrawal from here cannot come fast enough. I will not flee myself but I will gladly withdraw with the rest. And you, you should leave as soon as possible if you want to live."\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(KnightsFacts.knightsAreLeaving);
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I'm here to find my brother." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"How old is he? Cannot he take care of himself?"\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Maybe he can't." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"So what? He\'s not your responsibility, kid. People think that but that\'s not how the world works. People don\'t owe each other nothing." He pauses. "Which brings me to the fact that\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I am not here to care for him." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"A revenge, then?" He chuckles. "Amusing. Nevertheless,\n',
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
        'I can\'t help you. I don\'t know anyone called Sarn. Or maybe I do but I don\'t remember. I am busy, as you can see."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Can you just look in your book?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'Horseman White\'s face reddens, but he swallows a retort and flips through the pages.\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "You don't remember your subordinates?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Look, kid. There are hundreds of Knights in this place. They come and go. I can\'t know all of them." He scratches his nose. Then he looks down on his book and opens it at a page in the back.\n',
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
        '"Sarn? Of Falling Rock? Yes." He pauses with his finger on the page. "I\'m afraid he\'s in here. He\'s marked as... captured."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Who captured him?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"The Orcs, of course."\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "So, he's not dead?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"He probably is. We just mark him as captured because that\'s what we know for sure. But the Orcs, they don\'t seem the sort that takes good care of their prisoners, if you know what I mean."\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What happened?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"I don\'t know. There were a lot of skirmishes with the Orcs lately. Looks like your Sarn of Falling Rock was unlucky enough to be caught in one of them."\n',
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
    c.learn(OrcsFacts.inPyramid);
    c.learn(SarnFacts.wasCaptured);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'The officer sighs, and his expression softens. "Look, kid. This is the kind of thing I have to say to people every day. Someone died. You cared for them. That\'s the bullshit we live in. The sooner we all get out of here, the better." He extends an arm. "I am White. Horseman White."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I am Aren." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Okay. I will probably not remember that."\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I don't care." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Okay."\n', isRaw: true);
        }),
      ],
    ),
  ]),
]);
final talkToHorsemanWhiteQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"I don\'t think so, kid. Where I come from, there are earthquakes. I remember a few. A few, you hear? Maybe ten, in my whole life. Not an earthquake a day, sometimes more, like here."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.quakesOften);
  }),
]);
final talkToHorsemanWhiteRetreatInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Take your pick, child." He starts counting with fingers. "The horde of Orcs at the upper floors? The wizard, Big O, at the very top? The goblins everywhere? The earthquakes, or whatever they are?" He wiggles the four fingers. "There\'s probably more I\'m forgetting. The point is, the Knights were meant as a force to provide safety, to keep an occassional bandit or such in check."\n',
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
        'He pounds his chest. "We are not meant to be slaughtered like pigs."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(BigOFacts.isWizard);
    c.learn(OrcsFacts.inPyramid);
  }),
]);

class TalkToHorsemanWhiteAboutDevling extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_about_devling';

  static final TalkToHorsemanWhiteAboutDevling singleton =
      TalkToHorsemanWhiteAboutDevling();

  @override
  List<String> get commandPathTemplate => [
        'Horseman White',
        'Talk',
        '“Any advice for someone delving in the Pyramid?”'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_horseman_white_greetings"))) {
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
    s.add('"No."\n', isRaw: true);
    return '${a.name} successfully performs TalkToHorsemanWhiteAboutDevling';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteAboutDevling';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToHorsemanWhiteAboutOracle extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_about_oracle';

  static final TalkToHorsemanWhiteAboutOracle singleton =
      TalkToHorsemanWhiteAboutOracle();

  @override
  List<String> get commandPathTemplate =>
      ['Horseman White', 'Talk', '“Who is Oracle?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_horseman_white_greetings") &&
        c.knows(OracleFacts.someoneCalledOracle) &&
        !c.knows(OracleFacts.personally))) {
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
      "talk_to_horseman_white_about_oracle_ink",
    ));
    return '${a.name} successfully performs TalkToHorsemanWhiteAboutOracle';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteAboutOracle';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToHorsemanWhiteDoghead extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_doghead';

  static final TalkToHorsemanWhiteDoghead singleton =
      TalkToHorsemanWhiteDoghead();

  @override
  List<String> get commandPathTemplate =>
      ['Horseman White', 'Talk', '"Who is Doghead?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(!c.knows(DogheadFacts.dogheadMyth) &&
        w.actionHasBeenPerformed("talk_to_horseman_white_greetings"))) {
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
      "talk_to_horseman_white_doghead_ink",
    ));
    return '${a.name} successfully performs TalkToHorsemanWhiteDoghead';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteDoghead';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToHorsemanWhiteGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_greetings';

  static final TalkToHorsemanWhiteGreetings singleton =
      TalkToHorsemanWhiteGreetings();

  @override
  List<String> get commandPathTemplate => ['Officer', 'Talk', '"Greetings."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('staging_area') != true) {
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
      "talk_to_horseman_white_greetings_ink",
    ));
    return '${a.name} successfully performs TalkToHorsemanWhiteGreetings';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToHorsemanWhiteQuake1 extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_quake_1';

  static final TalkToHorsemanWhiteQuake1 singleton =
      TalkToHorsemanWhiteQuake1();

  @override
  List<String> get commandPathTemplate =>
      ['Horseman White', 'Talk', '"Was than an earthquake?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_horseman_white_greetings") &&
        c.knows(ConetFacts.quakeHappened) &&
        !c.knows(ConetFacts.quakesOften))) {
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
      "talk_to_horseman_white_quake_1_ink",
    ));
    return '${a.name} successfully performs TalkToHorsemanWhiteQuake1';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToHorsemanWhiteRetreat extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_retreat';

  static final TalkToHorsemanWhiteRetreat singleton =
      TalkToHorsemanWhiteRetreat();

  @override
  List<String> get commandPathTemplate =>
      ['Horseman White', 'Talk', '"What are you retreating from?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_horseman_white_greetings") &&
        c.knows(KnightsFacts.knightsAreLeaving))) {
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
      "talk_to_horseman_white_retreat_ink",
    ));
    return '${a.name} successfully performs TalkToHorsemanWhiteRetreat';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteRetreat';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room stagingAreaQuake1 = Room(
    'staging_area_quake1',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'This is a large room without windows. It is teeming with knights and their servants, who are carrying chests, bedding and furniture. All these items are being lined up against the north wall, and an officer with a large book is walking left and right, making notes.\n\nThe quake has evidently toppled some of the furniture next to the wall, and a few knights are putting it back in order again.\n',
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
    null,
    null,
    parent: 'staging_area',
    prerequisite: Prerequisite(291483367, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Some of the furniture has been toppled by the quake, and the knights putting it back in order again, frustrated, looking for damage.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 23,
    positionY: 82,
    mapName: 'The Staging Area',
    firstMapName: 'Up the stairs',
    hint:
        'This is a large room without doors which the Knights of San Francisco are using as the logistic base for their retreat.',
    firstHint:
        'The Entrance leads directly to what the locals call the Infinite Staircase. From a few floors above, I can hear simple commands spoken in bored voices, and loud shuffling.');
final Room stagingAreaQuake2 = Room(
    'staging_area_quake2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'This is a large room without windows. It is teeming with knights and their servants, who are carrying chests, bedding and furniture. All these items are being lined up against the north wall, and an officer with a large book is walking left and right, making notes.\n\nThe new quake has toppled quite a few things. Nobody seems to care anymore. People just try to get out.\n',
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
    null,
    null,
    parent: 'staging_area',
    prerequisite: Prerequisite(600200113, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The new quake has toppled quite a few things. Nobody seems to care anymore. People just try to get out.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 23,
    positionY: 82,
    mapName: 'The Staging Area',
    firstMapName: 'Up the stairs',
    hint:
        'This is a large room without doors which the Knights of San Francisco are using as the logistic base for their retreat.',
    firstHint:
        'The Entrance leads directly to what the locals call the Infinite Staircase. From a few floors above, I can hear simple commands spoken in bored voices, and loud shuffling.');
final Approach farmersVillageFromFloatingPoint =
    Approach('floating_point', 'farmers_village', '', null);
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
      'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well dressed people go about their business. Polite nods in my direction.\n\nAn old woman is whittling a little dog-headed figure from wood. She looks familiar.\n',
      isRaw: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  c.describeWorthiness(
      who: farmers,
      what: [
        akxeId,
        bannerId,
        dragonEggId,
        katanaId,
        lairOfGodStarId,
        sixtyFiverShieldId,
        sixtyFiverSwordId
      ],
      especially: [katanaId, bannerId],
      how: "{approvingly|with respect}");
}, null, null,
    isIdle: true,
    positionX: 35,
    positionY: 83,
    mapName: 'Farmers\' village',
    firstMapName: 'A settled area',
    hint:
        'A settlement of people who farm the vines that grow on the outside of the Pyramid.',
    firstHint:
        'From the outside, this part of the Pyramid is covered with vines, and there are clear signs of settlement in the windows.');
final talkToAdaAboutDelvingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Oh, please don\'t put yourself into more danger than you absolutely must. This building is full of dangers."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Tell me about the dangers, then." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Orcs, monsters. Bad magic, from Big O at the very top. One person just cannot face it all alone. You should\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(BigOFacts.someoneCalledBigO);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "How can I stay safe?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"If you _must_ go further, you mean? I hope you need not. But if you do,\n',
              isRaw: true);
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
        'seek help from others. The Deathless have been friendly to us farmers. Oracle is a beautiful person. The Knights are leaving, but they are good people, at heart."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(DeathlessFacts.somethingCalledDeathless);
    c.learn(OracleFacts.someoneCalledOracle);
    c.learn(KnightsFacts.knightsAreLeaving);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"And remember to equip yourself. There are different weapons to be found, even here in the downside of the Pyramid. A good weapon can be the difference between life and death. A _great_ weapon can decide a conflict without the need for a fight. I\'ve heard of the Dragon Egg, an ancient weapon of that sort."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(DragonEggFacts.anAncientWeapon);
    c.learn(DelvingFacts.knowledge);
  }),
]);
final talkToAdaAboutDragonEggInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Oh, you should not ask an old woman about such things. I know it\'s a weapon. I know it\'s powerful. People have claimed it\'s somewhere in the Pyramid. But where? And what it is, exactly? I don\'t know."\n',
        isRaw: true);
  }),
]);
final talkToAdaAboutOracleInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"She\'s the wisest person I know. Lives in a room many floors up above us. Up above the Knights Headquarters, even, just below the Battlefield floor." Ada chuckles. "As high as possible without being quartered by the orcs. She likes the view."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OracleFacts.location);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"She never had a kid. Could invest all that time in learning and experiencing. Not that I envy her, no. I could not live without kids. Just explaining how she knows as much as she does."\n',
        isRaw: true);
  }),
]);
final talkToAdaBigOInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"As much as anyone here, young sir. When I was younger, we called him Osiris. Big O is a nickname that people gave him. He\'s a constant presence, even though we don\'t ever see him."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What does he do?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"People say different things. At night, we can see the lights change. Dark red and bright violet, what have you. There are sounds and screams, sometimes, and they don\'t seem to be coming from the Orcs. I don\'t know\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "How come you never see him?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"He\'s up there, at the very top. He never goes down, never shows. He\'s been locked up there for decades now, and nobody knows\n',
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
        'what dark magic he\'s doing up there. I try not to think about it, to be honest."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(BigOFacts.unseen);
  }),
]);
final talkToAdaDogheadFigureInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Ah, this? That\'s Doghead, of course. People in the Pyramid believe a creature with a human body and a dog\'s head will come and save us in our direst moment."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Are there dog-headed creatures?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"I have never seen one. I know of hawkmen, of course, and lizardmen. I have never seen or heard of any tale of a dog-headed person, though. Except for this one." She shows me the wooden figure. "I can\'t know if it\'s true.\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What religion is that?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"It\'s not a religion. Doghead is not a god. A hero, yes, but not a god. If you\'re asking me where the tale came from, I can\'t tell.\n',
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
        'All I know is that this has been said for generations. My mother taught me about Doghead"\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(DogheadFacts.dogheadMyth);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Ada looks around. "I think people need Doghead more today than ever before in my life."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"The Knights are leaving. Big O at the top is growing in power. Orcs are getting bolder. There are goblins crawling all around the Pyramid. And the quakes are getting more frequent." Ada shakes her head. "This is our direst moment."\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(BigOFacts.someoneCalledBigO);
          c.learn(ConetFacts.quakesOften);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I guess so." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('Ada nods.\n', isRaw: true);
        }),
      ],
    ),
  ]),
]);
final talkToAdaGreetingsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Greetings to you, too, young sir. What\'s your name?"\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('_"[Aren]."_\n', isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Good to meet you, [Aren]. My name is Ada."\n', isRaw: true);
  }),
]);
final talkToAdaQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Don\'t you worry, young sir, this is quite normal here. These past months there is seldom a single day when we don\'t have a quake."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.quakesOften);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Aren't you worried?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'She shrugs. "This one was stronger than most, but people will repair the damage."\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Earthquake every day?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_23e6b75e = !c.hasHappened(evOrcOffensive)
              ? '''She's very knowledgeable, Oracle. She knows a lot about this place. She reads books, you know.'''
              : '''She was very knowledgeable, you know.''';
          s.add(
              '"I think Oracle once told me that this area is prone to earthquakes since at least the time of the ancients. $ifBlock_23e6b75e"\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(OracleFacts.someoneCalledOracle);
        }),
      ],
    ),
  ]),
]);

class TalkToAdaAboutDelving extends RoamingAction {
  @override
  final String name = 'talk_to_ada_about_delving';

  static final TalkToAdaAboutDelving singleton = TalkToAdaAboutDelving();

  @override
  List<String> get commandPathTemplate =>
      ['Ada', 'Talk', '"Any advice for someone delving in the Pyramid?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings"))) {
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
      "talk_to_ada_about_delving_ink",
    ));
    return '${a.name} successfully performs TalkToAdaAboutDelving';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAboutDelving';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToAdaAboutDragonEgg extends RoamingAction {
  @override
  final String name = 'talk_to_ada_about_dragon_egg';

  static final TalkToAdaAboutDragonEgg singleton = TalkToAdaAboutDragonEgg();

  @override
  List<String> get commandPathTemplate =>
      ['Ada', 'Talk', '"What do you know about the Dragon Egg?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings") &&
        c.knows(DragonEggFacts.anAncientWeapon))) {
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
      "talk_to_ada_about_dragon_egg_ink",
    ));
    return '${a.name} successfully performs TalkToAdaAboutDragonEgg';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAboutDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToAdaAboutOracle extends RoamingAction {
  @override
  final String name = 'talk_to_ada_about_oracle';

  static final TalkToAdaAboutOracle singleton = TalkToAdaAboutOracle();

  @override
  List<String> get commandPathTemplate => ['Ada', 'Talk', '"Who\'s Oracle?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings") &&
        !c.hasHappened(evOrcOffensive) &&
        c.knows(OracleFacts.someoneCalledOracle) &&
        !c.knows(OracleFacts.personally))) {
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
      "talk_to_ada_about_oracle_ink",
    ));
    return '${a.name} successfully performs TalkToAdaAboutOracle';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAboutOracle';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToAdaBigO extends RoamingAction {
  @override
  final String name = 'talk_to_ada_big_o';

  static final TalkToAdaBigO singleton = TalkToAdaBigO();

  @override
  List<String> get commandPathTemplate =>
      ['Ada', 'Talk', '"Do you know anything about Big O?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings") &&
        c.knows(BigOFacts.someoneCalledBigO))) {
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
      "talk_to_ada_big_o_ink",
    ));
    return '${a.name} successfully performs TalkToAdaBigO';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaBigO';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToAdaDogheadFigure extends RoamingAction {
  @override
  final String name = 'talk_to_ada_doghead_figure';

  static final TalkToAdaDogheadFigure singleton = TalkToAdaDogheadFigure();

  @override
  List<String> get commandPathTemplate =>
      ['Ada', 'Talk', '"What\'s that dog-headed figure?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings"))) {
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
      "talk_to_ada_doghead_figure_ink",
    ));
    return '${a.name} successfully performs TalkToAdaDogheadFigure';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaDogheadFigure';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToAdaGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_ada_greetings';

  static final TalkToAdaGreetings singleton = TalkToAdaGreetings();

  @override
  List<String> get commandPathTemplate => ['Old woman', 'Talk', '"Greetings."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
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
      "talk_to_ada_greetings_ink",
    ));
    return '${a.name} successfully performs TalkToAdaGreetings';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToAdaQuake1 extends RoamingAction {
  @override
  final String name = 'talk_to_ada_quake_1';

  static final TalkToAdaQuake1 singleton = TalkToAdaQuake1();

  @override
  List<String> get commandPathTemplate =>
      ['Ada', 'Talk', '"Was that an earthquake?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings") &&
        c.knows(ConetFacts.quakeHappened) &&
        !c.knows(ConetFacts.quakesOften))) {
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
      "talk_to_ada_quake_1_ink",
    ));
    return '${a.name} successfully performs TalkToAdaQuake1';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room farmersVillageQuake1 = Room(
    'farmers_village_quake1',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well dressed people run around, trying to repair the damage of the quake, repairing doors, cleaning debris. Yet others seem to ignore all that, instead focusing on packing.\n\nAn old woman is whittling a little dog-headed figure from wood. She looks familiar.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: farmers,
          what: [
            akxeId,
            bannerId,
            dragonEggId,
            katanaId,
            lairOfGodStarId,
            sixtyFiverShieldId,
            sixtyFiverSwordId
          ],
          especially: [katanaId, bannerId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'farmers_village',
    prerequisite: Prerequisite(829538554, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The farmers look a bit more stressed. No more polite nods. Someone\'s repairing a damaged door, others are cleaning debris. Yet others seem to ignore all that, instead focusing on packing.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 35,
    positionY: 83,
    mapName: 'Farmers\' village',
    firstMapName: 'A settled area',
    hint:
        'A settlement of people who farm the vines that grow on the outside of the Pyramid.',
    firstHint:
        'From the outside, this part of the Pyramid is covered with vines, and there are clear signs of settlement in the windows.');
final talkToAdaAfterQuake2Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('TODO: Ada asks for help. "Knights are leaving. This is bad."\n',
        isRaw: true);
  }),
]);

class TalkToAdaAfterQuake2 extends RoamingAction {
  @override
  final String name = 'talk_to_ada_after_quake_2';

  static final TalkToAdaAfterQuake2 singleton = TalkToAdaAfterQuake2();

  @override
  List<String> get commandPathTemplate =>
      ['Ada', 'Talk', '"How are people coping?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(c.hasHappened(evQuake2) &&
        w.actionHasBeenPerformed("talk_to_ada_greetings"))) {
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
      "talk_to_ada_after_quake_2_ink",
    ));
    return '${a.name} successfully performs TalkToAdaAfterQuake2';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAfterQuake2';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room farmersVillageQuake2 = Room(
    'farmers_village_quake2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well dressed people run around, trying to repair the damage of the quake, repairing doors, cleaning debris. Yet others seem to ignore all that, instead focusing on packing.\n\nThe farmers are in full panic. Someone\'s crying about a person on the Slopes. \n\nAmong all this, an old woman is whittling a little dog-headed figure from wood. She looks familiar.\n',
          isRaw: true);
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: farmers,
          what: [
            akxeId,
            bannerId,
            dragonEggId,
            katanaId,
            lairOfGodStarId,
            sixtyFiverShieldId,
            sixtyFiverSwordId
          ],
          especially: [katanaId, bannerId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'farmers_village',
    prerequisite: Prerequisite(876562067, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The farmers are in full panic. Someone\'s crying about a person on the Slopes.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 35,
    positionY: 83,
    mapName: 'Farmers\' village',
    firstMapName: 'A settled area',
    hint:
        'A settlement of people who farm the vines that grow on the outside of the Pyramid.',
    firstHint:
        'From the outside, this part of the Pyramid is covered with vines, and there are clear signs of settlement in the windows.');
final Approach keepGateFromKeepBedroom =
    Approach('keep_bedroom', 'keep_gate', '', null);
final Approach keepGateFromStagingArea =
    Approach('staging_area', 'keep_gate', '', null);

class AttemptOpenGate extends RoamingAction {
  @override
  final String name = 'attempt_open_gate';

  static final AttemptOpenGate singleton = AttemptOpenGate();

  @override
  List<String> get commandPathTemplate => ['gate', 'open'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKeepDestroyedGate) &&
        !c.knows(KeepGateFacts.keepGateUnlock))) {
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
        'I attempt to open the gate but it\'s closed tight. Maybe there\'s a trick to unlock it using some of the intricate woodwork, but my random mashing of various ornaments does nothing.\n\nI could also bring it down using an axe. It\'s wood, after all.\n',
        isRaw: true);
    return '${a.name} successfully performs AttemptOpenGate';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AttemptOpenGate';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class DestroyGateWithAxe extends RoamingAction {
  @override
  final String name = 'destroy_gate_with_axe';

  static final DestroyGateWithAxe singleton = DestroyGateWithAxe();

  @override
  List<String> get commandPathTemplate => ['gate', 'destroy'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    if (!(c.player.inventory.hasWeapon(WeaponType.axe))) {
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
    s.add('I chop down of gate.\n\n', isRaw: true);
    w.recordCustom(evKeepDestroyedGate);

    return '${a.name} successfully performs DestroyGateWithAxe';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DestroyGateWithAxe';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class ExamineGate extends RoamingAction {
  @override
  final String name = 'examine_gate';

  static final ExamineGate singleton = ExamineGate();

  @override
  List<String> get commandPathTemplate => ['gate', 'examine'];
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
        'TODO: describe gate - a fine piece of carpentry. Obviously expensive to build.\n\n\nA big warning sign on the wall says "Haunted." Below the paint, an older, fainter sign says "Eat the rich".\n',
        isRaw: true);
    return '${a.name} successfully performs ExamineGate';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ExamineGate';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class OpenGateUnlock extends RoamingAction {
  @override
  final String name = 'open_gate_unlock';

  static final OpenGateUnlock singleton = OpenGateUnlock();

  @override
  List<String> get commandPathTemplate => ['gate', 'open'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKeepDestroyedGate) &&
        c.knows(KeepGateFacts.keepGateUnlock))) {
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
    s.add('I unlock the gate using the steps I learned.\n\n', isRaw: true);
    w.recordCustom(evKeepUnlockedGate);

    return '${a.name} successfully performs OpenGateUnlock';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OpenGateUnlock';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    isIdle: true,
    positionX: 20,
    positionY: 86,
    mapName: 'The Keep\'s Gate',
    firstMapName: 'The Keep',
    hint: 'The entrance to the abandoned aristocratic mansion.',
    firstHint:
        'This part of the Pyramid seems to have been carved into an artistocratic residence. The strict simplicity of the ancient building gives way to nortonian redwood panels, doors and floors.');
final Approach keepBedroomFromKeepDining =
    Approach('keep_dining', 'keep_bedroom', '', null);
final Approach keepBedroomFromKeepGate =
    Approach('keep_gate', 'keep_bedroom', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.hasHappened(evKeepUnlockedGate) ||
      c.hasHappened(evKeepDestroyedGate);
});
final Approach keepBedroomFromKeepServants =
    Approach('keep_servants', 'keep_bedroom', '', null);

class ExamineFamilyPortrait extends RoamingAction {
  @override
  final String name = 'examine_family_portrait';

  static final ExamineFamilyPortrait singleton = ExamineFamilyPortrait();

  @override
  List<String> get commandPathTemplate => ['family portrait', 'examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_bedroom') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('search_bedroom'))) {
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
        'The portrait depicts an aristocratic family. Handsome people.\n\nA young, striking lady stands in the front. Kind of bored. It is clear the portrait was meant for her, as a memento for her later years. An inscription say "For our beloved Lady Hope".\n\n',
        isRaw: true);
    c.learn(LadyHopeFacts.ladyHopeName);

    return '${a.name} successfully performs ExamineFamilyPortrait';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ExamineFamilyPortrait';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class SearchBedroom extends RoamingAction {
  @override
  final String name = 'search_bedroom';

  static final SearchBedroom singleton = SearchBedroom();

  @override
  List<String> get commandPathTemplate => ['furniture', 'search'];
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
        'TODO: Everything is gone. Except: a family portrait. The looters didn\'t touch it - superstition?\n',
        isRaw: true);
    return '${a.name} successfully performs SearchBedroom';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SearchBedroom';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TakeFamilyPortrait extends RoamingAction {
  @override
  final String name = 'take_family_portrait';

  static final TakeFamilyPortrait singleton = TakeFamilyPortrait();

  @override
  List<String> get commandPathTemplate => ['family portrait', 'take'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_bedroom') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('examine_family_portrait'))) {
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
        'I take the family portrait. It\'s kind of unwieldy and awkward to hold, so I keep it in front of me.\n\n',
        isRaw: true);
    c.giveNewItemToPlayer(familyPortrait);

    return '${a.name} successfully performs TakeFamilyPortrait';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TakeFamilyPortrait';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  s.add(
      'This is where the aristocracy lived, the Lord\'s quarters. The place has been ransacked, and is mostly covered in dust and spiderwebs. But, there is some sign of activity. Smallish footprints.\n',
      isRaw: true);
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
  final ifBlock_1d766ac55 = c.knows(LadyHopeFacts.ladyHopeName)
      ? '''Lady Hope faces me and prepares for battle.'''
      : '''An undead woman faces me and prepares for battle. Later, I find out her name is Lady Hope.''';
  s.add('$ifBlock_1d766ac55\n\n', isRaw: true);
  c.learn(LadyHopeFacts.ladyHopeName);

  s.add(
      '\nSomeone is talking through her. Impressive. She is clearly undead, and talking undead is something I\'ve never even considered before. It is obviously necromancy of some higher level. TODO: the necromancer taunts me.\n\n',
      isRaw: true);
  if (c.hasItem(familyPortraitId)) {
    s.add('Lady Hope seems taken aback by the portrait I have with me.',
        isRaw: true);

    w.updateActorById(
        ladyHopeId,
        (b) => b
          ..initiative = 0
          ..dexterity = b.dexterity ~/ 2);
  }

  s.add('\nTODO: fight\n\n', isRaw: true);
  w.updateActorById(ladyHopeId, (b) => b..inventory.remove(katana));
  c.giveNewItemToPlayer(katana);

  s.add(
      '\nI take the katana.\n\n\nLady Hope is dead, but for a while, her head is still talking. Lady Hope\'s head: "I see you, young friend. I see your ambition. I see your talents. I see your brutality, which I like most of all. Too many young people limit themselves. Their effect on the world. You don\'t. But I warn you: you\'re not to cross me. You\'re not to ascend to the top. If you do, you die. You are not Doghead. It is not your fate to save this place. And that means, if you cross me, your fate is to die." And then, as if to illustrate the point, Lady Hope\'s face goes to rigor mortis, her features suddenly aging and wrinkling, and she talks no more.\n\n',
      isRaw: true);
  c.learn(DogheadFacts.somethingCalledDoghead);
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
  return c.knows(kbKeepServantsLocation);
});
final Approach keepServantsFromTopOfClimb =
    Approach('top_of_climb', 'keep_servants', '', null);

class NorthSkullExamine extends RoamingAction {
  @override
  final String name = 'north_skull_examine';

  static final NorthSkullExamine singleton = NorthSkullExamine();

  @override
  List<String> get commandPathTemplate => ['Device', 'Examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_servants') != true) {
      return false;
    }
    if (!(!w.actionHasBeenPerformed('north_skull_take'))) {
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
    final ifBlock_465f63bbc = c.hasItem(compassId)
        ? '''As I circle the "North Skull", the compass always points directly at it.'''
        : '''''';
    s.add(
        'This is human skull made into a device. \n\nTODO: image of north skull - some kind of device inset in a human skull\n\nNext to it, a crude goblin-tongue writing says "YOU FOUND NORTH SKULL STUPID! GO UP NOW". An arrow points to a corner of the room that, after closer inspection, hides a narrow crawlspace.\n\n$ifBlock_465f63bbc\n',
        isRaw: true);
    return '${a.name} successfully performs NorthSkullExamine';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform NorthSkullExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class NorthSkullTake extends RoamingAction {
  @override
  final String name = 'north_skull_take';

  static final NorthSkullTake singleton = NorthSkullTake();

  @override
  List<String> get commandPathTemplate => ['North Skull', 'Take'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('keep_servants') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('north_skull_examine'))) {
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
    s.add('I take the North Skull.\n\n', isRaw: true);
    c.giveNewItemToPlayer(northSkull);

    return '${a.name} successfully performs NorthSkullTake';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform NorthSkullTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room keepServants = Room('keep_servants', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Clear signs of goblin activity. But deserted. A curious skull-shaped device in the middle of the room.\n',
      isRaw: true);
}, (ActionContext c) {
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
      'As $weSubstitution approach, I can\'t stop looking up at the structure. The wind changes here, and there is a musty smell coming from the vines that envelop the bottom of the building. From this perspective, the Pyramid is especially massive.\n\nTwo knights, a woman and a man, are on guard.\n\nTODO: Image of the two guards\n\nThe man has been crying, judging from his eyes.\n\nFour stories above, in a corner room of the Pyramid, an eerily motionless woman stands, looking out. \n\n',
      isRaw: true);
  c.learn(LadyHopeFacts.ladyInKeep);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  c.describeWorthiness(
      who: w.getActorById(miguelId),
      what: [bannerId, dragonEggId, katanaId, sixtyFiverShieldId],
      especially: [sixtyFiverShieldId, bannerId],
      how: "{approvingly|with respect}");
}, null, null,
    isIdle: true,
    positionX: 26,
    positionY: 94,
    mapName: 'Pyramid\'s Entrance',
    firstMapName: 'The Pyramid',
    hint:
        'This is the only side of the Pyramid that allows access from outside.',
    firstHint:
        'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.');
final talkToKatAboutDevlingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Don\'t underestimate it. There\'s a reason the Knights are leaving, and it\'s not because we are cowards. The Orcs in the Pyramid are well armed, numerous, and bolder every day."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(KnightsFacts.knightsAreLeaving);
    c.learn(OrcsFacts.inPyramid);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"You would do well to ask the locals. There\'s so much I don\'t know about this place."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(DelvingFacts.infoHelps);
  }),
]);
final talkToKatAboutLadyInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"That\'s Lady Hope. Our local ghost."\n', isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "A ghost?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Well, I should say\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Ghosts don't exist." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"They don\'t? How are you so sure?"\n', isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command:
                r""" "When people die, they don't become transparent and floaty." """
                    .trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"True, they become meat and bone. I guess you\'d know, even in your young age. Let me correct myself, then. Lady Hope is\n',
                    isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "Everyone knows." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('"Well, okay then. I\'m going to say Lady Hope is\n',
                    isRaw: true);
              }),
            ],
          ),
        ]),
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
        'an undead aristocrat. In life, she was a powerful young lady in these parts. A daughter of a lord. Today, she\'s just standing there, watching night and day, with that katana of hers."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(LadyHopeFacts.ladyHopeName);
  }),
]);
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
            command: r""" "Kat with a K, like Katherine?" """.trim(),
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
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings"))) {
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
        '"Sarn of Falling Rock," she repeats. "I don\'t think I remember that name."\n\nShe looks closer at me. "But those eyes. They look familiar." She nods. "Yes, I think I\'ve seen those eyes around here, though I didn\'t know their name."\n\n',
        isRaw: true);
    c.learn(SarnFacts.wasHere);

    return '${a.name} successfully performs TalkToKatAboutBrother';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutBrother';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToKatAboutDevling extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_devling';

  static final TalkToKatAboutDevling singleton = TalkToKatAboutDevling();

  @override
  List<String> get commandPathTemplate => [
        'Kat, the guardswoman',
        'Talk',
        '“Any advice for someone delving in the Pyramid?”'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings"))) {
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
      "talk_to_kat_about_devling_ink",
    ));
    return '${a.name} successfully performs TalkToKatAboutDevling';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutDevling';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToKatAboutLady extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_lady';

  static final TalkToKatAboutLady singleton = TalkToKatAboutLady();

  @override
  List<String> get commandPathTemplate =>
      ['Kat, the guardswoman', 'Talk', '“Who\'s that lady up there?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings") &&
        c.knows(LadyHopeFacts.ladyInKeep) &&
        !c.knows(LadyHopeFacts.ladyHopeName))) {
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
      "talk_to_kat_about_lady_ink",
    ));
    return '${a.name} successfully performs TalkToKatAboutLady';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutLady';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToKatAboutMiguelMissing extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_miguel_missing';

  static final TalkToKatAboutMiguelMissing singleton =
      TalkToKatAboutMiguelMissing();

  @override
  List<String> get commandPathTemplate =>
      ['Kat, the guardswoman', 'Talk', '"Why isn\'t Miguel here?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings") &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings"))) {
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
    s.add('She shakes her head. "Left his post. Went inside."\n', isRaw: true);
    return '${a.name} successfully performs TalkToKatAboutMiguelMissing';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutMiguelMissing';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    if (!(c.inRoomWith(katId))) {
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
    return '${a.name} fails to perform TalkToKatGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
      command: r""" "He came here to join the Knights." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('Miguel looks surprised. "He\'s a warrior, then?"\n',
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
    s.add('"Well, I don\'t know of a mender called Sarn."\n', isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
        Rule(336492451, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.inRoomParent('pyramid_entrance') && c.inRoomWith(katId);
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'Miguel looks over his shoulder at the Pyramid, then back at me. "Even if he is in there, you would not want to get in. You would want to get out."\nThe woman looks at him with a mix of puzzlement and exasperation, then she turns to me.\n"This place is no longer safe. Orcs, goblins. Unless you have business with one of the farmers, you shouldn\'t go in."\n',
              isRaw: true);
        }),
        Rule(389695249, 0, false, (ApplicabilityContext c) {
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
  }),
]);
final talkToMiguelAboutDevlingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_e7f3070f = w
            .actionHasBeenPerformed("talk_to_kat_about_devling")
        ? '''What Kat said. I'd just add that'''
        : '''You should probably ask Kat. She's the smarter and more experienced of us two. But I'll say that''';
    s.add(
        '"$ifBlock_e7f3070f I\'ve heard locals talk of a device of war called the Dragon Egg. If I were you, no offense, I\'d try to find any advantage possible against the Orcs and the other creatures of the upside."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OrcsFacts.inPyramid);
    c.learn(DragonEggFacts.anAncientWeapon);
    c.learn(DelvingFacts.infoHelps);
  }),
]);
final talkToMiguelAboutDragonEggInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"It\'s an ancient weapon, somewhere in the Pyramid." He shrugs. "If I knew more, I\'d go find it, young sir."\n',
        isRaw: true);
  }),
]);
final talkToMiguelAboutLadyInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"Lady Hope."\n', isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(LadyHopeFacts.ladyHopeName);
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
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
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
    return '${a.name} fails to perform TalkToMiguelAboutBrother';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToMiguelAboutDevling extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_devling';

  static final TalkToMiguelAboutDevling singleton = TalkToMiguelAboutDevling();

  @override
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '“Any advice for someone delving in the Pyramid?”'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings"))) {
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
      "talk_to_miguel_about_devling_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAboutDevling';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutDevling';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToMiguelAboutDragonEgg extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_dragon_egg';

  static final TalkToMiguelAboutDragonEgg singleton =
      TalkToMiguelAboutDragonEgg();

  @override
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '“What do you know about the Dragon Egg?”'
      ];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.knows(DragonEggFacts.anAncientWeapon))) {
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
      "talk_to_miguel_about_dragon_egg_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAboutDragonEgg';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class TalkToMiguelAboutLady extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_lady';

  static final TalkToMiguelAboutLady singleton = TalkToMiguelAboutLady();

  @override
  List<String> get commandPathTemplate =>
      ['Miguel, the guardsman', 'Talk', '“Who\'s that lady up there?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.knows(LadyHopeFacts.ladyInKeep) &&
        !c.knows(LadyHopeFacts.ladyHopeName))) {
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
      "talk_to_miguel_about_lady_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAboutLady';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutLady';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    if (!(c.inRoomWith(miguelId))) {
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
    return '${a.name} fails to perform TalkToMiguelGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room pyramidEntranceDuringCaravan = Room(
    'pyramid_entrance_during_caravan',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      throw StateError(
          "Player should have been here, as the rule above stipulates.");
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [bannerId, dragonEggId, katanaId, sixtyFiverShieldId],
          especially: [sixtyFiverShieldId, bannerId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'pyramid_entrance',
    prerequisite: Prerequisite(230852794, 3, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanArrived) &&
          !c.hasHappened(evCaravanDeparted) &&
          c.playerHasVisited('pyramid_entrance', includeVariants: true);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Beasts of burden can be seen (and smelled) from here. The Bleeds is overflowing with them.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 26,
    positionY: 94,
    mapName: 'Pyramid\'s Entrance',
    firstMapName: 'The Pyramid',
    hint:
        'This is the only side of the Pyramid that allows access from outside.',
    firstHint:
        'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.');
final talkToKatAfterOrcOffensiveInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"It\'s the orcs. They attacked. They took over the Oracle\'s observatory, threatened to bring the fight to the farmers. Miguel was right. I cannot leave it be. If you want my help, I\'ll follow you."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    assert(c.world.getActorById(katId).isAnimatedAndActive);
    c.outputWorld.updateActorById(katId, (b) {
      b.npc.isHireable = true;
      assert(b.currentRoomName == 'pyramid_entrance');
    });
  }),
]);

class TalkToKatAfterOrcOffensive extends RoamingAction {
  @override
  final String name = 'talk_to_kat_after_orc_offensive';

  static final TalkToKatAfterOrcOffensive singleton =
      TalkToKatAfterOrcOffensive();

  @override
  List<String> get commandPathTemplate =>
      ['Kat, the guardswoman', 'Talk', '"What are you doing?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings") &&
        c.hasHappened(evOrcOffensive))) {
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
      "talk_to_kat_after_orc_offensive_ink",
    ));
    return '${a.name} successfully performs TalkToKatAfterOrcOffensive';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAfterOrcOffensive';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room pyramidEntranceAfterOrcOffensive = Room(
    'pyramid_entrance_after_orc_offensive',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      throw StateError("Player should have been here.");
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [bannerId, dragonEggId, katanaId, sixtyFiverShieldId],
          especially: [sixtyFiverShieldId, bannerId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'pyramid_entrance',
    prerequisite: Prerequisite(1038023870, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The guardswoman is no longer standing in front of the entrance. She is sitting down on a nearby rock, checking her weapon.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 26,
    positionY: 94,
    mapName: 'Pyramid\'s Entrance',
    firstMapName: 'The Pyramid',
    hint:
        'This is the only side of the Pyramid that allows access from outside.',
    firstHint:
        'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.');
final Room pyramidEntranceAfterQuake2 = Room(
    'pyramid_entrance_after_quake2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      throw StateError(
          "Player should have been here. Quake 2 only happens after player is in the Pyramid, and this is the only entrance.");
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [bannerId, dragonEggId, katanaId, sixtyFiverShieldId],
          especially: [sixtyFiverShieldId, bannerId],
          how: "{approvingly|with respect}");
    },
    null,
    null,
    parent: 'pyramid_entrance',
    prerequisite: Prerequisite(609066949, 4, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) &&
          !c.hasHappened(evCaravanDeparted) &&
          true &&
          true;
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('The guarswoman is alone. Her companion has left.\n', isRaw: true);
    },
    isIdle: true,
    positionX: 26,
    positionY: 94,
    mapName: 'Pyramid\'s Entrance',
    firstMapName: 'The Pyramid',
    hint:
        'This is the only side of the Pyramid that allows access from outside.',
    firstHint:
        'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.');
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
    return '${a.name} fails to perform BleedsMainObserveSmoke';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    final ifBlock_646ab8e51 =
        !c.hasHappened(evQuake1) ? '''Something bad is happening.''' : '''''';
    Ruleset(
        Rule(635652871, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened(evCaravanArrived) &&
              !c.hasHappened(evCaravanDeparted);
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'With the caravan, the village is lively. The villagers have their doors open, talking with each other and with the arrivals.\n\nThe talking and commotion is especially vivid near the local trader\'s building. On the other end of the liveliness spectrum, there\'s a small dwelling with a porch here that most people ignore. A blind man sits there, wearing a coat.\n',
              isRaw: true);
        }),
        Rule(35451700, 0, false, (ApplicabilityContext c) {
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
          s.add(
              'At any point I can see at least a few villagers going about their business. They all walk fast and seldom talk to each other. $ifBlock_646ab8e51\n\nEvery door is shut except for two. One is the entrance into the trader\'s shop. The second open door belongs to a small dwelling with a porch. A blind man sits outside on a stool, wearing a coat.\n',
              isRaw: true);
        })).apply(c);
    c.learn(JisadFacts.blindPerson);

    return '${a.name} successfully performs BleedsMainObserveVillage';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsMainObserveVillage';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  c.learn(kbTrader);
  c.learn(kbGoblinCampSmoke);

  w.updateActorById(tamaraId, (b) => b.isActive = false);

  if (!c.hasItem(letterFromFatherId)) {
    c.giveNewItemToPlayer(letterFromFather);
    c.giveNewItemToPlayer(rockFromMeadow);
  }
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
    hint: 'This is a small village close the entrance to the Pyramid.',
    firstHint:
        'There seems to be a village or at least a homestead next to the Pyramid.');
final Approach bleedsTraderHutFromBleedsMain =
    Approach('bleeds_main', 'bleeds_trader_hut', '', null,
        isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return c.knows(kbTrader);
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
    if (!(c.knows(kbLeroy) &&
        c.knows(kbLeroyKnowsGoblinSmoke) &&
        !c.hasHappened(evGoblinCampCleared) &&
        c.inRoomWith(leroyId))) {
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
    c.learn(KnightsFacts.knightsAreLeaving);

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
    return '${a.name} fails to perform BleedsTraderGoblinSmoke';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    if (!(w.actionHasBeenPerformed("bleeds_trader_greet") &&
        c.inRoomWith(leroyId))) {
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
    c.learn(kbLeroyKnowsGoblinSmoke);

    return '${a.name} successfully performs BleedsTraderGoblins';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsTraderGoblins';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    if (!(c.inRoomWith(leroyId))) {
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
    c.learn(kbLeroy);

    return '${a.name} successfully performs BleedsTraderGreet';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsTraderGreet';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    return '${a.name} fails to perform BleedsTraderTellAboutClearedCamp';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    isIdle: true,
    positionX: 36,
    positionY: 97,
    mapName: 'Trader\'s Shop',
    firstMapName: 'A building that says "Trader"',
    hint:
        'The shop of Joseph and his son, Leroy. Sells basic items for the inhabitants of The Bleeds, and the Farmers of the Pyramid.',
    firstHint:
        'A mossy, stone building without a porch. The sign "Trader" is written above a window in simple grafitti letters.');
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
final bleedsBlindGuideBigOInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'Jisad points to the top of the Pyramid, or at least where he thinks it is. He\'s not too far off, considering his blindness. "The wizard." He puts his hand down and spits. "Or at least that\'s what everyone assumes."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(BigOFacts.isWizard);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Assumes?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Yeah, well, he\'s a secretive fella. All we\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "You don't know him?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"He\'s all the way up there, young sir. It\'s not like we can pay him a visit, and he has not come down my entire life. All I\n',
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
        'know is that there\'s someone up there, above the Orcs. People say there are strange lights coming out of those top floors, during some nights."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(BigOFacts.unseen);
  }),
]);
final bleedsBlindGuideBrotherInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('"I don\'t think I\'ve met the fella. Sorry. Ask around."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Who can help me?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"That depends. What was your brother doing here?"\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "He came here to join the Knights." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"Well, then, ask the Knights. Most of them are still here, though the lot is leaving as we speak." Jisad shrugs.\n',
                    isRaw: true);
              }),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                c.learn(KnightsFacts.knightsAreLeaving);
              }),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('"You can also always\n', isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "I don't really know." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    'Jisad nods solemnly. "Well then, you will have to ask everybody, won\'t you. Or, of course, if you make it that far, you can\n',
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
          s.add('ask Oracle. She\'s the most knowledgeable of us all."\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(OracleFacts.someoneCalledOracle);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I will." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Finding anyone in this mess is tough. If you make it that far, you should ask Oracle. She\'s the one who makes it her job to _know_ things."\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(OracleFacts.someoneCalledOracle);
        }),
      ],
    ),
  ]),
]);
final bleedsBlindGuideDelvingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Oh, you\'re still here? The first and foremost piece of advice I give to anyone who asks about being in this place: don\'t. Turn around. Be somewhere else."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Okay." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Goodbye."\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "And if I don't listen?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'Jisad sighs. "Know your limits. There are orcs on the higher floors. They are dangerous. They are well equipped, well fed, and well organized." He purses his lips and starts nodding.\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "What about the goblins?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"I wasn\'t finished, young sir. Goblins are dangerous, sure, but you\'re unlikely to find them in the Pyramid.\n',
                    isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "How can someone like me beat them?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"I\'d tell you if you let me finish. Eight Gods, I like young enthusiasm but sometimes... Anyway.\n',
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
              'You are unlikely to beat the orcs alone, with whatever weapons you have brought. As always, it\'s best to find friends, allies. There are powerful weapons to be had, in the Pyramid, like the Dragon Egg or a katana."\n',
              isRaw: true);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(DragonEggFacts.anAncientWeapon);
          c.learn(DelvingFacts.knowledge);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"And remember, you can always just turn around and run from here."\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
]);
final bleedsBlindGuideDragonEggInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"It\'s supposed to be a powerful weapon. Not sure where it is, but I don\'t think anyone has it, or we\'d know about it, I\'m sure. Maybe it\'s lost somewhere. I kind of hope it is."\n',
        isRaw: true);
  }),
]);
final bleedsBlindGuideGoblinsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Not completely, of course. There were always raiders. But not like this." The man shakes his head. "It\'s like the goblins are being drawn here."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What do they want?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"They\'re goblins. They want to raid. They want steel and slaves." He thinks for a while. "But it\'s strange. They come in larger numbers than you would think makes sense. They\'d get more slaves and more steel elsewhere."\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "They want into the Pyramid, perhaps?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"Nonsense. Goblins fear these kinds of things. Even if they didn\'t, they\'d probably get slaughtered by the orcs. Oh, that\'s something I\'d like to see." He absentmindedly touches his face just under the left eye.\n',
                    isRaw: true);
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "Do you have a theory?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                    '"No. Well, I suspect there\'s some magic at play." He sighs.\n',
                    isRaw: true);
              }),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "I see." """.trim(),
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
        '"Anyway. The goblins _are_ getting awfully bold. I\'ve heard a band has made their camp not far from here. So close that people can see their campfire\'s smoke sometimes." He shudders. "Can you see it?"\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Yes." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"It must be a harrowing sight. A herald of our own future, possibly."\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "No." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Well, that\'s good to know."\n', isRaw: true);
        }),
      ],
    ),
  ]),
]);
final bleedsBlindGuideGreetInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Hello there. Nice to meet you! I am Jisad, the blind guide." He smiles.\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(JisadFacts.name);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "The blind guide?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"I know a lot about this place, and because I am — you know — blind, everyone around here calls me the Blind Guide." He smiles and leans over, lowering his voice. "I think they find it funny."\n',
              isRaw: true);
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "Hilarious." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add('He nods. "And your name?"\n', isRaw: true);
              }),
            ],
          ),
        ]),
        InkForkNode([
          InkChoiceNode(
            command: r""" "Aren." """.trim(),
            consequence: [],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "I am Aren." """.trim(),
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
    s.add('"So, what brings you here?"\n', isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I seek my brother, Sarn of Falling Rock." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Family! A commendable motivation. Better than most I have heard." Jisad purses his lips. "Well, Aren, I hope you find your brother and get out of here as soon as possible."\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "I seek treasure." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Ahh!" The man leans back, resting against the wall of his house. "A terrible idea."\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why?"" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"There are whole religions built on the idea that there is _something_ in this building. Something that made it survive the ages. You seek magic?"\n',
              isRaw: true);
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I already weild it." """.trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command: r""" "Yes." """.trim(),
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
        'The man purses his lips. "I hate magic." He shifts on his stool and the wood creaks. "Even though I built my life on knowing this ancient place, I hate magic. For a while it seems useful, in small doses. But something happens, and everything goes to hell. Look at this place." He gestures around.\n',
        isRaw: true);
  }),
]);
final bleedsBlindGuideOracleInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"What, you\'re still here? Damn, young sir, you\'re persistent." Jisad clicks with his tongue. "Oracle. She\'s not been here as long as I, but she knows more about all this place than I or anyone else."\n',
        isRaw: true);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "How come?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Books." Jisad shrugs and points at where his eyes once were. "She reads them. And then she trades that information for even more information from others."\n',
              isRaw: true);
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('He sighs. "You\'ll find her\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "She came recently?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"No," he chuckles. "She came as a young woman, working as a servant in the Keep on the fifth floor. But, I\'m at least as old as she is, and I was born here."\n',
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
              'He shifts. "I remember more. But, the books she reads remember yet more. She trades that information, and other she acquires,\n',
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
        'on the East side of the Pyramid. She has a room just below the battlefield floor. Quite dangerous, this close to the Orcs. But the height gives her an advantage. A better view of the surroundings."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OracleFacts.location);
  }),
]);
final bleedsBlindGuideOrcsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"I was here when the Orcs first came, when they took over the very top of the Pyramid. I think they came with Big O, or at least their coming woke Big O to activity." He sniffs. "The Orcs later pushed down, taking the Lair of God, desecrating it with some vile creature."\n',
        isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('Jisad shakes his head.\n', isRaw: true);
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"I have been here for a long time, young sir. But I don\'t know why they came or what they are doing."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ArtifactStarFacts.lairOfGodTempleTakenByOrcs);
    c.learn(BigOFacts.someoneCalledBigO);
  }),
]);
final bleedsBlindGuideQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Yes, young sir. We have these quite often, at least one a day. They don\'t seem to be too serious, thank the Eight Gods."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.quakesOften);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why are they happening?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '"Why does anything happen? Why is the wind blowing, ruffling our hair? Why is the sea, that nasty bitch, full of salt and hatred? Why are birds singing, instead of just yelling like the other animals?" He shrugs. "These are questions for the gods, not for a blind man."\n',
              isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Thank the Eight Gods." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('Jisad nods.\n', isRaw: true);
        }),
      ],
    ),
  ]),
]);
final bleedsBlindGuideWhatsWrongInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '"Oh!" Jisad slaps his knee. "Everything! I was born and raised in these ancient ruins. It was always a little bit crazy here but never like this. The Knights are leaving. The orcs at the upper floors are getting bolder every day. There are bands of goblins closing in on this place."\n',
        isRaw: true);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(KnightsFacts.knightsAreLeaving);
    c.learn(OrcsFacts.inPyramid);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add('"Because magic\n', isRaw: true);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "You blame magic for this?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              'The otherwise calm face of the blind man twists with rage. "Of course I do. Magic\n',
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
        'is power, and power corrupts. This place is _infused_ with magic. And the world has noticed."\n',
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
        'The man turns his unseeing face almost precisely at me. "Go away. Leave this place. Forgo the magic and keep your life."\n',
        isRaw: true);
  }),
]);

class BleedsBlindGuideBigO extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_big_o';

  static final BleedsBlindGuideBigO singleton = BleedsBlindGuideBigO();

  @override
  List<String> get commandPathTemplate => ['Jisad', 'Talk', '“Who is Big O?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet") &&
        c.knows(BigOFacts.someoneCalledBigO) &&
        !c.knows(BigOFacts.isWizard))) {
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
      "bleeds_blind_guide_big_o_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideBigO';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideBigO';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideBrother extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_brother';

  static final BleedsBlindGuideBrother singleton = BleedsBlindGuideBrother();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '"I\'m looking for a Sarn of Falling Rock."'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet") &&
        !c.hasHappened(evSavedSarn))) {
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
      "bleeds_blind_guide_brother_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideBrother';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideBrother';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideDelving extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_delving';

  static final BleedsBlindGuideDelving singleton = BleedsBlindGuideDelving();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '“Any advice for someone delving in the Pyramid?”'];
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
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "bleeds_blind_guide_delving_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideDelving';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideDelving';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideDragonEgg extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_dragon_egg';

  static final BleedsBlindGuideDragonEgg singleton =
      BleedsBlindGuideDragonEgg();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '“What do you know about the Dragon Egg?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet") &&
        c.knows(DragonEggFacts.anAncientWeapon))) {
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
      "bleeds_blind_guide_dragon_egg_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideDragonEgg';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideGoblins extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_goblins';

  static final BleedsBlindGuideGoblins singleton = BleedsBlindGuideGoblins();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '“The goblins are new here?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_whats_wrong"))) {
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
      "bleeds_blind_guide_goblins_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideGoblins';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideGoblins';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  List<String> get commandPathTemplate => ['Blind man', '“Greetings!”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.knows(JisadFacts.blindPerson))) {
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
      "bleeds_blind_guide_greet_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideGreet';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideGreet';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideOracle extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_oracle';

  static final BleedsBlindGuideOracle singleton = BleedsBlindGuideOracle();

  @override
  List<String> get commandPathTemplate => ['Jisad', 'Talk', '"Who\'s Oracle?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet") &&
        c.knows(OracleFacts.someoneCalledOracle) &&
        !c.knows(OracleFacts.personally))) {
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
      "bleeds_blind_guide_oracle_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideOracle';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideOracle';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideOrcs extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_orcs';

  static final BleedsBlindGuideOrcs singleton = BleedsBlindGuideOrcs();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '“What are the orcs doing in the Pyramid?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_whats_wrong") &&
        c.knows(OrcsFacts.inPyramid))) {
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
      "bleeds_blind_guide_orcs_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideOrcs';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideOrcs';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideQuake1 extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_quake_1';

  static final BleedsBlindGuideQuake1 singleton = BleedsBlindGuideQuake1();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '“Was that an earthquake?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet") &&
        c.knows(ConetFacts.quakeHappened) &&
        !c.knows(ConetFacts.quakesOften))) {
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
      "bleeds_blind_guide_quake_1_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideQuake1';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class BleedsBlindGuideWhatsWrong extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_whats_wrong';

  static final BleedsBlindGuideWhatsWrong singleton =
      BleedsBlindGuideWhatsWrong();

  @override
  List<String> get commandPathTemplate =>
      ['Jisad', 'Talk', '“What\'s wrong here?”'];
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
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "bleeds_blind_guide_whats_wrong_ink",
    ));
    return '${a.name} successfully performs BleedsBlindGuideWhatsWrong';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideWhatsWrong';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final sarnSlapInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add('Sarn is unresponsive.\n', isRaw: true);
  }),
]);

class SarnExamineHisHammer extends RoamingAction {
  @override
  final String name = 'sarn_examine_his_hammer';

  static final SarnExamineHisHammer singleton = SarnExamineHisHammer();

  @override
  List<String> get commandPathTemplate => ['Sarn\'s hammer', 'Examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn) &&
        !w.actionHasBeenPerformed('sarn_take_his_hammer'))) {
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
    s.add('The hammer is extremely well done and menacing.\n', isRaw: true);
    return '${a.name} successfully performs SarnExamineHisHammer';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnExamineHisHammer';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class SarnReadLetter extends RoamingAction {
  @override
  final String name = 'sarn_read_letter';

  static final SarnReadLetter singleton = SarnReadLetter();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'father\'s letter', 'read to Sarn'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn) && c.hasItem(letterFromFatherId))) {
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
        'Sarn listens intently. There seems to be a little bit of recognition in his face. By the time I finish reading, he looks happier, though still out of it.\n',
        isRaw: true);
    return '${a.name} successfully performs SarnReadLetter';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnReadLetter';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class SarnSlap extends RoamingAction {
  @override
  final String name = 'sarn_slap';

  static final SarnSlap singleton = SarnSlap();

  @override
  List<String> get commandPathTemplate =>
      ['Sarn', 'Talk', '"What happened up there?"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn))) {
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
      "sarn_slap_ink",
    ));
    return '${a.name} successfully performs SarnSlap';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnSlap';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class SarnTakeHisHammer extends RoamingAction {
  @override
  final String name = 'sarn_take_his_hammer';

  static final SarnTakeHisHammer singleton = SarnTakeHisHammer();

  @override
  List<String> get commandPathTemplate => ['Sarn\'s hammer', 'Take'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn))) {
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
    s.add('I take the hammer.\n\n', isRaw: true);
    c.giveNewItemToPlayer(sarnHammer);

    return '${a.name} successfully performs SarnTakeHisHammer';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnTakeHisHammer';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room bleedsMainDuringCaravan = Room(
    'bleeds_main_during_caravan',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      throw StateError("Player should have been to the Bleeds already.");
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'bleeds_main',
    prerequisite: Prerequisite(1072163588, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanArrived) &&
          !c.hasHappened(evCaravanDeparted);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The road that leads from the Pyramid entrance, between the buildings of the Bleeds, and into the forest of San Francisco, is full of wagons, bulls, and new people. A caravan has arrived. They\'re clearly not stopping for long. The bulls are still in their harnesses, the people are not sitting down, and there is nobody setting up tents.\n\nThere is some commotion around the trader\'s shop, not surprisingly. People are moving goods through the back. A tall figure is watching over all this. At first it seems like the person has a cape, but the truth is they don\'t. They are a taheen, and I know them. Gadelon, the hawk man. They traded in the Falling Rock.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 98,
    mapName: 'The Bleeds',
    firstMapName: 'Some buildings',
    hint: 'This is a small village close the entrance to the Pyramid.',
    firstHint:
        'There seems to be a village or at least a homestead next to the Pyramid.');
final Room bleedsMainAfterCaravan = Room(
    'bleeds_main_after_caravan',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      throw StateError("Player should have been to the Bleeds already.");
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'bleeds_main',
    prerequisite: Prerequisite(497066215, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanDeparted) && !c.hasHappened(evOrcOffensive);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      final ifBlock_405410045 = c.playerHasVisited("bleeds_main_during_caravan")
          ? '''The caravan has left. The hawkman named Gadelon stays.'''
          : '''A tall figure is standing near the trader's shop. At first it seems like the person has a cape, but the truth is they don't. They are a taheen, and I know them. Gadelon, the hawk man. They traded in the Falling Rock.''';
      s.add(
          'The road is covered in recent footprints and hoofprints. The air faintly smells of bulls. $ifBlock_405410045\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 98,
    mapName: 'The Bleeds',
    firstMapName: 'Some buildings',
    hint: 'This is a small village close the entrance to the Pyramid.',
    firstHint:
        'There seems to be a village or at least a homestead next to the Pyramid.');
final Room bleedsMainAfterQuake1 = Room(
    'bleeds_main_after_quake_1',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'I finally see it. The Pyramid.\n\n\nBelow the Pyramid there\'s a small village. It huddles around the entrance to the structure. Later, I learn the locals call the settlement “The Bleeds”.\n\nThere is a trader\'s shop here. A mile to the west, I see a pillar of black smoke rising to the sky.\n\n',
          isRaw: true);
      c.learn(kbTrader);
      c.learn(kbGoblinCampSmoke);

      w.updateActorById(tamaraId, (b) => b.isActive = false);

      if (!c.hasItem(letterFromFatherId)) {
        c.giveNewItemToPlayer(letterFromFather);
        c.giveNewItemToPlayer(rockFromMeadow);
      }
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'bleeds_main',
    prerequisite: Prerequisite(477348122, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'Small damage after the quake. But locals seem to take it in stride. Is this normal here?\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 98,
    mapName: 'The Bleeds',
    firstMapName: 'Some buildings',
    hint: 'This is a small village close the entrance to the Pyramid.',
    firstHint:
        'There seems to be a village or at least a homestead next to the Pyramid.');
final Room bleedsMainAfterQuake2 = Room(
    'bleeds_main_after_quake_2',
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'I finally see it. The Pyramid.\n\n\nBelow the Pyramid there\'s a small village. It huddles around the entrance to the structure. Later, I learn the locals call the settlement “The Bleeds”.\n\nThere is a trader\'s shop here. A mile to the west, I see a pillar of black smoke rising to the sky.\n\n',
          isRaw: true);
      c.learn(kbTrader);
      c.learn(kbGoblinCampSmoke);

      w.updateActorById(tamaraId, (b) => b.isActive = false);

      if (!c.hasItem(letterFromFatherId)) {
        c.giveNewItemToPlayer(letterFromFather);
        c.giveNewItemToPlayer(rockFromMeadow);
      }
    },
    (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add('', isRaw: true);
    },
    null,
    null,
    parent: 'bleeds_main',
    prerequisite: Prerequisite(580504930, 3, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) &&
          !c.hasHappened(evCaravanDeparted) &&
          c.playerHasVisited("bleeds_main_during_caravan");
    }),
    variantUpdateDescribe: (ActionContext c) {
      final WorldState originalWorld = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      final WorldStateBuilder w = c.outputWorld;
      final Storyline s = c.outputStoryline;
      s.add(
          'The people are quite a bit more nervous than before. There is talk about a farmer falling to his death on the Slopes.\n',
          isRaw: true);
    },
    isIdle: true,
    positionX: 37,
    positionY: 98,
    mapName: 'The Bleeds',
    firstMapName: 'Some buildings',
    hint: 'This is a small village close the entrance to the Pyramid.',
    firstHint:
        'There seems to be a village or at least a homestead next to the Pyramid.');
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
  return c.knows(kbGoblinCampSmoke) &&
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
    positionX: 15,
    positionY: 97,
    mapName: 'Smoke',
    hint: 'I noticed a smoke to the west.');
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
    return '${a.name} fails to perform GoblinCampAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    return '${a.name} fails to perform ListenContinue';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    return '${a.name} fails to perform ListenMore';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    return '${a.name} fails to perform ListenToThemArguing';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    return '${a.name} fails to perform ObserveGoblinCamp';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class CompassExamine extends RoamingAction {
  @override
  final String name = 'compass_examine';

  static final CompassExamine singleton = CompassExamine();

  @override
  List<String> get commandPathTemplate => ['Device', 'Examine'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!w.actionHasBeenPerformed('compass_take'))) {
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
        'A curious, crude device. Round as a pebble, slightly translucent, with a dark spot that moves as I rotate the device. The dark spot always points to one direction. It\'s like a compass. It currently points slightly upwards and toward the Pyramid.\n',
        isRaw: true);
    return '${a.name} successfully performs CompassExamine';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CompassExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class CompassTake extends RoamingAction {
  @override
  final String name = 'compass_take';

  static final CompassTake singleton = CompassTake();

  @override
  List<String> get commandPathTemplate => ['Compass', 'Take'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('compass_examine'))) {
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
    s.add('I take the compass.\n\n', isRaw: true);
    c.giveNewItemToPlayer(compass);

    return '${a.name} successfully performs CompassTake';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CompassTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

class CompassUse extends RoamingAction {
  @override
  final String name = 'compass_use';

  static final CompassUse singleton = CompassUse();

  @override
  List<String> get commandPathTemplate => ['inventory', 'compass', 'use'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(c.hasItem(compassId) &&
        !c.playerRoom.isSynthetic &&
        c.playerRoom.isOnMap)) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    describeCompass(c);

    return '${a.name} successfully performs CompassUse';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CompassUse';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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

final Room goblinSkirmishMain = Room('goblin_skirmish_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'TODO: an actual battle with the goblins.\n\nThere\'s a curious device on the ground. Some kind of a compass.\n\n',
      isRaw: true);
  c.markHappened(evGoblinCampCleared);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The goblin camp is deserted.\n', isRaw: true);
}, null, null, positionX: 11, positionY: 97, mapName: 'The Goblin Camp');

class PerformNecromancyElsewhere extends RoamingAction {
  @override
  final String name = 'perform_necromancy_elsewhere';

  static final PerformNecromancyElsewhere singleton =
      PerformNecromancyElsewhere();

  @override
  List<String> get commandPathTemplate => ['skills', 'necromancy'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(!(c.world.currentSituation as RoomRoamingSituation).monstersAlive &&
        !c.playerRoom.isSynthetic &&
        c.playerRoom.isOnMap)) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    raiseDead(c);

    return '${a.name} successfully performs PerformNecromancyElsewhere';
  }

  @override
  String applyFailure(ActionContext c, void _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_4d7298c01 = isFollowedByAnUndead(c, a)
        ? '''My powers are not strong enough to hold two unliving minds, and I already have an undead follower.'''
        : '''''';
    s.add(
        'I perform the necromantic incantation but I fail. Nothing happens. $ifBlock_4d7298c01\n',
        isRaw: true);
    return '${a.name} fails to perform PerformNecromancyElsewhere';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    final c = ApplicabilityContext(a, sim, w);
    if (isFollowedByAnUndead(c, a)) {
      return ReasonedSuccessChance.sureFailure;
    }
    return const ReasonedSuccessChance<void>(0.8);
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
      'Raising the dead will make them fight for me. I do not know in advance which corpse will rise. I cannot do this if I am already followed by an undead. My powers are not strong enough to hold two unliving minds.';
  @override
  bool get isAggressive => false;
}

final Approach startFromPreStartBook =
    Approach('pre_start_book', 'start', r'$IMPLICIT', null);
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
    return '${a.name} fails to perform StartInk';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
    hint: 'The clearing in the forest of San Francisco where we were ambushed.',
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
          Rule(314778602, 1, false, (ApplicabilityContext c) {
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
            Ruleset(Rule(994547605, 0, false, (ApplicabilityContext c) {
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
              s.add('"Well, that was something."\n\n', isRaw: true);
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
      c.giveNewItemToPlayer(letterFromFather);
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
        'I take the letter from my pocket and read it.\n\nSon,\n\nI learned about your plans from a family friend. Although I hope you don\'t mean to execute them, I am writing this letter. I will come back home as soon as I am able.\n\nThere is good life for you in Falling Rock, despite everything. The mountains may seem dull and remote to your young heart, but they are safe.\n\nI am surprised by the brash move. From you, of all people. Remember your health. Stay home and continue your training. Don\'t follow your brother\'s footsteps. Don\'t make my my heart break for the third time.\n\n- Father\n',
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
    return '${a.name} fails to perform ReadLetterFromFather';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
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
  ReasonedSuccessChance<void> getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return const ReasonedSuccessChance<void>(0.8);
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
  dargTent,
  dargTentAfterDargArrived,
  dargTentAfterDargKilled,
  topOfClimb,
  crowdsource,
  crowdsourceAfterOrcsLeft,
  barracks,
  conet,
  conetAfterClearing,
  maintenanceShaft,
  smithy,
  smithyAfterSarnSaved,
  elevator28,
  godsLair,
  godsLairAfterNecromancy,
  junction,
  reservoir,
  reservoirAfterOpenDam,
  cockroachFarm,
  cockroachFarmAfterOpenDam,
  trainingGrounds,
  trainingGroundsAfterDamOpened,
  battlefield,
  oracleMain,
  oracleAfterOrcOffensive,
  jungleEntrance,
  jungleEntranceMuddyFootprints,
  deathlessVillage,
  dragonEggRoom,
  pond,
  pondWithLizardman,
  deathlessVillageOrcOffensive,
  deathlessVillageQuake2,
  deathlessVillageQuake3,
  knightsHqMain,
  knightsHqCaravanDeparture,
  knightsHqOrcOffensive,
  knightsHqQuake2,
  knightsHqQuake3,
  elevator12,
  slopes,
  slopesQuake1,
  slopesQuake2,
  stagingArea,
  stagingAreaQuake1,
  stagingAreaQuake2,
  farmersVillage,
  farmersVillageQuake1,
  farmersVillageQuake2,
  keepGate,
  keepBedroom,
  keepDining,
  keepServants,
  floatingPoint,
  pyramidEntrance,
  pyramidEntranceDuringCaravan,
  pyramidEntranceAfterOrcOffensive,
  pyramidEntranceAfterQuake2,
  bleedsMain,
  bleedsTraderHut,
  bleedsMainDuringCaravan,
  bleedsMainAfterCaravan,
  bleedsMainAfterQuake1,
  bleedsMainAfterQuake2,
  goblinSkirmishPatrol,
  goblinSkirmishSneak,
  goblinSkirmishMain,
  start,
  meadowFight
];
final allApproaches = <Approach>[
  endOfRoamFromTestRandomEncounter,
  bigOObservatoryFromBigOAntechamber,
  endOfRoamFromBigOObservatory,
  bigOAntechamberFromCrowdsource,
  bigOAntechamberFromTopOfClimb,
  dargTentFromBarracks,
  topOfClimbFromBarracks,
  topOfClimbFromBigOAntechamber,
  topOfClimbFromKeepServants,
  crowdsourceFromBarracks,
  crowdsourceFromBigOAntechamber,
  barracksFromCrowdsource,
  barracksFromDargTent,
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
  jungleEntranceFromPond,
  jungleEntranceFromStagingArea,
  deathlessVillageFromDragonEggRoom,
  deathlessVillageFromJungleEntrance,
  dragonEggRoomFromDeathlessVillage,
  pondFromJungleEntrance,
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
  bleedsTraderHutFromBleedsMain,
  endOfRoamFromBleedsMain,
  goblinSkirmishPatrolFromBleedsMain,
  goblinSkirmishSneakFromBleedsMain,
  goblinSkirmishSneakFromGoblinSkirmishPatrol,
  goblinSkirmishMainFromBleedsMain,
  startFromPreStartBook,
  meadowFightFromStart
];
final allActions = <RoamingAction>[
  ExamineAntechamberLock.singleton,
  OpenAntechamberLock.singleton,
  DargTentAttack.singleton,
  CrowdsourceAttack.singleton,
  CrowdsourceListen.singleton,
  ConetAttack.singleton,
  ConetExamine.singleton,
  KarlListenToGuards.singleton,
  KarlUseNecromancy.singleton,
  SaveSarn.singleton,
  KarlExamineStar.singleton,
  KarlTakeStar.singleton,
  ReservoirOpenDam.singleton,
  AskOracleAboutKeep.singleton,
  AskOracleAboutKeepGate.singleton,
  OracleGiveNorthSkull.singleton,
  TalkToOracleDeathless.singleton,
  TalkToOracleDoghead.singleton,
  TalkToOracleDragonEgg.singleton,
  TalkToOracleEarthquakes.singleton,
  TalkToOracleGreetings.singleton,
  TalkToOracleOrcs.singleton,
  TalkToOracleQuake1.singleton,
  TalkToOracleSixtyFiver.singleton,
  GiveLairOfGodStarToDeathless.singleton,
  AttackLizardNearPond.singleton,
  ArgoAskDeathless.singleton,
  ArgoAskDragonEgg.singleton,
  ArgoAskQuake1.singleton,
  ArgoGreet.singleton,
  TalkToMiguelAboutDeserting.singleton,
  TalkToMiguelAfterCaravanDeparted.singleton,
  TalkToGreenWomanAboutSlopesDeath.singleton,
  TalkToHorsemanWhiteAboutDevling.singleton,
  TalkToHorsemanWhiteAboutOracle.singleton,
  TalkToHorsemanWhiteDoghead.singleton,
  TalkToHorsemanWhiteGreetings.singleton,
  TalkToHorsemanWhiteQuake1.singleton,
  TalkToHorsemanWhiteRetreat.singleton,
  TalkToAdaAboutDelving.singleton,
  TalkToAdaAboutDragonEgg.singleton,
  TalkToAdaAboutOracle.singleton,
  TalkToAdaBigO.singleton,
  TalkToAdaDogheadFigure.singleton,
  TalkToAdaGreetings.singleton,
  TalkToAdaQuake1.singleton,
  TalkToAdaAfterQuake2.singleton,
  AttemptOpenGate.singleton,
  DestroyGateWithAxe.singleton,
  ExamineGate.singleton,
  OpenGateUnlock.singleton,
  ExamineFamilyPortrait.singleton,
  SearchBedroom.singleton,
  TakeFamilyPortrait.singleton,
  NorthSkullExamine.singleton,
  NorthSkullTake.singleton,
  TalkToKatAboutBrother.singleton,
  TalkToKatAboutDevling.singleton,
  TalkToKatAboutLady.singleton,
  TalkToKatAboutMiguelMissing.singleton,
  TalkToKatGreetings.singleton,
  TalkToMiguelAboutBrother.singleton,
  TalkToMiguelAboutDevling.singleton,
  TalkToMiguelAboutDragonEgg.singleton,
  TalkToMiguelAboutLady.singleton,
  TalkToMiguelGreetings.singleton,
  TalkToKatAfterOrcOffensive.singleton,
  BleedsMainObserveSmoke.singleton,
  BleedsMainObserveVillage.singleton,
  BleedsTraderGoblinSmoke.singleton,
  BleedsTraderGoblins.singleton,
  BleedsTraderGreet.singleton,
  BleedsTraderTellAboutClearedCamp.singleton,
  BleedsBlindGuideBigO.singleton,
  BleedsBlindGuideBrother.singleton,
  BleedsBlindGuideDelving.singleton,
  BleedsBlindGuideDragonEgg.singleton,
  BleedsBlindGuideGoblins.singleton,
  BleedsBlindGuideGreet.singleton,
  BleedsBlindGuideOracle.singleton,
  BleedsBlindGuideOrcs.singleton,
  BleedsBlindGuideQuake1.singleton,
  BleedsBlindGuideWhatsWrong.singleton,
  SarnExamineHisHammer.singleton,
  SarnReadLetter.singleton,
  SarnSlap.singleton,
  SarnTakeHisHammer.singleton,
  GoblinCampAttack.singleton,
  ListenContinue.singleton,
  ListenMore.singleton,
  ListenToThemArguing.singleton,
  ObserveGoblinCamp.singleton,
  CompassExamine.singleton,
  CompassTake.singleton,
  CompassUse.singleton,
  PerformNecromancyElsewhere.singleton,
  StartInk.singleton,
  ReadLetterFromFather.singleton,
  GuardpostAboveChurchTakeShield.singleton
];
final allInks = <String, InkAst>{
  'conet_examine_ink': conetExamineInk,
  'talk_to_oracle_deathless_ink': talkToOracleDeathlessInk,
  'talk_to_oracle_doghead_ink': talkToOracleDogheadInk,
  'talk_to_oracle_dragon_egg_ink': talkToOracleDragonEggInk,
  'talk_to_oracle_earthquakes_ink': talkToOracleEarthquakesInk,
  'talk_to_oracle_greetings_ink': talkToOracleGreetingsInk,
  'talk_to_oracle_orcs_ink': talkToOracleOrcsInk,
  'talk_to_oracle_quake_1_ink': talkToOracleQuake1Ink,
  'talk_to_oracle_sixty_fiver_ink': talkToOracleSixtyFiverInk,
  'argo_ask_deathless_ink': argoAskDeathlessInk,
  'argo_ask_dragon_egg_ink': argoAskDragonEggInk,
  'argo_ask_quake_1_ink': argoAskQuake1Ink,
  'argo_greet_ink': argoGreetInk,
  'talk_to_miguel_about_deserting_ink': talkToMiguelAboutDesertingInk,
  'talk_to_miguel_after_caravan_departed_ink':
      talkToMiguelAfterCaravanDepartedInk,
  'talk_to_green_woman_about_slopes_death_ink':
      talkToGreenWomanAboutSlopesDeathInk,
  'talk_to_horseman_white_about_oracle_ink': talkToHorsemanWhiteAboutOracleInk,
  'talk_to_horseman_white_doghead_ink': talkToHorsemanWhiteDogheadInk,
  'talk_to_horseman_white_greetings_ink': talkToHorsemanWhiteGreetingsInk,
  'talk_to_horseman_white_quake_1_ink': talkToHorsemanWhiteQuake1Ink,
  'talk_to_horseman_white_retreat_ink': talkToHorsemanWhiteRetreatInk,
  'talk_to_ada_about_delving_ink': talkToAdaAboutDelvingInk,
  'talk_to_ada_about_dragon_egg_ink': talkToAdaAboutDragonEggInk,
  'talk_to_ada_about_oracle_ink': talkToAdaAboutOracleInk,
  'talk_to_ada_big_o_ink': talkToAdaBigOInk,
  'talk_to_ada_doghead_figure_ink': talkToAdaDogheadFigureInk,
  'talk_to_ada_greetings_ink': talkToAdaGreetingsInk,
  'talk_to_ada_quake_1_ink': talkToAdaQuake1Ink,
  'talk_to_ada_after_quake_2_ink': talkToAdaAfterQuake2Ink,
  'talk_to_kat_about_devling_ink': talkToKatAboutDevlingInk,
  'talk_to_kat_about_lady_ink': talkToKatAboutLadyInk,
  'talk_to_kat_greetings_ink': talkToKatGreetingsInk,
  'talk_to_miguel_about_brother_ink': talkToMiguelAboutBrotherInk,
  'talk_to_miguel_about_devling_ink': talkToMiguelAboutDevlingInk,
  'talk_to_miguel_about_dragon_egg_ink': talkToMiguelAboutDragonEggInk,
  'talk_to_miguel_about_lady_ink': talkToMiguelAboutLadyInk,
  'talk_to_miguel_greetings_ink': talkToMiguelGreetingsInk,
  'talk_to_kat_after_orc_offensive_ink': talkToKatAfterOrcOffensiveInk,
  'bleeds_blind_guide_big_o_ink': bleedsBlindGuideBigOInk,
  'bleeds_blind_guide_brother_ink': bleedsBlindGuideBrotherInk,
  'bleeds_blind_guide_delving_ink': bleedsBlindGuideDelvingInk,
  'bleeds_blind_guide_dragon_egg_ink': bleedsBlindGuideDragonEggInk,
  'bleeds_blind_guide_goblins_ink': bleedsBlindGuideGoblinsInk,
  'bleeds_blind_guide_greet_ink': bleedsBlindGuideGreetInk,
  'bleeds_blind_guide_oracle_ink': bleedsBlindGuideOracleInk,
  'bleeds_blind_guide_orcs_ink': bleedsBlindGuideOrcsInk,
  'bleeds_blind_guide_quake_1_ink': bleedsBlindGuideQuake1Ink,
  'bleeds_blind_guide_whats_wrong_ink': bleedsBlindGuideWhatsWrongInk,
  'sarn_slap_ink': sarnSlapInk,
  'start_ink_ink': startInkInk
};
