part of spaceship;

class ShipSystem extends Actor /* TODO: implements Saveable*/ {
  ShipSystem(this.name, {int maxHp: 10, NumScale hp, num maxPowerInput: 1.0,
      Pronoun pronoun: Pronoun.IT})
      : super(pronoun: pronoun) {
    if (hp == null) hp = new NumScale(max: maxHp);
    this.hp = hp;
    hp.upwardsChangeCallbacks[1.0] = (_) {
      reportFullRepair();
    };
    hp.downwardsChangeCallbacks[0.0] = (_) {
      reportDestroy();
      onDestroy();
    };
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

  // TODO: supercharged (int -> seconds left?)
  // TODO: overheated (int -> seconds left?)

  bool isOutsideHull = false;

  bool get isAlive => hp.value > 0;

  /// The percentage at which a ship system ceases to be operational (but still
  /// isn't destroyed).
  static const num OPERATIONAL_THRESHOLD = 0.2;
  bool get isOperational => hp.percentage > OPERATIONAL_THRESHOLD;

  /// List of actions that the player can take with this
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
  String stringFullRepair =
      "<owner's> <subject> <is> now {{fully|} repaired|fully operational}";

  void reportDestroy() => _report(stringDestroy, negative: true);
  String stringDestroy = "<owner's> <subject> {blow<s> {up|apart}|"
      "<is> {destroyed|no more}}";
  void onDestroy() {}

  void reportDamage(num damage) {
    num percentage = damage / hp.range;

    if (percentage >= 0.5) {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{heavy|substantial|devastating} damage", negative: true);
    } else if (percentage >= 0.3) {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{quite a|hefty|quite heavy} damage", negative: true);
    } else if (percentage >= 0.05) {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{some|minor|slight} damage", negative: true);
    } else {
      _report("<owner's> <subject> {take<s>|receive<s>|sustain<s>} "
          "{{only|merely} {a dent|negligible damage}|"
          "{almost|nearly|practically|close to} no damage}",
          negative: false /* because it's not really a big deal */);
    }
  }

  void _report(String str, {bool negative: false, bool positive: false}) {
    storyline.add(str,
        subject: this,
        owner: spaceship,
        negative: negative,
        positive: positive,
        time: spaceship.currentCombat.timeline.time);
  }

  /// Returns a natural entity for reporting of a [CombatMove] performed
  /// by this system. E.g. if an enemy's system is firing at you, we want
  /// to read that "the enemy is firing at you".
  Entity getReportingSubject() {
    Actor subject;
    if (spaceship.pilot.isPlayer) {
      subject = spaceship.pilot;
    } else {
      subject = spaceship;
    }
    return subject;
  }

  Entity getReportingOwner() {
    Actor owner;
    if (spaceship.pilot.isPlayer) {
      owner = null;
    } else if (spaceship.team == Actor.FRIEND ||
        spaceship.team == Actor.NEUTRAL) {
      owner = spaceship.pilot;
    } else {
      owner = null;
    }
    return owner;
  }

  void update() {
    if (currentMove != null) {
      currentMove.update();
      if (currentMove.isFinished) {
        if (currentMove.isAutoRepeating) {
          print("autorepeat");
          currentMove.reportAutoRepeat();
          currentMove = currentMove.clone(this);
          currentMove.isAutoRepeatContinuation = true;
          currentMove.start();
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
    FormSection section = new FormSection(Storyline.capitalize(name));
    TextOutput text = new TextOutput();
    if (!isOperational) {
      text.current = "${Storyline.capitalize(name)} is not operational.";
      section.append(text);
      return section;
    }

    text.current = "This is $name section."; // TODO: Status + description.
    section.append(text);

    Map<CombatMove, SubmitButton> allMoveSubmitButtons =
        <CombatMove, SubmitButton>{};

    Spaceship targetShip;
    ShipSystem targetSystem;

    // Helper method that adds probability to action buttons.
    void recalculateProbabilities() {
      if (this is CanHaveTarget) {
        allMoveSubmitButtons.forEach((proto, button) {
          num chance =
              proto.calculateSuccessChance(this, targetShip, targetSystem);
          String probability = Randomly.humanDescribeProbability(chance);
          button.name = "${Storyline.capitalize(proto.commandText)} "
              "[$probability]";
        });
        if (targetShip != null) {
          text.current = "Aim at ${targetShip.name} is "
              "${getAimString((this as CanHaveTarget).getAimAt(targetShip))}.";
        } else {
          text.current = "No target.";
        }
      }
    }

    if (this is CanHaveTarget) {
      targetShip = (this as CanHaveTarget).targetShip;
      targetSystem = (this as CanHaveTarget).targetSystem;

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

      Iterable<Spaceship> enemySpaceships = spaceship.currentCombat.spaceships
          .where((Spaceship other) =>
              spaceship.isEnemyOf(other) && other.isAliveAndActive);

      enemySpaceships.forEach((Spaceship enemy) {
        MultipleChoiceInput targetSystemInput = new MultipleChoiceInput(
            "Target system:", (_) {})..hidden = targetShip != enemy;
        allTargetSystemInputs.add(targetSystemInput);

        Option noTargetSystem = new Option("ship", (_) {
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
          allMoveSubmitButtons
              .forEach((_, SubmitButton b) => b.disabled = false);
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

    availableMoves.where((move) => move.isActive).forEach((CombatMove proto) {
      SubmitButton button = new SubmitButton(
          "${Storyline.capitalize(proto.commandText)}", () {
        if (targetShip != null && targetSystem == null) {
          targetSystem = targetShip.hull;
        }
        var move = proto.clone(this);
        move.targetShip = targetShip;
        move.targetSystem = targetSystem;
        if (this is CanHaveTarget) {
          (this as CanHaveTarget).targetShip = targetShip;
          (this as CanHaveTarget).targetSystem = targetSystem;
        }
        currentMove = move;
        move.start();
        spaceship.pilot.timeToNextInteraction =
            move.timeToSetup + move.timeToFinish;
      });
      button.disabled = targetShip == null;
      allMoveSubmitButtons[proto] = button;
      section.append(button);
    });
    recalculateProbabilities();
    return section;
  }
}

class CanHaveTarget extends ShipSystem {
  Spaceship targetShip;
  ShipSystem targetSystem;

  CanHaveTarget(String name, {maxHp: 1, Pronoun pronoun: Pronoun.IT})
      : super(name, maxHp: maxHp, pronoun: pronoun);

  Map<Spaceship, int> _aimMap = new Map<Spaceship, int>();
  int getAimAt(Spaceship targetShip) {
    if (!_aimMap.containsKey(targetShip)) {
      _aimMap[targetShip] = 0;
    }
    return _aimMap[targetShip];
  }
  void setAimAt(Spaceship targetShip, int value) {
    _aimMap[targetShip] = value;
  }
}

class Weapon extends CanHaveTarget {
  Weapon(String name, {int maxAmmo: 1000, IntScale ammo, maxHp: 1,
      this.damage: 1.0, this.shieldPenetration: 0.0, this.accuracyModifier: 1.0,
      Pronoun pronoun: Pronoun.IT, Entity projectile})
      : super(name, maxHp: maxHp, pronoun: pronoun) {
    if (ammo == null) ammo = new IntScale(max: maxAmmo); // TODO: unlimited
    ammo.onMin().listen((_) {
      _report("<subject> is out of ammo", negative: true);
    });
    if (projectile != null) {
      this.projectile = projectile;
    }
    this.projectile.team = team;

    availableMoves.addAll(
        <CombatMove>[new FireGun(), new QuickFireGun(), new ImproveAim()]);
  }

  bool isOutsideHull = true;

  Spaceship targetShip;
  ShipSystem targetSystem;

  IntScale ammo;
  Entity projectile = new Entity.withOptions("projectile");

  /// Some weapons can be more or less precise than average. Their accuracy
  /// can also change in time.
  num accuracyModifier = 1.0;
  /// Some weapons can go through shields. This property says what percentage
  /// of their energy goes through them.
  num shieldPenetration = 0.0;
  num damage = 1;
}

String getAimString(int aim) {
  if (aim <= 0) {
    return "poor";
  } else if (aim == 1) {
    return "decent";
  } else if (aim == 2) {
    return "good";
  } else if (aim == 3) {
    return "great";
  } else /* aim >= 4 */ {
    return "perfect";
  }
}

/// Autonomous weapon system (such as defensive turret).
class AutoWeapon extends Weapon {
  AutoWeapon(String name, {int maxAmmo: 1000, IntScale ammo, maxHp: 1,
      num damage: 1.0, num shieldPenetration: 0.0, num accuracyModifier: 1.0,
      Pronoun pronoun: Pronoun.IT, Entity projectile})
      : super(name,
          ammo: ammo,
          maxHp: maxHp,
          damage: damage,
          shieldPenetration: shieldPenetration,
          accuracyModifier: accuracyModifier,
          pronoun: pronoun,
          projectile: projectile) {

    // Exchange direct weapon moves with autonomous moves.
    availableMoves = <CombatMove>[new AutoGunStart()];
  }
}

//class Aim {
//  Aim(this.value);
//
//  int value;
//  operator +(int i) {
//    return new Aim(value + i);
//  }
//  operator -(int i) {
//    return new Aim(value - i);
//  }
//
//  String toString() {
//    switch (value) {
//      case -2
//    }
//  }
//}

// TODO: laser gun

class Engine extends ShipSystem {
  Engine({String name: "engine", maxHp: 10, this.maxPowerOutput,
      Pronoun pronoun: Pronoun.IT})
      : super(name, maxHp: maxHp, pronoun: pronoun) {}

  // TODO: priority list of ship systems for power input

  // TODO: CombatMove: reroute energy

  num maxPowerOutput;
  num get powerOutput => (hp.percentage * maxPowerOutput).toInt();
}

class Thruster extends ShipSystem {
  Thruster(String name, {int maxHp: 10, hp, num maxPowerInput: 1.0,
      this.maxForwardlyForce: 0, this.maxManeuverability: 0,
      Pronoun pronoun: Pronoun.IT})
      : super(name,
          maxHp: maxHp,
          hp: hp,
          maxPowerInput: maxPowerInput,
          pronoun: pronoun) {
    this.hp.downwardsChangeCallbacks[0.5] = (_) {
      _report("<owner's> <subject> start<s> spewing sparks from its internals",
          negative: true);
      _report("<subject> lose<s> most of <subject's> thrust", negative: true);
    };
    this.hp.downwardsChangeCallbacks[0.2] = (_) {
      _report("<owner's> <subject> <is> {now|} "
          "{almost {completely|}|nearly|close to} "
          "{destroyed|shattered|finished}", negative: true);
    };
  }

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
  FormSection createSetupSection() => null; // Thrusters are not setup-able.
}

class Hull extends ShipSystem {
  Hull({String name: "hull", maxHp: 10}) : super(name, maxHp: maxHp) {
    hp.downwardsChangeCallbacks[0.80] = (_) {
      reportEightyPercentHP();
    };
    hp.downwardsChangeCallbacks[0.60] = (_) {
      reportSixtyPercentHP();
    };
    hp.downwardsChangeCallbacks[0.40] = (_) {
      reportFortyPercentHP();
    };
    hp.downwardsChangeCallbacks[0.20] = (_) {
      reportTwentyPercentHP();
    };
  }

  void reportEightyPercentHP() {
    _report("there are a number of battle-inflicted scars on "
        "<subject's> surface now", negative: true);
  }

  void reportSixtyPercentHP() {
    _report("<owner's> <subject> <is> now torn on many places", negative: true);
  }

  void reportFortyPercentHP() {
    _report("<owner's> <subject> lose<s> <subject's> structural integrity",
        negative: true);
  }

  void reportTwentyPercentHP() {
    _report("<owner's> <subject> <is> now full of gaping holes",
        negative: true);
    _report("<owner's> <subject> <is> {horribly |}deformed", negative: true);
  }

  bool isOutsideHull = false; // Hull is not, technically, _outside_ hull.

  @override
  FormSection createSetupSection() => null; // Hull is not setup-able.

  @override
  String stringDestroy = null; // When hull is destroyed, so is the ship.
}

// TODO: class BigHull extends Hull // with tailored reporting

class Shield extends ShipSystem {
  Shield({String name: "shields", maxHp: 5, maxSp: 10, NumScale sp,
      maxPowerInput: 1.0, Pronoun pronoun: Pronoun.THEY})
      : super(name,
          maxHp: maxHp, maxPowerInput: maxPowerInput, pronoun: pronoun) {
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
  SpecialSystems(String name, {int maxHp: 2, NumScale hp, maxPowerInput: 1.0,
      Pronoun pronoun: Pronoun.IT})
      : super(name,
          maxHp: maxHp, hp: hp, maxPowerInput: maxPowerInput, pronoun: pronoun);

  bool isOutsideHull = false;
}
