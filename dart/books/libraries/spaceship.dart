library spaceship;

import 'package:egamebook/src/book/scripter.dart';
import 'numscale.dart';
import 'storyline.dart';
import 'randomly.dart';
import 'spaceshipcombat.dart';

part 'combatmove.dart';
part 'shipsystem.dart';
part 'pilot.dart';

// XXX: When (if!) ready, add ShipBrain to ship (from spaceship_combat), 
//      + thurster configuration, start calling the ship brain on each update.

class Spaceship extends Actor /*TODO: implements Saveable*/ {
  Spaceship(String name, {this.shield, this.engine, this.hull,
             this.thrusters: const [], this.weapons: const[],
             this.systems: const [], this.pilot}) : super(name: name) {
    if (pilot == null) pilot = new Pilot.ai(this);
    pilot.spaceship = this;
    team = pilot.team;
    // Assing this as all of this ship's system's spaceship. 
    allSystems.forEach((system) {
      system.spaceship = this;
      system.team = team;
    });
    if (hull == null) {
      throw new Exception("Spaceship $name's hull cannot be null.");
    }
    hull.hp.onMin().listen((_) => reportDestroy());
  }
  
  /// The combat situation this ship is currently involved in.
  SpaceshipCombat currentCombat;
  
  bool get isAlive => hull.hp.value > 0;
  Pilot pilot;
  
  /// The ship that this spaceship is focused on. Doesn't prevent a weapon 
  /// from targeting a different ship.
  Spaceship targetShip;
  
  final Hull hull;
  final Shield shield;
  final Engine engine;
  
  final List<Thruster> thrusters;
  final List<Weapon> weapons;
  
  /// Life support, mining equipment, hyperdrive ...
  final List<SpecialSystems> systems;
  
  Iterable<ShipSystem> get allTargettableSystems => 
      allSystems.where((ShipSystem system) => system.isOutsideHull);
  
  /// Return the list of all the ship's systems, including engine, weapons, etc.
  Iterable<ShipSystem> get allSystems => 
      <List<ShipSystem>>[weapons, thrusters, systems, [shield, engine, hull]]
      .expand((s) => s).where((system) => system != null);
  
  /// The current combined maneuverability of the ship's thrusters.
  int get maneuverability =>
    thrusters.fold(0, 
        (num prevValue, thruster) => prevValue + thruster.maneuverability)
        .toInt();
  
  void update() {
    allSystems.forEach((system) => system.update());
    pilot.update();
  }
  
  List<CombatMove> getAvailableMoves() {
    List<CombatMove> moves = [];
    allSystems.forEach((system) {
      if (system.currentMove == null) {
        system.availableMoves.forEach((move) {
          if (move.isEligible(targetShip: targetShip)) {
            moves.add(move);
          }
        });
      } else if (system.currentMove.autoRepeat) {
        // add autoRepeating currentMoves so pilot can choose to stop them
        moves.add(system.currentMove);   
      }
    });
    return moves;
  }
  
  /// Returns a list of [FormSection] elements, one for each [ShipSystem] that
  /// can be interacted with during combat.
  List<FormSection> getSystemSetupSections() {
    List<FormSection> sections = <FormSection>[];
    allSystems.forEach((system) {
      FormSection section = system.createSetupSection();
      if (section != null) {
        sections.add(section);
      }
    });
    return sections;
  }
  
  /// This is called by the ship automatically when it's hull is destroyed.
  /// 
  void reportDestroy() {
    storyline.add(stringReportDestroy, subject: this, negative: true,
        time: currentCombat.timeline.time);
  }
  String stringReportDestroy = 
      "<subject> {{violently|} explode<s>|blow<s> {up|apart} {violently|}|"
      "fl<ies> apart in a {bright|powerful|violent} explosion}";
  
  /*
   * TODO: saveable only primitives, rest should be remembered by Combat
   */
}

