import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'shipfight.dart';

void main() {
  var ship1 = new Ship(
        "Bodega",
        hull: new Hull(maxHp: 100),
        shield: new Shield(maxHp: 20, powerInput: 2.0),
        engine: new Engine(maxHp: 10, maxPowerOutput: 10.0),
        thrusters: [
            new Thruster("Main Jet", maxHp: 5, powerInput: 5.0,
                        maxForwardlyForce: 100),
            new Thruster("Left Side Thrusters", maxHp: 1, powerInput: 1.0,
                        maxManeuverability: 5),
            new Thruster("Right Side Thrusters", maxHp: 1, powerInput: 1.0,
                        maxManeuverability: 5)            
          ],
        weapons: [
            new Weapon("Front Utility Laser")
          ]
        );
  
}