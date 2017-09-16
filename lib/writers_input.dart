library writers_input;

import 'package:edgehead/fractal_stories/writer_action.dart' show RoamingAction;
import 'package:edgehead/fractal_stories/actor.dart' show Actor;
import 'package:built_value/built_value.dart' show Built;
import 'package:built_value/built_value.dart' show Builder;
import 'package:edgehead/fractal_stories/room_exit.dart' show Exit;
import 'package:edgehead/fractal_stories/situation.dart' show getRandomId;
import 'package:edgehead/fractal_stories/item.dart' show ItemType;
import 'package:edgehead/fractal_stories/action.dart' show Resource;
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart'
    show RoomRoamingSituation;
import 'package:edgehead/fractal_stories/room.dart' show Room;
import 'package:edgehead/fractal_stories/writer_action.dart' show SimpleAction;
import 'package:edgehead/fractal_stories/situation.dart' show Situation;
import 'package:edgehead/fractal_stories/storyline/storyline.dart'
    show Storyline;
import 'package:edgehead/fractal_stories/world.dart' show WorldState;
import 'package:built_value/built_value.dart';
import 'package:edgehead/writers_helpers.dart';
part 'writers_input.g.dart';

const bool DEV_MODE = true;
Room caveWithAgruthPre =
    new Room('cave_with_agruth_pre', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[new Exit('cave_with_agruth', '', 'You look around.')]);
Room caveWithAgruth =
    new Room('cave_with_agruth', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both paths should lead you towards the Upper Door, a small exit at the side of Mount Bloodrock.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The corpse lies still, getting cold.


''',
      wholeSentence: true);
  rollBrianaQuote(w, s);
  s.add('', wholeSentence: true);
}, null, null, <Exit>[
  new Exit('underground_church', 'Go to the Unholy Church',
      'You make it to the Church undetected.'),
  new Exit('war_forge', 'Go to the war forges',
      'You sneak your way through the black passage, closing towards the sound of hundreds of anvils.'),
  new Exit('slave_quarters_passage', 'Go to the slave quarters',
      'You and Briana hug the wall and start towards the slave quarters.')
]);

class SearchAgruth extends RoamingAction {
  @override
  final String command = 'Search Agruth';

  @override
  final String name = 'search_agruth';

  static final SearchAgruth singleton = new SearchAgruth();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'cave_with_agruth') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)
''',
        wholeSentence: true);
    giveStaminaToPlayer(w, 1);
    return '${a.name} successfully performs SearchAgruth';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
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

Room exitFromBloodrock =
    new Room('exit_from_bloodrock', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. 


You have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. 


Then you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal 


_"We must stop this."_


Briana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."


"That may be so. But no kings have what I have."


"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."


"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection. We both do."




"A connection."


"With the dead prince. I dream his dreams. I think I have some of his power. I think he is more than people think. A lot more. I think you feel it, too, but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."


"So the thing you have that kings don\'t is… a way to communicate? You want to negotiate?"


"I do not have anything the Dead Prince wants. No, I do not think any man, king or peasant, has it. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."


"And you plan is?"


(IMG long view of the road ahead) 


"Not letting him have it. Giving him the exact opposite of what he wants."


"You know we could just run as fast as we can, kicking some orcs in their faces along the way, right?"


"yes" 


"that others would do exactly that."


"But we will not." 


"Yeah. We will not."


With that, you start down the road towards the black fort in the distance.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[new Exit('__END_OF_ROAM__', ' (UNIMPLEMENTED)', '...')]);
Room forgeChurchCrevice =
    new Room('forge_church_crevice', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The crevice is small.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('tunnel', 'Continue along the crevice',
      'You continue until the crevice open into a tunnel. You can smell fresh air.')
]);
Room guardpostAboveChurch =
    new Room('guardpost_above_church', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You enter a small, circular room. There are exits on three sides, all marked with crude writing.


''',
      wholeSentence: true);
  if (justCameFrom(w, "smelter")) {
    s.add(
        """The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.""",
        wholeSentence: true);
  }
  s.add(
      '''

''',
      wholeSentence: true);
  if (justCameFrom(w, "underground_church")) {
    s.add(
        """The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs' vocabulary. Both of these slope downwards.""",
        wholeSentence: true);
  }
  s.add(
      '''

A third passage is marked "Up Door", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you\'re ready for it. Your final path to escape, an end of those three horrible years.


Leaning on the wall next to the third exit is a goblin guard. He\'s sleeping. He holds a sword in one hand, and there\'s a shield laid on his lap.


''',
      wholeSentence: true);
  if (!w.actionHasBeenPerformed("smelter_throw_spear") &&
      !w.actionHasBeenPerformed("take_orcthorn")) {
    s.add(
        """For the first time, you see a smile on Briana's face. Not a smirk or an angry taunt of a laugh, but a genuine smile. "I can't believe we have made it this far," she whispers, looking into the third passage. "Although I'll admit it feels like we could have taken more from them. Wreak more havoc. I mean, we might be the first people to be in Mount Bloodrock, and live." 


_"Let us keep that second part true, then."_
 """,
        wholeSentence: true);
  }
  s.add('', wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add('', wholeSentence: true);
  if (w.actionHasBeenPerformed("guardpost_above_church_take_shield") &&
      !w.actionHasBeenPerformedSuccessfully(
          "guardpost_above_church_take_shield")) {
    s.add("The goblin's corpse is sprawled on the ground.");
  } else {
    s.add("The goblin is sleeping soundly.");
  }
  s.add('', wholeSentence: true);
}, null, null, <Exit>[
  new Exit('underground_church', 'Descend towards the Underground Church',
      'You take the passage leading down towards the temple.'),
  new Exit('tunnel', 'Go to the upper gate',
      'You take the passage that leads upwards.'),
  new Exit('smelter', 'Go to the smelter',
      'You take the slightly downwards passage towards the smelter.')
]);

class GuardpostAboveChurchTakeShield extends RoamingAction {
  @override
  final String command = 'Cautiously take the shield';

  @override
  final String name = 'guardpost_above_church_take_shield';

  static final GuardpostAboveChurchTakeShield singleton =
      new GuardpostAboveChurchTakeShield();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'guardpost_above_church') {
      return false;
    }
    if ((w.actionNeverUsed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You silently approach the goblin\'s legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.


You take a few slow steps back, then fix the shield on your offhand.
''',
        wholeSentence: true);
    setUpStealShield(a, w, s, true);
    return '${a.name} successfully performs GuardpostAboveChurchTakeShield';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You silently approach the goblin\'s legs, and wait a few moments. You\'re trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.


You touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he\'ll wake up.
''',
        wholeSentence: true);
    w.pushSituation(
        new GuardpostAboveChurchTakeShieldRescueSituation.initialized());
    return '${a.name} fails to perform GuardpostAboveChurchTakeShield';
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 0.3;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage =>
      'The goblin is asleep but not soundly — the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin\'s lap will quite likely wake him up.';

  @override
  bool get isAggressive => false;
}

abstract class GuardpostAboveChurchTakeShieldRescueSituation extends Situation
    implements
        Built<GuardpostAboveChurchTakeShieldRescueSituation,
            GuardpostAboveChurchTakeShieldRescueSituationBuilder> {
  factory GuardpostAboveChurchTakeShieldRescueSituation(
          [updates(GuardpostAboveChurchTakeShieldRescueSituationBuilder b)]) =
      _$GuardpostAboveChurchTakeShieldRescueSituation;

  factory GuardpostAboveChurchTakeShieldRescueSituation.initialized() {
    return new GuardpostAboveChurchTakeShieldRescueSituation((b) {
      b.id = getRandomId();
      b.time = 0;
      return b;
    });
  }

  GuardpostAboveChurchTakeShieldRescueSituation._();

  @override
  List<RoamingAction> get actions => [
        new SimpleAction(
            'guardpost_above_church_take_shield_rescue',
            'Stay perfectly still',
            (a, w, s, self) {
              s.add(
                  '''You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin\'s leg.


Fortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.


You deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.''',
                  wholeSentence: true);
              w.popSituation();
              w.updateActorById(a.id, (b) => b..stamina -= 1);
              setUpStealShield(a, w, s, true);
              return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)';
            },
            'If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)',
            isApplicableClosure: (a, w, self) {
              return (a.stamina > 0);
            }),
        new SimpleAction(
            'guardpost_above_church_take_shield_continuation_of_failure',
            'Snatch the shield', (a, w, s, self) {
          s.add(
              '''You snatch the shield and jump back next to Briana. The goblin is suprisingly fast in getting his bearing. He jumps up and gets into combat stance.




You hold the shield on your offhand and get ready to fight.''',
              wholeSentence: true);
          w.popSituation();
          setUpStealShield(a, w, s, false);
          return 'GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)';
        }, 'You can quickly snatch the shield, jump back and prepare for a fight.')
      ];

  @override
  int get id;

  @override
  int get time;

  @override
  String get name => 'guardpost_above_church_take_shield';

  @override
  Situation elapseTime() => rebuild((b) {
        b.time++;
        return b;
      });

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time != 0) {
      return null;
    }
    return w.actors.singleWhere((a) => a.isPlayer);
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, WorldState w) {
    return [actors.singleWhere((a) => a.isPlayer)];
  }
}

Room justAfterAgruthFight =
    new Room('just_after_agruth_fight', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. 


You watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. 


"What?" she says when she notices you\'re looking.


_"We either go now, or die."_


Briana spits down at the body. "He wasn\'t even the worst of them, you know."


_"I know."_


"They _all_ deserve this, or worse. All of them. And I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. 


_"That one is already dead."_


"I was making sure. You understand that we should name the sword, right? It\'s the only thing we have going for us right now. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[]);

class NameAgruthSwordOpportunity extends RoamingAction {
  @override
  final String command = '"Luck Bringer"';

  @override
  final String name = 'name_agruth_sword_opportunity';

  static final NameAgruthSwordOpportunity singleton =
      new NameAgruthSwordOpportunity();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''_"We will call it Luck Bringer. It is our only chance to get out of this hell."_


Briana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."
''',
        wholeSentence: true);
    nameAgruthSword(w, "Luck Bringer");
    movePlayer(w, s, "cave_with_agruth_pre");
    return '${a.name} successfully performs NameAgruthSwordOpportunity';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class NameAgruthSwordRedemption extends RoamingAction {
  @override
  final String command = '"Savior"';

  @override
  final String name = 'name_agruth_sword_redemption';

  static final NameAgruthSwordRedemption singleton =
      new NameAgruthSwordRedemption();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''_"We will call it Savior. It is our first step to freedom."_


Briana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."
''',
        wholeSentence: true);
    nameAgruthSword(w, "Savior");
    movePlayer(w, s, "cave_with_agruth_pre");
    return '${a.name} successfully performs NameAgruthSwordRedemption';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class NameAgruthSwordNothing extends RoamingAction {
  @override
  final String command = 'No name';

  @override
  final String name = 'name_agruth_sword_nothing';

  static final NameAgruthSwordNothing singleton = new NameAgruthSwordNothing();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'just_after_agruth_fight') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''_"That is foolish. It is just a sword, after all."_


Briana shrugs. "Whatever, just don\'t ever call it _Agruth\'s._ I already have more respect to this piece of iron than to that worthless animal. Now, you\'re right, let\'s just get out of here as quickly as possible."
''',
        wholeSentence: true);
    movePlayer(w, s, "cave_with_agruth_pre");
    return '${a.name} successfully performs NameAgruthSwordNothing';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room orcthornDoor =
    new Room('orcthorn_door', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''TODO
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('cave_with_agruth', 'Go to the cave with Agruth\'s corpse',
      'You back out from the door, and go back where you left Agruth\'s body.'),
  new Exit('slave_quarters', 'Go further towards the Gate of Screams', 'TODO'),
  new Exit('orcthorn_room', 'Open the door', 'You open the door.')
]);
Room orcthornRoom =
    new Room('orcthorn_room', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The room is dark and wet. As you enter, the noises end. 




When your eyes become accustomed to the dark, you see two figures standing in front of you. One is much higher, almost touching the room\'s ceiling, but you slowly realize it\'s a stone statue. The other figure, though, is living.




Its face is in constant motion, overwhelmed by tics and waves of hateful expressions. You realize it\'s a male orc, but an especially large one, with huge muscles and many scars. If he wasn\'t locked up here, he\'d surely make a captain.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The room is quiet. The mad guardian\'s huge body lies on the floor beneath the statue.
''',
      wholeSentence: true);
}, generateMadGuardianFight, null, <Exit>[
  new Exit('orcthorn_door', 'Exit the room',
      'You go through the door. Once back in the corridor of the slave quarters, you close it behind you.')
]);

class TakeOrcthorn extends RoamingAction {
  @override
  final String command = 'Search for Orcthorn';

  @override
  final String name = 'take_orcthorn';

  static final TakeOrcthorn singleton = new TakeOrcthorn();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'orcthorn_room') {
      return false;
    }
    if ((w.actionHasBeenPerformed("talk_to_briana_3") &&
            !w.actionHasBeenPerformed(name) &&
            !(w.currentSituation as RoomRoamingSituation).monstersAlive) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''TODO - this must be it. you search to room and find the sword hidden well (under a loose tile? under a heap of corpses?). then "why would they keep the sword at all? why wouldn\'t they destroy it?" - "fear. it\'s the ultimate authority. I don\'t think it was the orcs who decided to keep the sword intact."


Briana: "I can\'t believe we did it. A farm boy and a freak."


"A freak?"


"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."


"Well, we still need to get out of here."
''',
        wholeSentence: true);
    takeOrcthorn(w, a);
    return '${a.name} successfully performs TakeOrcthorn';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room slaveQuarters =
    new Room('slave_quarters', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''TODO
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''TODO
''',
      wholeSentence: true);
}, null, null, <Exit>[]);

class SlaveQuartersContinue extends RoamingAction {
  @override
  final String command = 'Continue';

  @override
  final String name = 'slave_quarters_continue';

  static final SlaveQuartersContinue singleton = new SlaveQuartersContinue();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'slave_quarters') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''TODO FIGHT
''',
        wholeSentence: true);
    w.popSituation();
    return '${a.name} successfully performs SlaveQuartersContinue';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room slaveQuartersPassage =
    new Room('slave_quarters_passage', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You can see Briana clutching her fists. "Are we homesick already?" she says. But she doesn\'t wait for reply, and presses on.


It doesn\'t take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.


The tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn\'t see you or anything else.


Before you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man\'s chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.


An orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. "Vicious throw, small one!" he roars.


You step back and motion Briana to lean on the wall, hoping that the door\'s embossed frame will provide enough cover before the two slavers turn again. 


But at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.


The door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.






[IMAGE goblin spearman + orc]
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The small door is TODO open/close.


''',
      wholeSentence: true);
  rollBrianaQuote(w, s);
  s.add('', wholeSentence: true);
}, generateSlaveQuartersPassageFight, null, <Exit>[
  new Exit('cave_with_agruth', 'Go back to the cave with Agruth\'s corpse',
      'You back out from the door, and go back where you left Agruth\'s body.'),
  new Exit('slave_quarters', 'Go further towards the Gate of Screams', 'TODO'),
  new Exit('orcthorn_room', 'Open the door', 'You open the door.')
]);

class SlaveQuartersPassageExamineDoor extends RoamingAction {
  @override
  final String command = 'Examine the door';

  @override
  final String name = 'slave_quarters_passage_examine_door';

  static final SlaveQuartersPassageExamineDoor singleton =
      new SlaveQuartersPassageExamineDoor();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'slave_quarters_passage') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name) &&
            !(w.currentSituation as RoomRoamingSituation).monstersAlive) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."
''',
        wholeSentence: true);
    return '${a.name} successfully performs SlaveQuartersPassageExamineDoor';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room smelter = new Room('smelter', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.


''',
      wholeSentence: true);
  if (justCameFrom(w, "war_forge")) {
    s.add(
        """You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.""",
        wholeSentence: true);
  }
  s.add('', wholeSentence: true);
  if (justCameFrom(w, "guardpost_above_church")) {
    s.add(
        """Not far from here there is a short tunnel, sloping down. It leads into the same room as the molten steel — the war forges. You'll be able to go there unnoticed.""",
        wholeSentence: true);
  }
  s.add('', wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The reds and whites of the molten steel reflect in the heaps of coal.


''',
      wholeSentence: true);
  rollBrianaQuote(w, s);
  s.add('', wholeSentence: true);
}, null, null, <Exit>[
  new Exit('war_forge', 'Go to the war forges',
      'You walk through a short passage set in stone, towards the sound of hundreds of anvils.'),
  new Exit('guardpost_above_church', 'Go through the smooth passage',
      'You take the smooth passage and it leads you slightly upwards.')
]);

class SmelterLookAround extends RoamingAction {
  @override
  final String command = 'Look around';

  @override
  final String name = 'smelter_look_around';

  static final SmelterLookAround singleton = new SmelterLookAround();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'smelter') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that lead to the war forges below. 


The ogre is no more than a spear\'s throw away from you. But he doesn\'t notice. In fact, you realize he\'s blind, probably from all the molten steel around him. Yet he\'s performing his job without fault, listening to commands from the war forges beyond the wall, and operating the  floodgates accordingly.
''',
        wholeSentence: true);
    return '${a.name} successfully performs SmelterLookAround';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class SmelterThrowSpear extends RoamingAction {
  @override
  final String command = 'Throw spear at the ogre';

  @override
  final String name = 'smelter_throw_spear';

  static final SmelterThrowSpear singleton = new SmelterThrowSpear();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'smelter') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name) &&
            w.actionHasBeenPerformed("war_forge_watch_workers") &&
            w.actionHasBeenPerformed("smelter_look_around") &&
            getPlayer(w).hasItem(ItemType.spear)) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''TODO - throwing spear at the orc that holds the molten steel gate


Why would you do that? You just wasted a perfectly good spear on a stupid ogre that posed no threat to us.


Watch.


TODO (molten steel ruins everything)


The less simple you see the world, the easier it is for you to change it. 


You got lucky. 


That was some throw! That thing downstairs.. I don\'t know what it is but I would not want to meet it in battle. - it is probably meant to scale castle walls. - so, fort ironcast. One well placed spear may have prevented the fall of Ironcast. - delayed. - what? - we delayed the fall of the fort, at best.
''',
        wholeSentence: true);
    removeSpearFromPlayer(w);
    return '${a.name} successfully performs SmelterThrowSpear';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room startAdventure =
    new Room('start_adventure', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. 




Once Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. 




Another crack and there is new blood on Briana\'s face. Agruth grins.




Nobody else is in sight. It\'s just you, Agruth and Briana. That\'s Agruth\'s main mistake.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, generateAgruthFight, null, <Exit>[
  new Exit('just_after_agruth_fight', '',
      'You look around. Fortunately, nobody is in sight.')
]);

class TalkToBriana1 extends RoamingAction {
  @override
  final String command = 'Talk to Briana';

  @override
  final String name = 'talk_to_briana_1';

  static final TalkToBriana1 singleton = new TalkToBriana1();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.actionNeverUsed(name) && isRoamingInBloodrock(w)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''"You were caught not too long ago, I think. What can you tell me about outside?"




Briana: "How long have you been here?"




"Three years."




"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."




"So when we escape from here — *if* we escape from here — we still have to cover miles of orc territory."




"Correct. The closest safe place is the fort."
''',
        wholeSentence: true);
    return '${a.name} successfully performs TalkToBriana1';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class TalkToBriana2 extends RoamingAction {
  @override
  final String command = 'Talk to Briana';

  @override
  final String name = 'talk_to_briana_2';

  static final TalkToBriana2 singleton = new TalkToBriana2();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.actionHasBeenPerformed("talk_to_briana_1") &&
            w.actionNeverUsed(name) &&
            isRoamingInBloodrock(w)) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''"Where did they catch you?"




Briana: "At the Gate of Screams. I was trying to sneak in."




"You what?"




"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."
''',
        wholeSentence: true);
    return '${a.name} successfully performs TalkToBriana2';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class TalkToBriana3 extends RoamingAction {
  @override
  final String command = 'Talk to Briana';

  @override
  final String name = 'talk_to_briana_3';

  static final TalkToBriana3 singleton = new TalkToBriana3();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.actionHasBeenPerformed("talk_to_briana_2") &&
            w.actionNeverUsed(name) &&
            isRoamingInBloodrock(w)) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''"What\'s Orcthorn?"


"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."


"Almost."


"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."


"The mad guardian."


"The mad who?"


"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him _grach kamkorr_. The mad guardian. That sword is still with him. Hidden there in the cell."


"Where is that cell?"


"Somewhere in the slave quarters."
''',
        wholeSentence: true);
    return '${a.name} successfully performs TalkToBriana3';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room theShafts = new Room('the_shafts', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''This must be the place that the orcs call the Shafts. It\'s a tall, seemingly endless room, with many walkways across.






You realize there is really only one way out, over one of the walkways. You\'ll have to run, there is no hiding anymore.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('tunnel', 'Run',
      'You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.')
]);
Room tunnel = new Room('tunnel', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''TODO - start chase


Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.




![Orc and Goblin](img/orc_and_goblin_sketch.jpg)
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, generateEscapeTunnelFight, null, <Exit>[
  new Exit(
      'exit_from_bloodrock', 'Start running again', 'You start running again.')
]);
Room undergroundChurch =
    new Room('underground_church', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can\'t quite see it. No torches here. Quiet. 


''',
      wholeSentence: true);
  if (justCameFrom(w, "cave_with_agruth")) {
    s.add(
        """After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.""");
  }
  s.add('', wholeSentence: true);
  if (justCameFrom(w, "guardpost_above_church")) {
    s.add(
        """Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.""");
  }
  s.add('', wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The Underground Church stands silent, as if holding breath.


''',
      wholeSentence: true);
  rollBrianaQuote(w, s);
  s.add('', wholeSentence: true);
}, null, null, <Exit>[
  new Exit('guardpost_above_church', 'Enter the passage',
      'You take the sloping passage and go a long, slightly rising way.'),
  new Exit('cave_with_agruth', 'Go back to the cave with Agruth\'s corpse',
      'You sneak out of the church, back towards where you left Agruth\'s body.'),
  new Exit('underground_church_altar', 'Go towards the altar',
      'You sneak towards the front of the temple, trying to stay in the shadows.')
]);

class ExamineUndergroundChurch extends RoamingAction {
  @override
  final String command = 'Look around';

  @override
  final String name = 'examine_underground_church';

  static final ExamineUndergroundChurch singleton =
      new ExamineUndergroundChurch();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'underground_church') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''This place was not built by the orcs or their slaves. Walls are straight and smooth. The columns are decorated with delicate embossments of skulls and tentacles.


"What are these things?" Briana whispers.


_"This place worships the Dead Prince."_


Saying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue — but it has been a long time since you said it yourself.


"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."


_"He is god."_


''',
        wholeSentence: true);
    if (!w.actionHasBeenPerformed("wait_for_ritual")) {
      s.add(
          """Briana smirks. "Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best." """,
          wholeSentence: true);
    }
    s.add(
        '''

The glow coming from the altar dims for a moment, then lights up again.


_"He is worse than god. He is fear itself."_


Briana looks at you, narrowing her eyes.


_"I think you have felt it."_
''',
        wholeSentence: true);
    return '${a.name} successfully performs ExamineUndergroundChurch';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room undergroundChurchAltar =
    new Room('underground_church_altar', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The altar a simple block of stone underneath a large wall-mounted ornament portraying an octopus with eight tentacles and eight black eyes at their tips. 


It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.


"You\'re brave, my friend," Briana says. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."


_"You hate orcs? This is what made them."_


Briana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The altar glows with a dim red light that reflects in the eight black eyes above it.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('underground_church', 'Sneak back',
      'You keep low and, keeping an eye on the altar, head back to the Church\'s entrance.')
]);

class WaitForRitual extends RoamingAction {
  @override
  final String command = 'Wait';

  @override
  final String name = 'wait_for_ritual';

  static final WaitForRitual singleton = new WaitForRitual();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'underground_church_altar') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.


An orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.


After the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword — attached to her hip with a rope — is as long as you are tall. 


When she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.


The three of them — the priest, the ogre and the orc — go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.


Without words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.


When the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.


_"Maggots."_


Somehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.


The ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.


But the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.


The maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.




The orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.


This has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite — an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)


You notice that the priest takes a deep breath as well.


Then, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.


The priest puts his arms down again, and — without ceremony — heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.


Briana doesn\'t look at you. "How did you know it will be maggots?"


_"I do not know."_


"Is this… I _felt_ that sound, somehow. I _felt_ it."


_"This place does something weird to people."_


"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s… let\'s just get out of here."
''',
        wholeSentence: true);
    giveStaminaToPlayer(w, 1);
    return '${a.name} successfully performs WaitForRitual';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class TakeSpearInUndergroundChurch extends RoamingAction {
  @override
  final String command = 'Take the spear';

  @override
  final String name = 'take_spear_in_underground_church';

  static final TakeSpearInUndergroundChurch singleton =
      new TakeSpearInUndergroundChurch();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'underground_church_altar') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''It\'s a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. 


But it feels right in your hand, a good throwing weapon.
''',
        wholeSentence: true);
    giveSpearToPlayer(w);
    return '${a.name} successfully performs TakeSpearInUndergroundChurch';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

Room warForge = new Room('war_forge', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You enter the enormous cave that holds Mount Bloodrock\'s war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.


''',
      wholeSentence: true);
  if (justCameFrom(w, "cave_with_agruth")) {
    s.add(
        """You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. """,
        wholeSentence: true);
  }
  s.add(
      '''

''',
      wholeSentence: true);
  if (justCameFrom(w, "smelter")) {
    s.add(
        """You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. """,
        wholeSentence: true);
  }
  s.add('', wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The air in the war forges is heavy and the noise overwhelming.


''',
      wholeSentence: true);
  rollBrianaQuote(w, s);
  s.add('', wholeSentence: true);
}, null, null, <Exit>[
  new Exit('smelter', 'Go to smelter',
      'You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.'),
  new Exit('cave_with_agruth', 'Go back to the cave with Agruth\'s corpse',
      'You sneak back towards where you left Agruth\'s body.')
]);

class WarForgeLookAround extends RoamingAction {
  @override
  final String command = 'Look around';

  @override
  final String name = 'war_forge_look_around';

  static final WarForgeLookAround singleton = new WarForgeLookAround();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'war_forge') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. 


At the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.
''',
        wholeSentence: true);
    return '${a.name} successfully performs WarForgeLookAround';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

class WarForgeWatchWorkers extends RoamingAction {
  @override
  final String command = 'Watch the workers';

  @override
  final String name = 'war_forge_watch_workers';

  static final WarForgeWatchWorkers singleton = new WarForgeWatchWorkers();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'war_forge') {
      return false;
    }
    if ((!w.actionHasBeenPerformed(name) &&
            w.actionHasBeenPerformed("war_forge_look_around")) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.


Briana shakes her head: "The orcs are working together with ogres. They must be terrified."


You scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.


"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body — a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. 


A full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.
''',
        wholeSentence: true);
    return '${a.name} successfully performs WarForgeWatchWorkers';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool get rerollable => false;

  @override
  String getRollReason(Actor a, WorldState w) {
    return 'Will you be successful?';
  }

  @override
  Resource get rerollResource => null;

  @override
  String get helpMessage => '';

  @override
  bool get isAggressive => false;
}

List<Room> allRooms = <Room>[
  caveWithAgruthPre,
  caveWithAgruth,
  exitFromBloodrock,
  forgeChurchCrevice,
  guardpostAboveChurch,
  justAfterAgruthFight,
  orcthornDoor,
  orcthornRoom,
  slaveQuarters,
  slaveQuartersPassage,
  smelter,
  startAdventure,
  theShafts,
  tunnel,
  undergroundChurch,
  undergroundChurchAltar,
  warForge
];
List<RoamingAction> allActions = <RoamingAction>[
  SearchAgruth.singleton,
  GuardpostAboveChurchTakeShield.singleton,
  NameAgruthSwordOpportunity.singleton,
  NameAgruthSwordRedemption.singleton,
  NameAgruthSwordNothing.singleton,
  TakeOrcthorn.singleton,
  SlaveQuartersContinue.singleton,
  SlaveQuartersPassageExamineDoor.singleton,
  SmelterLookAround.singleton,
  SmelterThrowSpear.singleton,
  TalkToBriana1.singleton,
  TalkToBriana2.singleton,
  TalkToBriana3.singleton,
  ExamineUndergroundChurch.singleton,
  WaitForRitual.singleton,
  TakeSpearInUndergroundChurch.singleton,
  WarForgeLookAround.singleton,
  WarForgeWatchWorkers.singleton
];

