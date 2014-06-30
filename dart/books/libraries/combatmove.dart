part of spaceship;

/**
 * [CombatMove] defines a possibility (choice) for the player / AI to perform
 * with a specified system. E.g. fire a gun, redistribute energy from an engine,
 * use the tractor beam. 
 * 
 * The most general characteristics of a move are defined by static variables
 * ([name], [needsTarget]) and methods ([update]). But specific variants of the
 * move (i.e. firing from a concrete gun on a concrete ship) are implemented
 * by creating a new instance and adding it to the [ShipSystem]'s 
 * [availableMoves] list. When a [CombatMove] is started, it is referenced 
 * by the [ShipSystem]'s [currentMove] variable and updated on each turn.
 * 
 * When finished, the CombatMove can either [autoRepeat], or it stops (the
 * [currentMove] variable is set to [:null:]).
 * 
 * Class [CombatMove] can be extended (e.g. by [FireGun] or [RepairSystem])
 * for more readable code.
 */
abstract class CombatMove {
  CombatMove(this.system) {
  }
  
  /// The system that performs this move. Ex.: the laser gun performing this
  /// laser shot.
  final ShipSystem system;
  /// The (optional) target ship.
  Spaceship targetShip;
  /// The (optional) exact target system.
  ShipSystem targetSystem;
  
  /// Whether this move is currently available to the actor. Use this to
  /// hide options from the player and then add them as a form of progression.
  // @saveable
  bool isActive = true; // TODO: saveable!!!?
  
  /// The unique name of this particular type of move.
  static final String name = "undefined move";
  get instanceName => name; // Dart cannot access static member, so we need to copy
  
  /// The text of the choice presented to player.
  String get commandText;  // fire weapon at <object>
  
  /// Only reported for player (TODO: or other people on same ship) when he
  /// starts programming the ship computer to do something.
  void reportSettingUp() {
    var pilot = system.spaceship.pilot;
    if (pilot == null || !pilot.isPlayer) {
      throw new StateError("reportSettingUp should not have been called since "
          "this spaceship's pilot is null or is not player");
    }
    storyline.add(stringSettingUp, subject: pilot, object: system,
        time: system.spaceship.currentCombat.timeline.time);
  }
  String get stringSettingUp => "<subject> start<s> programming the "
                                "${system.name} to $commandText";
  
  /// Reported when the computer/system starts the sequence.
  void reportStarting() => _report(stringStarting); 
  String stringStarting = "<subject> {initiate|start}<s> the $name";
  
  /// Ex.: <subject> <is> firing at <object> 
  // YAGNI?
  //String gerundString;
  
  /// Reported when an already started CombatMove ceases to be eligible to
  /// continue (e.g. targetShip disappears, goes out of range, etc.).
  void reportCannotContinue() => _report(stringCannotContinue);  
  String stringCannotContinue = ""; // <subject> is no longer able to fire at <object>
  
  /// Reported when the move is successfully finished.
  void reportSuccess() => _report(stringSuccess, positive: true);
  String stringSuccess = "<subject> successfully finish<es> $name";
  void onSuccess() {}
  
  /// Reported when the move finished with failure.
  void reportFailure() => _report(stringFailure, negative: true); 
  String stringFailure = "<subject> fail<s> to perform $name";
  void onFailure() {}

  /// Reported when the move is going for another round.
  void reportAutoRepeat() => _report(stringAutoRepeat); 
  String stringAutoRepeat = "";   // <subject> goes for another round of
  
  void reportStop() => _report(stringStop);
  String get stringStop => "<subject> stop<s> to $commandText";
  void stop() {
    reportStop();
    currentTimeToFinish = null;
    currentTimeToSetup = null;
    system.currentMove = null;
  }
  
  void _report(String str, {Entity subject, 
    Entity owner, Entity objectOwner,
    Entity object, bool positive: false, bool but: false,
    bool negative: false}) {
    if (str == null || str == "") return;
    
    if (subject == null) {
      subject = system.getReportingSubject();
    }
    if (owner == null) {
      owner = system.getReportingOwner();
    }
    
    if (object == null) {
      object = getTargetObject(targetShip, targetSystem);
    }
    if (objectOwner == null && object != null) {
      if (object is ShipSystem && object is! Hull) {
        objectOwner = object.spaceship;
      }
    }
    
    if (subject == Entity.NOTHING) subject = null;
    if (owner == Entity.NOTHING) owner = null;
    if (objectOwner == Entity.NOTHING) objectOwner = null;
    if (object == Entity.NOTHING) object = null;
    
    storyline.add(str, subject: subject, owner: owner, object: object,
        objectOwner: objectOwner,
        positive: positive, negative: negative, but: but,
        time: system.spaceship.currentCombat.timeline.time);
  }
  
  static Entity getTargetObject(Entity targetShip, Entity targetSystem) {
    Entity object = targetSystem;
    if (object is Hull) {
      // When failing to hit hull, what we really miss is the ship.
      object = (object as Hull).spaceship;
    }
    if (object == null) {
      object = targetShip;
    }
    if (object is Spaceship && (object as Spaceship).pilot.isPlayer) {
      object = (object as Spaceship).pilot;
    }
    return object;
  }
  
  /// Whether this combat move needs a target ship that is alive.
  final bool needsTargetShip = true;
  /// Whether this combat move needs a target system that is alive.
  final bool needsTargetSystem = true;
  
  /// Whether the move is supposed to automatically renew itself after each
  /// run.
  final bool autoRepeat = false;
  
  /// Is the move currently eligible to be carried out?
  bool isEligible({Spaceship targetShip, ShipSystem targetSystem}) {
    if (needsTargetShip) {
      if (targetShip == null && this.targetShip != null) {
        targetShip = this.targetShip;
      }
      if (targetShip == null || !targetShip.isAliveAndActive) return false;
    }
    if (!needsTargetShip && needsTargetSystem) {
      if (targetSystem == null && this.targetSystem != null) {
        targetSystem = this.targetSystem;
      }
      if (targetSystem == null || !targetSystem.isAliveAndActive) return false;
    }
    if (!isActive) return false;
    if (!system.isAlive) return false;
    if (!system.spaceship.isAliveAndActive) return false;
    return true;
  }
  
  /// Can the move continue?
  bool canContinue() => isEligible();
  
  /// Can be overridden with more involved mathemathics (incl. things like
  /// maneuverability of targetShip, etc.).
  num calculateSuccessChance(Spaceship targetShip, ShipSystem targetSystem) => 
        defaultSuccessChance;
  final num defaultSuccessChance = 1.0;
  
  /**
   * Runs just after the CombatMove gets picked by the player. Can just update
   * some variable, or can create a list of choices.
   */
  void start() {
    currentTimeToSetup = timeToSetup;
    _isFinished = false;
  }
  
  /// The time it takes for a pilot to setup the combat move on the console.
  int timeToSetup;
  int currentTimeToSetup;
  
  /// The time it takes for the combat to finish (e.g. for a laser gun to fire).
  int timeToFinish;
  /// The current countdown to finish (when [onSuccess]/[onFailure] happens).
  int currentTimeToFinish;
  
  bool _isFinished = false;
  bool get isFinished => _isFinished;
  
  /// The timeline from start of performing to finish (e.g. charging to fire).
  // Timeline timeline <-- YAGNI
  
  /**
   * Goes one tick in the lifetime of the CombatMove. Decreases 
   * [currentTimeToSetup] or [currentTimeToFinish], depending on state of the
   * move (setup phase or perform phase).
   */
  void update() {
    if ((currentTimeToSetup != null || currentTimeToFinish != null) &&
        !canContinue()) {
      reportCannotContinue();
      currentTimeToSetup = null;
      currentTimeToFinish = null;
    }
    
    if (currentTimeToSetup != null) {
      if (currentTimeToSetup == timeToSetup && system.spaceship.pilot != null
          && system.spaceship.pilot.isPlayer) {
        // only report setting up for player (TODO: + other people on same ship)
        reportSettingUp();
      }
      --currentTimeToSetup;
      if (currentTimeToSetup <= 0) {
        currentTimeToSetup = null;
        currentTimeToFinish = timeToFinish;
      }
      return;
    }
    
    if (currentTimeToFinish == null) {
      return;
//      throw "update() called on a move whose currentTimeToFinish is set to null";
    }
    if (currentTimeToFinish == timeToFinish) reportStarting();
    // delay if system is underpowered proportionally to the power input
    if (Randomly.saveAgainst(system.powerInput.percentage)) {
      currentTimeToFinish -= 1;
    }
    if (currentTimeToFinish == 0) {
      if (Randomly.saveAgainst(calculateSuccessChance(targetShip, 
                                                      targetSystem))) {
        reportSuccess();
        onSuccess();
      } else {
        reportFailure();
        onFailure();
      }
      if (autoRepeat) {
        reportAutoRepeat();
        currentTimeToFinish = timeToFinish;
      } else {
        _isFinished = true;
        currentTimeToFinish = null;
      }
    }
  }
}

/**
 * Lets player/AI fire at a given [ShipSystem] (hull by default).
 */
class FireGun extends CombatMove {
  FireGun(ShipSystem system) : super(system) {
    // it is safe to assume the [system] is a weapon in this subclass
    weapon = system as Weapon;
  }

  /// Copy of [system], but because this is [FireGun], its safe to cast it
  /// as a weapon
  Weapon weapon;
  
  final bool needsTargetShip = true;
  final bool needsTargetSystem = true;
  
  bool autoRepeat = false;
  
  int timeToSetup = 4;
  int timeToFinish = 3;
  
  static final String name = "fire gun";
  String get commandText => "take a shot";

  @override
  void reportSettingUp() {
    var pilot = system.spaceship.pilot;
    if (pilot == null || !pilot.isPlayer) {
      throw new StateError("reportSettingUp should not have been called since "
          "this spaceship's pilot is null or is not player");
    }
    
    storyline.add("<subject> {grab<s>|take<s>|take<s> hold of} <owner's> "
        "controls", subject: pilot, owner: system, 
        time: system.spaceship.currentCombat.timeline.time);
    storyline.add("<subject> {start<s> "
        "{aiming at|taking aim at|fixing on|zeroing in on}|"
        "begin<s> to {{take |}aim at|fix on|zero in on}} <object>",
        subject: pilot, object: targetShip,
        time: system.spaceship.currentCombat.timeline.time);
  }
  
  String get stringStarting => null; 
//      "<subject's> ${system.name} {begins|starts} "
//                               "charging";
                               
  @override
  String stringSuccess = null;
  
  void onSuccess() {
    Entity owner, subject;
    if (!system.spaceship.pilot.isPlayer) {
      // Override the normal owner and subject - we need to report the enemy AI
      // ship's weapon involved.
      owner = weapon.spaceship;
      subject = weapon;
    }
    // For player, use defaults (provide null to _report()).
    _report("<owner's> <subject> {shoot<s>|fire<s>} at "
        "<object-owner's> <object>", subject: subject, owner: owner);
    
    _hit(targetSystem);
  }
  
  void _hit(ShipSystem targetSystem) {
    var damage = weapon.damage;
    
    Entity object = CombatMove.getTargetObject(targetSystem.spaceship, 
        targetSystem);
    Entity owner;
    Entity subject;
    
    if (damage == 0) return;
    var shield = targetSystem.spaceship.shield;
    if (shield != null && shield.isAliveAndActive && shield.sp.isNonZero) {
      if (!Randomly.saveAgainst(weapon.shieldPenetration)) {
        _report("<owner's> <subject> {drill<s> into|hit<s>} <object's> shield",
                positive: true);
        // better = "<subject-owner's> <subject> {drill<s> into|hit<s>} <object-owner's> <object>"
        if (damage > shield.sp.value) {
          // Rest of energy goes to hp damage
          damage -= shield.sp.value;
          shield.sp.value = 0;
          // TODO: report?
        } else {
          shield.sp.value -= weapon.damage;
          damage = 0;
        }
      } else {
        // TODO: better
        storyline.add("<subject> "
            "goes {right|} through <object's> shield",
            subject: weapon.projectile, object: targetSystem.spaceship, 
            positive: true,
            time: system.spaceship.currentCombat.timeline.time);
      }
    }
    if (damage > 0) {
//      _report("<owner's> <subject> {hit<s>|succeed<s> to hit|"
//          "successfully hit<s>} <object>", object: object,
//          positive: true);
      
      int relativePosition = system.spaceship
          .getPositionTowards(targetSystem.spaceship);
      
      if (relativePosition >= Spaceship.POSITION_GREAT) {
        damage *= 1.5;
        _report("<subject> hit<s> <object's> weakest spot", 
            subject: weapon.projectile, object: object, positive: true);
      } else if (relativePosition >= Spaceship.POSITION_GOOD) {
        damage *= 1.25;
        _report("<subject> hit<s> one of <object's> weaker spots", 
            subject: weapon.projectile, object: object, positive: true);
      } else if (relativePosition >= Spaceship.POSITION_BALANCED) {
        _report("<subject> hit<s>", 
            subject: weapon.projectile, object: Entity.NOTHING, positive: true);
      } else if (relativePosition >= Spaceship.POSITION_BAD) {
        damage /= 1.25;
        _report("<subject> hit<s> one of <object's> tougher spots", 
            subject: weapon.projectile, object: object, negative: true);
      } else /* relativePosition == Spaceship.POSITION_HORRIBLE, or worse */ {
        damage /= 1.5;
        _report("<subject> hit<s> <object's> toughest spot", 
            subject: weapon.projectile, object: object, negative: true);
      }
      
      targetSystem.hp.value -= damage;
    }
    if (Randomly.saveAgainst(chanceOfImproveAimOnSuccess)) {
      _improveAim();
    }
  }
  
  void reportFailure() {
    Entity owner;
    Entity subject;
    if (!system.spaceship.pilot.isPlayer) {
      // Override the normal owner and subject - we need to report the enemy AI
      // ship's weapon involved.
      owner = weapon.spaceship;
      subject = weapon;
    }
    // For player, use defaults (provide null to _report()).
    _report("<owner's> <subject> {shoot<s>|fire<s>} at "
        "<object-owner's> <object>", subject: subject, owner: owner);
    _report("<subject> {fail<s> to hit|miss<es>|go<es> wide}",
        subject: weapon.projectile, object: Entity.NOTHING,
        negative: true, but: true);
  }
  
  final num chanceOfImproveAimOnSuccess = 0.2;
  final num chanceOfImproveAimOnFailure = 0.2;
  
  void onFailure() {
    if (!(targetSystem is Hull)) {
      // when targetting a specific system, it's possible to miss that one
      // but still hit the hull (but with half the probability)
      if (Randomly.saveAgainst(
              calculateSuccessChance(targetShip, targetShip.hull) / 2.0)) {
        _hit(targetShip.hull);
      } else {
        _report("<subject> completely {miss<es>|go<es> wide of} <object>", 
            object: targetShip, negative: true);
      }
    }
    if (Randomly.saveAgainst(chanceOfImproveAimOnFailure)) {
      _improveAim();
    }
  }
  
  void _improveAim() {
    if (!targetShip.isAliveAndActive) {
      return;
    }
    weapon.setAimAt(targetShip, weapon.getAimAt(targetShip) + 1);
    Entity owner = weapon.spaceship.pilot.isPlayer ? 
        weapon.spaceship.pilot : weapon.spaceship;
    storyline.add("<owner's> <subject's> aim at <object> gets better", 
        subject: weapon, owner: owner, object: targetShip,
        positive: true, time: system.spaceship.currentCombat.timeline.time);
  }
  
  bool isEligible({Spaceship targetShip, ShipSystem targetSystem}) {
    if (!super.isEligible(targetShip: targetShip, targetSystem: targetSystem)) {
      return false;
    }
    if (system.powerInput.value != system.powerInput.max) return false;
    if (targetSystem != null && !targetSystem.isOutsideHull) return false;
    return true;
  }
  
  num calculateSuccessChance(Spaceship targetShip, ShipSystem targetSystem) {
    if (targetSystem == null) targetSystem = this.targetSystem;
    if (targetSystem == null && targetShip != null) {
      targetSystem = targetShip.hull;
    }
    if (targetSystem == null) return 0.0;  // No target, no luck.
    var chance = defaultSuccessChance * targetSystem.exposedFactor *
                 weapon.accuracyModifier;
    chance -= targetSystem.spaceship.maneuverability / 100;
    chance += 0.1 * weapon.getAimAt(targetShip);
    if (chance < 0) return 0.0;
    if (chance > 1) return 1.0;
    return chance;
  }
  num defaultSuccessChance = 0.8;
}

class QuickFireGun extends FireGun {
  QuickFireGun(ShipSystem system) : super(system);
  
  String commandText = "take a quick shot";
  int timeToSetup = 1;
  int timeToFinish = 3;
  
  @override
  void reportSettingUp() {
    var pilot = system.spaceship.pilot;
    if (pilot == null || !pilot.isPlayer) {
      throw new StateError("reportSettingUp should not have been called since "
          "this spaceship's pilot is null or is not player");
    }
    
    storyline.add("<subject> decide<s> to take a quick shot at <object>", 
        subject: pilot, owner: system, object: targetShip,
        time: system.spaceship.currentCombat.timeline.time);
  }
  
  final num chanceOfImproveAimOnSuccess = 0.1;
  final num chanceOfImproveAimOnFailure = 0.0;
  
  num defaultSuccessChance = 0.6;
}


// TODO class BerserkFireGun extends FireGun
//- Beam Weapon
//  - Target - ship or its system, or off
//  - Improve aim
//  - Careful shot [slow]
//  - Quick shot [quick]
//  - Precision strike [slow] - no hull fallback, either hits targetSystem or doesn't fire
//  - Berserk [slow] [multiple]
//  - Supercharge (next shot will be super powerful)
//  - Unjam

class ImproveAim extends CombatMove {
  ImproveAim(ShipSystem system) : super(system);
  
  String get commandText => "improve aim";
  int timeToSetup = 1;
  int timeToFinish = 3;
  
  final bool needsTargetShip = true;
  final bool needsTargetSystem = true;
  
  String stringSettingUp = null;
  
  @override
  void reportStarting() => _report(stringStarting, object: targetShip);
  String stringStarting = "<subject> {start<s> "
        "{aiming at|taking aim at|fixing on|zeroing in on}|"
        "begin<s> to {{take |}aim at|fix on|zero in on}} <object>";
  
  final num defaultSuccessChance = 0.9;
  
  @override
  void reportSuccess() => _report(stringSuccess, object: targetShip, 
      positive: true);
  String stringSuccess = "<subject> successfully improve<s> <subject's> aim "
      "on <object>";
  void onSuccess() {
    Weapon weapon = (system as Weapon);
    weapon.setAimAt(targetShip, weapon.getAimAt(targetShip) + IMPROVE_BY);
  }
  
  @override
  void reportFailure() => _report(stringFailure, object: Entity.NOTHING,
      negative: true);
  String stringFailure = "<subject's> maneuvre fails";
  
  static const int IMPROVE_BY = 1;
}


/// A subclass of CombatMove that is not dependent on one single [ShipSystem].
/// Maneuvres like "improve position" are an example of [SpaceshipCombatMove].
abstract class SpaceshipCombatMove extends CombatMove {
  SpaceshipCombatMove(ShipSystem system) : super(system) {
    spaceship = system.spaceship;
  }

  Spaceship spaceship;
  
  /// Is the move currently eligible to be carried out?
  @override
  bool isEligible({Spaceship targetShip, ShipSystem targetSystem}) {
    if (needsTargetShip) {
      if (targetShip == null && this.targetShip != null) {
        targetShip = this.targetShip;
      }
      if (targetShip == null || !targetShip.isAliveAndActive) return false;
    }
    if (!spaceship.isAliveAndActive) return false;
    return true;
  }
  
  final bool needsTargetSystem = false;
  
  @override
  void reportStarting() => _report(stringStarting, object: targetShip);
  @override
  void reportSuccess() => _report(stringSuccess, object: targetShip, 
      positive: true);
  @override
  void reportCannotContinue() => _report(stringCannotContinue, 
      object: targetShip);
  @override
  void reportFailure() => _report(stringFailure, object: targetShip,
      negative: true); 
  @override
  void reportAutoRepeat() => _report(stringAutoRepeat, object: targetShip); 
}

class ImprovePosition extends SpaceshipCombatMove {
  ImprovePosition(ShipSystem mainThruster) : super(mainThruster);
  
  String commandText = "improve position";
  int timeToSetup = 1;
  int timeToFinish = 5;
  
  final num defaultSuccessChance = 0.9;
  final int improvementStep = 1;

  final bool needsTargetShip = true;
  
  String stringSettingUp = null;
  
  String stringStarting = "<subject> {start<s>|begin<s>} {trying|an attempt} "
      "to {improve|better} <subject's> "
      "position on <object>";
  
  String stringSuccess = "<subject> successfully improve<s> <subject's> "
      "position on <object>";
  
  void onSuccess() {
    spaceship.changePositionDifferenceTowards(targetShip, improvementStep);
    // TODO: report successful maneuvre, but wait for position reporting
    // until the end of "turn", where we say what the relative position is now.
  }
  
  String stringFailure = "<subject> fail<s> to improve <subject's> position "
      "on <object>";
}

class RiskyImprovePosition extends ImprovePosition {
  RiskyImprovePosition(ShipSystem mainThruster) : super(mainThruster);
  
  String commandText = "offensive maneuvre";
  
  @override
  final num defaultSuccessChance = 0.3;
  @override
  final int improvementStep = 3;
  final num regressionChance = 0.2;
  
  String stringStarting = "<subject> {start<s>|begin<s>} a {risky|daring} "
      "maneuvre to gain positional advantage on <object>";
  
  String stringSuccess = "<subject> successfully pull<s> off the maneuvre "
      "on <object>";
  
  void reportFailure() => _report(stringFailure, object: Entity.NOTHING);
  String stringFailure = "<subject's> maneuvre fails";
  
  @override
  void onFailure() {
    if (Randomly.saveAgainst(regressionChance)) {
      _report("in fact, <subject's> position on <object> worsens");
    }
  }
}