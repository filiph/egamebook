library Reference_Scripter_Implementation;

import 'scripter.dart';
import 'dart:isolate';

void main(List<String> args, SendPort mainIsolatePort) {
  new ScripterImpl(mainIsolatePort);
}

class A {
  int i;
}

class ScripterImpl extends Scripter {

  /* LIBRARY */

  void scream() {
    echo("OMG OMG!!!");
  }

  ScripterImpl(SendPort mainIsolatePort) : super(mainIsolatePort) {
    pageMap = new ScripterPageMap();
    pageMap[r"""handle"""] = new ScripterPage(
        [
         """You woke up and quickly realize the house is surrounded by the police. "Oh Rick," you sigh. "You idiot."  """,
         """You have a minute at most before the pigs kick the door in. """,
         () {
           time = 0;
         },
         {
           "string": r""" """,
           "goto": r"""wakeupDilemma"""
         }
        ],   
        visitOnce: true
    );

    pages = [
      /* PAGES & BLOCKS */
      // Day1.WakeUp
      [
        """You woke up and quickly realize the house is surrounded by the police. "Oh Rick," you sigh. "You idiot."  """,
        """You have a minute at most before the pigs kick the door in. """,
        () {
          time = 0;
        },
        {
          "string": r""" """,
          "goto": r"""wakeupDilemma"""
        }
      ],
      // Day1.wakeupDilemma
      [
        () {
          if (time >= 45) {
            goto("policeBreakIn");
          } else if (time >= 30) {
          }
        },
        () {
          echo("""It is $time seconds since you woke up. """);
        },
        () {
          echo("""This means $time seconds have passed
since you opened your eyes. """);
        },
        () {
          choices.add(new Choice(
              """Get dressed (30 seconds) """,
              goto:r"""getDressed""",
              then:() { {echo("Ladyboy!");;}; }
          ));
        },
        [
          "What do you do now?",
          {
            "string": r"""Get the gun (15 seconds) """,
            "goto": r"""getGun"""
          },
          {
            "string": () => """Wait another second, even though it's $time""",
            "goto": r"""getGun""",
            "script": () { time++; }
          }  
        ],
        {
          "string": r"""Get the gun (15 seconds) """,
          "goto": r"""getGun"""
        },
        {
          "string": r"""Warn Amy by phone (30 seconds) """,
          "goto": r"""warnAmy"""
        }
      ],
      // Day1.getDressed
      [
        """You quickly grab the clothes that you left on the bedside table and get dressed. You actually manage to do it in 20 seconds in spite of being nervous as hell.
Good! """,
        () {
          time += 20;
        },
        {
          "string": r""" """,
          "goto": r"""wakeupDilemma"""
        }
      ],
      // Day1.getGun
      [
        """You dive under the bed and your hand almost immediately finds the old-fashioned revolver that's been taped there for some time now. You check it -- it's loaded and apparently working. """,
        () {
          weapon = "gun";
          time += 15;
        },
        {
          "string": r""" """,
          "goto": r"""wakeupDilemma"""
        }
      ],
      // Day1.warnAmy
      [
        """You grab the phone and speed-dial number one. It takes ages for her to pick up, and when she does, she's sleepy and slow. """,
        """"Wha' uppp?" """,
        """"Hey baby," you start quickly, "I have pigs outside. Rick must have talked. Go. Go somewhere safe. Somewhere I wouldn't know." """,
        """"What?" """,
        """You hang up, hoping she got all that. You know you can't lose any more time now. """,
        () {
          {time+=30;};
          goto(r"""wakeupDilemma""");
        }
      ],
      // policeBreakIn
      [
        """There's a sudden, loud crash _right in the room_ and a man in black overall jumps into the room, through the window, like some sort of a freaking ninja. Everything slows down. He's holding a gun and starts turning it towards you. """,
        () {
          if (weapon == "gun") {
            echo("""You react instinctively. There's a loud gunshot and the man falls to the ground. You shot him in the stomach and you know he's wearing an armor, but the sheer shock and power of the impact will incapacitate this guy for some time.""");
            goto("""runOutTheWindow""");
          } else {
            echo("""You realize you don't have the gun yet, so you instinctively move towards the bed (to which it's taped from below). Though the policeman can't know what you're after, he acts as instinctively as you do -- he shoots you in the right clavicle area. You fall to the ground, screaming with pain.""");
            goto("""wasted""");
          }
        }
      ],
      // Day1.runOutTheWindow
      [
        """You jump through the window, catch hold of some branches of the backyard tree and fall down on the grass with a thump. You hear "Shit!" from the side, so you send a blind shot there, and start running towards the white fence. The adventure begins. """,
        {
          "string": r""" """,
          "goto": r"""theAdventureBegins"""
        }
      ],
      // wasted
      [
        """For the next few hours and days, you just see blurs and colors and you dream nightmares of Amy and the bastard son of yours. """,
        """When you finally come to your senses, you're in prison. And you won't be getting out alive. """
      ]
    ];
  }
  /* INIT */
  void initBlock() {

    name = "Filip";
    age = 30;
    surname="Hracek";

  }
}
