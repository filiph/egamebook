library Scripter_Implementation;

import '../../lib/src/book/scripter.dart';
import 'dart:math';

import '/Users/filiph/Programs/egamebook/dart/books/libraries/mockinstance.dart';
import '/Users/filiph/Programs/egamebook/dart/books/libraries/timeline.dart';
import '/Users/filiph/Programs/egamebook/dart/books/libraries/storyline.dart';
import '/Users/filiph/Programs/egamebook/dart/books/libraries/randomly.dart';


class ScripterImpl extends EgbScripter {

  /* LIBRARY */


  ScripterImpl() : super() {
    /* PAGES & BLOCKS */
    pageMap = new EgbScripterPageMap();
    pageMap[r"""Start: Funeral"""] = new EgbScripterPage(
      [
          """## The Funeral""",
          """This story both begins and ends with a death, on a spaceship. """,
          """The first death is that of captain Kay. When he died a couple of minutes ago, he left you as the last survivor on board of the Bodega, the 25 thousand ton cargo ship that is now stuck pretty much helpless in the middle of nowhere. The ship and the crew of twelve were just fine only two weeks ago. """,
          """Now, they're all dead. For the last two weeks, the twelve men had been taking turns in screaming in pain, then getting uncanilly stiff, then dying. The captain held a memorial service for every one of them, each funeral – of course – a little shorter and simpler than the previous.""",
          """Now, it's your turn to hold the memorial service. You've never done it before, but that doesn't really matter. There's no one else to do it, and there's no one else to _see_ you do it. You're the last one alive. (Well, almost. But we'll get to that later.)""",
          """The funeral looks like this: You are standing in front of the ship's only functional airlock. Through the porthole window, you can see the captain's body lying on the floor, naked and reddish and stiff. Just like all the others before him. Your hand is on the lever that will open the airlock's outside door. Through that door, once open, the captain's body will be sucked out into outer space. This is how funerals work here on the Bodega. """,
          """[IMG]""",
          """The inner door, through which you're watching, is safely closed and sealed. The only thing that remains is to pull the lever.""",
          [
            null,
          {
            "string": () => """Say something nice first""",
  "goto": r"""Say something nice"""          },
          {
            "string": () => """Pull the lever""",
  "goto": r"""Pull"""          },
          {
            "string": () => """Leave the body in the airlock""",
  "goto": r"""Leave body"""          }
        ]
        ]
    );
    pageMap[r"""Start: Say something nice"""] = new EgbScripterPage(
      [
          """You clear your throat. "Captain Kay was ..." """,
          """For some reason, the only things that come to mind right now are _far_ from nice. Your head is full of images of the captain being drunk to the point he couldn't stand up. Let's just say this is not the first time you see him lying on the floor, naked and reddish and stiff. Sure, he was a great drinking buddy of yours, but that doesn't strike you as something to say at a funeral.""",
          """You end up saying: "Captain Kay was a great captain." And that is definitely true.""",
          () {
  points.add(1, "trying");
        },
          [
            null,
          {
            "goto": r"""<<<"""          }
        ]
        ],
        visitOnce: true    );
    pageMap[r"""Start: Pull"""] = new EgbScripterPage(
      [
          """You pull the lever, and as the outer door opens, all the air in the airlock shoots out – with a loud hiss – into the vacuum of space. The body is now moving in that direction, too, though much slower. It's no longer pulled towards the floor with artificial gravity – that was automatically turned off when you pulled that lever – so the body kind of tumbles towards the door.""",
          () {
  if (Randomly.tossCoin()) {
echo("""It hits the doorsill on its way out, goes through the door, and starts receding into space while slowly rotating.
""");
  } else {
echo("""It hits the doorsill on its way out and almost stops, hanging midway between the inside and outside. For a while, it almost looks like you'll have to close that outside door and reopen it again, which would cut the captain's body in half. But fortunately, the movement never stops completely, and the body goes through the door and starts slowly receding into space.
""");
  }
        },
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
points.add(2, "respect to the dead");
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
          """You remember the first time you saw the captain in that joint on Space Station Trust. You were both drunk beyond belief, both for different reasons. Come to think of it, _everybody_ in that bar was drunk beyond belief, _and_ for different reasons. In a way, it was like a group therapy session, only with less weeping and more yelling at each other from close up. """,
          """Of course, it didn't take long before someone started a fight. You don't really remember who it was, but it wasn't captain Kay, and it definitely wasn't you. You both got dragged into it pretty quickly, though, and because you were both sitting close to one end of the bar, according to bar fight customs, you were on the same side. It was impossible to _not_ notice the captain because he was laughing his head off in the midst of all the violence and craziness. """,
          """You remember trying to slip through the crowd to get out, as you had no intention of getting the hell beaten out of you for no reason whatsoever, and when you were next to the laughing captain, a huge furry with arms the size of your thighs leaped in front of you two, said: "What's so funny, shitface?", grabbed both of your heads, and smashed them together.""",
          """The next thing you knew, the bar was empty and captain Kay helped you on your feet. There was dry blood in his hair. He was still laughing.""",
          () {
            echo("""Now, you watch his dead body ${pulledLever ? "recede into darkness" : "lie on the floor in front of you"}.""");
          },
          """There is no reason why _you_ should outlive the captain. Or why you should outlive _any other_ crew member for that matter. You were always the weakest, thinniest person on board. The contagion, or whatever it is, should have killed you long before everyone else. Then again, there was absolutely no sense in the order in which the crew died. It was random.""",
          """[IMG]""",
          """The intercom on the wall starts ringing loudly and blinking with a red light. The ringtone and the color-coding means "to all crew" -- in other words: "everyone in their ability should pick this up".""",
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
          () {
  pickedUpIntercom = false;
        },
          """After a while, the intercom goes silent. Instead, PA speakers on the whole ship turn on with a crackle. It's the ship computer.""",
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
          () {
  pickedUpIntercom = true;
        },
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
          """"Oh, I'm sorry," the ship says. "I didn't want to ruin the moment by, you know, _trying to stop yet another disaster from happening!_ The bridge, you might recall, is a place with lots of electronics and, interestingly, also the control panel to _the whole goddamned ship._ In summary, this is no place for a stupid gorilla." """,
          [
            null,
          {
            "string": () => """"Okay, okay, I'm coming." """          }
        ]
,          () {
  if (pickedUpIntercom == false) {
echo("""The speakers turn off, then turn on again.

"And by the way," the ship adds, "I know you're not very clever and all, but by now you should be familiar with the intercom system. A hint: when the red light goes blink, you pick it up." The speakers turn off again.
""");
  }
        },
          [
            null,
          {
            "goto": r"""Coming"""          }
        ]
        ]
    );
    pageMap[r"""Start: Coming"""] = new EgbScripterPage(
      [
          () {
            echo("""You give captain Kay's ${pulledLever ? "receding" : ""} body the last glance${pulledLever ? ", put the airlock lever back to the close position" : ""}, and set off in the direction of the bridge. """);
          },
          """[IMG]""",
          """You follow Corridor Right – a badly lit tube of dusty cables and fluorescent lamps running along the right side of the Bodega, from the bridge all the way to the huge cargo area in the back. The stark white light of the lamps is not the only light source. There are also the red bulbs of the ship alarm which have been pulsing since the beginning of the disease 14 days ago.""",
          [
            null,
          {
            "goto": r"""Bridge: Gorilla incident"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Gorilla incident"""] = new EgbScripterPage(
      [
          """## The Gorilla""",
          """There really is a gorilla on the bridge. But it isn't touching any of the electronics, let alone the control panel. It just sits there on the floor, full of melancholy, looking out the window at the stars. When you enter, it slowly turns to you and pushes out its huge lower lip. """,
          """[IMG]""",
          """It's your Enhanced Gorilla. These species are used throughout the universe for hard manual labor: in construction, in the military, and on big tankers and cargo ships like the Bodega. Their intelligence is somewhat improved over what nature has given them -- they can understand basic spoken commands and they have the ability to communicate back via sign language. The vocabulary consists of the words "food", "sleep" and "want", and only a few others. But people don't need Enhanced Gorillas to be eloquent or nuanced. They need them to lift and push and sometimes smash. _Your_ gorilla mostly carries extremely heavy fuel cells from the storage to the socket in the engine room. """,
          """Your gorilla doesn't have a name. You call him 'Gorilla', as is common with these creatures. Nobody wants to get too attached to them. They die a lot.""",
          """Gorilla raises his arms to sign. First, he makes the sign for "me" and then he makes the sign for "sleep". He obviously doesn't want to say that he is sleeping. More likely, he's trying to use his limited vocabulary to communicate that he is sad. But you can never be sure.""",
          [
            () => """What do you say to him?""",
          {
            "string": () => """"It's okay." """,
  "script": () {gorillaAttitude += 1; echo("Gorilla slowly turns his head back to the stars, visibly alleviated.");}          },
          {
            "string": () => """"What the hell do you think you are doing here, Gorilla?" """,
  "script": () {gorillaAttitude -= 1; echo("Gorilla doesn't answer, he only looks at you in sudden terror. One of the enhancements they did on the Enhanced Gorillas is fear of people. Of course, it's completely irrational – Gorilla could squash you or any other human any time – but the gorillas can't help it. It's in their DNA.\n\nYou smile at the gorilla like it's not as a big deal after all. He seems a bit alleviated, but still stressed. He slowly turns his head back to the stars.");}          }
        ]
,          """"The gorilla stays," you say to the ship computer. "He just sits there. And he definitely won't touch anything while I'm here." """,
          """The ship is silent for a while. Then she chooses to ignore the topic entirely.""",
          """"I would just _hate_ to unnerve you," she says, "but considering that there is no reason to believe you are _not_ contaminated with the same illness as everyone else, and that we have no reliable data on the incubation period, I propose we make the jump to Space Station Unity as soon as possible. The hyperdrive seems to be operational now." """,
          [
            null,
          {
            "string": () => """"Space Station Unity?" """,
  "script": () {echo(""" The Bodega pulls off the kind of a synthetic-sounding sigh that she likes to do whenever something annoys her. Which is very often. She says: "For fuck's sake, I know you're just a drunk wannabe engineer, but this is _basic_ astronomy. Space Station Unity is one of the big five. It also happens to be the closest hub with a major medical facility."\n\nYou do remember the captain talking about 'Uni' the last few days, but that wasn't something you'd try to process. You focused solely on repairing the drive and not thinking too much about anything else.""");}          },
          {
            "string": () => """"Good." """,
  "script": () {echo(""" "Good," the ship repeats after you. """);}          }
        ]
,          """The Bodega takes some time to go over a quick succession of data tables and schematics on the main screen. Then, she says: "The drive is being charged now. It will be ready in ten to fifteen hours, depending on energy input." """,
          [
            null,
          {
            "string": () => """"Give it all available power." [10 hours to charge]""",
  "goto": r"""Full speed"""          },
          {
            "string": () => """"Keep the shields and the radar on." [15 hours to charge]""",
  "goto": r"""Shields on"""          }
        ]
,          """// TODO: (?) more options here: let player on/off shields, radar, independently"""
          ]
    );
    pageMap[r"""Bridge: Full speed"""] = new EgbScripterPage(
      [
          """Without words, the Bodega immediately shuts off all non-essential systems, then directs all that energy to the powering hyperdrive. You hear and feel the hum rising from the engine room.""",
          () {
  eta = 10;
  bodega.shields.active = false;
  bodega.radar.active = false;
        },
          [
            null,
          {
            "goto": r"""Repairs"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Shields on"""] = new EgbScripterPage(
      [
          """"That is... considerate," the ship replies. "I will be using the radar only to periodically check for trouble. In between, I'll divert the energy to the drive. That should shave one or two hours off the charge up time." You hear and feel the hum rising from the engine room.""",
          () {
  points.add(5, "upholding interplanetary safety standards");
  points.add(10, "being genre savvy");
  eta = 14;
  bodega.shields.active = true;
  bodega.radar.active = true;
        },
          [
            null,
          {
            "goto": r"""Repairs"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Repairs"""] = new EgbScripterPage(
      [
          """## Repairs""",
          """You are dog-tired. You spent the last couple of weeks slaving away – together with Gorilla and captain Kay – to repair the hyperdrive. It had broken down in the middle of nowhere after one of the containers in the cargo bay exploded. Apparently, the explosion was due to some inapt handling by none other than your Gorilla. It wasn't a particularly big blast, but the vibrations rippled through the whole ship, and -- among other things -- put the hyperdrive into an invalid state. As it turned out, though, the malfunctioning drive was to be the lesser of your worries.""",
          """While you were patching up the drive, the rest of the crew were busy dying. One by one. The ship's medic was one of the first to go, but he didn't appear to have any idea about what was going on anyway. He was as scared and angry and clueless as anyone else. """,
          """"It's not like I wasn't expecting to die out in the space one day," he said to you from behind a window (back then, the captain still tried to mantain some kind of quarantine), "but I sure as hell didn't expect it to come _this_ soon." He was forty-five, one of the oldest crew members. He died the next day.""",
          """[IMG]""",
          """The only thing that has kept you from worrying about death so far was work. Anything else leaves too much brain capacity to imagination. Going to sleep has been particularly hard because there is always the possibility you'd never wake up.""",
          """This time, though, you are so unbelievably tired you will probably fall asleep the minute you close your eyes. On the other hand, there is still work to do -- small things that also broke down because of the explosion, but weren't a priority.""",
          [
            () => """The jump to Station Unity is ${eta - timeFromStart} hours away. What do you do?""",
          {
            "string": () => """Take the nap""",
  "goto": r"""A nap"""          },
          {
            "string": () => """Take a look at the door in Corridor Left that never closes [~1 hour]""",
  "goto": r"""Door repair"""          },
          {
            "string": () => """Take a look at the malfunctioning scanner [~2 hours]""",
  "goto": r"""Scanner repair"""          },
          {
            "string": () => """Take a look at the engine, try to bring output from 92% back to 100% [~3 hours]""",
  "goto": r"""Engine repair"""          },
          {
            "string": () => """Take a look at one of the four maneuvering jets that went offline [~4 hours]""",
  "goto": r"""Jets repair"""          },
          {
            "string": () => """Repair the structural damage of the cargo bay explosion [~6 hours]""",
  "goto": r"""Cargo bay repair"""          }
        ]
        ]
    );
    pageMap[r"""Bridge: Door repair"""] = new EgbScripterPage(
      [
          """You go to Corridor Left and find the malfunctioning door. ... // TODO""",
          () {
  bodega.systems["corridor left door"].hp.value.percentage = 1.0;
  timeFromStart += 1;
  points.add(1, "repairing the door");
  if (timeFromStart >= 5) {
    goto("Overcome by sleepiness");
  }
        },
          [
            null,
          {
            "goto": r"""<<<"""          }
        ]
        ],
        visitOnce: true    );
    pageMap[r"""Bridge: Overcome by sleepiness"""] = new EgbScripterPage(
      [
          """You come back to the bridge, determined to do some more work, but at that exact time, your body just refuses to continue. You can't imagine _walking_ somewhere, let alone trying to _work_.""",
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
            echo("""You slouch into the captain's chair and check the time. You should be ready for the jump in ${eta - timeFromStart} hours. Your eye lids get heavy and you realize there is no way you can fight this. Soon, the most comfortable embrace of sleep puts you under.""");
          },
          """You have a dream about how you wake up and you're already on Station Unity and a person in a white lab coat tells you that you're just _fine_ – healthier than ever, actually – and now that same person is a captain of a very nice ship and he is on the bridge – in that lab coat, but for some reason it's not weird at all – and you have a job on this new ship, too, and it's clear that you're comfortable and happy, and you're actually _laughing_, laughing while working, because the feeling of not needing to worry about stuff is just so uplifting and downright _euphoric_ right now. It's a very nice dream and when you feel you're starting to wake up from it, you genuinely don't want to.""",
          [
            null,
          {
            "goto": r"""Dogfight: Start"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Start"""] = new EgbScripterPage(
      [
          """## The Encounter""",
          () {
  if (bodega.radar.active) {
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
  timeFromStart += 4;
        },
          """You wake up to regular bleeps of the radar. """,
          """"I repeat," the ship says, quite urgently. "We have a radar contact." """,
          """You look at the radar screen. It seems some smaller vessel is nearing rapidly. It doesn't seem like a pirate (those tend to bigger or more numerous), but the behaviour is highly unusual. Who would want to get this close to another ship in deep space, without any previous communication?""",
          () {
            echo("""The good news is that because of the radar, you know about them in advance. You check your shields: ${bodega.shields.active ? "they are up" : "they are down, so you raise them"}. You also start charging the utility laser mounted on the front side of the ship. Better safe than sorry.""");
          },
          () {
  bodega.weapons.all.timeToFire = 0;
  bodega.shields.active = true;
        },
          """Shortly afterwards, the vessel is in visual range. It's a Messenger class ship, a fast clipper about tenth of the size of The Bodega. If it's hostile, it could still pose a serious threat, but would probably run a big risk itself.""",
          """[IMG: Bodega and Messenger face-to-face]""",
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
  timeFromStart += 4;
        },
          """You open your eyes, look out the window, and immediately jump up. There is a small -- though potentially dangerous -- ship right in front of the window, facing the Bodega. It's armed, but likely not a pirate, judging from the class of the ship (a Messenger, much smaller than the Bodega), by the fact it appears to be alone, and by the fact you're still alive.""",
          """[IMG: Bodega and Messenger face-to-face]""",
          """Before you can act, the communications panel lights up. There is an incoming call from the Messenger. Before you take it, you can either command the ship to raise the shields or to power up the utility laser on the nose of the Bodega. Doing both would take too much time to have any effect.""",
          """// TODO: possibility radar is down but shield is up""",
          () {
  bodega.weapons.all.timeToFire = 1;
        },
          [
            null,
          {
            "string": () => """Raise the shields""",
  "script": () {bodega.shields.active = true;}          },
          {
            "string": () => """Power up the gun""",
  "script": () {bodega.weapons.all.timeToFire = 0;}          },
          {
            "string": () => """Do neither"""          }
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
          """The main screen fills with a large, bored face of a pilot with a large jaw and short hair. He's not even looking at the console, being busy with some controls to his lower left. """,
          """"Calling the crew of the Bodega," he starts reciting, absently. "This is..." """,
          """Then he looks up, sees you on the screen, and stops abruptly.""",
          """"Oh!" he says. "Oh _fuck!_" """,
          """Gorilla, which has been silently sitting on the ground to your left until now, starts hissing through clenched teeth, eyes wide open. It rocks back and forth, visibly disturbed. The pilot begins to frantically push some buttons on the panel in front of him. "Oh fuck oh fuck oh _fuck!_" he keeps repeating.""",
          () {
choice("\"What are you doing? What is happening here?\"")
  .then(() => echo("He doesn't respond."));
  choice("Watch what he's doing with the controls")
  .then(() => echo("It takes a while, but you realize he's putting his ship into combat mode."));
  if (bodega.shields.active != true) {
    choice("Shields up")
    .then(() {
      bodega.shields.active = true;
      bodega.shields.sp.percentage = 0.5;
    });
  }
  if (bodega.weapons.all.timeToFire <= 0) {
    choice("Fire")
    .then(() {
echo("""You take the laser controls, quickly aim at the Messanger and fire. 
""");
      if (Randomly.saveAgainst(0.6)) {
        messenger.hull.hp -= 3;
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
          """The communications panel goes blank as the pilot closes the connection. The Messenger starts moving to the side while raising shields. He knows that his best bet is to be moving all over the place.""",
          """You try to remember something about spaceship combat, but there's not much you ever knew about the topic in the first place. You never had any ambition to go the the military, not even as a teenager, and you spent the last ten years of your life on cargo ships like the Bodega. Those normally don't get into combat, and if they do, it tends to be over quickly, and not in the cargo ship's favor. Plus, only those on the bridge get involved, whereas you practically live in the engine room.""",
          """It's not _all_ bad, though. The Messenger is clearly not a combat vessel. You can only see 2 parallel beam guns in the front, and those seem pretty weak. The hull is slender. Moreover, according to the markings on the side, the ship is a Sentaco corporate runner. Sentaco – although one of the biggest corporations out there – is not one of the militarized ones. It deals in food and consumer goods. """,
          """The frail Messenger clearly wasn't sent here to fight the huge pile of steel that is the Bodega. But it _is_ fighting it now, for whatever reason.""",
          [
            null,
          {
            "goto": r"""Fire loop"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Fire loop"""] = new EgbScripterPage(
      [
          """TODO: choice between critical hits, harassing, main engine hits, secondary jets hits, gun hits, contacting
TODO: choice to do nothing - and get slowly obliterated
TODO: when hit in the right places, the Messenger gets penalties (easier to hit, longer to reload, 
TODO: ? messenger can get to a blind spot behind the Bodega - 1 turn to turn in his direction 
TODO: if scannerUp => more info about Messenger
TODO: if messanger's guns are gone - release probe, try to withdraw
TODO: if messanger is too damaged - release probe, try to withdraw
TODO: messenger can hit left or right side of the hull critically. Later, that corridor will be inaccessible (need to go around)
TODO: "Direct all halogen headlights on the Messenger and switch them on at once"
TODO: player needs to keep track of resources (energy cells, ammo?)""",
          """<p class="meta">This is where a space combat simulation will happen. Choices made by player will not only affect the combat, but also the state of the ship afterwards. Right now, we skip this.</p>""",
          """TODO // meta // This is your first spaceship combat. This box will explain the machanics of a fight in space.""",
          """TODO // meta // There are a couple of things to keep in mind. First, there's the **structural integrity** (STR) of your ship. The more you get hit, the worse it gets. (If you're at 0% SI, the ship falls apart.). Second, there's **shields** (SHD). They are an semi-transparent forcefield that a ship can raise in the direction of incoming fire. (If they're up, most projectiles won't get through to the ship hull, so the ship's structural integrity is protected.) Third, there's **positioning** (POS), which is an index of how well your ship is located in three-dimensional space, towards others. (If your opponent outmaneuvers you and is facing the most vurnerable side of your ship, for example, your POS will be very low.) Fourth, there's **aim** (AIM). It's how well a ship is able to hit its target. (The higher the AIM, the higher probability there will be of hitting the target, and, moreover, of hitting a vital part of the target.) And fifth, there's **accumulated energy** (ENR), which is the excess energy your engine produces but doesn't spend on the essential – like jets, shields, or life support. (That energy can then be used for special combat moves and abilities.)""",
          """TODO // meta // There is no single strategy that will always work. For example, if you focus solely on your shields, your opponent can outmaneuvre you and make those shields – at least temporarily – irrelevant (remember, shields are directional, they can't be around your whole ship). If you focus solely on positioning, your opponent can focus on aiming, and – unless he gets into a really bad position – he can still blow you up. You should always play your cards according to situation.""",
          [
            null,
          {
            "string": () => """Win""",
  "goto": r"""Win"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Resolution"""] = new EgbScripterPage(
      [
          () {
  if (bodega.isAlive) {
    goto("Win");
  } else {
    goto("Lose");
  }
        }
        ]
    );
    pageMap[r"""Dogfight: Lose"""] = new EgbScripterPage(
      [
          """// TODO: boom"""
          ]
    );
    pageMap[r"""Dogfight: Win"""] = new EgbScripterPage(
      [
          """This time, the beam must have drilled through to the core, because there is a violent explosion on the Messenger. Only the skeleton of the ship stays put, the rest is blown away from the inside, in all directions.""",
          () {
  points.add(10, "winning your first spaceship battle");
        },
          """TODO: only if messenger hasn't done it during fight
One of those outward flying parts is different from the others, though. It steers itself. Apparently, the Messenger's pilot (or his ship's computer) managed to launch a small robotic probe just before the spectacular explosion. The thing beelines through the flying debris and hits hard somewhere near the Bodega's cargo bay. """,
          """"Hull breach," the ship says, laconically. "Initiating sealing process." TODO: explain sealing process""",
          """You look at the readings around you. The shields are at TODO % and stable. The hull took … damage. """,
          """Captain Kay was always saying: "When shit happens, it happens all over the place." """,
          """On the plus side, though, you _are_ still alive.""",
          [
            null,
          {
            "goto": r"""Why?"""          }
        ]
        ]
    );
    pageMap[r"""Dogfight: Why?"""] = new EgbScripterPage(
      [
          """You try to imagine why the Messenger came here and why the pilot acted the way he acted. Was he just so stupid to try to pick a fight with a much sturdier ship? Was he expecting to find something else here? Or someone else? Did he know about the disease? Was he acting on his own, or was this an official Sentaco run? Is Sentaco a pirate company now? Why would it be interested in the Bodega, of all ships?""",
          [
            null,
          {
            "goto": r"""Explore: Start"""          }
        ]
        ]
    );
    pageMap[r"""Explore: Start"""] = new EgbScripterPage(
      [
          """## The crew of one""",
          """The Bodega is now running a full system check, all the monitors flicker with information so fast only a computer could make anything of it. "What the _hell_ is happening?" the ship says, her voice glitching. "How does one go from a fully manned, well-preserved, licensed cargo ship to a _ghost_ ship piloted by an idiot machinist _while_ being attacked by a corporate runner for no apparent reason – in two weeks!?" """,
          [
            null,
          {
            "string": () => """"We survived, didn't we?" """,
  "script": () {echo(""" "Well," she replies. "That's rich coming from someone who is probably going to die in a couple of hours." """);}          },
          {
            "string": () => """"Shut up." """          }
        ]
,          """"Okay, this is all so totally outside the protocol," the Bodega continues. "We'd be full speed somewhere past Algol if it wasn't for the idiot Gorilla of yours in the cargo bay. Nobody would be dead. The disease would be someone else's problem. And there would be someone _actually capable_ on the bridge." """,
          """The flow of information on the monitors stop, and they all go to their default view. "Who were we kidding? The whole thing is _your_ fault. If you watched the beast – as you're _required by the protocol_, by the way – there would be no explosion, no contagion, no deaths, and no using the utility laser to end a Messenger that was probably just trying to help." """,
          """"I just hope you die real soon so I can go to emergency autopilot mode and get to somewhere civilized." """,
          """- "What is this, a mutiny? Are you trying to kill me?" // don't be an idiot, I can't kill you
- "You realize you wouldn't be going anywhere if I hadn't just spend days to fix the hyperdrive?"
- "Whatever."
// TODO bodega's reactions""",
          () {
  timeFromStart += 1;
        },
          () {
            echo("""It looks like the Bodega stopped talking, at least for a while. You still have ${eta - timeFromStart} hours before the hyperdrive is ready for the jump to Station Unity.""");
          },
          [
            null,
          {
            "goto": r"""Bridge Lookaround"""          }
        ]
        ]
    );
    pageMap[r"""Explore: Bodega's layout"""] = new EgbScripterPage(
      [
          """[IMG bodega's layout]""",
          [
            null,
          {
            "goto": r"""<<<"""          }
        ]
        ]
    );
    pageMap[r"""Explore: Bridge"""] = new EgbScripterPage(
      [
          () {
            echo("""You are ${currentPage.visited ? "back " : ""}at the bridge.""");
          },
          () {
  exploration.time++;
        },
          [
            null,
          {
            "string": () => """Put up information about the hull breach on the monitor""",
  "goto": r"""Look at hull breach"""          },
          {
            "string": () => """Look at the Bodega's layout""",
  "goto": r"""Bodega's layout"""          }
        ]
        ]
    );
    pageMap[r"""Explore: Look at hull breach"""] = new EgbScripterPage(
      [
          """The object from the Messenger crashed into the right side of the cargo bay. It managed to drill through the hull – as evidenced by the suddenly lower air pressure in the whole area – but fortunately the Bodega managed to isolate the impact zone with hermetic curtains. This means there is an area in the cargo bay that is presumably quite damaged, almost surely without air, and separated from the rest of the space by relatively thin, makeshift firewalls.""",
          """The protocol states that these firewalls will stay down until the hull breach is patched. """,
          () {
  var eta = hullBreachRepairEta - timeFromStart;
  if (eta > 0) {
echo("""It seems the Bodega's automatic hull repair system already kicked in and the hole in the hull should be sealed in $eta hour${eta > 1 ? "s" : ""} at most.
""");
  } else {
echo("""That has already been done and the firewalls seem to be down.
""");
  }
        },
          [
            null,
          {
            "goto": r"""<<<"""          }
        ]
        ],
        visitOnce: true    );
    pageMap[r"""Explore: Engine room"""] = new EgbScripterPage(
      [
          """/ TODO: steel rod
// TODO: reminisce the 'good old times' (as in Pixar's "Every day he ____")"""
]
    );
    pageMap[r"""Explore: Captain's cabin"""] = new EgbScripterPage(
      [
          """// TODO: read the log entry"""
          ]
    );
    pageMap[r"""Explore: Airlock"""] = new EgbScripterPage(
      [
          """// TODO recollections"""
          ]
    );
    pageMap[r"""Explore: Computer room"""] = new EgbScripterPage(
      [
          """// just look around"""
          ]
    );
    pageMap[r"""Explore: Medical bay"""] = new EgbScripterPage(
      [
          """TODO: precision chainsaw (??)
// recollections about how the contagion started
// living tissue on petri dish"""
]
    );
    pageMap[r"""Explore: Cargo Right"""] = new EgbScripterPage(
      [
          """TODO/ steel rod
// damaged Sentaco container - NOT YET!"""
]
    );
    pageMap[r"""Explore: Cargo Left"""] = new EgbScripterPage(
      [
          """You arrive to the left wing of the huge cargo area. """,
          () {
  if (!currentPage.visited) {
echo("""Long parallel lines of containers

The artificial gravity here is at 10% right now. TODO: why

Nearby, one section of the bay has been isolated by hermetic steel curtain because of the hull breach.
""");
  }
  
  exploration.time++;
        },
          [
            null,
          {
            "string": () => """Open the steel curtain around the hull breach""",
  "goto": r"""Open curtain"""          }
        ]
        ]
    );
    pageMap[r"""Explore: Open curtain"""] = new EgbScripterPage(
      [
          """/ TODO: if not healed yet => death by suck out to space"""
          ],
          visitOnce: true    );
    pageMap[r"""Explore: Cargo Center"""] = new EgbScripterPage(
      [
          """TODO: change gravity to 0 - possible to catch the tracked probe"""
          ]
    );
    pageMap[r"""Jump to Station"""] = new EgbScripterPage(
      [
          """TODO: jump 'fx'""",
          """// TODO: keep track of 'fuel' cells and/or energy cells count"""
          ]
    );
    pageMap[r"""Explore 2: Start"""] = new EgbScripterPage(
      [
          """// TODO: only after taken outside the space station
// Leads right up to finding out about Ellen"""
]
    );
    pageMap[r"""Explore 2: Engine room"""] = new EgbScripterPage(
      [
          """TODO: heal - "somehow feels safer here" """
          ]
    );
    pageMap[r"""End: Password"""] = new EgbScripterPage(
      [
          """You put the password in and the computer accepts it. The last log entry appears again.""",
          [
            null,
          {
            "string": () => """Check other entries""",
  "goto": r"""Other log entries"""          },
          {
            "string": () => """Search delivery database""",
  "goto": r"""Search database"""          }
        ]
        ]
    );
    pageMap[r"""End: Other log entries"""] = new EgbScripterPage(
      [
          """"Something in one of the containers in E4 exploded. The shockwave damaged a shitload of neigbouring cargo. Larry says there was nothing fragile around, and that it's no big deal, but Larry is a lazy fucktard. I glanced at the manifest and saw that there is fragile stuff all over E4. I still haven't gotten to inspect the damages and mark it into the database, though. I hate to think how much money we lost because of some idiot not disclosing volatile chemicals." """,
          """// TODO lead up to "I want to be dying forever. I never had any idea! It's so ecstatic! So focused and discrete and full of beautiful beautiful hope it makes me laugh at my own previous foolish fear of this moment and my insistence and clinging on something as worthless and selfish as life. Why did I never allow myself to die before? What was I afraid of?" """,
          [
            null,
          {
            "string": () => """Switch to the delivery database""",
  "goto": r"""Search database"""          }
        ]
        ],
        visitOnce: true    );
    pageMap[r"""End: Search database"""] = new EgbScripterPage(
      [
          () {
  if (!currentPage.visited) {
echo("""You open the database program. It's a list of _tens of thousands_ of orders that the Bodega has delivered during its lifetime, with dates, prices, origins, destinations, measurements, and lots of other data. You quickly scan the topmost couple of deliveries, but that translates to just a fraction of one single container. You'll have to search.
""");
  }
        },
          [
            null,
          {
            "goto": r"""Choose search"""          }
        ]
        ]
    );
    pageMap[r"""End: Choose search"""] = new EgbScripterPage(
      [
          () {
            echo("""You are looking at the list of $numEntries entries.""");
          },
          [
            () => """- Only show cargo of _state: in transit_
          - Only show cargo of _type: biological_ // TODO: no current Sentaco cargo
          - Only show cargo of _client: Sentaco_ // the real cargo is not there
          - Only show cargo of _destination: *Sentaco*_
          // TODO: couple of other stuff that kind of makes sense
          - Only show cargo stored in bay E4
          - Go through all $numEntries entries
          """,
          {
            "string": () => """Switch to the log and read the rest of the captain's recent entries""",
  "goto": r"""Other log entries"""          }
        ]
,          """// TODO: iterate and let player filter out, each search costs time (worse health)"""
          ]
    );
    pageMap[r"""End: Found order"""] = new EgbScripterPage(
      [
          """And then, there it is. Even before you open the order, you already know this is the one. The description says: _Research equipment_. The Bodega loaded it at the Ithaka Logistics Orbital Depo a month ago. Its point of origin was at Ithaka's surface, at the Sentaco-Exaport R&D Facility. Its final destination: Sentaco XI Space Station, Solar system. Quite a distance. """,
          """The client is not Sentaco, though. It's a company called Ithaka Leasing Services (TODO: put ILS on the exploded container). It might be a Sentaco subsidiary, or a contractor. TODO make less obvious""",
          """There is a delivery note attached to the order. These are conveyed to the recipient upon delivery. This one says:""",
          """    Dr. Eleanor Wells' lab equipment from Ithaka. Notify Dr. Pruitt, mention: "wolfberry". Not sterilized.""",
          """A surge of rage overcomes your brain. You hear loud pulse in your ears and the world gets muffled and distant. "Not sterilized." God knows what sick shit was still living inside that equipment. It's required by law to sterilize anything that could – even with the remotest of possibilites – be contaminated. Someone's _laziness_ just killed eleven people. The twelfth one is on his way.""",
          """At least you have someone to ask about this now. Dr. Wells or Dr. Pruitt ought to have the answers. They might know what exactly got out. And if you're lucky, one of them might even know how to fight it.""",
          [
            null,
          {
            "string": () => """Go call one of them from the bridge""",
  "goto": r"""Go to bridge"""          }
        ]
        ]
    );
    pageMap[r"""End: Go to bridge"""] = new EgbScripterPage(
      [
          """# Death""",
          """You leave the captain's cabin and head to the bridge, when suddenly you fall to your knees. At first, it's just like your legs temporarily gave out, but then comes the pain. Immense, excruciating pain, coming from the marrow to the skin. You fall on the side and open your mouth to scream, but only a squawk comes out.""",
          [
            null,
          {
            "string": () => """Wait if it fades // doesn't work""",
  "goto": r"""Wait if it fades"""          },
          {
            "string": () => """Try to call Gorilla""",
  "goto": r"""Call gorilla"""          },
          {
            "string": () => """Try to crawl towards the bridge // works""",
  "goto": r"""Crawl towards the bridge"""          }
        ]
,          """- Crawl to the right (away from bridge, towards the engine room) // cures for a while"""
          ]
    );
    pageMap[r"""End: Call gorilla"""] = new EgbScripterPage(
      [
          """You crawl to the nearest intercom handset and, sorely, you reach up to it and set it to broadcast. You take a few seconds to subdue the pain, then speak.""",
          """"Gorilla." You cringe. "Go. To. Master." """,
          """// gorilla tries to help, but falls with similar seizure"""
          ],
          visitOnce: true    );
    pageMap[r"""End: Crawl towards the bridge"""] = new EgbScripterPage(
      [
          """You crawl along Corridor Left. Every single movement is pure pain, and your whole body perspires with cold sweat. The bright white light and the buzzing of the lamps is unbearable.""",
          """After what feels like hours of hell itself, you look back, and the captain's cabin is just there, a couple of strides behind your feet. You're not even in one tenth of the way.""",
          """// player needs to crawl to engine room, get 'cured', then go to bridge
// player manages to get to bridge"""
]
    );
    pageMap[r"""End: Arrive bridge"""] = new EgbScripterPage(
      [
          """// TODO: start a new timeline with last symptoms""",
          """Still a bit shaken, you arrive at the bridge. The view of outside /* TODO: what is outside? */ is nauseating, so you try to keep it out of your field of vision by bowing your head.""",
          """"I need to make a call," you say. "I need to get to a comms beacon." """,
          """The Bodega puts up a map on the main monitor, but you can't bear to look at it, it makes you retch. It's too bright and it moves constantly.""",
          """"The closest FTL beacon is Station Unity. There's also one farther away, at the Belt III Shipyard. We should be able to get there, but it will take a at least one more hour." """,
          """"Is there nothing else around here?" """,
          """"Well, there's the abandoned Station Shannon. They obviously had FTL comms, but that doesn't mean the beacon is still there. I mean, it's still in the directory, but it doesn't seem anyone has made any calls from there lately." """,
          """- Jump to Station Unity
- Jump to Station Shannon // not working, probably plundered, chance to describe this place
- Jump to Belt III Shipyard"""
]
    );
    pageMap[r"""End: Making the call"""] = new EgbScripterPage(
      [
          """The Bodega starts linking itself to the comms beacon. It takes ages.""",
          () {
  lastSymptoms.time++;
        },
          """Finally, the comms panel goes green. You can make your call.""",
          """- Call Dr. ___ Pruitt
- Call Dr. Eleanor Wells"""
]
    );
    pageMap[r"""End: Call Pruitt"""] = new EgbScripterPage(
      [
          """// TODO: call Dr. Pruit: watches. calls Sentaco ship.""",
          [
            null,
          {
            "goto": r"""Call Wells"""          }
        ]
        ]
    );
    pageMap[r"""End: Call Wells"""] = new EgbScripterPage(
      [
          """You tell Bodega to call Eleanor Wells and the monitor starts filling with information about the connection being established. The handle 'ewells' shows up all over the place. It's hers.""",
          () {
  lastSymptoms.time++;
        },
          """A chime sounds and Dr. Eleanor Wells is on the main screen. She looks tired and angry. The room at the other end is dim.""",
          """"Look, it's 4am and I wake up in 2 hours from now. I'm too old for this." She pauses for a moment. "Who the hell are you?" """,
          [
            null,
          {
            "string": () => """Tell her your name""",
  "script": () {points.add(1, "honesty");}          },
          {
            "string": () => """Tell her a made up name"""          },
          {
            "string": () => """"It doesn't matter." """          }
        ]
,          """Before you can reply, another seizure strikes.""",
          () {
  lastSymptoms.time++;
        },
          """Dr. Wells eyes are now wide open. She looks around herself, checking that no one else is present, then she comes closer to her comms panel.""",
          """"Are you... have you taken Rescin?" """,
          [
            null,
          {
            "string": () => """"I haven't 'taken' anything. There was an accident." """,
  "goto": r"""It was accident"""          },
          {
            "string": () => """"What the fuck is Rescin?" """,
  "goto": r"""Wtf is Rescin"""          }
        ]
,          """// TODO: keep track of 'attitude' => if too harsh, will later be harsh back"""
          ]
    );
    pageMap[r"""End: Wtf is Rescin"""] = new EgbScripterPage(
      [
          """"You don't _know?_ But how... You're obviously in the last stage. Someone had to contaminate you. Was it Pruitt?" """,
          """You say: "I have no idea who it was, if anyone. There was an explosion on the ship." """,
          [
            null,
          {
            "goto": r"""It was accident"""          }
        ]
        ]
    );
    pageMap[r"""End: It was accident"""] = new EgbScripterPage(
      [
          """"What happened?" """,
          """"A container exploded in the cargo bay. It damaged some research equipment from Ithaka, among other things. Then people started dying." """,
          () {
  lastSymptoms.time++;
        },
          """Dr. Wells watches you in horror. "Dying? People started _dying?_ How many?" """,
          """"Eleven." """,
          """All color leaves Dr. Wells' face. "Eleven," she repeats. Her face is torn in a terrified grimace. "How. How did they die?" """,
          """"Like I'm dying now. They got sicker and sicker, and then they just stopped breathing." """,
          """"And then?" """,
          """"What do you mean, 'then'?" Every word you say, every breath you take, hurts. "They. Fucking. Died!" // TODO: choice""",
          """"But what did you do with the bodies? Where are they now?" """,
          """"Don't worry," you lower your voice. "We're not that stupid. We airlock'd them. But even without the bodies, others got sick." """,
          """"Airlock'd?" """,
          """"We let them out. To outer space." """,
          """"Jesus Christ," Dr. Wells says. Her mouth stays open, her eyes absently roam over her room. "Jesus Christ." She thinks for a minute, then suddenly springs into action and starts writing something on a keyboard that's out of view. """,
          """"I am sending you some of the research we did on Rescin. You'll need it later. Now, listen," she looks back at the camera. "Do not fight it. I know it hurts, but do _not_ fight it." """,
          () {
  lastSymptoms.time++;
        },
          """"This is normal," Dr. Wells says. "We were not able to make these side effects disappear. That's why the research was scrapped. We knew we would never be able to pass the regulations for human testing, and without that, we could never hope for Rescin to help people." """,
          """- "How does it help?"
- "You call this help? Are you retarded? I'm _dying_." """,
          """"We developed Rescin " """,
          """- How does Rescin work?
- Why does it hurt so bad?""",
          """// TODO: do NOT let the player know that he will be ressurected - only disclose about the nanobots"""
          ]
    );
    pageMap[r"""End: Nice Death"""] = new EgbScripterPage(
      [
          """This time, it's different. Your are losing your peripheral vision. The only thing you see now is the blindingly bright face of Dr. Eleanor Wells. She's saying something to you, but you don't hear it. The only thing you hear is something you've never heard before in your life – your body. Not just the blood in your veins, but everything. The complex, moist, organic machine that is your physical body. It is slowing down.""",
          """// TODO: make it frightful experience when attitude is too strong (?) (or some other player driven thing)""",
          """All the pain, all the weight is gone. It's beautiful. There's just you, your body, and the shining eyes of Eleanor Wells, who is now also your mother, and she's still talking to you, and you still don't hear, but that doesn't matter, it's so pleasant and charming you just want to snug in the warmth and bathe in the light.""",
          """- Snug in the warmth and bathe in the light
- Try to stay up"""
]
    );
    pageMap[r"""End: Snug"""] = new EgbScripterPage(
      [
          """You let the wave of warmth and light that was your mother's eyes just a moment ago come to you and cuddle you and, finally, merge with you. You are the light now.""",
          """And then, peacefully, you fade out.""",
          [
            null,
          {
            "goto": r"""Death"""          }
        ]
        ]
    );
    pageMap[r"""End: Death"""] = new EgbScripterPage(
      [
          """This is the end.""",
          """You die.""",
          """..""",
          """..""",
          """..""",
          """Cold floor.""",
          """No other sensation.""",
          """Then, once again, you hear the blood humming in your veins. """,
          """The pain is back, too, but this time, it's not entirely unpleasant. It's like the pain is driving the death away, so you welcome it.""",
          [
            null,
          {
            "string": () => """Open eyes""",
  "goto": r"""Ressurection: Open eyes"""          }
        ]
,          """- TODO: something else, like Try to move, Get more rest"""
          ]
    );
    pageMap[r"""Ressurection: Open eyes"""] = new EgbScripterPage(
      [
          """Your eyes open, shakily. """,
          """You haven't moved since you ... died. You lie on the floor, next to the communications panel, and your eyes are still fixed on the main monitor. """,
          () {
            echo("""Dr. Eleanor Wells is there. She's no longer in a dim lit room, it's day at wherever she is right now. She raises her eyebrows${attitude < 1 ? " and smiles" : ""}.""");
          },
          """"You're back," she says. "Good. We don't have much time." """,
          """- "Why?"
- Stand up
// both fail
// TODO: monitor "inquisitive" - the more inquisitive, the more Eleanor will like player""",
          () {
            echo(""""You're still weak${attitude < 1 ? "" : ". At least I'll be spared of your brash language for once."}, but that will pass soon enough. You are through the rebuild phase now." """);
          },
          [
            null,
          {
            "string": () => """Raise eyebrows"""          }
        ]
,          """Dr. Wells detects your question. "What the nanobots do – after they've gathered data about your body – is they pretty much rebuild it all, cell by cell. Some of the nanos will merge with a cell, effectively making a cyborg microorganism. Most will use your body's own mechanisms and resources to augment its function. Striking the right balance between the two approaches – it was pure alchemy. Well, it was all alchemy, mostly." """,
          [
            null,
          {
            "string": () => """Raise eyebrows""",
  "script": () {echo(""" "We had no data that would be indicative of what would happen. Nobody attempted anything close to this before. There were experiments with single cells or primitive organisms, but never with something as complex as a mouse, let alone a human. We spent almost a year trying to create a working model with some predictive accuracy. We never got there. Not even close. In the end, we had to get to the results experimentally. We were like the alchemists in the middle ages, but instead of the philosopher's stone, we were searching for something much more important." """);}          },
          {
            "string": () => """Do nothing"""          }
        ]
,          """Dr. Wells draws closer to the camera. "Are you familiar with the Verge?" """,
          [
            null,
          {
            "string": () => """Nod""",
  "goto": r"""No need to explain Verge"""          },
          {
            "string": () => """Shake head""",
  "goto": r"""Explain Verge"""          }
        ]
        ]
    );
    pageMap[r"""Ressurection: Explain Verge"""] = new EgbScripterPage(
      [
          """// TODO painful to shake"""
          ],
          visitOnce: true    );
    pageMap[r"""Ressurection: No need to explain Verge"""] = new EgbScripterPage(
      [
          """"Of course, you're pretty much in it right now. But let me tell you, life on a starship in the Verge is _nothing_ like life on the moons and the planets of the Verge." """,
          [
            null,
          {
            "goto": r"""Reminiscing Verge"""          }
        ]
        ]
    );
    pageMap[r"""Ressurection: Reminiscing Verge"""] = new EgbScripterPage(
      [
          """Dr. Wells leans back and narrows her eyes. "I was raised on one of the Verge's poorer star systems, Avesta. We lived on a hot, seizmic power-plant of a planet, Avesta II. See, nobody even cared enough to give it a proper name." She scoffs. "The population was fifty thousand. Together, they provided the 'colonization effort' with more energy than the _whole_ Sol system combined." """,
          """She scoffs again. "And for those fifty thousand people – who worked twelve hour shifts in artificially lit, hell-hot underground tunnels on a volcanic planet – there was just one real doctor. My father. And so I lived among broken people. No matter how hard my father tried, there was always screaming and people with dripping burns and with missing limbs." """,
          [
            null,
          {
            "string": () => """"Who cares?" """,
  "script": () {echo("""Something akin to "huh hrrrs" comes from inside of your throat. Dr. Wells waits for a second to see if you're going to continue, then she gets back to speaking.""");}          },
          {
            "string": () => """Do nothing"""          }
        ]
,          """"I eventually got out of Avesta, out of the Verge, to study medicine with some of the most intelligent people I will ever know. Most of them from central systems, of course. And, see, I learnt that these people – coming from where they do – these people think it's 'not natural' to help people who are beyond some 'level of damage'. When a worker somewhere in the Verge gets his legs caught in machinery, they say it's 'natural' that he loses the whole lower part of his body, because that would have happened a hundred years ago. Is it possible to help him now? Maybe, but they think it would be crossing a line. Of course, most of them have never even _seen_ anyone lose their legs." """,
          """"Fortunately, not everyone was so arrogant. We put together a working group and started looking into technologies that were 'beyond the line'. The most promising one turned out to be nanorobotics. We got funded by Sentaco and set up the lab on Ithaka." """,
          """The Bodega jumps in. "There's a new signal on the radar. A medium sized ship. I just thought you two might want to know." """,
          """"I'm sure you'll learn that the ship was sent by Pruitt. I told you we don't have much time. How do you feel?" """,
          """You don't feel so great, but definitely better than a minute ago.""",
          """- "Not so great."
- "Better."
- "I almost died, that's how I feel." // "No, you actually died."
- "Why do you care?" """,
          """// TODO: I can see your vocal cords are getting better.""",
          """"Look – Pruitt's men are coming for you. I'm not entirely sure if this all is an accident or not, but even if it was, Pruitt will definitely want to have you for research. You're the only human in the universe with Rescin treatment. And unless I am mistaken, you'll be the only one for some time to come." """,
          [
            null,
          {
            "string": () => """Try to get up""",
  "goto": r"""Try to get up"""          }
        ]
        ]
    );
    pageMap[r"""Ressurection: Try to get up"""] = new EgbScripterPage(
      [
          """You try hard to rise up, but even just moving your arms underneath the body, so that you can push up, turns out to be impossible. You give up and immediately, a tingling sensation overcomes all the muscles you just stressed.""",
          """Dr. Wells nods. "You're not ready yet, but don't worry, you'll be in a few minutes." """,
          [
            null,
          {
            "goto": r"""Questions"""          }
        ]
        ]
    );
    pageMap[r"""Ressurection: Questions"""] = new EgbScripterPage(
      [
          [
            () => """- "What exactly happened to me?" // Rescin works to counter any breakages - - "Why 'Rescin'?"
          - "Why did no one else survive?" // outer space
          - "Why are you helping me?" // Pruitt will make a project out of you. I feel responsible
          """,
          {
            "string": () => """Try to stand up again""",
  "goto": r"""Stand up again"""          }
        ]
        ]
    );
    pageMap[r"""Ressurection: Stand up again"""] = new EgbScripterPage(
      [
          """// TODO: first 2 attempts in vain (unless all questions have been answered)
// TODO: one of the attempts: Bodega says how far the incoming ship is""",
          """This time, it works. You push your hands towards the floor and your upper body lifts as easily as if the gravity was turned down. The tingling sensation is all but gone. You stand up and look around. The bridge is as empty as when you got here a few hours back. You notice the radar screen and the highlighted ship that is slowly moving towards the center of it. Amazingly, you can read the distance measurement, although the characters are small and the screen is a few meters away. The ship is 11 kilometers away and approaching the Bodega with an ETA of 5 minutes.""",
          """- "The ship's here in 5 minutes. All energy to shields and weapons."
- "Give me a reading of the ship." """,
          """TODO: reading of the ship
TODO: Dr. Wells disapproves"""
]
    );
    pageMap[r"""Ressurection: Eleanor advice"""] = new EgbScripterPage(
      [
          """"I'm pretty sure the Bodega is no match for that ship." """,
          """"Excuse me?" the Bodega says. """,
          """"Look, ship, I know about the Messenger. Good job. But they won't make the same mistake again. That incoming ship is military class. She's smaller than you, I'm sure, but you have absolutely zero chance of beating her in your current setup. You're better off playing dead." """,
          """The Bodega runs through some schematics on the scanner panel for a fraction of a second, then says: "I'm afraid she's right. That ship appears to be a military-grade vessel. A gunship." """,
          """"Play to your strengths," Dr. Wells says. "They want you alive." """,
          [
            null,
          {
            "string": () => """"So?" """,
  "script": () {echo(""" "They'll board the Bodega. They'll expect trouble, but I don't think they fully appreciate the effects  Rescin can have on a healthy body." """);}          },
          {
            "string": () => """"Whatever." """          }
        ]
,          """The ship is now 4 minutes away.""",
          """"Look, I need to disconnect. They traced our call. It's best for me to move and stay hidden now. After this litter encounter is over, you do the same. I'll contact you later." Dr. Wells smiles. "I think I'll have something the Bodega will enjoy. Until then, good luck." Dr. Wells nods and the main screen goes blank.""",
          """What do you do?
- Contact the ship and surrender to them // end
- Raise shields and prepare for battle // very short battle, incapacitates bodega's weapons, continues with boarding
- Let the ship approach"""
]
    );
    pageMap[r"""Boarding: Start"""] = new EgbScripterPage(
      [
          () {
            echo("""The gunship slowly approaches, all weapons scanning the surface of the Bodega. It seems to be aiming for the right side of the ship, where the airlock ${pulledLever ? "is" : "was"}. Meanwhile, the Bodega is completely still. """);
          },
          """// TODO: again possible to go around the whole ship
// TODO: lose most of strength around the engine
// take weapons 
// find gorilla, still stiff, possibility to move out of the corridor
// make noise ?
// hide (some places better than others)
// mercenaries with masks
// they go in 2 pairs, clockwise and ccw
// player can hear them in adjanced rooms
// walking in to room where they are = even fight
// hiding in place where they're going = can wait various amounts of time, with more time = more chance of being detected, but also better advantage if not detected and possibility to let them through""",
          """// fight itself is primitive, as they are much weaker - problem would be near engine room or with all 4 of them at once
// the better the setup, the quicker fight, the better points"""
]
    );
    pageMap[r"""Boarding: Fight 2 men"""] = new EgbScripterPage(
      [
    ]
    );
    pageMap[r"""Boarding: All men down"""] = new EgbScripterPage(
      [
          """The four men are down. You carefully go through the breach and explore the inside of the gunship. There is no one else there, but you find some food and some energy cells. """,
          """Your current supplies are: TODO.""",
          [
            () => """- Take everything (15 energy cells, food for 70 days)
          - Leave just enough for them to survive, take the rest (14 energy cells, food for 65 days)
          """,
          {
            "string": () => """Leave everything""",
  "goto": r"""Get rid of the men"""          }
        ]
,          """You bring the supplies over to the Bodega. The extremely heavy fuel cells don't seem that way anymore. """,
          """There are now TODO energy cells and food for TODO days on the Bodega. You also scavenge some turret ammunition (TODO?).""",
          [
            null,
          {
            "goto": r"""Get rid of the men"""          }
        ]
        ]
    );
    pageMap[r"""Boarding: Get rid of the men"""] = new EgbScripterPage(
      [
          """You carry all the four men over to the gunship and come back to the bridge. The Bodega then pushes the gunship off while sealing the breach. In twenty minutes, the hull is sealed again, and the gunship slowly drifts away a few hundred meters to the right of the Bodega."""
          ]
    );
    pageMap[r"""Finale: Start"""] = new EgbScripterPage(
      [
          """"We probably shouldn't stay here too much longer," the Bodega says. "The good news is, since you don't need to chat with your doctor girlfriend anymore, we can go pretty much anywhere. Places without comms beacons and outside main official routes seem like a great idea to me right now. We have a few options. Just note that we only have TODO fuel cells right now." """,
          """The Bodega highlights the options on a map on the main screen.""",
          """- A (distance, fuel cells)
- Outer space just outside effective radar ranges
- C
- D""",
          """The Bodega puts in the coordinates for TODO and immediately starts rotating and charging the warp at the same time.""",
          """- Watch
- Go find Gorilla"""
]
    );
    pageMap[r"""Finale: Find Gorilla"""] = new EgbScripterPage(
      [
          """You go looking for Gorilla to where you last saw him, in TODO, but when you arrive, he's not there. The rebuild phase took longer in his case, for whatever reason (you can assume it's because of the proximity to the engine room and also the sheer mass of his body), but it has clearly passed.""",
          """- Look for him in ___
- Look for him in ___
- Look for him in ___"""
]
    );
    pageMap[r"""Finale: Gorilla in captain's cabin"""] = new EgbScripterPage(
      [
          """You enter the captain's cabin and lay your eyes on the most amazing thing you've seen since TODO.""",
          """Gorilla – the massive monument of muscle and fur – is slouching on a chair in front of captain's computer. He's not just sitting there, though. He _actively uses the computer_, apparently reading some long article. When he sees you, he turns around and smiles.""",
          """"I went ahead and read most of what Dr. Wells sent to us," Gorilla says with perfect pronounciation and in a pleasant voice. "It's fascinating." """,
          [
            null,
          {
            "string": () => """"How?" """,
  "goto": r"""How?"""          }
        ]
        ]
    );
    pageMap[r"""Finale: How?"""] = new EgbScripterPage(
      [
          """"Oh, in many ways," says Gorilla. "" """,
          [
            null,
          {
            "goto": r"""Questions for Gorilla"""          }
        ]
        ],
        visitOnce: true    );
    pageMap[r"""Finale: Questions for Gorilla"""] = new EgbScripterPage(
      [
          """- "No, I mean, how are you able to talk this well?" TODO change when not shown for the first time
- "How did you get the password?" // saw captain put in the password countless times."""
]
    );
    pageMap[r"""Finale: End"""] = new EgbScripterPage(
      [
          """Your jaw is still down in amazement when the Bodega starts talking through the PA. She doesn't bother to use the intercom anymore. """,
          """"We just left the detection range of TODO and are on our way to TODO. In other words, you and your pet monkey are safe. You are welcome." """,
          """Gorilla raises his browridge. "Actually, I am not a monkey. I am an ape. If I was a macaque, or similar, you could refer to me as a monkey. Am I a macaque, though? No. I am a gorilla." """,
          """At that moment, you realize: _this is how it's going to be here from now on._""",
          """And the Bodega says: "Great, thanks for the lecture." And then, after a couple of seconds, she says with a different voice: "I suggest both of you apes come to the bridge. You might want to see this." """
          ]
    );
        firstPage = pageMap[r"""Start: Funeral"""];    
  }
  /* INIT */
  void initBlock() {

      bodega = new MockInstance();
      gorillaAttitude = 0;
      timeFromStart = 0;
      bodega.systems["corridor right door"].hp.value = 0;
      bodega.systems["scanner"].hp.value = 0;
      bodega.engine.hp.percentage = 0.92;
      bodega.jets.maneuvering.hp.percentage = 0.75;
      bodega.systems["cargo bay structure"].hp.percentage = 0.9;
      messenger = new MockInstance();
      // TODO
      exploration = new Timeline();
      exploration.mainLoop = () {
        // TODO: gorilla - "is here" / "is with you" / nothing + options
        // TODO: player health down
      };
    
      // TODO: addEvents - periodically say time
      // TODO: addEvent - hull breach has been sealed repair
      
      hullBreachRepairEta = timeFromStart + 2;
      lastSymptoms = new MockInstance();
      // TODO: pain in marrow

  }
}
