library bodega_zil;

import '../libraries/zil.dart';
import '../libraries/timeline.dart';
import 'package:egamebook/src/shared/stat.dart';
import 'package:egamebook/src/book/scripter_typedefs.dart';
import 'package:egamebook/scripter.dart'
    show
        CheckboxInput,
        EgbScripter,
        Form,
        FormElement,
        PointsCounter,
        RangeOutput;
import '../libraries/storyline.dart';
import '../libraries/randomly.dart';
import 'dart:collection';

import 'bodega.dart' show ScripterImpl;

class BodegaZil {
  BodegaZil(
      this.goto, this.echo, this.choice, this.showForm, ScripterImpl scripter)
      : zil = new Zil(scripter),
        scripter = scripter {
    setupTimeline();
    setupActors();
    setupRooms();
  }

  void setupTimeline() {
    exploration = zil.timeline;
    exploration.mainLoop = () {
      scripter.clock.value += 1;
      // TODO: Exploration timeline - no jumping, no rescheduling
    };

    // TODO: add bodega's rants (SINGULAR)
    // - Update: it'll take about __ minutes for my hyperdrive to synchronize.
    // - I know you don't want to hear this, but you are dying.
    // - While you're __, you think about the fact that you always liked solitude
    // - Bodega: Hey, I just re-analyzed your history. Let's face it, you're
    //           damaged goods. But you know what? I don't care. Everyone I've
    //           ever worked with turned out to have a history of some sort.
    //           I'm tired of hearing this as an excuse.

    exploration.schedule(52, () {
      echo("\n\n");
      echo(exploration.generateWhileOutput(
          "While <whileString> you have a brief sensation of mild tingling in your nose.",
          "You have a brief sensation of mild tingling in your nose."));
      echo("You ascribe it to sleep deprivation.");
      echo("\n\n");
    });

    exploration.schedule(MAX_TIME_BEFORE_NAP, () {
      scripter.roomBeforeOvercameBySleepiness = zil.player.location.name;
      goto("Bridge: OvercomeBySleepiness");
    }, type: TimedEvent.MAJOR);

    exploration.schedule(MAX_TIME_BEFORE_HYPERDRIVE_READY, () {
      jumpToSpaceStationUnity.isActive = true;
      echo("\n\n");
      echo(exploration.generateWhileOutput(
          "While <whileString> the ship's PA system makes a short bleep,",
          "The ship's PA system makes a short bleep,"));
      echo(
          """then Bodega says: "The hyperdrive is fully operational. I am ready to """
          """jump, ${getInformalSalutation()}." \n\n""");
    });

    unityArrivalEvent = exploration.schedule(null, () {
      echo("""The Bodega says: "We have arrived to Space Station Unity." """);
      scripter.justArrivedAtUnity = true;
      scripter.currentlyInJump = false;
    }, type: TimedEvent.MAJOR);

    exploration.schedule(MESSENGER_CONTACT_TIME + 5, () {
      echo(
          """\n\n Although you're more or less rested after the short nap, something doesn't feel quite right. You are sweating and you have a strange taste in your mouth. Is it just paranoia? \n\n""");
    });

    exploration.schedule(MESSENGER_CONTACT_TIME + 22, () {
      echo("\n\n");
      echo(exploration.generateWhileOutput(
          "While <whileString> you have to stop for a moment.", ""));
      echo(
          """You have a brief fit of uncontrollable coughing. You stand there for a while, waiting if it comes back but it doesn't. You tell yourself it's nothing. \n\n""");
      // TODO: medic? more info
    });

    exploration.schedule(MESSENGER_CONTACT_TIME + 48, () {
      echo("\n\n");
      echo(exploration.generateWhileOutput(
          "While <whileString>, you suddenly feel formidable pressure in your chest.",
          "Suddenly, you feel formidable pressure in your chest."));
      echo(
          """In a few seconds, the pressure builds into agonising pain. You fall on your knees and wonder if this is it. If this is the end of the line. The time you die. You can't breathe. You can't scream. You can't even bring your hands up to your face to sink your fingernails into it. \n\n""");
      echo(
          """But then, in a few seconds time, the pain is gone and so is the pressure. You carefully try to breathe in, and there's nothing. Not even a cough. This thing — whatever it was — has passed. \n\n""");
      // TODO: medic? more info
    });

    // another fit of cough
    exploration.schedule(MESSENGER_CONTACT_TIME + 55, () {
      echo("\n\n");
      echo(exploration.generateWhileOutput(
          "While <whileString>, the cough comes back.", "The cough is back."));
      echo(
          """It's stronger and more painful than before, and you have to close your eyes and curl your body to keep on top of it. It feels like your lungs.\n\n""");
      echo(
          """In a few seconds it fades but if the rest of the crew is any indication, this was just a mild beginning.\n\n""");
    });

    // Cramp  + on knees + bend bar
    exploration.schedule(MESSENGER_CONTACT_TIME + 70, () {
      echo("\n\n");
      echo(exploration.generateWhileOutput(
          "While <whileString>, you suddenly feel your muscles getting stiff.",
          "Suddenly, you feel your muscles getting stiff."));
      echo(
          """The more you try to move, the worse it gets. You quickly grab a nearby steel railing and you go to your knees, trying to brace for the pain. You close your eyes. \n\n""");
      echo(
          """What comes next is unspeakable. Your whole body burns and shakes with wave after wave of excruciating pain, and it just doesn't go away, for what seems like millenia. If you could scream, you would. At one point, you solemnly pray for death. \n\n""");
      echo(
          """Which is about when the whole thing fades away. The waves of pain get milder until you can sense other things again. You open your eyes and find out you're exactly in the same position, kneeling next to a railing, as when the pain started.""");
      echo("""\n\n ![Hand grabbing a railing IMG] \n\n""");
      echo(
          """And then you notice your hand on the railing and you realize that what was previously a straight steel pipe is now slightly bent at the point where your hand rests. You just deformed a solid metal railing. With your bare hand. \n\n""");
      echo(
          """_What?_ You lift your hand and have a better look at the railing below it. It's the same steel as everywhere else. _Am I getting crazy now?_ You try to bend it some more, but the steel doesn't budge. \n\n""");
      echo(
          """You slowly stand up and shake your head. _I'm definitely getting crazy._ \n\n""");
    });

    // TODO START HERE: more medical emergencies + conversations with Bodega (MAJOR events)

    // Rash showing
//    exploration.schedule(_____, () {
//      echo("\n\n");
//      echo(exploration.generateWhileOutput("While <whileString> you can't shake the feeling that your right hand is looking strange.", ""));
//      echo("""  \n\n""");
//      // TODO: medic? more info
//    });
  }

  // TODO: (Nice-To-Have) Unity questions anywhere in zil...

  TimedEvent unityArrivalEvent;

  void setupActors() {
    // TODO: create class, add Goals (come with me, go to your den,
    //       bring crowbar, search for _, destroy _...?)
    // special player's action - go find Gorilla and wait for Gorilla
    // gorila with player = big chance it will drag him down
    // XXX: let's drop all Goals until we have full story, treat Gorilla as item
    gorilla = new AIActor(zil, "Gorilla", pronoun: Pronoun.HE);
  }

  void setupRooms() {
    setupBridge();
    setupNose();
    setupCorridorLeftNextToCaptainsCabin();
    setupCaptainsCabin();
    setupCorridorLeftNextToAirlock();
    setupStaffRoom();
    setupCorridorLeftNextToBunks();
    setupBunks();
    setupCorridorLeftJunction();
    setupGuts();
    setupEngineRoom();
    setupCorridorRightNextToComputerRoom();
    setupComputerRoom();
    setupCorridorRightNextToAirlock();
    setupMedicalBay();
    setupCorridorRightNextToBunks();
    setupCorridorRightJunction();
    setupCargoBayLeft();
    setupExplodedContainer();
    setupCargoCenter();
    setupCargoBayRight();
    setupPlaceOfBreach();
    setupGorillasDen();
  }

  void setupGorillasDen() {
    gorillasDen = new Room(zil, "Explore: GorillasDen", "cargo bay", [
      new Exit("Explore: CargoBayLeft", "go back to entrance to Corridor Left",
          "you arrive at the entrance to Corridor Left")
    ], descriptionPage: "GorillasDen.description", coordinates: [-10, -70, 0]);
  }

  Room gorillasDen;

  void setupPlaceOfBreach() {
    new Room(zil, "Explore: PlaceOfBreach", "cargo bay", [
      new Exit("Explore: CargoBayRight",
          "go back to entrance to Corridor Right",
          "you arrive at the entrance to Corridor Right")
    ], descriptionPage: "PlaceOfBreach.description", coordinates: [10, -70, 0]);
  }

  void setupCargoBayRight() {
    /*
    TODO
    exits: hull breach == Nearby, a spy robot
     */

    // EXITS
    exitToHullBreach = new Exit("Explore: PlaceOfBreach",
        "go to the hull breach", "you arrive at the place of the breach");
    exitToHullBreach.isActive = false;

    // ROOM
    new Room(zil, "Explore: CargoBayRight", "cargo bay", [
      new Exit("Explore: CorridorRightJunction", "enter Corridor Right",
          "<subject> leave<s> the cargo bay and walk<s> up to the right " "junction"),
      new Exit("Explore: CargoCenter", "go to the other side of the cargo bay",
          "after a few moments, <subject> arrive<s> at the cargo bay "
          "console, located at the front center of the bay", cost: 2),
      exitToHullBreach
    ], descriptionPage: "CargoBayRight.description", coordinates: [10, -55, 0]);
  }

  Exit exitToHullBreach;

  void setupCargoCenter() {
    new Room(zil, "Explore: CargoCenter", "cargo bay", [
      new Exit("Explore: CargoBayLeft", "go to the left side of the cargo bay",
          "<subject> arrive<s> at the left side of the cargo bay", cost: 2),
      new Exit("Explore: CargoBayRight",
          "go to the right side of the " "cargo bay",
          "<subject> arrive<s> at the right side of the cargo bay", cost: 2)
    ],
        descriptionPage: "CargoCenter.description",
        coordinates: [0, -55, 0],
        actions: [
      new Action.Goto("approach the console", "CargoCenter.console",
          onlyOnce: false)
    ]);
  }

  void setupExplodedContainer() {
    new Room(zil, "Explore: ExplodedContainer", "cargo bay", [
      new Exit("Explore: CargoBayLeft", "go to the Corridor Left entrance",
          "<subject> arrive<s> at the front left side of the cargo bay",
          cost: 2)
    ],
        descriptionPage: "ExplodedContainer.description",
        coordinates: [-10, -100, -10],
        actions: [
      new Action.Goto("Search [~30 minutes]", "ExplodedContainer.search",
          onlyOnce: true)
    ]);
  }

  void setupCargoBayLeft() {
    /*
    TODO
    hasSteelRod - "You pick up the steel rod. It's quite heavy, but still easy to wield. The men used it for prying crates open, for propping things in place, and for reaching into narrow openings. It has a cross-shaped tip that fits into the head of the big screws around here."
    exits: damaged Sentaco container - NOT YET!
     */

    // TODO: scavenge - let player choose row+column ("A245") and either give random thing or something specific (medical supplies)

    // TODO: repair Jet (see Bodega Snippets)

    // ROOM
    cargoBayLeft = new Room(zil, "Explore: CargoBayLeft", "cargo bay", [
      new Exit("Explore: CorridorLeftJunction", "enter Corridor Left",
          "<subject> leave<s> the cargo bay and walk<s> up to the left " "junction"),
      new Exit("Explore: CargoCenter", "go to the other side of the cargo bay",
          "after a few moments, <subject> arrive<s> at the cargo bay "
          "console, located at the front center of the bay", cost: 2),
      new Exit("Explore: ExplodedContainer", "go to the place of the explosion",
          "you head deep into the cargo bay and after about 2 minutes, "
          "you arrive at the site of the explosion", cost: 2)
    ], descriptionPage: "CargoBayLeft.description", coordinates: [-10, -55, 0]);
  }

  Room cargoBayLeft;

  void setupCorridorRightJunction() {
    new Room(zil, "Explore: CorridorRightJunction", "right junction", [
      new Exit("Explore: CorridorRightNextToBunks", "walk towards the bridge",
          "after quite a walk, <subject> arrive<s> to the entrance to the " "bunks"),
      new Exit("Explore: Guts", "enter the guts",
          "<subject> open<s> the door and step<s> through a narrow hatchway"),
      new Exit("Explore: EngineRoom", "enter the engine room",
          "<subject> open<s> the bigger door and enter<s> into the engine " "room"),
      new Exit("Explore: CargoBayRight", "go into the cargo bay",
          "<subject> walk<s> to the very end of Corridor Right and enter<s> "
          "the cargo bay through a huge {entrance|door}")
    ],
        descriptionPage: "CorridorRightJunction.description",
        coordinates: [5, -45, 0]);
  }

  void setupCorridorRightNextToBunks() {
    new Room(zil, "Explore: CorridorRightNextToBunks", "Corridor Right", [
      new Exit("Explore: CorridorRightNextToAirlock",
          "walk towards the {bridge|front of the ship}",
          "<subject> walk<s> towards the front of the ship"),
      new Exit(
          "Explore: Bunks", "enter the bunks", "<subject> enter<s> the bunks"),
      new Exit("Explore: CorridorRightJunction",
          "walk {toward the cargo bay|to the {aft|back} of the ship}",
          "after walking for 3 minutes, <subject> arrive<s> at the right " "junction",
          cost: 2)
    ],
        descriptionPage: "CorridorRightNextToBunks.description",
        coordinates: [5, -25, 0]);
  }

  void setupMedicalBay() {

    // ITEMS
    // TODO: precision chainsaw (??)
    // TODO: drugs (only if isMedic)

    // ACTIONS
    // TODO: read through medic's notes (read through own notes if isMedic)
    // TODO: look at counter + Microscope (living tissue on petri dish)
    //       recollection
    // TODO: read psych profiles of crew (same as BodegaQuestions) - NO, zbytecne odpoutava pozornost

    // ROOM
    new Room(zil, "Explore: MedicalBay", "medical bay", [
      new Exit("Explore: StaffRoom", "use the little door",
          "<subject> walk<s> through a narrow corridor and arrive<s> at " "the staff room"),
      new Exit("Explore: CorridorRightNextToAirlock", "exit to Corridor Right",
          "<subject> walk<s> out of the medical bay onto Corridor Right")
    ], descriptionPage: "MedicalBay.description", coordinates: [5, -15, 0]);
  }

  void setupCorridorRightNextToAirlock() {
    // ACTIONS
    pullLever = new Action.Goto("pull the lever to let the captain's body out",
        "CorridorRightNextToAirlock.PullLever",
        onlyOnce: true, isActive: false);

    // ROOM
    new Room(zil, "Explore: CorridorRightNextToAirlock", "Corridor Right", [
      new Exit("Explore: CorridorRightNextToComputerRoom",
          "walk towards the bridge",
          "<subject> arrive<s> at the door to the computer room"),
      new Exit("Explore: MedicalBay", "enter the medical bay",
          "<subject> enter<s> the medical bay"),
      new Exit("Explore: CorridorRightNextToBunks",
          "walk {toward the cargo bay|to the {aft|back} of the ship}",
          "<subject> {stride|walk}<s> towards the {{aft|back} of the " "ship|cargo bay}")
    ],
        descriptionPage: "CorridorRightNextToAirlock.description",
        coordinates: [10, -15, 0],
        actions: [
      new Action.Goto(
          "look into the airlock", "CorridorRightNextToAirlock.Look",
          onlyOnce: true),
      pullLever
    ]);
  }

  Action pullLever;

  void setupComputerRoom() {
    // ACTIONS
    // just look around
    // go through latest internal ship memos
    // later: break stuff
    // TODO: change RAID - makes bodega happier - repair
    // Bodega: "this drive costs more than your education"

    // ROOM
    new Room(zil, "Explore: ComputerRoom", "Computer Room", [
      new Exit("Explore: CorridorRightNextToComputerRoom", "leave",
          "<subject> {walk|step}<s> out to Corridor Right")
    ], descriptionPage: "ComputerRoom.description", coordinates: [7, -10, 0]);
  }

  void setupCorridorRightNextToComputerRoom() {
    new Room(zil, "Explore: CorridorRightNextToComputerRoom", "Corridor Right",
        [
      new Exit("Explore: Bridge", "walk to the bridge",
          "<subject> {enter<s>|arrive<s> at} the bridge"),
      new Exit("Explore: ComputerRoom", "enter the Computer Room",
          "<subject> {walk|step}<s> through the door"),
      new Exit("Explore: CorridorRightNextToAirlock",
          "walk {toward the cargo bay|to the {aft|back} of the ship}",
          "<subject> {stride|walk}<s> towards the {{aft|back} of the ship|cargo bay}")
    ],
        descriptionPage: "CorridorRightNextToComputerRoom.description",
        coordinates: [5, -10, 0]);
  }

  void setupEngineRoom() {
    // TODO steel something gets attracted

    // ACTIONS
    repairEngineAction = new Action.Goto("Take a look at the engine, "
        "try to bring output from 89% back to 100% [~3 hours]",
        "EngineRoom.RepairEngine",
        requirement: () => scripter.isEngineer && !scripter.currentlyInJump,
        onlyOnce: true);

    // ROOM
    new Room(zil, "Explore: EngineRoom", "engine room", [
      new Exit("Explore: CorridorLeftJunction", "exit to Corridor Left",
          "<subject> {{exit|leave}<s>|step<s> out} to Corridor Left"),
      new Exit("Explore: CorridorRightJunction", "exit to Corridor Right",
          "<subject> {{exit|leave}<s>|step<s> out} to Corridor Right")
    ],
        descriptionPage: "EngineRoom.description",
        coordinates: [0, -50, 0],
        actions: [repairEngineAction]);
  }

  Action repairEngineAction;

  void setupGuts() {
    // ACTIONS
    Action lookAtTurret = new Action.Goto("look at nonfunctional defensive "
        "turret", "Guts.TurretLook", onlyOnce: true);
    repairTurret = new Action.Goto(
        "repair the defensive turret [~45 minutes]", "Guts.TurretRepair",
        onlyOnce: true, isActive: false);

    // XXX START HERE!!!
    // TODO: shield generator, radar.

    // TODO(low): allow something hidden from Bodega
    // ROOM
    new Room(zil, "Explore: Guts", "guts", [
      new Exit("Explore: CorridorLeftJunction", "exit to Corridor Left",
          "<subject> {{exit|leave}<s>|step<s> out} to Corridor Left"),
      new Exit("Explore: CorridorRightJunction", "exit to Corridor Right",
          "<subject> {{exit|leave}<s>|step<s> out} to Corridor Right")
    ],
        descriptionPage: "Guts.description",
        coordinates: [0, -45, 0],
        actions: [lookAtTurret, repairTurret]);
  }

  Action repairTurret;

  void setupCorridorLeftJunction() {
    new Room(zil, "Explore: CorridorLeftJunction", "left junction", [
      new Exit("Explore: CorridorLeftNextToBunks", "walk towards the bridge",
          "after quite a walk, <subject> arrive<s> to the entrance to the " "bunks"),
      new Exit("Explore: Guts", "enter the guts",
          "<subject> open<s> the door and step<s> through a narrow hatchway"),
      new Exit("Explore: EngineRoom", "enter the engine room",
          "<subject> open<s> the bigger door and enter<s> into the engine " "room"),
      new Exit("Explore: CargoBayLeft", "go into the cargo bay",
          "<subject> walk<s> to the very end of Corridor Left and enter<s> "
          "the cargo bay through a huge {entrance|door}")
    ],
        descriptionPage: "CorridorLeftJunction.description",
        coordinates: [-5, -45, 0]);
  }

  void setupBunks() {
    shabuVials = new Item(zil, "shabu vials", pronoun: Pronoun.THEY, count: 2,
        // TODO: Action: use - adds mentalPoints, has withdrawal
        isActive: false);

    Action siftThrough = new Action.Goto(
        "sift through lockers [~30 minutes]", "Bunks.SiftThroughLockers",
        onlyOnce: true);
    // TODO: BreakIntoLockedBoxes - sift through locked lockers => find clues, reminisce about solitude
    //                and find things that are surprising
    //                + an item = senior engineer's multitool?
    //          requirement: strong or has crowbar
    // ROOM
    new Room(zil, "Explore: Bunks", "bunks", [
      new Exit("Explore: CorridorLeftNextToBunks", "exit to Corridor Left",
          "<subject> {{exit|leave}<s>|step<s> out} to Corridor Left"),
      new Exit("Explore: CorridorRightNextToBunks", "exit to Corridor Right",
          "<subject> {{exit|leave}<s>|step<s> out} to Corridor Right")
    ],
        descriptionPage: "Bunks.description",
        coordinates: [0, -25, 0],
        items: [shabuVials],
        actions: [siftThrough]);
  }

  Item shabuVials;

  void setupCorridorLeftNextToBunks() {
    new Room(zil, "Explore: CorridorLeftNextToBunks", "corridor left", [
      new Exit("Explore: CorridorLeftNextToAirlock", "walk towards the bridge",
          "<subject> arrive<s> to the Corridor Left airlock and the staff " "room"),
      new Exit("Explore: Bunks", "enter the bunks",
          "<subject> step<s> inside the {living quarters|bunks}"),
      new Exit("Explore: CorridorLeftJunction",
          "walk {toward the cargo bay|to the {aft|back} of the ship}",
          "after walking for 3 minutes, <subject> arrive<s> at the left " "junction",
          cost: 2)
    ],
        descriptionPage: "CorridorLeftNextToBunks.description",
        coordinates: [-5, -25, 0]);
  }

  void setupStaffRoom() {
    // ITEMS
    banana = new Item(zil, "banana", actions: [
      new Action("eat the banana", () {
        storyline.add("You pull the banana out of your pocket, peel it, "
            "and eat it. It's delicious. You feel a little bit " "invigorated.");
        // TODO: player.hp++
        scripter.stoleOfficersBanana = true; // TODO: bodega doesn't like this
        banana.isActive = false;
      }, needsToBeCarried: true, onlyOnce: true, submenu: INVENTORY),
      new Action("give the banana to Gorilla", () {
        storyline.add(
            "You hand the banana to Gorilla. He watches it with amazement, than proceeds to peel it eagerly. Before he takes the first bite, though, he gives you a thankful look.\n\nAfter only a few seconds, the banana is no more. But Gorilla seems very happy.");
        scripter.gorillaAttitude += 2;
        scripter.stoleOfficersBanana = true; // TODO: bodega doesn't like this
        banana.isActive = false;
        scripter.points.add(5, "making friends");
      },
          performerCheck: (actor) => actor.isInSameRoomAs(gorilla),
          submenu: INVENTORY)
    ], takeable: true, isActive: false);

    // ROOM
    new Room(zil, "Explore: StaffRoom", "staff room", [
      new Exit("Explore: MedicalBay", "go through the little door",
          "<subject> squeeze<s> through a narrow, white passage and "
          "<subject> enter<s> the medbay through another small door"),
      new Exit("Explore: CorridorLeftNextToAirlock", "exit to Corridor Left",
          "<subject> walk<s> out of the room into Corridor Left")
    ],
        descriptionPage: "StaffRoom.description",
        coordinates: [-5, -15, 0],
        items: [banana],
        actions: [
      new Action.Goto("look for food", "StaffRoom.findFood", onlyOnce: true)
    ]);
  }

  Item banana;

  void setupCorridorLeftNextToAirlock() {
    infoFlyer = new Item(zil, "info flyer",
        takeDescription: "<subject> take<s> <object>, fold<s> <objectPronoun> "
        "and put<s> <objectPronoun> in a pocket", actions: [
      new Action("look at info flyer", () {
        echo("You pull the flyer out of your pocket and unfold it. "
            "\n\n[IMG]\n\nThen you fold it again and put " "it back.");
      }, needsToBeCarried: true, submenu: INVENTORY)
    ], isActive: false);

    // TODO repair door (search corridorLeftDoorRepaired)
    // TODO: map for visitors: takeable, shown after LeftAirlock.Look

    // ROOM
    new Room(zil, "Explore: CorridorLeftNextToAirlock", "Corridor Left", [
      new Exit("Explore: CorridorLeftNextToCaptainsCabin",
          "walk towards the bridge",
          "<subject> walk<s> towards the bridge up to the point where there "
          "is the door to the captain's cabin on the left hand side"),
      new Exit("Explore: StaffRoom", "enter the staff room",
          "<subject> enter<s> the staff room"),
      new Exit("Explore: CorridorLeftNextToBunks",
          "walk {toward the cargo bay|to the {aft|back} of the ship}",
          "<subject> arrive<s> at the door to the sleeping quarters")
    ],
        descriptionPage: "CorridorLeftNextToAirlock.description",
        coordinates: [-10, -15, 0],
        items: [infoFlyer],
        actions: [
      new Action.Goto("examine the airlock", "LeftAirlock.Look", onlyOnce: true)
    ]);
  }

  Item infoFlyer;

  void setupCaptainsCabin() {
    // ITEMS
    captainsGun = new Item(zil, "captain's gun", actions: [
      new Action("check the gun", () => storyline.add(
              "You pull the gun out of your pocket and heft "
              "it in your hand. It's heavy, well-built and seems in fine "
              "condition. It is loaded."),
          needsToBeCarried: true, onlyOnce: true, submenu: INVENTORY),
      new Action("shoot the Gorilla", () {
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
        takeDescription: "<subject> lift<s> the <object> and put<s> it in the " "pocket",
        isActive: false);
    gorillaCorpse =
        new Item(zil, "Gorilla's body", takeable: true, isActive: false);

    // ACTIONS
    firstLookAround = new Action.Goto(
        "have a look around [~15 minutes]", "CaptainsCabinLookAround",
        onlyOnce: true);
    secondLookAround = new Action.Goto("continue with the search [~15 minutes]",
        "CaptainsCabinLookAroundContinue", onlyOnce: true, isActive: false);
    thirdLookAround = new Action.Goto(
        "search the rest of the room [~5 minutes]",
        "CaptainsCabinLookAroundTheRest", onlyOnce: true, isActive: false);
    captainsComputerFirst = new Action.Goto(
        "look at captain's computer screen", "CaptainsComputerFirst",
        onlyOnce: true);

    // ROOM
    new Room(zil, "Explore: CaptainsCabin", "captain's cabin", [
      new Exit("Explore: CorridorLeftNextToCaptainsCabin", "exit the room",
          "<subject> leave<s> into the corridor")
    ],
        descriptionPage: "CaptainsCabin.description",
        coordinates: [-10, -10, 0],
        items: [captainsGun],
        actions: [
      firstLookAround,
      secondLookAround,
      thirdLookAround,
      captainsComputerFirst
    ]);
  }

  Item captainsGun;
  Item gorillaCorpse;
  Action firstLookAround;
  Action secondLookAround;
  Action thirdLookAround;
  Action captainsComputerFirst;

  void setupCorridorLeftNextToCaptainsCabin() {
    new Room(zil, "Explore: CorridorLeftNextToCaptainsCabin", "Corridor Left", [
      new Exit("Explore: Bridge", "walk to the bridge",
          "<subject> {enter<s>|arrive<s> at} the bridge"),
      new Exit("Explore: CaptainsCabin", "enter Captain's cabin",
          "<subject> open<s> the door to the Captain's cabin and " "enter<s>"),
      new Exit("Explore: CorridorLeftNextToAirlock",
          "walk {toward the cargo bay|to the {aft|back} of the ship}",
          "<subject> {stride|walk}<s> towards the {{aft|back} of the " "ship|cargo bay}")
    ],
        descriptionPage: "CorridorLeftNextToCaptainsCabin.description",
        coordinates: [-5, -10, 0]);
  }

  void setupBridge() {
    lookAtHullBreachFromBridge = new Action.Goto(
        "put up the hull breach on the screen", "LookAtHullBreachFromBridge",
        isActive: false, onlyOnce: true);
    askBodegaQuestions = new Action.Goto(
        "ask Bodega some questions", "BodegaQuestions: Start",
        requirement: () => scripter.bodegaTopics.length > 0);
    takeANap = new Action.Goto("Take a nap", "Bridge: Nap",
        onlyOnce: true,
        requirement: () => zil.timeline.time < MAX_TIME_BEFORE_NAP);
    waitForJumpToUnity = new Action.Goto(
        "Wait until ready to jump to Unity", "Bridge: WaitForJump",
        onlyOnce: true,
        requirement: () => zil.timeline.time >= MESSENGER_CONTACT_TIME &&
            zil.timeline.time < MAX_TIME_BEFORE_HYPERDRIVE_READY &&
            !scripter.jumpedToUnity);
    jumpToSpaceStationUnity = new Action.Goto(
        "initiate the jump to Space Station Unity", "Unity: Jump",
        isActive: false, requirement: () => !scripter.jumpedToUnity);

    // ROOM
    bridge = new Room(zil, "Explore: Bridge", // corresponds to pagename
        "the bridge", [
      new Exit("Explore: Nose",
          "use the utility corridor to the nose of the ship",
          "<subject> squeeze<s> into the narrow space below the main " "'window'"),
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
      if (scripter.justArrivedAtUnity) {
        goto("Unity: Arrival");
        return false;
      }
      return true;
    });
  }

  Room bridge;
  Action lookAtHullBreachFromBridge;
  Action askBodegaQuestions;
  Action takeANap;
  Action waitForJumpToUnity;
  Action jumpToSpaceStationUnity;

  void setupNose() {
    // ACTIONS
    scannerLook = new Action.Goto(
        "Take a look at the scanner", "Nose.ScannerLook", onlyOnce: true);
    scannerRepair = new Action.Goto(
        "Repair the scanner [~1 hour]", "Nose.ScannerRepair",
        isActive: false, onlyOnce: true);
    // TODO: laser upgrade
    // TODO: floodlights repair

    // ROOM
    new Room(zil, "Explore: Nose", "nose of the ship", [
      new Exit("Explore: Bridge", "crawl back to the bridge",
          "<subject> crawl<s> out of the nose hatchway onto the bridge")
    ],
        descriptionPage: "Nose.description",
        coordinates: [0, 5, 0],
        actions: [scannerLook, scannerRepair]);
  }

  Action scannerLook;
  Action scannerRepair;

  AIActor gorilla;

  // Pointers to EgbScripter objects and functions.
  final Zil zil;
  final GotoFunction goto;
  final EchoFunction echo;
  final ChoiceFunction choice;
  final ShowFormFunction showForm;
  final ScripterImpl scripter;
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
    if (index > 4) return; // Only report sleepiness before the 'nap'.
    echo("""You are feeling ${tirednessStrings[index]}.""");
  }

  // Returns "John", or "captain" (even for "acting captain").
  String getInformalSalutation() {
    if (scripter.title == "") {
      return scripter.name;
    } else {
      return "captain";
    }
  }

  /// Returns machinist, medic or spaceman.
  String getInformalRole(String article) {
    var str;
    if (scripter.isEngineer) str = "machinist";
    if (scripter.isMedic) str = "medic";
    if (scripter.isSpaceman) str = "{spaceman|sailor}";
    return Randomly.parse("$article $str");
  }

  num computeProductivity(bool skilled) {
    num productivity = 1.0;
    if (scripter.currentlyHighOnShabu) {
      productivity += 0.3;
    }
    if (skilled) {
      productivity += 0.3;
    }
    return productivity;
  }

  int computeTimeRequired(int baseTime, bool skilled) {
    return (baseTime / computeProductivity(skilled)).round();
  }

  void createTraitsForm() {
    Form traitsForm = new Form();
    traitsForm.submitText = ">>";

    RangeOutput pointsLeft = new RangeOutput("Trait points left",
        max: MAX_TRAIT_POINTS, value: MAX_TRAIT_POINTS);

    // Temporarily disables inputs if needed.
    Set<CheckboxInput> inputsDisabledTemporarily = new Set<CheckboxInput>();
    void updateTraitPoints(bool checked) {
      pointsLeft.current += checked ? -1 : 1;
      if (pointsLeft.current == 0) {
        // Disallow checking any more traits.
        for (FormElement el in traitsForm.formElementChildren) {
          if (el is CheckboxInput && el.current == false) {
            el.disabled = true;
            inputsDisabledTemporarily.add(el);
          }
        }
      } else {
        // Allow again.
        for (CheckboxInput el in inputsDisabledTemporarily) {
          assert(el.disabled);
          el.disabled = false;
        }
        inputsDisabledTemporarily.clear();
      }
    }

    CheckboxInput isHawkeyedInput = new CheckboxInput(
        "You have good eyesight and spotting abilities", (bool value) {
      scripter.isHawkeyed = value;
      updateTraitPoints(value);
    });
    CheckboxInput isStrongInput = new CheckboxInput(
        "You are physically strong, a good fighter", (bool value) {
      scripter.isStrong = value;
      updateTraitPoints(value);
    });
    CheckboxInput knowsJapaneseInput = new CheckboxInput(
        "You can speak basic Japanese", (bool value) {
      scripter.knowsJapanese = value;
      updateTraitPoints(value);
    });
    CheckboxInput understandsAnimalsInput = new CheckboxInput(
        "You are good with animals", (bool value) {
      scripter.understandsAnimals = value;
      updateTraitPoints(value);
    });
    CheckboxInput understandsAIInput = new CheckboxInput(
        "You have received a psychology training on artificial intelligence",
        (bool value) {
      scripter.understandsAI = value;
      updateTraitPoints(value);
    });
    CheckboxInput understandsElectronicsInput = new CheckboxInput(
        "You understand electronics well and you are proficient in using and "
        "repairing them", (bool value) {
      scripter.understandsElectronics = value;
      updateTraitPoints(value);
    });
    CheckboxInput hasScienceEducationInput = new CheckboxInput(
        "You have science education", (bool value) {
      scripter.hasScienceEducation = value;
      updateTraitPoints(value);
    });
    CheckboxInput isHandyInput = new CheckboxInput(
        "You know your way around a spaceship", (bool value) {
      scripter.isHandy = value;
      updateTraitPoints(value);
    });

    if (scripter.isEngineer) {
      understandsElectronicsInput
        ..current = true
        ..disabled = true;
    }
    if (scripter.isMedic) {
      hasScienceEducationInput
        ..current = true
        ..disabled = true;
    }
    if (scripter.isSpaceman) {
      isHandyInput
        ..current = true
        ..disabled = true;
    }

    traitsForm
      ..append(pointsLeft)
      ..append(isHawkeyedInput)
      ..append(isStrongInput)
      ..append(knowsJapaneseInput)
      ..append(understandsAnimalsInput)
      ..append(understandsAIInput)
      ..append(understandsElectronicsInput)
      ..append(hasScienceEducationInput)
      ..append(isHandyInput);

    traitsForm.onSubmit = () {
      scripter.pointsToDistribute = pointsLeft.current;
    };

    showForm(traitsForm);
  }

  void echoTraits() {
    var assets = new Queue<String>();

    if (scripter.isHawkeyed) assets.add("good eyesight");
    if (scripter.isStrong) assets.add("a strong hand");
    if (scripter.knowsJapanese) assets.add("an ability to speak Japanese");
    if (scripter.understandsAnimals) assets
        .add("reasonable animal handling skills");
    if (scripter.understandsAI) assets.add("some AI training");

    if (scripter.understandsElectronics && !scripter.isEngineer) {
      assets.add("decent understanding of electronics");
    }
    if (scripter.hasScienceEducation && !scripter.isMedic) {
      assets.add("good science education");
    }
    if (scripter.isHandy && !scripter.isSpaceman) {
      assets.add("general space savvy");
    }

    var buf = new StringBuffer("You're not the fastest, smoothest or most "
        "experienced of the old crew, but you're a decent "
        "${getInformalRole('')}");

    if (assets.isNotEmpty) {
      buf.write(" with ");

      buf.write(assets.removeFirst());

      while (assets.isNotEmpty) {
        buf.write(assets.length > 1 ? ", " : " and ");
        buf.write(assets.removeFirst());
      }
    }

    buf.write(". ");
    buf.write("You've survived this far. There _must_ be a reason you're not "
        "dead already.");
    echo(buf.toString());
  }

  /// Allows easy creation of choices that let player exert [physicalPoints] or
  /// [mentalPoints] in exchange for some kind of advantage (faster action,
  /// more information, etc.).
  void createExtraEffortChoiceList(String normalChoiceString,
      Function normalOutcome, String extraEffortChoiceString, int physicalCost,
      int mentalCost, Function extraEffortOutcome) {
    choice(normalChoiceString, script: () {
      normalOutcome();
    });

    StringBuffer choiceString = new StringBuffer();
    choiceString.write(extraEffortChoiceString);

    if (physicalCost > 0) {
      choiceString.write(" [-${physicalCost} P]");
      if (physicalCost > scripter.physicalPoints.value) {
        choiceString.write(" [DISABLED]"); // TODO: actually disable!
      }
    }
    if (mentalCost > 0) {
      choiceString.write(" [-${mentalCost} M]");
      if (mentalCost > scripter.mentalPoints.value) {
        choiceString.write(" [DISABLED]"); // TODO: actually disable!
      }
    }

    choice(choiceString.toString(), script: () {
      scripter.physicalPoints.value -= physicalCost;
      scripter.mentalPoints.value -= mentalCost;
      extraEffortOutcome();
    });
  }
}

/// A strongly typed container of all the saveable variables defined in Bodega.
class Vars {
  Vars(this.vars);
  final Map<String, Object> vars;

  PointsCounter get points => vars["points"];

  // Stats
  Stat get physicalPoints => vars["physicalPoints"];
  Stat get mentalPoints => vars["mentalPoints"];

  Stat get clock => vars["clock"];
  String get title => vars["title"];
  String get name => vars["name"];
  List<String> get bodegaTopics => vars["bodegaTopics"];
  bool get jumpedToUnity => vars["jumpedToUnity"];

  bool get isEngineer => vars["isEngineer"];
  bool get isMedic => vars["isMedic"];
  bool get isSpaceman => vars["isSpaceman"];

  // Read & Write
  int get pointsToDistribute => vars["pointsToDistribute"];
  set pointsToDistribute(int value) {
    vars["pointsToDistribute"] = value;
  }

  // Traits
  bool get isHawkeyed => vars["isHawkeyed"];
  set isHawkeyed(bool value) {
    vars["isHawkeyed"] = value;
  }
  bool get isStrong => vars["isStrong"];
  set isStrong(bool value) {
    vars["isStrong"] = value;
  }
  bool get knowsJapanese => vars["knowsJapanese"];
  set knowsJapanese(bool value) {
    vars["knowsJapanese"] = value;
  }
  bool get understandsAnimals => vars["understandsAnimals"];
  set understandsAnimals(bool value) {
    vars["understandsAnimals"] = value;
  }
  bool get understandsAI => vars["understandsAI"];
  set understandsAI(bool value) {
    vars["understandsAI"] = value;
  }
  bool get hasScienceEducation => vars["hasScienceEducation"];
  set hasScienceEducation(bool value) {
    vars["hasScienceEducation"] = value;
  }
  bool get understandsElectronics => vars["understandsElectronics"];
  set understandsElectronics(bool value) {
    vars["understandsElectronics"] = value;
  }
  bool get isHandy => vars["isHandy"];
  set isHandy(bool value) {
    vars["isHandy"] = value;
  }

  // Rest
  String get roomBeforeOvercameBySleepiness =>
      vars["roomBeforeOvercameBySleepiness"];
  set roomBeforeOvercameBySleepiness(String value) {
    vars["roomBeforeOvercameBySleepiness"] = value;
  }
  bool get stoleOfficersBanana => vars["stoleOfficersBanana"];
  set stoleOfficersBanana(bool value) {
    vars["stoleOfficersBanana"] = value;
  }
  bool get currentlyHighOnShabu => vars["currentlyHighOnShabu"];
  set currentlyHighOnShabu(bool value) {
    vars["currentlyHighOnShabu"] = value;
  }
  int get gorillaAttitude => vars["gorillaAttitude"];
  set gorillaAttitude(int value) {
    vars["gorillaAttitude"] = value;
  }
  bool get justArrivedAtUnity => vars["justArrivedAtUnity"];
  set justArrivedAtUnity(bool value) {
    vars["justArrivedAtUnity"] = value;
  }
  bool get currentlyInJump => vars["currentlyInJump"];
  set currentlyInJump(bool value) {
    vars["currentlyInJump"] = value;
  }
}

const String INVENTORY = "···"; // Middle dots.

const int MAX_TRAIT_POINTS = 3;
const int MAX_TIME_BEFORE_NAP = 96;
const int MESSENGER_CONTACT_TIME = 460;
const int MAX_TIME_BEFORE_HYPERDRIVE_READY = 473;

const int JUMP_TIME_TO_UNITY = 60;

// Printing how tired the player is.
const List tirednessStrings = const [
  "quite tired",
  "really tired",
  "extremely tired",
  "exhausted",
  "absolutely exhausted"
];
