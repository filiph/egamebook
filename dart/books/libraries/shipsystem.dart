part of spaceship;

class ShipSystem extends Actor /* TODO: implements Saveable*/ {
  ShipSystem(this.name, {int maxHp: 10, IntScale hp, num maxPowerInput: 1.0}) {
    if (hp == null) hp = new IntScale(max: maxHp);
    this.hp = hp;
    hp.onMax().listen((_) {
      reportFullRepair();
    });
    hp.onMin().listen((_) {
      reportDestroy();
      onDestroy();
    });
    hp.onDownwardsChangeBy(0.5).listen((_) {
      reportMajorDamage();
    });
    
    powerInput = new NumScale(max: maxPowerInput);
  }

  String name;
  /// Which spaceship is this system part of.
  Spaceship spaceship;
  
  IntScale hp;
  NumScale powerInput;
  
  bool isOutsideHull = false;
  
  bool get isAlive => hp.value > 0;
  
  /// List of actions (one per turn) that the player can take with this 
  /// [ShipSystem].
  List<CombatMove> availableMoves = [];
  CombatMove currentMove;
  
  num get weight => hp.max * 1000; 
  
  /// How much of a target this system is on the outside of the craft.
  /// By default, this is proportion of this hp.max to the hull.hp.max.
  num get exposedFactor {
    if (!isOutsideHull) {
      return 0;
    } else {
      return hp.max / spaceship.hull.hp.max;
    }
  }
  
  void reportFullRepair() => _report(stringFullRepair, positive: true);
  String stringFullRepair = "<subject> <is> now {{fully|} repaired|fully operational}";
  
  void reportDestroy() => _report(stringDestroy, negative: true);
  String stringDestroy = "<subject> {blow<s> up|<is> destroyed}";
  void onDestroy() {}
  
  void reportMajorDamage() => _report(stringMajorDamage, negative: true);
  String stringMajorDamage = 
      "<subject> {is damaged heavily|receives major damage}";
  
  void _report(String str, {bool negative: false, bool positive: false}) {
    storyline.add(str, subject: this, negative: negative, positive: positive);
  }
  
  void update() {
    if (currentMove != null) {
      currentMove.update();
      if (currentMove.currentTimeToFinish == 0) {
        if (currentMove.autoRepeat) {
          currentMove.currentTimeToFinish = currentMove.timeToFinish;
        } else {
          currentMove = null;
        }
      }
    }
  }
  
  /// Create the [Form] section in which the player can refine setup for the
  /// particular [ShipSystem]. For example, player can setup the engine to
  /// redistribute energy in a non-default way, or they can setup a weapon
  /// to target another ship.
  /// 
  /// Returns [:null:] when no section is required for the system.
  FormSection createSetupSection() {
    FormSection section = new FormSection(name);
    TextOutput text = new TextOutput();
    text.current = "This is $name section.";  // TODO: Status + description.
    section.append(text);
    
    List<SubmitButton> allSubmitButtons = <SubmitButton>[];
    
    Spaceship targetShip;
    ShipSystem targetSystem;
    if (this is Targettable) {
      targetShip = (this as Targettable).targetShip;
      targetSystem = (this as Targettable).targetSystem;
      
      MultipleChoiceInput targetShipInput = 
          new MultipleChoiceInput("Target ship:", (_) {});
      
      Option none = new Option("None (off)", (_) {
        targetShip = null;
        allSubmitButtons.forEach((SubmitButton b) => b.disabled = true);
      }, selected: targetShip == null);
      targetShipInput.append(none);
      
      Iterable<Spaceship> enemySpaceships = 
          spaceship.currentCombat.spaceships
          .where((Spaceship other) => spaceship.isEnemyOf(other));
      
      enemySpaceships.forEach((Spaceship enemy) {
        Option o = new Option(enemy.name, (_) {
          targetShip = enemy;
          allSubmitButtons.forEach((SubmitButton b) => b.disabled = false);
        }, selected: targetShip == enemy);
        targetShipInput.append(o);
        
        // TODO: add ship systems to anothe multipleChoice, hide them
      });
      section.append(targetShipInput);
      
//        choices.question = 
//            "Which part of ${targetShip.name} do you want to target?";
//        _createChoiceForTargetSystem(targetShip.hull);  // first one is hull
//        targetShip.allSystems.where((system) {
//          if (system is Hull) return false;
//          return system.isOutsideHull;
//        }).forEach((system) {
//          _createChoiceForTargetSystem(system);
//        });
      // TODO: create multiple choice, updating targetShip + targetSystem
    }
    
    availableMoves.forEach((CombatMove move) {
      SubmitButton button = new SubmitButton(
          "${move.commandText} [${move.timeToSetup}s]", // TODO: add probability range
          () {
            move.targetShip = targetShip;
            // TODO: let choose: move.targetSystem = targetSystem;
            move.targetSystem = targetShip.hull;
            move.currentTimeToSetup = move.timeToSetup;
            currentMove = move;
            move.start();
            spaceship.pilot.timeToNextInteraction = move.timeToSetup;
      });
      allSubmitButtons.add(button);
      section.append(button);
    });
    return section;
  }
}

//class Projectile extends Actor {
//  Projectile(name, {this.shieldDamage: 0, this.shieldPenetration: 0.0, 
//                    this.hpDamage: 0, team: null}) 
//      : super(name: name, team: team, isPlayer: false, pronoun: Pronoun.IT) {
//    
//  }
//  
//}

abstract class Targettable extends ShipSystem {
  Spaceship targetShip;
  ShipSystem targetSystem;

  Targettable(String name, {int maxHp: 10, IntScale hp, num maxPowerInput: 1.0}) : 
    super(name, maxHp: maxHp, hp: hp, maxPowerInput: maxPowerInput);
}

class Weapon extends ShipSystem implements Targettable {
  Weapon(String name, {int maxAmmo: 1000, IntScale ammo, maxHp: 1,
                       this.damage: 1.0, this.shieldPenetration: 0.0,
                       this.accuracyModifier: 1.0}) 
      : super(name, maxHp: maxHp) {
    if (ammo == null) ammo = new IntScale(max: maxAmmo);
    ammo.onMin().listen((_) {
      _report("<subject> is out of ammo", negative: true);
    });
        
    var defaultCombatMove = new FireGun(this);
    availableMoves.add(defaultCombatMove);
  }
  
  Spaceship targetShip;
  ShipSystem targetSystem;
  
  IntScale ammo;
  String projectileName = "projectile";
  
  num accuracyModifier = 1.0;
  num shieldPenetration = 0.0;
  num damage = 1;
}

// TODO: laser gun

class Engine extends ShipSystem {
  Engine({String name: "engine", maxHp: 10, this.maxPowerOutput}) 
      : super(name, maxHp: maxHp) {
  }
  
  // TODO: priority list of ship systems for power input 
  
  // TODO: CombatMove: reroute energy
  
  num maxPowerOutput;
  num get powerOutput => (hp.percentage * maxPowerOutput).toInt();
}

class Thruster extends ShipSystem {
  Thruster(String name, {int maxHp: 10, hp, num maxPowerInput: 1.0, 
           this.maxForwardlyForce: 0, this.maxManeuverability: 0}) 
           : super(name, maxHp: maxHp, hp: hp, 
                   maxPowerInput: maxPowerInput);
  
  bool isOutsideHull = true;
  
  /// The amount of force this thruster can bring to the speed of the ship
  /// when on max power input.
  int maxForwardlyForce;
  int get forwardlyForce => (hp.percentage * maxForwardlyForce).toInt();
  
  /// The amount of maneverability this thruster brings for the ship when on
  /// max power input. Each maneuverability point takes one percent from
  /// chance to hit.
  int maxManeuverability;
  int get maneuverability => (hp.percentage * maxManeuverability).toInt();
  
  @override
  FormSection createSetupSection() => null;  // Thrusters are not setup-able.
}

class Hull extends ShipSystem {
  Hull({String name: "hull", maxHp: 10}) 
      : super(name, maxHp: maxHp) {
  }
  
  bool isOutsideHull = true;
  
  @override
  FormSection createSetupSection() => null;  // Hull is not setup-able.
}

class Shield extends ShipSystem {
  Shield({String name: "shields", maxHp: 5, maxSp: 10, NumScale sp, 
          maxPowerInput: 1.0}) 
      : super(name, maxHp: maxHp, maxPowerInput: maxPowerInput) {
    if (sp == null) sp = new NumScale(max: maxSp);
    this.sp = sp;
  }
  
  Pronoun pronoun = Pronoun.THEY;
  num regenerationSpeed;
  
  // TODO: combatmove regenerate
  
  /// Shield Points - like hit points, but for shields. ([Shield]'s [hp] is the
  /// mechanical health of the shield system. The shields can be depleted, but
  /// the system can be still functioning and regenerating.)
  NumScale sp;
}

// TODO: class Bridge - when destroyed, it's finished 

class SpecialSystems extends ShipSystem {
  SpecialSystems(String name, {maxHp: 2, IntScale hp, maxPowerInput: 1.0}) 
    : super(name, maxHp: maxHp, hp: hp, 
        maxPowerInput: maxPowerInput);
    
  bool isOutsideHull = false;
}

