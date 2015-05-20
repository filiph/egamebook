library spaceship;

import 'package:egamebook/scripter.dart';
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
        new ImprovePosition(),
        new RiskyImprovePosition()
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

  Map<Spaceship,int> _positionMap = new Map<Spaceship,int>();
  int getPositionTowards(Spaceship targetShip) {
    if (!_positionMap.containsKey(targetShip)) {
      _positionMap[targetShip] = 0;
    }
    return _positionMap[targetShip];
  }
  void setPositionTowards(Spaceship targetShip, int value) {
    if (value < POSITION_HORRIBLE) value = POSITION_HORRIBLE;
    if (value > POSITION_GREAT) value = POSITION_GREAT;
    _positionMap[targetShip] = value;
  }
  /// Changes relative position to both this ship and [targetShip]. When
  /// [this] gains position, [targetShip] loses, and vice versa.
  void changePositionDifferenceTowards(Spaceship targetShip, int change) {
    // Change for this ship.
    setPositionTowards(targetShip, getPositionTowards(targetShip) + change);
    // Change for the other ship.
    targetShip.setPositionTowards(this,
        targetShip.getPositionTowards(this) - change);
  }

  /// Gets the position towards [targetShip] and returns a human-readable
  /// string. Optionally wrapped in a `<span>` with a corresponding class when
  /// [wrapInColor] is true.
  String getPositionStringTowards(Spaceship targetShip,
                                  {bool wrapInColor: false}) {
    int pos = getPositionTowards(targetShip);

    String wrapInColorSpan(String text, String color) {
      if (!wrapInColor) return text;
      return "<span class=\"$color\">$text</span>";
    }

    switch (pos) {
      case POSITION_HORRIBLE:
        return wrapInColorSpan(POSITION_HORRIBLE_STRING, "green");
      case POSITION_BAD:
        return wrapInColorSpan(POSITION_BAD_STRING, "greenish");
      case POSITION_BALANCED:
        return wrapInColorSpan(POSITION_BALANCED_STRING, "black");
      case POSITION_GOOD:
        return wrapInColorSpan(POSITION_GOOD_STRING, "orange");
      case POSITION_GREAT:
        return wrapInColorSpan(POSITION_GREAT_STRING, "red");
      default:
        throw new StateError("Position $pos is not a valid value.");
    }
  }

  static const int POSITION_HORRIBLE = -2;
  static const int POSITION_BAD = -1;
  static const int POSITION_BALANCED = 0;
  static const int POSITION_GOOD = 1;
  static const int POSITION_GREAT = 2;

  static const String POSITION_HORRIBLE_STRING = "very disadvategeous";
  static const String POSITION_BAD_STRING = "disadvategeous";
  static const String POSITION_BALANCED_STRING = "balanced";
  static const String POSITION_GOOD_STRING = "advategeous";
  static const String POSITION_GREAT_STRING = "very advategeous";

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
    allSystems.where((system) => system.isActive).forEach((system) {
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

    availableMoves.where((move) => move.isActive).forEach((CombatMove proto) {
      // TODO: map from combatmove prototype to instances by cloning. also elsewhere.
      SubmitButton button = new SubmitButton(
          "${Storyline.capitalize(proto.commandText)}",
          () {
            var move = proto.clone(thrusters.first);
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

  // TODO: getGerund() => asked by Storyline if there's too few stuff happening.
  // For example, when there's nothing about player's target during one whole
  // turn, we want to say something like: "The Messenger is continuing with its
  // left turn" or "A single sparkle goes from one of the holes in Messenger's
  // hull."

  /*
   * TODO: saveable only primitives, rest should be remembered by Combat
   */

}

