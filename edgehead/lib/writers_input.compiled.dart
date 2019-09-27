// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// WritersInputGenerator
// **************************************************************************

// ignore_for_file: constant_identifier_names
// ignore_for_file: unused_local_variable
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

class TalkToBriana1 extends RoamingAction {
  @override
  final String name = 'talk_to_briana_1';

  static final TalkToBriana1 singleton = TalkToBriana1();

  @override
  List<String> get commandPathTemplate => ['Talk to Briana'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(w.actionNeverUsed(name) && isRoamingInBloodrock(w))) {
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
    s.add(
        '_"You are new here, I think. What news can you tell me about the world outside?"_\n\n\nBriana shrugs. "How long have you been here?"\n\n\n_"Three years."_\n\n\n"Three years! Gods. A lot has happened. Just this winter, the orcs took over the upper valley. They are raiding way beyond Fort Ironcast now."\n',
        wholeSentence: true);
    return '${a.name} successfully performs TalkToBriana1';
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

class TalkToBriana2 extends RoamingAction {
  @override
  final String name = 'talk_to_briana_2';

  static final TalkToBriana2 singleton = TalkToBriana2();

  @override
  List<String> get commandPathTemplate => ['Ask Briana about her capture'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(w.actionHasBeenPerformed("talk_to_briana_1") &&
        w.actionNeverUsed(name) &&
        isRoamingInBloodrock(w))) {
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
    s.add(
        '_"Where were you captured?"_\n\n\n"At the Gate of Screams. I was trying to sneak in."\n\n\n_"You what?"_\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, and help win the war."\n',
        wholeSentence: true);
    return '${a.name} successfully performs TalkToBriana2';
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

class TalkToBriana3 extends RoamingAction {
  @override
  final String name = 'talk_to_briana_3';

  static final TalkToBriana3 singleton = TalkToBriana3();

  @override
  List<String> get commandPathTemplate => ['Ask Briana about Orcthorn'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(w.actionHasBeenPerformed("talk_to_briana_2") &&
        w.actionNeverUsed(name) &&
        isRoamingInBloodrock(w))) {
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
    s.add(
        '_"What is Orcthorn?"_\n\n\n"A sword. It’s killed hundreds of orcs, wielded by a half dozen legendary knights. The orcs have been trying to get Orcthorn for decades, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of warriors ambushed Lord Glencot. He wielded Orcthorn at the time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs have been bolder."\n\n\n_"The Mad Guardian."_\n\n\n"The mad who?"\n\n\n_"That is what Agruth and the other slavers were talking about a couple of weeks back. One orc was supposed to guard a sword. That seemed weird enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days. Now they keep him in a cell, and call him_ grach kamkorr _– The Mad Guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n',
        wholeSentence: true);
    Ruleset(
        Rule(54901828, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return a.currentRoomName == "slave_quarters_passage" &&
              !$(c).playerHasVisited("orcthorn_room");
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '_"Somewhere here in the slave quarters."_\n\nBriana\'s eyes go wide and nods towards the door.\n\n\n',
              wholeSentence: true);
        }),
        Rule(149905314, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return $(c).playerHasVisited("orcthorn_room") &&
              a.currentRoomName != "orcthorn_room";
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '_"Down the slave quarters."_\n\nBriana\'s eyes go wide. "The mad orc behind that door."\n\n\n',
              wholeSentence: true);
        }),
        Rule(764008120, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return $(c).playerHasVisited("slave_quarters_passage") &&
              !$(c).playerHasVisited("orcthorn_room");
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '_"Down the slave quarters."_\n\nBriana\'s eyes go wide. "That door in the slave quarters."\n\n\n',
              wholeSentence: true);
        }),
        Rule(435710016, 1, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return a.currentRoomName == "orcthorn_room";
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '_"Somewhere here in the slave quarters."_\n\nBriana\'s eyes go wide as she looks around the room.\n\n\n',
              wholeSentence: true);
        }),
        Rule(828906436, 0, false, (ApplicabilityContext c) {
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
              '_"Down the slave quarters."_\n\nBriana tenses. "Well then, at least we have that choice."\n\n\n',
              wholeSentence: true);
        })).apply(c);
    return '${a.name} successfully performs TalkToBriana3';
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

class SmelterThrowSpear extends RoamingAction {
  @override
  final String name = 'smelter_throw_spear';

  static final SmelterThrowSpear singleton = SmelterThrowSpear();

  @override
  List<String> get commandPathTemplate => ['Throw spear at the ogre'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'smelter') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name) &&
        w.actionHasBeenPerformed("war_forge_watch_workers") &&
        w.actionHasBeenPerformed("smelter_look_around") &&
        $(c).player.inventory.hasWeapon(WeaponType.spear))) {
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
    s.add(
        'You can\'t come any closer to the blind ogre — there is the pool of molten steel between you, and going around it would surely cause the nearby orcs to notice you. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou lean forward to get a little closer to the ogre and withdraw the spear.\n\n\nBriana gives you a puzzled look. "Wait…" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and impales the blind ogre\'s shoulder. Your heart skips a beat. It wasn’t a killing throw. The ogre will scream, the orcs will hear it — you\'re dead.\n\n\nBut the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand, stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream — the liquid swallows him whole. The orcs working on the other side of the room don\'t notice a thing.\n\n\n"Why would you do that?" Briana says, pointing where the blind ogre once stood. "You wasted a perfectly good spear on a stupid ogre. And he posed no threat to us."\n\n\n_"Listen."_\n\n\nThe distant voices coming from the war forges get slightly louder. Then louder again. Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou follow the short passage and crouch on the walkway above the war forges. You see chaos below: Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away.\n\n\nYou notice an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it, but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear…"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre …"\n\n\n_"One who was doing an important job."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The more complex you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',
        wholeSentence: true);
    executeSpearThrowAtOgre(c);
    return '${a.name} successfully performs SmelterThrowSpear';
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

final Room undergroundChurchAltarAfterCeremony = Room(
    'underground_church_altar_after_ceremony', null, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The altar is covered with black blood.\n\n', wholeSentence: true);
  rollBrianaQuote(c);
}, null, null,
    parent: 'underground_church_altar',
    prerequisite: Prerequisite(840572377, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return w.actionHasBeenPerformedSuccessfully("wait_for_ritual");
    }));
final Room orcthornRoom = Room('orcthorn_room', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The room is dark and wet. As you enter, the growls stop suddenly. You smell rotting flesh, and the stench fills your nostrils, forcing you to fight against vomitting. \n\n\nWhen your eyes adjust to the dark, you see a figure standing in front of you. You realize it\'s a male orc, but an especially large one, with huge muscles and dozens of scars. His face is in constant motion, overwhelmed by tics and waves of hate. Next to him is a heap of dead bodies.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The room is quiet. The Mad Guardian\'s huge body lies next to the heap of corpses.\n',
      wholeSentence: true);
}, generateMadGuardianFight, null);
final Approach orcthornRoomFromSlaveQuartersPassage =
    Approach('slave_quarters_passage', 'orcthorn_room', 'Open the door',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You open the door.\n', wholeSentence: true);
});

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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'guardpost_above_church') {
      return false;
    }
    if (!(w.actionNeverUsed(name))) {
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
    s.add(
        'You silently approach the goblin, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs and leans his head to the side, but stays asleep.\n\n\nYou take a few slow steps back, then grip the shield in your left hand, ready for anything.\n',
        wholeSentence: true);
    setUpStealShield(c, true);
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
        wholeSentence: true);
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
                'You stay completely still. After a while, the strain of holding the awkward position start to show. Your left leg  starts shaking. A bead of sweat is forming on your nose, threatening to fall on the goblin\'s leg.\n\n\n<p class="toast">Your stamina decreases by 1.</p>\n\n\nFortunately, the goblin shifts again and his expression gets visibly more relaxed. His breathing is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then grip the shield in your left hand, ready for anything.',
                wholeSentence: true);
            w.popSituation(sim);
            w.updateActorById(a.id, (b) => b..stamina -= 1);
            setUpStealShield(c, true);
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
            wholeSentence: true);
        w.popSituation(sim);
        setUpStealShield(c, false);
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

final Room smelter = Room('smelter', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A blast of smoke and heat greets you as you step into the room. A roaring fire draws your attention to the far wall, where thousands of orcs shovel coal into a giant furnace. They tilt huge kettles of molten steel into white-hot flowing rivers. This is the smelter.\n\n',
      wholeSentence: true);
  Ruleset(
      Rule(716584229, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("war_forge");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'You notice a smooth passage leading up and out of the smelter. You\'ll be able to go there unnoticed.\n',
            wholeSentence: true);
      }),
      Rule(488993248, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("guardpost_above_church");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel ends up — the war forges. You\'ll be able to go there unnoticed.\n',
            wholeSentence: true);
      })).apply(c);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The coal reflects the reds and whites of the molten steel.\n\n',
      wholeSentence: true);
  Ruleset(
      Rule(338283821, 2, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return w.actionHasBeenPerformedSuccessfully("smelter_look_around") &&
            !w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'About a spear\'s throw away, the blind ogre is {idling|waiting for commands from the forges}.\n\n\n',
            wholeSentence: true);
      }),
      Rule(1053387971, 0, false, (ApplicabilityContext c) {
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
  rollBrianaQuote(c);
}, null, null);
final Approach smelterFromWarForge =
    Approach('war_forge', 'smelter', 'Go to smelter', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You keep low, ascending the stairs. When you reach the top, you feel a wave of hot air coming from a passage in the wall. You make your way through it.\n',
      wholeSentence: true);
});
final Approach smelterFromGuardpostAboveChurch =
    Approach('guardpost_above_church', 'smelter', 'Go to the smelter',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You take the passage down. The temperature gradually rises until you see an opening.\n',
      wholeSentence: true);
});

class SmelterLookAround extends RoamingAction {
  @override
  final String name = 'smelter_look_around';

  static final SmelterLookAround singleton = SmelterLookAround();

  @override
  List<String> get commandPathTemplate => ['Look around'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'smelter') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name))) {
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
    s.add(
        'Molten iron runs in rivers across the room, and gathers in a large pool. From that pool, a single ogre distributes the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear\'s throw away from you, but he doesn\'t notice. In fact, since you’re able to get so close, you would even guess that he\'s blind, probably because of all the sudden flashes from the molten steel around him. Yet he\'s performing his job perfectly, listening to commands from orcs in the war forges beyond the wall, and operating the floodgates accordingly.\n',
        wholeSentence: true);
    return '${a.name} successfully performs SmelterLookAround';
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

final Room slaveQuartersPassage =
    Room('slave_quarters_passage', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You can see Briana clutching her fists. "Homesick already?" she says. She doesn\'t wait for reply, and presses on.\n\n\nIt doesn\'t take long before you start hearing voices. Orcs and goblins shouting commands. Then human screams.\n\n\nThe tunnel gets wider and more torches light your way. The walls are smoother. \n\n\nYou hear heavy breathing and rustling up ahead, and you stop in your tracks, next to a small reinforced door.\n\n\nA human slave runs down the passage toward you. His arm is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips move but he makes no sound. Eyes blurred with tears, he doesn\'t see you.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave. A bloodied spearhead appears in the center of the man\'s chest, as if it grew from his body. His tearful eyes glance at the fatal wound. Two more steps toward you and the slave falls face down, the shaft of the spear protruding from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking toward the dead man. The orc is laughing, patting his companion on the back. "Vicious throw, small one!" he roars.\n\n\nYou step back and motion to Briana to lean against the wall, hoping that the door\'s reinforced frame will keep you hidden from the two slavers.\n\n\nBut right then, something or someone pounds on the reinforced door from the inside. You hear loud and angry growls.\n\n\nThe two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They run toward you.\n\n\n![Picture of the sadistic slavers](https://egamebook.com/vermin/v/latest/img/sadistic-slavers.jpg)\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  Ruleset(
      Rule(46934531, 2, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).playerHasVisited("orcthorn_room") &&
            !$(c).justCameFrom("orcthorn_room");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add('  The reinforced door on the side of the corridor is silent.\n',
            wholeSentence: true);
      }),
      Rule(847105853, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).playerHasVisited("orcthorn_room");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
      }),
      Rule(729288676, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return !$(c).playerHasVisited("orcthorn_room");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add('  The reinforced door on the side of the corridor is closed.\n',
            wholeSentence: true);
      })).apply(c);
  rollBrianaQuote(c);
}, generateSlaveQuartersPassageFight, null);
final Approach slaveQuartersPassageFromCaveWithAgruth = Approach(
    'cave_with_agruth', 'slave_quarters_passage', 'Go to the slave quarters',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You and Briana hug the wall and start toward the slave quarters.\n',
      wholeSentence: true);
});
final Approach slaveQuartersPassageFromSlaveQuarters = Approach(
    'slave_quarters', 'slave_quarters_passage', 'Go back', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You nod, and then start carefully backing out through the passage.\n',
      wholeSentence: true);
});
final Approach slaveQuartersPassageFromOrcthornRoom =
    Approach('orcthorn_room', 'slave_quarters_passage', 'Exit the room',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You leave through the door and find yourself back in the passage to the slave quarters.\n',
      wholeSentence: true);
});

class SlaveQuartersPassageExamineDoor extends RoamingAction {
  @override
  final String name = 'slave_quarters_passage_examine_door';

  static final SlaveQuartersPassageExamineDoor singleton =
      SlaveQuartersPassageExamineDoor();

  @override
  List<String> get commandPathTemplate => ['Examine the door'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'slave_quarters_passage') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name) &&
        !(w.currentSituation as RoomRoamingSituation).monstersAlive &&
        !$(c).playerHasVisited("orcthorn_room"))) {
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
    s.add(
        'You hear violent grunts and growls coming from behind that door. Next to it, you see orcish writing on the wall. It says "Danger mad. Give food go away."\n\n\n',
        wholeSentence: true);
    if (w.actionHasBeenPerformed("talk_to_briana_3")) {
      s.add("""
You look at Briana and nod.


_"The Mad Guardian."_
""", wholeSentence: true);
    }

    return '${a.name} successfully performs SlaveQuartersPassageExamineDoor';
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

final Room slaveQuarters = Room('slave_quarters', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      '"There is a difference between being brave and being stupid. You\'re crossing it right now," she says.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('"We _really_ shouldn\'t push our luck," she says.\n',
      wholeSentence: true);
}, null, null);
final Approach slaveQuartersFromSlaveQuartersPassage = Approach(
    'slave_quarters_passage',
    'slave_quarters',
    'Go further toward the Gate of Screams', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You start down the slope of the passage, toward the heart of the slave’s quarters and the Gate of Screams beyond. Briana tugs at your hand.\n',
      wholeSentence: true);
});

class SlaveQuartersContinue extends RoamingAction {
  @override
  final String name = 'slave_quarters_continue';

  static final SlaveQuartersContinue singleton = SlaveQuartersContinue();

  @override
  List<String> get commandPathTemplate => ['Continue'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'slave_quarters') {
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
    s.add(
        '_"Do you not want to kill some more orcs?"_\n\n\n"I do, trust me. I just don\'t want to get killed first."\n\n\nYou shake your head and start walking. Briana reluctantly follows, her eyes darting around the familiar tunnel. You\'re close to where the orcs had kept you during sleeping hours.\n\n\nSoon, you see an orc patrol appear from behind a bend. Here, it\'s impossible to hide. The orcs spot you immediatelly. \n\n\nThere are three of them, one has a longsword, the second has a spear, and the third holds a large battle axe.\n\n\nThe orc with the spear hurls it, and it pierces Briana\'s shoulder. She screams in pain. \n\n\nThe orc with the sword makes three fast leaps toward you, and swings his weapon. You have no time to react, and the blade slits your throat. You gurgle and your arms flail in surprise.\n\n\nYou look at Briana. As the battle axe cleaves her stomach, the two of you hold eye contact.\n',
        wholeSentence: true);
    w.updateActorById(a.id, (b) => b..hitpoints = 0);
    w.popSituation(sim);
    return '${a.name} successfully performs SlaveQuartersContinue';
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

final Room testFightGoblin = Room('test_fight_goblin', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'This is a development-only test fight. If you still see this in a production\nbuild, it\'s a bug.\n\nA goblin stands in front of you, wielding a spear. Between the two of you,\na plain dagger lies on the ground. You also notice a nice, solid rock in the\nrubble.\n\nYou are barehanded.\n',
      wholeSentence: true);
}, null, generateTestFightWithGoblin, null);
final Approach testFightGoblinFromPreStartBook = Approach(
    'pre_start_book',
    'test_fight_goblin',
    'Playtest >> one-on-one test fight >> with a goblin', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You get transported to the development testing arena.\n',
      wholeSentence: true);
});
final Approach endOfRoamFromTestFightGoblin = Approach(
    'test_fight_goblin', '__END_OF_ROAM__', 'End game', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room undergroundChurch = Room('underground_church', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You enter a room that at first looks like a large, twisting cave. But then it opens into a high-ceilinged space with many columns. This must be what the orcs call the Underground Church. Dim light shines from the far end of the room, where you’d expect the altar to be, but you can\'t quite see it. There are no torches here. And it’s eerily quiet. \n\n\nYour bare footsteps reverberate in the room, so you slow down to quiet them. \n\n',
      wholeSentence: true);
  Ruleset(
      Rule(513393440, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("cave_with_agruth");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'After a bit of searching, you also notice a twisting passage going from the right side of the Church and sloping upward. That must be the way out.\n\n',
            wholeSentence: true);
      }),
      Rule(449655042, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("guardpost_above_church");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'Not far from here, a tunnel leads slightly downward, back to where you killed Agruth.\n\n',
            wholeSentence: true);
      })).apply(c);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The temple is silent, as if it were holding its breath.\n\n',
      wholeSentence: true);
  rollBrianaQuote(c);
}, null, null);
final Approach undergroundChurchFromCaveWithAgruth = Approach(
    'cave_with_agruth', 'underground_church', 'Go to the Unholy Church',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You make it to the Church undetected.\n', wholeSentence: true);
});
final Approach undergroundChurchFromGuardpostAboveChurch = Approach(
    'guardpost_above_church',
    'underground_church',
    'Descend toward the Underground Church', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You take the passage leading down toward the temple.\n',
      wholeSentence: true);
});
final Approach undergroundChurchFromUndergroundChurchAltar =
    Approach('underground_church_altar', 'underground_church', 'Sneak back',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You crouch low and, keeping an eye on the altar, move back to the Church\'s entrance.\n',
      wholeSentence: true);
});

class ExamineUndergroundChurch extends RoamingAction {
  @override
  final String name = 'examine_underground_church';

  static final ExamineUndergroundChurch singleton = ExamineUndergroundChurch();

  @override
  List<String> get commandPathTemplate => ['Look around'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'underground_church') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name))) {
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
    s.add(
        'This place wasn’t built by the orcs or their slaves. The walls are straight and smooth. The ceiling is high enough to make you feel small and insignificant. The columns are decorated with delicate carvings of skulls and tentacles.\n\n\n"What are these things?" Briana whispers, looking at the ornaments.\n\n\n_"This place was made for worshiping the Dead Prince."_\n\n\nSaying the name brings coldness and sweat to your brow. You hear the name every night in the Dead Prince\'s tongue — but it has been a long time since you said it yourself.\n\n\n"Worshiping?" Briana glances up at the high ceiling, and then around the temple. "I thought the Dead Prince was a warlord. Something like that."\n\n\n_"He is a god."_\n\n\n',
        wholeSentence: true);
    if (!w.actionHasBeenPerformed("wait_for_ritual")) {
      s.add(
          """Briana smirks. "Look, no. The Dead Prince is no god. The orcs might think so, but you really shouldn't. He's a demented illusionist at best." 
""",
          wholeSentence: true);
    }

    s.add(
        '\n\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than a god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',
        wholeSentence: true);
    return '${a.name} successfully performs ExamineUndergroundChurch';
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

final Room undergroundChurchAltar =
    Room('underground_church_altar', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The altar is a simple block of stone at the back of the temple. On the wall above it, you see a large ornament portraying an octopus with eight black eyes at the tips of its tentacles. It\'s the sign of the Dead Prince. You have never seen it in real life but you’ve seen it in your dreams often enough.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we have to linger in this mountain much longer, I\'d rather kill some orcs than sneak around in a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but the otherwise steady light from the altar flickers like a flame, and you both duck behind a large column. You almost trip over a spear lying on the ground.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The altar glows with a dim red light that reflects and shimmers in the eight black eyes above it.\n',
      wholeSentence: true);
}, null, null);
final Approach undergroundChurchAltarFromUndergroundChurch = Approach(
    'underground_church', 'underground_church_altar', 'Go towards the altar',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You sneak toward the front of the temple, trying to stay in the shadows.\n',
      wholeSentence: true);
});

class WaitForRitual extends RoamingAction {
  @override
  final String name = 'wait_for_ritual';

  static final WaitForRitual singleton = WaitForRitual();

  @override
  List<String> get commandPathTemplate => ['Wait'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'underground_church_altar') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name))) {
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
    s.add(
        'You move into the shadows and wait. After a few heartbeats, there is a scraping sound — stone against stone. You lean out from your hiding place and see a section of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters through the stone door. Suddenly, the whole temple reverberates with a strong, dissonant tone that is both sickening and powerful. As if the whole mountain were groaning. \n\n\nFollowing the orc priest, a huge creature enters through the door, crouching below its frame. It\'s unclear what the creature is, exactly, but it could be some large breed of ogre. Judging by the braided hair, it\'s a female. Her sword — attached to her hip with a rope — is as long as you are tall. \n\n\nWhen she enters the temple and stands upright, you can see that she is leading someone in by a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them — the priest, the ogre and the orc — walk to the front of the altar and stand before it, facing the symbol of the octopus, their backs facing you and Briana.\n\n\nThe dissonant tone stops. You lean a little further out from your hiding place to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but he obeys. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\nSomehow, you know.\n\n\n_"Maggots."_\n\n\nBriana gives you a puzzled look, then turns back to the ritual. From the shadows in the base of the altar, a swarm of large black insects starts to make its way up toward the terrified orc. The priest lifts his arms in silent worship.\n\n\n![Picture of the sadistic slavers](https://egamebook.com/vermin/v/latest/img/altar.jpg)\n\n\nThe ogre pushes down on the orc, preparing for the inevitable struggle. The orc knows what’s coming, and he opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s surface, onto the orc\'s body, and move straight toward his face. They move faster now.\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, to no avail. The dissonant tone gets even louder. The whole temple quivers. You feel like your ear drums will collapse. The sound permeates everything.\n\n\nSuddenly, the terror of the moment is fully replaced by an invigorating feeling of power. You take a breath and feel stronger, refreshed.\n\n\n<p class="toast">Your stamina increases by 1.</p>\n\n\nYou notice that the priest inhales deeply as well.\n\n\nThen, the sound stops and the orc\'s body collapses into itself. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again and — without saying anything — heads back to the stone door. The ogre takes the orc\'s dead body, throws it over her shoulder, and follows the priest. In a few heartbeats, they are all gone and the door closes. A new pool of blood on the altar is the only reminder of what happened.\n\n\nBriana stares ahead. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head. "Let\'s… let\'s just get out of here."\n',
        wholeSentence: true);
    $(c).giveStaminaToPlayer(1);
    return '${a.name} successfully performs WaitForRitual';
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

class TakeSpearInUndergroundChurch extends RoamingAction {
  @override
  final String name = 'take_spear_in_underground_church';

  static final TakeSpearInUndergroundChurch singleton =
      TakeSpearInUndergroundChurch();

  @override
  List<String> get commandPathTemplate => ['Take the spear'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'underground_church_altar') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name))) {
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
    s.add(
        'It\'s a primitive short spear that probably belonged to a goblin. You take it in your hand, feeling the cool, wet wood and patches of mold along it. It must have been here for a while. \n\n\nBut it’s sturdy in your hand. A good throwing weapon.\n',
        wholeSentence: true);
    giveGoblinsSpearToPlayer(w);
    return '${a.name} successfully performs TakeSpearInUndergroundChurch';
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

final Room testFightOrc = Room('test_fight_orc', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'This is a development-only test fight. If you still see this in a production\nbuild, it\'s a bug.\n\nAgruth the orc stands in front of you, wielding a sword. Between the two of you,\na plain dagger lies on the ground.\n\nYou are wielding a short sword.\n',
      wholeSentence: true);
}, null, generateTestFightWithOrc, null);
final Approach testFightOrcFromPreStartBook = Approach(
    'pre_start_book',
    'test_fight_orc',
    'Playtest >> one-on-one test fight >> with an orc', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You get transported to the development testing arena.\n',
      wholeSentence: true);
});
final Approach endOfRoamFromTestFightOrc = Approach(
    'test_fight_orc', '__END_OF_ROAM__', 'End game', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room startAdventure = Room('start_adventure', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The path from slavery to power begins with a single crack of a whip. Briana spins around, her face red with pain and anger. She is new here, but she knows what is coming.\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves.\n\n\n![Agruth whips Briana](https://egamebook.com/vermin/v/latest/img/agruth-attack.jpg)\n\n\nAnother crack and there is new blood pouring from a gash in Briana\'s face. Agruth grins.\n\n\nNobody else is in sight. It\'s just you, Agruth, and Briana. That\'s Agruth\'s first mistake.\n\n',
      wholeSentence: true);
  w.actors.removeWhere((actor) => !actor.isPlayer && actor.id != brianaId);
}, null, generateAgruthFight, null);
final Approach startAdventureFromPreStartBook = Approach(
    'pre_start_book', 'start_adventure', 'DEBUG >> Smoke test \'Vermin\'',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room testFightOrcAndGoblin =
    Room('test_fight_orc_and_goblin', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'This is a development-only test fight. If you still see this in a production\nbuild, it\'s a bug.\n\nAn orc and a goblin stand in front of you. The orc is wielding a sword,\nthe goblin is holding a spear.\n\nYou are wielding a short sword.\n',
      wholeSentence: true);
}, null, generateTestFightWithOrcAndGoblin, null);
final Approach testFightOrcAndGoblinFromPreStartBook = Approach(
    'pre_start_book',
    'test_fight_orc_and_goblin',
    'Playtest >> one-on-two test fight >> with an orc and goblin',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You get transported to the development testing arena.\n',
      wholeSentence: true);
});
final Approach endOfRoamFromTestFightOrcAndGoblin =
    Approach('test_fight_orc_and_goblin', '__END_OF_ROAM__', 'End game',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room warForgeAfterIronMonster = Room('war_forge_after_iron_monster',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The chaos! It\'s palpable.\n', wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('Pure chaos everywhere.\n\n', wholeSentence: true);
  rollBrianaQuote(c);
}, null, null,
    parent: 'war_forge',
    prerequisite: Prerequisite(426251910, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
    }));
final Room guardpostAboveChurch =
    Room('guardpost_above_church', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You enter a small circular room. You see three openings that lead to passages, each marked with crude writing.\n\n',
      wholeSentence: true);
  Ruleset(
      Rule(1066693326, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("smelter");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these passages slope downwards.\n\n',
            wholeSentence: true);
      }),
      Rule(666999442, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("underground_church");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these passages slope downward.\n\n',
            wholeSentence: true);
      })).apply(c);
  s.add(
      '\nA third passage is marked "Up Door".  Beyond the opening, you see a steep stairway leading upward. This is it. Your final path to escape.\n\nFor the first time, you see a smile on Briana\'s face. Not a smirk or a battle snarl, but a genuine smile. "_Up Door?_" she whispers, shaking her head. "I can\'t believe we\'ve made it this far."\n\nJust inside the “Up Door” path sits a goblin guard. You’re in luck: He\'s sleeping. He loosely holds a scimitar in one hand, and has a shield laid on his lap.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  Ruleset(
      Rule(540437251, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return w.wasKilled(sleepingGoblinId);
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'The goblin\'s corpse is sprawled on the ground in the middle of the circular room.\n',
            wholeSentence: true);
      }),
      Rule(374419935, 0, false, (ApplicabilityContext c) {
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
            'The goblin is sleeping soundly next to the passage to the Upper Door.\n',
            wholeSentence: true);
      })).apply(c);
}, null, null);
final Approach guardpostAboveChurchFromUndergroundChurch = Approach(
    'underground_church', 'guardpost_above_church', 'Enter the upwards passage',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You take the sloping passage and walk upward for a long time.\n',
      wholeSentence: true);
});
final Approach guardpostAboveChurchFromTunnelCancelChance =
    Approach('tunnel_cancel_chance', 'guardpost_above_church', 'Return',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You nod and step back into the circular room.\n', wholeSentence: true);
});
final Approach guardpostAboveChurchFromSmelter = Approach(
    'smelter', 'guardpost_above_church', 'Go through the smooth passage',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You take the smooth passage and it leads you slightly upwards.\n',
      wholeSentence: true);
});

class GuardpostAboveChurchEnterTunnelWithCancel extends RoamingAction {
  @override
  final String name = 'guardpost_above_church_enter_tunnel_with_cancel';

  static final GuardpostAboveChurchEnterTunnelWithCancel singleton =
      GuardpostAboveChurchEnterTunnelWithCancel();

  @override
  List<String> get commandPathTemplate => ['Go to the Upper Door'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'guardpost_above_church') {
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
    s.add('You take the passage that leads to the Upper Door.\n',
        wholeSentence: true);
    enterTunnelWithCancel(c);
    return '${a.name} successfully performs GuardpostAboveChurchEnterTunnelWithCancel';
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

final Room tunnel = Room('tunnel', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Almost as soon as the circular room disappears from your line of sight, loud shouting rises from deep within the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear dozens of orc and goblin feet stomping.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight. The stairs get steeper and steeper until you feel like you’re climbing a ladder.\n\n\n"I have…" Briana gasps, catching her breath. "I have not fought my way through the depths of Mount Bloodrock just to die of exhaustion on its doorstep."\n\n\n_"That… that would be disappointing, yes."_\n\n\nThe sounds from behind grow louder. You can now pick out individual voices, although not what they are saying.\n\n\nThe stairway suddenly makes a sharp left turn and levels out. Tasting blood on the roof of your mouth, your whole body demands that you stop — but you start running anyway. Briana follows close behind.\n\n\nThe light in the tunnel gets brighter and the air gets colder. Suddenly, just when you can smell fresh air, an orc and a goblin jump out in front of you from a slimy crevice, swords in hands.\n\n\n![Picture of the Upper Door guard](https://egamebook.com/vermin/v/latest/img/orc_and_goblin_sketch.jpg)\n\n\nThey must be guarding the Upper Door. There is no way around them.\n',
      wholeSentence: true);
}, null, generateEscapeTunnelFight, null);
final Approach tunnelFromTunnelCancelChance =
    Approach('tunnel_cancel_chance', 'tunnel', 'Continue', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You shake your head and continue through the passage. Soon, you find yourself climbing a steep, poorly lit stairway. Briana catches up with you quickly.\n',
      wholeSentence: true);
});
final Room tunnelCancelChance = Room('tunnel_cancel_chance', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'After a few strides, you realize Briana is still standing in the circular room behind you.\n\n\n_"Are you not coming?"_\n\n\nBriana hesitates. "It feels like we could have done more." She motions toward the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. I mean, we might be the first slaves in Mount Bloodrock to survive."\n',
      wholeSentence: true);
}, null, null, null);
final Room exitFromBloodrock = Room('exit_from_bloodrock', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Only a few bends ahead, the tunnel gets blindingly bright and you catch the scent of fresh mountain air. The surface! For the first time in three years, you hear the howling wind.\n\n\nYou run through a small stone doorway and out of the mountain.\n\n\nThe blinding sun makes you squint. You let the wind chill your muscles and then you jump down a steep descending path.\n\n\nOutside, you and Briana have the upper hand. The orcs and goblins are used to the dark, dank caves, and they come out only when they must.\n\n\nSoon, the orcs and goblins stop following altogether, presumably leaving the two of you to their aboveground brothers.\n\n\nYou look around for a safe route. At first, you cannot make much sense of what you see — this is nothing like the country you left three years ago. Black smoke rises from orc camps and razed villages. You look out over the burned forests and notice the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview Hill. You see no birds, only some horrible dark eagle-like creatures that have no heads circling in both directions above Mount Bloodrock.\n\n\n![View of the road ahead](https://egamebook.com/vermin/v/latest/img/path.jpg)\n\n\nBriana doesn\'t seem surprised.\n\n\n_"We have to stop this."_\n\nBriana follows your gaze, then shakes her head. "This is bigger than us, Aren. This is a problem for kings, not peasants."\n\n_"No king has what we have."_\n\n\n',
      wholeSentence: true);
  Ruleset(
      Rule(759499160, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return w.actionHasBeenPerformed("take_orcthorn");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            '"Orcthorn? Bah, you think they\'ll let you keep it? A farmhand?"\n\n_"I am_ not _a farmhand. And I do not mean Orcthorn, no. I have a strange connection. We both do."_\n',
            wholeSentence: true);
      }),
      Rule(46118044, 0, false, (ApplicabilityContext c) {
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
            '"Let me guess. Muscles and a bit of brains? Don\'t be a fool, you\'re still a farmhand."\n\n_"I am_ not _a farmhand. And I don\'t mean muscles or brains, no. I have a strange connection. We both do."_\n',
            wholeSentence: true);
      })).apply(c);
  s.add(
      '\n\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. You feel it, too — I am sure of it — but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is… a way to communicate? Or negotiate with him?"\n\n\n_"Negotiate? No, I do not have anything the Dead Prince wants. I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"So what’s the plan?"\n\n\n_"Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run, slay some orcs along the way, and get as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"Anyone else would do exactly that."\n\n\n_"But we will not."_\n\n\nBriana sighs. "No, I suppose we won\'t."\n\n\nWith that, you both start down the road toward the black fort in the distance.\n\n\nTHE END.\n\n\n',
      wholeSentence: true);
  describeSuccessRate(c);
}, null, null, null);
final Approach exitFromBloodrockFromTunnel = Approach(
    'tunnel', 'exit_from_bloodrock', 'Start running again', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You start running again.\n', wholeSentence: true);
});
final Approach endOfRoamFromExitFromBloodrock =
    Approach('exit_from_bloodrock', '__END_OF_ROAM__', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room warForge = Room('war_forge', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You enter the enormous cave that houses Mount Bloodrock\'s war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Large crooked  bats circle just below the clouds, their shrieks mixing with the clangs of steel and constant angry shouts from below.\n\n\n',
      wholeSentence: true);
  Ruleset(
      Rule(411943067, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("cave_with_agruth");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'You and Briana duck behind two carts on a walkway that leads up above the cave’s floor. You can see a flight of stairs ahead that hugs one side of the cave, and follows a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there’s no one in the way.\n\n',
            wholeSentence: true);
      }),
      Rule(1054440166, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).justCameFrom("smelter");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add(
            'You and Briana stand on a walkway high above the cave’s floor. You can see a flight of stairs ahead that hugs one side of the cave, and leads toward the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, toward the slave quarters, and where you slayed Agruth. There’s no one in the way.\n\n',
            wholeSentence: true);
      })).apply(c);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The air in the war forge is thick and makes breathing difficult, and the constant noise is overwhelming.\n\n\n',
      wholeSentence: true);
  rollBrianaQuote(c);
}, null, null);
final Approach warForgeFromSmelter =
    Approach('smelter', 'war_forge', 'Go to the war forges', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You walk through a short passage lined with stone, and toward the sound of hundreds of hammers clanging against anvils.\n',
      wholeSentence: true);
});
final Approach warForgeFromCaveWithAgruth = Approach(
    'cave_with_agruth', 'war_forge', 'Go to the war forges', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You sneak through the black passage, toward the sound of hundreds of anvils.\n',
      wholeSentence: true);
});

class WarForgeLookAround extends RoamingAction {
  @override
  final String name = 'war_forge_look_around';

  static final WarForgeLookAround singleton = WarForgeLookAround();

  @override
  List<String> get commandPathTemplate => ['Look around'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'war_forge') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name))) {
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
    s.add(
        'The cave is natural, but on the side of the smelter you see an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into every section of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot mixes with the stench of all that orc sweat.\n\n\nThis place makes Fort Ironcast\'s military forge look like a doll house: tiny and inconsequential.\n',
        wholeSentence: true);
    return '${a.name} successfully performs WarForgeLookAround';
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

class WarForgeWatchWorkers extends RoamingAction {
  @override
  final String name = 'war_forge_watch_workers';

  static final WarForgeWatchWorkers singleton = WarForgeWatchWorkers();

  @override
  List<String> get commandPathTemplate => ['Watch the workers'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'war_forge') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name) &&
        w.actionHasBeenPerformed("war_forge_look_around"))) {
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
    s.add(
        'You look out from your hiding spot and scan the room. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres." A smirk forms on her lips. "They must be terrified."\n\n\nYou scan the workers more closely. The slow-moving ogres tower over the orcs. \n\n\n_"And they don\'t use slaves here. They must be doing something important."_\n\n\nLooking again at the molds they are using, you don\'t see anything strange or unexpected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. \n\n\nYou follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. It’s an enormous, repulsive, half-assembled insect. Each leg reaches as far as you could throw a rock. And there are eight of them. Then there\'s the body — a huge cockroach-like contraption forged from steel. The teeth are already completed, sharp and menacing, and as long as a man is tall. \n\n\nA full-sized ogre pours water over one section of the creature, making a thick cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',
        wholeSentence: true);
    return '${a.name} successfully performs WarForgeWatchWorkers';
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

class TakeOrcthorn extends RoamingAction {
  @override
  final String name = 'take_orcthorn';

  static final TakeOrcthorn singleton = TakeOrcthorn();

  @override
  List<String> get commandPathTemplate => ['Search for Orcthorn'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'orcthorn_room') {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_briana_3") &&
        !w.actionHasBeenPerformed(name) &&
        !(w.currentSituation as RoomRoamingSituation).monstersAlive)) {
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
    s.add(
        'You and Briana nod at each other and start searching the room. The Mad Guardian has left many bizarre things scattered around: A box of severed orc hands, crude drawings of tentacles covering one of the walls, several gouged out eyes, a circle made from half-eaten rats with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in her hand. "He must _really_ have gone mad. From fear or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The stench of rotten flesh is so strong you see pale fumes coming from the pile. Briana shields her nose with an elbow and starts dragging the less rotten corpses from the top. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nAfter what feels like hours, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. You pull it from the pile and hold it in the air: the brightest, sharpest sword you have ever seen.\n\n\n![Picture of Orcthorn](https://egamebook.com/vermin/v/latest/img/orcthorn.jpg)\n\n\n"Orcthorn," Briana nods and surveys its blade and hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of The Mad Guardian." And all this because of a common soldier and a farmhand," she says to the lifeless face.\n\n\n_"I am not a farmhand. And we still need to get out of here first."_\n',
        wholeSentence: true);
    takeOrcthorn(sim, w, a);
    return '${a.name} successfully performs TakeOrcthorn';
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

final Room caveWithAgruth = Room('cave_with_agruth', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The tunnel back to the main slave quarters is likely suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. \n\n\nThat leaves two options: the black passage toward the war forges and the deserted tunnel to the Unholy Church, an underground temple. Both these paths eventually lead to the Upper Door, which will bring you out of the caves close to Mount Bloodrock\'s mountaintop.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The corpse lies still, getting cold.\n\n\n', wholeSentence: true);
  rollBrianaQuote(c);
}, null, null);
final Approach caveWithAgruthFromUndergroundChurch = Approach(
    'underground_church',
    'cave_with_agruth',
    'Go back to the cave with Agruth\'s corpse', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You walk slowly out of the church, back toward where you left Agruth\'s body.\n',
      wholeSentence: true);
});
final Approach caveWithAgruthFromSlaveQuartersPassage = Approach(
    'slave_quarters_passage',
    'cave_with_agruth',
    'Go back to the cave where Agruth\'s corpse lies', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You back away from the door, and go back to where you left Agruth\'s body.\n',
      wholeSentence: true);
});
final Approach caveWithAgruthFromWarForge = Approach(
    'war_forge',
    'cave_with_agruth',
    'Go back to the cave with Agruth\'s corpse', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You sneak back toward where you left Agruth\'s body.\n',
      wholeSentence: true);
});

class SearchAgruth extends RoamingAction {
  @override
  final String name = 'search_agruth';

  static final SearchAgruth singleton = SearchAgruth();

  @override
  List<String> get commandPathTemplate => ['Search Agruth'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'cave_with_agruth') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name))) {
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
    s.add(
        'You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a _troma_ herb. This boosts your energy right when you need it – very handy. \n\n\n<p class="toast">Your stamina increases by 1.</p>\n',
        wholeSentence: true);
    $(c).giveStaminaToPlayer(1);
    return '${a.name} successfully performs SearchAgruth';
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
  String get helpMessage =>
      'You have taken his weapon but there might be other useful items in his pocket.';
  @override
  bool get isAggressive => false;
}

final Room justAfterAgruthFight =
    Room('just_after_agruth_fight', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You are Aren, a slave. You have spent three painful years inside this mountain, surrounded by the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here.\n\n\nBriana stands towering over Agruth\'s corpse. She smooths her hair back and looks down into the expanding pool of Agruth\'s blood, using it as a mirror.\n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve to die, or worse. And I think it will be satisfying to kill them with their own swords." She kicks the dead slaver in the hip.\n\n\n_"That one is already dead."_\n\n\n"Just making sure," she says.\n\n\n![Agruth\'s sword](https://egamebook.com/vermin/v/latest/img/agruth-sword.jpg)\n\n\nShe turns her attention to the sword. "We should name it. Named weapons please the gods. And I refuse to have this thing around thinking of it as _Agruth\'s sword_." She makes a pained grimace when she says the orc\'s name.\n',
      wholeSentence: true);
}, null, null, null);
final Approach justAfterAgruthFightFromStartAdventure =
    Approach('start_adventure', 'just_after_agruth_fight', 'End fight',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You look around. Fortunately, there’s no one in sight.\n',
      wholeSentence: true);
});

class NameAgruthSwordOpportunity extends RoamingAction {
  @override
  final String name = 'name_agruth_sword_opportunity';

  static final NameAgruthSwordOpportunity singleton =
      NameAgruthSwordOpportunity();

  @override
  List<String> get commandPathTemplate => ['"Luck Bringer"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
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
    s.add(
        '_"We will call it Luck Bringer. We got lucky with Arguth, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',
        wholeSentence: true);
    nameAgruthSword(w, "Luck Bringer");
    $(c).movePlayer("cave_with_agruth");
    return '${a.name} successfully performs NameAgruthSwordOpportunity';
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

class NameAgruthSwordRedemption extends RoamingAction {
  @override
  final String name = 'name_agruth_sword_redemption';

  static final NameAgruthSwordRedemption singleton =
      NameAgruthSwordRedemption();

  @override
  List<String> get commandPathTemplate => ['"Savior"'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
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
    s.add(
        '_"We will call it Savior. Getting it was our first step toward freedom. The sword should have killed us, and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',
        wholeSentence: true);
    nameAgruthSword(w, "Savior");
    $(c).movePlayer("cave_with_agruth");
    return '${a.name} successfully performs NameAgruthSwordRedemption';
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

class NameAgruthSwordNothing extends RoamingAction {
  @override
  final String name = 'name_agruth_sword_nothing';

  static final NameAgruthSwordNothing singleton = NameAgruthSwordNothing();

  @override
  List<String> get commandPathTemplate => ['No name'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
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
    s.add(
        '_"That is foolish. It is just a sword, after all."_\n\n\nBriana shrugs. "Whatever, just don\'t ever call it _Agruth\'s sword._ I already have more respect to this piece of iron than to that worthless animal. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',
        wholeSentence: true);
    $(c).movePlayer("cave_with_agruth");
    return '${a.name} successfully performs NameAgruthSwordNothing';
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

class ReadLetterFromFather extends RoamingAction {
  @override
  final String name = 'read_letter_from_father';

  static final ReadLetterFromFather singleton = ReadLetterFromFather();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'letter from father', 'read'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(w.actionNeverUsed(name) && $(c).isInIdleRoom)) {
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
    s.add(
        'I take the letter from my pocket and read it.\n\nSon,\n\nI learned about your plans from a family friend. Although I hope you don\'t mean to execute them, I am writing this letter. I will come back home as soon as I am able.\n\nThere is good life for you in Zamora, despite everything. The plains may seem dull to your young heart, but they are safe, and plentiful.\n\nTo be completely honest, I am surprised by the brash move. From you, of all people. Remember your health. Stay home and continue your training.\n\nAnd remember, revenge won\'t bring your mother back from the dead.\n\n- Father\n',
        wholeSentence: true);
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

class ReadLetterFromMentor extends RoamingAction {
  @override
  final String name = 'read_letter_from_mentor';

  static final ReadLetterFromMentor singleton = ReadLetterFromMentor();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', 'letter from mentor', 'read'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if (!(w.actionNeverUsed(name) && $(c).isInIdleRoom)) {
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
    s.add(
        'I take the letter from my pocket and read it.\n\nMy young friend,\n\nYou ask good questions. But before I will answer them, we must do something with your situation.\n\nYou must understand that a necromancer cannot be poor. There is no glory for practitioners of our profession unless we wield the resources and power to lead others.\n\nIt\'s not my place, or style, to share my wealth with you. But I can do something more exciting.\n\nWith this letter, the messenger should have also brought you a book. If he did not, find out where it is, then kill him.\n\nThe book contains knowledge about a curious structure called the Pyramid, which lies in the ruins of an ancient city called San Francisco. The place is rich with ancient artifacts and gold.\n\nGo there, and take all you can. Learn about the place.\n\nIf you succeed in your quest, you may have the apprenticeship you seek.\n',
        wholeSentence: true);
    return '${a.name} successfully performs ReadLetterFromMentor';
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

final Approach goblinSkirmishPatrolFromBleedsMain =
    Approach('bleeds_main', 'goblin_skirmish_patrol', 'Go >> to the west',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
}, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return $(c).hasLearnedAbout(kbGoblinCampSmoke) &&
      !$(c).playerHasVisited("goblin_skirmish_patrol");
});
final Room goblinSkirmishPatrol =
    Room('goblin_skirmish_patrol', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      '$weSubstitutionCapitalized meet a patrol. A lone goblin with a spear.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('Nothing here, just death.\n', wholeSentence: true);
}, generateBleedsGoblinSkirmishPatrol, null);
final Approach goblinSkirmishMainFromBleedsMain = Approach(
    'bleeds_main', 'goblin_skirmish_main', 'Go >> to the goblin outpost',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
}, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return $(c).hasHappened(evGoblinCampCleared);
});
final Approach goblinSkirmishMainFromGoblinSkirmishSneak = Approach(
    'goblin_skirmish_sneak', 'goblin_skirmish_main', 'Go >> attack the camp',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
}, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return !$(c).hasHappened(evGoblinCampCleared);
});
final Room goblinSkirmishMain = Room('goblin_skirmish_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('(To be done: actual battle. Assume you won.)\n\n',
      wholeSentence: true);
  w.recordCustom(evGoblinCampCleared);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The goblin camp is deserted.\n\n', wholeSentence: true);
  w.recordCustom(evGoblinCampCleared);
}, null, null);
final Approach goblinSkirmishSneakFromGoblinSkirmishPatrol = Approach(
    'goblin_skirmish_patrol',
    'goblin_skirmish_sneak',
    'Go >> towards the goblin outpost', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Approach goblinSkirmishSneakFromBleedsMain = Approach(
    'bleeds_main', 'goblin_skirmish_sneak', 'Go >> towards the goblin outpost',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
}, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return $(c).playerHasVisited("goblin_skirmish_sneak") &&
      !$(c).hasHappened(evGoblinCampCleared);
});
final Room goblinSkirmishSneak =
    Room('goblin_skirmish_sneak', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      '$weSubstitutionCapitalized sneak around. It\'s only 3 goblins. They are speaking loudly.\n',
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('The goblins are still here.\n', wholeSentence: true);
}, null, null);
final Approach startPostFightFromStartBeginFight = Approach(
    'start_begin_fight', 'start_post_fight', 'End fight', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room startPostFight = Room('start_post_fight', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  throw StateError(
      "Tamara's state wasn't planned for: ${w.getActorById(tamaraId)}");
}, null, null, null);
final Room startPostFightTamaraAlive = Room('start_post_fight_tamara_alive',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final ifBlock_3a12b716b = $(c).isHurt(tamaraId)
      ? '''Tamara is sitting on the ground now and tending to her wounds. "I'll survive, young sir. But you might not." She winces, and looks at me.'''
      : '''Tamara checks her gear and sheathes her sword. Then she looks at me.''';
  s.add('The fight is over.\n\n', wholeSentence: true);
  Ruleset(
      Rule(225876590, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return $(c).playerHasVisited("start_raccoon");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add('"Raccoon my ass."\n\n', wholeSentence: true);
      }),
      Rule(633100163, 0, false, (ApplicabilityContext c) {
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
            '"Well, as I said, that was the last one. And, young sir, call me coward one more time and I\'ll slash your neck." She seems to mean it.\n\n',
            wholeSentence: true);
      })).apply(c);
  s.add(
      '\n$ifBlock_3a12b716b "Come with me back to safety. I\'ll give you a discount for the way back."\n\n_"Thanks for your service, Tamara. But I\'ve come this far."_\n\nTamara nods, and leaves without ceremony. In a few moments, she disappears among the trees and the bushes.\n\n',
      wholeSentence: true);
  w.updateActorById(tamaraId, (b) => b.isActive = false);
}, null, null, null,
    parent: 'start_post_fight',
    prerequisite: Prerequisite(284371720, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return !w.wasKilled(tamaraId);
    }),
    isIdle: true);
final Room startPostFightTamaraDead = Room('start_post_fight_tamara_dead',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      '"Sorry, Tamara." I kneel next to her and put her in the position of a proper warrior death, with back to the ground and arms crossed over the body.\n',
      wholeSentence: true);
}, null, null, null,
    parent: 'start_post_fight',
    prerequisite: Prerequisite(996731518, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return w.wasKilled(tamaraId) && !w.getActorById(tamaraId).isAnimated;
    }),
    isIdle: true);
final Room startPostFightTamaraAnimated = Room(
    'start_post_fight_tamara_animated', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'I look into Tamara\'s undead eyes.\n\n"I\'m sorry."\n\nShe doesn\'t respond, so I nod, and tell her corpse to follow me.\n',
      wholeSentence: true);
}, null, null, null,
    parent: 'start_post_fight',
    prerequisite: Prerequisite(640676048, 2, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return w.wasKilled(tamaraId) && w.getActorById(tamaraId).anatomy.isUndead;
    }),
    isIdle: true);
final Approach startEnterGoblinFromStartRaccoon = Approach(
    'start_raccoon', 'start_enter_goblin', r'$IMPLICIT', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Approach startEnterGoblinFromStartCoward = Approach(
    'start_coward', 'start_enter_goblin', r'$IMPLICIT', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room startEnterGoblin = Room('start_enter_goblin', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'She motions toward the bush. I look in the direction and see a figure with a short, rusty sword.\n\nThis place. Why does everything need to be so difficult around here?\n\n"You think you could help me with this one?" She hands me a long dagger.\n',
      wholeSentence: true);
}, null, null, null);
final Approach startFromPreStartBook = Approach(
    'pre_start_book', 'start', 'DEBUG >> Play ‘Knights of San Francisco’',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room start = Room('start', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'We are in the ruins of San Francisco, not far from my destination, when my guard finally decides she has had enough.\n\n"Young sir, I quit." The guard says this as she unsheathes her sword. "This is the last and then I turn back."\n\n',
      wholeSentence: true);
  w.actors.removeWhere((actor) => actor.id == brianaId);
}, null, null, null);
final Approach startRaccoonFromStart = Approach('start', 'start_raccoon',
    '“It is just a rustle in the bush, Tamara. Probably a raccoon.”',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room startRaccoon = Room('start_raccoon', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('"I\'m tired. And _that_ is definitely not a raccoon."\n',
      wholeSentence: true);
}, null, null, null);
final Approach startCowardFromStart =
    Approach('start', 'start_coward', '“Coward.”', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room startCoward = Room('start_coward', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      '"Look, you paid me for the journey, not for babysitting you around the freaking Pyramid."\n',
      wholeSentence: true);
}, null, null, null);

class StartTakeDagger extends RoamingAction {
  @override
  final String name = 'start_take_dagger';

  static final StartTakeDagger singleton = StartTakeDagger();

  @override
  List<String> get commandPathTemplate => ['Take dagger'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'start_enter_goblin') {
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
    s.add('I take the dagger.\n', wholeSentence: true);
    w.updateActorById(a.id, (b) => b.inventory.equip(tamarasDagger, a.anatomy));
    $(c).movePlayer("start_begin_fight");
    return '${a.name} successfully performs StartTakeDagger';
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

class StartDeclineDagger extends RoamingAction {
  @override
  final String name = 'start_decline_dagger';

  static final StartDeclineDagger singleton = StartDeclineDagger();

  @override
  List<String> get commandPathTemplate => ['“You are going to be fine.”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'start_enter_goblin') {
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
    s.add('Tamara shrugs and puts the dagger in her belt.\n',
        wholeSentence: true);
    w.updateActorById(tamaraId, (b) => b.inventory.weapons.add(tamarasDagger));
    $(c).movePlayer("start_begin_fight");
    return '${a.name} successfully performs StartDeclineDagger';
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

final Room startBeginFight = Room('start_begin_fight', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The fight begins. The goblin before us is especially feral. He\'s gnawing his teeth and growls like a wolf. He taps his thigh with the blunt side of a rusty sword.\n',
      wholeSentence: true);
}, null, generateStartFight, null);
final Approach bleedsMainFromPreStartBook = Approach('pre_start_book',
    'bleeds_main', 'DEBUG >> Play ‘Knights of San Francisco’ from The Bleeds',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Approach bleedsMainFromStartPostFight =
    Approach('start_post_fight', 'bleeds_main', 'Go >> towards the Pyramid',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Approach bleedsMainFromBleedsTraderHut = Approach(
    'bleeds_trader_hut', 'bleeds_main', 'Go >> outside', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add('$weSubstitutionCapitalized walk out into the muddy street.\n',
      wholeSentence: true);
});
final Approach bleedsMainFromGoblinSkirmishSneak =
    Approach('goblin_skirmish_sneak', 'bleeds_main', 'Go >> to The Bleeds',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add(
      '$weSubstitutionCapitalized sneak through the bushes and emerge back in The Bleeds.\n',
      wholeSentence: true);
});
final Approach bleedsMainFromGoblinSkirmishMain =
    Approach('goblin_skirmish_main', 'bleeds_main', 'Go >> to The Bleeds',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitutionCapitalized =
      getWeOrI(a, sim, originalWorld, capitalized: true);
  s.add('$weSubstitutionCapitalized walk back to The Bleeds.\n',
      wholeSentence: true);
});
final Room bleedsMain = Room('bleeds_main', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'I finally see it. The Pyramid.\n\n\nBelow the Pyramid there\'s a small village. It huddles around the entrance to the structure. Later, I learn the locals call the settlement “The Bleeds”.\n\n',
      wholeSentence: true);
  w.updateActorById(tamaraId, (b) => b.isActive = false);
  if (w.actors.build().any((a) => a.id == brianaId)) {
    w.updateActorById(brianaId, (b) => b.isActive = false);
  }
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
}, null, null, isIdle: true);

class BleedsMainObserve extends RoamingAction {
  @override
  final String name = 'bleeds_main_observe';

  static final BleedsMainObserve singleton = BleedsMainObserve();

  @override
  List<String> get commandPathTemplate => ['Environment', 'Observe'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_main') {
      return false;
    }
    if (!(w.actionNeverUsed(name))) {
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
    s.add(
        'At any point I can see at least a few villagers going about their business. Their pace is fast and long, and they seldom talk to each other. Something bad is happening.\n\nEvery door is shut except for two. One is the entrance into a trader\'s shop. The second open door belongs to a small dwelling with a porch. A blind man sits outside on a stool, wearing a coat.\n\n',
        wholeSentence: true);
    $(c).learnAbout(kbTrader);
    $(c).learnAbout(kbBlindGuide);

    s.add(
        '\nI see a pillar of smoke to the west of here. Looks like nothing more than a camp fire.\n\n',
        wholeSentence: true);
    $(c).learnAbout(kbGoblinCampSmoke);

    return '${a.name} successfully performs BleedsMainObserve';
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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_main') {
      return false;
    }
    if (!(w.actionNeverUsed(name) && $(c).hasLearnedAbout(kbBlindGuide))) {
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
    s.add(
        'I come over to the blind man and introduce myself.\n\n"Nice to meet you! I am Jisad. But because I know a lot about this place, and because I am — you know — blind, everyone around here calls me the Blind Guide." He smiles and leans over, lowering his voice. "I think they find it funny."\n\n_"Hilarious."_\n\n"So what brings you here?"\n\nI have decided long ago that my skill in necromancy is best kept to myself. So is my quest for the Manual.\n\n\n_"I seek treasure."_\n\n"Ahh!" The man leans back, resting his back against the wall of his house. "A terrible idea."\n\n',
        wholeSentence: true);
    $(c).learnAbout(kbBlindGuide);

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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_main') {
      return false;
    }
    if (!(w.actionNeverUsed(name) &&
        w.actionHasBeenPerformed("bleeds_blind_guide_greet"))) {
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
    s.add(
        '"So you want to explore the Pyramid."\n\n_"I need something that\'s in there."_\n\n"A lot of people think that. There are whole religions built on the idea that there is _something_ in this building. Something that made it survive the ages. You seek magic?"\n\nI don\'t want to reveal more than needed. But "magic" is vague enough. So I just say yes.\n\nThe man purses his lips. "I hate magic." He shifts on his stool and the wood creaks. "Even though I built my life on knowing this ancient place, I hate magic. For a while it seems useful, in small doses. But something happens, and everything goes to hell. Look at this place." He gestures around.\n\n',
        wholeSentence: true);
    $(c).hearAbout(kbJisadHatesMagic);

    s.add(
        '\n_"What about it?"_\n\n"I was born and raised in these ancient ruins. It was always a little bit crazy here but never like this. The Knights are leaving. The orcs at the upper floors are getting bolder every day. There are bands of goblins closing in on this place, for no apparent reason."\n\n',
        wholeSentence: true);
    $(c).hearAbout(kbOrcsInPyramid);
    $(c).hearAbout(kbKnightsLeaving);

    s.add(
        '\n_"And this is because of magic?"_\n\nThe otherwise calm face of the blind man twists with rage. "Of course it is. Magic is power and power corrupts. This place is _infused_ with magic. And the world has noticed."\n\nThe man calms down again and turns his unseeing face almost precisely to me. "Go away. Leave this place. Forgo the magic and keep your life."\n',
        wholeSentence: true);
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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_main') {
      return false;
    }
    if (!(w.actionNeverUsed(name) &&
        w.actionHasBeenPerformed("bleeds_blind_guide_greet"))) {
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
    s.add(
        '"Not completely, of course. There were always raiders. But not like this." The man shakes his head. "It\'s like the goblins are being drawn here."\n\n_"What do they want?"_\n\n"They\'re goblins. They want to raid. They want steel and slaves." He thinks for a while. "But it\'s strange. They come in larger numbers than you would think makes sense. They\'d get more slaves and more steel elsewhere."\n\n_"They want into the Pyramid, perhaps?"_\n\n"Nonsense. Goblins fear these kinds of things. Even if they didn\'t, they\'d probably get slaughtered by the orcs. Oh, that\'s something I\'d like to see." He absentmindedly touches his face just under the left eye.\n\n',
        wholeSentence: true);
    Ruleset(
        Rule(258032518, 1, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return !$(c).hasHappened(evGoblinCampCleared);
        }, (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
              '\n"Anyway. The goblins aren\'t stupid, but they _are_ getting awfully bold. I\'ve heard a band has made their camp not far from here. So close that people can see their campfire\'s smoke sometimes." He shudders. "Can you see it?"\n\n_"Yes."_\n\n"It must be a harrowing sight. A herald of our own future, possibly."\n\n',
              wholeSentence: true);
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

final Approach endOfRoamFromBleedsMain =
    Approach('bleeds_main', '__END_OF_ROAM__', 'Travel back home (ENDS GAME)',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You realize this adventuring life is not for you.\n',
      wholeSentence: true);
});
final Approach bleedsTraderHutFromBleedsMain = Approach(
    'bleeds_main', 'bleeds_trader_hut', 'Go >> inside the trader\'s shop',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
}, isApplicable: (ApplicabilityContext c) {
  final WorldState w = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  return $(c).hasLearnedAbout(kbTrader);
});
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
      wholeSentence: true);
}, (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
  s.add(
      'The trader {nods|pretends to smile} as $weSubstitution enter his shop.\n\n',
      wholeSentence: true);
  if ($(c).inRoomWith(leroyId) &&
      w.getActorById(leroyId).anatomy.isUndead &&
      !$(c).hasHappened(evJisadSeesUndeadLeroy)) {
    s.add(
        'He then takes a second look at his son, and freezes. After a long while of silence, he turns to me. "Sir," he says, his eyes wet, "please have mercy on the soul of this young boy. Please release him from... this. Please give him back his death." He looks back at Leroy, and then down on the wooden counter.',
        wholeSentence: true);
    w.recordCustom(evJisadSeesUndeadLeroy);
  }
}, null, null, isIdle: true);

class BleedsTraderGreet extends RoamingAction {
  @override
  final String name = 'bleeds_trader_greet';

  static final BleedsTraderGreet singleton = BleedsTraderGreet();

  @override
  List<String> get commandPathTemplate => ['Trader', '“How is business?”'];
  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_trader_hut') {
      return false;
    }
    if (!(w.actionNeverUsed(name))) {
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
    s.add(
        'The trader shrugs.\n\n"It\'s terrible. Everyone is afraid, nobody buys anything. Well, except for travel gear. But we\'re out of that until the next caravan." He glides his hand over the counter to suggest that there is nothing left.\n\n_"Why travel gear?"_\n\n"People are leaving. Even _he_ wants to leave."\n\nThis is the first time I notice a person sitting in one corner of the room, quietly {polishing a strip of leather|sewing two strips of leather together|pinching holes into a strip of leather}. The man introduces himself as Leroy. He is the trader\'s son.\n\n"Well why wouldn\'t I leave, father? We all should. What awaits us here?"\n\nThe trader shakes his head and interjects: "What awaits us anywhere else?"\n\n"Death or slavery." Leroy deems his point made, ignoring his father\'s interjection. He goes back to his work.\n\n',
        wholeSentence: true);
    $(c).learnAbout(kbLeroy);

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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_trader_hut') {
      return false;
    }
    if (!(w.actionNeverUsed(name) &&
        w.actionHasBeenPerformed("bleeds_trader_greet"))) {
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
    s.add(
        'The trader bangs on the wooden counter, immediately angry. "Goblins! The suckers are getting cockier and cockier. Among all the problems we have, they\'re the worst. I fear we won\'t get a caravan anytime soon because of them. No caravan means no goods. No goods mean no trade."\n\n',
        wholeSentence: true);
    assert($(c).inRoomWith(leroyId));

    s.add(
        '\nLeroy smiles wryly. "No trade means no money."\n\nHis father looks at him, annoyed. "No money means no food."\n\nLeroy looks as if he wants to add something, but thinks better of it.\n\nThe trader, obviously satisfied, turns back to me. "The suckers are closing in from all sides. A few months ago they wouldn\'t dare approach the Pyramid. But lately, they come much closer."\n\n"I could see the smoke from one of their camps a while back." Leroy talks to his leather strip.\n\n"What smoke?" the trader says.\n\n"There\'s a camp to the west, less than a mile from here."\n\n"There\'s a goblin camp _less than a mile_ from The Bleeds? How do I not know this?"\n\nLeroy seems genuinely surprised. "I thought you knew. Everyone knows."\n\n',
        wholeSentence: true);
    $(c).learnAbout(kbLeroyKnowsGoblinSmoke);

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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_trader_hut') {
      return false;
    }
    if (!(w.actionNeverUsed(name) &&
        w.actionHasBeenPerformed("bleeds_trader_greet") &&
        $(c).hasHappened(evGoblinCampCleared))) {
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
    s.add('“What happened?”\n\nI describe the battle to him.\n',
        wholeSentence: true);
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
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'bleeds_trader_hut') {
      return false;
    }
    if (!(w.actionNeverUsed(name) &&
        $(c).hasLearnedAbout(kbLeroy) &&
        $(c).hasLearnedAbout(kbLeroyKnowsGoblinSmoke) &&
        !$(c).hasHappened(evGoblinCampCleared))) {
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
    assert($(c).inRoomWith(leroyId));

    s.add(
        '\n"They are to the west. It doesn\'t seem like there is a lot of them. We thought the Knights would get rid of them for sure."\n\n"But the Knights are leaving." The trader looks at me for reaction and when he doesn\'t get any, he turns back to his son. "The Knights are leaving," he repeats.\n\n',
        wholeSentence: true);
    $(c).hearAbout(kbKnightsLeaving);

    s.add(
        '\n"Well, if we aren\'t leaving this place like they are, it looks like we\'ll have to learn how to live here, without the Knights. We could take up the fight ourselves."\n\nThe trader groans. "Don\'t be stupid, Leroy."\n\n"I mean it! Sir, you seem as an adventurous soul. If you ever want my help, just ask." He points to a chest near where he sits. "I have a long dagger and a decent shield, and I can use both."\n\n',
        wholeSentence: true);
    w.updateActorById(leroyId, (b) => b.npc.isHireable = true);

    s.add(
        '\n"The hell you can! You\'re a trader, Leroy! You\'re no fighter." Leroy\'s father is shaking. When he remembers that I\'m there with them, he apologizes, then turns back to Leroy. "Son, I forget that you are a grown man now. But... it is my wish that you don\'t go."\n',
        wholeSentence: true);
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

final allRooms = <Room>[
  undergroundChurchAltarAfterCeremony,
  orcthornRoom,
  smelter,
  slaveQuartersPassage,
  slaveQuarters,
  testFightGoblin,
  undergroundChurch,
  undergroundChurchAltar,
  testFightOrc,
  startAdventure,
  testFightOrcAndGoblin,
  warForgeAfterIronMonster,
  guardpostAboveChurch,
  tunnel,
  tunnelCancelChance,
  exitFromBloodrock,
  warForge,
  caveWithAgruth,
  justAfterAgruthFight,
  goblinSkirmishPatrol,
  goblinSkirmishMain,
  goblinSkirmishSneak,
  startPostFight,
  startPostFightTamaraAlive,
  startPostFightTamaraDead,
  startPostFightTamaraAnimated,
  startEnterGoblin,
  start,
  startRaccoon,
  startCoward,
  startBeginFight,
  bleedsMain,
  bleedsTraderHut
];
final allApproaches = <Approach>[
  orcthornRoomFromSlaveQuartersPassage,
  smelterFromWarForge,
  smelterFromGuardpostAboveChurch,
  slaveQuartersPassageFromCaveWithAgruth,
  slaveQuartersPassageFromSlaveQuarters,
  slaveQuartersPassageFromOrcthornRoom,
  slaveQuartersFromSlaveQuartersPassage,
  testFightGoblinFromPreStartBook,
  endOfRoamFromTestFightGoblin,
  undergroundChurchFromCaveWithAgruth,
  undergroundChurchFromGuardpostAboveChurch,
  undergroundChurchFromUndergroundChurchAltar,
  undergroundChurchAltarFromUndergroundChurch,
  testFightOrcFromPreStartBook,
  endOfRoamFromTestFightOrc,
  startAdventureFromPreStartBook,
  testFightOrcAndGoblinFromPreStartBook,
  endOfRoamFromTestFightOrcAndGoblin,
  guardpostAboveChurchFromUndergroundChurch,
  guardpostAboveChurchFromTunnelCancelChance,
  guardpostAboveChurchFromSmelter,
  tunnelFromTunnelCancelChance,
  exitFromBloodrockFromTunnel,
  endOfRoamFromExitFromBloodrock,
  warForgeFromSmelter,
  warForgeFromCaveWithAgruth,
  caveWithAgruthFromUndergroundChurch,
  caveWithAgruthFromSlaveQuartersPassage,
  caveWithAgruthFromWarForge,
  justAfterAgruthFightFromStartAdventure,
  goblinSkirmishPatrolFromBleedsMain,
  goblinSkirmishMainFromBleedsMain,
  goblinSkirmishMainFromGoblinSkirmishSneak,
  goblinSkirmishSneakFromGoblinSkirmishPatrol,
  goblinSkirmishSneakFromBleedsMain,
  startPostFightFromStartBeginFight,
  startEnterGoblinFromStartRaccoon,
  startEnterGoblinFromStartCoward,
  startFromPreStartBook,
  startRaccoonFromStart,
  startCowardFromStart,
  bleedsMainFromPreStartBook,
  bleedsMainFromStartPostFight,
  bleedsMainFromBleedsTraderHut,
  bleedsMainFromGoblinSkirmishSneak,
  bleedsMainFromGoblinSkirmishMain,
  endOfRoamFromBleedsMain,
  bleedsTraderHutFromBleedsMain
];
final allActions = <RoamingAction>[
  TalkToBriana1.singleton,
  TalkToBriana2.singleton,
  TalkToBriana3.singleton,
  SmelterThrowSpear.singleton,
  GuardpostAboveChurchTakeShield.singleton,
  SmelterLookAround.singleton,
  SlaveQuartersPassageExamineDoor.singleton,
  SlaveQuartersContinue.singleton,
  ExamineUndergroundChurch.singleton,
  WaitForRitual.singleton,
  TakeSpearInUndergroundChurch.singleton,
  GuardpostAboveChurchEnterTunnelWithCancel.singleton,
  WarForgeLookAround.singleton,
  WarForgeWatchWorkers.singleton,
  TakeOrcthorn.singleton,
  SearchAgruth.singleton,
  NameAgruthSwordOpportunity.singleton,
  NameAgruthSwordRedemption.singleton,
  NameAgruthSwordNothing.singleton,
  ReadLetterFromFather.singleton,
  ReadLetterFromMentor.singleton,
  StartTakeDagger.singleton,
  StartDeclineDagger.singleton,
  BleedsMainObserve.singleton,
  BleedsBlindGuideGreet.singleton,
  BleedsBlindGuideTerribleIdea.singleton,
  BleedsBlindGuideGoblins.singleton,
  BleedsTraderGreet.singleton,
  BleedsTraderGoblins.singleton,
  BleedsTraderTellAboutClearedCamp.singleton,
  BleedsTraderGoblinSmoke.singleton
];
