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
// ignore_for_file: unnecessary_brace_in_string_interps
// ignore_for_file: prefer_const_constructors
// ignore_for_file: directives_ordering

import 'package:edgehead/fractal_stories/context.dart' show ActionContext;
import 'package:edgehead/fractal_stories/writer_action.dart' show RoamingAction;
import 'package:edgehead/fractal_stories/actor.dart' show Actor;
import 'package:edgehead/fractal_stories/time/actor_turn.dart' show ActorTurn;
import 'package:edgehead/fractal_stories/room_approach.dart' show Approach;
import 'package:edgehead/fractal_stories/context.dart'
    show ApplicabilityContext;
import 'package:edgehead/fractal_stories/history/custom_event_history.dart'
    show CustomEvent;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkAst;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkChoiceNode;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkForkNode;
import 'package:edgehead/fractal_stories/ink_ast.dart' show InkParagraphNode;
import 'package:edgehead/src/ink/ink_situation.dart' show InkSituation;
import 'package:edgehead/fractal_stories/action.dart' show Nothing;
import 'package:edgehead/fractal_stories/pose.dart' show Pose;
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
import 'package:edgehead/egamebook/elements/stat_update_element.dart'
    show StatUpdate;
import 'package:edgehead/fractal_stories/storyline/storyline.dart'
    show Storyline;
import 'package:edgehead/fractal_stories/items/weapon_type.dart'
    show WeaponType;
import 'package:edgehead/fractal_stories/world_state.dart'
    show WorldStateBuilder;
import 'package:edgehead/fractal_stories/world_state.dart' show WorldState;
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/world_state.dart'
    show WorldStateBuilderHelpers;
import 'package:edgehead/writers_helpers.dart';
part 'writers_input.compiled.g.dart';

const bool DEV_MODE = false;
final Approach endOfRoamFromRandomEncounter = Approach(
  'random_encounter',
  '__END_OF_ROAM__',
  'End encounter',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
);
final Approach randomEncounterFromPreRandomEncounter = Approach(
  'pre_random_encounter',
  'random_encounter',
  r'$IMPLICIT',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room preRandomEncounter = Room(
  'pre_random_encounter',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
);
final Room randomEncounter = Room(
  'random_encounter',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  generateRandomEncounter,
  null,
  positionX: 0,
  positionY: 0,
  mapName: 'N/A',
);
final Approach bigOObservatoryFromBigOAntechamber = Approach(
  'big_o_antechamber',
  'big_o_observatory',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "final_fight_ink_ink",
    ));
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return w.actionHasBeenPerformed('open_antechamber_lock');
  },
);
final finalFightInkInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    final ifBlock_51c64d7fc = !c.hasHappened(evSavedSarn)
        ? '''I hear a distant scream from way below and for a second I think I recognize my brother's voice. But there's no time for that now.'''
        : '''''';
    s.add(
      '${weSubstitutionCapitalized} ascend the ladder through the dark. ${ifBlock_51c64d7fc} I emerge in the middle of a sunlit space far above the forest of San Francisco. I can see the shape of the overgrown Bay Bridge to the southeast. The iconic Black Gate guards the Bay far to the northwest, immersed in fog.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'My eyes are now accustomed to the light. The space is open, with only a few pieces of furniture here and there. An exquisite chair, two workshop tables, a satin divan, a heavy white chest. All the windowpanes I can see are unbroken and pristine, though they vary slightly in color and texture. The air smells of the ocean. Whatever Big O is, he is rich. Richer than most kings.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_1d986f16d = c.hasHappened(evConetDestroyed)
        ? '''A device similar to the one in Conet is installed in one corner of the room.'''
        : '''''';
    s.add(
      '${ifBlock_1d986f16d}\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"You are a fool."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The voice comes from above. I look up and see that there is a second floor overlooking half this space, connected to the first one by a narrow staircase without a rail.\nA figure stands at the edge of a concrete plate, looking down. At first I only see the outline of a tall man. It\'s only after a few heartbeats that I realize there is something wrong with the head. It\'s not a human head.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '![Illustration of Big O, a necromancer with a dog\'s head.](bigo.png)\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'It\'s a dog\'s head.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Surprised?" The creature laughs. "I\'m glad. After such a long time, one doubts that the people below still haven\'t seen through the deceit."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "You are Big O." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Osiris," he nods. "Big O. Whatever the vermin down there call me these days."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He starts casually walking down the stairs, talking the whole way. "I\'m the big bad at the top. But as you can see, I\'m also the big hero." He chuckles: a sharp, unpleasant sound. "The Doghead.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "You are Doghead." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"That, too," he says. "I prefer Osiris myself. Big O these days, among the people at the bottom."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He starts casually walking down the stairs, talking the whole way. "I\'m the big bad at the top. And I\'m also Doghead, the big hero." He chuckles: a sharp, unpleasant sound. "You see,\n',
            isRaw: true,
          );
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
      'I invented the folktale two hundred years ago. You\'d be surprised how easy it is to get something like that going. People find a few ‘ancient’ artifacts and their imagination does the rest."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'He takes a moment to relish in my confusion. I force my expression to harden. He chuckles again.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"It\'s good insurance. If things ever go south, if I get desperate, I can just show my face, and ..." He spreads his arms and shows an ugly smile. "Everyone loves me."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Not if they know." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Big O\'s smile disappears. "But they won\'t. Today, you either join me or die. And if you\'re clever, you\'ll do the former.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Not if I kill you." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_33dade49d = c.playerIsAlone
              ? '''You're'''
              : '''You and your pathetic entourage are''';
          s.add(
            'Big O\'s smile disappears. "But you won\'t. ${ifBlock_33dade49d} not strong enough. I figure you\'re too clever to try anything like that.\n',
            isRaw: true,
          );
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
      'I think you know what will happen, sooner or later."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'He reaches the bottom of the stairs. "You. Are. A. Necromancer. You\'re not one of them. No, you\'re not, whatever you think now. They might like you now, but you know what happens soon."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'He hits the floor with the handle of his scythe for emphasis. The marble cracks in a delicate web of lines. "They will call you a ‘neck.’ They will hate and laugh at you behind your back. At best, they will ignore your talent. They will act as if your talent doesn’t exist. What stupidity! You and I have the power to fight death itself."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
      Rule(
        524156053,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.playerHasAsthma;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I cough. And then again. And again. The more I try to fight it, the worse it gets, and soon, I\'m deep in a coughing fit.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        1058657121,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.playerHasWoodenFoot;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I have to shift my bad leg, and the wooden stump makes a sound on the marble. Big O briefly looks down and smiles. I raise my chin and keep my gaze level.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        46628911,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.playerHasBurntFace;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Big O squints and observes my face. I have to fight the urge to hide the burnt side.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        811640080,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          assert(false,
              "The player doesn't have any feature: no asthma, no burnt face, no wooden foot.");
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_1aaeebfe6 = c.playerIsAlone ? '''me''' : '''us''';
    final ifBlock_35e089385 = c.hasItem(dragonEggId)
        ? '''Almost unconsciously, my hand touches the Dragon Egg hidden in my pocket. '''
        : '''''';
    s.add(
      'Big O starts to circle around ${ifBlock_1aaeebfe6}, still well out of reach. ${ifBlock_35e089385} "And instead of support," Big O says, "necromancers get sneers and spits. We ought to be at the top and instead we are at the bottom. But not here. Not in San Francisco. Here, the necromancers are at the top."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Not just necromancers. Also orcs and goblins." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"And giants, soon," he smiles. "You have to understand: they are tools. The orcs and goblins down there might be a bit crude and violent for your tender heart. But they are effective."\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "Effective for what?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '"Effective for building a new civilization.\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command:
                r""" "They are literally killing and enslaving innocent people." """
                    .trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'Big O mocks a sad expression with his dog eyes. "Oh no, are you going to cry? A few people here met an undeserved fate. Isn\'t that something that happens _every_ _single_ _day?_ Normally, people suffer for idiotic reasons, such as greed and senseless war. In contrast, the folks down there are suffering for a good cause, even if they don\'t know it.\n',
                  isRaw: true,
                );
              }),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "What are you trying to do here?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Preservation.\n',
            isRaw: true,
          );
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
      'The hard truth is that the ancients, in all their wisdom, allowed themselves to be wiped out. All that wisdom, all that power — wiped out."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_1aaeebfe6 = c.playerIsAlone ? '''me''' : '''us''';
    s.add(
      'Big O still walks in a wide circle around ${ifBlock_1aaeebfe6}. There\'s a spark in his eyes now.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"That can\'t happen again. I will not allow it." He places his free hand on his chest. "Humanity cannot lose knowledge if it\'s in the mind of an immortal. Civilization will not end if it\'s strong enough to withstand anything."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "You call this civilization?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"To disrupt the status quo, you have to move fast and break things. At the other end of all this, we will have a much better version of society. Strong, efficient, everlasting. The tools — the orcs and goblins and giants — will help us get there. It\'s the only way."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "How does attacking innocents help?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"You\'re not looking far enough into the future, child. This place is just the beginning. It\'s the epicenter. My vision goes way beyond this valley." He points to the north, east and south. "We can build this empire again. But this time, we make it everlasting. Isn\'t it worth a few lives down below?"\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "You are crazy and you will die." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The fight begins.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Why do you need me?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"I don\'t, child," he says. "I don\'t _need_ anyone. But someone of your talents might be useful. My quakes have worked: the giants are coming. This place will soon be a lot busier than it is now."\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "You are crazy and you will die." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'The fight begins.\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "What do you offer?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '"The knowledge that your life has some meaning. Power. Status. Immortality. Literally _everything_ that the human mind has ever wanted." Osiris smiles. "That\'s what I offer."\n',
                  isRaw: true,
                );
              }),
              InkForkNode([
                InkChoiceNode(
                  command: r""" "You are crazy and you will die." """.trim(),
                  consequence: [
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'The fight begins.\n',
                        isRaw: true,
                      );
                    }),
                  ],
                ),
                InkChoiceNode(
                  command:
                      r""" "You are wise >> ... and you will die." """.trim(),
                  consequence: [
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'The fight begins.\n',
                        isRaw: true,
                      );
                    }),
                  ],
                ),
                InkChoiceNode(
                  command:
                      r""" "You are wise >> ... and you will live forever." """
                          .trim(),
                  consequence: [
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'I kneel before Osiris and bow my head. When I look up, he smiles with satisfaction.\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'In the following years, we work together to make San Francisco into the fortress that Osiris envisioned. The orcs make competent captains and warriors. Goblins and kobolds build palisades, traps, and pits. Giants work tirelessly on machines of war.\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'Soon, the last vestiges of humanity leave the area. Osiris and I are free.\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'As I overlook the Bay, my frail old hand resting on the ancient windowpane, watching the orcish warships sail out to plunder, do I wonder if I made the right choice? Of course I do.\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        'But, alas, the fight is over.\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      w.popSituationsUntil(RoomRoamingSituation.className, c);
                      w.popSituation(c);
                    }),
                  ],
                ),
              ]),
            ],
          ),
        ]),
      ],
    ),
  ]),
]);

class FinalFightInk extends RoamingAction {
  @override
  final String name = 'final_fight_ink';

  static final FinalFightInk singleton = FinalFightInk();

  @override
  List<String> get commandPathTemplate => ['N/A'];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('start_bogus_location') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "final_fight_ink_ink",
    ));
    return '${a.name} successfully performs FinalFightInk';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform FinalFightInk';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room bigOObservatory = Room(
  'big_o_observatory',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateBigOFight,
  null,
  positionX: 26,
  positionY: 16,
  mapName: 'Observatory',
  firstMapName: 'The Very Top',
  hint: 'At the very top of the Pyramid, a sunlit, luxurious room.',
  firstHint: 'A dark shaft with a ladder leads upwards to a sunlit space.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "big_o_end_ink_ink",
    ));
  },
);
final bigOEndInkInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I look at the dead necromancer. The tyrant is no more, and his sick experiment will no doubt crumble without his leadership.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'It has started raining outside. The large raindrops drum on the windowpanes, and the air becomes sweeter.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'An hour later, I\'m descending through the Pyramid. No one tries to stop me. Even the orcs move out of the way. They all look, mesmerized by what I hold in my hands.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Down in the Bleeds, I wait for a crowd to form. We all stand in the rain. People don\'t complain. They know that what they are about to witness transcends this brief moment of discomfort. They all know what the thing in my hands means.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
      Rule(
        948235391,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened(evSavedSarn);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Sarn comes to the front. He looks much better now. The shaking is gone. In the rain it\'s hard to tell if those are tears on his cheeks, or just raindrops.\n\n"I do regret what I did, Aren," he says. "I left you and our father when you needed me most."\n\nI search for what to say, but all I can do is give a little nod. The tiniest of acknowledgements.\n\nSeeing this subtle movement, Sarn starts quietly sobbing. His face goes into pieces. His head slumps and he stays in that pose for a few heartbeats. But then he straightens and returns the nod.\n\nThe cold rain wipes off the new tears. "I am back," he says.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        794016591,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I think about Sarn. He died somewhere in the Pyramid, I am sure of it. He paid for the suffering he brought upon his own family. Good riddance.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A crowd has formed. Two dozen men and women are soaking in the downpour, watching me in silence. I raise my possession for everyone to see.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '![Illustration of Big O\'s head in my arms. Before me, a group of people.](doghead.png)\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I am the Doghead." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am the one these people have been waiting for. The man with a dog\'s head. The savior of this damned place.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "The Doghead is dead." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I killed him. I removed the false myth and the tyrant behind it.\n',
            isRaw: true,
          );
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
      'The fight is over.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.movePlayer('__END_OF_ROAM__');
  }),
]);

class BigOEndInk extends RoamingAction {
  @override
  final String name = 'big_o_end_ink';

  static final BigOEndInk singleton = BigOEndInk();

  @override
  List<String> get commandPathTemplate => ['N/A'];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('start_bogus_location') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "big_o_end_ink_ink",
    ));
    return '${a.name} successfully performs BigOEndInk';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BigOEndInk';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Approach bigOAntechamberFromCrowdsource = Approach(
  'crowdsource',
  'big_o_antechamber',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach bigOAntechamberFromTopOfClimb = Approach(
  'top_of_climb',
  'big_o_antechamber',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class ExamineAntechamberLock extends RoamingAction {
  @override
  final String name = 'examine_antechamber_lock';

  static final ExamineAntechamberLock singleton = ExamineAntechamberLock();

  @override
  List<String> get commandPathTemplate => [
        'Lock mechanism',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('big_o_antechamber') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_13a1b5365 = c.hasItem(theNullId)
        ? '''After a few moments, I realize the shape of the lock reminds me of something I have. The circular badge of the orc leader. It will fit.'''
        : '''''';
    s.add(
      'The mechanism is complex and delicate. Not quite ancient but definitely the work of someone skillful.\n\nIn contrast to the intricate texture of the bulk of the mechanism, the center of the lock is simple. An elegant circle, about the size of my palm. This must be the equivalent of a key slit.\n\n${ifBlock_13a1b5365}\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ExamineAntechamberLock';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ExamineAntechamberLock';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class OpenAntechamberLock extends RoamingAction {
  @override
  final String name = 'open_antechamber_lock';

  static final OpenAntechamberLock singleton = OpenAntechamberLock();

  @override
  List<String> get commandPathTemplate => [
        'Lock mechanism',
        'Open with the badge',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('big_o_antechamber') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('examine_antechamber_lock') &&
        c.hasItem(theNullId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I climb up the staircase and place the metal circle in the center of the mechanism. It fits perfectly. Something in the trap door clicks, and the door slowly opens, as if held by an invisible hand.\n\nA ladder leads upwards, through a dark shaft and into a sunlit space far above.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs OpenAntechamberLock';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OpenAntechamberLock';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room bigOAntechamber = Room(
  'big_o_antechamber',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I come to a dark room without windows, at the very center of the 39th floor. A stone staircase leads up to a trap door in the ceiling.\n\nA curious lock mechanism guards the trap door from being opened.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 26,
  positionY: 22,
  mapName: 'Antechamber',
  firstMapName: 'A Clean Chamber',
  hint:
      'The room with the trap door in the ceiling and that curious lock mechanism.',
  firstHint:
      'Far apart from most of the commotion, this part of the Pyramid clearly sees much less regular use. The corridors are empty and clean, and they all converge on this one silent room.',
);
final Approach dargTentFromBarracks = Approach(
  'barracks',
  'darg_tent',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class DargTentAttack extends RoamingAction {
  @override
  final String name = 'darg_tent_attack';

  static final DargTentAttack singleton = DargTentAttack();

  @override
  List<String> get commandPathTemplate => [
        'Darg',
        'Attack',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('darg_tent') != true) {
      return false;
    }
    if (!(c.hasHappened(evDargLeftCrowdsource) &&
        !c.hasHappened(evKilledDarg))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    final ifBlock_20579df5 = c.playerIsMale ? '''boy''' : '''girl''';
    s.add(
      '${weSubstitutionCapitalized} approach Darg\'s tent. Darg spots me and looks surprised at first, then amused.\n\n"A human child, here?" Darg says, readying his poleaxe. "Must have found a crawl space to get here." He grins. "Never mind, ${ifBlock_20579df5}. I\'ll dance on your bones."\n\n',
      isRaw: true,
    );
    c.startOptionalFight();

    return '${a.name} successfully performs DargTentAttack';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DargTentAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => true;
}

final Room dargTent = Room(
  'darg_tent',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This is a concrete platform sitting over six hundred feet above the redwood forest. I can clearly see the Bay from here, and the ancient bridge over it. The air is fresh, and I can hear the twitter of local birds again.\n\nA richly decorated tent sits at the center of the platform. I can see dagger and sabre motifs, painted in red on the off-white tent. Some important orc must be stationed here.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateDargTentFight,
  null,
  fightIsOptional: true,
  positionX: 33,
  positionY: 23,
  mapName: 'Orc Leader\'s Tent',
  firstMapName: 'On Top of the Eastern Shaft',
  hint: 'A tent placed on top of the eastern shaft, overlooking the Bay.',
  firstHint:
      'There is access to the outside of the Pyramid here. The walls next to the ancient door are painted red and decorated with human teeth and other signs of orc power.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. I look around, half-expecting a company of orcs. But not a single one has come. They probably didn\'t consider it necessary to post guards around this remote place, and the wind has swept away the sound of battle.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledDarg);

    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "darg_head_talk_ink_ink",
    ));
  },
);
final Room dargTentAfterDargArrived = Room(
  'darg_tent_after_darg_arrived',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'This is a concrete platform sitting over six hundred feet above the redwood forest. I can clearly see the Bay from here, and the ancient bridge over it. The air is fresh, and I can hear the twitter of local birds again.\n\nA richly decorated tent sits at the center of the platform. I can see dagger and sabre motifs, painted in red on the off-white tent. Some important orc must be stationed here.\n\nAs I consider that, I see a large figure through the flaps of the tent. It is Darg, the orc leader I first saw in the Orcs’ Temple.\n\n\n![Illustration of Darg, a huge orc with a weapon that resembles a battle axe.](darg.png)\n\n${weSubstitutionCapitalized} stay hidden.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateDargTentFight,
  null,
  parent: 'darg_tent',
  prerequisite: Prerequisite(
    910482930,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evDargLeftCrowdsource);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'Darg, the orc leader I first saw in the Orcs’ Temple, is here.\n\n![Illustration of Darg, a huge orc with a weapon that resembles a battle axe.](darg.png)\n\n${weSubstitutionCapitalized} stay hidden.\n',
      isRaw: true,
    );
  },
  fightIsOptional: true,
  positionX: 33,
  positionY: 23,
  mapName: 'Orc Leader\'s Tent',
  firstMapName: 'On Top of the Eastern Shaft',
  hint: 'A tent placed on top of the eastern shaft, overlooking the Bay.',
  firstHint:
      'There is access to the outside of the Pyramid here. The walls next to the ancient door are painted red and decorated with human teeth and other signs of orc power.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. I look around, half-expecting a company of orcs. But not a single one has come. They probably didn\'t consider it necessary to post guards around this remote place, and the wind has swept away the sound of battle.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledDarg);

    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "darg_head_talk_ink_ink",
    ));
  },
);
final Room dargTentAfterDargKilled = Room(
  'darg_tent_after_darg_killed',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This is a concrete platform sitting over six hundred feet above the redwood forest. I can clearly see the Bay from here, and the ancient bridge over it. The air is fresh, and I can hear the twitter of local birds again.\n\nA richly decorated tent sits at the center of the platform. I can see dagger and sabre motifs, painted in red on the off-white tent. Some important orc must be stationed here.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateDargTentFight,
  null,
  parent: 'darg_tent',
  prerequisite: Prerequisite(
    831974385,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evKilledDarg) &&
          !c.hasHappened(evDargLeftCrowdsource);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Darg won\'t be needing this tent anymore.\n',
      isRaw: true,
    );
  },
  fightIsOptional: true,
  positionX: 33,
  positionY: 23,
  mapName: 'Orc Leader\'s Tent',
  firstMapName: 'On Top of the Eastern Shaft',
  hint: 'A tent placed on top of the eastern shaft, overlooking the Bay.',
  firstHint:
      'There is access to the outside of the Pyramid here. The walls next to the ancient door are painted red and decorated with human teeth and other signs of orc power.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. I look around, half-expecting a company of orcs. But not a single one has come. They probably didn\'t consider it necessary to post guards around this remote place, and the wind has swept away the sound of battle.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledDarg);

    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "darg_head_talk_ink_ink",
    ));
  },
);
final dargHeadTalkInkInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_34cb16e65 = c.inRoomParent("crowdsource")
        ? '''retreat back to the shadows'''
        : '''leave''';
    s.add(
      'I am almost about to ${ifBlock_34cb16e65} when I hear a soft, gurgling sound. Darg\'s head opens its dead eyes, and an ugly, unnatural grin appears on the face.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
      Rule(
        48764348,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened(evKilledHope);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am reminded of my fight with Lady Hope. The necromancer is speaking through dead flesh again.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        744619327,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am duly impressed. Someone must be puppeteering the body. A highly skilled necromancer, perhaps.\n\nI risk a quick look around. Nobody else is here. The necromancer must be doing this from afar. Even more impressive.\n\nBut then, Darg\'s undead lips start moving. He _speaks._\n\n"Welcome, young one." The voice is dry and labored, but nevertheless understandable. A talking corpse is something I\'ve never even considered before. This is obviously necromancy of some higher level.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"You should know I hold no grudge against you. I respect your skill."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I respect yours." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Good," the head says. "You must understand, I seek nothing less than immortality. Not of myself, mind you. Immortality of civilization, of culture."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Shut up." """.trim(),
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
      'Darg\'s dead gaze slowly slides toward the floor but the mouth keeps talking. "What happened to the ancients cannot happen to us. I will make sure of it."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The muscles on Darg\'s head finally loosen and his tongue touches the ground.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I kneel down to inspect the dead body. Surely, the necromancer behind the talking must have used some kind of a device to make the corpse talk. He or she could have implanted it into the windpipe a long ago.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'But I find no such thing. Despite my instincts, I must assume that the necromancer is able to do all of this remotely, without the help of any device. I shudder. No human can possibly endure such concentration. Such pain.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'On Darg\'s chest, I find a circular iron badge. It has nothing embossed in it, but that simplicity somehow makes it even more impressive. I take it.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.giveNewItemToPlayer(theNull);
    if (c.knows(TheNullFacts.somethingRoundCalledNull)) {
      s.add("This must be the Null I have heard about.", isRaw: true);
      c.learn(TheNullFacts.orcLeaderHasIt);
    }
  }),
]);

class DargHeadTalkInk extends RoamingAction {
  @override
  final String name = 'darg_head_talk_ink';

  static final DargHeadTalkInk singleton = DargHeadTalkInk();

  @override
  List<String> get commandPathTemplate => ['N/A'];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('start_bogus_location') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "darg_head_talk_ink_ink",
    ));
    return '${a.name} successfully performs DargHeadTalkInk';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DargHeadTalkInk';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Approach outlookFromTopOfClimb = Approach(
  'top_of_climb',
  'outlook',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final hawkmanExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I have seen hawkmen before. They are vicious creatures. Intelligent predators with fragile bodies but superhuman agility.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Hawkmen are often mercenaries. They are effective, ruthless, and expensive. Though most people think that at least part of their real motivation is the thrill of the battle and the kill.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This particular hawkman seems to be one of the more successful ones. The suit and the sharp sickle are proof.\n',
      isRaw: true,
    );
  }),
]);
final outlookAttackInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The hawkman gives me a condescending look.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '“So you finally decide to crawl out of your hole and face me, little human?” He swings his sickle in front of him and nods. “I am ready.”\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “I came to talk.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“There is nothing to talk about,” the hawkman says. “You trespass on my master’s tower, you die.” He\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “Ready to die?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Cute,” he says. “But you chose a bad place for your comedy. This is my master’s property, and you are trespassing.” The hawkman\n',
            isRaw: true,
          );
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
      'starts toward me. The high wind ruffles the feathers at the back of his head as he walks.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" Attack """.trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command: r""" “Who is your master?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The hawkman lets out a short chuckle. “That’s good. You came all this way and you don’t know? The big dog at the top, of course,” he says, nodding towards the point of the Pyramid.\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" “Why are you in his service?” """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '"Coins, human," the hawkman says. "Also, this view isn’t half bad, don’t you think? I can see the giants over the water." He chuckles again. "They are coming, you know."\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" “What are you watching from here?” """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '“Master’s realm, of course. This all will become a new, powerful civilization. Built on the shoulders of giants.” He chuckles again. “I can already see them, you know. The giants. They are coming here.”\n',
                  isRaw: true,
                );
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
    c.startOptionalFight();
  }),
]);

class HawkmanExamine extends RoamingAction {
  @override
  final String name = 'hawkman_examine';

  static final HawkmanExamine singleton = HawkmanExamine();

  @override
  List<String> get commandPathTemplate => [
        'Hawkman',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('outlook') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "hawkman_examine_ink",
    ));
    return '${a.name} successfully performs HawkmanExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform HawkmanExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class OutlookAttack extends RoamingAction {
  @override
  final String name = 'outlook_attack';

  static final OutlookAttack singleton = OutlookAttack();

  @override
  List<String> get commandPathTemplate => [
        'Hawkman',
        'Approach',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('outlook') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "outlook_attack_ink",
    ));
    return '${a.name} successfully performs OutlookAttack';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OutlookAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => true;
}

class StripDeadHawkman extends RoamingAction {
  @override
  final String name = 'strip_dead_hawkman';

  static final StripDeadHawkman singleton = StripDeadHawkman();

  @override
  List<String> get commandPathTemplate => [
        'Hawkman\'s suit',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(!c.getRoomRoaming().monstersAlive &&
        !c.playerRoom.isSynthetic &&
        c.playerRoom.isOnMap &&
        c.inRoomWith(hawkmanId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I strip the hawkman of his suit and put it on. It fits well, and feels like no fabric I have touched before.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(hawkmanJacket);

    return '${a.name} successfully performs StripDeadHawkman';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform StripDeadHawkman';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room outlook = Room(
  'outlook',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A small door opens to a platform overlooking the ruins of San Francisco. Cold wind hits me in the face, bringing with it tiny droplets of water.\n\nAt the other end of the platform, a solitary hawkman is looking into the distance. He probably saw me opening the door, but doesn\'t seem to care.\n\n![Illustration of a man with a hawk\'s head, dressed in an ancient suit, with a sickle for a weapon.](hawkman.png)\n\nHe is wearing an ancient suit, miraculously preserved.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateHawkmanFight,
  null,
  fightIsOptional: true,
  positionX: 20,
  positionY: 25,
  mapName: 'Outlook',
  firstMapName: 'On Top of the Western Shaft',
  hint: 'A place for a sentry with excellent eyes.',
  firstHint:
      'Something is on top of the shaft. The access to outside is well used, though it\'s unguarded.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledHawkman);
  },
);
final Approach topOfClimbFromBarracks = Approach(
  'barracks',
  'top_of_climb',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach topOfClimbFromBigOAntechamber = Approach(
  'big_o_antechamber',
  'top_of_climb',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach topOfClimbFromConet = Approach(
  'conet',
  'top_of_climb',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach topOfClimbFromKeepServants = Approach(
  'keep_servants',
  'top_of_climb',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach topOfClimbFromOutlook = Approach(
  'outlook',
  'top_of_climb',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room topOfClimb = Room(
  'top_of_climb',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_22fbea428 =
        c.world.visitHistory.getLatestOnly(a)!.parentRoomName == "keep_servants"
            ? '''Orc language can be heard from behind the walls.'''
            : '''''';
    s.add(
      'A huge, dark pit. The bottom is unseen, in complete darkness.\n\n${ifBlock_22fbea428}\n\n',
      isRaw: true,
    );
    c.learn(OrcsFacts.inPyramid);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 20,
  positionY: 30,
  mapName: 'Top of a Shaft',
  hint: 'A dark pit extends hundreds of feet toward the bottom of the Pyramid.',
);
final Approach crowdsourceFromBarracks = Approach(
  'barracks',
  'crowdsource',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach crowdsourceFromBigOAntechamber = Approach(
  'big_o_antechamber',
  'crowdsource',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach crowdsourceFromConet = Approach(
  'conet',
  'crowdsource',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final crowdsourceListenInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Only you have the power," the shaman is saying to Darg. "Use it! Talk to him!"\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Darg takes a step back from her and shakes his head. He looks upward. "The Maker will call me. Before that, my hands are tied. A mouse does not ask to visit the cat."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The shaman sighs and takes a step toward Darg. Her hushed voice reverberates through the large space. "The Maker gave you the Null. Why else would he give it to you other than for you to use it?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" Listen some more """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Darg lowers his voice, too. "You don\'t know him the way I do. He\'s no orc. No human. I have never seen his face but there\'s something in his voice." Darg pauses and lowers his voice even further. "He\'s terrifying."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The shaman growls. "You\'re afraid," she says.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Darg\'s huge hand moves quickly and squeezes the back of the shaman\'s neck. His angry snarl fills the temple.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"I have a weakness for you, shaman," he says. "But say something like that one more time and I break you and dance on your bones." He glances around. "My guard is close, he could have heard."\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" Listen some more """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'After a brief moment of silence, the shaman starts talking again. Her voice is softer now. "If we can\'t ask the Maker for permission, so be it. We can attack now, and ask him for forgiveness later."\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'Darg shakes his head, but the shaman continues.\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '"It will be an easy win and you know it. The crowd is ready. We can take the whole tower today. There will be no resistance."\n',
                  isRaw: true,
                );
              }),
              InkForkNode([
                InkChoiceNode(
                  command: r""" Listen some more """.trim(),
                  consequence: [
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        '"You don\'t know that," Darg says and watches the shaman, once again, take a step toward him.\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        '"Of course I do, Darg," the shaman says. "Didn\'t you hear the hawk? He saw a company of Knights leaving the tower and traveling south. They\'ve abandoned this place."\n',
                        isRaw: true,
                      );
                    }),
                    InkParagraphNode((c) => c.outputStoryline.addParagraph()),
                    InkParagraphNode((ActionContext c) {
                      final WorldState originalWorld = c.world;
                      final Simulation sim = c.simulation;
                      final Actor a = c.actor;
                      final WorldStateBuilder w = c.outputWorld;
                      final Storyline s = c.outputStoryline;
                      s.add(
                        '"It might have been only some of them," Darg says. "Others might be still inside."\n',
                        isRaw: true,
                      );
                    }),
                    InkForkNode([
                      InkChoiceNode(
                        command: r""" Listen some more """.trim(),
                        consequence: [
                          InkParagraphNode((ActionContext c) {
                            final WorldState originalWorld = c.world;
                            final Simulation sim = c.simulation;
                            final Actor a = c.actor;
                            final WorldStateBuilder w = c.outputWorld;
                            final Storyline s = c.outputStoryline;
                            s.add(
                              '"So what?" The shaman grins and places her hand on Darg\'s crotch. "We\'ll kill them."\n',
                              isRaw: true,
                            );
                          }),
                          InkParagraphNode(
                              (c) => c.outputStoryline.addParagraph()),
                          InkParagraphNode((ActionContext c) {
                            final WorldState originalWorld = c.world;
                            final Simulation sim = c.simulation;
                            final Actor a = c.actor;
                            final WorldStateBuilder w = c.outputWorld;
                            final Storyline s = c.outputStoryline;
                            s.add(
                              'Darg freezes, then slowly pulls away her hand. "We\'ll wait for the Maker\'s decision," he says. "The Maker\'s plan is larger than the tower itself. Attacking now seems obvious, but it can be a bad mistake."\n',
                              isRaw: true,
                            );
                          }),
                          InkParagraphNode(
                              (c) => c.outputStoryline.addParagraph()),
                          InkParagraphNode((ActionContext c) {
                            final WorldState originalWorld = c.world;
                            final Simulation sim = c.simulation;
                            final Actor a = c.actor;
                            final WorldStateBuilder w = c.outputWorld;
                            final Storyline s = c.outputStoryline;
                            s.add(
                              'The shaman draws away from Darg but says nothing. I can hear her breathe.\n',
                              isRaw: true,
                            );
                          }),
                          InkParagraphNode(
                              (c) => c.outputStoryline.addParagraph()),
                          InkParagraphNode((ActionContext c) {
                            final WorldState originalWorld = c.world;
                            final Simulation sim = c.simulation;
                            final Actor a = c.actor;
                            final WorldStateBuilder w = c.outputWorld;
                            final Storyline s = c.outputStoryline;
                            s.add(
                              '"Knowing to avoid bad mistakes like this is how I earned the Null," Darg says. "I know the crowd is only a small part of this machine, and I don\'t see where it fits." He gestures to encompass the room. "Now prepare for the daily."\n',
                              isRaw: true,
                            );
                          }),
                          InkParagraphNode(
                              (c) => c.outputStoryline.addParagraph()),
                          InkParagraphNode((ActionContext c) {
                            final WorldState originalWorld = c.world;
                            final Simulation sim = c.simulation;
                            final Actor a = c.actor;
                            final WorldStateBuilder w = c.outputWorld;
                            final Storyline s = c.outputStoryline;
                            s.add(
                              'The shaman frowns but moves away from Darg and starts preparing the temple for some kind of a ritual. Darg watches her work.\n',
                              isRaw: true,
                            );
                          }),
                        ],
                      ),
                      InkChoiceNode(
                        command: r""" Stop """.trim(),
                        consequence: [],
                      ),
                    ]),
                  ],
                ),
                InkChoiceNode(
                  command: r""" Stop """.trim(),
                  consequence: [],
                ),
              ]),
            ],
          ),
          InkChoiceNode(
            command: r""" Stop """.trim(),
            consequence: [],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" Stop """.trim(),
      consequence: [],
    ),
  ]),
]);

class CrowdsourceAttack extends RoamingAction {
  @override
  final String name = 'crowdsource_attack';

  static final CrowdsourceAttack singleton = CrowdsourceAttack();

  @override
  List<String> get commandPathTemplate => [
        'Orcs',
        'Attack',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} step from behind the pillars and approach the two orcs.\n\n"Humans?" the shaman says. "Here?"\n\n"Looks like a child," Darg says, readying his poleaxe. "Must have found a crawl space to get in here."\n\nThe shaman readies the ceremonial dagger from her side and takes position next to Darg. "Let\'s kill together, Darg. Like in Oak Land so many moons ago."\n\nDarg grins.\n\n',
      isRaw: true,
    );
    c.startOptionalFight();

    return '${a.name} successfully performs CrowdsourceAttack';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CrowdsourceAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => true;
}

class CrowdsourceListen extends RoamingAction {
  @override
  final String name = 'crowdsource_listen';

  static final CrowdsourceListen singleton = CrowdsourceListen();

  @override
  List<String> get commandPathTemplate => [
        'Orcs',
        'Listen',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "crowdsource_listen_ink",
    ));
    return '${a.name} successfully performs CrowdsourceListen';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CrowdsourceListen';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room crowdsource = Room(
  'crowdsource',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'This room serves as a temple for the orcs. It has no windows and is lit by torches. The darkness and the rows of pillars provide good opportunities to hide.\n\nI can only see two orcs here. One of them is a shaman: an old but muscular female orc, with a long chain of human teeth around her neck, a ceremonial dagger at her side. The shaman is talking with another orc, addressing him as Darg.\n\nDarg is larger and considerably more muscular than the shaman. He is the leader of this orc outpost. A large poleaxe made from ancient parts serves as both his weapon and his symbol of power.\n\n![Illustration of Darg, a huge orc with a weapon that resembles a battle axe.](darg.png)\n\n${weSubstitutionCapitalized} stay hidden.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateCrowdsourceFight,
  null,
  fightIsOptional: true,
  positionX: 27,
  positionY: 29,
  mapName: 'Orcs’ Temple',
  firstMapName: 'Religious Place',
  hint:
      'A temple with no windows, lit by torches. The darkness and the rows of pillars provide good opportunities to hide.',
  firstHint: 'Orc symbols indicate a temple, a sacrificial place, or both.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. I look around and there are no more orcs. The corridors are silent. I am fortunate that the temple is so secluded from the rest of the orcs\' complex.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledDarg);

    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "darg_head_talk_ink_ink",
    ));
  },
);
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
      'This room serves as a temple for the orcs. It has no windows and is lit by torches. The darkness and the rows of pillars provide good opportunities to hide.\n\nI can only see two orcs here. One of them is a shaman: an old but muscular female orc, with a long chain of human teeth around her neck, a ceremonial dagger at her side. The shaman is talking with another orc, addressing him as Darg.\n\nDarg is larger and considerably more muscular than the shaman. He is the leader of this orc outpost. A large poleaxe made from ancient parts serves as both his weapon and his symbol of power.\n\n![Illustration of Darg, a huge orc with a weapon that resembles a battle axe.](darg.png)\n\n${weSubstitutionCapitalized} stay hidden.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateCrowdsourceFight,
  null,
  parent: 'crowdsource',
  prerequisite: Prerequisite(
    586291809,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evDargLeftCrowdsource) &&
          !c.hasHappened(evKilledDarg);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The orcs are gone.\n',
      isRaw: true,
    );
  },
  fightIsOptional: true,
  positionX: 27,
  positionY: 29,
  mapName: 'Orcs’ Temple',
  firstMapName: 'Religious Place',
  hint:
      'A temple with no windows, lit by torches. The darkness and the rows of pillars provide good opportunities to hide.',
  firstHint: 'Orc symbols indicate a temple, a sacrificial place, or both.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. I look around and there are no more orcs. The corridors are silent. I am fortunate that the temple is so secluded from the rest of the orcs\' complex.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledDarg);

    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "darg_head_talk_ink_ink",
    ));
  },
);
final Room crowdsourceVestry = Room(
  'crowdsource_vestry',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 28,
  positionY: 30,
  mapName: 'Orcs’ Temple Vestry',
);
final Approach barracksFromCrowdsource = Approach(
  'crowdsource',
  'barracks',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach barracksFromDargTent = Approach(
  'darg_tent',
  'barracks',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach barracksFromJunction = Approach(
  'junction',
  'barracks',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach barracksFromTopOfClimb = Approach(
  'top_of_climb',
  'barracks',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final barracksTakeBarbecuedBatInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The bat has been broiled well. Maybe too well. But there\'s enough meat on it.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.giveNewItemToPlayer(barbecuedBat);
  }),
]);

class BarracksTakeBarbecuedBat extends RoamingAction {
  @override
  final String name = 'barracks_take_barbecued_bat';

  static final BarracksTakeBarbecuedBat singleton = BarracksTakeBarbecuedBat();

  @override
  List<String> get commandPathTemplate => [
        'Barbecued bat',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('barracks') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "barracks_take_barbecued_bat_ink",
    ));
    return '${a.name} successfully performs BarracksTakeBarbecuedBat';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BarracksTakeBarbecuedBat';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room barracks = Room(
  'barracks',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'A large room taking up two floors. Bunk beds, and a dining area. ${weSubstitutionCapitalized} stay hidden.\n\n',
      isRaw: true,
    );
    Ruleset(
      Rule(
        289329998,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.playerHasAsthma;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' As I duck to walk beneath a snuffed torch on the wall, I have to stop. My lungs suddenly feel as if on fire. I have a strong urge to cough. My asthma.\n\n There are orcs nearby that would surely hear me. I hold my breath and curl beneath the torch. Pain. Suffocation. Fear.\n\n After ten long heartbeats, I am able to swallow and the urge subsides. I wait a few more moments before breathing again. After that, I quickly scuttle to a more remote area, where I find a barbecued bat on a stool out of sight.\n\n I almost cry with happiness.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        571428451,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' I find a barbecued bat on a stool out of sight.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 30,
  positionY: 33,
  mapName: 'Barracks',
  firstMapName: 'Large Quiet Area',
  hint: 'A large room taking up two floors with bunk beds and a dining area.',
  firstHint: 'Sounds of orcs snoring.',
);
final Approach conetFromCrowdsource = Approach(
  'crowdsource',
  'conet',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach conetFromSmithy = Approach(
  'smithy',
  'conet',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return !c.hasHappened(evSavedSarn) || c.hasHappened(evTookSarnToBleeds);
  },
);
final conetExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The device occupies most of the room. It is made of massive redwood beams and concrete blocks, but also delicate machinery. The air smells of oiled wood and kobold sweat.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_5b399eb1d = c.hasHappened(evConetDestroyed)
        ? '''This spring was being drawn by the kobold's turning of the wheel.'''
        : '''This spring is being drawn, very slowly, by the kobold's turning of the wheel.''';
    s.add(
      'A large pillar of wood, concrete, and metal stands in the center. A large spring rolls around this pillar and vibrates with strange, anxious energy. ${ifBlock_5b399eb1d}\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Only after focusing on this centerpiece do I realize that there is a subtle symmetry in the room. Rings of cracks on the floor radiate from the pillar outward, getting fainter as they recede from the core.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This is the source of the earthquakes. I am sure of it.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(ConetFacts.sawConet);
  }),
]);
final conetKoboldExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The kobold is talking to himself as he\'s turning the wheel.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"How I wish I could be down there and fight," he says. "What I\'d give to be able to crack some skulls."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'He swings his free hand as if holding a weapon. "You coming at me?" he says to an imaginary foe. "You coming at me? I\'m faster than you, you son of a—"\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Another swing of a hand, and a grin.\n',
      isRaw: true,
    );
  }),
]);

class ConetAttack extends RoamingAction {
  @override
  final String name = 'conet_attack';

  static final ConetAttack singleton = ConetAttack();

  @override
  List<String> get commandPathTemplate => [
        'Kobold',
        'Attack',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('conet') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} step out of hiding. The kobold stops turning the wheel, briefly surprised. But then he jumps to the side and picks a big black wrench from a brown bag on the floor.\n\n"Oh, this is going to be good," he says. "A human child."\n\n',
      isRaw: true,
    );
    c.startOptionalFight();

    return '${a.name} successfully performs ConetAttack';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ConetAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => true;
}

class ConetExamine extends RoamingAction {
  @override
  final String name = 'conet_examine';

  static final ConetExamine singleton = ConetExamine();

  @override
  List<String> get commandPathTemplate => [
        'Device',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('conet') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ConetExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ConetKoboldExamine extends RoamingAction {
  @override
  final String name = 'conet_kobold_examine';

  static final ConetKoboldExamine singleton = ConetKoboldExamine();

  @override
  List<String> get commandPathTemplate => [
        'Kobold',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('conet') != true) {
      return false;
    }
    if (!(!w.actionHasBeenPerformed('conet_attack'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "conet_kobold_examine_ink",
    ));
    return '${a.name} successfully performs ConetKoboldExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ConetKoboldExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room conet = Room(
  'conet',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'A kobold is operating a large device. He is turning a huge wheel, drawing some kind of a spring.\n\nThere is writing on the entrance:\n\n![Illustration of a primitive writing on the wall, saying "Conet"](conet.png)\n\nA word I do not understand. ${weSubstitutionCapitalized} stay hidden.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateConetFight,
  null,
  fightIsOptional: true,
  positionX: 19,
  positionY: 38,
  mapName: 'Conet',
  firstMapName: 'Some Mechanism',
  hint: 'A room filled with a large device.',
  firstHint:
      'Something is making quiet chafing sounds. Reminds me of millstones.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over.\n\n',
      isRaw: true,
    );
    c.markHappened(evConetDestroyed);
  },
);
final Room conetAfterClearing = Room(
  'conet_after_clearing',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The room is silent.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateConetFight,
  null,
  parent: 'conet',
  prerequisite: Prerequisite(
    357396258,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evConetDestroyed);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Now, the room is silent.\n',
      isRaw: true,
    );
  },
  fightIsOptional: true,
  positionX: 19,
  positionY: 38,
  mapName: 'Conet',
  firstMapName: 'Some Mechanism',
  hint: 'A room filled with a large device.',
  firstHint:
      'Something is making quiet chafing sounds. Reminds me of millstones.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over.\n\n',
      isRaw: true,
    );
    c.markHappened(evConetDestroyed);
  },
);
final Approach maintenanceShaftFromElevator28 = Approach(
  'elevator_28',
  'maintenance_shaft',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class KarlListenToGuards extends RoamingAction {
  @override
  final String name = 'karl_listen_to_guards';

  static final KarlListenToGuards singleton = KarlListenToGuards();

  @override
  List<String> get commandPathTemplate => [
        'Guards',
        'Listen',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('maintenance_shaft') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKarlKilled) && !c.hasHappened(evKarlGuardsKilled))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The two are laughing.\n\n"He ate him whole, didn\'t he?" the orc captain says. "I\'ve never seen Karl do that before."\n\n"We should feed him something even bigger next time," the berserker smirks. "A horse, maybe."\n\n"Get a horse carcass up here and we\'ll do it. The sucker is sleeping like a baby, and I think it\'s because of the size of the food."\n\nThe berserker nods. "Even better, it looks like we don\'t need to worry about chopping the carcasses from now on."\n\n"Yah. A whole hawkman in one swallow." The captain shakes his head. "Karl is full of surprises, isn\'t he?"\n\nIf I understand correctly, there\'s a corpse of a hawkman lying in some nearby creature\'s belly. That creature must be gigantic, whatever it is.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs KarlListenToGuards';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform KarlListenToGuards';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room maintenanceShaft = Room(
  'maintenance_shaft',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_2092aa1ea = !c.hasHappened(evKarlGuardsKilled)
        ? '''two orcs below, guarding some kind of a large gate. A berserker and a captain.'''
        : '''a room below, with a large gate.''';
    final ifBlock_17f129234 = !c.hasHappened(evKarlKilled)
        ? '''Guttural breathing sounds come from beyond the gate. And something else. I sense a fresh corpse that way, too. Something strange.'''
        : '''''';
    s.add(
      'Musty, dark place. Through cracks, I can see rooms under me.\n\nGoing to the end of the shaft, I can see ${ifBlock_2092aa1ea}\n\n${ifBlock_17f129234}\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 34,
  positionY: 40,
  mapName: 'Maintenance Shaft',
  hint: 'A narrow crawl space above the 28th floor.',
);

class KarlUseNecromancy extends RoamingAction {
  @override
  final String name = 'karl_use_necromancy';

  static final KarlUseNecromancy singleton = KarlUseNecromancy();

  @override
  List<String> get commandPathTemplate => [
        'Skills',
        'Necromancy',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('maintenance_shaft') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKarlKilled) &&
        !w.actionHasBeenPerformedSuccessfully('karl_use_necromancy') &&
        !c.hasHappened(evKarlGuardsKilled))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I perform necromancy. I feel I have awakened something human-sized but not entirely human. Then, a terrible roar and thrashing comes from beyond the gate.\n\n',
      isRaw: true,
    );
    c.outputStoryline.addCustomElement(StatUpdate.sanity(c.actor.sanity, -1));
    c.outputWorld.updateActorById(c.actor.id, (b) => b.sanity = b.sanity! - 1);

    s.add(
      '\n"What\'s going on?" the berserker asks, picking up his battle axe. "What\'s going on with Karl?"\n\nThe two approach the large gate and open it to peek inside. Almost instantly, a giant hand pushes the door open so hard that it launches the berserker across the room. Hitting the wall snaps the beserker’s neck, and he does not move anymore.\n\nFrom my perspective above the room, it is hard to see the creature beyond the gate. But it is clearly a giant, and it is clearly out of its mind with pain. The guttural roar is deafening, and blood is filling the floor beneath its feet.\n\nThe orc captain starts backing up from the gate but the giant creature lunges forward and smashes the orc with the back of its hand. There isn\'t even time for a scream. The captain is dead instantly.\n\nThe creature does not stop. It takes a few steps forward, holding its belly with one hand. Then it trips, twists, and falls on its back. I can see the stomach, running with blood. Something is puncturing it from inside.\n\nI realize it is the undead I just raised. A bird-headed creature, a hawkman, is cutting its way out of the giant\'s belly with its beak. The undead\'s movements are mechanical, imprecise, but the beak is sharp enough. The giant is losing blood quickly.\n\nWhen the hawkman\'s head is finally out, the guttural roar gets louder. Using the last of its strength, the giant puts its hand on the hawkman, then yanks. The bird head rolls on the floor, dead again.\n\nSoon after, the giant stops moving.\n\nI wish I could raise this new corpse, but it is well beyond my capability.\n\n',
      isRaw: true,
    );
    c.markHappened(evKarlGuardsKilled);
    w.updateActorById(orcBerserkerId, (b) => b.hitpoints = 0);
    w.recordCustom(CustomEvent.actorDeath,
        actor: w.getActorById(orcBerserkerId));
    w.updateActorById(orcCaptainId, (b) => b.hitpoints = 0);
    w.recordCustom(CustomEvent.actorDeath, actor: w.getActorById(orcCaptainId));

    c.markHappened(evKarlKilled);
    c.markHappened(evKarlKilledViaNecromancy);

    return '${a.name} successfully performs KarlUseNecromancy';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_6c782c6c =
        a.sanity < 1 ? '''My sanity is already gone.''' : '''''';
    final ifBlock_4fd98517e = isFollowedByUndeadActor(c, a) ||
            isFollowedByUndeadInsect(c)
        ? '''My powers are not strong enough to hold two unliving minds, and I already have an undead follower.'''
        : '''''';
    s.add(
      'I try to perform the necromantic incantation but I fail. ${ifBlock_6c782c6c}${ifBlock_4fd98517e} Nothing happens.\n\nIt is a shame. I feel an interesting, freshly dead body somewhere nearby.\n',
      isRaw: true,
    );
    return '${a.name} fails to perform KarlUseNecromancy';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    final c = ApplicabilityContext(a, sim, w);
    if (a.sanity < 1 ||
        isFollowedByUndeadActor(c, a) ||
        isFollowedByUndeadInsect(c)) {
      return ReasonedSuccessChance.sureFailure;
    }
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage =>
      'Raising the dead will make them fight for me. I do not know in advance which corpse will rise. I cannot do this if I am already followed by an undead. My powers are not strong enough to hold two unliving minds.';

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Approach smithyFromConet = Approach(
  'conet',
  'smithy',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach smithyFromJunction = Approach(
  'junction',
  'smithy',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class SaveSarn extends RoamingAction {
  @override
  final String name = 'save_sarn';

  static final SaveSarn singleton = SaveSarn();

  @override
  List<String> get commandPathTemplate => [
        'Jailer',
        'Attack',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('smithy') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I drop down next to Sarn. He looks surprised, but there is no recognition in his eyes.\n\nThe orc jailer takes an iron mace and advances toward me.\n\n"Step back, weaponsmith," he says to Sarn. "Let me deal with this worm."\n\nThe orc pushes Sarn roughly to the side, and Sarn falls headfirst into a wall, then slumps to the floor.\n\n',
      isRaw: true,
    );
    c.startOptionalFight();

    return '${a.name} successfully performs SaveSarn';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SaveSarn';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => true;
}

final Room smithy = Room(
  'smithy',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    s.add(
      'There\'s an iron door here that is shut and locked but ${weSubstitution} find a way through a high ventilation shaft. The crawlspace is tight and full of rat droppings, but at least it allows an unseen approach.\n\nFinally, I am able to peek through a large hole in the shaft, and I look down on the room below.\n\nMy brother, Sarn, is forging a battle axe, using some piece of ancient metal equipment as a handle.\n\n',
      isRaw: true,
    );
    c.learn(SarnFacts.seenPersonally);

    s.add(
      '\n![Illustration of Sarn, my brother, working with an anvil. An orc jailer is in the background.](sarn.png)\n\nHe is being guarded by an orc jailer.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateJailerFight,
  null,
  fightIsOptional: true,
  positionX: 24,
  positionY: 40,
  mapName: 'Smithy',
  firstMapName: 'Sounds of an Anvil',
  hint: 'The involuntary workplace of my brother Sarn under the orc rule.',
  firstHint: 'A regular metallic beat and a smell of coal dust and hot steel.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.markHappened(evSavedSarn);
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "sarn_rescue_ink_ink",
    ));
  },
);
final Room smithyAfterSarnSaved = Room(
  'smithy_after_sarn_saved',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The smithy is empty and silent.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateJailerFight,
  null,
  parent: 'smithy',
  prerequisite: Prerequisite(
    476050921,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evSavedSarn);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The smithy is empty and silent now.\n',
      isRaw: true,
    );
  },
  fightIsOptional: true,
  positionX: 24,
  positionY: 40,
  mapName: 'Smithy',
  firstMapName: 'Sounds of an Anvil',
  hint: 'The involuntary workplace of my brother Sarn under the orc rule.',
  firstHint: 'A regular metallic beat and a smell of coal dust and hot steel.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.markHappened(evSavedSarn);
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "sarn_rescue_ink_ink",
    ));
  },
);
final sarnRescueInkInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. I wheel around and turn to my brother, who is slowly coming to life after the rough fall. He looks at the dead jailer, then at me. Does he even recognize me?\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “I came for you.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“For me,” Sarn says.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “It’s me, Aren.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Aren,” he says.\n',
            isRaw: true,
          );
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
      'I wait, but there’s nothing more for a long time. Anger expands in my chest with each heartbeat.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_20579df5 = c.playerIsMale ? '''boy''' : '''girl''';
    final ifBlock_2a347a8ff = c.playerIsMale ? '''son''' : '''daughter''';
    Ruleset(
      Rule(
        734185790,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened("goal_deserves_punishment");
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I vowed to punish Sarn for his selfishness. For leaving a broken ${ifBlock_20579df5} and a broken father instead of helping them make ends meet and find their footing again.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        861376907,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened("goal_must_know");
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I vowed to — I _needed_ to — tell him what his act of selfishness meant. What life looked like for a father and young ${ifBlock_2a347a8ff} in Falling Rock after his departure. I wanted to tell him so badly.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        240666744,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened("goal_revenge");
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I was looking forward to revenge. A beating, at least, but I admit I fantasized about blood as well. The pure selfishness with which Sarn left a broken ${ifBlock_20579df5} and a broken father instead of helping them make ends meet and find their footing again — there\'s only one answer to that. Violence.\n\nI would have given anything to have Sarn this close, to be able to shower him with blow after blow.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        204204291,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I was looking forward to revenge. A beating, at least, but I admit I fantasized about blood as well. The pure selfishness with which Sarn left a broken ${ifBlock_20579df5} and a broken father instead of working with them to get the family back on track — there\'s only one answer to that. Violence.\n\nI would have given anything to have Sarn this close, to be able to shower him with blow after blow.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'But how can I do that now?\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_56c7cddbe = c.playerIsMale ? '''brother''' : '''sister''';
    s.add(
      'Straining, Sarn looks into my eyes. "Thank you, ${ifBlock_56c7cddbe}."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I almost break down and say “You’re welcome,” but then I remember my father’s face the morning we realized that Sarn was gone.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Thank you? You'll have to do better than that!" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Well, what do you expect?\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What wouldn't I do for my beloved brother?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_20579df5 = c.playerIsMale ? '''boy''' : '''girl''';
          s.add(
            'Sarn searches my face, looking for evidence of snark. "I didn\'t ask for your help, ${ifBlock_20579df5}. I thanked you. Did you expect a speech?\n',
            isRaw: true,
          );
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
      'Should I shower you with gifts? I don\'t know if you noticed, but I don\'t have much to give here."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "How about an apology?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He purses his lips and doesn\'t reply.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" "Don't you remember the last time we saw each other?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He sighs and bows his head. "Of course I do."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I don\'t think he does. I don\'t think he realizes what happened next.\n',
            isRaw: true,
          );
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
      'I tell him about the freezing, sleepless nights up in Falling Rock. How I was hoping that he would show up after all. How I was sure it was all a big misunderstanding.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_24ee97316 = c.playerHasAsthma ? '''asthmatic''' : '''''';
    final ifBlock_4377667ba = c.playerHasWoodenFoot ? '''crippled''' : '''''';
    final ifBlock_487866e34 =
        c.playerHasBurntFace ? ''', still recovering from the burn''' : '''''';
    s.add(
      'Because: how could anyone leave their family, I thought, at such a time? How could anyone abandon their father when he was so obviously broken? How could they desert their ${ifBlock_24ee97316}${ifBlock_4377667ba} sibling${ifBlock_487866e34}, too young and frail to make ends meet?\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Stop it," Sarn says. "What I did wasn\'t fair to you or dad, I admit. But I was as broken by mom\'s death as he was, only in a different way. Dad was spending nights at her grave, repeating old conversations. I spent my nights planning. Preparing."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'He meets my eyes and points a finger at his head. "Dad was escaping by going into the past. I was escaping into the future." I notice his finger is shaking. Is it anger? Adrenaline? Pain?\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"It wasn\'t fair to the family," he says. Both his hands are shaking uncontrollably now. "But I was following my passion. Didn\'t our mother teach us about following our passion?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "She didn't mention abandoning the family." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"I knew you wouldn\'t understand," he says.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What's wrong with your hands?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_56c7cddbe =
              c.playerIsMale ? '''brother''' : '''sister''';
          s.add(
            '"Nothing\'s wrong with my hands, ${ifBlock_56c7cddbe}," he says.\n',
            isRaw: true,
          );
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
      'He is clearly in pain now. I see it on his face. This isn\'t anger, it\'s something else. Sarn goes to his knees, gripping his head.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"I hate you," he whispers, shaking. "You come all this way only to remind me of my failure."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I hate you, too, brother." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'There is defeat in Sarn\'s face. He kneels and shakes, eyes closed.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Let's say I also followed my passion." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'It’s true. I had been planning for this journey from the day Sarn left until the day I was old enough to follow.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Enough!" Sarn roars. His whole body trembles and he closes his eyes.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "We should stop this, you're not well." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'There\'s a subtle nod as Sarn closes his eyes and tries to control his trembling.\n',
            isRaw: true,
          );
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
      'I watch him for a few moments, then help him to his knees. We should get out of here.\n',
      isRaw: true,
    );
  }),
]);
final takeSarnToBleedsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I usher Sarn out of the smithy and through the places I know, downwards. Sarn is obedient but slow to react. I can’t risk combat with him in tow.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'If anyone is to kill my brother, it is going to be me.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'As we make our way through the orcs\' territory, I keep a close watch on Sarn\'s face and hands. He is still trembling. His agony is only getting stronger, it seems, though he tries to conceal it. In a dark corner, I check his body for wounds, but find nothing.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A silent hour later, we arrive at the Bleeds.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.movePlayer('bleeds_main');
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
      Rule(
        391059271,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.knows(JisadFacts.name);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I look for a place to rest, and see Jisad’s porch. The blind man is sitting on his stool, listening to the sounds of the village.\n\n“Of course!” Jisad says after I ask for help. “Brother, you say? Bring out two chairs from my kitchen. You can sit beside me.”\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        984983665,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I look for a place to rest. The only dwelling that could be even remotely described as inviting is a little house with a porch and a man sitting outside.\n\nI approach him and realize that the man is blind.\n\n“I’m Jisad,” the man tells me. “Welcome to San Francisco.”\n\n',
            isRaw: true,
          );
          c.learn(JisadFacts.name);

          s.add(
            '\nI ask if I can rest with my brother on his porch.\n\n“Of course!” Jisad says. “Brother, you say? Bring out two chairs from my kitchen. You can sit beside me.”\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'In a moment, Sarn, Jisad and I are sitting on the porch, facing the center of the Bleeds. Briny wind ruffles our hair and chills our hands.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “Are you okay now, Sarn?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Yes,” he says. But it’s a mechanical answer. He’s getting worse.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “Snap out of it, brother.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'No response, of course.\n',
            isRaw: true,
          );
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
      'I realize that the scumbag is dying. Something in my brother is dying, and that makes me feel more pointless than ever before.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '“The fight is not over,” Jisad says.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I turn around in surprise.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “What do you mean?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“There are things larger than ourselves,” he says, straightening on the seat. “Larger than life. We can take what we want for ourselves, we can solve our own little problems.”\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Jisad touches just below his missing eyes.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“But that doesn’t mean the fight is over. The fight is not over.”\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “What fight?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“You came here to accomplish something,” he says. “Everyone does. And you succeeded.”\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He turns to me, as if trying to make eye contact.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Congratulations.”\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" “I achieved nothing.” """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '“Your brother,” Jisad says, and stops there. There’s a pause.\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" “Thank you.” """.trim(),
            consequence: [],
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
    s.add(
      '"The real fight is larger," Jisad continues. "It carries on even after we die. If you take up _that_ fight, you become immortal."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.markHappened(evTookSarnToBleeds);
  }),
]);

class SarnRescueInk extends RoamingAction {
  @override
  final String name = 'sarn_rescue_ink';

  static final SarnRescueInk singleton = SarnRescueInk();

  @override
  List<String> get commandPathTemplate => ['N/A'];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('start_bogus_location') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "sarn_rescue_ink_ink",
    ));
    return '${a.name} successfully performs SarnRescueInk';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnRescueInk';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TakeSarnToBleeds extends RoamingAction {
  @override
  final String name = 'take_sarn_to_bleeds';

  static final TakeSarnToBleeds singleton = TakeSarnToBleeds();

  @override
  List<String> get commandPathTemplate => ['Take Sarn to safety'];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('smithy') != true) {
      return false;
    }
    if (!(!c.getRoomRoaming().monstersAlive)) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "take_sarn_to_bleeds_ink",
    ));
    return '${a.name} successfully performs TakeSarnToBleeds';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TakeSarnToBleeds';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Approach elevator28FromElevator12 = Approach(
  'elevator_12',
  'elevator_28',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} climb up using an ancient rusty ladder.\n',
      isRaw: true,
    );
  },
);
final Approach elevator28FromGodsLair = Approach(
  'gods_lair',
  'elevator_28',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach elevator28FromJunction = Approach(
  'junction',
  'elevator_28',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach elevator28FromMaintenanceShaft = Approach(
  'maintenance_shaft',
  'elevator_28',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room elevator28 = Room(
  'elevator_28',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_753ddd0b = !c.hasHappened(evKarlGuardsKilled)
        ? '''Brutal laughter from the east.'''
        : '''''';
    s.add(
      'Orc noises from all around, but thankfully no orc in sight. ${ifBlock_753ddd0b}\n\n',
      isRaw: true,
    );
    c.learn(OrcsFacts.inPyramid);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 32,
  positionY: 42,
  mapName: 'Elevator Shaft Entrance on 28th Floor',
  hint:
      'The metal doors on the side of the dark vertical shaft are half-open here, letting some light in.',
);
final Approach godsLairFromElevator28 = Approach(
  'elevator_28',
  'gods_lair',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class KarlExamineStar extends RoamingAction {
  @override
  final String name = 'karl_examine_star';

  static final KarlExamineStar singleton = KarlExamineStar();

  @override
  List<String> get commandPathTemplate => [
        'Star decoration',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('gods_lair') != true) {
      return false;
    }
    if (!(c.isInIdleRoom)) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The star is small enough to fit into my palm. In the center of the star, there is an inscription in ancient, mangled type. It says "Lair of God" in bold lettering.\n\n![Illustration of a writing of the words "LAIR OF GOD", although it\'s clear that the inscription originally said "LAMB OF GOD."](artifact-star.png)\n\n',
      isRaw: true,
    );
    c.learn(ArtifactStarFacts.artifactStarSeen);

    s.add(
      '\nThis artifact must be ancient, and of great value to those who revere the old gods.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs KarlExamineStar';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform KarlExamineStar';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class KarlTakeStar extends RoamingAction {
  @override
  final String name = 'karl_take_star';

  static final KarlTakeStar singleton = KarlTakeStar();

  @override
  List<String> get commandPathTemplate => [
        'Artifact Star',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('gods_lair') != true) {
      return false;
    }
    if (!(c.isInIdleRoom && w.actionHasBeenPerformed("karl_examine_star"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the star.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(lairOfGodStar);

    return '${a.name} successfully performs KarlTakeStar';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform KarlTakeStar';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      'Two orcs, a berserker and a captain, watch me approach in amazement.\n\n"You!" the berserker bellows, readying his battle axe. "Stand still so I can chop off your head."\n\nThe captain readies a large, bone-decorated knife, and confidently starts toward me.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateGodsLairFight,
  null,
  isIdle: true,
  positionX: 35,
  positionY: 42,
  mapName: 'God\'s Lair',
  firstMapName: 'Guard Room',
  hint:
      'A temple to the ancients, overtaken by the orcs some time ago. For the orcs, the space serves as a pen for a huge creature, Karl.',
  firstHint:
      'An antechamber to a much bigger room, with a guard post and a huge, reinforced gate. At least two orcs are on guard.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. A grumbling from behind the gate. On the gate, a little star decoration.\n\n',
      isRaw: true,
    );
    c.markHappened(evKarlGuardsKilled);
  },
);
final Room godsLairAfterNecromancy = Room(
  'gods_lair_after_necromancy',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The room is dominated by the giant\'s carcass and its open belly. The hawkman\'s head is lying nearby, still within the puddle of the giant\'s blood, and the bodies of the two orcs sprawl on opposing sides of the room.\n\nThe gate is open. On it, there is a small star decoration.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'gods_lair',
  prerequisite: Prerequisite(
    727361369,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evKarlKilledViaNecromancy);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The room is dominated by the giant\'s carcass and its open belly. The hawkman\'s head is lying nearby, still within the puddle of the giant\'s blood, and the bodies of the two orcs sprawl on opposing sides of the room.\n\nThe gate is open. On it, there is a small star decoration.\n\n',
      isRaw: true,
    );
    assert(false,
        "This should not happen: necromancy on the taheen cannot be performed after already visiting gods_lair.");
  },
  isIdle: true,
  positionX: 35,
  positionY: 42,
  mapName: 'God\'s Lair',
  firstMapName: 'Guard Room',
  hint:
      'A temple to the ancients, overtaken by the orcs some time ago. For the orcs, the space serves as a pen for a huge creature, Karl.',
  firstHint:
      'An antechamber to a much bigger room, with a guard post and a huge, reinforced gate. At least two orcs are on guard.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over. A grumbling from behind the gate. On the gate, a little star decoration.\n\n',
      isRaw: true,
    );
    c.markHappened(evKarlGuardsKilled);
  },
);
final Approach junctionFromBarracks = Approach(
  'barracks',
  'junction',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach junctionFromCockroachFarm = Approach(
  'cockroach_farm',
  'junction',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach junctionFromElevator28 = Approach(
  'elevator_28',
  'junction',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach junctionFromReservoir = Approach(
  'reservoir',
  'junction',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach junctionFromSmithy = Approach(
  'smithy',
  'junction',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return !c.hasHappened(evSavedSarn) || c.hasHappened(evTookSarnToBleeds);
  },
);
final Room junction = Room(
  'junction',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'This place is a traffic hub. Squads of orcs travel in every conceivable direction. Some are climbing rickety ladders upwards or downwards, others walk loudly across unkempt rooms. There are many paths through here, and many hiding spots.\n\n',
      isRaw: true,
    );
    Ruleset(
      Rule(
        516025655,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.playerHasWoodenFoot;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' As ${weSubstitution} scuttle from one dark corner to the next, my wooden foot gets stuck in a large crack in the concrete floor. My heart sinks. I am halfway between shadows, and I hear orc voices approaching.\n\n I jerk the leg but that only makes the wood drive deeper into the crack. Someone\'s shadow hits a nearby wall and I know I have only a few heartbeats left.\n\n I push off with my good foot, in the opposite direction than where I was headed. It works, and my wooden stump gets loose. As I retreat into the shadow, a group of four orcs swiftly crosses the corridor.\n\n One of them almost trips on that same crack in the floor.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        221528414,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' ${weSubstitutionCapitalized} have no trouble staying unseen.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 27,
  positionY: 45,
  mapName: 'Traffic Hub on 26th Floor',
  firstMapName: 'Increased Foot Traffic',
  hint: 'An area of increased foot traffic in the heart of the orcs’ outpost.',
  firstHint:
      'In this direction, footsteps and orc voices are more frequent. But the area is also dark and full of debris. It won’t be hard to hide.',
);
final Approach reservoirFromJunction = Approach(
  'junction',
  'reservoir',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach reservoirFromTrainingGrounds = Approach(
  'training_grounds',
  'reservoir',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final reservoirFollowFootprintsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} use the same ledge as the creature and follow the muddy footprints. After leaving the reservoir area, the footprints beeline to a tight crawl space out of sight. The creature must be as unwelcome among the orcs as any human.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The footprints continue downward. There is no wandering — the creature must know these parts well.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'After a long while, the creature\'s trail leads me all the way to the enormous hole in the Pyramid and the foliage that fills the space.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.movePlayer('jungle_entrance');
  }),
]);
final reservoirWaterExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I am almost certain there is something moving just below the surface of the water. Something bigger than a fish. But the water is filthy and the room is dark.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" Investigate """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I crouch close to the water, keeping my head low in order to read the surface better. For a long while, nothing happens. In fact, the room seems to get quieter.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Then, all of a sudden, something human-sized appears only a few feet away, still under the surface, making a large wave moving directly at me. The thing is unnaturally fast in the water.\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" Jump away """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'I leap backwards and the thing in the water immediately changes direction and subsides, until there is no more wave. The reservoir becomes still again.\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" Keep watching """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'The wave comes at me swiftly. Then, a slick reptilian head emerges surprisingly close to where I crouch, and something long and sharp pierces my {chest|neck}.\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'It\'s a clean thrust, and I know then and there I have only a few heartbeats left in me. With sudden clarity, I see the creature leap out of the water, and pull its spear out easily from my body.\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '![Illustration of a lizardman with a spear.](lizardman.png)\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                w.updateActorById(playerId, (b) => b.hitpoints = 0);
                w.recordCustom(CustomEvent.actorDeath, actor: c.player);
              }),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" Leave it be """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The sensible thing to do with an unknown, large creature in its element.\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);

class ReservoirDamExamine extends RoamingAction {
  @override
  final String name = 'reservoir_dam_examine';

  static final ReservoirDamExamine singleton = ReservoirDamExamine();

  @override
  List<String> get commandPathTemplate => [
        'Dam',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('reservoir') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The low waves of the reservoir go up and down the face of the dam, producing an occasional splash where the dam meets with the solid, reinforced walls. The doors of the dam are almost all rust now, though they were probably white in the ancient times. At least that\'s what I gather from the small islands of white on the otherwise dark red surface.\n\nThe dam is topped with a little bridge. There\'s an iron wheel here which is connected to the dam beneath with a massive rod.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ReservoirDamExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ReservoirDamExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ReservoirDamWheelLeft extends RoamingAction {
  @override
  final String name = 'reservoir_dam_wheel_left';

  static final ReservoirDamWheelLeft singleton = ReservoirDamWheelLeft();

  @override
  List<String> get commandPathTemplate => [
        'Wheel',
        'Turn',
        'Counter-clockwise',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('reservoir') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("reservoir_dam_examine") &&
        !c.hasHappened(evOpenedDam))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I lean on the wheel and push hard to the left. To my surprise, the wheel does move. Before I know it, the wheel turns easily, and the sound of rushing water fills the room.\n\nIn only a few moments, the reservoir empties. As it does, I think I can see a creature on the opposite side of the room. It jumps from the fast-subsiding water surface onto a ledge and quickly disappears in shadows. It leaves muddy footprints behind.\n',
      isRaw: true,
    );
    c.markHappened(evOpenedDam);
    return '${a.name} successfully performs ReservoirDamWheelLeft';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} lean on the wheel and push as hard as possible to the left, but it does not budge.\n',
      isRaw: true,
    );
    w.pushSituation(
        ReservoirDamWheelLeftRescueSituation.initialized(w.randomInt()));
    return '${a.name} fails to perform ReservoirDamWheelLeft';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return const ReasonedSuccessChance<void>(0.4);
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

abstract class ReservoirDamWheelLeftRescueSituation extends Object
    with
        SituationBaseBehavior
    implements
        Built<ReservoirDamWheelLeftRescueSituation,
            ReservoirDamWheelLeftRescueSituationBuilder> {
  factory ReservoirDamWheelLeftRescueSituation(
      [void Function(ReservoirDamWheelLeftRescueSituationBuilder)
          updates]) = _$ReservoirDamWheelLeftRescueSituation;

  factory ReservoirDamWheelLeftRescueSituation.initialized(int id) {
    return ReservoirDamWheelLeftRescueSituation((b) {
      b.id = id;
      b.turn = 0;
    });
  }

  ReservoirDamWheelLeftRescueSituation._();

  static Serializer<ReservoirDamWheelLeftRescueSituation> get serializer =>
      _$reservoirDamWheelLeftRescueSituationSerializer;

  @override
  List<RoamingAction> get actions {
    return [
      SimpleAction(
        'reservoir_dam_wheel_left_rescue',
        'Try harder',
        (
          ActionContext c,
          self,
        ) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'After laboring over the wheel for some time, I get it to move. At first, it moves by only an inch and stops again. But something gives way then, and suddenly the wheel turns easily. The sound of rushing water fills the room.\n\nIn only a few moments, the reservoir empties. As it does, I think I can see a creature on the opposite side of the room. It jumps from the fast-subsiding water surface onto a ledge and quickly disappears in shadows. It leaves muddy footprints behind.',
            isRaw: true,
          );
          w.popSituation(c);
          w.updateActorById(a.id, (b) => b.stamina = b.stamina! - 1);
          c.markHappened(evOpenedDam);
          return 'ReservoirDamWheelLeftRescueSituation resolved with rescue/continuation (Try harder)';
        },
        'I still have some stamina left in me.',
        isApplicableClosure: (
          ApplicabilityContext c,
          Actor a,
          Simulation sim,
          WorldState w,
          self,
        ) {
          return a.stamina > 0;
        },
      ),
      SimpleAction(
        'reservoir_dam_wheel_left_continuation_of_failure',
        'Give up',
        (
          ActionContext c,
          self,
        ) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I shrug and let off the wheel.',
            isRaw: true,
          );
          w.popSituation(c);
          return 'ReservoirDamWheelLeftRescueSituation resolved with rescue/continuation (Give up)';
        },
        null,
      ),
    ];
  }

  @override
  int get id;
  @override
  int get turn;
  @override
  String get name {
    return 'reservoir_dam_wheel_left';
  }

  @override
  Situation elapseTurn() => rebuild((b) {
        return b..turn = b.turn! + 1;
      });

  @override
  ActorTurn getNextTurn(
    Simulation sim,
    WorldState w,
  ) {
    if (turn != 0) return ActorTurn.never;
    var player = w.actors.singleWhere((a) => a.isPlayer);
    return ActorTurn(
      player,
      w.time,
    );
  }

  @override
  Iterable<Actor> getActors(
    Simulation sim,
    WorldState w,
  ) {
    return [
      w.actors.singleWhere((Actor a) {
        return a.isPlayer;
      })
    ];
  }
}

class ReservoirDamWheelRight extends RoamingAction {
  @override
  final String name = 'reservoir_dam_wheel_right';

  static final ReservoirDamWheelRight singleton = ReservoirDamWheelRight();

  @override
  List<String> get commandPathTemplate => [
        'Wheel',
        'Turn',
        'Clockwise',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('reservoir') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("reservoir_dam_examine") &&
        !c.hasHappened(evOpenedDam) &&
        !w.actionHasBeenPerformedSuccessfully("reservoir_dam_wheel_right"))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I lean on the wheel and push hard to the right. To my surprise, the wheel does move a bit but then immediately stops. A faint thud escapes from below.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ReservoirDamWheelRight';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} lean on the wheel and push as hard as possible to the right, but it does not budge.\n',
      isRaw: true,
    );
    w.pushSituation(
        ReservoirDamWheelRightRescueSituation.initialized(w.randomInt()));
    return '${a.name} fails to perform ReservoirDamWheelRight';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return const ReasonedSuccessChance<void>(0.4);
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

abstract class ReservoirDamWheelRightRescueSituation extends Object
    with
        SituationBaseBehavior
    implements
        Built<ReservoirDamWheelRightRescueSituation,
            ReservoirDamWheelRightRescueSituationBuilder> {
  factory ReservoirDamWheelRightRescueSituation(
      [void Function(ReservoirDamWheelRightRescueSituationBuilder)
          updates]) = _$ReservoirDamWheelRightRescueSituation;

  factory ReservoirDamWheelRightRescueSituation.initialized(int id) {
    return ReservoirDamWheelRightRescueSituation((b) {
      b.id = id;
      b.turn = 0;
    });
  }

  ReservoirDamWheelRightRescueSituation._();

  static Serializer<ReservoirDamWheelRightRescueSituation> get serializer =>
      _$reservoirDamWheelRightRescueSituationSerializer;

  @override
  List<RoamingAction> get actions {
    return [
      SimpleAction(
        'reservoir_dam_wheel_right_rescue',
        'Try harder',
        (
          ActionContext c,
          self,
        ) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'After laboring over the wheel for some time, I get it to move, but only a bit. It moves maybe an inch and then stops. A faint thud escapes from below.',
            isRaw: true,
          );
          w.popSituation(c);
          w.updateActorById(a.id, (b) => b.stamina = b.stamina! - 1);

          return 'ReservoirDamWheelRightRescueSituation resolved with rescue/continuation (Try harder)';
        },
        'I still have some stamina left in me.',
        isApplicableClosure: (
          ApplicabilityContext c,
          Actor a,
          Simulation sim,
          WorldState w,
          self,
        ) {
          return a.stamina > 0;
        },
      ),
      SimpleAction(
        'reservoir_dam_wheel_right_continuation_of_failure',
        'Give up',
        (
          ActionContext c,
          self,
        ) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I shrug and let off the wheel.',
            isRaw: true,
          );
          w.popSituation(c);
          return 'ReservoirDamWheelRightRescueSituation resolved with rescue/continuation (Give up)';
        },
        null,
      ),
    ];
  }

  @override
  int get id;
  @override
  int get turn;
  @override
  String get name {
    return 'reservoir_dam_wheel_right';
  }

  @override
  Situation elapseTurn() => rebuild((b) {
        return b..turn = b.turn! + 1;
      });

  @override
  ActorTurn getNextTurn(
    Simulation sim,
    WorldState w,
  ) {
    if (turn != 0) return ActorTurn.never;
    var player = w.actors.singleWhere((a) => a.isPlayer);
    return ActorTurn(
      player,
      w.time,
    );
  }

  @override
  Iterable<Actor> getActors(
    Simulation sim,
    WorldState w,
  ) {
    return [
      w.actors.singleWhere((Actor a) {
        return a.isPlayer;
      })
    ];
  }
}

class ReservoirFollowFootprints extends RoamingAction {
  @override
  final String name = 'reservoir_follow_footprints';

  static final ReservoirFollowFootprints singleton =
      ReservoirFollowFootprints();

  @override
  List<String> get commandPathTemplate => [
        'Footprints',
        'Follow',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('reservoir') != true) {
      return false;
    }
    if (!(c.hasHappened(evOpenedDam))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "reservoir_follow_footprints_ink",
    ));
    return '${a.name} successfully performs ReservoirFollowFootprints';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ReservoirFollowFootprints';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ReservoirWaterExamine extends RoamingAction {
  @override
  final String name = 'reservoir_water_examine';

  static final ReservoirWaterExamine singleton = ReservoirWaterExamine();

  @override
  List<String> get commandPathTemplate => [
        'Water',
        'Observe',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('reservoir') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOpenedDam))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "reservoir_water_examine_ink",
    ));
    return '${a.name} successfully performs ReservoirWaterExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ReservoirWaterExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room reservoir = Room(
  'reservoir',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A large, filthy pool in the middle of the building, surrounded by a ledge and covered with a layer of green sludge. The reservoir was clearly built by the ancients, with their straight lines and craftsmanship of the highest quality. It would have been intended to distribute water to the upper floors, but I wouldn\'t want to taste what\'s collected there now. There\'s an iron dam here, preventing the water from spilling into the corridors of the Pyramid.\n\nEverything is wet, even the ceiling. Condensed water forms drops that land back on the water surface, making a hollow sound in the large room.\n\nSomething big just moved in the water.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 21,
  positionY: 46,
  mapName: 'Reservoir',
  firstMapName: 'Damp Place',
  hint: 'A large, filthy pool in the middle of the building.',
  firstHint:
      'Corridors around this place smell of stale water. A faint splashing can be heard.',
);
final Room reservoirAfterOpenDam = Room(
  'reservoir_after_open_dam',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A huge empty room, with the floor covered in sludge and slimy carcasses. There are orc and goblin corpses there, too.\n\nMuddy footprints lead away from the reservoir.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'reservoir',
  prerequisite: Prerequisite(
    364228247,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A huge empty room, with the floor covered in sludge and slimy carcasses. There are orc and goblin corpses there, too.\n\nMuddy footprints lead away from the reservoir.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 21,
  positionY: 46,
  mapName: 'Reservoir',
  firstMapName: 'Damp Place',
  hint: 'A large, filthy pool in the middle of the building.',
  firstHint:
      'Corridors around this place smell of stale water. A faint splashing can be heard.',
);
final Approach cockroachFarmFromJunction = Approach(
  'junction',
  'cockroach_farm',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final cockroachCakeTakeInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I approach the disk and realize it\'s made of dead cockroach bodies, pressed together into some kind of a cake.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Cockroaches are nutritious. At least that\'s what my father told me once. But, looking at the tangle of elytra and insect legs, I wonder if I\'d be able to put something like this in my stomach.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I put the cake in my tunic.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.giveNewItemToPlayer(cockroachCake);
  }),
]);

class CockroachCakeTake extends RoamingAction {
  @override
  final String name = 'cockroach_cake_take';

  static final CockroachCakeTake singleton = CockroachCakeTake();

  @override
  List<String> get commandPathTemplate => [
        'A disk on the ground',
        'Pick up',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('ockroach_farm') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOpenedDam))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "cockroach_cake_take_ink",
    ));
    return '${a.name} successfully performs CockroachCakeTake';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CockroachCakeTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage =>
      'There\'s a hand-sized disk on the ground here. It\'s brown and it gleams a little.';

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room cockroachFarm = Room(
  'cockroach_farm',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I am in a maze of twisty little passages, all alike. All crawling with cockroaches.\n\nThe place smells awful. There is rotten food on the floor for the cockroaches to eat, and there is almost no air movement. This is some sort of a farm.\n\nThe orcs are letting the cockroaches multiply, feeding them with whatever they’ll eat. There are shovels and chests here, prepared for harvest. A harvest of cockroaches.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 30,
  positionY: 48,
  mapName: 'Cockroach Farm',
  firstMapName: 'Smell of Rot',
  hint: 'The main source of food for the orcs.',
  firstHint:
      'The closer I am to this area, the more I can smell rotten food and flesh. No voices, though, and no footsteps.',
);
final Room cockroachFarmAfterOpenDam = Room(
  'cockroach_farm_after_open_dam',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I am in a maze of twisty little passages, all alike. A few wet cockroaches are crawling around, but most of the place is empty.\n\nI quickly realize that this was a sort of a farm. The orcs were letting the cockroaches multiply, feeding them whatever they’d eat. There are shovels and chests here, prepared for harvest. A harvest of cockroaches. But most of the cockroaches have been swept away by water.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'cockroach_farm',
  prerequisite: Prerequisite(
    743707558,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The whole area is wet. There are puddles of water everywhere, and a few cockroaches scurrying between them. The harvest has been swept away.\n',
      isRaw: true,
    );
  },
  positionX: 30,
  positionY: 48,
  mapName: 'Cockroach Farm',
  firstMapName: 'Smell of Rot',
  hint: 'The main source of food for the orcs.',
  firstHint:
      'The closer I am to this area, the more I can smell rotten food and flesh. No voices, though, and no footsteps.',
);
final Approach trainingGroundsFromBattlefield = Approach(
  'battlefield',
  'training_grounds',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach trainingGroundsFromReservoir = Approach(
  'reservoir',
  'training_grounds',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room trainingGrounds = Room(
  'training_grounds',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    s.add(
      'A small army of orcs, goblins and kobolds, all training for war. Three floors are dedicated to weapon sparring and exercise. The rooms and corridors are almost bare except for wooden poles, crude targets, and the occasional number 65 written on the wall.\n\n',
      isRaw: true,
    );
    c.learn(SixtyFiversFacts.numberSeen);

    s.add(
      '\nOver a hundred vile creatures grunt and sweat, striving in a singular focus to become better. Better at killing.\n\nThey are so absorbed in the training that ${weSubstitution} have no trouble staying unseen.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 23,
  positionY: 51,
  mapName: 'Training Grounds',
  firstMapName: 'Grunts of Strain',
  hint: 'A small army of orcs, goblins and kobolds, all training for war.',
  firstHint: 'Loud grunts and clashes of steel. Orc laughter.',
);
final Room trainingGroundsAfterDamOpened = Room(
  'training_grounds_after_dam_opened',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    s.add(
      'A small army of orcs, goblins and kobolds, all training for war. Three floors are dedicated to weapon sparring and exercise. Over a hundred vile creatures grunt and sweat, striving in a singular focus to become better. Better at killing.\n\nThey are so absorbed in the training that ${weSubstitution} have no trouble staying unseen.\n\nThe training grounds are dripping wet.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'training_grounds',
  prerequisite: Prerequisite(
    254551937,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The training grounds are dripping wet.\n',
      isRaw: true,
    );
  },
  positionX: 23,
  positionY: 51,
  mapName: 'Training Grounds',
  firstMapName: 'Grunts of Strain',
  hint: 'A small army of orcs, goblins and kobolds, all training for war.',
  firstHint: 'Loud grunts and clashes of steel. Orc laughter.',
);
final Approach battlefieldFromKnightsHqMain = Approach(
  'knights_hq_main',
  'battlefield',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} climb up the stairs from the Knights’ Headquarters to the sixteenth floor.\n',
      isRaw: true,
    );
  },
);
final Approach battlefieldFromTrainingGrounds = Approach(
  'training_grounds',
  'battlefield',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room battlefield = Room(
  'battlefield',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    final ifBlock_422b84975 = c.playerIsMale ? '''him''' : '''her''';
    s.add(
      'It\'s very different from the other floors. There are no walls, and from the staircase opening one can see all the surviving windows. About a third of the floor has collapsed into the jungle below.\n\nThere are rows of concrete pillars and two larger structures housing the staircases and the elevator, but this is the closest the Pyramid has to an open field. There is a strange smell here that I can\'t quite place, not entirely unpleasant.\n\nAs soon as ${weSubstitution} climb the last stair and enter the floor proper, two warriors step out from behind the pillars. One of them is a huge orc with a fittingly large machete, and an ancient shield. The other is a goblin, wielding a bone hatchet.\n\n![Illustration of an orc and a goblin. The orc is wielding a huge machete and a shield with "Speed Limit 65" on it. The goblin is wielding a bone hatchet.](65ers.png)\n\nThe goblin\'s face contorts with hatred as soon as he sees me, but the orc just laughs.\n\n"Big mistake," the orc says with mock sadness. "Big mistake for you. This is no longer a place for human swine."\n\n"Big mistake for ${ifBlock_422b84975}," the goblin agrees. "But good news for us. Darg rewards human scalp."\n\nThe two attack.\n\n',
      isRaw: true,
    );
    c.learn(OrcsFacts.inPyramid);
    c.learn(SixtyFiversFacts.numberSeen);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateBattlefieldFight,
  null,
  positionX: 28,
  positionY: 54,
  mapName: 'Battlefield Floor',
  firstMapName: 'Sixteenth Floor',
  hint: 'The sixteenth floor, devoid of walls.',
  firstHint:
      'The frontier between the humans at the bottom and the orcs at the top. Currently held and guarded by the orcs.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'The fight is over. ${weSubstitutionCapitalized} stand in the middle of this large room and I finally understand what that strange smell is. It is old, dried blood.\n\nThere are no old corpses here, but there must have been many. This was a battlefield. The orcs must have moved the bodies elsewhere, or maybe they just tossed them through the windows. The blood, though, they did not clear. And so death is here, filling the room, like steam fills a room after a hot bath.\n\nA glorious battle this was, I\'m sure. It became an enormous scab.\n\nWhatever the reason for this cleared space had been in the ancient times, I can imagine how the Knights preferred it for battle when they still had the numbers. There is no way to go past it, and the plan is so open you can conceivably use archers, and formations.\n\nSearching through the orc\'s possessions, I find a loaf of stale bread.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(staleBread);
  },
  whereDescription: 'among the columns',
);
final Approach oracleMainFromKnightsHqMain = Approach(
  'knights_hq_main',
  'oracle_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room oracleMain = Room(
  'oracle_main',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A woman is here. She seems deep in thought, walking up and down the room, over debris.\n\n![Illustration of an old woman with a staff.](oracle.png)\n\nA ridiculously red apple sits on the table.\n\n',
      isRaw: true,
    );
    if (w.actionHasBeenPerformed("talk_to_oracle_greetings")) {
      c.describeWorthiness(
          who: oracle,
          what: [
            akxeId,
            compassId,
            dragonEggId,
            lairOfGodStarId,
            northSkullId,
            sixtyFiverShieldId,
            hawkmanJacketId
          ],
          especially: [compassId, northSkullId],
          how: "{approvingly|with respect}");
    }
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    if (w.actionHasBeenPerformed("talk_to_oracle_greetings")) {
      c.describeWorthiness(
          who: oracle,
          what: [
            akxeId,
            compassId,
            dragonEggId,
            lairOfGodStarId,
            northSkullId,
            sixtyFiverShieldId,
            hawkmanJacketId
          ],
          especially: [compassId, northSkullId],
          how: "{approvingly|with respect}");
    }
  },
  null,
  null,
  isIdle: true,
  positionX: 39,
  positionY: 58,
  mapName: 'Oracle\'s Study',
  firstMapName: 'Someone\'s Study',
  hint: 'A place full of books and the smell of coffee.',
  firstHint: 'A room with a good view of the forest and the San Francisco Bay.',
);
final askOracleAboutKeepInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '“Ah, the Keep!” Oracle says. “I worked there as a kid. I sometimes miss those days.”\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Corax raises his head from a bowl of seed. “You told me it was horrible! You told me the nobility treated you like garbage.”\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '“That they did,” she says. “There was a lot of screaming, and quite a few beatings as well. I don’t miss _that._ I do miss being younger, though. And having access to all those books seemed magical at the time.”\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “What was the Keep for?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“It was the seat of power,” Oracle says. “Back in those days, San Francisco wasn’t as lawless as it is today. There were no orcs, no goblins, nothing.”\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Paradise,” the bird says, and his claws make a little sound on the books.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Well,” Oracle says, “not quite. Anyway, the lords have been living in the Keep with their families for generations. By having their home in the Pyramid itself, they were close to the farmers: the ones who sent the most coin to their coffers. And of course, living in the highest tower in the world brings a measure of pride and stature.”\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Corax nods and straightens, showing his black breast.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“But of course, such pride cannot last forever. Now, they’re all dead. Even the one that still keeps watch over the place is dead.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “What’s in the Keep now?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Death,” says Corax.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_6bd25f800 = c.hasHappened(evKilledHope)
              ? '''”News travels fast in the Pyramid,” Oracle smiles. “We know you were able to kill '''
              : '''”The nobility that ruled from the Keep are all dead, that’s true,” Oracle says. “But that doesn’t make the Keep safe. One of the dead is still walking: ''';
          s.add(
            '${ifBlock_6bd25f800}\n',
            isRaw: true,
          );
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
      'Lady Hope.”\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(KeepGateFacts.oracleWorkedInKeep);
    c.learn(LadyHopeFacts.ladyHopeName);
  }),
]);
final oracleGiveNorthSkullInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Oracle sees the device and immediately starts giggling with joy. "Well that is just incredible," she says. "Such an exquisite piece."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She takes the skull gingerly in her hands and starts turning it around, examining it from all sides. "I will need to deactivate it, of course," she says.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'There is a rustle of feathers and Corax lands on Oracle\'s shoulder. He moves his head to point his right eye at the device. "What, you don\'t want to _invite_ the goblins here?"\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Did you know, Corax," she says, "that sarcasm is the lowest form of wit?"\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The bird takes off again and lands on a table. "That is _fascinating,"_ he says.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      'Oracle smiles and nods at me. "Thank you, ${youngSirSubstitution}. You have provided me with a rare opportunity to study the enemy."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.removeItemFromPlayer(northSkullId);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What enemy?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'She points above. "Big O. I am doubtful the goblins or the orcs are clever enough to build a device like this. This is not ancient technology, but it is certainly _some_ technology. Or magic. Or both."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "How will you study it?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"How do you study anything?" she responds. "You take it apart."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Is it that rare?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"I have certainly never seen anything like this. The device seems to weld _some_ kind of technology with _some_ kind of magic. Combining two fields like that: such things are always powerful."\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);
final talkToOracleDeathlessInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"A cult," Corax says and does a little jump with his raven feet for emphasis.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Well," Oracle says, "they _are_ a cult. They worship the ancients, and all artifacts from them. They\'ve been here in the Pyramid for longer than the farmers, or the Knights, or the orcs."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(OrcsFacts.inPyramid);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Where are they?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"They used to inhabit a lot more of the Pyramid," she says. "These days, they live in a village in the part known as the jungle. It\'s the big hole in the building on the west side, overgrown with vegetation."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(DeathlessFacts.location);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Are they dangerous?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"They are not," she says. "I think they want to live forever but... who doesn\'t?"\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);
final talkToOracleDogheadInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"There\'s an old ditty," Oracle says. "A head of a dog, a body of man, a better age for all began."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She glances out the window, at the gray and the green. "The Pyramid was never an easy place," she says. "Never very inviting. Even before the orcs came, death and violence was common. The Knights have been stationed here for generations, but even a force such as that cannot fully prevent peril in a place like San Francisco."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      'Oracle extends her arm, as if to touch the forest below us. "The woods have been always crawling with vile creatures. The power of the Pyramid has always attracted the corrupt and the wicked. I think the villagers and the farmers clung to this tale. It gave them hope."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She turns to me. "Now, with the orcs and Big O and goblins, the demand for such a tale is only getting stronger. That little rhyme about _a_ _head_ _of_ _a_ _dog,_ _a_ _body_ _of_ _man,_ it\'s on everyone\'s mind."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"What can I tell you about the Dragon Egg? Ha! A small, powerful thing. An end to any dispute. Shame it\'s in the wrong hands."\n',
      isRaw: true,
    );
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
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(DeathlessFacts.somethingCalledDeathless);
          c.learn(DragonEggFacts.deathlessHaveIt);
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Why are Deathless the ‘wrong hands’ for it?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"They won\'t use it," Oracle says. "It\'s a relic for them."\n',
            isRaw: true,
          );
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
          final youngSirSubstitution = c.playerSalutation;
          s.add(
            '"Ha! You can\'t, ${youngSirSubstitution}. The Deathless have been using it as a holy symbol for generations. They won\'t just give it away to a random stranger."\n',
            isRaw: true,
          );
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
      isRaw: true,
    );
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
            isRaw: true,
          );
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
                final youngSirSubstitution = c.playerSalutation;
                s.add(
                  '"Did you, now." Oracle looks at me with piercing eyes. "I guess you did, ${youngSirSubstitution}." She smiles.\n',
                  isRaw: true,
                );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '“Ah, greetings to you, too, ${youngSirSubstitution}. I am Oracle.” She takes me by the shoulder and looks me in the eye. “You are new here, you must be excited to learn about this place!”\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “Not really.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'She keeps looking into my eyes for an uncomfortably long while. She smells of coffee. “Okay,” she says, still smiling.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Something moves behind me. “Okay!” I wheel around and see a big dark bird perched on top of some books. “Okay!” it says again.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “Yes.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“You came to the right person, then.” She steps back, leaving a faint scent of coffee behind. “Welcome.”\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Something moves behind me. “Welcome!” I wheel around and see a big dark bird perched on top of some books. “Welcome!” it says again.\n',
            isRaw: true,
          );
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
      '“That’s Corax, my companion here.” Oracle nods toward the bird and the bird nods toward me.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" “It can talk?” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“Well,” Oracle says, “all ravens can talk if you teach them. It’s a trait they’ve had since the time of the ancients. But Corax doesn’t just repeat what he hears.”\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '“No I don’t,” Corax says.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Oracle smiles nervously.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" “Well met, Corax.” """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final youngSirSubstitution = c.playerSalutation;
          s.add(
            '“Well met indeed, ${youngSirSubstitution},” Corax says with a nod.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"I think he likes you," Oracle tells me with a surprised smile.\n',
            isRaw: true,
          );
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
      '“Well, you must be bored by all this introductory talk. You’re in San Francisco! Young people don’t come to San Francisco to talk. They come here to slay.”\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"They have completely taken over the upside," she says. "After the sixteenth floor, it\'s all orc territory."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Corax croaks. Oracle passes me to lean on a table, and I catch a whiff of the smell of coffee.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Is that coffee?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'She smiles. "Yes, yes it is. A rare luxury from the south. Something the ancients drank in large cups. Guzzled, even. Gulped."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Murdered," Corax says helpfully.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Anyway," she says, "it helps me think. Let\'s see. The orcs?\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Please continue." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Oh, I was finished," she says. "Well.\n',
            isRaw: true,
          );
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
      'There are still things I\'d like to see again, up there. The Lair of God is one. It was a beautiful temple, two floors high, with spectacular views of the Bay. Built by the Deathless. It had an artifact in it, an ancient star."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She sighs. "But it was taken over by the orcs, like everything else. And they have some creature there, in the shrine. Something big. I don\'t think the Lair of God looks anything like I remember these days."\n',
      isRaw: true,
    );
  }),
]);
final talkToOracleQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Ah yes, these happen quite often."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"These are artifacts left by the ancients that puzzle the good and delight the evil. Why would the ancients, in their wisdom, leave behind such beautiful renditions of an evil number?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What makes 65 evil?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"You know the Two Forces, Four Directions, Eight Gods, and so on? All the good things, all the true things, come in perfect numbers. Sixty-four is one of them. Sixty-four Callings."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Oracle runs her fingers through her hair. "Sixty-five is a spit in the face of truth. It\'s like taking a symbol of Tengri, but putting it upside down. We don\'t know why the ancients chose 65 as a number to be printed and shown, to be _obeyed._ They must have had their reason."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Of _course,"_ Corax says.\n',
            isRaw: true,
          );
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
      '"I think the orcs love it," Oracle says. "It gives them a way to say: Look! The ancients had evil in them. The culture you so revere is a failed, evil empire. Something like that."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"What can you tell me about the Keep?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "ask_oracle_about_keep_ink",
    ));
    return '${a.name} successfully performs AskOracleAboutKeep';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AskOracleAboutKeep';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class AskOracleAboutKeepGate extends RoamingAction {
  @override
  final String name = 'ask_oracle_about_keep_gate';

  static final AskOracleAboutKeepGate singleton = AskOracleAboutKeepGate();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"Can you help me open the Keep?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      'Oracle describes a convoluted series of steps to open the gate, which she calls an "algorithm." It involves pushing seemingly decorative parts of the gate in a precise order.\n\n"At the very end, make sure you turn the crest _eight_ times," she says. "Not seven, not nine. _Eight._ Like the Eight Gods. Don\'t forget, ${youngSirSubstitution}."\n\n\n',
      isRaw: true,
    );
    c.learn(KeepGateFacts.keepGateUnlock);

    return '${a.name} successfully performs AskOracleAboutKeepGate';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AskOracleAboutKeepGate';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class OracleGiveNorthSkull extends RoamingAction {
  @override
  final String name = 'oracle_give_north_skull';

  static final OracleGiveNorthSkull singleton = OracleGiveNorthSkull();

  @override
  List<String> get commandPathTemplate => [
        'Inventory',
        'North Skull',
        'Give to Oracle',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "oracle_give_north_skull_ink",
    ));
    return '${a.name} successfully performs OracleGiveNorthSkull';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OracleGiveNorthSkull';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleDeathless extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_deathless';

  static final TalkToOracleDeathless singleton = TalkToOracleDeathless();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"Who are the Deathless?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleDeathless';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleDoghead extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_doghead';

  static final TalkToOracleDoghead singleton = TalkToOracleDoghead();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"Tell me about Doghead."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleDoghead';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleDragonEgg extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_dragon_egg';

  static final TalkToOracleDragonEgg singleton = TalkToOracleDragonEgg();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"What can you tell me about the Dragon Egg?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleEarthquakes extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_earthquakes';

  static final TalkToOracleEarthquakes singleton = TalkToOracleEarthquakes();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"What can you tell me about the earthquakes here?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleEarthquakes';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_greetings';

  static final TalkToOracleGreetings singleton = TalkToOracleGreetings();

  @override
  List<String> get commandPathTemplate => [
        'Woman',
        'Talk',
        '"Greetings."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleOrcs extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_orcs';

  static final TalkToOracleOrcs singleton = TalkToOracleOrcs();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"Tell me about the orcs."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        c.knows(OrcsFacts.inPyramid) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        !c.playerHasVisited('gods_lair', includeVariants: true))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleOrcs';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleQuake1 extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_quake_1';

  static final TalkToOracleQuake1 singleton = TalkToOracleQuake1();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"Was that an earthquake?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToOracleSixtyFiver extends RoamingAction {
  @override
  final String name = 'talk_to_oracle_sixty_fiver';

  static final TalkToOracleSixtyFiver singleton = TalkToOracleSixtyFiver();

  @override
  List<String> get commandPathTemplate => [
        'Oracle',
        'Talk',
        '"What\'s the significance of ‘65’?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed("talk_to_oracle_greetings") &&
        c.knows(SixtyFiversFacts.numberSeen) &&
        !c.knows(SixtyFiversFacts.significance))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToOracleSixtyFiver';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final oracleAppleExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The apple is one of the Fruits grown on the Slopes of the Pyramid. This one is especially large and extremely red.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_1fb640d51 =
        w.actionHasBeenPerformed("talk_to_oracle_greetings")
            ? '''Oracle'''
            : '''the woman''';
    final ifBlock_77cb64ee3 = c.playerHasWoodenFoot
        ? ''', glancing at the wooden stump I have for a foot'''
        : '''''';
    final ifBlock_4264b4dfa = c.playerHasBurntFace
        ? ''', glancing at the burnt side of my face'''
        : '''''';
    final ifBlock_29b04974c =
        c.playerHasAsthma ? ''' while I have a little coughing fit''' : '''''';
    s.add(
      '"You can have it if you want," ${ifBlock_1fb640d51} says${ifBlock_77cb64ee3}${ifBlock_4264b4dfa}${ifBlock_29b04974c}. "You need it more than I do."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Is it dangerous?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Only if you do something stupid with all the energy it gives you. The Fruits of the Pyramid are indeed miraculous."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Thank you." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"You\'re welcome. I have all the energy I need."\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);

class OracleAppleExamine extends RoamingAction {
  @override
  final String name = 'oracle_apple_examine';

  static final OracleAppleExamine singleton = OracleAppleExamine();

  @override
  List<String> get commandPathTemplate => [
        'Red apple',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "oracle_apple_examine_ink",
    ));
    return '${a.name} successfully performs OracleAppleExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OracleAppleExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class OracleAppleTake extends RoamingAction {
  @override
  final String name = 'oracle_apple_take';

  static final OracleAppleTake singleton = OracleAppleTake();

  @override
  List<String> get commandPathTemplate => [
        'Red apple',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('oracle_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evOrcOffensive) &&
        w.actionHasBeenPerformed('oracle_apple_examine'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'It feels strangely heavy in my palm.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(oracleApple);

    return '${a.name} successfully performs OracleAppleTake';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OracleAppleTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'oracle_main',
  prerequisite: Prerequisite(
    584629209,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The place is ruined. Blood is everywhere. Oracle is dead, and so is the bird.\n\nSmell of coffee still lingers.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 39,
  positionY: 58,
  mapName: 'Oracle\'s Study',
  firstMapName: 'Someone\'s Study',
  hint: 'A place full of books and the smell of coffee.',
  firstHint: 'A room with a good view of the forest and the San Francisco Bay.',
);
final Approach jungleEntranceFromDeathlessVillage = Approach(
  'deathless_village',
  'jungle_entrance',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach jungleEntranceFromPond = Approach(
  'pond',
  'jungle_entrance',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach jungleEntranceFromStagingArea = Approach(
  'staging_area',
  'jungle_entrance',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room jungleEntrance = Room(
  'jungle_entrance',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Corridors full of vegetation. Path through that, like a path in a forest, but indoors.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 20,
  positionY: 68,
  mapName: 'Jungle',
  hint:
      'This is where the interior of the Pyramid opens into a large crater, covered in vegetation.',
);
final Room jungleEntranceMuddyFootprints = Room(
  'jungle_entrance_muddy_footprints',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Corridors full of vegetation. Path through that, like a path in a forest, but indoors. Muddy footprints lead into the jungle, towards a body of water.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'jungle_entrance',
  prerequisite: Prerequisite(
    330398558,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Muddy footprints lead into the jungle, towards a body of water.\n',
      isRaw: true,
    );
  },
  positionX: 20,
  positionY: 68,
  mapName: 'Jungle',
  hint:
      'This is where the interior of the Pyramid opens into a large crater, covered in vegetation.',
);
final Approach deathlessVillageFromDragonEggRoom = Approach(
  'dragon_egg_room',
  'deathless_village',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach deathlessVillageFromJungleEntrance = Approach(
  'jungle_entrance',
  'deathless_village',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class GiveLairOfGodStarToDeathless extends RoamingAction {
  @override
  final String name = 'give_lair_of_god_star_to_deathless';

  static final GiveLairOfGodStarToDeathless singleton =
      GiveLairOfGodStarToDeathless();

  @override
  List<String> get commandPathTemplate => [
        'Inventory',
        'Artifact Star',
        'Give to the Deathless',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    if (!(c.hasItem(lairOfGodStarId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I approach with the Artifact Star in hand. When the villagers realize I am offering the item to them, there is a brief moment of complete silence. Then, everybody moves at once.\n\n',
      isRaw: true,
    );
    Ruleset(
      Rule(
        1025194301,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return w.actionHasBeenPerformed("argo_greet");
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' Argo stands before me.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        648784387,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' In a few heartbeats, a child stands before me. I learn that her name is Argo and that she is the leader of the Deathless.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
    s.add(
      '\n"I kneel before your generosity," she says. And she kneels, and the rest of the villagers immediately follow suit.\n\nArgo smiles at me. "We have been hoping to win back the Artifact Star from the orcs for years. But we are not fighters. None of us have the talents required to stand up to the orcish host."\n\nShe opens her arms and stands up. "You do. And you chose to use your talents for good."\n\nWith ceremonial slowness, she takes the star from my hand. "You are now a friend of the Deathless. As such, you will command respect from each and every one of us." She speaks loudly, clearly. The rest of the villagers still kneel, watching me silently.\n\nArgo then turns around to her people. "The Star will be deposited in the Sacred Shrine, next to the Dragon Egg. And I think our friend deserves full access."\n\nI now have access to the shrine of the Deathless, not far from here.\n\n',
      isRaw: true,
    );
    c.markHappened(evDeathlessRespectGained);
    c.removeItemFromPlayer(lairOfGodStarId);

    return '${a.name} successfully performs GiveLairOfGodStarToDeathless';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform GiveLairOfGodStarToDeathless';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room deathlessVillage = Room(
  'deathless_village',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'On a ledge of the Pyramid overlooking the jungle, a village of cultists. They call themselves the Deathless, and they are said to worship the ancients. Their leader is a child.\n\n',
      isRaw: true,
    );
    c.learn(DeathlessFacts.sawDeathless);

    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  null,
  null,
  positionX: 21,
  positionY: 64,
  mapName: 'Village of the Deathless',
  firstMapName: 'Village in the Jungle',
  hint:
      'A village of cultists positioned on a ledge of the Pyramid overlooking the jungle.',
  firstHint:
      'I can see some buildings through the canopy of leaves. The buildings are placed on a ledge of the Pyramid overlooking the crater.',
);
final Approach dragonEggRoomFromDeathlessVillage = Approach(
  'deathless_village',
  'dragon_egg_room',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.hasHappened(evDeathlessRespectGained);
  },
);
final dragonEggExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I slowly approach the pedestal. The Dragon Egg is clearly of ancient origin: it doesn\'t look like anything I have ever seen. It is also spectacularly well preserved.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "How come the egg is like new?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The Deathless who held the branch earlier shrugs. "We do not know, Friend of the Deathless. This place, the Pyramid, seems to have that effect."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "How did you find this?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The Deathless who held the branch earlier speaks: "It was found near the pond, Friend of the Deathless. Down there in the jungle. A brother lost his life retrieving it."\n',
            isRaw: true,
          );
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
      'Something shuffles behind me and the Deathless bow their heads. I turn around and see that Argo has entered the clearing.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"The Dragon Egg has been the most sacred artifact of our people since we lost access to the Lair of God," she says. "But it is also a weapon."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "How can you know it is a weapon?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Oracle told us," Argo says. "She knows these things. According to her,\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What kind of weapon is it?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"From what we understand,\n',
            isRaw: true,
          );
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
      'it is a thrown weapon. You can only ever use it once, to devastating effect."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Argo slowly circles the pedestal and stops on the other side, facing me. "I think," she says, haltingly, "that it is in the spirit of our mission to offer the Dragon Egg to you."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What do you mean?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"I mean," Argo says with sudden confidence, "that the Dragon Egg can be yours.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Why would you do that?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo smiles with sudden confidence. "It\'s simple.\n',
            isRaw: true,
          );
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
      'You have shown strength and purpose. A holy weapon like the Dragon Egg befits you. It will aid in your fight."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_231c8aa07 = c.playerIsMale ? '''man''' : '''woman''';
    s.add(
      'She turns to the onlooking villagers. "We now have the Artifact Star, a much more peaceful symbol of the ancients. I believe it is in our tribe\'s interest to provide the Dragon Egg to this noble ${ifBlock_231c8aa07}."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The villagers bow their heads and Argo slowly lifts the Dragon Egg from its pedestal.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"This Dragon Egg is now yours, Friend of the Deathless," she says. "Use it in combat only, and only in the direst of situations. Remember: once it is used, it will disappear forever."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the Dragon Egg in my hands. It is surprisingly heavy and cold. The lever and the pin at the top, I learn, are what sets the device in motion. Carefully, I place the egg in a pocket on my chest.\n',
      isRaw: true,
    );
  }),
]);

class DragonEggExamine extends RoamingAction {
  @override
  final String name = 'dragon_egg_examine';

  static final DragonEggExamine singleton = DragonEggExamine();

  @override
  List<String> get commandPathTemplate => [
        'Dragon Egg',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('dragon_egg_room') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "dragon_egg_examine_ink",
    ));
    return '${a.name} successfully performs DragonEggExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DragonEggExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class DragonEggUse extends RoamingAction {
  @override
  final String name = 'dragon_egg_use';

  static final DragonEggUse singleton = DragonEggUse();

  @override
  List<String> get commandPathTemplate => [
        'Inventory',
        'Dragon Egg',
        'use',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.hasItem(dragonEggId) &&
        !c.playerRoom.isSynthetic &&
        c.playerRoom.isOnMap &&
        !c.getRoomRoaming().monstersAlive)) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the Dragon Egg out and turn it in my hand. The shape is mesmerizing. Beautiful. A true artifact of the ancients.\n\nArgo warned me only to use it in combat. I shake my head. No, this is too good to be thrown away at the enemy. I remove the pin, just as she told me, and release the lever. There\'s an audible click inside the egg as I do so.\n\nThe lever comes off, so I now hold the lever in my left hand and the egg in my right hand. The device looks more like an actual egg now, without the lever. I enjoy the symmetry.\n\nNothing seems to be happening. I put the egg closer to my ear in case there are any more clicks to be heard. Nothing. Not a s—\n\n',
      isRaw: true,
    );
    w.updateActorById(playerId, (b) => b.hitpoints = 0);
    w.recordCustom(CustomEvent.actorDeath, actor: c.player);

    return '${a.name} successfully performs DragonEggUse';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DragonEggUse';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage =>
      'Argo said the egg is to be used in combat. But it\'s tempting to try and use it now.';

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room dragonEggRoom = Room(
  'dragon_egg_room',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The Deathless lead me through thick foliage and across narrow beams high above the jungle. A single misstep would mean a long fall, and certain death.\n\nSoon, though, the hidden path takes a turn and leads into a small clearing. One of the Deathless holds a branch so it doesn\'t hit me, announcing: "The Sacred Shrine."\n\nThere\'s a pedestal here, illuminated by rays of sunlight. Only one thing lies on the top of the pedestal: a dark green oval shape. The ancient Dragon Egg.\n\n![Illustration of a pedestal with "Ovum Draconis" written on it. On the pedestal, there is a frag grenade.](dragonegg.png)\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(dragonEgg);
    c.markHappened(evReceivedDragonEgg);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 22,
  positionY: 58,
  mapName: 'Sacred Shrine',
  firstMapName: 'Sacred Shrine',
  hint: 'The place with the Dragon Egg.',
  firstHint:
      'A well-hidden place of worship near the village of the Deathless.',
);
final Approach pondFromJungleEntrance = Approach(
  'jungle_entrance',
  'pond',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach pondFromPondLizardRock = Approach(
  'pond_lizard_rock',
  'pond',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final pondHelicopterExamineInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The object is dark green, and larger than any animal, but made from metal. It has some windows in the front but it is not a house. It is deformed and scorched, broken. Long dark prongs extend from its back to the sides, like a firefly\'s wings.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The color and proportions are different, but after a few moments I recognize the vehicle. It is the same that can be found miles above Falling Rock, in the permanent snow. That one is white and red, and it still has ancient people in it, preserved by the cold. The elders call it Hell Compter. No one is to touch it or go anywhere near it.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" Take a closer look """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The vehicle sits above the calm surface of the pond, and it almost blends in with the surrounding vegetation. It looks like it was destroyed in the ancient times, when things like it could still fly. I can see the path it took, all those centuries ago, through the structure of the Pyramid. Its demise made room for this jungle.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'There are fresh flowers and burned out candles on top of its metal nose.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" Leave it be """.trim(),
      consequence: [],
    ),
  ]),
]);

class AttackLizardNearPond extends RoamingAction {
  @override
  final String name = 'attack_lizard_near_pond';

  static final AttackLizardNearPond singleton = AttackLizardNearPond();

  @override
  List<String> get commandPathTemplate => [
        'Lizardman',
        'Attack',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pond') != true) {
      return false;
    }
    if (!(c.hasHappened(evOpenedDam) && !c.hasHappened(evKilledLizardman))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.movePlayer('pond_lizard_rock');

    return '${a.name} successfully performs AttackLizardNearPond';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AttackLizardNearPond';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class PondHelicopterExamine extends RoamingAction {
  @override
  final String name = 'pond_helicopter_examine';

  static final PondHelicopterExamine singleton = PondHelicopterExamine();

  @override
  List<String> get commandPathTemplate => [
        'Object',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pond') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "pond_helicopter_examine_ink",
    ));
    return '${a.name} successfully performs PondHelicopterExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform PondHelicopterExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room pond = Room(
  'pond',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} follow a narrow path through the foliage, smelling the crispness of pine needles and the smell of fresh, cold air. The path leads toward a clearing with a pond. A strange, big, ancient object is suspended above the pond, held above the ground by twisted iron beams.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  positionX: 14,
  positionY: 70,
  mapName: 'Pond',
  hint: 'A small body of water at the bottom of the crater.',
);
final Room pondWithLizardman = Room(
  'pond_with_lizardman',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} follow a narrow path through the foliage, smelling the crispness of pine needles and the smell of fresh, cold air. The path leads toward a clearing with a pond. A strange, big, ancient object is suspended above the pond, held above the ground by twisted iron beams.\n\nOn one side of the pond, in plain sight but outside my immediate reach, a lizardman.\n\n![Illustration of a lizardman with a spear.](lizardman.png)\n\nHe watches me, motionless, holding a flat trident in front of him.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'pond',
  prerequisite: Prerequisite(
    984337484,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOpenedDam);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'On one side of the pond, in plain sight but outside my immediate reach, a lizardman.\n\n![Illustration of a lizardman with a spear.](lizardman.png)\n\nHe watches me, motionless, holding a flat trident in front of him.\n',
      isRaw: true,
    );
  },
  positionX: 14,
  positionY: 70,
  mapName: 'Pond',
  hint: 'A small body of water at the bottom of the crater.',
);
final Approach pondLizardRockFromPond = Approach(
  'pond',
  'pond_lizard_rock',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.playerHasVisited("pond_lizard_rock");
  },
);
final Room pondLizardRock = Room(
  'pond_lizard_rock',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} circle the pond and climb on a concrete platform that appears to be the lizardman\'s new base. I notice a half-eaten human leg lying on the ground here.\n\nThe lizardman watches me approach and readies his shield. He motions with his trident at my weapon.\n\n"Fffood should not fight," he says. I remember my struggles with eating a local delicacy — the squirming sannakji octopus of Oak Land — and I must agree with the lizardman. Food should not fight. Then again, I don\'t consider myself food.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateLizardmanFight,
  null,
  positionX: 13,
  positionY: 72,
  mapName: 'Lizardman\'s Rock',
  hint:
      'A concrete platform near the pond that serves as the lizardman\'s new base.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The monster is dead. I look around for treasure but don\'t see anything except for a few bones. One can be perfectly happy with a life spent eating, it seems. No treasure or purpose was needed for the lizardman.\n\n',
      isRaw: true,
    );
    c.markHappened(evKilledLizardman);
  },
);
final argoAskDeathlessInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Argo bows. She wears a perfume, and her motion sends its floral scent toward me. "I am delighted. Most people think of us as a cult, and few take the time to ask us directly."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She opens her arms and invites me to take a look at the village. "Do we look like cultists to you?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Looks can be deceiving." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo laughs, smiles, and waves her hand dismissively. "True. And the same goes for words. Words can be deceiving, too." She pauses, looking at the concrete floor.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Cult," she recites after a moment. "A relatively small group of people having religious beliefs or practices regarded by others as strange or sinister."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'She nods a little, then shrugs. "Cult isn\'t a real thing. It\'s just a word.\n',
            isRaw: true,
          );
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
          s.add(
            'Argo puts her arms back down. "Thank you," she says, visibly relieved. "I am glad.\n',
            isRaw: true,
          );
        }),
      ],
    ),
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
            'Argo lets her arms fall back down. "That is unfortunate.\n',
            isRaw: true,
          );
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
      'Do you know what we worship?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "The ancients?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo shakes her head, smiling again. "Incorrect," she says. "We worship the Eight Gods. Just like everyone else." She looks to the ceiling. "Well, almost everyone else. As for the ancients, we do not worship them. We know they weren\'t gods. Only people. But they were people who could erect places like the Pyramid."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'She stomps on the floor. "This. They were able to build it. The ancients must have been a lot closer to the Eight Gods than we are."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "This building?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo shakes her head, smiling again. "Incorrect," she says. "We worship the Eight Gods. Just like everyone else." She looks to the ceiling. "Well, almost everyone else. As for the Pyramid, we do not worship it. We do admire the people that built it. The ancients. Just imagine: those people could erect a hundred places like this building."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'She stomps on the floor. "This. They were able to build it. The ancients must have been a lot closer to the Eight Gods than we are."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "The Eight Gods?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo smiles again. "That is correct. The Eight Gods and the Sixteen Truths. Just like everyone else." She looks to the ceiling. "Well, almost everyone else."\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" "You worship nothing else?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '"Well, we do admire the ancients," she says. "We know they weren\'t gods. Only people. But they were people who could erect places like the Pyramid."\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "Why do you live secluded, then?" """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  '"Well, this place was built by the ancients," she says. "We know they weren\'t gods. Only people. But they were people who could erect places like the Pyramid."\n',
                  isRaw: true,
                );
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
            'She stomps on the floor. "This. They were able to build it. The ancients must have been a lot closer to the Eight Gods than we are."\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
  InkForkNode([
    InkChoiceNode(
      command: r""" "And that's why you live here?" """.trim(),
      consequence: [],
    ),
    InkChoiceNode(
      command: r""" "Or maybe they were just better builders." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Unlikely," Argo says. "They did a lot more than just build. Don\'t forget who put the goddess Iss in the sky. The ancients."\n',
            isRaw: true,
          );
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
      'Argo bows again, this time towards the center of the Pyramid. "We are Deathless. We want to learn from the ancients. We want to ensure their memory never dies. We want to ensure their legacy outlives our own. We are Deathless."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "What legacy?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"The Pyramid, for example," she says. "We also collect artifacts, small and large. The Deathless have existed for generations, and so our collection is considerable."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What memory?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"The ancients didn\'t leave a lot of paper behind," she says. "The books they left are of a different kind. Smaller, unopenable. Black glossy objects that refuse to give out even a hint of information. We know they contain it. We just cannot access it. At least not yet."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo raises eyebrows. "Have you met Oracle? She does have quite a few of the ancient books that are on paper. We even lend her some of our own books. She can read in them better than anyone here in the village."\n',
            isRaw: true,
          );
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
      'She sighs. "There\'s only one thing the Deathless regret. The Lair of God, our original place of worship, was taken by the orcs long before I was born. They now use it as some kind of a prison, or a sty. Disgusting."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Argo pretends to spit on the floor. With her size and age, her pretend anger looks almost adorable. "But the temple had an artifact in it, a star made in the age of the ancients, and we think it\'s still there."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She straightens, assuming a queenly posture. "That star means a lot to our people. Our Founder had it a hundred years ago, and it inspired her to bring the community to this place, to start the Deathless movement, and to build the Lair of God."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Good." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Argo nods.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" "It's a weapon, though. Don't you want to use it?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Not unless it\'s absolutely necessary. And not unless we find a warrior worthy of such a terrible power."\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
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
      isRaw: true,
    );
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
            isRaw: true,
          );
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
            isRaw: true,
          );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"Greetings, traveler. My name is Argo. I am of this tribe that calls itself the Deathless." The child is younger than me, and she has to look up when speaking to me. Nevertheless, she holds herself as a queen.\n',
      isRaw: true,
    );
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
          s.add(
            'She nods. "And what is\n',
            isRaw: true,
          );
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
            isRaw: true,
          );
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
      'your name?"\n',
      isRaw: true,
    );
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
          s.add(
            '"Well met, Aren."\n',
            isRaw: true,
          );
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
          final ifBlock_69ff6b352 = c.playerIsMale ? '''sir''' : '''lady''';
          s.add(
            'She smiles. "Well met, ${ifBlock_69ff6b352}."\n',
            isRaw: true,
          );
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
    final ifBlock_121bab35a = c.hasItem(lairOfGodStarId)
        ? '''She points at the Artifact Star. "Did you bring us the holy item?"'''
        : '''''';
    s.add(
      '${ifBlock_121bab35a}\n',
      isRaw: true,
    );
  }),
]);

class ArgoAskDeathless extends RoamingAction {
  @override
  final String name = 'argo_ask_deathless';

  static final ArgoAskDeathless singleton = ArgoAskDeathless();

  @override
  List<String> get commandPathTemplate => [
        'Argo',
        'Talk',
        '“Who are the Deathless?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("argo_greet"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoAskDeathless';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ArgoAskDragonEgg extends RoamingAction {
  @override
  final String name = 'argo_ask_dragon_egg';

  static final ArgoAskDragonEgg singleton = ArgoAskDragonEgg();

  @override
  List<String> get commandPathTemplate => [
        'Argo',
        'Talk',
        '“You have the Dragon Egg?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoAskDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ArgoAskQuake1 extends RoamingAction {
  @override
  final String name = 'argo_ask_quake_1';

  static final ArgoAskQuake1 singleton = ArgoAskQuake1();

  @override
  List<String> get commandPathTemplate => [
        'Argo',
        'Talk',
        '“Was that an earthquake?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoAskQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ArgoGreet extends RoamingAction {
  @override
  final String name = 'argo_greet';

  static final ArgoGreet singleton = ArgoGreet();

  @override
  List<String> get commandPathTemplate => [
        'Child',
        'Talk',
        '“Greetings!”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('deathless_village') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ArgoGreet';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      'On a ledge of the Pyramid overlooking the jungle, a village of cultists. They call themselves the Deathless, and they are said to worship the ancients. Their leader is a child.\n\nThe tribe is in a state of disarray. They wield the few weapons that they have, and they seem to be preparing for a siege.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'deathless_village',
  prerequisite: Prerequisite(
    218483559,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive) && !c.hasHappened(evQuake3);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The tribe is in a state of disarray. They wield the few weapons that they have, and they seem to be preparing for a siege.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  positionX: 21,
  positionY: 64,
  mapName: 'Village of the Deathless',
  firstMapName: 'Village in the Jungle',
  hint:
      'A village of cultists positioned on a ledge of the Pyramid overlooking the jungle.',
  firstHint:
      'I can see some buildings through the canopy of leaves. The buildings are placed on a ledge of the Pyramid overlooking the crater.',
);
final Room deathlessVillageQuake2 = Room(
  'deathless_village_quake2',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'On a ledge of the Pyramid overlooking the jungle, a village of cultists. They call themselves the Deathless, and they are said to worship the ancients. Their leader is a child.\n\nThey are freaked out by the most recent quake.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'deathless_village',
  prerequisite: Prerequisite(
    272717691,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The cultists are freaked out by the most recent quake.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  positionX: 21,
  positionY: 64,
  mapName: 'Village of the Deathless',
  firstMapName: 'Village in the Jungle',
  hint:
      'A village of cultists positioned on a ledge of the Pyramid overlooking the jungle.',
  firstHint:
      'I can see some buildings through the canopy of leaves. The buildings are placed on a ledge of the Pyramid overlooking the crater.',
);
final Room deathlessVillageQuake3 = Room(
  'deathless_village_quake3',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'On a ledge of the Pyramid overlooking the jungle, a village of cultists. They call themselves the Deathless, and they are said to worship the ancients. Their leader is a child.\n\nThe village is seriously damaged.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'deathless_village',
  prerequisite: Prerequisite(
    1025683774,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake3);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The village has been seriously damaged by the latest quake.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: cultists,
        what: [lairOfGodStarId, akxeId, sixtyFiverShieldId, hawkmanJacketId],
        especially: [lairOfGodStarId, hawkmanJacketId],
        how: "{approvingly|with respect}");

    if (c.hasItem(lairOfGodStarId)) {
      s.add(
          """One of the villagers points to the Artifact Star. "Did you bring us that holy item, oh noble one?" """,
          isRaw: true);
    }

    c.increaseSanityFromPeople();
  },
  positionX: 21,
  positionY: 64,
  mapName: 'Village of the Deathless',
  firstMapName: 'Village in the Jungle',
  hint:
      'A village of cultists positioned on a ledge of the Pyramid overlooking the jungle.',
  firstHint:
      'I can see some buildings through the canopy of leaves. The buildings are placed on a ledge of the Pyramid overlooking the crater.',
);
final Approach knightsHqMainFromBattlefield = Approach(
  'battlefield',
  'knights_hq_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach knightsHqMainFromElevator12 = Approach(
  'elevator_12',
  'knights_hq_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach knightsHqMainFromOracleMain = Approach(
  'oracle_main',
  'knights_hq_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach knightsHqMainFromStagingArea = Approach(
  'staging_area',
  'knights_hq_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room knightsHqMain = Room(
  'knights_hq_main',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I come to the Knights’ Headquarters. A large room overlooking the Bay. Latrines on the right hang out of the window frames, providing fertilizer to the Slopes below. To the left, as far from the latrines as possible, the bunks where a few of the Knights are sleeping.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 37,
  positionY: 65,
  mapName: 'Knights’ Headquarters',
  hint:
      'This is the original center of operations of the Knights of San Francisco.',
);
final talkToMiguelAboutDesertingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"I can\'t just guard down there," Miguel says. "What am I, an onlooker? I have to change things."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'He looks around and lowers his voice. "The Knights of San Francisco are no more, as far as I\'m concerned. Look, if you are in the business of hurting the orcs, take me with you."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '"What are you doing here?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutDeserting';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'knights_hq_main',
  prerequisite: Prerequisite(
    294899248,
    3,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanDeparted) &&
          !c.hasHappened(evOrcOffensive) &&
          c.playerHasVisited("knights_hq_quake2");
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The circle of women and men is no longer here.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 37,
  positionY: 65,
  mapName: 'Knights’ Headquarters',
  hint:
      'This is the original center of operations of the Knights of San Francisco.',
);
final Room knightsHqOrcOffensive = Room(
  'knights_hq_orc_offensive',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A large room overlooking the Bay. Latrines on the right hang out of the window frames, providing fertilizer to the Slopes below. To the left, as far from the latrines as possible, the bunks.\n\nThere are a handful of wounded Knights here, tended by a pair of servants.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'knights_hq_main',
  prerequisite: Prerequisite(
    879699967,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive) && !c.hasHappened(evQuake3);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A handful of wounded Knights are tended by a pair of servants.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 37,
  positionY: 65,
  mapName: 'Knights’ Headquarters',
  hint:
      'This is the original center of operations of the Knights of San Francisco.',
);
final Room knightsHqQuake2 = Room(
  'knights_hq_quake2',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I come to the Knights’ Headquarters. A large room overlooking the Bay. Latrines on the right hang out of the window frames, providing fertilizer to the Slopes below. To the left, as far from the latrines as possible, the bunks where a few of the Knights are sleeping.\n\nThere\'s a small circle of armed men and women talking excitedly in the middle of the room.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'knights_hq_main',
  prerequisite: Prerequisite(
    617622573,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'There\'s a small circle of armed men and women talking excitedly in the middle of the room.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 37,
  positionY: 65,
  mapName: 'Knights’ Headquarters',
  hint:
      'This is the original center of operations of the Knights of San Francisco.',
);
final Room knightsHqQuake3 = Room(
  'knights_hq_quake3',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I come to the Knights’ Headquarters. A large room overlooking the Bay. Latrines on the right hang out of the window frames, providing fertilizer to the Slopes below. To the left, as far from the latrines as possible, the deserted bunks of the Knights of San Francisco.\n\nThere is nobody here.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'knights_hq_main',
  prerequisite: Prerequisite(
    1010227962,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake3);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Silence. The Knights have left.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 37,
  positionY: 65,
  mapName: 'Knights’ Headquarters',
  hint:
      'This is the original center of operations of the Knights of San Francisco.',
);
final Approach elevator12FromElevator28 = Approach(
  'elevator_28',
  'elevator_12',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} climb down using an ancient rusty ladder.\n',
      isRaw: true,
    );
  },
);
final Approach elevator12FromKnightsHqMain = Approach(
  'knights_hq_main',
  'elevator_12',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room elevator12 = Room(
  'elevator_12',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Darkness shrouds most of the vertical shaft, except for a single bright slit many floors above. Down here on the 12th floor, only a narrow passage connects the elevator shaft with the corridors surrounding it.\n\nI smell oil and metal, and everything sounds like the inside of a cave.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 32,
  positionY: 67,
  mapName: 'Elevator Shaft Entrance on the 12th Floor',
  hint: 'A rare access point to the ancient elevator shaft.',
);
final Approach slopesFromFarmersVillage = Approach(
  'farmers_village',
  'slopes',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room slopes = Room(
  'slopes',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The steep slope of the Pyramid is covered in vines from this point down. Young men and women are picking Fruit.\n\nLarge writing on the wall reads, "Doghead will come."\n\n',
      isRaw: true,
    );
    c.learn(DogheadFacts.somethingCalledDoghead);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 44,
  positionY: 74,
  mapName: 'The Slopes',
  hint: 'The farmland on the outer wall of the Pyramid.',
);
final Room slopesQuake1 = Room(
  'slopes_quake1',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The steep slope of the Pyramid is covered in vines from this point down. Young men and women are picking Fruit.\n\nSome of them are talking about how the quakes are getting more frequent.\n\nIn the distance, a large group is traveling on the main road, toward the Pyramid.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'slopes',
  prerequisite: Prerequisite(
    867577495,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'There is talk among the young men and women about how the quakes are getting more frequent.\n\nIn the distance, a large group is traveling on the main road, toward the Pyramid.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 44,
  positionY: 74,
  mapName: 'The Slopes',
  hint: 'The farmland on the outer wall of the Pyramid.',
);
final talkToGreenWomanAboutSlopesDeathInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She clicks her tongue. "They should have been more careful, that\'s what happened."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command:
          r""" "Was this the scream I heard, when the quake struck?" """.trim(),
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
    s.add(
      '"Maybe."\n',
      isRaw: true,
    );
  }),
]);

class TalkToGreenWomanAboutSlopesDeath extends RoamingAction {
  @override
  final String name = 'talk_to_green_woman_about_slopes_death';

  static final TalkToGreenWomanAboutSlopesDeath singleton =
      TalkToGreenWomanAboutSlopesDeath();

  @override
  List<String> get commandPathTemplate => [
        'Green woman',
        'Talk',
        '"What happened here?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('slopes') != true) {
      return false;
    }
    if (!(c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToGreenWomanAboutSlopesDeath';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      'The steep slope of the Pyramid is covered in vines from this point down. Young men and women who would normally be picking Fruit on the Slopes are all at the base of the Pyramid, gathered around a dead body.\n\nA woman dressed in green is standing next to me, looking down.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  parent: 'slopes',
  prerequisite: Prerequisite(
    25414194,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The young men and women are all at the base of the Pyramid, gathered around a dead body.\n\nA woman dressed in green is standing next to me, looking down.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 44,
  positionY: 74,
  mapName: 'The Slopes',
  hint: 'The farmland on the outer wall of the Pyramid.',
);
final Approach stagingAreaFromFarmersVillage = Approach(
  'farmers_village',
  'staging_area',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach stagingAreaFromJungleEntrance = Approach(
  'jungle_entrance',
  'staging_area',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach stagingAreaFromKeepGate = Approach(
  'keep_gate',
  'staging_area',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach stagingAreaFromKnightsHqMain = Approach(
  'knights_hq_main',
  'staging_area',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach stagingAreaFromPyramidEntrance = Approach(
  'pyramid_entrance',
  'staging_area',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_10b0445b4 = c.knows(DogheadFacts.somethingCalledDoghead)
        ? '''Doghead.'''
        : '''a "Doghead."''';
    Ruleset(
      Rule(
        1005559119,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return !c.playerHasVisited("staging_area");
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' As I climb the Infinite Staircase, I read the writings on the wall. Many of them refer to ${ifBlock_10b0445b4}\n\n ![An inartistic writing on a wall saying Doghead](graffiti.png)\n\n Messages like "Where is Doghead?" and "Doghead save us" are on almost every step.\n\n',
            isRaw: true,
          );
          c.learn(DogheadFacts.somethingCalledDoghead);

          s.add(
            '\n Finally I reach a point where the stairs are too damaged to continue up. There\'s a doorway, and I go through it.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        257575313,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  },
);
final Room stagingArea = Room(
  'staging_area',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This is a large room without windows. It is teeming with Knights and their servants, who are carrying in chests, bedding, and furniture from the upper floors. All these items are being lined up against the north wall, and an officer with a large book is walking left and right, making notes.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.increaseSanityFromPeople();
  },
  null,
  null,
  isIdle: true,
  positionX: 26,
  positionY: 76,
  mapName: 'The Staging Area',
  firstMapName: 'Up the Stairs',
  hint:
      'This is a large room without windows that the Knights of San Francisco are using as the base for their retreat.',
  firstHint:
      'The entrance leads directly to what the locals call the Infinite Staircase. Sound travels from a few floors above — I can hear simple commands spoken in bored voices, and loud shuffling.',
);
final talkToHorsemanWhiteAboutOracleInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"An old woman with books. She insists on living on the fifteenth floor. I told her several times she\'s practically asking to be killed by a rogue orc skirmisher, living that close to them." He waves his hand. "Bah."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    s.add(
      'Horseman White seems offended. "Why are you asking me this?"\n',
      isRaw: true,
    );
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
          s.add(
            '"Not written by me, or any other Knight.\n',
            isRaw: true,
          );
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
            isRaw: true,
          );
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
      'Doghead is a local myth. A creature with a dog\'s head and a human\'s body. He or she is supposed to come and save the day at some point. Just turn up and solve everyone\'s problems. Classic magical thinking. Bullshit from generations ago. Go ask Oracle."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    final ifBlock_5f310b46e =
        c.playerHasWoodenFoot ? ''', especially at my wooden foot''' : '''''';
    final ifBlock_7c207f126 =
        c.playerHasBurntFace ? ''', especially at my face''' : '''''';
    s.add(
      '"Greetings. What\'s your business here?" The officer takes a second good look at me${ifBlock_5f310b46e}${ifBlock_7c207f126}. "You look far from home."\n',
      isRaw: true,
    );
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
            '"Let me guess, a backwater place somewhere to the east?" He snickers. "No matter. Why are you here?"\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command:
                r""" "I am searching for a Sarn of Falling Rock." """.trim(),
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
      'The officer shakes his head. "Why would this Sarn of Falling Rock be here, of all places? Any thinking man would go as far away from here as possible."\n',
      isRaw: true,
    );
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
            '"I wouldn\'t be a very good Knight if I fled from my company, would I? But if you ask me... Wait." The officer shouts some commands at the servants, makes a short note in his book, and continues. "If you ask me, the withdrawal from here cannot come fast enough. I will not flee myself, but I will gladly withdraw with the rest. And you, you should leave as soon as possible if you want to live."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    InkChoiceNode(
      command: r""" "Some people are not cowards." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The officer looks at me for a long while. Is he considering using that sword that sways by his side? But then he merely smirks. "Whatever your story is, kid, you should really be leaving." He turns and shouts some commands at the servants.\nWhen he is done and sees I\'m still there, he shakes his head. "I will not flee myself, but I will gladly withdraw with the rest. And you, you should leave as soon as possible if you want to live."\n',
            isRaw: true,
          );
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
          s.add(
            '"Bah! How old is this brother of yours? Can’t he take care of himself?"\n',
            isRaw: true,
          );
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
            '"So what? He\'s not your responsibility, kid. People think that, but that\'s not how the world works. People don\'t owe each other anything." He pauses. "Which brings me to the fact that\n',
            isRaw: true,
          );
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
          s.add(
            '"A revenge, then?" He chuckles. "Amusing. Nevertheless,\n',
            isRaw: true,
          );
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
    final ifBlock_46055ee7b = c.playerHasAsthma ? '''Stop coughing.''' : '''''';
    s.add(
      'I can\'t help you. I don\'t know anyone called Sarn. Or maybe I do but I don\'t remember. ${ifBlock_46055ee7b} I am busy, as you can see."\n',
      isRaw: true,
    );
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
            'The officer\'s face reddens, but he swallows a retort and flips through the pages.\n',
            isRaw: true,
          );
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
            '"Look, kid. There are hundreds of Knights in this place. They come and go. I can\'t know all of them." He scratches his nose. Then he looks down at his book and opens it to a page in the back.\n',
            isRaw: true,
          );
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
      isRaw: true,
    );
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
          s.add(
            '"The orcs, of course."\n',
            isRaw: true,
          );
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
            '"He probably is. We just mark him as captured because that\'s what we know for sure. But the orcs, they don\'t seem the sort that take good care of their prisoners, if you know what I mean."\n',
            isRaw: true,
          );
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
            '"I don\'t know. There were a lot of skirmishes with the orcs lately. Looks like your Sarn of Falling Rock was unlucky enough to be caught in one of them."\n',
            isRaw: true,
          );
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
      'The officer sighs, and his expression softens. "Look, kid. This is the kind of thing I have to say to people every day. Someone died. You cared about them. That\'s the bullshit we live in. The sooner we all get out of here, the better." He extends a hand to shake. "I am White. Horseman White."\n',
      isRaw: true,
    );
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
          s.add(
            '"Okay."\n',
            isRaw: true,
          );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"Take your pick, child." He starts counting with fingers. "The horde of orcs at the upper floors? The wizard, Big O, at the very top? The goblins everywhere? The earthquakes, or whatever they are?" He wiggles the four fingers. "There\'s probably more I\'m forgetting. The point is, the Knights of San Francisco were meant as a force to provide safety, to keep an occasional bandit or such in check."\n',
      isRaw: true,
    );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
        '“Any advice for someone delving in the Pyramid?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_horseman_white_greetings"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"No."\n',
      isRaw: true,
    );
    return '${a.name} successfully performs TalkToHorsemanWhiteAboutDevling';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteAboutDevling';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToHorsemanWhiteAboutOracle extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_about_oracle';

  static final TalkToHorsemanWhiteAboutOracle singleton =
      TalkToHorsemanWhiteAboutOracle();

  @override
  List<String> get commandPathTemplate => [
        'Horseman White',
        'Talk',
        '“Who is Oracle?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteAboutOracle';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToHorsemanWhiteDoghead extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_doghead';

  static final TalkToHorsemanWhiteDoghead singleton =
      TalkToHorsemanWhiteDoghead();

  @override
  List<String> get commandPathTemplate => [
        'Horseman White',
        'Talk',
        '"Who is Doghead?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteDoghead';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToHorsemanWhiteGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_greetings';

  static final TalkToHorsemanWhiteGreetings singleton =
      TalkToHorsemanWhiteGreetings();

  @override
  List<String> get commandPathTemplate => [
        'Officer',
        'Talk',
        '"Greetings."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('staging_area') != true) {
      return false;
    }
    if (!(!c.hasHappened(evSavedSarn))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToHorsemanWhiteQuake1 extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_quake_1';

  static final TalkToHorsemanWhiteQuake1 singleton =
      TalkToHorsemanWhiteQuake1();

  @override
  List<String> get commandPathTemplate => [
        'Horseman White',
        'Talk',
        '"Was that an earthquake?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToHorsemanWhiteRetreat extends RoamingAction {
  @override
  final String name = 'talk_to_horseman_white_retreat';

  static final TalkToHorsemanWhiteRetreat singleton =
      TalkToHorsemanWhiteRetreat();

  @override
  List<String> get commandPathTemplate => [
        'Horseman White',
        'Talk',
        '"What are you retreating from?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToHorsemanWhiteRetreat';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      'This is a large room without windows. It is teeming with Knights and their servants, who are carrying in chests, bedding, and furniture from the upper floors. All these items are being lined up against the north wall, and an officer with a large book is walking left and right, making notes.\n\nThe quake has evidently toppled some of the furniture next to the wall, and a few Knights are putting it back in order again.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'staging_area',
  prerequisite: Prerequisite(
    291483367,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Some of the furniture has been toppled by the quake, and the Knights are putting it back in order again, frustrated, looking for damage.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 26,
  positionY: 76,
  mapName: 'The Staging Area',
  firstMapName: 'Up the Stairs',
  hint:
      'This is a large room without windows that the Knights of San Francisco are using as the base for their retreat.',
  firstHint:
      'The entrance leads directly to what the locals call the Infinite Staircase. Sound travels from a few floors above — I can hear simple commands spoken in bored voices, and loud shuffling.',
);
final Room stagingAreaQuake2 = Room(
  'staging_area_quake2',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This is a large room without windows. It is teeming with Knights and their servants, who are carrying in chests, bedding, and furniture from the upper floors. All these items are being lined up against the north wall, and an officer with a large book is walking left and right, making notes.\n\nThe new quake has toppled quite a few things. Nobody seems to care anymore. People just try to get out.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'staging_area',
  prerequisite: Prerequisite(
    600200113,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The new quake has toppled quite a few things. Nobody seems to care anymore. People just try to get out.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 26,
  positionY: 76,
  mapName: 'The Staging Area',
  firstMapName: 'Up the Stairs',
  hint:
      'This is a large room without windows that the Knights of San Francisco are using as the base for their retreat.',
  firstHint:
      'The entrance leads directly to what the locals call the Infinite Staircase. Sound travels from a few floors above — I can hear simple commands spoken in bored voices, and loud shuffling.',
);
final Approach farmersVillageFromSlopes = Approach(
  'slopes',
  'farmers_village',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach farmersVillageFromStagingArea = Approach(
  'staging_area',
  'farmers_village',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room farmersVillage = Room(
  'farmers_village',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well-dressed people go about their business. Polite nods in my direction.\n\nAn old woman is whittling a little dog-headed figure from wood.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: farmers,
        what: [
          akxeId,
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
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
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  isIdle: true,
  positionX: 38,
  positionY: 78,
  mapName: 'Farmers\' Village',
  firstMapName: 'Settled Area',
  hint:
      'A settlement of people who farm the vines that grow on the outside of the Pyramid.',
  firstHint:
      'From the outside, this part of the Pyramid is covered with vines, and there are clear signs of settlement in the windows.',
);
final talkToAdaAboutDelvingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Oh, please don\'t put yourself into more danger than you absolutely must. This building is full of dangers."\n',
      isRaw: true,
    );
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
            isRaw: true,
          );
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
            isRaw: true,
          );
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
      'seek help from others. The Deathless have been friendly to us farmers. Oracle is a beautiful person. The Knights are leaving, but they are good people, too."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"And remember to equip yourself," Ada says, looking at my tunic and gear. "There are different weapons to be found, even here in the downside of the Pyramid. A good weapon can be the difference between life and death. A _great_ weapon can decide a conflict without the need for a fight. I\'ve heard the Dragon Egg is that sort of weapon."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"Oh, you should not ask an old woman about such things," she says. "I know it\'s a device of war. I know it\'s powerful. People claim it\'s somewhere in the Pyramid. But where? And what it is, exactly? I don\'t know."\n',
      isRaw: true,
    );
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
      '"She\'s the wisest person I know," Ada says, with something like pride. "Lives in a room many floors above us. Up above the Knights’ Headquarters, even, just below the Battlefield floor."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She chuckles. "As high as possible without being quartered by the orcs. She likes the view."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    final ifBlock_4f06a29a4 = c.playerHasWoodenFoot ? '''crippled ''' : '''''';
    s.add(
      'Ada\'s little wooden figure gets another cut and a wooden chip flies past my ${ifBlock_4f06a29a4}leg. "Oracle never had a kid, you know. Had all that time to invest in learning and experiencing. Not that I envy her, no. I could not live without kids. Just explaining how she knows as much as she does."\n',
      isRaw: true,
    );
  }),
]);
final talkToAdaBigOInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"As much as anyone here, ${youngSirSubstitution}," Ada says. "When I was younger, we called him Osiris. Big O is a nickname that people gave him. He\'s a constant presence, even though we don\'t ever see him."\n',
      isRaw: true,
    );
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
            'Ada shrugs and puts her whittling knife to the figure. "People say different things. At night, we can see the lights change. Dark red and bright violet, what have you. There are sounds and screams sometimes, and they don\'t seem to be coming from the orcs. I don\'t know\n',
            isRaw: true,
          );
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
            '"He\'s up there, at the very top," Ada says, pointing with her whittling knife to the ceiling. "He never goes down, never shows. He\'s been locked up there for decades now, and nobody knows\n',
            isRaw: true,
          );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"Ah, this?" She lifts the item to her eye level and I can smell the wood. "That\'s Doghead, of course. People in the Pyramid believe a creature with a human body and a dog\'s head will come and save us in our direst moment."\n',
      isRaw: true,
    );
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
            isRaw: true,
          );
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
            isRaw: true,
          );
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
      'All I know is that this has been said for generations. My mother taught me about Doghead."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      isRaw: true,
    );
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
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
          s.add(
            'Ada nods.\n',
            isRaw: true,
          );
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
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"Greetings to you, too, ${youngSirSubstitution}. What\'s your name?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Aren." """.trim(),
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
      '"Good to meet you, Aren. My name is Ada."\n',
      isRaw: true,
    );
  }),
]);
final talkToAdaQuake1Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"Don\'t you worry, ${youngSirSubstitution}, this is quite normal here. These past months there is seldom a single day when we don\'t have a quake."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "An earthquake every day is normal?" """.trim(),
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
            '"Oracle once told me that this area has been prone to earthquakes since at least the time of the ancients. ${ifBlock_23e6b75e}"\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"Any advice for someone delving in the Pyramid?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAboutDelving';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToAdaAboutDragonEgg extends RoamingAction {
  @override
  final String name = 'talk_to_ada_about_dragon_egg';

  static final TalkToAdaAboutDragonEgg singleton = TalkToAdaAboutDragonEgg();

  @override
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"What do you know about the Dragon Egg?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAboutDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToAdaAboutOracle extends RoamingAction {
  @override
  final String name = 'talk_to_ada_about_oracle';

  static final TalkToAdaAboutOracle singleton = TalkToAdaAboutOracle();

  @override
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"Who\'s Oracle?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAboutOracle';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToAdaBigO extends RoamingAction {
  @override
  final String name = 'talk_to_ada_big_o';

  static final TalkToAdaBigO singleton = TalkToAdaBigO();

  @override
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"Do you know anything about Big O?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaBigO';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToAdaDogheadFigure extends RoamingAction {
  @override
  final String name = 'talk_to_ada_doghead_figure';

  static final TalkToAdaDogheadFigure singleton = TalkToAdaDogheadFigure();

  @override
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"What\'s that dog-headed figure?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("talk_to_ada_greetings"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaDogheadFigure';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToAdaGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_ada_greetings';

  static final TalkToAdaGreetings singleton = TalkToAdaGreetings();

  @override
  List<String> get commandPathTemplate => [
        'Old woman',
        'Talk',
        '"Greetings."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('farmers_village') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToAdaQuake1 extends RoamingAction {
  @override
  final String name = 'talk_to_ada_quake_1';

  static final TalkToAdaQuake1 singleton = TalkToAdaQuake1();

  @override
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"Was that an earthquake?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well-dressed people run around, trying to repair the damage of the quake, repairing doors, cleaning debris. Yet others seem to ignore all that, instead focusing on packing.\n\nAn old woman is whittling a little dog-headed figure from wood.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: farmers,
        what: [
          akxeId,
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
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
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'farmers_village',
  prerequisite: Prerequisite(
    829538554,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The farmers look a bit more stressed. No more polite nods. Someone\'s repairing a damaged door, others are cleaning debris. Yet others seem to ignore all that, instead focusing on packing.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: farmers,
        what: [
          akxeId,
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  isIdle: true,
  positionX: 38,
  positionY: 78,
  mapName: 'Farmers\' Village',
  firstMapName: 'Settled Area',
  hint:
      'A settlement of people who farm the vines that grow on the outside of the Pyramid.',
  firstHint:
      'From the outside, this part of the Pyramid is covered with vines, and there are clear signs of settlement in the windows.',
);
final talkToAdaAfterQuake2Ink = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      'Ada shakes her head. "I\'ll be frank with you, ${youngSirSubstitution}. I don\'t think I have ever seen people this frightened. Seeing the Knights leave like that..." She pauses. "I think it finally hits."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      'Ada\'s hand goes through her hair, and she sighs. "Please, ${youngSirSubstitution}, help."\n',
      isRaw: true,
    );
  }),
]);

class TalkToAdaAfterQuake2 extends RoamingAction {
  @override
  final String name = 'talk_to_ada_after_quake_2';

  static final TalkToAdaAfterQuake2 singleton = TalkToAdaAfterQuake2();

  @override
  List<String> get commandPathTemplate => [
        'Ada',
        'Talk',
        '"How are people coping?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToAdaAfterQuake2';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
      'The corridors here look more like streets. Painted walls on either side, with wooden windows in them, and doors. Well-dressed people run around, trying to repair the damage of the quake, repairing doors, cleaning debris. Yet others seem to ignore all that, instead focusing on packing.\n\nThe farmers are in full panic. Someone\'s crying about a person on the Slopes.\n\nAmong all this, an old woman is whittling a little dog-headed figure from wood.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: farmers,
        what: [
          akxeId,
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
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
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'farmers_village',
  prerequisite: Prerequisite(
    876562067,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) && !c.hasHappened(evCaravanDeparted);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The farmers are in full panic. Someone\'s crying about a person on the Slopes.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: farmers,
        what: [
          akxeId,
          dragonEggId,
          katanaId,
          lairOfGodStarId,
          sixtyFiverShieldId,
          sixtyFiverSwordId,
          hawkmanJacketId
        ],
        especially: [katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  isIdle: true,
  positionX: 38,
  positionY: 78,
  mapName: 'Farmers\' Village',
  firstMapName: 'Settled Area',
  hint:
      'A settlement of people who farm the vines that grow on the outside of the Pyramid.',
  firstHint:
      'From the outside, this part of the Pyramid is covered with vines, and there are clear signs of settlement in the windows.',
);
final Approach keepGateFromKeepBedroom = Approach(
  'keep_bedroom',
  'keep_gate',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_78dfcecc6 = !c.playerHasVisited('keep_gate')
        ? '''I open a massive door and walk through it into a corridor that looks a lot less ornamented than anything in the Keep. I turn around to behold the entrance to this aristocratic home.'''
        : '''''';
    s.add(
      '${ifBlock_78dfcecc6}\n',
      isRaw: true,
    );
  },
);
final Approach keepGateFromStagingArea = Approach(
  'staging_area',
  'keep_gate',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final openGateUnlockInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I start following the steps I learned. It is quite easy to find the decorative parts that I need to push, turn, or pull: they seem more polished than the rest of the gate. They are polished by fingers performing the ritual over and over again, for decades.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Finally, I am at the very end of the "algorithm." All that\'s left is to turn the crest in the middle of the gate.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" 7 times """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am pretty sure it was seven times, a lucky number. When I\'m done with the seventh revolution, I step back. The gate stands still for a while, then something clicks inside.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am showered by countless little darts, shooting diagonally from the ceiling. A curtain of blood covers my eyes, and the view of the gate fades to eternal black.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(playerId, (b) => b.hitpoints = 0);
          w.recordCustom(CustomEvent.actorDeath, actor: c.player);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" 8 times """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Eight times, like the Eight Gods. When I\'ve finished the eighth revolution, I step back. The gate stands still for a while, then something clicks inside.\nThe wings of the gate open and reveal a beautifully decorated passage into the Keep.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.recordCustom(evKeepUnlockedGate);
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" 9 times """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am pretty sure it was nine times, nine like cat lives. When I\'m done with the ninth revolution, I step back. The gate stands still for a while, then something clicks inside.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I am showered by countless little darts, shooting diagonally from the ceiling. A curtain of blood covers my eyes, and the view of the gate fades to eternal black.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(playerId, (b) => b.hitpoints = 0);
          w.recordCustom(CustomEvent.actorDeath, actor: c.player);
        }),
      ],
    ),
  ]),
]);

class AttemptOpenGate extends RoamingAction {
  @override
  final String name = 'attempt_open_gate';

  static final AttemptOpenGate singleton = AttemptOpenGate();

  @override
  List<String> get commandPathTemplate => [
        'Gate',
        'Open',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKeepDestroyedGate) &&
        !c.knows(KeepGateFacts.keepGateUnlock) &&
        !c.playerHasVisited("keep_bedroom"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I attempt to open the gate but it\'s closed tight. Maybe there\'s a trick to unlocking it using some of the intricate woodwork, but my random mashing of various ornaments does nothing.\n\nI could also bring it down using an axe. It\'s wood, after all.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs AttemptOpenGate';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform AttemptOpenGate';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class DestroyGateWithAxe extends RoamingAction {
  @override
  final String name = 'destroy_gate_with_axe';

  static final DestroyGateWithAxe singleton = DestroyGateWithAxe();

  @override
  List<String> get commandPathTemplate => [
        'Gate',
        'Destroy',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    if (!(c.player.inventory.hasWeapon(WeaponType.axe) &&
        !c.hasHappened(evKeepUnlockedGate) &&
        !c.playerHasVisited("keep_bedroom"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final axe = c.player.inventory.findBestWeapon(type: WeaponType.axe);
    a.report(
        s, "<subject> chop<s> down the gate with <objectNounWithAdjective>",
        object: axe);

    w.recordCustom(evKeepDestroyedGate);

    s.add(
      '\nThis reveals a beautifully decorated passage into the Keep.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs DestroyGateWithAxe';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform DestroyGateWithAxe';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ExamineGate extends RoamingAction {
  @override
  final String name = 'examine_gate';

  static final ExamineGate singleton = ExamineGate();

  @override
  List<String> get commandPathTemplate => [
        'Gate',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
      Rule(
        77061314,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened('destroy_gate_with_axe');
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' The strict simplicity of the ancient building gives way to Nortonian redwood panels. A fine piece of carpentry. Obviously expensive to build. A shame that I had to destroy it.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        355928282,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' The strict simplicity of the ancient building gives way to Nortonian redwood panels. A fine piece of carpentry. Obviously expensive to build.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
    s.add(
      '\nA big warning sign on the wall says "HAUNTED." Below the paint, there is an older, fainter sign. It says "eat the rich."\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ExamineGate';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ExamineGate';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class OpenGateUnlock extends RoamingAction {
  @override
  final String name = 'open_gate_unlock';

  static final OpenGateUnlock singleton = OpenGateUnlock();

  @override
  List<String> get commandPathTemplate => [
        'Gate',
        'Open',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_gate') != true) {
      return false;
    }
    if (!(!c.hasHappened(evKeepDestroyedGate) &&
        c.knows(KeepGateFacts.keepGateUnlock) &&
        !c.playerHasVisited("keep_bedroom"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "open_gate_unlock_ink",
    ));
    return '${a.name} successfully performs OpenGateUnlock';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform OpenGateUnlock';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room keepGate = Room(
  'keep_gate',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The plain, ancient geometry of the Pyramid\'s hallways is disrupted by a massive gate. The gate is made from dark, richly ornamented redwood, and a rich wet scent fills the space in front of it.\n\nThis is a lord\'s home, except it doesn\'t stand on top of a hill or next to a lake. Instead, it was fashioned from some of the more well-preserved rooms in the ancient building.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 20,
  positionY: 81,
  mapName: 'The Keep\'s Gate',
  firstMapName: 'The Keep',
  hint:
      'The entrance to the abandoned aristocratic residence within the Pyramid.',
  firstHint:
      'This part of the Pyramid seems to have been rebuilt at some point into an aristocratic residence. This is the floor where I saw the lady with the katana.',
);
final Approach keepBedroomFromKeepDining = Approach(
  'keep_dining',
  'keep_bedroom',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach keepBedroomFromKeepGate = Approach(
  'keep_gate',
  'keep_bedroom',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.hasHappened(evKeepUnlockedGate) ||
        c.hasHappened(evKeepDestroyedGate) ||
        c.playerHasVisited("keep_bedroom");
  },
);
final Approach keepBedroomFromKeepServants = Approach(
  'keep_servants',
  'keep_bedroom',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class ExamineFamilyPortrait extends RoamingAction {
  @override
  final String name = 'examine_family_portrait';

  static final ExamineFamilyPortrait singleton = ExamineFamilyPortrait();

  @override
  List<String> get commandPathTemplate => [
        'Family portrait',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_bedroom') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('search_bedroom'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The portrait depicts an aristocratic family. Handsome people.\n\nA young, striking lady stands in the front. Her expression is fashionably bored. It is clear the portrait was meant for her, as a memento for her later years. An inscription reads, "For our beloved Lady Hope."\n\n',
      isRaw: true,
    );
    c.learn(LadyHopeFacts.ladyHopeName);

    return '${a.name} successfully performs ExamineFamilyPortrait';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ExamineFamilyPortrait';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class SearchBedroom extends RoamingAction {
  @override
  final String name = 'search_bedroom';

  static final SearchBedroom singleton = SearchBedroom();

  @override
  List<String> get commandPathTemplate => [
        'Furniture',
        'Search',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_bedroom') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Everything is gone. Except: a family portrait. The painting leans against the wall, in clear sight. The looters didn\'t touch it - superstition?\n',
      isRaw: true,
    );
    return '${a.name} successfully performs SearchBedroom';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SearchBedroom';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TakeFamilyPortrait extends RoamingAction {
  @override
  final String name = 'take_family_portrait';

  static final TakeFamilyPortrait singleton = TakeFamilyPortrait();

  @override
  List<String> get commandPathTemplate => [
        'Family portrait',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_bedroom') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('examine_family_portrait'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the family portrait. It\'s kind of unwieldy and awkward to hold, so I keep it in front of me.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(familyPortrait);

    return '${a.name} successfully performs TakeFamilyPortrait';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TakeFamilyPortrait';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room keepBedroom = Room(
  'keep_bedroom',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Redwood parquetry — the wooden flooring of the rich — creaks underfoot.\n\nThis is where the aristocracy lived: the Lord\'s Quarters. The place has been ransacked, and it is mostly covered in dust and spiderwebs. But there is some sign of activity. Smallish footprints, with scratch marks.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 15,
  positionY: 82,
  mapName: 'Lord\'s Quarters',
  hint: 'Though derelict, these are still the nicest parts of the Keep.',
);
final Approach keepDiningFromKeepBedroom = Approach(
  'keep_bedroom',
  'keep_dining',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room keepDining = Room(
  'keep_dining',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_1d766ac55 = c.knows(LadyHopeFacts.ladyHopeName)
        ? '''Lady Hope faces me and prepares for battle.'''
        : '''An undead woman faces me and prepares for battle. Later, I find out her name is Lady Hope.''';
    s.add(
      '${ifBlock_1d766ac55} I wonder if she’s seen my brother.\n\n',
      isRaw: true,
    );
    c.learn(LadyHopeFacts.ladyHopeName);

    s.add(
      '\n![Illustration of Lady Hope, an undead woman with a katana.](hope.png)\n\n',
      isRaw: true,
    );
    Ruleset(
      Rule(
        777155909,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened(evKilledDarg);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' As I approach, a forced, unnatural smile distorts the undead face. I am reminded of my fight with Darg. The necromancer is speaking through dead flesh again.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        238775476,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' As I approach, a forced, unnatural smile distorts the undead face. I am duly impressed. Someone must be puppeteering the body. A highly skilled necromancer, perhaps.\n\n I risk a quick look around the room. Nobody else is here. The necromancer must be doing this from afar. Even more impressive.\n\n But then, Lady Hope\'s undead lips start moving. She _speaks._\n\n "Welcome, young one." The voice is dry and labored, but nevertheless understandable. A talking corpse is something I\'ve never even considered before. This is obviously necromancy of some higher level.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
    s.add(
      '\n"You made it rather far, I admit." The body starts walking toward me. "But now you die."\n\n',
      isRaw: true,
    );
    if (c.hasItem(familyPortraitId)) {
      s.add(
          'As she approaches, Lady Hope seems taken aback by the portrait I have with me. This gives me initiative. ',
          isRaw: true);

      w.updateActorById(
          ladyHopeId,
          (b) => b
            ..initiative = 0
            ..dexterity = b.dexterity! ~/ 2);
    }
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateLadyHopeFight,
  null,
  isIdle: true,
  positionX: 9,
  positionY: 81,
  mapName: 'Dining Room',
  firstMapName: 'Dining Room',
  hint:
      'The place where the Lord of the Keep dined with his family. A place with a good view of the redwoods outside.',
  firstHint:
      'I can see a female figure silhouetted against a tall window. She is not moving, but I can feel she\'s alive, or at the very least undead. She waits.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Lady Hope is defeated, but her head is still talking.\n\n"I see you, young friend," the head says. "I see your ambition. I see your talents. I see your brutality, which I like most of all."\n\nA barren approximation of a laugh leaves the throat.\n\n"Too many young people limit themselves," the head continues. "They limit their effect on the world. You don\'t. But I warn you: you\'re not to cross me. You\'re not to ascend to the top. If you do, you die. You are not Doghead. It is not your fate to save this place. And that means, if you cross me, your fate is to die."\n\nAnd then, as if to illustrate the point, Lady Hope\'s face goes to rigor mortis, her features suddenly aging and wrinkling, and she talks no more.\n\n',
      isRaw: true,
    );
    c.learn(DogheadFacts.somethingCalledDoghead);
    c.markHappened(evKilledHope);
  },
);
final Approach keepServantsFromKeepBedroom = Approach(
  'keep_bedroom',
  'keep_servants',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.knows(kbKeepServantsLocation);
  },
);
final Approach keepServantsFromTopOfClimb = Approach(
  'top_of_climb',
  'keep_servants',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I climb down the elevator shaft. All the exits are shut except for one almost at the very bottom of the tower. It leads to a narrow passage paneled with wood, and then into a cramped room inside the Keep.\n',
      isRaw: true,
    );
  },
);

class NorthSkullExamine extends RoamingAction {
  @override
  final String name = 'north_skull_examine';

  static final NorthSkullExamine singleton = NorthSkullExamine();

  @override
  List<String> get commandPathTemplate => [
        'Device',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_servants') != true) {
      return false;
    }
    if (!(!w.actionHasBeenPerformed('north_skull_take'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_3d15c1ad0 = c.playerHasVisited("keep_servants",
            from: "top_of_climb")
        ? '''the narrow passage connecting this room to the elevator shaft'''
        : '''a corner of the room that, after closer inspection, hides a narrow crawl space''';
    final ifBlock_23496a9a8 = c.hasItem(compassId)
        ? '''I reach into my pocket and pull out the compass. As I circle the "North Skull," the device always points directly at it.'''
        : '''''';
    s.add(
      'This is a human skull made into a device.\n\n![Illustration of some kind of device inset in a human skull.](northskull.png)\n\nNext to it, crude goblin-tongue writing says "YOU FOUND NORTH SKULL STUPID! GO UP NOW." An arrow points to ${ifBlock_3d15c1ad0}.\n\n${ifBlock_23496a9a8}\n',
      isRaw: true,
    );
    return '${a.name} successfully performs NorthSkullExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform NorthSkullExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class NorthSkullTake extends RoamingAction {
  @override
  final String name = 'north_skull_take';

  static final NorthSkullTake singleton = NorthSkullTake();

  @override
  List<String> get commandPathTemplate => [
        'North Skull',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('keep_servants') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed('north_skull_examine'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the North Skull. As I straighten up, my heart stops. Something is moving in the corner of the room. But then I realize it was only my shadow.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(northSkull);

    return '${a.name} successfully performs NorthSkullTake';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform NorthSkullTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room keepServants = Room(
  'keep_servants',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Clear signs of goblin activity: scratches on the floor, a pile of bones in one of the corners, and the stench of goblin excrement. A curious skull-shaped device sits in the middle of the room.\n\n',
      isRaw: true,
    );
    c.learn(kbKeepServantsLocation);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  null,
  null,
  isIdle: true,
  positionX: 19,
  positionY: 84,
  mapName: 'Servants\' Quarters',
  hint:
      'The cramped rooms where the servants of the Keep\'s owner once lived and worked.',
);
final Approach pyramidEntranceFromBleedsMain = Approach(
  'bleeds_main',
  'pyramid_entrance',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach pyramidEntranceFromStagingArea = Approach(
  'staging_area',
  'pyramid_entrance',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final observeKnightsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'It\'s the only visible entrance to the Pyramid. A recently-added redwood frame decorates the ancient opening. Some lord probably thought that the original shape was too simple, too blunt, too unnatural. Perfect rectangles like that just don\'t feel like a real part of this world.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A few paces to the right, an ancient bronze plaque.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" Examine it """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The bronze tablet is set in a concrete block, overgrown with dark green vines. "Transamerica Pyramid," it says. "Built in 1972." That\'s more than a thousand years ago.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I look back at the entrance and the Knights.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" Leave it be """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'I look at the Knights.\n',
            isRaw: true,
          );
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
      'Both wear the same uniform, though their helmets differ slightly. They don\'t speak, opting instead to look directly at me or scan the surroundings.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I wonder how it must be, having to spend so much time with a single person, idly waiting together. Do they grow to love each other? Or hate? Both?\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_7187bc575 = w.actionHasBeenPerformed("talk_to_kat_greetings")
        ? '''Kat'''
        : '''the woman''';
    final ifBlock_6d6326fdf =
        w.actionHasBeenPerformed("talk_to_miguel_greetings")
            ? '''Miguel'''
            : '''the man''';
    s.add(
      'I see ${ifBlock_7187bc575} secretly looking at ${ifBlock_6d6326fdf}, shaking her head, smiling.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Both, then. Love _and_ hate.\n',
      isRaw: true,
    );
  }),
]);

class ObserveKnights extends RoamingAction {
  @override
  final String name = 'observe_knights';

  static final ObserveKnights singleton = ObserveKnights();

  @override
  List<String> get commandPathTemplate => [
        'Entrance',
        'Observe',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(miguelId) && c.inRoomWith(katId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "observe_knights_ink",
    ));
    return '${a.name} successfully performs ObserveKnights';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ObserveKnights';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room pyramidEntrance = Room(
  'pyramid_entrance',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    s.add(
      'As ${weSubstitution} approach, I can\'t stop looking up at the structure. The wind changes here, and it brings a musty smell from the vines that envelop the bottom of the building. From this perspective, the Pyramid is especially massive.\n\nTwo Knights, a woman and a man, are on guard.\n\n![Illustration of two Knights: a woman with a sword and a man with a halberd](guards.png)\n\nThe man has been crying, judging from his eyes.\n\nFour stories above, in a corner room of the Pyramid, an eerily motionless woman stands, looking out. She is armed with a gleaming, ancient sword. A katana, from the looks of it.\n\n',
      isRaw: true,
    );
    c.learn(LadyHopeFacts.ladyInKeep);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    if (c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings")) {
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [dragonEggId, katanaId, sixtyFiverShieldId, hawkmanJacketId],
          especially: [sixtyFiverShieldId],
          how: "{approvingly|with respect}");
    }
  },
  null,
  null,
  isIdle: true,
  positionX: 26,
  positionY: 94,
  mapName: 'Pyramid Entrance',
  firstMapName: 'The Pyramid',
  hint: 'This is the only side of the Pyramid that allows access from outside.',
  firstHint:
      'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.',
);
final talkToKatAboutDevlingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Kat raises her eyebrows and looks me up and down. "Don\'t underestimate it," she says. "There\'s a reason the Knights are leaving, and it\'s not because we are cowards. The orcs in the Pyramid are well armed, numerous, and bolder every day."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      'Does she know about any specific parts of the Pyramid I should avoid? Not really. "You would do well to ask the locals," she says. "There\'s so much I don\'t know about this place."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    s.add(
      '"That\'s Lady Hope. Our local ghost."\n',
      isRaw: true,
    );
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
          s.add(
            '"Well, I should say\n',
            isRaw: true,
          );
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
          s.add(
            '"They don\'t? How are you so sure?"\n',
            isRaw: true,
          );
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
                  isRaw: true,
                );
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
                s.add(
                  '"Well, okay then. I\'m going to say Lady Hope is\n',
                  isRaw: true,
                );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    final ifBlock_303e21bc7 = c.playerHasBurntFace
        ? ''', though she flinches a bit when she sees my face.'''
        : '''''';
    s.add(
      '"Greetings to you!" The woman smiles${ifBlock_303e21bc7}. "My name is Kat."\n',
      isRaw: true,
    );
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
            isRaw: true,
          );
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
                s.add(
                  '"Yes. But don\'t call me that. And your name is..."\n',
                  isRaw: true,
                );
              }),
              InkForkNode([
                InkChoiceNode(
                  command: r""" "Aren." """.trim(),
                  consequence: [],
                ),
              ]),
            ],
          ),
        ]),
      ],
    ),
    InkChoiceNode(
      command: r""" "Mine's Aren." """.trim(),
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
      '"Good to meet you, Aren."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.updateActorById(
        katId,
        (b) => b
          ..name = 'Kat'
          ..adjective = null
          ..nameIsProperNoun = true);
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
        '"I\'m looking for a Sarn of Falling Rock."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_528a0209b = c.playerHasBlackHair ? '''black''' : '''''';
    final ifBlock_bbc234dd = c.playerHasBrownHair ? '''brown''' : '''''';
    final ifBlock_7c7d9c11 = c.playerHasBlondHair ? '''blond''' : '''''';
    s.add(
      '"Sarn of Falling Rock," she repeats. "I don\'t think I remember that name."\n\nShe looks closer at me. "But those eyes. They look familiar." She nods. "And the ${ifBlock_528a0209b}${ifBlock_bbc234dd}${ifBlock_7c7d9c11} hair. Your brother? Yes, I think I\'ve seen him around here. But that\'s as much as I can tell you, unfortunately."\n\n',
      isRaw: true,
    );
    c.learn(SarnFacts.wasHere);

    return '${a.name} successfully performs TalkToKatAboutBrother';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutBrother';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToKatAboutDevling extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_devling';

  static final TalkToKatAboutDevling singleton = TalkToKatAboutDevling();

  @override
  List<String> get commandPathTemplate => [
        'Kat, the guardswoman',
        'Talk',
        '“Any advice for someone delving in the Pyramid?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutDevling';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToKatAboutLady extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_lady';

  static final TalkToKatAboutLady singleton = TalkToKatAboutLady();

  @override
  List<String> get commandPathTemplate => [
        'Kat, the guardswoman',
        'Talk',
        '“Who\'s that lady up there?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings") &&
        c.knows(LadyHopeFacts.ladyInKeep) &&
        !c.knows(LadyHopeFacts.ladyHopeName) &&
        !c.hasHappened(evKilledHope))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutLady';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToKatAboutMiguelMissing extends RoamingAction {
  @override
  final String name = 'talk_to_kat_about_miguel_missing';

  static final TalkToKatAboutMiguelMissing singleton =
      TalkToKatAboutMiguelMissing();

  @override
  List<String> get commandPathTemplate => [
        'Kat, the guardswoman',
        'Talk',
        '"Why isn\'t Miguel here?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_kat_greetings") &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        !c.inRoomWith(miguelId) &&
        c.hasHappened(evQuake2))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'She shakes her head. "Left his post. Went inside."\n',
      isRaw: true,
    );
    return '${a.name} successfully performs TalkToKatAboutMiguelMissing';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAboutMiguelMissing';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToKatGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_kat_greetings';

  static final TalkToKatGreetings singleton = TalkToKatGreetings();

  @override
  List<String> get commandPathTemplate => [
        'Guardswoman',
        'Talk',
        '"Greetings."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.inRoomWith(katId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final talkToMiguelAboutBrotherInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Sarn? Doesn\'t ring a bell. Who is he?"\n',
      isRaw: true,
    );
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
            'Miguel looks surprised. "He\'s a warrior, then?"\n',
            isRaw: true,
          );
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
                s.add(
                  '"Ah. He\'s a mender with the Knights," he says.\n',
                  isRaw: true,
                );
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
            '"There are no blacksmiths here." Miguel gestures around, toward the ruins and the forest.\n',
            isRaw: true,
          );
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
                  isRaw: true,
                );
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
                        isRaw: true,
                      );
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
                      s.add(
                        '"Oh!" he says.\n',
                        isRaw: true,
                      );
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
                  '"I know what you\'re driving at. You mean a _mender._ Your Sarn is a mender with the Knights." He nods.\n',
                  isRaw: true,
                );
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
                s.add(
                  '"Oh, you mean a mender," he says.\n',
                  isRaw: true,
                );
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
      '"Well, I don\'t know of a mender called Sarn."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    Ruleset(
      Rule(
        1015144832,
        2,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.inRoomParent('pyramid_entrance') && c.inRoomWith(katId);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Miguel looks over his shoulder at the Pyramid, then back at me. "Even if he is in there, you would not want to get in. You would want to get out."\n\nThe woman looks at him with a mix of puzzlement and exasperation, then she turns to me.\n\n"This place is no longer safe. Orcs, goblins. Unless you have business with one of the farmers, you shouldn\'t go in."\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        389695249,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
  }),
]);
final talkToMiguelAboutDevlingInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_55fca3a2f = w
            .actionHasBeenPerformed("talk_to_kat_about_devling")
        ? '''What Kat said," he says. "I'd just add that'''
        : '''You should probably ask Kat here. She's the smarter and more experienced of us two," he says, flicking his eyes at her briefly. "But I'll say that''';
    final ifBlock_c48d1a8b = !w
            .actionHasBeenPerformed("talk_to_miguel_about_dragon_egg")
        ? '''I've heard locals talk of a device of war called the Dragon Egg.'''
        : '''the Dragon Egg is worth pursuing for someone like you.''';
    s.add(
      '"${ifBlock_55fca3a2f} ${ifBlock_c48d1a8b} If I were you, no offense, I\'d try to find any advantage possible against the orcs and the other creatures of the upside."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"It\'s an ancient device of war, somewhere in the Pyramid." He shrugs. "No one knows if it\'s good or bad, just that it\'s powerful. If I knew more, I\'d go find it myself, ${youngSirSubstitution}."\n',
      isRaw: true,
    );
  }),
]);
final talkToMiguelAboutKilledLadyInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Miguel nods with respect. "So," he says, "you killed Hope?"\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "She was already dead." """.trim(),
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
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"Fair point. You have more in you than meets the eye, ${youngSirSubstitution}."\n',
      isRaw: true,
    );
  }),
]);
final talkToMiguelAboutLadyInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Lady Hope," he says. "Our local undead. Just stands there with that sweet katana at the ready."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(LadyHopeFacts.ladyHopeName);
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Is she dangerous?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Well, she sure _looks_ dangerous, doesn\'t she? But that place she\'s standing in is the dining room of the old Keep. Nobody goes near that place."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Sweet katana?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He smiles. "Didn\'t you notice? She wields the sword like she\'s always ready to slash someone in half. Beautiful weapon."\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);
final talkToMiguelGreetingsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The Knight nods.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Welcome," he says, and there is a bit of sarcasm in his voice.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "I am Aren." """.trim(),
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
    s.add(
      '"Miguel."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.updateActorById(
        miguelId,
        (b) => b
          ..name = 'Miguel'
          ..adjective = null
          ..nameIsProperNoun = true);
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
        '"I\'m looking for a Sarn of Falling Rock."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        w.actionNeverUsed("talk_to_kat_about_brother"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutBrother';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToMiguelAboutDevling extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_devling';

  static final TalkToMiguelAboutDevling singleton = TalkToMiguelAboutDevling();

  @override
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '“Any advice for someone delving in the Pyramid?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.inRoomWith(miguelId) &&
        c.inRoomWith(katId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutDevling';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
        '“What do you know about the Dragon Egg?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.knows(DragonEggFacts.anAncientWeapon))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToMiguelAboutKilledLady extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_killed_lady';

  static final TalkToMiguelAboutKilledLady singleton =
      TalkToMiguelAboutKilledLady();

  @override
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '"I took care of Lady Hope."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.knows(LadyHopeFacts.ladyHopeName) &&
        c.hasHappened(evKilledHope))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "talk_to_miguel_about_killed_lady_ink",
    ));
    return '${a.name} successfully performs TalkToMiguelAboutKilledLady';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutKilledLady';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToMiguelAboutLady extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_about_lady';

  static final TalkToMiguelAboutLady singleton = TalkToMiguelAboutLady();

  @override
  List<String> get commandPathTemplate => [
        'Miguel, the guardsman',
        'Talk',
        '“Who\'s that lady up there?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('pyramid_entrance') != true) {
      return false;
    }
    if (!(c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings") &&
        c.knows(LadyHopeFacts.ladyInKeep) &&
        !c.knows(LadyHopeFacts.ladyHopeName) &&
        !c.hasHappened(evKilledHope))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelAboutLady';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class TalkToMiguelGreetings extends RoamingAction {
  @override
  final String name = 'talk_to_miguel_greetings';

  static final TalkToMiguelGreetings singleton = TalkToMiguelGreetings();

  @override
  List<String> get commandPathTemplate => [
        'Guardsman',
        'Talk',
        '"Greetings."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.inRoomWith(miguelId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToMiguelGreetings';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
    if (c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings")) {
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [dragonEggId, katanaId, sixtyFiverShieldId, hawkmanJacketId],
          especially: [sixtyFiverShieldId],
          how: "{approvingly|with respect}");
    }
  },
  null,
  null,
  parent: 'pyramid_entrance',
  prerequisite: Prerequisite(
    230852794,
    3,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanArrived) &&
          !c.hasHappened(evCaravanDeparted) &&
          c.playerHasVisited('pyramid_entrance', includeVariants: true);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Beasts of burden can be seen (and smelled) from here. The Bleeds is overflowing with them.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 26,
  positionY: 94,
  mapName: 'Pyramid Entrance',
  firstMapName: 'The Pyramid',
  hint: 'This is the only side of the Pyramid that allows access from outside.',
  firstHint:
      'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.',
);
final talkToKatAfterOrcOffensiveInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"It\'s the orcs. They attacked. They took over Oracle\'s observatory, threatened to bring the fight to the farmers. Miguel was right. I cannot leave it be. If you want my help, I\'ll follow you."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
  List<String> get commandPathTemplate => [
        'Kat, the guardswoman',
        'Talk',
        '"What are you doing?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform TalkToKatAfterOrcOffensive';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
    if (c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings")) {
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [dragonEggId, katanaId, sixtyFiverShieldId, hawkmanJacketId],
          especially: [sixtyFiverShieldId],
          how: "{approvingly|with respect}");
    }
  },
  null,
  null,
  parent: 'pyramid_entrance',
  prerequisite: Prerequisite(
    1038023870,
    1,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evOrcOffensive);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The guardswoman is no longer standing in front of the entrance. She is sitting down on a nearby rock, checking her weapon.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 26,
  positionY: 94,
  mapName: 'Pyramid Entrance',
  firstMapName: 'The Pyramid',
  hint: 'This is the only side of the Pyramid that allows access from outside.',
  firstHint:
      'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.',
);
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
    if (c.inRoomWith(miguelId) &&
        w.actionHasBeenPerformed("talk_to_miguel_greetings")) {
      c.describeWorthiness(
          who: w.getActorById(miguelId),
          what: [dragonEggId, katanaId, sixtyFiverShieldId, hawkmanJacketId],
          especially: [sixtyFiverShieldId],
          how: "{approvingly|with respect}");
    }
  },
  null,
  null,
  parent: 'pyramid_entrance',
  prerequisite: Prerequisite(
    609066949,
    4,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) &&
          !c.hasHappened(evCaravanDeparted) &&
          true &&
          true;
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The guardswoman is alone. Her companion has left.\n',
      isRaw: true,
    );
  },
  isIdle: true,
  positionX: 26,
  positionY: 94,
  mapName: 'Pyramid Entrance',
  firstMapName: 'The Pyramid',
  hint: 'This is the only side of the Pyramid that allows access from outside.',
  firstHint:
      'This is the place. The legendary structure built by the ancients, still upright after centuries. The rest of San Francisco is a wild forest.',
);
final Approach bleedsMainFromBleedsTraderHut = Approach(
  'bleeds_trader_hut',
  'bleeds_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach bleedsMainFromGoblinSkirmishPatrol = Approach(
  'goblin_skirmish_patrol',
  'bleeds_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach bleedsMainFromMeadowFight = Approach(
  'meadow_fight',
  'bleeds_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.playerHasVisited('bleeds_main');
  },
);
final Approach bleedsMainFromPyramidEntrance = Approach(
  'pyramid_entrance',
  'bleeds_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class BleedsMainObserveVillage extends RoamingAction {
  @override
  final String name = 'bleeds_main_observe_village';

  static final BleedsMainObserveVillage singleton = BleedsMainObserveVillage();

  @override
  List<String> get commandPathTemplate => [
        'Village',
        'observe',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_473d070da = c.knows(JisadFacts.name)
        ? '''Jisad sits there.'''
        : '''A blind man sits there, wearing a coat.''';
    final ifBlock_646ab8e51 =
        !c.hasHappened(evQuake1) ? '''Something bad is happening.''' : '''''';
    final ifBlock_2464a34ed = c.knows(JisadFacts.name)
        ? '''Jisad sits outside on a stool.'''
        : '''A blind man sits outside on a stool, wearing a coat.''';
    Ruleset(
      Rule(
        934960039,
        2,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return c.hasHappened(evCaravanArrived) &&
              !c.hasHappened(evCaravanDeparted);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'With the caravan, the village is lively. The villagers have their doors open, talking with each other and with the arrivals.\n\nThe talking and commotion is especially vivid near the local trader\'s building. On the other end of the liveliness spectrum, there\'s a small dwelling with a porch here that most people ignore. ${ifBlock_473d070da}\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        21078918,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Whichever direction I look, I can see at least a few villagers going about their business. They all walk fast and seldom talk to each other. ${ifBlock_646ab8e51}\n\nEvery door is shut except for two. One is the entrance into the trader\'s shop. The second open door belongs to a small dwelling with a porch. ${ifBlock_2464a34ed}\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
    c.learn(JisadFacts.blindPerson);

    return '${a.name} successfully performs BleedsMainObserveVillage';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsMainObserveVillage';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room bleedsMain = Room(
  'bleeds_main',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I finally see it. The Pyramid.\n\n![Illustration of a skyscraper with a huge hole in it, but still standing.](pyramid.png)\n\nThe highest tower in the known world, by far. Built ages ago, it still stands — unnaturally well-preserved — above the overgrown rubble that once was a prosperous city of the ancients.\n\nBelow the Pyramid there\'s a small village. Its buildings cluster around the entrance to the towering structure. Later, I learn the locals call the settlement “the Bleeds.”\n\nThere is a trader\'s shop here. A mile to the west, I see a pillar of black smoke rising to the sky.\n\n',
      isRaw: true,
    );
    c.learn(kbTrader);
    c.learn(kbGoblinCampSmoke);

    takeInventory(c);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  isIdle: true,
  positionX: 37,
  positionY: 98,
  mapName: 'The Bleeds',
  firstMapName: 'Some Buildings',
  hint: 'This is a small village close to the entrance to the Pyramid.',
  firstHint:
      'There seems to be a village or at least a homestead next to the Pyramid.',
);
final Approach bleedsTraderHutFromBleedsMain = Approach(
  'bleeds_main',
  'bleeds_trader_hut',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.knows(kbTrader);
  },
);
final bleedsTraderGreetInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The trader shrugs.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"It\'s terrible. Everyone is afraid, nobody buys anything. Well, except for travel gear. But we\'re out of that until the next caravan." He glides his hand over the counter to suggest that there is nothing left.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Afraid of what?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final youngSirSubstitution = c.playerSalutation;
          s.add(
            '"Orcs, goblins, kobolds, you name it," he says. "And I get it, ${youngSirSubstitution}. I get it. San Francisco is getting more dangerous every day. But is it _so_ dangerous we all have to leave?\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Why travel gear?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"People are leaving.\n',
            isRaw: true,
          );
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
      'Even _he_ wants to leave."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'This is the first time I notice a person sitting in one corner of the room, quietly {polishing a strip of leather|sewing two strips of leather together|pinching holes into a strip of leather}. The man introduces himself as Leroy. He is the trader\'s son.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Well why wouldn\'t I leave, father? We all should. What awaits us here? It\'s just... it\'s just..."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The trader shakes his head and interjects, "What awaits us anywhere else?"\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"... death or slavery." Leroy deems his point made, ignoring his father\'s interjection. He goes back to his work.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.learn(kbLeroy);
  }),
]);

class BleedsTraderGoblinSmoke extends RoamingAction {
  @override
  final String name = 'bleeds_trader_goblin_smoke';

  static final BleedsTraderGoblinSmoke singleton = BleedsTraderGoblinSmoke();

  @override
  List<String> get commandPathTemplate => [
        'Leroy',
        '“Can you tell me more about that goblin camp?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_191880c16 = c.playerIsMale ? '''Sir''' : '''Lady''';
    assert(c.inRoomWith(leroyId));

    s.add(
      '\n"It\'s to the west. It doesn\'t seem like there are a lot of goblins there. We thought the Knights would get rid of them for sure."\n\n"But the Knights are leaving," says the trader. He looks at me for reaction and when he doesn\'t get any, he turns back to his son. "The Knights are leaving," he repeats.\n\n',
      isRaw: true,
    );
    c.learn(KnightsFacts.knightsAreLeaving);

    s.add(
      '\n"Well," says Leroy, "if we aren\'t leaving this place like they are, it looks like we\'ll have to learn how to live here, without the Knights. We could take up the fight ourselves."\n\nThe trader groans. "Don\'t be stupid, Leroy."\n\n"I mean it! ${ifBlock_191880c16}, you seem to be an adventurous soul. If you ever want my help, just ask." Leroy points to a chest near where he sits. "I have a long dagger and a decent shield, and I can use both."\n\n',
      isRaw: true,
    );
    w.updateActorById(leroyId, (b) => b.npc.isHireable = true);

    s.add(
      '\n"The hell you can! You\'re a trader, Leroy! You\'re no fighter." Leroy\'s father is shaking. When he remembers that I\'m there with them, he apologizes, then turns back to Leroy. "Son, I forget that you are a grown man now. But... it is my wish that you don\'t go."\n',
      isRaw: true,
    );
    return '${a.name} successfully performs BleedsTraderGoblinSmoke';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsTraderGoblinSmoke';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsTraderGoblins extends RoamingAction {
  @override
  final String name = 'bleeds_trader_goblins';

  static final BleedsTraderGoblins singleton = BleedsTraderGoblins();

  @override
  List<String> get commandPathTemplate => [
        'Trader',
        '“What\'s with all the goblins around here?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_trader_hut') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_trader_greet") &&
        !c.hasHappened(evGoblinCampCleared) &&
        c.inRoomWith(leroyId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The trader bangs on the wooden counter, immediately angry. "Goblins! The suckers are getting cockier and cockier. Among all the problems we have, they\'re the worst. I fear we won\'t get a caravan anytime soon because of them. No caravan means no goods. No goods mean no trade."\n\n',
      isRaw: true,
    );
    assert(c.inRoomWith(leroyId));

    s.add(
      '\nLeroy smiles wryly. "No trade means no money."\n\nHis father looks at him, annoyed. "No money means no food."\n\nLeroy looks as if he wants to add something, but thinks better of it.\n\nThe trader, obviously satisfied, turns back to me. "The suckers are closing in from all sides. A few months ago they wouldn\'t dare approach the Pyramid. But lately, they come much closer."\n\n"I could see the smoke from one of their camps a while back." Leroy talks to his leather strip.\n\n"What smoke?" the trader says.\n\n"There\'s a camp to the west," Leroy says. "Less than a mile from here."\n\n"There\'s a goblin camp _less_ _than_ _a_ _mile_ from the Bleeds? How do I not know this?"\n\nLeroy seems genuinely surprised. "I thought you knew. Everyone knows."\n\n',
      isRaw: true,
    );
    c.learn(kbLeroyKnowsGoblinSmoke);

    return '${a.name} successfully performs BleedsTraderGoblins';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsTraderGoblins';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsTraderGreet extends RoamingAction {
  @override
  final String name = 'bleeds_trader_greet';

  static final BleedsTraderGreet singleton = BleedsTraderGreet();

  @override
  List<String> get commandPathTemplate => [
        'Trader',
        '“How is business?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_trader_hut') != true) {
      return false;
    }
    if (!(c.inRoomWith(leroyId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "bleeds_trader_greet_ink",
    ));
    return '${a.name} successfully performs BleedsTraderGreet';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsTraderGreet';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsTraderTellAboutClearedCamp extends RoamingAction {
  @override
  final String name = 'bleeds_trader_tell_about_cleared_camp';

  static final BleedsTraderTellAboutClearedCamp singleton =
      BleedsTraderTellAboutClearedCamp();

  @override
  List<String> get commandPathTemplate => [
        'Trader',
        '“No need to worry about that camp anymore.”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '“What happened?”\n\nI describe the battle to him.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs BleedsTraderTellAboutClearedCamp';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsTraderTellAboutClearedCamp';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room bleedsTraderHut = Room(
  'bleeds_trader_hut',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      '${weSubstitutionCapitalized} enter a small building made of stone. It\'s dark in here but cozy.\nA gray-haired trader greets me and gestures around.\n\n"Everything is for sale. And for a good price, too."\n\nI don\'t really have any money, so I just nod and smile.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    s.add(
      'The trader {nods|pretends to smile} as ${weSubstitution} enter his shop.\n\n',
      isRaw: true,
    );
    if (c.inRoomWith(leroyId) &&
        w.getActorById(leroyId).anatomy.isUndead &&
        !c.hasHappened(evJisadSeesUndeadLeroy)) {
      s.add(
          'He then takes a second look at his son, and freezes. After a long while of silence, he turns to me. "Please have mercy on the soul of this young boy," he says, his eyes wet. "Please release him from... this. Please give him back his death." He looks back at Leroy, and then down on the wooden counter.',
          wholeSentence: true);
      w.recordCustom(evJisadSeesUndeadLeroy);
    }
  },
  null,
  null,
  isIdle: true,
  positionX: 41,
  positionY: 96,
  mapName: 'Trader\'s Shop',
  firstMapName: 'Trader\'s Shop',
  hint:
      'The shop of the local trader and his son, Leroy. Sells basic items for the inhabitants of the Bleeds and for the farmers of the Pyramid.',
  firstHint:
      'A mossy, stone building without a porch. The sign "Trader" is written above a window in simple graffiti letters.',
);
final bleedsBlindGuideBigOInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Jisad points to the top of the Pyramid, or at least where he thinks it is. He\'s not too far off, considering his blindness. "The wizard." He puts his hand down and spits. "Or at least that\'s what everyone assumes."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
          s.add(
            '"Yeah, well, he\'s a secretive fella. All we\n',
            isRaw: true,
          );
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
          final youngSirSubstitution = c.playerSalutation;
          s.add(
            '"He\'s all the way up there, ${youngSirSubstitution}. It\'s not like we can pay him a visit, and he has not come down my entire life. All I\n',
            isRaw: true,
          );
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
      'know is that there\'s someone up there, above the orcs. People say there are strange lights coming out of those top floors some nights."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    s.add(
      '"I don\'t think I\'ve met the fella. Sorry. Ask around."\n',
      isRaw: true,
    );
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
          s.add(
            '"That depends. What was he doing here?"\n',
            isRaw: true,
          );
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
                  '"Well, then, ask the Knights. Most of them are still here, though the lot are trying to leave as we speak." Jisad shrugs.\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
                s.add(
                  '"You can also always\n',
                  isRaw: true,
                );
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
                  'Jisad nods solemnly. "Well then, you will have to ask everybody, won\'t you? Or, of course, if you make it that far, you can\n',
                  isRaw: true,
                );
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
            'ask Oracle. She\'s the most knowledgeable of us all."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      isRaw: true,
    );
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
          s.add(
            '"Goodbye."\n',
            isRaw: true,
          );
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
            isRaw: true,
          );
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
                final youngSirSubstitution = c.playerSalutation;
                s.add(
                  '"I wasn\'t finished, ${youngSirSubstitution}. Goblins are dangerous, sure, but you\'re unlikely to find them in the Pyramid.\n',
                  isRaw: true,
                );
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
                  isRaw: true,
                );
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
            'You are unlikely to beat the orcs alone, with whatever weapons you have brought. As always, it\'s best to find friends, allies. There are powerful devices of war to be had in the Pyramid, like the Dragon Egg or a katana."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He scratches just under one of his unseeing eyes.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"And remember, you can always just turn around and run away from here."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.learn(DragonEggFacts.anAncientWeapon);
          c.learn(DelvingFacts.knowledge);
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
      '"It\'s supposed to be a powerful device of war. Not sure where it is, but I don\'t think anyone has it, or we\'d know about it, I\'m sure. Maybe it\'s lost somewhere. I kind of hope it is."\n',
      isRaw: true,
    );
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
      isRaw: true,
    );
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
            isRaw: true,
          );
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
                  isRaw: true,
                );
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
                  isRaw: true,
                );
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
      isRaw: true,
    );
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
            isRaw: true,
          );
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
          s.add(
            '"Well, that\'s good to know."\n',
            isRaw: true,
          );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
            '"I know a lot about this place, and because I am — you know — blind, everyone around here calls me the blind guide." He smiles and leans over, lowering his voice. "I think they find it funny."\n',
            isRaw: true,
          );
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
                final ifBlock_3c961d43e = c.playerHasWoodenFoot
                    ? '''I'm guessing you've heard your share of jokes like that, and worse, judging from the sound one of your feet makes. '''
                    : '''''';
                s.add(
                  'He nods. "${ifBlock_3c961d43e}And your name?"\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" "I'm sorry." """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'He shrugs. "I don\'t mind it. At least they acknowledge I\'m useful. I wouldn\'t trade nicknames with {Flatfoot Herman|Ham Fist Felix} over there, for example." He nods in the general direction of the center of the village and laughs. "What\'s your name?"\n',
                  isRaw: true,
                );
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
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_68f52de56 = c.playerHasAsthma
              ? '''I have a bout of coughing but soon get it under control.'''
              : '''''';
          final ifBlock_4f472a646 = c.playerHasBurntFace
              ? '''It is so nice to talk to someone who does not see my face.'''
              : '''''';
          s.add(
            '${ifBlock_68f52de56}${ifBlock_4f472a646}\n',
            isRaw: true,
          );
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
      '"Welcome to San Francisco, Aren." Jisad spreads his arms and pretends to look around with his unseeing eyes. "Beautiful, no?" He grins. I take in the ruins, overgrown with redwood trees, and the shacks of the Bleeds nestled among them.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"You just arrived. Must be tired. I\'ll give you this." He pulls up a green apple. "It\'s a Fruit grown on the Slopes of the Pyramid."\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Looks like an ordinary apple." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He laughs. "And it isn\'t! Much more invigorating than a normal fruit, you\'ll find."\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Thank you." """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"You are welcome."\n',
            isRaw: true,
          );
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
      'I take the apple.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.giveNewItemToPlayer(jisadApple);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"The next one will not be for free, Aren."\n',
      isRaw: true,
    );
  }),
]);
final bleedsBlindGuideOracleInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"What, you\'re still here? Damn, ${youngSirSubstitution}, you\'re persistent." Jisad clicks with his tongue. "Oracle. She\'s not been here as long as I, but she knows more about this place than anyone."\n',
      isRaw: true,
    );
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
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He sighs. "You\'ll find her\n',
            isRaw: true,
          );
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
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He shifts. "I remember more. But, the books she reads remember yet more. She trades that information, and other news she acquires,\n',
            isRaw: true,
          );
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
      'on the east side of the Pyramid. She has a room just below the Battlefield floor. Quite dangerous, this close to the orcs. But the height gives her an advantage. A better view of the surroundings."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      '"I was here when the orcs first came, when they took over the very top of the Pyramid. I think they came with Big O, or at least their coming woke Big O to activity." He sniffs. "The orcs later pushed down, taking the Lair of God, desecrating it with some vile creature."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Jisad shakes his head.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"I have been here for a long time, ${youngSirSubstitution}. But I don\'t know why they came or what they are doing."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
    final youngSirSubstitution = c.playerSalutation;
    s.add(
      '"Yes, ${youngSirSubstitution}. We have these quite often, at least one a day. They don\'t seem to be too serious, thank the Eight Gods."\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
            '"Why does anything happen? Why is the wind blowing, ruffling our hair? Why is the sea full of salt and hatred? Why are birds singing, instead of just yelling like the other animals?" He shrugs. "These are questions for the gods, not for a blind man."\n',
            isRaw: true,
          );
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
          s.add(
            'Jisad nods.\n',
            isRaw: true,
          );
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
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
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
      command: r""" "Why is all this happening?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '"Because magic is power, and power corrupts. This place is _infused_ with magic. And the world has noticed."\n',
            isRaw: true,
          );
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
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "Why are you staying here?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The blind man sighs. "Where would I go?" he says. "What would I do? No. However bad this place gets, I\'ll stay. The Pyramid gave me everything I have — good or bad. I will see this love-hate relationship to the bitter end."\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);

class BleedsBlindGuideBigO extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_big_o';

  static final BleedsBlindGuideBigO singleton = BleedsBlindGuideBigO();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“Who is Big O?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideBigO';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideBrother extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_brother';

  static final BleedsBlindGuideBrother singleton = BleedsBlindGuideBrother();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '"I\'m looking for a Sarn of Falling Rock."',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideBrother';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideDelving extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_delving';

  static final BleedsBlindGuideDelving singleton = BleedsBlindGuideDelving();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“Any advice for someone delving in the Pyramid?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideDelving';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideDragonEgg extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_dragon_egg';

  static final BleedsBlindGuideDragonEgg singleton =
      BleedsBlindGuideDragonEgg();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“What do you know about the Dragon Egg?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideDragonEgg';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideGoblins extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_goblins';

  static final BleedsBlindGuideGoblins singleton = BleedsBlindGuideGoblins();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“The goblins are new here?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_whats_wrong"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideGoblins';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideGreet extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_greet';

  static final BleedsBlindGuideGreet singleton = BleedsBlindGuideGreet();

  @override
  List<String> get commandPathTemplate => [
        'Blind man',
        '“Greetings.”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.knows(JisadFacts.blindPerson) && !c.knows(JisadFacts.name))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideGreet';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideOracle extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_oracle';

  static final BleedsBlindGuideOracle singleton = BleedsBlindGuideOracle();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '"Who\'s Oracle?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideOracle';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideOrcs extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_orcs';

  static final BleedsBlindGuideOrcs singleton = BleedsBlindGuideOrcs();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“What are the orcs doing in the Pyramid?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideOrcs';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideQuake1 extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_quake_1';

  static final BleedsBlindGuideQuake1 singleton = BleedsBlindGuideQuake1();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“Was that an earthquake?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideQuake1';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BleedsBlindGuideWhatsWrong extends RoamingAction {
  @override
  final String name = 'bleeds_blind_guide_whats_wrong';

  static final BleedsBlindGuideWhatsWrong singleton =
      BleedsBlindGuideWhatsWrong();

  @override
  List<String> get commandPathTemplate => [
        'Jisad',
        'Talk',
        '“What\'s wrong here?”',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(w.actionHasBeenPerformed("bleeds_blind_guide_greet"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BleedsBlindGuideWhatsWrong';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final sarnTalkInBleedsInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Sarn doesn\'t answer. He rocks back and forth and doesn\'t even look up.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" "Do you hear me?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Sarn nods, almost imperceptibly. But the rocking continues, and\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" "What happened to you?" """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Sarn continues rocking, and\n',
            isRaw: true,
          );
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
      'he keeps staring into distance.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_2bc5a45df = c.playerHasWoodenFoot
        ? '''My left foot starts to itch. The foot that isn't there anymore.'''
        : '''''';
    final ifBlock_62228cd9f = c.playerHasAsthma
        ? '''I feel my lungs constrict. I fight off the urge to cough, and I remember the cold, cold nights after my brother left.'''
        : '''''';
    final ifBlock_3528db50c = c.playerHasBurntFace
        ? '''My right hand touches the burnt side of my face.'''
        : '''''';
    s.add(
      'Did I travel all this way, did I go through all this, for nothing? ${ifBlock_2bc5a45df}${ifBlock_62228cd9f}${ifBlock_3528db50c}\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I have to finish this. My brother left to seek his adventure, leaving my father and me in poverty and misery. I don\'t owe him anything. But the people living here, under the tyranny of whoever it is at the top, deserve my help.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I will show my brother what it is to be a decent human being.\n',
      isRaw: true,
    );
  }),
]);

class SarnExamineHisHammer extends RoamingAction {
  @override
  final String name = 'sarn_examine_his_hammer';

  static final SarnExamineHisHammer singleton = SarnExamineHisHammer();

  @override
  List<String> get commandPathTemplate => [
        'Sarn\'s hammer',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
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
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The hammer is extremely well made and menacing.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs SarnExamineHisHammer';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnExamineHisHammer';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class SarnReadLetter extends RoamingAction {
  @override
  final String name = 'sarn_read_letter';

  static final SarnReadLetter singleton = SarnReadLetter();

  @override
  List<String> get commandPathTemplate => [
        'Inventory',
        'Letter from my father',
        'Read to Sarn',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn) && c.hasItem(letterFromFatherId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I hope father\'s handwriting and his talk of "dull mountains" might bring Sarn\'s mind back from wherever it is.\n\nHe listens intently. There seems to be a little bit of recognition in his face. By the time I finish reading, he looks happier.\n\nBut, moments later, his face wipes again, and he continues rocking back and forth.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs SarnReadLetter';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnReadLetter';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class SarnTakeHisHammer extends RoamingAction {
  @override
  final String name = 'sarn_take_his_hammer';

  static final SarnTakeHisHammer singleton = SarnTakeHisHammer();

  @override
  List<String> get commandPathTemplate => [
        'Sarn\'s hammer',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the hammer.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(sarnHammer);

    return '${a.name} successfully performs SarnTakeHisHammer';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnTakeHisHammer';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class SarnTalkInBleeds extends RoamingAction {
  @override
  final String name = 'sarn_talk_in_bleeds';

  static final SarnTalkInBleeds singleton = SarnTalkInBleeds();

  @override
  List<String> get commandPathTemplate => [
        'Sarn',
        'Talk',
        '"What happened up there?"',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('bleeds_main') != true) {
      return false;
    }
    if (!(c.hasHappened(evSavedSarn))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "sarn_talk_in_bleeds_ink",
    ));
    return '${a.name} successfully performs SarnTalkInBleeds';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform SarnTalkInBleeds';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'bleeds_main',
  prerequisite: Prerequisite(
    1072163588,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanArrived) &&
          !c.hasHappened(evCaravanDeparted);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The road that leads from the Pyramid entrance into the forest of San Francisco, passing through the Bleeds, is full of wagons, bulls, and new people. A caravan has arrived. They\'re clearly not stopping for long. The bulls are still in their harnesses, the people are not sitting down, and there is nobody setting up tents.\n\nThere is some commotion around the trader\'s shop, not surprisingly. People are moving goods through the back.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  isIdle: true,
  positionX: 37,
  positionY: 98,
  mapName: 'The Bleeds',
  firstMapName: 'Some Buildings',
  hint: 'This is a small village close to the entrance to the Pyramid.',
  firstHint:
      'There seems to be a village or at least a homestead next to the Pyramid.',
);
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
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'bleeds_main',
  prerequisite: Prerequisite(
    497066215,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evCaravanDeparted) && !c.hasHappened(evOrcOffensive);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_370faf1ba = c.playerHasVisited("bleeds_main_during_caravan")
        ? '''The caravan has left.'''
        : '''''';
    s.add(
      'The road is covered in recent footprints and hoofprints. The air faintly smells of bulls. ${ifBlock_370faf1ba}\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  isIdle: true,
  positionX: 37,
  positionY: 98,
  mapName: 'The Bleeds',
  firstMapName: 'Some Buildings',
  hint: 'This is a small village close to the entrance to the Pyramid.',
  firstHint:
      'There seems to be a village or at least a homestead next to the Pyramid.',
);
final Room bleedsMainAfterQuake1 = Room(
  'bleeds_main_after_quake_1',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I finally see it. The Pyramid.\n\n![Illustration of a skyscraper with a huge hole in it, but still standing.](pyramid.png)\n\nThe highest tower in the known world, by far. Built ages ago, it still stands — unnaturally well-preserved — above the overgrown rubble that once was a prosperous city of the ancients.\n\nBelow the Pyramid there\'s a small village. Its buildings cluster around the entrance to the towering structure. Later, I learn the locals call the settlement “the Bleeds.”\n\nThere is a trader\'s shop here. A mile to the west, I see a pillar of black smoke rising to the sky.\n\n',
      isRaw: true,
    );
    c.learn(kbTrader);
    c.learn(kbGoblinCampSmoke);

    takeInventory(c);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'bleeds_main',
  prerequisite: Prerequisite(
    477348122,
    2,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake1) && !c.hasHappened(evCaravanArrived);
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Small damage after the quake. But locals seem to take it in stride. Is this normal here?\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  isIdle: true,
  positionX: 37,
  positionY: 98,
  mapName: 'The Bleeds',
  firstMapName: 'Some Buildings',
  hint: 'This is a small village close to the entrance to the Pyramid.',
  firstHint:
      'There seems to be a village or at least a homestead next to the Pyramid.',
);
final Room bleedsMainAfterQuake2 = Room(
  'bleeds_main_after_quake_2',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I finally see it. The Pyramid.\n\n![Illustration of a skyscraper with a huge hole in it, but still standing.](pyramid.png)\n\nThe highest tower in the known world, by far. Built ages ago, it still stands — unnaturally well-preserved — above the overgrown rubble that once was a prosperous city of the ancients.\n\nBelow the Pyramid there\'s a small village. Its buildings cluster around the entrance to the towering structure. Later, I learn the locals call the settlement “the Bleeds.”\n\nThere is a trader\'s shop here. A mile to the west, I see a pillar of black smoke rising to the sky.\n\n',
      isRaw: true,
    );
    c.learn(kbTrader);
    c.learn(kbGoblinCampSmoke);

    takeInventory(c);
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  null,
  null,
  parent: 'bleeds_main',
  prerequisite: Prerequisite(
    580504930,
    3,
    true,
    (ApplicabilityContext c) {
      final WorldState w = c.world;
      final Simulation sim = c.simulation;
      final Actor a = c.actor;
      return c.hasHappened(evQuake2) &&
          !c.hasHappened(evCaravanDeparted) &&
          c.playerHasVisited("bleeds_main_during_caravan");
    },
  ),
  variantUpdateDescribe: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The people are quite a bit more nervous than before. There is talk about a farmer falling to his death on the Slopes.\n\n',
      isRaw: true,
    );
    c.describeWorthiness(
        who: bleedsVillagers,
        what: [
          lairOfGodStarId,
          akxeId,
          sixtyFiverShieldId,
          hawkmanJacketId,
          dragonEggId,
          familyPortraitId,
          katanaId,
          compassId
        ],
        especially: [hawkmanJacketId, dragonEggId, katanaId],
        how: "{approvingly|with respect}");

    c.increaseSanityFromPeople();
  },
  isIdle: true,
  positionX: 37,
  positionY: 98,
  mapName: 'The Bleeds',
  firstMapName: 'Some Buildings',
  hint: 'This is a small village close to the entrance to the Pyramid.',
  firstHint:
      'There seems to be a village or at least a homestead next to the Pyramid.',
);
final Approach goblinSkirmishPatrolFromBleedsMain = Approach(
  'bleeds_main',
  'goblin_skirmish_patrol',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  isApplicable: (ApplicabilityContext c) {
    final WorldState w = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    return c.knows(kbGoblinCampSmoke);
  },
);
final Approach goblinSkirmishPatrolFromGoblinSkirmishMain = Approach(
  'goblin_skirmish_main',
  'goblin_skirmish_patrol',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Room goblinSkirmishPatrol = Room(
  'goblin_skirmish_patrol',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'There is no path in the direction of the smoke. ${weSubstitutionCapitalized} go through the brush and step over logs and ancient rubble.\n\nWhen ${weSubstitution} come out of a particularly nasty shrub, I hear a short, guttural sound. I look up and see a lone goblin with a gray spear. The goblin is completely white — even his eyebrows are unpigmented.\n\n"You lost, peasant?"\n\nHe doesn\'t wait for an answer and readies a spear. The spear is painted white: as white as the albino\'s skin.\n\nThe goblin is starting to advance toward me.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateBleedsGoblinSkirmishPatrol,
  null,
  positionX: 15,
  positionY: 97,
  mapName: 'Wilderness near the Bleeds',
  firstMapName: 'Smoke',
  hint: 'It\'s the place where I met the albino goblin.',
  firstHint:
      'The smoke is as black as death but the pillar is narrow. Looks like nothing more than a campfire. Someone is not afraid to be found.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over.\n',
      isRaw: true,
    );
  },
);

class ListenContinue extends RoamingAction {
  @override
  final String name = 'listen_continue';

  static final ListenContinue singleton = ListenContinue();

  @override
  List<String> get commandPathTemplate => [
        'Goblins',
        'Continue listening',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evGoblinCampCleared) &&
        w.actionHasBeenPerformed("listen_to_them_arguing"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"The only reason we are here, flathead, is the graytower." This is the lower voice of the higher rank. "Look at the device."\n\nThe lower rank starts to growl but apparently thinks better of it. "The come-pass is just a stupid piece of metal. Its maker wants us here, _around_ the graytower. Not _in_ it."\n\n"Oh, you know what the maker wants, do you?"\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ListenContinue';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ListenContinue';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ListenMore extends RoamingAction {
  @override
  final String name = 'listen_more';

  static final ListenMore singleton = ListenMore();

  @override
  List<String> get commandPathTemplate => [
        'Goblins',
        'Continue listening',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evGoblinCampCleared) &&
        w.actionHasBeenPerformed("listen_continue"))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The two goblins say no more.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ListenMore';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ListenMore';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ListenToThemArguing extends RoamingAction {
  @override
  final String name = 'listen_to_them_arguing';

  static final ListenToThemArguing singleton = ListenToThemArguing();

  @override
  List<String> get commandPathTemplate => [
        'Goblins',
        'Listen',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evGoblinCampCleared))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '"Why not go now?" a goblin says in a screeching voice. "They are weak. It will be an easy take."\n\n"How do you know they are weak?" This other goblin\'s voice is lower. That tells me he is ranked above the first one. "They can have a platoon of guards."\n\n"Amak was there. He saw no guards!"\n\n"Amak is a fool, and so are you," the higher rank says. "The guards can be in the graytower." He means the Pyramid.\n\n"Another reason not to go to the big building. Let\'s raid instead!"\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ListenToThemArguing';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ListenToThemArguing';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class ObserveGoblinCamp extends RoamingAction {
  @override
  final String name = 'observe_goblin_camp';

  static final ObserveGoblinCamp singleton = ObserveGoblinCamp();

  @override
  List<String> get commandPathTemplate => [
        'Goblins',
        'Peek',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.hasHappened(evGoblinCampCleared))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitution = getWeOrI(a, sim, originalWorld, capitalized: false);
    s.add(
      'I gingerly look over the tree stump and see a campground with a fire pit and a small shelter made of some animal\'s hide. There are three goblins, not two. The third goblin is sleeping. There may be more that I don\'t see, but looking at the size of the campground, it\'s not likely.\n\nThis will not be an easy fight if I choose to attack. But ${weSubstitution} do have the element of surprise.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs ObserveGoblinCamp';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ObserveGoblinCamp';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Approach goblinSkirmishMainFromGoblinSkirmishPatrol = Approach(
  'goblin_skirmish_patrol',
  'goblin_skirmish_main',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class BarbecuedSquirrelExamine extends RoamingAction {
  @override
  final String name = 'barbecued_squirrel_examine';

  static final BarbecuedSquirrelExamine singleton = BarbecuedSquirrelExamine();

  @override
  List<String> get commandPathTemplate => [
        'Barbecued squirrel',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.getRoomRoaming().monstersAlive)) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'It\'s a meaty squirrel, western gray from the looks of it, thoroughly barbecued and impaled with a thin wooden stick. No one has touched it yet.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs BarbecuedSquirrelExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BarbecuedSquirrelExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class BarbecuedSquirrelTake extends RoamingAction {
  @override
  final String name = 'barbecued_squirrel_take';

  static final BarbecuedSquirrelTake singleton = BarbecuedSquirrelTake();

  @override
  List<String> get commandPathTemplate => [
        'Barbecued Squirrel',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.getRoomRoaming().monstersAlive &&
        w.actionHasBeenPerformed('barbecued_squirrel_examine'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I put it in my bag. It smells great.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(barbecuedSquirrel);

    return '${a.name} successfully performs BarbecuedSquirrelTake';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform BarbecuedSquirrelTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class CompassExamine extends RoamingAction {
  @override
  final String name = 'compass_examine';

  static final CompassExamine singleton = CompassExamine();

  @override
  List<String> get commandPathTemplate => [
        'Device',
        'Examine',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.getRoomRoaming().monstersAlive)) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A curious, crude device. Round as a pebble, slightly translucent, with a dark spot that moves as I rotate the device. The dark spot always points to one direction. It\'s like a compass. It currently points slightly upwards and toward the Pyramid.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs CompassExamine';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CompassExamine';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class CompassTake extends RoamingAction {
  @override
  final String name = 'compass_take';

  static final CompassTake singleton = CompassTake();

  @override
  List<String> get commandPathTemplate => [
        'Compass',
        'Take',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    if (!(!c.getRoomRoaming().monstersAlive &&
        w.actionHasBeenPerformed('compass_examine'))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the compass and add it to the items I carry.\n\n',
      isRaw: true,
    );
    c.giveNewItemToPlayer(compass);

    return '${a.name} successfully performs CompassTake';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CompassTake';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class GoblinCampAttack extends RoamingAction {
  @override
  final String name = 'goblin_camp_attack';

  static final GoblinCampAttack singleton = GoblinCampAttack();

  @override
  List<String> get commandPathTemplate => [
        'Goblins',
        'Attack',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('goblin_skirmish_main') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    Ruleset(
      Rule(
        209276019,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return w.actionHasBeenPerformed("observe_goblin_camp");
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' ${weSubstitutionCapitalized} leap from hiding and charge the goblins. I run past the sleeping goblin and easily kill him as he\'s waking up.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        21199514,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' ${weSubstitutionCapitalized} leap from hiding and charge the goblins. The two I heard arguing sit next to a fire pit. There is another one, sleeping on the ground, close to where I start my attack. I run past him and easily kill him as he\'s waking up.\n',
            isRaw: true,
          );
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
    s.add(
      '\nThe goblins near the fire pit stand up. One of them, I realize, is almost naked and doesn\'t have a weapon near him. He grabs a branch from the fire.\n\nThe other one, the one I decide looks like the leader of the group, readies a razor-sharp, evil-looking hatchet. An ugly scar slants through his face.\n\n"Amak, you f—" he starts saying, but then I am already on him.\n\n',
      isRaw: true,
    );
    c.startOptionalFight();

    return '${a.name} successfully performs GoblinCampAttack';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform GoblinCampAttack';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => true;
}

final Room goblinSkirmishMain = Room(
  'goblin_skirmish_main',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final weSubstitutionCapitalized =
        getWeOrI(a, sim, originalWorld, capitalized: true);
    s.add(
      'Suddenly, I hear voices ahead. Two goblins are arguing about something. ${weSubstitutionCapitalized} find a hiding spot behind a tree stump and lay low.\n',
      isRaw: true,
    );
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateGoblinCampFight,
  null,
  fightIsOptional: true,
  positionX: 7,
  positionY: 95,
  mapName: 'Goblin Camp',
  firstMapName: 'Closer to the Smoke Stack',
  hint: 'A shared place of rest for the goblins who travel through here.',
  firstHint: 'Not too far to the source of the smoke now.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'The fight is over, and now I have time to look the camp over. It has clearly been used before: the ground is compacted near the fire, and there are old squirrel bones all over the place. (The killed goblins were about to add another set of bones to the disarray: there\'s a barbecued squirrel on a stick next to the fire.)\n\nThis must be a shared place of rest for the goblins who travel through here. But on what journey?\n\nThere\'s a bag on the ground, and peeking out of it, a curious device.\n\n',
      isRaw: true,
    );
    c.markHappened(evGoblinCampCleared);
  },
  whereDescription: 'near the campfire',
);
final Approach startFromPreStartBook = Approach(
  'pre_start_book',
  'start',
  r'$IMPLICIT',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final startInkInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I am finally here, in the ancient ruins of San Francisco. I have reached my destination at last. My brother is here, somewhere in this dense forest, among fragments of a long-lost civilization.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with black hair >> ... and a hideous burn over the right side of my face. ((Others will be repulsed by the gruesome sight.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 0, 0);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with black hair >> ... and a wooden stump where my left foot used to be. ((The stump will make me less nimble and more conspicuous.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 0, 1);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with black hair >> ... and asthma. ((The illness is a constant nightmare, causing coughing fits and reducing stamina.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 0, 2);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with brown hair >> ... and a hideous burn over the right side of my face. ((Others will be repulsed by the gruesome sight.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 1, 0);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with brown hair >> ... and a wooden stump where my left foot used to be. ((The stump will make me less nimble and more conspicuous.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 1, 1);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with brown hair >> ... and asthma. ((The illness is a constant nightmare, causing coughing fits and reducing stamina.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 1, 2);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with blond hair >> ... and a hideous burn over the right side of my face. ((Others will be repulsed by the gruesome sight.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 2, 0);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with blond hair >> ... and a wooden stump where my left foot used to be. ((The stump will make me less nimble and more conspicuous.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 2, 1);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young woman >> ... with blond hair >> ... and asthma. ((The illness is a constant nightmare, causing coughing fits and reducing stamina.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(0, 2, 2);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with black hair >> ... and a hideous burn over the right side of my face. ((Others will be repulsed by the gruesome sight.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 0, 0);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with black hair >> ... and a wooden stump where my left foot used to be. ((The stump will make me less nimble and more conspicuous.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 0, 1);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with black hair >> ... and asthma. ((The illness is a constant nightmare, causing coughing fits and reducing stamina.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 0, 2);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with brown hair >> ... and a hideous burn over the right side of my face. ((Others will be repulsed by the gruesome sight.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 1, 0);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with brown hair >> ... and a wooden stump where my left foot used to be. ((The stump will make me less nimble and more conspicuous.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 1, 1);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with brown hair >> ... and asthma. ((The illness is a constant nightmare, causing coughing fits and reducing stamina.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 1, 2);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with blond hair >> ... and a hideous burn over the right side of my face. ((Others will be repulsed by the gruesome sight.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 2, 0);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with blond hair >> ... and a wooden stump where my left foot used to be. ((The stump will make me less nimble and more conspicuous.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 2, 1);
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" I am a young man >> ... with blond hair >> ... and asthma. ((The illness is a constant nightmare, causing coughing fits and reducing stamina.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          c.recordCharacterChoice(1, 2, 2);
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
      'I am also a necromancer. I can raise the dead, although not very well yet.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_a78affd5 = c.outputWorld
            .build()
            .customHistory
            .query(name: 'player_is_male')
            .hasHappened
        ? '''his'''
        : '''her''';
    s.add(
      'I am here with Tamara, the deserter. She is the hired sword for my expedition. It is unwise for a young necromancer to be traveling on ${ifBlock_a78affd5} own.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Tamara has just finished telling me, for the hundredth time, what a stupid idea it was to come here. I tell her there\'s nothing to worry about. The tales about goblins and orcs in the forests of San Francisco are exaggerated.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'Then of course, a moment later, I\'m proven wrong.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '![Illustration of a ferocious goblin is stepping out of a bush, holding a sword](goblin.png)\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'A goblin, bloodlust in his eyes, emerges from his hiding place to stand a few paces in front of us. I look around to see if there are more, but no. He is alone.\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command:
          r""" Run ((This is a goblin: a killing machine. No one would fault me for fleeing a fight I will hardly win.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_549bd7b58 = c.playerHasWoodenFoot
              ? '''My wooden stump doesn't help.'''
              : '''''';
          s.add(
            'Tamara seems pleased with this course of action at first. But the agile goblin runs faster through the overgrowth. ${ifBlock_549bd7b58} A few heartbeats later, he\'s almost on us.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_72e7100f8 = c.playerHasAsthma
              ? '''I wheeze and cough. The damn asthma.'''
              : '''''';
          s.add(
            'He slashes Tamara\'s leg and she goes down. There is no more running now. ${ifBlock_72e7100f8} But I am able to pick up a solid branch from the ground and I have the initiative now.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(
              tamaraId,
              (b) => b
                ..pose = Pose.onGround
                ..initiative = 0
                ..inventory.add(tamarasDagger));
          w.updateActorById(firstGoblinId, (b) => b.initiative = 10);
          w.updateActorById(
              playerId, (b) => b.inventory.equip(startBranch, a.anatomy));
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The goblin growls like a wolf, standing above Tamara. She\'s had time to draw her battered sword but not much else. The goblin\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" Attack ((There is no way around this. The goblin is clearly set on fighting us. May as well seize the initiative before more of them show up.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final youngSirSubstitution = c.playerSalutation;
          s.add(
            '"I escape war only to be dragged into _this_ mess?" Tamara says through gritted teeth. But she moves forward, pointing her battered sword at the goblin. With her other hand, she hands me her dagger. "You\'ll need it, ${youngSirSubstitution}."\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.updateActorById(
              playerId, (b) => b.inventory.equip(tamarasDagger, a.anatomy));
          w.updateActorById(firstGoblinId, (b) => b.initiative = 0);
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The goblin is out of the brush and ready to fight. He gnashes his teeth and snarls. He\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command:
          r""" Wait ((It could be a trap. Or the goblin could decide we are more than he can chew. Either way, a little caution might save our necks.)) """
              .trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final youngSirSubstitution = c.playerSalutation;
          s.add(
            'Tamara nods. She points her battered sword at the goblin but doesn\'t move. "Take my dagger, ${youngSirSubstitution}," she says and holds the dagger out toward me, handle-first.\n',
            isRaw: true,
          );
        }),
        InkForkNode([
          InkChoiceNode(
            command: r""" Take the dagger. """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                w.updateActorById(playerId,
                    (b) => b.inventory.equip(tamarasDagger, a.anatomy));
              }),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'I take the dagger and point it at the goblin. It\'s surprisingly heavy but well balanced.\n',
                  isRaw: true,
                );
              }),
              InkParagraphNode((c) => c.outputStoryline.addParagraph()),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'The goblin attacks. As he runs toward us, he\n',
                  isRaw: true,
                );
              }),
            ],
          ),
          InkChoiceNode(
            command: r""" Take a rock from the ground instead. """.trim(),
            consequence: [
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                w.updateActorById(
                    tamaraId, (b) => b.inventory.add(tamarasDagger));
                w.updateActorById(playerId,
                    (b) => b.inventory.equip(rockFromMeadow, a.anatomy));
              }),
              InkParagraphNode((ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  'I pick up a mossy rock that sits right next to my right foot. It\'s hard and heavy in my palm. As soon as I straighten with the rock in my hand, the goblin attacks. As he runs toward us, he\n',
                  isRaw: true,
                );
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
      'aims his rusty sword, grinning.\n',
      isRaw: true,
    );
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
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('start_bogus_location') != true) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
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
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform StartInk';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room start = Room(
  'start',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "start_ink_ink",
    ));
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  null,
  null,
);
final Approach meadowFightFromBleedsMain = Approach(
  'bleeds_main',
  'meadow_fight',
  '',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);
final Approach meadowFightFromStart = Approach(
  'start',
  'meadow_fight',
  r'$IMPLICIT',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
);

class FirstPyramidApproach extends RoamingAction {
  @override
  final String name = 'first_pyramid_approach';

  static final FirstPyramidApproach singleton = FirstPyramidApproach();

  @override
  List<String> get commandPathTemplate => [
        'Path',
        'Press onwards',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('meadow_fight') != true) {
      return false;
    }
    if (!(!c.getRoomRoaming().monstersAlive)) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.movePlayer('bleeds_main');

    return '${a.name} successfully performs FirstPyramidApproach';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform FirstPyramidApproach';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final Room meadowFight = Room(
  'meadow_fight',
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
  },
  (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '',
      isRaw: true,
    );
  },
  generateStartFight,
  null,
  positionX: 49,
  positionY: 99,
  mapName: 'Forest Clearing',
  hint:
      'The clearing in the forest of San Francisco where Tamara and I were ambushed.',
  afterMonstersCleared: (ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final youngSirSubstitution = c.playerSalutation;
    final ifBlock_6592bc33a = c.isHurt(tamaraId)
        ? '''Tamara is sitting on the ground now and tending to her wounds. I give her the sword back. "This place is not for me, ${youngSirSubstitution}," she declares. "And I say it's not for you, either." She winces, and looks at me.'''
        : '''Tamara checks her gear and sheathes the sword that I give back to her. Then she looks at me.''';
    final ifBlock_519842faa = c.isHurt(tamaraId)
        ? '''Tamara is sitting on the ground now and tending to her wounds. "This place is not for me, ${youngSirSubstitution}," she declares. "And I say it's not for you, either." She winces, and looks at me.'''
        : '''Tamara checks her gear and sheathes her sword. Then she looks at me.''';
    final ifBlock_781966055 =
        c.isHurt(tamaraId) ? '''She slowly stands up, and shrugs.''' : '''''';
    w.updateActorById(firstGoblinId, (b) => b.initiative = 10);

    s.add(
      '\nMy hands are shaking and I put them on the sides of my neck to stop the shudder. As a necromancer, I am used to death. The long, unmoving part of it, mostly.\n\nBut this, this was something different entirely. Fast. Violent. Messy. This was the savage face of death that I had not seen before. My hands are still shaking.\n\n\nThe fight is over.\n\n',
      isRaw: true,
    );
    if (!originalWorld.wasKilled(tamaraId)) {
      if (c.hasItem(tamaraSwordId)) {
        final sword = c.player.inventory.items
            .singleWhere((item) => item.id == tamaraSwordId);
        c.removeItemFromPlayer(tamaraSwordId);
        w.updateActorById(tamaraId, (b) => b..inventory.add(sword));
        w.recordCustom('gives_sword_back_to_tamara');
      }
    }

    Ruleset(
      Rule(
        1026182239,
        2,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return w.wasKilled(tamaraId) && !w.getActorById(tamaraId).isAnimated;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' "Sorry, Tamara." I kneel next to her and put her in the position of a proper warrior death, with back to the ground and arms crossed over the body.\n\n No time to be sentimental. Despite the death and the danger, I remember my brother. The reason I came all this way. I lift my head to look at the white building, my destination, now showing through the redwoods to the north.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        267137291,
        2,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return w.wasKilled(tamaraId) &&
              w.getActorById(tamaraId).anatomy.isUndead;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            ' I look into Tamara\'s undead eyes.\n\n "I\'m sorry."\n\n She doesn\'t respond, so I nod, and tell her corpse to follow me. No time to be sentimental. Despite the death and the danger, I remember my brother. The reason I came all this way. I lift my head to look at the white building, my destination, now showing through the redwoods to the north.\n',
            isRaw: true,
          );
        },
      ),
      Rule(
        120969454,
        1,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return !w.wasKilled(tamaraId);
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          Ruleset(
            Rule(
              491089880,
              1,
              false,
              (ApplicabilityContext c) {
                final WorldState w = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                return c.hasHappened('gives_sword_back_to_tamara');
              },
              (ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  ' ${ifBlock_6592bc33a} "You are welcome to tag along with me back to safety. I\'ll give you a discount on my services for the way back."\n',
                  isRaw: true,
                );
              },
            ),
            Rule(
              492770307,
              0,
              false,
              (ApplicabilityContext c) {
                final WorldState w = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                return true;
              },
              (ActionContext c) {
                final WorldState originalWorld = c.world;
                final Simulation sim = c.simulation;
                final Actor a = c.actor;
                final WorldStateBuilder w = c.outputWorld;
                final Storyline s = c.outputStoryline;
                s.add(
                  ' ${ifBlock_519842faa} "You are welcome to tag along with me back to safety. I\'ll give you a discount on my services for the way back."\n',
                  isRaw: true,
                );
              },
            ),
          ).apply(ActionContext.updatedFrom(c));
          s.addParagraph();
          s.add(
            '\n I remember my brother. The reason I came all this way. I lift my head to look at the white building, my destination, now showing through the redwoods to the north.\n\n Tamara understands. ${ifBlock_781966055} "I will leave you to it, then. My work here is done." In a few moments, she disappears among the trees and the bushes to the south.\n\n',
            isRaw: true,
          );
          w.updateActorById(tamaraId, (b) => b.isActive = false);
        },
      ),
      Rule(
        991926294,
        0,
        false,
        (ApplicabilityContext c) {
          final WorldState w = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          return true;
        },
        (ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          throw StateError(
              "Tamara's state wasn't planned for: ${w.getActorById(tamaraId)}");
        },
      ),
    ).apply(ActionContext.updatedFrom(c));
    s.addParagraph();
    c.giveNewItemToPlayer(letterFromFather);
  },
  whereDescription: 'among the trees',
  groundMaterial: '{earth|dirt}',
);

class CompassUse extends RoamingAction {
  @override
  final String name = 'compass_use';

  static final CompassUse singleton = CompassUse();

  @override
  List<String> get commandPathTemplate => [
        'Inventory',
        'compass',
        'use',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.hasItem(compassId) &&
        !c.playerRoom.isSynthetic &&
        c.playerRoom.isOnMap &&
        !c.getRoomRoaming().monstersAlive)) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    describeCompass(c);

    return '${a.name} successfully performs CompassUse';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform CompassUse';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

class PerformNecromancyElsewhere extends RoamingAction {
  @override
  final String name = 'perform_necromancy_elsewhere';

  static final PerformNecromancyElsewhere singleton =
      PerformNecromancyElsewhere();

  @override
  List<String> get commandPathTemplate => [
        'Skills',
        'Necromancy',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(!c.getRoomRoaming().monstersAlive &&
        !c.playerRoom.isSynthetic &&
        c.playerRoom.isOnMap &&
        !storyNecromancyHasPrecedence(c))) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.outputStoryline.addCustomElement(StatUpdate.sanity(c.actor.sanity, -1));
    c.outputWorld.updateActorById(c.actor.id, (b) => b.sanity = b.sanity! - 1);
    raiseDead(c);

    return '${a.name} successfully performs PerformNecromancyElsewhere';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_6c782c6c =
        a.sanity < 1 ? '''My sanity is already gone.''' : '''''';
    final ifBlock_4fd98517e = isFollowedByUndeadActor(c, a) ||
            isFollowedByUndeadInsect(c)
        ? '''My powers are not strong enough to hold two unliving minds, and I already have an undead follower.'''
        : '''''';
    s.add(
      'I try to perform the necromantic incantation but I fail. ${ifBlock_6c782c6c}${ifBlock_4fd98517e} Nothing happens.\n',
      isRaw: true,
    );
    return '${a.name} fails to perform PerformNecromancyElsewhere';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    final c = ApplicabilityContext(a, sim, w);
    if (a.sanity < 1 ||
        isFollowedByUndeadActor(c, a) ||
        isFollowedByUndeadInsect(c)) {
      return ReasonedSuccessChance.sureFailure;
    }
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage =>
      'Raising the dead will make them fight for me. I do not know in advance which corpse will rise. I cannot do this if I am already followed by an undead. My powers are not strong enough to hold two unliving minds.';

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
}

final readLetterFromFatherInk = InkAst([
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I take the letter from my pocket and read it.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_1561e0ee8 = c.playerIsMale ? '''Son''' : '''Daughter''';
    s.add(
      '${ifBlock_1561e0ee8},\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I learned about your plans from a family friend. Although I hope you don\'t mean to execute them, I am writing this letter.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'There is a good life for you in Falling Rock, despite everything. The mountains may seem dull and remote to your young heart, but they are safe.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I am surprised by the brash move. From you, of all people. Remember your health. Stay home. Don\'t follow your brother\'s footsteps. Don\'t make my heart break for the third time.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      '— Father\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    c.giveSanityToPlayer(2);
  }),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'I carefully fold the paper and keep my thumb pressed against the broken wax seal. Without conscious thought, I start tapping the seal with the thumb, rhythmically. Tap. Tap. Tap. A nervous tic I picked up on the way here.\n',
      isRaw: true,
    );
  }),
  InkParagraphNode((c) => c.outputStoryline.addParagraph()),
  InkParagraphNode((ActionContext c) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    final ifBlock_5065ca633 = !c.hasHappened(evSavedSarn)
        ? '''_No,_ _Father._ _I_ _must_ _find_ _the_ _coward,_ _and_ _confront_ _him._'''
        : '''''';
    s.add(
      '${ifBlock_5065ca633}\n',
      isRaw: true,
    );
  }),
  InkForkNode([
    InkChoiceNode(
      command: r""" For what he did, he deserves punishment. """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.recordCustom("goal_deserves_punishment");
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            '_Nobody_ should be able to get away with what Sarn did and feel no consequences. He left just after Mother died. He let Father and I steep in despair and destitution.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Sarn was supposed to help, and instead he took off, to find riches or adventure in San Francisco. For that, by the Eight Gods, he must be punished.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" He must know what his running away did to us. """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.recordCustom("goal_must_know");
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          final ifBlock_56c7cddbe =
              c.playerIsMale ? '''brother''' : '''sister''';
          s.add(
            'Sarn took off just after Mother died. He left behind a devastated Father, and a little ${ifBlock_56c7cddbe}, terrified of what would come next. Is it possible that Sarn didn\'t know what he was doing? Could he not imagine what _another_ loss of a member would do to a struggling family?\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'He must learn what happened. He cannot live his life without knowing that his act of cowardice broke Father, and me.\n',
            isRaw: true,
          );
        }),
      ],
    ),
    InkChoiceNode(
      command: r""" I want revenge. """.trim(),
      consequence: [
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          w.recordCustom("goal_revenge");
        }),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'Sarn must suffer. I have long wanted to make him feel the same kind of despair and destitution that Father and I had to go through after he left. As if it wasn\'t enough that Mother died, and that Father was sad beyond imagining from it.\n',
            isRaw: true,
          );
        }),
        InkParagraphNode((c) => c.outputStoryline.addParagraph()),
        InkParagraphNode((ActionContext c) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'The coward took off then, and he must not be forgiven. I must have vengeance.\n',
            isRaw: true,
          );
        }),
      ],
    ),
  ]),
]);

class ReadLetterFromFather extends RoamingAction {
  @override
  final String name = 'read_letter_from_father';

  static final ReadLetterFromFather singleton = ReadLetterFromFather();

  @override
  List<String> get commandPathTemplate => [
        'Inventory',
        'Letter from my father',
        'Read',
      ];

  @override
  bool isApplicable(
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (!(c.isInIdleRoom && c.hasItem(letterFromFatherId))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    w.pushSituation(InkSituation.initialized(
      w.randomInt(),
      "read_letter_from_father_ink",
    ));
    return '${a.name} successfully performs ReadLetterFromFather';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    return '${a.name} fails to perform ReadLetterFromFather';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
    ApplicabilityContext c,
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    if (c.inRoomParent('guardpost_above_church') != true) {
      return false;
    }
    if (!(w.actionNeverUsed(name))) {
      return false;
    }
    return w.actionNeverUsed(name);
  }

  @override
  String applySuccess(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'You silently approach the goblin, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs and leans his head to the side, but stays asleep.\n\n\nYou take a few slow steps back, then grip the shield in your left hand, ready for anything.\n',
      isRaw: true,
    );
    return '${a.name} successfully performs GuardpostAboveChurchTakeShield';
  }

  @override
  String applyFailure(
    ActionContext c,
    void _,
  ) {
    final WorldState originalWorld = c.world;
    final Simulation sim = c.simulation;
    final Actor a = c.actor;
    final WorldStateBuilder w = c.outputWorld;
    final Storyline s = c.outputStoryline;
    s.add(
      'You silently approach the goblin, then wait a few moments. The goblin sniffs, moves, but stays asleep. You shift your weight on your right leg, leaning over the goblin and using the other leg as a counterweight. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move an inch, he\'ll wake up.\n',
      isRaw: true,
    );
    w.pushSituation(GuardpostAboveChurchTakeShieldRescueSituation.initialized(
        w.randomInt()));
    return '${a.name} fails to perform GuardpostAboveChurchTakeShield';
  }

  @override
  ReasonedSuccessChance<void> getSuccessChance(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return const ReasonedSuccessChance<void>(0.8);
  }

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String getRollReason(
    Actor a,
    Simulation sim,
    WorldState w,
    void _,
  ) {
    return 'Will I be successful?';
  }

  @override
  String? get helpMessage =>
      'The goblin is asleep, but not soundly — the floor here is cold and uncomfortable, and the wall isn’t much of a headrest. Taking the shield from the goblin\'s lap will likely wake him up.';

  @override
  bool get isAggressive => false;

  @override
  bool get isImmediate => false;
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
        (
          ActionContext c,
          self,
        ) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'You stay completely still. After a while, the strain of holding the awkward position start to show. Your left leg starts shaking. A bead of sweat is forming on your nose, threatening to fall on the goblin\'s leg.\n\n\n<p class="toast">Your stamina decreases by 1.</p>\n\n\nFortunately, the goblin shifts again and his expression gets visibly more relaxed. His breathing is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then grip the shield in your left hand, ready for anything.',
            isRaw: true,
          );
          w.popSituation(c);
          w.updateActorById(a.id, (b) => b.stamina = b.stamina! - 1);

          return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)';
        },
        'If you stop moving, the guard will probably go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)',
        isApplicableClosure: (
          ApplicabilityContext c,
          Actor a,
          Simulation sim,
          WorldState w,
          self,
        ) {
          return a.stamina > 0;
        },
      ),
      SimpleAction(
        'guardpost_above_church_take_shield_continuation_of_failure',
        'Snatch the shield',
        (
          ActionContext c,
          self,
        ) {
          final WorldState originalWorld = c.world;
          final Simulation sim = c.simulation;
          final Actor a = c.actor;
          final WorldStateBuilder w = c.outputWorld;
          final Storyline s = c.outputStoryline;
          s.add(
            'You snatch the shield and jump back next to Briana. The goblin wakes up instantly, and he gets his bearings surprisingly fast. He jumps up and points his scimitar at you.\n\n\nYou look at Briana. Both of you are ready to fight.',
            isRaw: true,
          );
          w.popSituation(c);
          return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)';
        },
        'You can quickly snatch the shield, jump back and prepare for a fight.',
      ),
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
        return b..turn = b.turn! + 1;
      });

  @override
  ActorTurn getNextTurn(
    Simulation sim,
    WorldState w,
  ) {
    if (turn != 0) return ActorTurn.never;
    var player = w.actors.singleWhere((a) => a.isPlayer);
    return ActorTurn(
      player,
      w.time,
    );
  }

  @override
  Iterable<Actor> getActors(
    Simulation sim,
    WorldState w,
  ) {
    return [
      w.actors.singleWhere((Actor a) {
        return a.isPlayer;
      })
    ];
  }
}

final allRooms = <Room>[
  preRandomEncounter,
  randomEncounter,
  bigOObservatory,
  bigOAntechamber,
  dargTent,
  dargTentAfterDargArrived,
  dargTentAfterDargKilled,
  outlook,
  topOfClimb,
  crowdsource,
  crowdsourceAfterOrcsLeft,
  crowdsourceVestry,
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
  pondLizardRock,
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
  goblinSkirmishMain,
  start,
  meadowFight,
];
final allApproaches = <Approach>[
  endOfRoamFromRandomEncounter,
  randomEncounterFromPreRandomEncounter,
  bigOObservatoryFromBigOAntechamber,
  bigOAntechamberFromCrowdsource,
  bigOAntechamberFromTopOfClimb,
  dargTentFromBarracks,
  outlookFromTopOfClimb,
  topOfClimbFromBarracks,
  topOfClimbFromBigOAntechamber,
  topOfClimbFromConet,
  topOfClimbFromKeepServants,
  topOfClimbFromOutlook,
  crowdsourceFromBarracks,
  crowdsourceFromBigOAntechamber,
  crowdsourceFromConet,
  barracksFromCrowdsource,
  barracksFromDargTent,
  barracksFromJunction,
  barracksFromTopOfClimb,
  conetFromCrowdsource,
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
  pondFromPondLizardRock,
  pondLizardRockFromPond,
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
  pyramidEntranceFromBleedsMain,
  pyramidEntranceFromStagingArea,
  bleedsMainFromBleedsTraderHut,
  bleedsMainFromGoblinSkirmishPatrol,
  bleedsMainFromMeadowFight,
  bleedsMainFromPyramidEntrance,
  bleedsTraderHutFromBleedsMain,
  goblinSkirmishPatrolFromBleedsMain,
  goblinSkirmishPatrolFromGoblinSkirmishMain,
  goblinSkirmishMainFromGoblinSkirmishPatrol,
  startFromPreStartBook,
  meadowFightFromBleedsMain,
  meadowFightFromStart,
];
final allActions = <RoamingAction>[
  FinalFightInk.singleton,
  BigOEndInk.singleton,
  ExamineAntechamberLock.singleton,
  OpenAntechamberLock.singleton,
  DargTentAttack.singleton,
  DargHeadTalkInk.singleton,
  HawkmanExamine.singleton,
  OutlookAttack.singleton,
  StripDeadHawkman.singleton,
  CrowdsourceAttack.singleton,
  CrowdsourceListen.singleton,
  BarracksTakeBarbecuedBat.singleton,
  ConetAttack.singleton,
  ConetExamine.singleton,
  ConetKoboldExamine.singleton,
  KarlListenToGuards.singleton,
  KarlUseNecromancy.singleton,
  SaveSarn.singleton,
  SarnRescueInk.singleton,
  TakeSarnToBleeds.singleton,
  KarlExamineStar.singleton,
  KarlTakeStar.singleton,
  ReservoirDamExamine.singleton,
  ReservoirDamWheelLeft.singleton,
  ReservoirDamWheelRight.singleton,
  ReservoirFollowFootprints.singleton,
  ReservoirWaterExamine.singleton,
  CockroachCakeTake.singleton,
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
  OracleAppleExamine.singleton,
  OracleAppleTake.singleton,
  GiveLairOfGodStarToDeathless.singleton,
  DragonEggExamine.singleton,
  DragonEggUse.singleton,
  AttackLizardNearPond.singleton,
  PondHelicopterExamine.singleton,
  ArgoAskDeathless.singleton,
  ArgoAskDragonEgg.singleton,
  ArgoAskQuake1.singleton,
  ArgoGreet.singleton,
  TalkToMiguelAboutDeserting.singleton,
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
  ObserveKnights.singleton,
  TalkToKatAboutBrother.singleton,
  TalkToKatAboutDevling.singleton,
  TalkToKatAboutLady.singleton,
  TalkToKatAboutMiguelMissing.singleton,
  TalkToKatGreetings.singleton,
  TalkToMiguelAboutBrother.singleton,
  TalkToMiguelAboutDevling.singleton,
  TalkToMiguelAboutDragonEgg.singleton,
  TalkToMiguelAboutKilledLady.singleton,
  TalkToMiguelAboutLady.singleton,
  TalkToMiguelGreetings.singleton,
  TalkToKatAfterOrcOffensive.singleton,
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
  SarnTakeHisHammer.singleton,
  SarnTalkInBleeds.singleton,
  ListenContinue.singleton,
  ListenMore.singleton,
  ListenToThemArguing.singleton,
  ObserveGoblinCamp.singleton,
  BarbecuedSquirrelExamine.singleton,
  BarbecuedSquirrelTake.singleton,
  CompassExamine.singleton,
  CompassTake.singleton,
  GoblinCampAttack.singleton,
  StartInk.singleton,
  FirstPyramidApproach.singleton,
  CompassUse.singleton,
  PerformNecromancyElsewhere.singleton,
  ReadLetterFromFather.singleton,
  GuardpostAboveChurchTakeShield.singleton,
];
final allInks = <String, InkAst>{
  'final_fight_ink_ink': finalFightInkInk,
  'big_o_end_ink_ink': bigOEndInkInk,
  'darg_head_talk_ink_ink': dargHeadTalkInkInk,
  'hawkman_examine_ink': hawkmanExamineInk,
  'outlook_attack_ink': outlookAttackInk,
  'crowdsource_listen_ink': crowdsourceListenInk,
  'barracks_take_barbecued_bat_ink': barracksTakeBarbecuedBatInk,
  'conet_examine_ink': conetExamineInk,
  'conet_kobold_examine_ink': conetKoboldExamineInk,
  'sarn_rescue_ink_ink': sarnRescueInkInk,
  'take_sarn_to_bleeds_ink': takeSarnToBleedsInk,
  'reservoir_follow_footprints_ink': reservoirFollowFootprintsInk,
  'reservoir_water_examine_ink': reservoirWaterExamineInk,
  'cockroach_cake_take_ink': cockroachCakeTakeInk,
  'ask_oracle_about_keep_ink': askOracleAboutKeepInk,
  'oracle_give_north_skull_ink': oracleGiveNorthSkullInk,
  'talk_to_oracle_deathless_ink': talkToOracleDeathlessInk,
  'talk_to_oracle_doghead_ink': talkToOracleDogheadInk,
  'talk_to_oracle_dragon_egg_ink': talkToOracleDragonEggInk,
  'talk_to_oracle_earthquakes_ink': talkToOracleEarthquakesInk,
  'talk_to_oracle_greetings_ink': talkToOracleGreetingsInk,
  'talk_to_oracle_orcs_ink': talkToOracleOrcsInk,
  'talk_to_oracle_quake_1_ink': talkToOracleQuake1Ink,
  'talk_to_oracle_sixty_fiver_ink': talkToOracleSixtyFiverInk,
  'oracle_apple_examine_ink': oracleAppleExamineInk,
  'dragon_egg_examine_ink': dragonEggExamineInk,
  'pond_helicopter_examine_ink': pondHelicopterExamineInk,
  'argo_ask_deathless_ink': argoAskDeathlessInk,
  'argo_ask_dragon_egg_ink': argoAskDragonEggInk,
  'argo_ask_quake_1_ink': argoAskQuake1Ink,
  'argo_greet_ink': argoGreetInk,
  'talk_to_miguel_about_deserting_ink': talkToMiguelAboutDesertingInk,
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
  'open_gate_unlock_ink': openGateUnlockInk,
  'observe_knights_ink': observeKnightsInk,
  'talk_to_kat_about_devling_ink': talkToKatAboutDevlingInk,
  'talk_to_kat_about_lady_ink': talkToKatAboutLadyInk,
  'talk_to_kat_greetings_ink': talkToKatGreetingsInk,
  'talk_to_miguel_about_brother_ink': talkToMiguelAboutBrotherInk,
  'talk_to_miguel_about_devling_ink': talkToMiguelAboutDevlingInk,
  'talk_to_miguel_about_dragon_egg_ink': talkToMiguelAboutDragonEggInk,
  'talk_to_miguel_about_killed_lady_ink': talkToMiguelAboutKilledLadyInk,
  'talk_to_miguel_about_lady_ink': talkToMiguelAboutLadyInk,
  'talk_to_miguel_greetings_ink': talkToMiguelGreetingsInk,
  'talk_to_kat_after_orc_offensive_ink': talkToKatAfterOrcOffensiveInk,
  'bleeds_trader_greet_ink': bleedsTraderGreetInk,
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
  'sarn_talk_in_bleeds_ink': sarnTalkInBleedsInk,
  'start_ink_ink': startInkInk,
  'read_letter_from_father_ink': readLetterFromFatherInk,
};
