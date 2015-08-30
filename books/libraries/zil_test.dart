import 'package:unittest/unittest.dart';
import 'package:egamebook/scripter.dart';
import 'zil.dart';
import 'storyline.dart';

void main() {
  group("whole setup", () {
    Zil zil;
    Item captainsGun;
    Room bridge, leftCorridor;
    AIActor gorilla;

    setUp(() {
      isInInitOrDeclareBlock = true;
      zil = new Zil(null);
      // Init
      captainsGun = new Item(zil, "captain's gun", actions: [
        new Action("check the gun", () => echo("You check the gun. It's okay."),
            roomCheck: (room) => room.lit,
            performerCheck: (actor) => actor.isHuman,
            //targetActorCheck: (targetCandidate) => true,
            //targetItemCheck: (targetCandidate) => true,
            itemCheck: (item) => item.isActive,
            needsToBeCarried: true,
            submenu: "...")
      ], takeable: true, count: 1 // can be >1 for things like bullets
          );
      gorilla = new AIActor(zil, "Gorilla",
          nameIsProperNoun: true, pronoun: Pronoun.HE);
      bridge = new Room(zil, "Exploration.Bridge", // corresponds to pagename
          "the bridge", [
        new Exit("LeftCorridor", "go to Corridor Left",
            "<subject> go<es> through the sliding door into Corridor Left"),
        new Exit("Hatchway", "squeeze through the hatchway",
            "<sbuject> squeeze<s> through the hatchway onto the bridge",
            requirement: (actor) => zil.player.isAlive)
      ],
          //onEnter: () { /* Room function (on enter?) */ echo },
          //globalBitsOverride: {hearablePA: true, loudEnviron: false},
          coordinates: [0, 0, 0], items: [captainsGun], actors: [gorilla]);
      leftCorridor = new Room(zil, "LeftCorridor", "Left Corridor", [
        new Exit("Exploration.Bridge", "walk to the bridge",
            "<subject> walk<s> to the bridge")
      ], coordinates: [1, 1, 0]);
      new Room(zil, "Hatchway", "the hatchway", []);

      isInInitOrDeclareBlock = false;
    });

    test("AI actors move", () {
      isInInitOrDeclareBlock = true;
      gorilla.currentGoal = new ArbitrarySetOfGoals(gorilla, [
        new TestPickUpAndComment(gorilla, captainsGun),
        new GoToRoom(gorilla, leftCorridor, zil.rooms),
        new GoToRoom(gorilla, bridge, zil.rooms),
        new Say(gorilla, "Hi again!")
      ]);
      isInInitOrDeclareBlock = false;

      zil.player.setLocationFromCurrentPage("Exploration.Bridge");
      zil.update(10);

      // Needed in debug only.
      print(textBuffer.toString());
      expect(textBuffer.toString(), contains(
          r'''says: "I'm gonna pick this captain's gun up." He picks up '''
          r'''the captain's gun. He says: "Great!" He leaves towards Left '''
          r'''Corridor. He arrives from Left Corridor. He says: "Hi again!"'''));

      // zil.showChoices();
    });

    test("exit.isActive is saved", () {
      Map save1 = Exit.iterableToMap(bridge.exits);
      bridge.exits.first.isActive = false;
      expect(bridge.exits.first.isActive, false);
      Map save2 = Exit.iterableToMap(bridge.exits);

      Exit.updateIterableFromMap(save1, bridge.exits);
      expect(bridge.exits.first.isActive, true);
      Exit.updateIterableFromMap(save2, bridge.exits);
      expect(bridge.exits.first.isActive, false);
    });
  });

  group("Reporting", () {
    var zil, captainsGun, bridge, leftCorridor;

    setUp(() {
      isInInitOrDeclareBlock = true;
      zil = new Zil(null);
      // Init
      captainsGun = new Item(zil, "captain's gun", actions: [
        new Action("check the gun", () => echo("You check the gun. It's okay."),
            roomCheck: (room) => room.lit,
            performerCheck: (actor) => actor.isHuman,
            //targetActorCheck: (targetCandidate) => true,
            //targetItemCheck: (targetCandidate) => true,
            itemCheck: (item) => item.isActive,
            needsToBeCarried: true,
            submenu: "...")
      ], takeable: true, count: 1 // can be >1 for things like bullets
          );
      bridge = new Room(zil, "Exploration.Bridge", // corresponds to pagename
          "the bridge", [
        new Exit("LeftCorridor", "go to Corridor Left",
            "<subject> go<es> through the sliding door into Corridor Left"),
        new Exit("Hatchway", "squeeze through the hatchway",
            "<sbuject> squeeze<s> through the hatchway onto the bridge",
            requirement: (actor) => zil.player.isAlive)
      ],
          //onEnter: () { /* Room function (on enter?) */ echo },
          //globalBitsOverride: {hearablePA: true, loudEnviron: false},
          coordinates: [0, 0, 0], items: [captainsGun]);
      leftCorridor = new Room(zil, "LeftCorridor", "Left Corridor", [
        new Exit("Exploration.Bridge", "walk to the bridge",
            "<subject> walk<s> to the bridge")
      ], coordinates: [1, 1, 0]);
      new Room(zil, "Hatchway", "the hatchway", []);

      isInInitOrDeclareBlock = false;
    });

    test("whileString", () {});
  });
}
