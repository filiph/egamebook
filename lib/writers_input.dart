import 'package:edgehead/fractal_stories/action.dart' show Action;
import 'package:edgehead/fractal_stories/actor.dart' show Actor;
import 'package:edgehead/fractal_stories/room_exit.dart' show Exit;
import 'package:edgehead/fractal_stories/action.dart' show Resource;
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart'
    show RoomRoamingSituation;
import 'package:edgehead/fractal_stories/room.dart' show Room;
import 'package:edgehead/fractal_stories/storyline/storyline.dart'
    show Storyline;
import 'package:edgehead/fractal_stories/world.dart' show WorldState;

const bool DEV_MODE = true;
Room entranceToBloodrock = new Room(
    'entranceToBloodrock',
    '''You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. 
Briana steadies you as sway on your feet. “Now is absolutely the worst time to faint.”
“I’m fine,” you mutter. “It’s just…the sun…been so long…”
She guides you forward and you touch the cliff wall. “I don’t mean to rush you, this being your big reunion with fresh air and all, but we can’t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."
"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.
"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"
"If the Fort falls, there\'s no place far enough from here to be safe. You know that."
Briana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana’s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?” 
Blinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.
But Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it’s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?''',
    'The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it’s breathing.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit('mountainsidePath',
          'You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.'),
      new Exit('mountainPassGate',
          'You steel yourself and trudge down the mountain pass.')
    ]);
Room mountainPass = new Room(
    'mountainPass',
    '''The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. 


If hidden in cart=true
You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.


A few miles further down and you will reach Fort Ironcast.''',
    'The Bloodrock pass flows snakelike down the mountain.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[new Exit('ironcastRoad', 'You continue towards the fort.')]);
Room mountainPassGate = new Room(
    'mountainPassGate',
    '''The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. 


You spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.


“Looks like a supply cart,” Briana says. “And likely our way out of here. We can sneak onto the back while they’re distracted.”


You don’t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.


Briana seems to sense what you’re thinking. “A direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.”''',
    'The Bloodrock stone gate looms ahead of you.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit('mountainPassGuardPost',
          'You unsheathe (DOLLAR_SIGN)weapon and start towards the guards.')
    ]);
Room mountainPassGuardPost = new Room(
    'mountainPassGuardPost',
    '''The orcish guards see you approaching and raise their weapons. One of them smirks.


“We’re lucky, Ruglag!” he says in a rumbling voice. “Today we kill human.”''',
    'The stone gate looms before you.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit('mountainPass',
          'You release the winch holding the gate closed. The gate swing ponderously outward, just enough for you and Briana to squeeze through to freedom.')
    ]);

class SneakOntoCart extends Action {
  final command = 'Sneak onto the back of the cart';

  final name = 'SneakOntoCart';

  static final SneakOntoCart singleton = new SneakOntoCart();

  bool isApplicable(Actor a, WorldState w) {
    '/* PLEASE IMPLEMENT PREREQUISITE: none */';
    assert(DEV_MODE || false);
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'mountainPassGate';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.
In the cart you find a small keg of beer. You decide it is worth taking.''');
    '''/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)enter_mountain_pass=true
(DOLLAR_SIGN)hidden_cart = true
(DOLLAR_SIGN)location = (DOLLAR_SIGN)mountain_pass
(DOLLAR_SIGN)keg_of_beer */''';
    assert(DEV_MODE || false);
    return '$a successfully performs SneakOntoCart';
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

class TakeOutGateGuards extends Action {
  final command = 'Stealthily take out some of the gate guards';

  final name = 'TakeOutGateGuards';

  static final TakeOutGateGuards singleton = new TakeOutGateGuards();

  bool isApplicable(Actor a, WorldState w) {
    '/* PLEASE IMPLEMENT PREREQUISITE: (DOLLAR_SIGN)take_out_gate_guards never used */';
    assert(DEV_MODE || false);
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'mountainPassGate';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They’re paying attention to the argument and not much else.


You and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc’s neck while Briana digs her knife into the other guard’s gullet. You drag them behind the rock, out of sight. In one guard’s pouch you find 10 gold coins. You also take an orcish shield. 


Once done, you sneak back away from the gate.''');
    '''/* PLEASE IMPLEMENT SUCCESS_EFFECT: 10 gold
(DOLLAR_SIGN)orcish_shield */''';
    assert(DEV_MODE || false);
    return '$a successfully performs TakeOutGateGuards';
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They’re paying attention to the argument and not much else.


You and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn’t see you.''');
    return '$a fails to perform TakeOutGateGuards';
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 0.5;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

Room mountainsideBase = new Room(
    'mountainsideBase',
    '''After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.


When it is your turn to go on watch, you see something that you haven’t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.


You give up after an hour’s work of inspection and leave it alone for now. Fort Ironcast still awaits you.''',
    'The great stone doors still stands unopened on the mountainside.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit('ironcastRoad',
          'The Fort awaits, so you press on to only road to and from Mt. Bloodrock.')
    ]);
Room mountainsidePath = new Room(
    'mountainsidePath',
    '''You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. 


Over the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.


“Remind me again why we decided to go down this way?” Briana grouses. You decide to save your breath. There’s still a ways to go.''',
    '',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit(
          'wingedSerpentNest', 'You find a ledge you might rest on for a bit.')
    ]);

class ThreatenWingedSerpent extends Action {
  final command = 'scare off the serpent';

  final name = 'ThreatenWingedSerpent';

  static final ThreatenWingedSerpent singleton = new ThreatenWingedSerpent();

  bool isApplicable(Actor a, WorldState w) {
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'wingedSerpentNest';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        'Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.');
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
    assert(DEV_MODE || false);
    return '$a successfully performs ThreatenWingedSerpent';
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        'The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.');
    return '$a fails to perform ThreatenWingedSerpent';
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 0.3;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

class SootheWingedSerpent extends Action {
  final command = 'soothe the serpent';

  final name = 'SootheWingedSerpent';

  static final SootheWingedSerpent singleton = new SootheWingedSerpent();

  bool isApplicable(Actor a, WorldState w) {
    '/* PLEASE IMPLEMENT PREREQUISITE: player has (DOLLAR_SIGN)animal_kinship */';
    assert(DEV_MODE || false);
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'wingedSerpentNest';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        'Your sibilant words reach the winged serpent’s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it’s time to move on.');
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
    assert(DEV_MODE || false);
    return '$a successfully performs SootheWingedSerpent';
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        'The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.');
    return '$a fails to perform SootheWingedSerpent';
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 0.8;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

class ThreatenWingedSerpentEggs extends Action {
  final command = 'threaten the serpent’s eggs';

  final name = 'ThreatenWingedSerpentEggs';

  static final ThreatenWingedSerpentEggs singleton =
      new ThreatenWingedSerpentEggs();

  bool isApplicable(Actor a, WorldState w) {
    '/* PLEASE IMPLEMENT PREREQUISITE: None */';
    assert(DEV_MODE || false);
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'wingedSerpentNest';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        '''You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. 


You grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.


“Good thinking, throwing that egg,” said Briana.


“Yes, well, I just had to make it think I threw it,” you say, and show her the serpent egg in your hand. “I just threw the rock I had in my other hand.”


Briana whistled. “That should fetch some coin from the right merchants. Now, let’s get out of here before that thing comes back.”''');
    '''/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)gained_serpent_egg=true
location = (DOLLAR_SIGN)mountainside_base */''';
    assert(DEV_MODE || false);
    return '$a successfully performs ThreatenWingedSerpentEggs';
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

Room wingedSerpentNest = new Room(
    'wingedSerpentNest',
    '''After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. 


A few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. 


Briana joins you, breathing hard from the exertion. 


“I’d rather the orcs kill us than do it ourselves,” she says when she catches her breath. “I’d also like to stay on this ledge forever, if you don’t mind.”


Before you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. 


“It’s…a nest?” Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.


What manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. 


A large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.


You must defend yourselves.''',
    'The sheer cliff of the mountainside impedes your progress.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit('__END_OF_ROAM__',
          'You continue your descent to level ground. Thankfully, the end is in sight. (UNIMPLEMENTED)')
    ]);
Room ironcastRoad = new Room(
    'ironcastRoad',
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


Together you jog all the way to the every growing silhouette of Fort Ironcast.''',
    'A dirt road streaks through the grass. In the distance, a stone fort looms.',
    (WorldState w) => const <Actor>[],
    null,
    <Exit>[
      new Exit('__END_OF_ROAM__',
          'You make your way closer to the fort. (UNIMPLEMENTED)')
    ]);

class HideInGrass extends Action {
  final command = 'Take cover in the tall grass';

  final name = 'HideInGrass';

  static final HideInGrass singleton = new HideInGrass();

  bool isApplicable(Actor a, WorldState w) {
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'ironcastRoad';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    s.add(
        'You sink to your knees below the grass and hold your breath. The orcs pass close, but given their proximity to Fort Ironcast don’t seem eager to linger. They hurry onwards back to the mountain pass. When they are specks in the distance, you stand up and continue on.');
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)ironcast_road_clear = true */';
    assert(DEV_MODE || false);
    return '$a successfully performs HideInGrass';
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 100%');
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

class StandAndFight extends Action {
  final command = 'Stand and fight';

  final name = 'StandAndFight';

  static final StandAndFight singleton = new StandAndFight();

  bool isApplicable(Actor a, WorldState w) {
    return (w.currentSituation as RoomRoamingSituation).currentRoomName ==
        'ironcastRoad';
  }

  String applySuccess(Actor a, WorldState w, Storyline s) {
    throw new StateError('Success chance is 0%.');
  }

  String applyFailure(Actor a, WorldState w, Storyline s) {
    s.add(
        'You raise a war cry and close the gap against the battle-eager orcs. But it soon becomes clear that you are outnumbered and outflanked. The orcs surround you, beat you down, and cast you in chains. You trail blood as you are led up the mountain pass you traversed years ago, once again a slave.');
    return '$a fails to perform StandAndFight';
  }

  num getSuccessChance(Actor a, WorldState w) {
    return 0.0;
  }

  bool get rerollable => false;

  String getRollReason(Actor a, WorldState w) {
    throw new StateError('Not rerollable.');
  }

  Resource get rerollResource => null;

  String get helpMessage => null;

  bool get isAggressive => false;
}

List<Room> allRooms = <Room>[
  entranceToBloodrock,
  mountainPass,
  mountainPassGate,
  mountainPassGuardPost,
  mountainsideBase,
  mountainsidePath,
  wingedSerpentNest,
  ironcastRoad
];
List<Action> allActions = <Action>[
  SneakOntoCart.singleton,
  TakeOutGateGuards.singleton,
  ThreatenWingedSerpent.singleton,
  SootheWingedSerpent.singleton,
  ThreatenWingedSerpentEggs.singleton,
  HideInGrass.singleton,
  StandAndFight.singleton
];

