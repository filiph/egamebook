library bodega_shipcombat;

import "../libraries/spaceship.dart";
import '../libraries/storyline.dart';

Pilot playerPilot = new Pilot.player();

class BodegaShip extends Spaceship {
  BodegaShip() : super("Bodega",
      pilot: playerPilot,
      hull: new Hull(maxHp: 50),
      shield: new Shield(maxHp: 0, maxPowerInput: 2.0),
      engine: new Engine(maxHp: 2, maxPowerOutput: 10.0),
      thrusters: [
          new Thruster("main jet", maxHp: 5, maxPowerInput: 5.0,
                      maxForwardlyForce: 100),
          new Thruster("left side thruster", maxHp: 2, maxPowerInput: 1.0,
                      maxManeuverability: 2),
          new Thruster("right side thruster", maxHp: 2, maxPowerInput: 1.0,
                      maxManeuverability: 2)            
        ],
      weapons: [
          new Weapon("front laser", 
              projectile: new Entity.withOptions("laser beam"))
          ..damage = 2
        ]
  );
}

class MessengerShip extends Spaceship {
  MessengerShip() : super("Messenger",
      hull: new Hull(maxHp: 5),
      shield: new Shield(maxHp: 0, maxPowerInput: 1.0),
      engine: new Engine(maxHp: 10, maxPowerOutput: 2.0),
      thrusters: [
                  new Thruster("main jet", maxHp: 2, maxPowerInput: 1.0,
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