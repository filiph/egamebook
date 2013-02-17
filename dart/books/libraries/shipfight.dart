library shipfight;

import '../../lib/src/book/scripter.dart';

// TODO: intScale for Hp


class ShipSystem {
  ShipSystem(this.name, 
      {this.maxHp: 10, this.hp, 
       this.powerInput: 1.0, this.isOutsideHull: false}) {
    if (hp == null) hp = maxHp;
    
    if (!isOutsideHull) {
      exposedFactor = 0;
    } else {
      exposedFactor = maxHp;
    }
  }
  
  String name;
  int hp;
  int maxHp;
  num powerInput;
  bool isOutsideHull;
  
  num get weight => maxHp * 1000; 
  
  /// How much of a target this system is on the outside of the craft.
  /// By default, this is proportional to maxHp.
  num exposedFactor;
}

class Weapon extends ShipSystem implements Saveable {
  int timeToFire;
  int reloadTime;
  int maxReloadTime;
  
  int ammo;
  int maxAmmo;
  
  int shieldDamage;
  num shieldPenetration;
  int hpDamage;
}

class Engine implements Saveable {
  int hp;
  int maxHp;
  int get powerOutput => (hp / maxHp * maxPowerOutput).toInt();
  int maxPowerOutput;
}

class Thruster extends ShipSystem implements Saveable {
  Thruster(String name, {maxHp: 10, hp, powerInput: 1.0, 
           isOutsideHull: true, 
           this.maxForwardlyForce: 0, this.maxManeuverability: 0}) 
           : super(name, maxHp: maxHp, hp: hp, 
                   powerInput: powerInput, 
                   isOutsideHull: isOutsideHull);
  
  
  /// The amount of force this thruster can bring to the speed of the ship
  /// when on max power input.
  int maxForwardlyForce;
  int get forwardlyForce => (hp / maxHp * maxForwardlyForce).toInt();
  /// The amount of maneverability this thruster brings for the ship when on
  /// max power input.
  int maxManeuverability;
  int get maneuverability => (hp / maxHp * maxManeuverability).toInt();
}

class Hull implements Saveable {
  int hp;
  int maxHp;
}

class Shield implements Saveable {
  int hp;
  int maxHp;
  
  num powerConsumption;
  int regenerationSpeed;
}

class SpecialSystems extends ShipSystem implements Saveable {
  SpecialSystems(String name, {maxHp: 10, hp, powerInput: 1.0, 
    isOutsideHull: false}) 
    : super(name, maxHp: maxHp, hp: hp, 
        powerInput: powerInput, 
        isOutsideHull: isOutsideHull);
  
}

class Ship implements Saveable {
  String name;
  
  Shield shield;
  Engine engine;
  
  List<Thruster> thrusters;
  List<Weapon> weapons;
  
  /// Life support, mining equipment, ...
  List<SpecialSystems> systems;
  
  Map<String,dynamic> vars;
}