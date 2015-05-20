library bodega_shipcombat;

import "../libraries/spaceship.dart";
import '../libraries/storyline.dart';
import '../libraries/spaceshipcombat.dart';

Pilot playerPilot = new Pilot.player();

class BodegaShip extends Spaceship {
  BodegaShip() : super("Bodega",
      pilot: playerPilot,
      hull: new Hull(maxHp: 50),
      shield: new Shield(maxHp: 0, maxPowerInput: 2.0)
              ..isActive = false,
      engine: new Engine(maxHp: 2, maxPowerOutput: 10.0),
      thrusters: [
          new Thruster("main jet", maxHp: 5, maxPowerInput: 5.0,
                      maxManeuverability: 4,
                      maxForwardlyForce: 100),
          new Thruster("left side thruster", maxHp: 2, maxPowerInput: 1.0,
                      maxManeuverability: 2),
          new Thruster("right side thruster", maxHp: 2, maxPowerInput: 1.0,
                      maxManeuverability: 2)
        ],
      weapons: [
          new Weapon("front laser",
              projectile: new Entity.withOptions("laser beam"))
          ..damage = 2,
          new AutoWeapon("defensive turret",
                projectile: new Entity.withOptions("shot"))
        ]) {
    hull.hp.setValueWithoutGeneratingEvents(47);
    turret = weapons[1];
    turret.hp.setValueWithoutGeneratingEvents(0);
  }

  Weapon turret;
}

class MessengerShip extends Spaceship {
  MessengerShip() : super("Messenger",
      hull: new Hull(maxHp: 5),
      shield: new Shield(maxHp: 0, maxPowerInput: 1.0),
      engine: new Engine(maxHp: 10, maxPowerOutput: 2.0),
      thrusters: [
                  new Thruster("main jet", maxHp: 2, maxPowerInput: 1.0,
                      maxManeuverability: 10,
                      maxForwardlyForce: 10),
                  new Thruster("rotation thrusters", maxHp: 1,
                      maxPowerInput: 0.5, maxManeuverability: 10,
                      pronoun: Pronoun.THEY),
                  ],
      weapons: [
                new Weapon("blaster",
                  projectile: new Entity.withOptions("blaster beam")),
                new Weapon("chain gun",
                  projectile: new Entity.withOptions("burst"))
               ]
  );
}

class FirstCombat extends SpaceshipCombat {
  FirstCombat(Spaceship bodega, Spaceship messenger, String onFinishedGoto)
      : super(ships: <Spaceship>[bodega, messenger]) {
    this.bodega = bodega;
    this.messenger = messenger;
    this.onFinishedGoto = onFinishedGoto;

    timeline.schedule(20, () {
        messenger.report("<subject> launch<es> some kind of an object from "
            "<subjectPronoun's> underside",
            object: spybotObject);
        storyline.add("<subject> zip<s> around <object>, but keep<s> "
            "<subject's> distance.", subject: spybotObject, object: bodega,
            wholeSentence: true);
        messengerManagedToLaunchSpyBot = true;
     });

    timeline.schedule(24, () =>
        storyline.add("<owner's> <subject> suddenly plummet<s> "
            "towards <object-owner's> <object>", owner: messenger,
            subject: spybotObject, objectOwner: bodega, object: bodega.hull));

    timeline.schedule(25, () {
        storyline.add("<subject> crash<es> somewhere into <object-owner's> "
            "right side cargo bay",
            subject: spybotObject, objectOwner: bodega, object: bodega.hull);
        storyline.add(""" "Hull breach," the Bodega says. """,
            wholeSentence: true);
        storyline.add("It doesn't seem like it has done any major damage, "
            "though.",
            wholeSentence: true);
        spybotManagedToCrashIntoBodega = true;
    });
  }

  /**
   * Initializes the combat. To be run right before the combat itself.
   */
  void setup() {
    bodega.targetShip = messenger;
    messenger.targetShip = bodega;
  }

  Spaceship bodega;
  Spaceship messenger;

  Entity spybotObject =
      new Entity.withOptions("object", alreadyMentioned: false);

  bool messengerManagedToLaunchSpyBot = false;
  bool spybotManagedToCrashIntoBodega = false;
}