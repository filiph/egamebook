library Scripter_Implementation;

import 'package:egamebook/src/book/scripter.dart';
import 'dart:isolate';

import '../libraries/zil.dart';
import '../libraries/storyline.dart';


class ScripterImpl extends EgbScripter {

  /* LIBRARY */


  ScripterImpl(SendPort mainIsolatePort) : super(mainIsolatePort) {
    /* PAGES & BLOCKS */
    pageMap[r"""Bridge"""] = new EgbScripterPage(
      [
          () {
  zil.update(1);
        },
          () {
  // TODO player.createChoices();
        }
        ]
    );
    pageMap[r"""CorridorLeft"""] = new EgbScripterPage(
      [
          """This is great."""
          ]
    );
    pageMap[r"""CaptainsCabin"""] = new EgbScripterPage(
      [
    ]
    );
        firstPage = pageMap[r"""Bridge"""];    
  }
  /* INIT */
  void initBlock() {

      zil = new Zil(this);  // Initialize Zil with the Scripter instance.
    
      // ITEMS
      captainsGun = new Item("captain's gun", 
          [
           new Action("check the gun", 
               () => echo("You check the gun. It's okay."),
               roomCheck: (room) => room.lit,
               performerCheck: (actor) => actor.isHuman,
               //targetActorCheck: (targetCandidate) => true,
               //targetItemCheck: (targetCandidate) => true,
               itemCheck: (item) => item.isActive,
               needsToBeCarried: true,
               submenu: "..."),
            new Action("shoot the Gorilla",
                () {
                  echo("You lift the gun, aim at the Gorilla, and shoot.");
                  gorilla.isAlive = false;
                  gorillaCorpse.isActive = true;
                  gorillaCorpse.location = gorilla.location;
                  echo("He takes it in the chest and goes down.");
                },
                performerCheck: (actor) => actor.isInSameRoomAs(gorilla),
                needsToBeCarried: true)
           ],
           takeable: true,
           count: 1,  // can be >1 for things like bullets
           container: true,
           contents: []
      );
      gorillaCorpse = new Item("Gorilla's body",
          [],
          takeable: true,
          isActive: false
      );
    
      // ROOMS
      bridge = zil.rooms.add(new Room("Bridge", // corresponds to pagename
          "the bridge",
          [new Exit("CorridorLeft")],
          coordinates: [0, 0, 0]
      ));
      corridorLeft = zil.rooms.add(new Room("CorridorLeft",
          "Corridor Left",
          [new Exit("Bridge"),
           new Exit("CaptainsCabin")],
          coordinates: [-5, -10, 0]
      ));
      captainsCabin = zil.rooms.add(new Room("CaptainsCabin",
          "captain's cabin",
          [new Exit("Bridge")],
          coordinates: [-10, -10, 0],
          items: [captainsGun]
      ));
      
      // ACTORS
      gorilla = zil.actors.add(new AIActor("Gorilla", pronoun: Pronoun.HE), bridge);

  }
}

// The entry point of the isolate.
void main(List<String> args, SendPort mainIsolatePort) {
  new ScripterImpl(mainIsolatePort);
}
