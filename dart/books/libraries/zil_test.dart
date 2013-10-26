import 'package:unittest/unittest.dart';
import 'package:egamebook/src/book/scripter.dart';
import 'zil.dart';


void main() {
  test("mainLoop works", () {
    
    var captainsGun = new Item("captains {gun|pistol}", 
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
      contents: [],
      visible: false
    );
    rooms.addRoom(new Room("Exploration.Bridge", // corresponds to pagename
        [/*new UnconditionalExit("LeftCorridor"), 
         new PlayerOnlyExit("SecretDoor"), 
         new Exit("Hatchway", requirement: (actor) => actor.isSlim && hatchway.isOpen)*/],
         //onEnter: () { /* Room function (on enter?) */ echo },
         //globalBitsOverride: {hearablePA: true, loudEnviron: false},
         coordinates: [0, 0, 0],
         items: [captainsGun]
    ));
    
  });
  
  // EXAMPLE
  // aiActors.update(); // something like that?
  // rooms.setCurrentFromPageName(currentPageName);
  // rooms.current.showText();  // "You are standing in the cargo bay. There's a steel bar on the ground here."
                                // "Gorilla is walking through here. He's heading to the hatch Corridor Left."
  // timeline.time++;           // "Through the PA, you hear ..." 
  
  // rooms.current.showChoices();  // Run this in a separate script block!
}