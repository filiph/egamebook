library writers_input;

import 'package:edgehead/fractal_stories/writer_action.dart' show RoamingAction;
import 'package:edgehead/fractal_stories/actor.dart' show Actor;
import 'package:built_value/built_value.dart' show Built;
import 'package:built_value/built_value.dart' show Builder;
import 'package:edgehead/fractal_stories/room_exit.dart' show Exit;
import 'package:edgehead/fractal_stories/situation.dart' show getRandomId;
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
      '''The tunnel back to the main slave quarters is suicide. There will be too many orcs. That leaves two options. The black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The corpse lies still, getting cold.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('underground_church', 'Go to the Unholy Church',
      'You make it to the Church undetected, slipping through one of the lower windows leading into the main hall.'),
  new Exit('war_forge', 'Go to the war forges',
      'You sneak your way into the War Forges and hide in the shadows of an alcove.'),
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
        'You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)');
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

Room exitFromBloodrock = new Room('exit_from_bloodrock',
    (Actor a, WorldState w, Storyline s) {
  s.add(
      '''There is light at the end of the tunnel, Briana points ahead. You approach it with suspicion, but soon there is no question about it. The fresh air, the howling of the wind, the brightness of the light. After three years, you step out of the mountain you thought would be your grave. 


You have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. 


Then you open your eyes and see the valley and beyond. The black smoke of orc camps and razed villages. The burned forests. The cracks in the wall of the distant fort ironcast, just visible over the TODO hill. No birds, only those horrible dark eagles, with no head, and eight eyes where the neck on a normal 


"We must stop this." 


Briana: "This is much larger than us, Aren. If the dead prince is back, that\'s a problem for kings, not peasants."


"That may be so. But no kings have what I have."


"Orcthorn? Bah, you think they\'ll let you have it? A farm boy? / Muscles and a bit of brains? Don\'t be a fool, you\'re still a farm boy."


"I\'m not a farm boy. And I don\'t mean Orcthorn / my own smarts. No, I have a connection."


"A connection."


"With the dead prince. I dream his dreams. I think I have some of his power. You know  I survived 3 years even though  none other made it for more than a few months. I think he wants me for something."


"And you plan is?"


(IMG long view of the road ahead) 


"Not giving it to him. Giving him the exact opposite of what he wants."


With that, you sheathe (weapon) and start down the road towards the black fort in the distance.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null,
    <Exit>[new Exit('entrance_to_bloodrock', 'Go forth', 'You head down.')]);
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
      '''It\'s a small, circular room. There are exits on four sides, all marked with where they lead to. 




Leaning on the wall next to one of the exits is a goblin guard. He\'s sleeping. He holds a sword in one hand, and there\'s a shield laid on his lap.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('underground_church', 'Descend towards the Underground Church',
      'You take the passage leading down.'),
  new Exit('tunnel', 'Go to the upper gate',
      'You take the passage that leads out of here.'),
  new Exit('smelter', 'Go to the smelter', 'Something something.')
]);
Room justAfterAgruthFight =
    new Room('just_after_agruth_fight', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. 




"We should name that sword," Briana says, motioning to Agruth\'s scimitar. "It\'s the only thing we have going for us."
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
        '''"You\'re right. We\'ll call it Luck Bringer. It\'s our only chance to get out of this hell."




Briana nods.''');
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
        '''"You\'re right. We\'ll call it Savior. It is our first step to freedom."




Briana nods.''');
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
    s.add('"That\'s foolish. It\'s just a sword, after all."');
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
      '''There\'s a small door on the side here.
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
  final String command = 'Take the statue\'s sword';

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
        '''TODO - this must be it. the sword is held at the statue\'s back, uncharacteristic for an orc.


Briana: "I can\'t believe we did it. A farm boy and a freak."


"A freak?"


"A simple thing like this. You don\'t understand how much the orcs learned to fear the sword. A single knight could hold two dozens of orcs in check just by wielding that sword."


"Well, we still need to get out of here."''');
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
    s.add('TODO FIGHT');
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
      '''It doesn\'t take long before you start hearing voices. Orcs shouting commands, mostly. 


The tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, two orcs turn a corner and start towards you.


You step back and motion Briana to lean on the wall, hoping that the little door\'s embossed frame will provide enough cover before the two orcs turn again. 


But at that time, something or someone smashes on the door from the inside. Then come angry growls and something akin to barking.


The door stays shut but the patrol is now looking directly at you, closing in with their swords in hands.


![Orc and Goblin](img/orc_and_goblin_sketch.jpg)
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The small door is TODO open/close.
''',
      wholeSentence: true);
}, generateEscapeTunnelFight, null, <Exit>[
  new Exit('cave_with_agruth', 'Go to the working area', 'TODO'),
  new Exit('slave_quarters', 'Go further towards the Gate of Screams', 'TODO'),
  new Exit('orcthorn_door', 'Approach the little door', 'Something something.')
]);
Room smelter = new Room('smelter', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These is the smelter.


Orc teams tilt huge kettles of molten steel into troughs that lead the white-hot liquid across the room, into a large pool. From that pool, a single orc is distributing the forge-ready steel into troughs that lead to the war forges below. He\'s no more than a spear\'s throw away from you, but doesn\'t notice. In fact, he may well be blind. The other orcs are two far away and too busy to look around.


A small crevice appears to be sucking the hot air. TODO describe  other exits
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The reds and whites of the molten steel reflect in the heaps of coal.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('tunnel', 'Enter the crevice',
      'You enter the crevice. The air flows around you, pushing into your back. After a while, the crevice joins with a larger tunnel. The draft isn\'t as strong here, but it\'s still noticable, and you follow it.'),
  new Exit('war_forge', 'Go to the war forges',
      'A short passage leads to the top of the war forges room.'),
  new Exit('guardpost_above_church', 'Go through the smooth passage',
      'You enter the passage and it leads you slightly upwards to a junction.')
]);
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
    if ((!w.actionHasBeenPerformed(name) && isRoamingInBloodrock(w)) != true) {
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




"Correct. The closest safe place is the fort."''');
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
            !w.actionHasBeenPerformed(name) &&
            isRoamingInBloodrock(w)) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add('''"Where did they catch you?"




Briana: "At the Gate of Screams. I was trying to sneak in."




"You what?"




"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."''');
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
            !w.actionHasBeenPerformed(name) &&
            isRoamingInBloodrock(w)) !=
        true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add('''"What\'s Orcthorn?"


"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it."


"But they did."


"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."


"The mad guardian."


"The mad who?"


"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and that sword is still with him. Hidden in some kind of a statue."


"Where is that cell?"


"Somewhere in the slave quarters."''');
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
      '''
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


After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The Underground Church stands silent, as if holding breath.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('guardpost_above_church', 'Enter the passage',
      'You enter the passage and go a long, slightly rising way.'),
  new Exit('cave_with_agruth', 'Go back to the cave with Agruth\'s corpse',
      'You sneak out of the church, back towards where you left Agruth\'s body.'),
  new Exit('underground_church_altar', 'Go towards the altar',
      'You sneak your way among the columns, trying to stay in the shadows.')
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


Briana: "So this is it? This is where the Dead Prince resides?"


"Don\'t be a fool. This is one of many of these temples inside the mountain."


"So where is he? Everyone knows he\'s from Mt. Bloodrock."


"The Dead Prince is _somewhere_ here, that\'s correct. But where exactly? The orcs say the whole mountain is his vessel. Whatever that means."


The glow coming from the altar dims for a moment, then lights up again.''');
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
      '''TODO - altar, eight black eyes, spear that some orc must have forgotten here, there is motion behind the altar (wait)
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The altar glows with a dim red light that reflect in the eight black eyes above it.
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
    s.add('''TODO - build up with sounds


A lich orc enters from a steel door on the right of the altar and the whole temple sounds a tone that is powerful and sickening at the same time. With the lich, two huge creatures enter as well. It\'s unclear what they are, but perhaps some large breed of ogres. Their swords are as long as you are tall, but they don\'t wield them. Between the ogres, a living orc walks. Despite being a large one, probably captain or even chieftain, he visibly shakes in horror, and he is dwarfed by the two creatures leading him.''');
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
  final String command = 'Take spear';

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
    s.add('TODO - a forgotten, orcish spear');
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
      '''
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The air in the war forges is heavy and the noise overwhelming.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('smelter', 'Go to smelter',
      'You keep low, ascending the stairs. At the top the hot air hits you. You make your way through a short passage and arrive at the smelter.'),
  new Exit('cave_with_agruth', 'Go back to the cave with Agruth\'s corpse',
      'You sneak back towards where you left Agruth\'s body.')
]);
Room entranceToBloodrock =
    new Room('entrance_to_bloodrock', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. 


Briana steadies you as sway on your feet. “Now is absolutely the worst time to faint.”


“I’m fine,” you mutter. “It’s just…the sun…been so long…”


She guides you forward and you touch the cliff wall. “I don’t mean to rush you, this being your big reunion with fresh air and all, but we can’t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."


"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.


"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"


"If the Fort falls, there\'s no place far enough from here to be safe. You know that."


Briana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana’s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?” 


Blinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.
But Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it’s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it’s breathing.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('mountainside_path', 'Climb down the cliff',
      'You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.'),
  new Exit('mountain_pass_gate', 'Use the path',
      'You steel yourself and trudge down the mountain pass.')
]);
Room mountainPass =
    new Room('mountain_pass', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. 


''',
      wholeSentence: true);
  if (w.actionIsBeingPerformed("sneak_onto_cart")) {
    s.add(
        "You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",
        wholeSentence: true);
  } else {
    s.add(
        "You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",
        wholeSentence: true);
  }
  s.add(
      '''

A few miles further down and you will reach Fort Ironcast.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The Bloodrock pass flows snakelike down the mountain.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit(
      'ironcast_road', 'Go to Fort Ironcast', 'You continue towards the fort.')
]);
Room mountainPassGate =
    new Room('mountain_pass_gate', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. 


You spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.


“Looks like a supply cart,” Briana says. “And likely our way out of here. We can sneak onto the back while they’re distracted.”


You don’t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.


Briana seems to sense what you’re thinking. “A direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.”
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The Bloodrock stone gate looms ahead of you.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('mountain_pass_guard_post', 'Go to the gate',
      'You unsheathe your weapon and start towards the guards.')
]);
Room mountainPassGuardPost =
    new Room('mountain_pass_guard_post', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The orcish guards see you approaching and raise their weapons. One of them smirks.


“We’re lucky, Ruglag!” he says in a rumbling voice. “Today we kill human.”
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The stone gate looms before you.
''',
      wholeSentence: true);
}, generateMountainPassGuardPostFight, null, <Exit>[
  new Exit('mountain_pass', 'Go through the gate',
      'You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.')
]);

class SneakOntoCart extends RoamingAction {
  @override
  final String command = 'Sneak onto the back of the cart';

  @override
  final String name = 'sneak_onto_cart';

  static final SneakOntoCart singleton = new SneakOntoCart();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'mountain_pass_gate') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.
In the cart you find a small keg of beer. You decide it is worth taking.''');
    updateGlobal(w, (b) => b..hasKegOfBeer = true);
    movePlayer(w, s, "mountain_pass");
    return '${a.name} successfully performs SneakOntoCart';
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
      'With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags.';

  @override
  bool get isAggressive => false;
}

class TakeOutGateGuards extends RoamingAction {
  @override
  final String command = 'Stealthily take out some of the gate guards';

  @override
  final String name = 'take_out_gate_guards';

  static final TakeOutGateGuards singleton = new TakeOutGateGuards();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'mountain_pass_gate') {
      return false;
    }
    if ((w.actionNeverUsed(this.name)) != true) {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They’re paying attention to the argument and not much else.


You and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc’s neck while Briana digs her knife into the other guard’s gullet. You drag them behind the rock, out of sight. In one guard’s pouch you find 10 gold coins. You also take an orcish shield. 


Once done, you sneak back away from the gate.''');
    w.updateActorById(a.id, (b) => b..gold += 10);
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)orcish_shield */';
    assert(DEV_MODE || false);
    return '${a.name} successfully performs TakeOutGateGuards';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They’re paying attention to the argument and not much else.


You and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn’t see you.''');
    w.pushSituation(new TakeOutGateGuardsRescueSituation.initialized());
    return '${a.name} fails to perform TakeOutGateGuards';
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 0.5;
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
      'Two of the orcs seem distracted. You\'re not particularly good at camouflage but you can still try.';

  @override
  bool get isAggressive => false;
}

abstract class TakeOutGateGuardsRescueSituation extends Situation
    implements
        Built<TakeOutGateGuardsRescueSituation,
            TakeOutGateGuardsRescueSituationBuilder> {
  factory TakeOutGateGuardsRescueSituation(
          [updates(TakeOutGateGuardsRescueSituationBuilder b)]) =
      _$TakeOutGateGuardsRescueSituation;

  factory TakeOutGateGuardsRescueSituation.initialized() {
    return new TakeOutGateGuardsRescueSituation((b) {
      b.id = getRandomId();
      b.time = 0;
      return b;
    });
  }

  TakeOutGateGuardsRescueSituation._();

  @override
  List<RoamingAction> get actions => [
        new SimpleAction('take_out_gate_guards_rescue', 'Take the guards out',
            (a, w, s, self) {
          s.add(
              '''Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.


You find 10 gold coins in a pouch attached to one of the orcs’ belt. You also take an orcish shield. Then, you sneak back away from the gate.''');
          w.updateActorById(a.id, (b) => b..stamina -= 1);
          w.updateActorById(a.id, (b) => b..gold += 10);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)orcish_shield */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)';
        }, 'You decide to finish the job, however improbable it seems that you’ll succeed.'),
        new SimpleAction(
            'take_out_gate_guards_continuation_of_failure', 'Sneak away',
            (a, w, s, self) {
          s.add(
              'Seeing that the window of opportunity has passed, you sneak away from the rock.');
          w.popSituation();
          return 'TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)';
        }, 'It’s too risky.')
      ];

  @override
  int get id;

  @override
  int get time;

  @override
  String get name => 'take_out_gate_guards';

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

Room mountainsideBase =
    new Room('mountainside_base', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.


When it is your turn to go on watch, you see something that you haven’t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.


You give up after an hour’s work of inspection and leave it alone for now. Fort Ironcast still awaits you.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The great stone doors still stands unopened on the mountainside.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('ironcast_road', 'Go to Fort Ironcast',
      'The Fort awaits, so you press on to only road to and from Mt. Bloodrock.')
]);
Room mountainsidePath =
    new Room('mountainside_path', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. 


Over the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.


“Remind me again why we decided to go down this way?” Briana grouses. You decide to save your breath. There’s still a ways to go.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('winged_serpent_nest', 'Continue down',
      'You find a ledge you might rest on for a bit.')
]);

class ThreatenWingedSerpent extends RoamingAction {
  @override
  final String command = 'Scare off the serpent';

  @override
  final String name = 'threaten_winged_serpent';

  static final ThreatenWingedSerpent singleton = new ThreatenWingedSerpent();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'winged_serpent_nest') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        'Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.');
    movePlayer(w, s, "mountainside_base");
    return '${a.name} successfully performs ThreatenWingedSerpent';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        'The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.');
    w.pushSituation(new ThreatenWingedSerpentRescueSituation.initialized());
    return '${a.name} fails to perform ThreatenWingedSerpent';
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
      'You have a disadvantage this high up with your backs to the mountainside.';

  @override
  bool get isAggressive => false;
}

abstract class ThreatenWingedSerpentRescueSituation extends Situation
    implements
        Built<ThreatenWingedSerpentRescueSituation,
            ThreatenWingedSerpentRescueSituationBuilder> {
  factory ThreatenWingedSerpentRescueSituation(
          [updates(ThreatenWingedSerpentRescueSituationBuilder b)]) =
      _$ThreatenWingedSerpentRescueSituation;

  factory ThreatenWingedSerpentRescueSituation.initialized() {
    return new ThreatenWingedSerpentRescueSituation((b) {
      b.id = getRandomId();
      b.time = 0;
      return b;
    });
  }

  ThreatenWingedSerpentRescueSituation._();

  @override
  List<RoamingAction> get actions => [
        new SimpleAction('threaten_winged_serpent_rescue', 'Get Briana’s help',
            (a, w, s, self) {
          s.add(
              'Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature’s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: subtract 2 from player\'s luck */';
          assert(DEV_MODE || false);
          movePlayer(w, s, "mountainside_base");
          w.popSituation();
          return 'ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana’s help)';
        }, 'Maybe your companion has an answer.'),
        new SimpleAction('threaten_winged_serpent_continuation_of_failure',
            'Face the winged serpent head on', (a, w, s, self) {
          s.add('''You slash at the serpent’s head as it moves in to strike you!


But the sky is the creature’s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It’s now a matter of what kills you first: the fall or the venom.''');
          w.updateActorById(a.id, (b) => b..hitpoints = 0);
          w.popSituation();
          return 'ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)';
        }, 'You will attack the creature straight on.')
      ];

  @override
  int get id;

  @override
  int get time;

  @override
  String get name => 'threaten_winged_serpent';

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

class SootheWingedSerpent extends RoamingAction {
  @override
  final String command = 'Soothe the serpent';

  @override
  final String name = 'soothe_winged_serpent';

  static final SootheWingedSerpent singleton = new SootheWingedSerpent();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'winged_serpent_nest') {
      return false;
    }
    '/* PLEASE IMPLEMENT PREREQUISITE: player has (DOLLAR_SIGN)animal_kinship */';
    assert(DEV_MODE || false);
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        'Your sibilant words reach the winged serpent’s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it’s time to move on.');
    movePlayer(w, s, "mountainside_base");
    return '${a.name} successfully performs SootheWingedSerpent';
  }

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        'The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.');
    w.pushSituation(new SootheWingedSerpentRescueSituation.initialized());
    return '${a.name} fails to perform SootheWingedSerpent';
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 0.8;
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
      'The creature is only defending its nest—maybe you can convince it that you mean no harm.';

  @override
  bool get isAggressive => false;
}

abstract class SootheWingedSerpentRescueSituation extends Situation
    implements
        Built<SootheWingedSerpentRescueSituation,
            SootheWingedSerpentRescueSituationBuilder> {
  factory SootheWingedSerpentRescueSituation(
          [updates(SootheWingedSerpentRescueSituationBuilder b)]) =
      _$SootheWingedSerpentRescueSituation;

  factory SootheWingedSerpentRescueSituation.initialized() {
    return new SootheWingedSerpentRescueSituation((b) {
      b.id = getRandomId();
      b.time = 0;
      return b;
    });
  }

  SootheWingedSerpentRescueSituation._();

  @override
  List<RoamingAction> get actions => [
        new SimpleAction('soothe_winged_serpent_rescue', 'Get Briana’s help',
            (a, w, s, self) {
          s.add(
              'Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature’s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: subtract 2 from player\'s luck */';
          assert(DEV_MODE || false);
          movePlayer(w, s, "mountainside_base");
          w.popSituation();
          return 'SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana’s help)';
        }, 'Maybe your companion has an answer.'),
        new SimpleAction('soothe_winged_serpent_continuation_of_failure',
            'Face the winged serpent head on', (a, w, s, self) {
          s.add('''You slash at the serpent’s head as it moves in to strike you!


But the sky is the creature’s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It’s now a matter of what kills you first: the fall or the venom.''');
          w.updateActorById(a.id, (b) => b..hitpoints = 0);
          w.popSituation();
          return 'SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)';
        }, 'You will attack the creature straight on.')
      ];

  @override
  int get id;

  @override
  int get time;

  @override
  String get name => 'soothe_winged_serpent';

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

class ThreatenWingedSerpentEggs extends RoamingAction {
  @override
  final String command = 'Threaten the serpent’s eggs';

  @override
  final String name = 'threaten_winged_serpent_eggs';

  static final ThreatenWingedSerpentEggs singleton =
      new ThreatenWingedSerpentEggs();

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).currentRoomName !=
        'winged_serpent_nest') {
      return false;
    }
    return true;
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. 




You grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.




“Good thinking, throwing that egg,” said Briana.




“Yes, well, I just had to make it think I threw it,” you say, and show her the serpent egg in your hand. “I just threw the rock I had in my other hand.”




Briana whistled. “That should fetch some coin from the right merchants. Now, let’s get out of here before that thing comes back.”''');
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)gained_serpent_egg=true */';
    assert(DEV_MODE || false);
    movePlayer(w, s, "mountainside_base");
    return '${a.name} successfully performs ThreatenWingedSerpentEggs';
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
  String get helpMessage => 'Perhaps you can divert its attention.';

  @override
  bool get isAggressive => false;
}

abstract class ThreatenWingedSerpentEggsRescueSituation extends Situation
    implements
        Built<ThreatenWingedSerpentEggsRescueSituation,
            ThreatenWingedSerpentEggsRescueSituationBuilder> {
  factory ThreatenWingedSerpentEggsRescueSituation(
          [updates(ThreatenWingedSerpentEggsRescueSituationBuilder b)]) =
      _$ThreatenWingedSerpentEggsRescueSituation;

  factory ThreatenWingedSerpentEggsRescueSituation.initialized() {
    return new ThreatenWingedSerpentEggsRescueSituation((b) {
      b.id = getRandomId();
      b.time = 0;
      return b;
    });
  }

  ThreatenWingedSerpentEggsRescueSituation._();

  @override
  List<RoamingAction> get actions => [
        new SimpleAction(
            'threaten_winged_serpent_eggs_rescue', 'Get Briana’s help',
            (a, w, s, self) {
          s.add(
              'Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature’s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: subtract 2 from player\'s luck */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)gained_serpent_egg=true */';
          assert(DEV_MODE || false);
          movePlayer(w, s, "mountainside_base");
          w.popSituation();
          return 'ThreatenWingedSerpentEggsRescueSituation resolved with rescue/continuation (Get Briana’s help)';
        }, 'Maybe your companion has an answer.'),
        new SimpleAction('threaten_winged_serpent_eggs_continuation_of_failure',
            'Face the winged serpent head on', (a, w, s, self) {
          s.add('''You slash at the serpent’s head as it moves in to strike you!


But the sky is the creature’s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It’s now a matter of what kills you first: the fall or the venom.
END''');
          w.updateActorById(a.id, (b) => b..hitpoints = 0);
          w.popSituation();
          return 'ThreatenWingedSerpentEggsRescueSituation resolved with rescue/continuation (Face the winged serpent head on)';
        }, 'You will attack the creature straight on.')
      ];

  @override
  int get id;

  @override
  int get time;

  @override
  String get name => 'threaten_winged_serpent_eggs';

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

Room wingedSerpentNest =
    new Room('winged_serpent_nest', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. 


A few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. 


Briana joins you, breathing hard from the exertion. 


“I’d rather the orcs kill us than do it ourselves,” she says when she catches her breath. “I’d also like to stay on this ledge forever, if you don’t mind.”


Before you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. 


“It’s…a nest?” Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.


What manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. 


A large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.


You must defend yourselves.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''The sheer cliff of the mountainside impedes your progress.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('mountainside_base', 'Continue down',
      'You continue your descent to level ground. Thankfully, the end is in sight.')
]);
Room ironcastRoad =
    new Room('ironcast_road', (Actor a, WorldState w, Storyline s) {
  s.add(
      '''You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.


The last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. 


And now you are trudging the opposite way, in a bid to save the people who once failed to save you. 


A movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. 


With only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.


And right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.


“Stand up.”  


You grit your teeth and moan as the pain explodes in your skull. “Aren?” hisses Briana. “Aren, what’s wrong?” 


“Get out of my head!” you moan, clutching at your head even as your legs start to lift you upright. Only Briana’s death grip on your arm keeps you low in the grass. 


And still the voice speaks again, relentless as the sea. “You are mine,” it says. “Your flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!” 


“No!” Yet another voice pierces your mind: Briana’s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana’s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.


“What did you...” you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.


When they leave, you turn to Briana. “It’s a gift we fae have,” she said. “We can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?”


“Much,” you reply. “Briana...thanks.”


“Don’t mention it. You mind telling me what that...thing in your head was?”


“Another time.” You get up and pull her along. “Run now, talk later. Let’s get to safety.”


Together you jog all the way to the every growing silhouette of Fort Ironcast.
''',
      wholeSentence: true);
}, (Actor a, WorldState w, Storyline s) {
  s.add(
      '''A dirt road streaks through the grass. In the distance, a stone fort looms.
''',
      wholeSentence: true);
}, null, null, <Exit>[
  new Exit('__END_OF_ROAM__', 'Go to Fort Ironcast (UNIMPLEMENTED)',
      'You make your way closer to the fort.')
]);
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
  warForge,
  entranceToBloodrock,
  mountainPass,
  mountainPassGate,
  mountainPassGuardPost,
  mountainsideBase,
  mountainsidePath,
  wingedSerpentNest,
  ironcastRoad
];
List<RoamingAction> allActions = <RoamingAction>[
  SearchAgruth.singleton,
  NameAgruthSwordOpportunity.singleton,
  NameAgruthSwordRedemption.singleton,
  NameAgruthSwordNothing.singleton,
  TakeOrcthorn.singleton,
  SlaveQuartersContinue.singleton,
  TalkToBriana1.singleton,
  TalkToBriana2.singleton,
  TalkToBriana3.singleton,
  ExamineUndergroundChurch.singleton,
  WaitForRitual.singleton,
  TakeSpearInUndergroundChurch.singleton,
  SneakOntoCart.singleton,
  TakeOutGateGuards.singleton,
  ThreatenWingedSerpent.singleton,
  SootheWingedSerpent.singleton,
  ThreatenWingedSerpentEggs.singleton
];

