library Scripter_Implementation;

import '../../lib/src/book/scripter.dart';
import 'dart:math';

import '../libraries/timeline.dart';

// Just a mock before this gets implemented
class Points {
  int points = 0;
  void add(int value, [String text]) {
    points += value;
  }
}


class ScripterImpl extends EgbScripter {

  /* LIBRARY */

  bool randomWithProbability(num p) => (new Random()).nextDouble() < p;
  String percentage(num x) => (x * 100).toStringAsFixed(0);  // TODO: better

  ScripterImpl() : super() {
    /* PAGES & BLOCKS */
    pageMap = new EgbScripterPageMap();
    pageMap[r"""Start: Funeral"""] = new EgbScripterPage(
      [
          """## The Funeral""",
          """This story starts and ends with a death, on a spaceship. """,
          """The first death is that of Captain Kay. He was the second last surviving crew member on The Bodega. The ship used to carry twelve people. Now, it's only you. (Well, almost. But we'll get to that later.) """,
          """The funeral looks like this: You are standing in front of the airlock. Through the porthole, you can see the captain's body lying on the floor, naked and reddish and stiff. Just like all the others before him. Your hand is on the lever that will open the airlock's outside door. Through that door, once open, Captain Kay will be sucked out into space. This is how funerals work here on The Bodega. """,
          """The inner door, through which you're watching, is safely closed and sealed. The only thing that remains is to pull the lever.""",
          () {
echo("Hi.");
outerspace.elapse();
        },
          [
            null,
          {
            "string": () => """Pull the lever""",
  "goto": r"""Start: Pull"""          },
          {
            "string": () => """Leave the body there""",
  "goto": r"""Start: Leave body"""          }
        ]
        ]
    );
    pageMap[r"""Start: Pull"""] = new EgbScripterPage(
      [
          """You pull the lever, there's a loud hiss, and the body is immediately pulled out through the hatch. It starts receding into space while slowly rotating along all three axes.""",
          () {
points.add(5, "playing by the book");  // prints out "+5 points for _playing by the book_"
pulledLever = true;
        },
          [
            null,
          {
            "goto": r"""Recollections"""          }
        ]
        ]
    );
    pageMap[r"""Start: Leave body"""] = new EgbScripterPage(
      [
          """You withdraw your hand from the lever.""",
          () {
points.add(2, "humanity");
pulledLever = false;
        },
          [
            null,
          {
            "goto": r"""Recollections"""          }
        ]
        ]
    );
    pageMap[r"""Start: Recollections"""] = new EgbScripterPage(
      [
          """Captain Kay was a great man. He was confident and direct – important traits in a captain. He also had a knack for hands-on engineering, which made him especially dear to you. You enjoyed spending a time with him in the engine room, poking into machinery together and setting up circuits in ingenious and clever ways. It always worked in the end, largely thanks to him.""",
          """While you reminisce the good times, the intercom on the wall starts ringing loudly and blinking with a red light. The ringtone and the color-coding means "to all crew" -- in other words, everyone in their ability should pick it up.""",
          () {
outerspace.elapse();
        },
          [
            null,
          {
            "string": () => """Ignore it""",
  "goto": r"""Ignore"""          },
          {
            "string": () => """Pick it up""",
  "goto": r"""Pick it up"""          }
        ]
        ]
    );
    pageMap[r"""Start: Ignore"""] = new EgbScripterPage(
      [
          """You decide to ignore """,
          """TODO: ship computer speaks over speakers""",
          [
            null,
          {
            "goto": r"""Ship says"""          }
        ]
        ]
    );
    pageMap[r"""Start: Pick it up"""] = new EgbScripterPage(
      [
          """The intercom, in this case, is an old school handset wired to the wall with a spiral cable. It's easier to maintain, less faulty, and it only picks up one person's voice, so it's easier to understand the other end. It also makes it possible to have conversations that are meant for a limited audience, as opposed to everyone in the room. Sometimes, it's needed to break news that are not intended for the whole crew.""",
          """The cable is there mostly so that the handset stays put where it belongs (but it does conduct the audio signal to and from the handset).""",
          """You pick the handset up. It's the ship computer.""",
          [
            null,
          {
            "goto": r"""Ship says"""          }
        ]
        ]
    );
    pageMap[r"""Start: Ship says"""] = new EgbScripterPage(
      [
          """"To all whom it may concern," she says. "There is a gorilla on the bridge. I repeat, a gorilla. On the bridge." """,
          () {
outerspace.elapse();
        },
          [
            () => """What do you reply?""",
          {
            "string": () => """"I'm coming." """,
  "goto": r"""Coming"""          },
          {
            "string": () => """"Can't this wait? There is a funeral going on, you know." """,
  "goto": r"""Can't this wait?"""          }
        ]
        ]
    );
    pageMap[r"""Start: Can't this wait?"""] = new EgbScripterPage(
      [
          """"Oh, I'm sorry," the ship says. "I didn't want to ruin the moment by, you know, _trying to stop another disaster from happening!_ The bridge, you might recall, is a place with lots of electronics and, interestingly, also the control panel to _the whole goddamned ship._ In summary, this is no place for a stupid gorilla." """,
          [
            null,
          {
            "string": () => """"Okay, okay, I'm coming." """,
  "goto": r"""Coming"""          }
        ]
        ]
    );
    pageMap[r"""Start: Coming"""] = new EgbScripterPage(
      [
          () {
            echo("""You give Captain Kay's ${pulledLever ? "receding" : ""} body the last glance, and run off in the direction of the bridge.""");
          },
          [
            null,
          {
            "goto": r"""Bridge: Gorilla incident"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Gorilla incident"""] = new EgbScripterPage(
      [
          () {
outerspace.elapse();
        },
          """## The Gorilla""",
          """There really is a gorilla on the bridge. But it isn't touching any of the electronics, let alone the control panel. It just sits there on the floor, full of melancholy, looking out the window on the stars. When you enter, it slowly turns to you and pushes out its huge lower lip. """,
          """It's your Enhanced Gorilla. They are used throughout the system for hard manual labor. Their intelligence is improved artificially -- they can understand basic spoken commands and they even have the ability to communicate back via sign language. A very limited kind of sign language, of course, with their vocabulary consisting mainly of the words "food", "sleep" and "want". But people don't need Enhanced Gorillas to be eloquent. They need them to lift and push and sometimes smash. _Your_ gorilla mostly carries extremely heavy fuel cells back and forth. """,
          """Your gorilla doesn't have a name. You call it 'Gorilla', as is common with these creatures. They die a lot. Nobody wants to get too attached to them, and naming the animal is the surest way to do just that.""",
          """Gorilla raises its arms to sign. First, it makes the sign for "me" and then it makes the sign for "sleep". It probably doesn't want to say that it is sleeping. More likely, it is trying to use its limited vocabulary to communicate that it is sad. But you can never say for sure.""",
          """"The gorilla stays," you say to the ship computer. "It just sits there. And it definitely won't touch anything while I'm here." """,
          """The ship is silent for a while. Then she chooses to ignore the topic entirely and moves on.""",
          """TODO: instead of move to space station, initiate engine power on sequence""",
          """"I don't want to unnerve you, but considering that you are likely contaminated with the same illness as everyone else, and that we have no data on the incubation period, I assume you want to make it to the nearest dock as soon as possible. The engine is now back online, and Station Unity is twenty to fourty hours from here. All available energy to the engines?" """,
          () {
// persistence for the ship
// TODO: ship class, persistence with http://www.dartlang.org/articles/reflection-with-mirrors/ 
// or http://api.dartlang.org/docs/releases/latest/serialization.html 
bodega = {
  "hp": 100
};
        },
          [
            null,
          {
            "string": () => """"Yes. Full steam ahead!" [20 hours]""",
  "goto": r"""Full speed"""          },
          {
            "string": () => """"No. Keep the shields and the radar on." [40 hours]""",
  "goto": r"""Shields on"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Full speed"""] = new EgbScripterPage(
      [
          """Usually, the ship would remark on the cliché, but not today. Without words, she immediately shuts off the radar and the shields, then powers on the engine at 100%. You are accelerating at at full capacity in a matter of minutes.""",
          () {
eta = 20;
shieldsUp = false;
radarUp = false;
        },
          [
            null,
          {
            "goto": r"""A nap"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Shields on"""] = new EgbScripterPage(
      [
          """"That is... considerate," the ship replies. "I will be using the radar just to periodically check for objects on collision course with us. In between, I'll divert the energy to the engine. That should shave two or three hours off the travel time." You hear and feel the engines accelerating.""",
          () {
points.add(5, "upholding interplanetary travel safety standards");
points.add(10, "being genre savvy");
eta = 38;
shieldsUp = true;
radarUp = true;
        },
          [
            null,
          {
            "goto": r"""A nap"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: A nap"""] = new EgbScripterPage(
      [
          () {
            echo("""Station Unity is around $eta hours away and you are dog-tired. You spent the last couple of days slaving away – together with Gorilla and Captain Kay – to repair the engine. It had broken down in the middle of nowhere.""");
          },
          """Meanwhile, the rest of the crew were busy dying. One by one.""",
          """You slouch into the captain's chair and, almost immediately, your eye lids get heavy. You try to stay up, but there is no way you can fight this. Soon, the most comfortable embrace of sleep puts you under.""",
          """-----------------""",
          """## The Encounter""",
          () {
if (radarUp) {
  goto("Dogfight: Radar reading");
} else {
  goto("Dogfight: Wake up");
}
        }
        ]
    );
    pageMap[r"""Dogfight: Radar reading"""] = new EgbScripterPage(
      [
          () {
eta -= 15;
        },
          """You wake up to regular bleeps of the radar. """,
          """"I repeat," the ship says, quite urgently. "We have a radar contact." """,
          """You look at the radar screen. It seems some smaller vessel is matching your course and speed, and is nearing rapidly. It doesn't seem like a pirate (those tend to fire before they show up on the radar, especially when they're this small and alone), but the behaviour is highly unusual. Who would want to get this close to another ship while travelling in deep space, without any previous communication?""",
          """The good news is that because of the radar, you know about them in advance. You check your shields: they're up. You also start charging the laser cannon mounted on the front side of the ship. Better safe than sorry, you think.""",
          () {
bodega["timeToFire"] = 0;
        },
          """In 20 minutes, the vessel is in visual range. It's a Messenger class ship, a fast clipper about tenth of the size of The Bodega. If it's hostile, it could still pose a serious threat, but would probably run a big risk itself.""",
          """The ship glides to a halt in front of the bridge, face to face with The Bodega. After a while, the communications panel lights up. There is an incoming call from the Messenger. """,
          [
            null,
          {
            "goto": r"""Encounter"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Wake up"""] = new EgbScripterPage(
      [
          () {
eta -= 16;
        },
          """You open your eyes, look out the window, and immediately jump up. There is a small -- though potentially dangerous -- ship right in front of the window, facing the Bodega. It's armed, but likely not a pirate, judging from the class of the ship (a Messenger, ten times smaller than the Bodega) and by the fact you're still alive.""",
          """Before you can act, the communications panel lights up. There is an incoming call from the Messenger. Before you take it, you can either command the ship to raise the shields or to power up the laser gun on the nose of the Bodega. Doing both would take too much time to have any effect.""",
          () {
bodega["timeToFire"] = 1;
        },
          [
            null,
          {
            "string": () => """Raise the shields""",
  "script": () {shieldsUp = true;}          },
          {
            "string": () => """Power up the gun""",
  "script": () {bodega["timeToFire"] = 0;}          },
          {
            "string": () => """Do neither""",
  "script": () {nothing=null;}          }
        ]
,          [
            null,
          {
            "goto": r"""Encounter"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Encounter"""] = new EgbScripterPage(
      [
          """The screen fills with a large, bored face of a pilot with a large jaw and short hair. He's not even looking at the console, being busy with some controls to his lower left. """,
          """"Calling crew of the Bodega," he starts reciting, absently. "This is..." """,
          """Then he looks up, sees you on the screen, and stops abruptly.""",
          """"Oh!" """,
          """Gorilla, which has been silently sitting on the ground to your left until now, starts hissing through clenched teeth, eyes wide open. It rocks back and forth, visibly disturbed. The pilot begins to frantically push some buttons on the panel in front of him.""",
          () {
time = 0;
messenger = {
  "hp": 15,
  "shields": 0,
  "timeToFire": 1
};
bodega["shields"] = (shieldsUp ? 10 : 0);
bodega["evasive"] = false;
        },
          () {
choice("\"What are you doing? What is happening here?\"")
.then(() => echo("He doesn't respond."));
choice("Watch what he's doing with the controls")
.then(() => echo("It takes a while, but you realize he's putting his ship into combat mode."));
if (shieldsUp != true) {
  choice("Shields up")
  .then(() {
    shieldsUp = true;
    bodega["shields"] = 5;
  });
}
if (bodega["timeToFire"] <= 0) {
  choice("Fire")
  .then(() {
echo("""You take the laser gun controls, quickly aim at the Messanger and fire. 
""");
    if (randomWithProbability(0.6)) {
      messenger["hp"] -= 3;
echo("""Boom! It's a hit! The stream of energy hits the Messenger, right in the middle of its belly, and leaves a sizeable hole there. It looks like some serious damage has been dealt.
""");
      points.add(7, "hitting early and hard");
    } else {
echo("""The stream of energy misses the Messenger by a couple of meters. That was unlucky.
""");
      points.add(5, "not wasting any time");
    }
  });
}
        },
          """The communications panel goes blank as the pilot closes the connection. The Messenger starts moving to the side while raising shields.""",
          [
            null,
          {
            "goto": r"""Fire loop"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Fire loop"""] = new EgbScripterPage(
      [
          () {
time += 1;
bodega["timeToFire"] -= 1;
messenger["timeToFire"] -= 1;

// Messenger turn
if (messenger["shields"] < 5) {
  messenger["shields"] += 1;
  if (messenger["shields"] > 2) {
    echo("The Messenger's shields are about half up.");
  }
} else {
  echo("The Messenger's shields are now fully up.");
}

if (time == 2 && pulledLever == false) {
echo("""The Messenger manages to position itself to the right of the 

""");
  bodega["hp"] -= 7;
} else {


}

if (bodega["hp"] <= 0) {
  goto("Lose");
}

// Bodega turn
if (bodega["timeToFire"] <= 0) {
  choices.add("Fire at hull [~80% chance]", () {
    
  });
  choices.add("Fire at engines [~40% chance]", () {
    
  });
}
choices.add("Evasive maneuvre [harder to get hit]", () {

    bodega["evasive"] = true;
  });
if (time == 3) {
  choices.add("Direct all halogen headlights on the Messenger and switch them on at once", () {

    messenger["timeToFire"] += 2;
  });
}

if (messenger["hp"] <= 0) {
  goto("Win"); // TODO: will this override the choices or not? should it?
} else {
  repeatBlock();
}
        },
          [
            null,
          {
            "goto": r"""Specials"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Specials"""] = new EgbScripterPage(
      [
          () {



        },
          [
            null,
          {
            "goto": r"""Resolve win/lose"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Resolve win/lose"""] = new EgbScripterPage(
      [
          () {
if (bodega["hp"] <= 0) {
  goto("Lose");
} else if (messenger["hp"] <= 0) {
  goto("Win");
}
        },
          [
            null,
          {
            "goto": r"""Fire loop"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Lose"""] = new EgbScripterPage(
      [
    ]
    );
    pageMap[r"""Dogfight: Win"""] = new EgbScripterPage(
      [
          """This time, your laser must have drilled through to the core, because there is a violent explosion on the Messenger. Only the skeleton of the ship stays put, the rest is blown away from the inside, in all directions.""",
          () {
points.add(10, "space combat");
        },
          """One of those outward flying parts is different from the others, though. It steers itself. Apparently, the Messenger's pilot (or the ship computer) managed to launch a small robotic probe just before the spectacular explosion. The thing beelines through the flying debris and hits hard somewhere into the Bodega's cargo bay. """,
          """"Hull breach," the ship says, laconically. """,
          () {
            echo("""You look at the readings around you. The shields at ${percentage(bodega["shields"]/10)}% and stable. The hull took ...""");
          }
          ]
    );
        firstPage = pageMap[r"""Start: Funeral"""];    
  }
  /* INIT */
  void initBlock() {

    points = new Points();
    outerspace = new Timeline();
    outerspace.mainLoop = (_) => echo("The space is silent.");
    outerspace.events.add(new TimedEvent(2, "A huge supernova just exploded somewhere."));
    

  }
}
