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
    
    availableMoves.addAll(<CombatMove>[
        new ImprovePosition(thrusters.first),
        new RiskyImprovePosition(thrusters.first)
    ]);
  }
  
  /// The combat situation this ship is currently involved in.
  SpaceshipCombat currentCombat;
  
  /// List of actions that the player can take with [Spaceship]. These are
  /// ship-level maneuvres, such as "loop" (for improving relative position)
  /// and "hyperdrive jump".
  List<CombatMove> availableMoves = [];
  CombatMove currentMove;
  
  bool get isAlive => hull.hp.value > 0;
  Pilot pilot;
  
  /// The ship that this spaceship is focused on. Doesn't prevent a weapon 
  /// from targeting a different ship.
  Spaceship get targetShip => _targetShip;
  Spaceship _targetShip;
  set targetShip(Spaceship value) {
    weapons.forEach((weapon) {
      weapon.targetShip = value;
      weapon.targetSystem = null;
    });
    _targetShip = value;
  }
  
  final Hull hull;
  final Shield shield;
  final Engine engine;
  
  final List<Thruster> thrusters;
  final List<Weapon> weapons;
  
  /// Life support, mining equipment, hyperdrive ...
  final List<SpecialSystems> systems;
  
  Iterable<ShipSystem> get allTargettableSystems => 
      allSystems.where((ShipSystem system) => system.isOutsideHull &&
                                              system.isAliveAndActive);
  
  /// Return the list of all the ship's systems, including engine, weapons, etc.
  Iterable<ShipSystem> get allSystems => 
      <List<ShipSystem>>[weapons, thrusters, systems, [shield, engine, hull]]
      .expand((s) => s).where((system) => system != null);
  
  /// The current combined maneuverability of the ship's thrusters.
  int get maneuverability =>
    thrusters.fold(0, 
        (num prevValue, thruster) => prevValue + thruster.maneuverability)
        .toInt();
  
  /// This is the linear representation of the positional advantages a ship
  /// has towards other. The only meaningful number is [position] minus
  /// [targetShip.position], which indicates how well the ship is situated in
  /// relation to the [targetShip]. The absolute value of position is 
  /// meaningless.
  /// 
  /// TODO: reset [position] to a meaningful value when targetShip is changed.
  int position = 0;
  
  static const int POSITION_HORRIBLE = -2;
  static const int POSITION_BAD = -1;
  static const int POSITION_BALANCED = 0;
  static const int POSITION_GOOD = 1;
  static const int POSITION_GREAT = 2;
  
  void update() {
    if (currentMove != null) {
      currentMove.update();
      if (currentMove.isFinished) {
        currentMove = null;
      }
    }
    allSystems.where((system) => system.isAliveAndActive)
      .forEach((system) => system.update());
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
  
  /// Creates all-ship maneuvres.
  /// TODO: this is very similar to [ShipSystem.createSetupSection], make DRY
  FormSection getManeuvreSetupSection() {
    FormSection section = new FormSection("Maneuvres");
    TextOutput text = new TextOutput();
    text.current = "This is the maneuvres section.";  // TODO: Status + description.
    section.append(text);
    
    availableMoves.where((move) => move.isActive).forEach((CombatMove move) {
      SubmitButton button = new SubmitButton(
          "${Storyline.capitalize(move.commandText)}",
          () {
            move.targetShip = targetShip;
            move.currentTimeToSetup = move.timeToSetup;
            currentMove = move;
            move.start();
            pilot.timeToNextInteraction = move.timeToSetup + move.timeToFinish;
      });
      button.disabled = targetShip == null;
      section.append(button);
    });
    return section;
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

