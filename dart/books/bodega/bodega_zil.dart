library bodega_zil;

import '../libraries/zil.dart';
import '../libraries/timeline.dart';
import 'package:egamebook/src/shared/stat.dart';
import 'package:egamebook/src/book/scripter_typedefs.dart';
import 'package:egamebook/src/book/scripter.dart' show EgbScripter;
import '../libraries/storyline.dart';

// XXX START HERE: class BodegaZil
//          - initializes with echo, goto, etc. (DI)
//          - encapsulates everything, so in bodega.egb, we write:
//                bridge = bodegaZil.bridge;
//          - or maybe even just:
//                bodegaZil.init(vars);

class BodegaZil {
  BodegaZil(this.goto, this.echo, this.choice, this.vars, EgbScripter scripter) 
      : zil = new Zil(scripter) {
    
    setupExploration();
    setupActors();
    setupRooms();
  }
  
  void setupExploration() {
    exploration = zil.timeline;
    exploration.mainLoop = () {
      clock.value += 1;
      // TODO: Exploration timeline - no jumping, no rescheduling
    };
    
    exploration.schedule(MAX_TIME_BEFORE_NAP, () {
      roomBeforeOvercameBySleepiness = zil.player.location.name;
      goto("Bridge: OvercomeBySleepiness");
    });
    
    exploration.schedule(MAX_TIME_BEFORE_HYPERDRIVE_READY, () {
      jumpToSpaceStationUnity.isActive = true;
      echo("""\n\nThe ship's PA system makes a short bleep, then Bodega """
          """says: "The hyperdrive is fully operational. We are ready to """
          """jump, $salutation$name." """);
    });
  }
  
  void setupActors() {
    gorilla = new AIActor(zil, "Gorilla", pronoun: Pronoun.HE);
  }
  
  void setupRooms() {
    setupBridge();
    setupNose();
    setupCorridorLeftNextToCaptainsCabin();
    setupCaptainsCabin();
  }
  
  void setupCaptainsCabin() {
    // ITEMS
    captainsGun = new Item(zil, "captain's gun", 
        actions: [
          new Action("check the gun", 
             () => storyline.add("You pull the gun out of your pocket and heft "
                 "it in your hand. It's heavy, well-built and seems in fine "
                 "condition. It is loaded."),
             needsToBeCarried: true,
             onlyOnce: true,
             submenu: INVENTORY),
          new Action("shoot the Gorilla",
              () {
                storyline.add("You lift the gun and aim at Gorilla. He freezes "
                    "and looks absolutely horrified.");
                choice("Pull the trigger", script: () {
                  storyline.add("You shoot.");
                  gorilla.isActive = false;
                  gorillaCorpse.isActive = true;
                  gorillaCorpse.location = gorilla.location;
                  storyline.add("Gorilla takes it in the chest and falls to "
                      "the ground with a loud thump. A puddle of blood starts "
                      "forming under him almost immediately.");
                  // TODO: Bodega reacts - what the hell
                });
                choice("Put the gun down", script: () {
                  storyline.add("You put the gun down. Gorilla doesn't move. "
                      "He watches you in terror, frozen in place.");
                  // TODO: a new AI 'Goal' - being horrified, frozen
                });
              },
              performerCheck: (actor) => actor.isInSameRoomAs(gorilla),
              needsToBeCarried: true,
              submenu: INVENTORY)
         ],
         takeable: true,
         takeDescription: "<subject> lift<s> the <object> and put<s> it in the "
           "pocket",
         count: 1  // can be >1 for things like bullets
    );
    gorillaCorpse = new Item(zil, "Gorilla's body",
        takeable: true,
        isActive: false
    );

    // ACTIONS
    firstLookAround = new Action.Goto("have a look around [5 minutes]", 
        "CaptainsCabinLookAround", 
        onlyOnce: true);
    secondLookAround = new Action.Goto("continue with the search [5 minutes]",
      "CaptainsCabinLookAroundContinue", onlyOnce: true, isActive: false);
    thirdLookAround = new Action.Goto("search the rest of the room [3 minutes]",
      "CaptainsCabinLookAroundTheRest", onlyOnce: true, isActive: false);
    captainsComputerFirst = new Action.Goto("look at captain's computer screen",
      "CaptainsComputerFirst", onlyOnce: true);
    

    // ROOM
    new Room(zil, "Explore: CaptainsCabin",
        "captain's cabin",
        [new Exit("Explore: CorridorLeftNextToCaptainsCabin", "exit the room",
            "<subject> leave<s> into the corridor")],
        descriptionPage: "CaptainsCabin.description",
        coordinates: [-10, -10, 0],
        /*items: [captainsGun],*/
        actions: [
          firstLookAround,
          secondLookAround,
          thirdLookAround,
          captainsComputerFirst
        ]
    );
  }
  
  Item captainsGun;
  Item gorillaCorpse;
  Action firstLookAround;
  Action secondLookAround;
  Action thirdLookAround;
  Action captainsComputerFirst;
  
  void setupCorridorLeftNextToCaptainsCabin() {
    new Room(zil, "Explore: CorridorLeftNextToCaptainsCabin",
          "Corridor Left",
          [new Exit("Explore: Bridge", "walk to the bridge",
               "<subject> {enter<s>|arrive<s> at} the bridge"),
           new Exit("Explore: CaptainsCabin", "enter Captain's cabin",
               "<subject> open<s> the door to the Captain's cabin and "
               "enter<s>"),
           new Exit("Explore: CorridorLeftNextToAirlock", 
               "walk {toward the cargo bay|to the {aft|back} of the ship}",
               "<subject> {stride|walk}<s> towards the {{aft|back} of the "
               "ship|cargo bay}")],
          descriptionPage: "CorridorLeftNextToCaptainsCabin.description",
          coordinates: [-5, -10, 0]
    );
  }
  
  void setupBridge() {
    lookAtHullBreachFromBridge = 
        new Action.Goto("put up the hull breach on the screen""",
        "LookAtHullBreachFromBridge", isActive: false);
    askBodegaQuestions = new Action.Goto("ask Bodega some questions",
        "BodegaQuestions: Start", requirement: () => bodegaTopics.length > 0);
    takeANap = new Action.Goto("Take a nap",
        "Bridge: Nap", onlyOnce: true,
        requirement: () => zil.timeline.time < MAX_TIME_BEFORE_NAP);
    // TODO: add radar on/off
    waitForJumpToUnity = 
        new Action.Goto("Wait until ready to jump to Unity",
        "Bridge: WaitForJump", onlyOnce: true,
        requirement: () => 
            zil.timeline.time >= MESSENGER_CONTACT_TIME &&
            zil.timeline.time < MAX_TIME_BEFORE_HYPERDRIVE_READY &&
            !jumpedToUnity);
    jumpToSpaceStationUnity = 
        new Action.Goto("initiate the jump to Space Station Unity", 
        "Unity: Jump", isActive: false,
        requirement: () => !jumpedToUnity);
    
    // ITEMS
    // TODO: worn out map of the Bodega - near left Airlock
    
    // ROOM
    bridge = new Room(zil, "Explore: Bridge", // corresponds to pagename
       "the bridge",
       [
         new Exit("Explore: Nose", 
             "use the utility corridor to the nose of the ship",
             "<subject> squeeze<s> into the narrow space below the main "
             "'window'"),
         new Exit("Explore: CorridorLeftNextToCaptainsCabin", 
             "leave to Corridor Left",
             "<subject> {go<es>|walk<s>} through the sliding door into "
             "Corridor Left and – after a few more paces – arrive<s> at the "
             "entrance to the captain's cabin"),
         new Exit("Explore: CorridorRightNextToComputerRoom", 
             "leave to Corridor Right",
             "<subject> {go<es>|walk<s>} through the sliding door into "
             "Corridor Right and – after a few more paces – arrive<s> at the "
             "entrance to the computer room")
       ],
       descriptionPage: "Bridge.description",
       coordinates: [0, 0, 0],
       actors: [gorilla],
       actions: [
           waitForJumpToUnity,
           jumpToSpaceStationUnity,
           askBodegaQuestions,
           lookAtHullBreachFromBridge,
           takeANap
       ],
       onUpdate: () {
         // Check whether we just arrived to Unity.
         if (justArrivedAtUnity) {
           goto("Unity: Arrival");
           return false;
         }
         return true;
       }
    );
  }
  
  Room bridge;
  Action lookAtHullBreachFromBridge;
  Action askBodegaQuestions;
  Action takeANap;
  Action waitForJumpToUnity;
  Action jumpToSpaceStationUnity;
  
  void setupNose() {
    // ACTIONS
    scannerLook = new Action.Goto("Take a look at the scanner", 
        "Nose.ScannerLook", onlyOnce: true);
    scannerRepair = new Action.Goto("Repair the scanner", 
        "Nose.ScannerRepair", isActive: false, onlyOnce: true);
    // TODO: laser upgrade
    // TODO: floodlights repair
        
    // ROOM
    new Room(zil, "Explore: Nose",
        "nose of the ship",
        [new Exit("Explore: Bridge", "crawl back to the bridge",
            "<subject> crawl<s> out of the nose hatchway onto the bridge")],
        descriptionPage: "Nose.description",
        coordinates: [0, 5, 0],
        actions: [
            scannerLook,
            scannerRepair
        ]
    );
  }
  
  Action scannerLook;
  Action scannerRepair;
  
  AIActor gorilla;
  
  // Pointers to EgbScripter objects and functions.
  final Zil zil;
  final GotoFunction goto;
  final EchoFunction echo;
  final ChoiceFunction choice;
  final Map<String, Object> vars;
  Timeline exploration;
  
  // Utility functions.
  String getHoursToHyperdrive() {
      num hours = (MAX_TIME_BEFORE_HYPERDRIVE_READY - exploration.time) / 60;
      if (hours < 0) throw "getHoursToHyperdrive() called after jump";
      if (hours < 1) {
        int tenMinutes = (hours * 6).round();
        if (tenMinutes == 0) return "a few minutes";
        return "about ${tenMinutes}0 minutes";
      }
      return """${hours.round()} hour${hours >= 1.5 ? "s" : ""}""";
  }
  
  void printSleepiness() {
      int index = exploration.time ~/ (MAX_TIME_BEFORE_NAP / 5);
      if (index > 4) return;  // Only report sleepiness before the 'nap'.
      echo("""You are feeling ${tirednessStrings[index]}.""");
  }
  
  // Map saveable vars to strongly typed variables.
  Stat get clock => vars["clock"];
  String get salutation => vars["salutation"];
  String get name => vars["name"];
  List<String> get bodegaTopics => vars["bodegaTopics"];
  bool get jumpedToUnity => vars["jumpedToUnity"];
  bool get justArrivedAtUnity => vars["justArrivedAtUnity"];
  // Read & Write
  String get roomBeforeOvercameBySleepiness => 
      vars["roomBeforeOvercameBySleepiness"];
  set roomBeforeOvercameBySleepiness(String value) {
    vars["roomBeforeOvercameBySleepiness"] = value;
  }
}

const String INVENTORY = "···";  // Middle dots.

const int MAX_TIME_BEFORE_NAP = 148;
const int MESSENGER_CONTACT_TIME = 460;
const int MAX_TIME_BEFORE_HYPERDRIVE_READY = 473;

// Printing how tired the player is.
const List tirednessStrings = const ["quite tired", "really tired", 
                                     "extremely tired", "exhausted", 
                                     "absolutely exhausted"];