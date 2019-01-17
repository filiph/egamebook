// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// WritersInputGenerator
// **************************************************************************

// ignore_for_file: unused_local_variable
// ignore_for_file: type_annotate_public_apis

import 'package:edgehead/fractal_stories/context.dart' show ActionContext;
import 'package:edgehead/fractal_stories/writer_action.dart' show RoamingAction;
import 'package:edgehead/fractal_stories/actor.dart' show Actor;
import 'package:edgehead/fractal_stories/room_approach.dart' show Approach;
import 'package:edgehead/fractal_stories/context.dart'
    show ApplicabilityContext;
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
final Room undergroundChurch =
    new Room('underground_church', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You enter a room that at first looks like a large, twisting cave. But then it opens into a high-ceilinged space with many columns. This must be what the orcs call the Underground Church. Dim light shines from the far end of the room, where you’d expect the altar to be, but you can\'t quite see it. There are no torches here. And it’s eerily quiet. \n\n\nYour bare footsteps reverberate in the room, so you slow down to quiet them. \n\n',
      wholeSentence: true);
  new Ruleset(
      new Rule(404031087, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "cave_with_agruth");
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
      new Rule(1058415809, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "guardpost_above_church");
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
Approach undergroundChurchFromCaveWithAgruth = new Approach(
    'cave_with_agruth', 'underground_church', 'Go to the Unholy Church',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You make it to the Church undetected.\n', wholeSentence: true);
});
Approach undergroundChurchFromGuardpostAboveChurch = new Approach(
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
Approach undergroundChurchFromUndergroundChurchAltar =
    new Approach('underground_church_altar', 'underground_church', 'Sneak back',
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

  static final ExamineUndergroundChurch singleton =
      new ExamineUndergroundChurch();

  @override
  String getCommand(Null _) {
    return 'Look around';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room tunnel = new Room('tunnel', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Almost as soon as the circular room disappears from your line of sight, loud shouting rises from deep within the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear dozens of orc and goblin feet stomping.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight. The stairs get steeper and steeper until you feel like you’re climbing a ladder.\n\n\n"I have…" Briana gasps, catching her breath. "I have not fought my way through the depths of Mount Bloodrock just to die of exhaustion on its doorstep."\n\n\n_"That… that would be disappointing, yes."_\n\n\nThe sounds from behind grow louder. You can now pick out individual voices, although not what they are saying.\n\n\nThe stairway suddenly makes a sharp left turn and levels out. Tasting blood on the roof of your mouth, your whole body demands that you stop — but you start running anyway. Briana follows close behind.\n\n\nThe light in the tunnel gets brighter and the air gets colder. Suddenly, just when you can smell fresh air, an orc and a goblin jump out in front of you from a slimy crevice, swords in hands.\n\n\n![Picture of the Upper Door guard](https://egamebook.com/vermin/v/latest/img/orc_and_goblin_sketch.jpg)\n\n\nThey must be guarding the Upper Door. There is no way around them.\n',
      wholeSentence: true);
}, null, generateEscapeTunnelFight, null);
Approach tunnelFromTunnelCancelChance = new Approach(
    'tunnel_cancel_chance', 'tunnel', 'Continue', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You shake your head and continue through the passage. Soon, you find yourself climbing a steep, poorly lit stairway. Briana catches up with you quickly.\n',
      wholeSentence: true);
});
final Room tunnelCancelChance =
    new Room('tunnel_cancel_chance', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'After a few strides, you realize Briana is still standing in the circular room behind you.\n\n\n_"Are you not coming?"_\n\n\nBriana hesitates. "It feels like we could have done more." She motions toward the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. I mean, we might be the first slaves in Mount Bloodrock to survive."\n',
      wholeSentence: true);
}, null, null, null);

class TalkToBriana1 extends RoamingAction {
  @override
  final String name = 'talk_to_briana_1';

  static final TalkToBriana1 singleton = new TalkToBriana1();

  @override
  String getCommand(Null _) {
    return 'Talk to Briana';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if (!(w.actionNeverUsed(name) && isRoamingInBloodrock(w))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

  static final TalkToBriana2 singleton = new TalkToBriana2();

  @override
  String getCommand(Null _) {
    return 'Ask Briana about her capture';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if (!(w.actionHasBeenPerformed("talk_to_briana_1") &&
        w.actionNeverUsed(name) &&
        isRoamingInBloodrock(w))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

  static final TalkToBriana3 singleton = new TalkToBriana3();

  @override
  String getCommand(Null _) {
    return 'Ask Briana about Orcthorn';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if (!(w.actionHasBeenPerformed("talk_to_briana_2") &&
        w.actionNeverUsed(name) &&
        isRoamingInBloodrock(w))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '_"What is Orcthorn?"_\n\n\n"A sword. It’s killed hundreds of orcs, wielded by a half dozen legendary knights. The orcs have been trying to get Orcthorn for decades, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of warriors ambushed Lord Glencot. He wielded Orcthorn at the time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs have been bolder."\n\n\n_"The Mad Guardian."_\n\n\n"The mad who?"\n\n\n_"That is what Agruth and the other slavers were talking about a couple of weeks back. One orc was supposed to guard a sword. That seemed weird enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days. Now they keep him in a cell, and call him_ grach kamkorr _– The Mad Guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n',
        wholeSentence: true);
    new Ruleset(
        new Rule(675414120, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return a.currentRoomName == "slave_quarters_passage" &&
              !playerHasVisited(sim, originalWorld, "orcthorn_room");
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
        new Rule(363993062, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return playerHasVisited(sim, originalWorld, "orcthorn_room") &&
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
        new Rule(392088263, 2, false, (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return playerHasVisited(
                  sim, originalWorld, "slave_quarters_passage") &&
              !playerHasVisited(sim, originalWorld, "orcthorn_room");
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
        new Rule(361178650, 1, false, (ApplicabilityContext c) {
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
        new Rule(974180978, 0, false, (ApplicabilityContext c) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room testFightGoblin = new Room('test_fight_goblin', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'This is a development-only test fight. If you still see this in a production\nbuild, it\'s a bug.\n\nA goblin stands in front of you, wielding a spear. Between the two of you,\na plain dagger lies on the ground.\n\nYou are wielding a short sword.\n',
      wholeSentence: true);
}, null, generateTestFightWithGoblin, null);
Approach testFightGoblinFromPreStartBook = new Approach(
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
Approach endOfRoamFromTestFightGoblin = new Approach(
    'test_fight_goblin', '__END_OF_ROAM__', 'End game', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room startAdventure = new Room('start_adventure', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'The path from slavery to power begins with a single crack of a whip. Briana spins around, her face red with pain and anger. She is new here, but she knows what is coming.\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves.\n\n\n![Agruth whips Briana](https://egamebook.com/vermin/v/latest/img/agruth-attack.jpg)\n\n\nAnother crack and there is new blood pouring from a gash in Briana\'s face. Agruth grins.\n\n\nNobody else is in sight. It\'s just you, Agruth, and Briana. That\'s Agruth\'s first mistake.\n',
      wholeSentence: true);
}, null, generateAgruthFight, null);
Approach startAdventureFromPreStartBook = new Approach(
    'pre_start_book', 'start_adventure', 'DEBUG >> Smoke test \'Vermin\'',
    (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room undergroundChurchAltarAfterCeremony = new Room(
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
    prerequisite:
        new Prerequisite(840572377, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return w.actionHasBeenPerformedSuccessfully("wait_for_ritual");
    }));
final Room slaveQuarters = new Room('slave_quarters', (ActionContext c) {
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
Approach slaveQuartersFromSlaveQuartersPassage = new Approach(
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

  static final SlaveQuartersContinue singleton = new SlaveQuartersContinue();

  @override
  String getCommand(Null _) {
    return 'Continue';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'slave_quarters') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room justAfterAgruthFight =
    new Room('just_after_agruth_fight', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You are Aren, a slave. You have spent three painful years inside this mountain, surrounded by the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here.\n\n\nBriana stands towering over Agruth\'s corpse. She smooths her hair back and looks down into the expanding pool of Agruth\'s blood, using it as a mirror.\n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve to die, or worse. And I think it will be satisfying to kill them with their own swords." She kicks the dead slaver in the hip.\n\n\n_"That one is already dead."_\n\n\n"Just making sure," she says.\n\n\n![Agruth\'s sword](https://egamebook.com/vermin/v/latest/img/agruth-sword.jpg)\n\n\nShe turns her attention to the sword. "We should name it. Named weapons please the gods. And I refuse to have this thing around thinking of it as _Agruth\'s sword_." She makes a pained grimace when she says the orc\'s name.\n',
      wholeSentence: true);
}, null, null, null);
Approach justAfterAgruthFightFromStartAdventure =
    new Approach('start_adventure', 'just_after_agruth_fight', '<implicit>',
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
      new NameAgruthSwordOpportunity();

  @override
  String getCommand(Null _) {
    return '"Luck Bringer"';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '_"We will call it Luck Bringer. We got lucky with Arguth, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',
        wholeSentence: true);
    nameAgruthSword(w, "Luck Bringer");
    movePlayer(c, "cave_with_agruth");
    return '${a.name} successfully performs NameAgruthSwordOpportunity';
  }

  @override
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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
      new NameAgruthSwordRedemption();

  @override
  String getCommand(Null _) {
    return '"Savior"';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '_"We will call it Savior. Getting it was our first step toward freedom. The sword should have killed us, and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',
        wholeSentence: true);
    nameAgruthSword(w, "Savior");
    movePlayer(c, "cave_with_agruth");
    return '${a.name} successfully performs NameAgruthSwordRedemption';
  }

  @override
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

  static final NameAgruthSwordNothing singleton = new NameAgruthSwordNothing();

  @override
  String getCommand(Null _) {
    return 'No name';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        '_"That is foolish. It is just a sword, after all."_\n\n\nBriana shrugs. "Whatever, just don\'t ever call it _Agruth\'s sword._ I already have more respect to this piece of iron than to that worthless animal. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',
        wholeSentence: true);
    movePlayer(c, "cave_with_agruth");
    return '${a.name} successfully performs NameAgruthSwordNothing';
  }

  @override
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room guardpostAboveChurch =
    new Room('guardpost_above_church', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You enter a small circular room. You see three openings that lead to passages, each marked with crude writing.\n\n',
      wholeSentence: true);
  new Ruleset(
      new Rule(133764767, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "smelter");
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
      new Rule(318594253, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "underground_church");
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
  new Ruleset(
      new Rule(438680119, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return w.isDead(sleepingGoblinId);
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
      new Rule(948011826, 0, false, (ApplicabilityContext c) {
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
Approach guardpostAboveChurchFromUndergroundChurch = new Approach(
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
Approach guardpostAboveChurchFromTunnelCancelChance =
    new Approach('tunnel_cancel_chance', 'guardpost_above_church', 'Return',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You nod and step back into the circular room.\n', wholeSentence: true);
});
Approach guardpostAboveChurchFromSmelter = new Approach(
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
      new GuardpostAboveChurchEnterTunnelWithCancel();

  @override
  String getCommand(Null _) {
    return 'Go to the Upper Door';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'guardpost_above_church') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

  static final TakeOrcthorn singleton = new TakeOrcthorn();

  @override
  String getCommand(Null _) {
    return 'Search for Orcthorn';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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
      new GuardpostAboveChurchTakeShield();

  @override
  String getCommand(Null _) {
    return 'Cautiously take the shield';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'You silently approach the goblin, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs and leans his head to the side, but stays asleep.\n\n\nYou take a few slow steps back, then grip the shield in your left hand, ready for anything.\n',
        wholeSentence: true);
    setUpStealShield(a, sim, w, s, true);
    return '${a.name} successfully performs GuardpostAboveChurchTakeShield';
  }

  @override
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'You silently approach the goblin, then wait a few moments. The goblin sniffs, moves, but stays asleep. You shift your weight on your right leg, leaning over the goblin and using the other leg as a counterweight. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move an inch, he\'ll wake up.\n',
        wholeSentence: true);
    w.pushSituation(
        new GuardpostAboveChurchTakeShieldRescueSituation.initialized(
            w.randomInt()));
    return '${a.name} fails to perform GuardpostAboveChurchTakeShield';
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(0.3);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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
    return new GuardpostAboveChurchTakeShieldRescueSituation((b) {
      b.id = id;
      b.time = 0;
    });
  }

  GuardpostAboveChurchTakeShieldRescueSituation._();

  static Serializer<GuardpostAboveChurchTakeShieldRescueSituation>
      get serializer =>
          _$guardpostAboveChurchTakeShieldRescueSituationSerializer;
  @override
  List<RoamingAction> get actions {
    return [
      new SimpleAction(
          'guardpost_above_church_take_shield_rescue',
          'Stay perfectly still',
          (Actor a, Simulation sim, WorldStateBuilder w, Storyline s, self) {
            s.add(
                'You stay completely still. After a while, the strain of holding the awkward position start to show. Your left leg  starts shaking. A bead of sweat is forming on your nose, threatening to fall on the goblin\'s leg.\n\n\n<p class="toast">Your stamina decreases by 1.</p>\n\n\nFortunately, the goblin shifts again and his expression gets visibly more relaxed. His breathing is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then grip the shield in your left hand, ready for anything.',
                wholeSentence: true);
            w.popSituation(sim);
            w.updateActorById(a.id, (b) => b..stamina -= 1);
            setUpStealShield(a, sim, w, s, true);
            return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)';
          },
          'If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)',
          isApplicableClosure: (Actor a, Simulation sim, WorldState w, self) {
            return a.stamina > 0;
          }),
      new SimpleAction(
          'guardpost_above_church_take_shield_continuation_of_failure',
          'Snatch the shield',
          (Actor a, Simulation sim, WorldStateBuilder w, Storyline s, self) {
        s.add(
            'You snatch the shield and jump back next to Briana. The goblin wakes up instantly, and he gets his bearings surprisingly fast. He jumps up and points his scimitar at you.\n\n\nYou look at Briana. Both of you are ready to fight.',
            wholeSentence: true);
        w.popSituation(sim);
        setUpStealShield(a, sim, w, s, false);
        return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)';
      }, 'You can quickly snatch the shield, jump back and prepare for a fight.')
    ];
  }

  @override
  int get id;
  @override
  int get time;
  @override
  String get name {
    return 'guardpost_above_church_take_shield';
  }

  @override
  Situation elapseTime() => rebuild((b) {
        return b..time += 1;
      });
  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time != 0) return null;
    return w.actors.singleWhere((a) => a.isPlayer);
  }

  @override
  Iterable<Actor> getActors(
      Iterable<Actor> actors, Simulation sim, WorldState w) {
    return [
      actors.singleWhere((Actor a) {
        return a.isPlayer;
      })
    ];
  }
}

final Room smelter = new Room('smelter', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'A blast of smoke and heat greets you as you step into the room. A roaring fire draws your attention to the far wall, where thousands of orcs shovel coal into a giant furnace. They tilt huge kettles of molten steel into white-hot flowing rivers. This is the smelter.\n\n',
      wholeSentence: true);
  new Ruleset(
      new Rule(1010398177, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "war_forge");
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
      new Rule(9791310, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "guardpost_above_church");
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
  new Ruleset(
      new Rule(988691356, 2, false, (ApplicabilityContext c) {
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
      new Rule(978029961, 0, false, (ApplicabilityContext c) {
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
Approach smelterFromWarForge =
    new Approach('war_forge', 'smelter', 'Go to smelter', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You keep low, ascending the stairs. When you reach the top, you feel a wave of hot air coming from a passage in the wall. You make your way through it.\n',
      wholeSentence: true);
});
Approach smelterFromGuardpostAboveChurch =
    new Approach('guardpost_above_church', 'smelter', 'Go to the smelter',
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

  static final SmelterLookAround singleton = new SmelterLookAround();

  @override
  String getCommand(Null _) {
    return 'Look around';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room caveWithAgruth = new Room('cave_with_agruth', (ActionContext c) {
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
Approach caveWithAgruthFromUndergroundChurch = new Approach(
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
Approach caveWithAgruthFromSlaveQuartersPassage = new Approach(
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
Approach caveWithAgruthFromWarForge = new Approach(
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

  static final SearchAgruth singleton = new SearchAgruth();

  @override
  String getCommand(Null _) {
    return 'Search Agruth';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a _troma_ herb. This boosts your energy right when you need it – very handy. \n\n\n<p class="toast">Your stamina increases by 1.</p>\n',
        wholeSentence: true);
    giveStaminaToPlayer(w, 1);
    return '${a.name} successfully performs SearchAgruth';
  }

  @override
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

final Room testFightOrc = new Room('test_fight_orc', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'This is a development-only test fight. If you still see this in a production\nbuild, it\'s a bug.\n\nAgruth the orc stands in front of you, wielding a sword. Between the two of you,\na plain dagger lies on the ground.\n\nYou are wielding a short sword.\n',
      wholeSentence: true);
}, null, generateTestFightWithOrc, null);
Approach testFightOrcFromPreStartBook = new Approach(
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
Approach endOfRoamFromTestFightOrc = new Approach(
    'test_fight_orc', '__END_OF_ROAM__', 'End game', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room undergroundChurchAltar =
    new Room('underground_church_altar', (ActionContext c) {
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
Approach undergroundChurchAltarFromUndergroundChurch = new Approach(
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

  static final WaitForRitual singleton = new WaitForRitual();

  @override
  String getCommand(Null _) {
    return 'Wait';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
        'You move into the shadows and wait. After a few heartbeats, there is a scraping sound — stone against stone. You lean out from your hiding place and see a section of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters through the stone door. Suddenly, the whole temple reverberates with a strong, dissonant tone that is both sickening and powerful. As if the whole mountain were groaning. \n\n\nFollowing the orc priest, a huge creature enters through the door, crouching below its frame. It\'s unclear what the creature is, exactly, but it could be some large breed of ogre. Judging by the braided hair, it\'s a female. Her sword — attached to her hip with a rope — is as long as you are tall. \n\n\nWhen she enters the temple and stands upright, you can see that she is leading someone in by a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them — the priest, the ogre and the orc — walk to the front of the altar and stand before it, facing the symbol of the octopus, their backs facing you and Briana.\n\n\nThe dissonant tone stops. You lean a little further out from your hiding place to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but he obeys. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\nSomehow, you know.\n\n\n_"Maggots."_\n\n\nBriana gives you a puzzled look, then turns back to the ritual. From the shadows in the base of the altar, a swarm of large black insects starts to make its way up toward the terrified orc. The priest lifts his arms in silent worship.\n\n\n![Picture of the sadistic slavers](https://egamebook.com/vermin/v/latest/img/altar.jpg)\n\n\nThe ogre pushes down on the orc, preparing for the inevitable struggle. The orc knows what’s coming, and he opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s surface, onto the orc\'s body, and move straight toward his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, to no avail. The dissonant tone gets even louder. The whole temple quivers. You feel like your ear drums will collapse. The sound permeates everything.\n\n\nSuddenly, the terror of the moment is fully replaced by an invigorating feeling of power. You take a breath and feel stronger, refreshed.\n\n\n<p class="toast">Your stamina increases by 1.</p>\n\n\nYou notice that the priest inhales deeply as well.\n\n\nThen, the sound stops and the orc\'s body collapses into itself. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again and — without saying anything — heads back to the stone door. The ogre takes the orc\'s dead body, throws it over her shoulder, and follows the priest. In a few heartbeats, they are all gone and the door closes. A new pool of blood on the altar is the only reminder of what happened.\n\n\nBriana stares ahead. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head. "Let\'s… let\'s just get out of here."\n',
        wholeSentence: true);
    giveStaminaToPlayer(w, 1);
    return '${a.name} successfully performs WaitForRitual';
  }

  @override
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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
      new TakeSpearInUndergroundChurch();

  @override
  String getCommand(Null _) {
    return 'Take the spear';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

  static final SmelterThrowSpear singleton = new SmelterThrowSpear();

  @override
  String getCommand(Null _) {
    return 'Throw spear at the ogre';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'smelter') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name) &&
        w.actionHasBeenPerformed("war_forge_watch_workers") &&
        w.actionHasBeenPerformed("smelter_look_around") &&
        getPlayer(w).inventory.hasWeapon(WeaponType.spear))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room warForgeAfterIronMonster = new Room('war_forge_after_iron_monster',
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
    prerequisite:
        new Prerequisite(426251910, 1, true, (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return w.actionHasBeenPerformedSuccessfully("smelter_throw_spear");
    }));
final Room slaveQuartersPassage =
    new Room('slave_quarters_passage', (ActionContext c) {
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
  new Ruleset(
      new Rule(299502294, 2, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return playerHasVisited(sim, originalWorld, "orcthorn_room") &&
            !justCameFrom(w, "orcthorn_room");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
        s.add('  The reinforced door on the side of the corridor is silent.\n',
            wholeSentence: true);
      }),
      new Rule(871855510, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return playerHasVisited(sim, originalWorld, "orcthorn_room");
      }, (ActionContext c) {
        final WorldState originalWorld = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        final WorldStateBuilder w = c.outputWorld;
        final Storyline s = c.outputStoryline;
      }),
      new Rule(233666017, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return !playerHasVisited(sim, originalWorld, "orcthorn_room");
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
Approach slaveQuartersPassageFromCaveWithAgruth = new Approach(
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
Approach slaveQuartersPassageFromSlaveQuarters = new Approach(
    'slave_quarters', 'slave_quarters_passage', 'Go back', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You nod, and then start carefully backing out through the passage.\n',
      wholeSentence: true);
});
Approach slaveQuartersPassageFromOrcthornRoom =
    new Approach('orcthorn_room', 'slave_quarters_passage', 'Exit the room',
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
      new SlaveQuartersPassageExamineDoor();

  @override
  String getCommand(Null _) {
    return 'Examine the door';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'slave_quarters_passage') {
      return false;
    }
    if (!(!w.actionHasBeenPerformed(name) &&
        !(w.currentSituation as RoomRoamingSituation).monstersAlive &&
        !playerHasVisited(sim, w, "orcthorn_room"))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room exitFromBloodrock =
    new Room('exit_from_bloodrock', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'Only a few bends ahead, the tunnel gets blindingly bright and you catch the scent of fresh mountain air. The surface! For the first time in three years, you hear the howling wind.\n\n\nYou run through a small stone doorway and out of the mountain.\n\n\nThe blinding sun makes you squint. You let the wind chill your muscles and then you jump down a steep descending path.\n\n\nOutside, you and Briana have the upper hand. The orcs and goblins are used to the dark, dank caves, and they come out only when they must.\n\n\nSoon, the orcs and goblins stop following altogether, presumably leaving the two of you to their aboveground brothers.\n\n\nYou look around for a safe route. At first, you cannot make much sense of what you see — this is nothing like the country you left three years ago. Black smoke rises from orc camps and razed villages. You look out over the burned forests and notice the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview Hill. You see no birds, only some horrible dark eagle-like creatures that have no heads circling in both directions above Mount Bloodrock.\n\n\n![View of the road ahead](https://egamebook.com/vermin/v/latest/img/path.jpg)\n\n\nBriana doesn\'t seem surprised.\n\n\n_"We have to stop this."_\n\nBriana follows your gaze, then shakes her head. "This is bigger than us, Aren. This is a problem for kings, not peasants."\n\n_"No king has what we have."_\n\n\n',
      wholeSentence: true);
  new Ruleset(
      new Rule(937280785, 1, false, (ApplicabilityContext c) {
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
      new Rule(36322634, 0, false, (ApplicabilityContext c) {
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
  describeSuccessRate(sim, originalWorld, s);
}, null, null, null);
Approach exitFromBloodrockFromTunnel = new Approach(
    'tunnel', 'exit_from_bloodrock', 'Start running again', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You start running again.\n', wholeSentence: true);
});
Approach endOfRoamFromExitFromBloodrock = new Approach(
    'exit_from_bloodrock', '__END_OF_ROAM__', '', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('', wholeSentence: true);
});
final Room warForge = new Room('war_forge', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You enter the enormous cave that houses Mount Bloodrock\'s war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Large crooked  bats circle just below the clouds, their shrieks mixing with the clangs of steel and constant angry shouts from below.\n\n\n',
      wholeSentence: true);
  new Ruleset(
      new Rule(1010631821, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "cave_with_agruth");
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
      new Rule(383419248, 1, false, (ApplicabilityContext c) {
        final WorldState w = c.world;
        final Simulation sim = c.simulation;
        final Actor a = c.actor;
        return justCameFrom(w, "smelter");
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
Approach warForgeFromSmelter = new Approach(
    'smelter', 'war_forge', 'Go to the war forges', (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add(
      'You walk through a short passage lined with stone, and toward the sound of hundreds of hammers clanging against anvils.\n',
      wholeSentence: true);
});
Approach warForgeFromCaveWithAgruth = new Approach(
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

  static final WarForgeLookAround singleton = new WarForgeLookAround();

  @override
  String getCommand(Null _) {
    return 'Look around';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
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

  static final WarForgeWatchWorkers singleton = new WarForgeWatchWorkers();

  @override
  String getCommand(Null _) {
    return 'Watch the workers';
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Null _) {
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
  String applySuccess(ActionContext c, Null _) {
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
  String applyFailure(ActionContext c, Null _) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    throw StateError("Success chance is 100%");
  }

  @override
  ReasonedSuccessChance<Null> getSuccessChance(
      Actor a, Simulation sim, WorldState w, Null _) {
    return const ReasonedSuccessChance<Null>(1.0);
  }

  @override
  bool get rerollable => false;
  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;
  @override
  String get helpMessage => null;
  @override
  bool get isAggressive => false;
}

final Room orcthornRoom = new Room('orcthorn_room', (ActionContext c) {
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
Approach orcthornRoomFromSlaveQuartersPassage =
    new Approach('slave_quarters_passage', 'orcthorn_room', 'Open the door',
        (ActionContext c) {
  final WorldState originalWorld = c.world;
  final Simulation sim = c.simulation;
  final Actor a = c.actor;
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.add('You open the door.\n', wholeSentence: true);
});
final allRooms = <Room>[
  undergroundChurch,
  tunnel,
  tunnelCancelChance,
  testFightGoblin,
  startAdventure,
  undergroundChurchAltarAfterCeremony,
  slaveQuarters,
  justAfterAgruthFight,
  guardpostAboveChurch,
  smelter,
  caveWithAgruth,
  testFightOrc,
  undergroundChurchAltar,
  warForgeAfterIronMonster,
  slaveQuartersPassage,
  exitFromBloodrock,
  warForge,
  orcthornRoom
];
final allApproaches = <Approach>[
  undergroundChurchFromCaveWithAgruth,
  undergroundChurchFromGuardpostAboveChurch,
  undergroundChurchFromUndergroundChurchAltar,
  tunnelFromTunnelCancelChance,
  testFightGoblinFromPreStartBook,
  endOfRoamFromTestFightGoblin,
  startAdventureFromPreStartBook,
  slaveQuartersFromSlaveQuartersPassage,
  justAfterAgruthFightFromStartAdventure,
  guardpostAboveChurchFromUndergroundChurch,
  guardpostAboveChurchFromTunnelCancelChance,
  guardpostAboveChurchFromSmelter,
  smelterFromWarForge,
  smelterFromGuardpostAboveChurch,
  caveWithAgruthFromUndergroundChurch,
  caveWithAgruthFromSlaveQuartersPassage,
  caveWithAgruthFromWarForge,
  testFightOrcFromPreStartBook,
  endOfRoamFromTestFightOrc,
  undergroundChurchAltarFromUndergroundChurch,
  slaveQuartersPassageFromCaveWithAgruth,
  slaveQuartersPassageFromSlaveQuarters,
  slaveQuartersPassageFromOrcthornRoom,
  exitFromBloodrockFromTunnel,
  endOfRoamFromExitFromBloodrock,
  warForgeFromSmelter,
  warForgeFromCaveWithAgruth,
  orcthornRoomFromSlaveQuartersPassage
];
final allActions = <RoamingAction>[
  ExamineUndergroundChurch.singleton,
  TalkToBriana1.singleton,
  TalkToBriana2.singleton,
  TalkToBriana3.singleton,
  SlaveQuartersContinue.singleton,
  NameAgruthSwordOpportunity.singleton,
  NameAgruthSwordRedemption.singleton,
  NameAgruthSwordNothing.singleton,
  GuardpostAboveChurchEnterTunnelWithCancel.singleton,
  TakeOrcthorn.singleton,
  GuardpostAboveChurchTakeShield.singleton,
  SmelterLookAround.singleton,
  SearchAgruth.singleton,
  WaitForRitual.singleton,
  TakeSpearInUndergroundChurch.singleton,
  SmelterThrowSpear.singleton,
  SlaveQuartersPassageExamineDoor.singleton,
  WarForgeLookAround.singleton,
  WarForgeWatchWorkers.singleton
];
