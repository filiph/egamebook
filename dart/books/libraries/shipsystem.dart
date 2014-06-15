part of spaceship;

class ShipSystem extends Actor /* TODO: implements Saveable*/ {
  ShipSystem(this.name, {int maxHp: 10, NumScale hp, num maxPowerInput: 1.0}) {
    if (hp == null) hp = new NumScale(max: maxHp);
    this.hp = hp;
    hp.onMax().listen((_) {
      reportFullRepair();
    });
    hp.onMin().listen((_) {
      reportDestroy();
      onDestroy();
    });
    hp.changesStream.listen((num change) {
      if (change < 0 && hp.isNonZero) {
        reportDamage(change.abs());
      }
    });
    
    powerInput = new NumScale(max: maxPowerInput);
  }

  String name;
  /// Which spaceship is this system part of.
  Spaceship spaceship;
  
  NumScale hp;
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
    if (this is Hull) return 1;
    if (!isOutsideHull) {
      return 0;
    } else {
      return hp.max / spaceship.hull.hp.max;
    }
  }
  
  void reportFullRepair() => _report(stringFullRepair, positive: true);
  String stringFullRepair = "<owner's> <subject> <is> now {{fully|} repaired|fully operational}";
  
  void reportDestroy() => _report(stringDestroy, negative: true);
  String stringDestroy = "<owner's> <subject> {blow<s> {up|apart}|"
      "<is> {destroyed|no more}}";
  void onDestroy() {}
  
  void reportDamage(num damage) {
    num percentage = damage / hp.range;
    if (percentage >= 0.7) {
      _report("<owner's> <subject> {get<s>|<is>} {almost|nearly} "
          "{destroyed|shattered}", negative: true);
      return;
    } 
    
    if (percentage >= 0.5) {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{heavy|substantial|considerable|devastating} damage", 
          negative: true);
    } else if (percentage >= 0.3) {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{quite a|hefty|quite heavy} damage", 
          negative: true);
    } else if (percentage >= 0.05) {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{some|minor|slight} damage", 
          negative: true);
    } else {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{{only|merely} {a dent|negligible damage}|"
          "{almost|nearly|practically|close to} no damage}", 
          negative: false /* because it's not really a big deal */);
    }
    
    if (hp.percentage < 0.2 && !_reportedAlmostCompletelyDestroyed) {
      _report("<owner's> <subject> <is> {now|} "
          "{almost {completely|}|nearly|close to} "
          "{destroyed|shattered|finished}", negative: true);
      _reportedAlmostCompletelyDestroyed = true;
    }
  }
  bool _reportedAlmostCompletelyDestroyed = false;  // Only report once.
  
  void _report(String str, {bool negative: false, bool positive: false}) {
    storyline.add(str, subject: this, owner: spaceship, negative: negative, 
        positive: positive, time: spaceship.currentCombat.timeline.time);
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
    
    Map<CombatMove,SubmitButton> allMoveSubmitButtons = 
        <CombatMove,SubmitButton>{};
        
    Spaceship targetShip;
    ShipSystem targetSystem;
    
    // Helper method that adds probability to action buttons.
    void recalculateProbabilities() {
      if (this is Targettable) {
        allMoveSubmitButtons.forEach((move, button) {
          num chance = move.calculateSuccessChance(targetShip: targetShip,
                                                   targetSystem: targetSystem);
          String probability = Randomly.humanStringifyProbability(chance, 
              precisionSteps: 2);
          button.name = "${move.commandText} [$probability]";
        });
      }
    }
    
    if (this is Targettable) {
      targetShip = (this as Targettable).targetShip;
      targetSystem = (this as Targettable).targetSystem;
      
      MultipleChoiceInput targetShipInput = 
          new MultipleChoiceInput("Target ship:", (_) {});
      
      // We need those to show them after the ship inputs.
      Set<MultipleChoiceInput> allTargetSystemInputs = 
          new Set<MultipleChoiceInput>();
      
      Option noTargetShip = new Option("None (off)", (_) {
        targetShip = null;
        allMoveSubmitButtons.forEach((_, SubmitButton b) => b.disabled = true);
        allTargetSystemInputs.forEach((i) => i.hidden = true);
        recalculateProbabilities();
      }, selected: targetShip == null);
      targetShipInput.append(noTargetShip);
      
      Iterable<Spaceship> enemySpaceships = 
          spaceship.currentCombat.spaceships
          .where((Spaceship other) => spaceship.isEnemyOf(other));
      
      enemySpaceships.forEach((Spaceship enemy) {
        MultipleChoiceInput targetSystemInput =
                  new MultipleChoiceInput("Target system:", (_) {})
        ..hidden = targetShip != enemy;
        allTargetSystemInputs.add(targetSystemInput);
        
        Option noTargetSystem = new Option("Whole ship", (_) {
          targetSystem = enemy.hull;
          recalculateProbabilities();
        }, selected: targetSystem == null || targetSystem == enemy.hull);
        targetSystemInput.append(noTargetSystem);
        
        // Create option for each targettable system of the enemy ship.
        enemy.allTargettableSystems.forEach((ShipSystem enemyShipSystem) {
          Option systemOption = new Option(enemyShipSystem.name, (_) {
            targetSystem = enemyShipSystem;
            recalculateProbabilities();
          }, selected: targetSystem == enemyShipSystem);
          targetSystemInput.append(systemOption);
        });
        
        Option shipOption = new Option(enemy.name, (_) {
          targetShip = enemy;
          allMoveSubmitButtons.forEach((_, SubmitButton b) => 
              b.disabled = false);
          allTargetSystemInputs.forEach((i) => i.hidden = true);
          targetSystemInput.hidden = false;
          recalculateProbabilities();
        }, selected: targetShip == enemy);
        targetShipInput.append(shipOption);
      });
      section.append(targetShipInput);
      allTargetSystemInputs.forEach((MultipleChoiceInput input) {
        section.append(input);
      });
    }
    
    availableMoves.forEach((CombatMove move) {
      SubmitButton button = new SubmitButton(
          "${move.commandText}", // TODO: add probability range
          () {
            if (targetShip != null && targetSystem == null) {
              targetSystem = targetShip.hull;
            }
            move.targetShip = targetShip;
            move.targetSystem = targetSystem;
            if (this is Targettable) {
              (this as Targettable).targetShip = targetShip;
              (this as Targettable).targetSystem = targetSystem;
            }
            move.currentTimeToSetup = move.timeToSetup;
            currentMove = move;
            move.start();
            spaceship.pilot.timeToNextInteraction = 
                move.timeToSetup + move.timeToFinish;
      });
      button.disabled = targetShip == null;
      allMoveSubmitButtons[move] = button;
      section.append(button);
    });
    recalculateProbabilities();
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
  
  bool isOutsideHull = true;
  
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
  
  bool isOutsideHull = false;  // Hull is not, technically, _outside_ hull.
  
  @override
  FormSection createSetupSection() => null;  // Hull is not setup-able.
  
  @override
  String stringDestroy = null;  // When hull is destroyed, so is the ship.
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
  SpecialSystems(String name, {int maxHp: 2, NumScale hp, maxPowerInput: 1.0}) 
    : super(name, maxHp: maxHp, hp: hp, 
        maxPowerInput: maxPowerInput);
    
  bool isOutsideHull = false;
}

