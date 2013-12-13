import 'package:unittest/unittest.dart';
import 'package:egamebook/src/book/scripter.dart';
import 'zil.dart';
import 'storyline.dart';


void main() {

  Item captainsGun;
  Room bridge, leftCorridor;
  AIActor gorilla;
  
  setUp(() {
    zilInit();
    // Init
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
             submenu: "...")
         ],
         takeable: true,
         count: 1,  // can be >1 for things like bullets
         container: true,
         contents: []
    );
    bridge = rooms.add(new Room("Exploration.Bridge", // corresponds to pagename
        "the bridge",
        [new Exit("LeftCorridor"), 
         new Exit("Hatchway", requirement: () => player.isAlive)],
         //onEnter: () { /* Room function (on enter?) */ echo },
         //globalBitsOverride: {hearablePA: true, loudEnviron: false},
         coordinates: [0, 0, 0],
         items: [captainsGun]
    ));
    leftCorridor = rooms.add(new Room("LeftCorridor",
        "Left Corridor",
        [new Exit("Exploration.Bridge")],
        coordinates: [1, 1, 0]
    ));
    rooms.add(new Room("Hatchway", "the hatchway", []));
    
    gorilla = actors.add(new AIActor("Gorilla", pronoun: Pronoun.HE), bridge);
  });
  
  
  test("AI actors move", () {
    gorilla.currentGoal = new ArbitrarySetOfGoals(gorilla, 
        [new TestPickUpAndComment(gorilla, captainsGun),
         new GoToRoom(gorilla, leftCorridor),
         new GoToRoom(gorilla, bridge),
         new Say(gorilla, "Hi again!")]);
    
    rooms.setCurrentFromPageName("Exploration.Bridge");
    player.location = rooms.current;
    rooms.current.update(10);
    
    // Needed in debug only.
    print(storyline.toString());
    expect(storyline.toString(), contains(
        r'''says: "I'm gonna pick this captain's gun up." He picks up '''
        r'''captain's gun. He says: "Great!" He leaves towards Left '''
        r'''Corridor. He arrives from Left Corridor. He says: "Hi again!"'''));
    
    // zil.showChoices();
  });
  
  // EXAMPLE
  // aiActors.update(); // something like that?
  // rooms.setCurrentFromPageName(currentPageName);
  // rooms.current.showText();  // "You are standing in the cargo bay. There's a steel bar on the ground here."
                                // "Gorilla is walking through here. He's heading to the hatch Corridor Left."
  // timeline.time++;           // "Through the PA, you hear ..." 
  
  // rooms.current.showChoices();  // Run this in a separate script block!
}