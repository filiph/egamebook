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
import 'package:edgehead/writers_input_helpers.dart';
part 'writers_input.g.dart';

const bool DEV_MODE = true;
Room entranceToBloodrock = new Room(
    'entrance_to_bloodrock',
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
    null,
    null,
    <Exit>[
      new Exit('mountainside_path', 'Climb down the cliff',
          'You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.'),
      new Exit('mountain_pass_gate', 'Use the path',
          'You steel yourself and trudge down the mountain pass.')
    ]);
Room mountainPass = new Room(
    'mountain_pass',
    '''The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. 


If hidden in cart=true
You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.


A few miles further down and you will reach Fort Ironcast.''',
    'The Bloodrock pass flows snakelike down the mountain.',
    null,
    null,
    <Exit>[
      new Exit('ironcast_road', 'Go to Fort Ironcast',
          'You continue towards the fort.')
    ]);
Room mountainPassGate = new Room(
    'mountain_pass_gate',
    '''The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. 


You spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.


“Looks like a supply cart,” Briana says. “And likely our way out of here. We can sneak onto the back while they’re distracted.”


You don’t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.


Briana seems to sense what you’re thinking. “A direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.”''',
    'The Bloodrock stone gate looms ahead of you.',
    null,
    null,
    <Exit>[
      new Exit('mountain_pass_guard_post', 'Go to the gate',
          'You unsheathe (DOLLAR_SIGN)weapon and start towards the guards.')
    ]);
Room mountainPassGuardPost = new Room(
    'mountain_pass_guard_post',
    '''The orcish guards see you approaching and raise their weapons. One of them smirks.


“We’re lucky, Ruglag!” he says in a rumbling voice. “Today we kill human.”''',
    'The stone gate looms before you.',
    mountainPassGuardPostMonsters,
    null,
    <Exit>[
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
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)hidden_cart = true */';
    assert(DEV_MODE || false);
    movePlayer(w, "mountain_pass");
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)keg_of_beer */';
    assert(DEV_MODE || false);
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
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: 10 gold */';
    assert(DEV_MODE || false);
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
            (a, w, s, movePlayer) {
          s.add(
              '''Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.


You find 10 gold coins in a pouch attached to one of the orcs’ belt. You also take an orcish shield. Then, you sneak back away from the gate.''');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: lose 1 luck */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: 10 gold */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)orcish_shield */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)';
        }, 'You decide to finish the job, however improbable it seems that you’ll succeed.'),
        new SimpleAction(
            'take_out_gate_guards_continuation_of_failure', 'MISSING',
            (a, w, s, movePlayer) {
          s.add(
              'Seeing that the window of opportunity has passed, you sneak away from the rock.');
          w.popSituation();
          return 'TakeOutGateGuardsRescueSituation resolved with rescue/continuation (MISSING)';
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

Room mountainsideBase = new Room(
    'mountainside_base',
    '''After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.


When it is your turn to go on watch, you see something that you haven’t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.


You give up after an hour’s work of inspection and leave it alone for now. Fort Ironcast still awaits you.''',
    'The great stone doors still stands unopened on the mountainside.',
    null,
    null,
    <Exit>[
      new Exit('ironcast_road', 'Go to Fort Ironcast',
          'The Fort awaits, so you press on to only road to and from Mt. Bloodrock.')
    ]);
Room mountainsidePath = new Room(
    'mountainside_path',
    '''You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. 


Over the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.


“Remind me again why we decided to go down this way?” Briana grouses. You decide to save your breath. There’s still a ways to go.''',
    '',
    null,
    null,
    <Exit>[
      new Exit('winged_serpent_nest', 'Continue down',
          'You find a ledge you might rest on for a bit.')
    ]);

class ThreatenWingedSerpent extends RoamingAction {
  @override
  final String command = 'scare off the serpent';

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
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
    assert(DEV_MODE || false);
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
        new SimpleAction('threaten_winged_serpent_rescue', 'get Briana’s help',
            (a, w, s, movePlayer) {
          s.add(
              'Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature’s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: subtract 2 from player\'s luck */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (get Briana’s help)';
        }, 'Maybe your companion has an answer.'),
        new SimpleAction('threaten_winged_serpent_continuation_of_failure',
            'face the winged serpent head on.', (a, w, s, movePlayer) {
          s.add('''You slash at the serpent’s head as it moves in to strike you!
But the sky is the creature’s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It’s now a matter of what kills you first: the fall or the venom.
END''');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)player_death=true */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (face the winged serpent head on.)';
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
  final String command = 'soothe the serpent';

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
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
    assert(DEV_MODE || false);
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
        new SimpleAction('soothe_winged_serpent_rescue', 'get Briana’s help',
            (a, w, s, movePlayer) {
          s.add(
              'Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature’s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: subtract 2 from player\'s luck */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'SootheWingedSerpentRescueSituation resolved with rescue/continuation (get Briana’s help)';
        }, 'Maybe your companion has an answer.'),
        new SimpleAction('soothe_winged_serpent_continuation_of_failure',
            'face the winged serpent head on.', (a, w, s, movePlayer) {
          s.add('''You slash at the serpent’s head as it moves in to strike you!
But the sky is the creature’s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It’s now a matter of what kills you first: the fall or the venom.
END''');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)player_death=true */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'SootheWingedSerpentRescueSituation resolved with rescue/continuation (face the winged serpent head on.)';
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
  final String command = 'threaten the serpent’s eggs';

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
    '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
    assert(DEV_MODE || false);
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
            'threaten_winged_serpent_eggs_rescue', 'get Briana’s help',
            (a, w, s, movePlayer) {
          s.add(
              'Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature’s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: subtract 2 from player\'s luck */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)gained_serpent_egg=true */';
          assert(DEV_MODE || false);
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: location = (DOLLAR_SIGN)mountainside_base */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'ThreatenWingedSerpentEggsRescueSituation resolved with rescue/continuation (get Briana’s help)';
        }, 'Maybe your companion has an answer.'),
        new SimpleAction('threaten_winged_serpent_eggs_continuation_of_failure',
            'face the winged serpent head on.', (a, w, s, movePlayer) {
          s.add('''You slash at the serpent’s head as it moves in to strike you!
But the sky is the creature’s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It’s now a matter of what kills you first: the fall or the venom.
END''');
          '/* PLEASE IMPLEMENT SUCCESS_EFFECT: (DOLLAR_SIGN)player_death=true */';
          assert(DEV_MODE || false);
          w.popSituation();
          return 'ThreatenWingedSerpentEggsRescueSituation resolved with rescue/continuation (face the winged serpent head on.)';
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

Room wingedSerpentNest = new Room(
    'winged_serpent_nest',
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
    null,
    null,
    <Exit>[
      new Exit('__END_OF_ROAM__', 'Continue down (UNIMPLEMENTED)',
          'You continue your descent to level ground. Thankfully, the end is in sight.')
    ]);
Room ironcastRoad = new Room(
    'ironcast_road',
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
    null,
    null,
    <Exit>[
      new Exit('__END_OF_ROAM__', 'Go to Fort Ironcast (UNIMPLEMENTED)',
          'You make your way closer to the fort.')
    ]);
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
List<RoamingAction> allActions = <RoamingAction>[
  SneakOntoCart.singleton,
  TakeOutGateGuards.singleton,
  ThreatenWingedSerpent.singleton,
  SootheWingedSerpent.singleton,
  ThreatenWingedSerpentEggs.singleton
];

