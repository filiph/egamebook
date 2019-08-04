import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_body_part.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartSlashAtArm extends StartDefensibleActionBase {
  static final StartSlashAtArm singleton = StartSlashAtArm();

  static const String className = "StartSlashAtArm";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.limbs;

  @override
  String get helpMessage => "Arms tend to be important in fight, and they "
      "are often exposed. A disabled arm cannot hold a sword that would later "
      "slash your neck.";

  @override
  String get name => className;

  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.stamina;

  @override
  String get rollReasonTemplate => "will <subject> slash the arm?";

  @override
  bool get shouldShortCircuitWhenFailed => false;

  @override
  void applyShortCircuit(Actor actor, Simulation sim, WorldStateBuilder world,
      Storyline storyline, Actor enemy, Situation mainSituation) {
    throw StateError("This action doesn't short-circuit on failure.");
  }

  @override
  void applyStart(Actor a, Simulation sim, WorldStateBuilder world, Storyline s,
      Actor enemy, Situation mainSituation) {
    a.report(
        s,
        "<subject> swing<s> <subject's> <object2> at "
        "<objectOwner's> <object>",
        object: Entity(name: 'arm'),
        objectOwner: enemy,
        object2: a.currentWeaponOrBodyPart,
        actionThread: mainSituation.id,
        startsThread: true);
  }

  @override
  DefenseSituation defenseSituationBuilder(Actor a, Simulation sim,
      WorldStateBuilder w, Actor enemy, Predetermination predetermination) {
    return createSlashDefenseSituation(
        w.randomInt(), a, enemy, predetermination);
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor target) =>
      "slash at <objectPronoun's> arm";

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      _isApplicableBase(a, sim, w, enemy) && _getAllHands(enemy).length >= 2;

  static bool _isApplicableBase(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.isOnGround &&
      // This is here because we currently don't have a way to dodge
      // a thrust while on ground. TODO: fix and remove
      !enemy.isOnGround &&
      !a.anatomy.isBlind &&
      a.currentDamageCapability.isSlashing &&
      // Only allow arm attacks when enemy is at least extended
      // or is barehanded.
      (enemy.pose <= Pose.extended || enemy.isBarehanded) &&
      enemy.anatomy.anyWeaponAppendageAvailable;

  @override
  Situation mainSituationBuilder(
      Actor a, Simulation sim, WorldStateBuilder w, Actor enemy) {
    final arm = _getTargetArm(enemy);

    return createSlashSituation(w.randomInt(), a, enemy,
        designation: arm.designation);
  }

  @override
  ReasonedSuccessChance successChanceGetter(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final leg = _getTargetArm(enemy);
    return computeStartSlashAtBodyPartGenerator(leg, a, sim, w, enemy);
  }

  /// The wielding body parts are actually hands, not arms. Here, we figure out
  /// which hands are alive. Remember that disability / limpness of a parent
  /// body part (such as what arm is to a hand) automatically trickles down
  /// to the child. So a disabled arm means the hand is also disabled.
  static Iterable<BodyPart> _getAllHands(Actor target) {
    assert(
        target.anatomy.isHumanoid,
        "This function currently assumes that legs are the only "
        "body parts providing mobility.");

    return target.anatomy.allParts.where((part) =>
        part.function == BodyPartFunction.wielding && part.isAliveAndActive);
  }

  static BodyPart _getTargetArm(Actor enemy) {
    assert(enemy.anatomy.isHumanoid, "Assuming just two arms.");
    if (enemy.anatomy.primaryWeaponAppendageAvailable) {
      // The "appendage" is a hand. We are targeting the arm.
      return enemy.anatomy.findByDesignation(BodyPartDesignation.primaryArm);
    }
    if (enemy.anatomy.secondaryWeaponAppendageAvailable) {
      // The "appendage" is a hand. We are targeting the arm.
      return enemy.anatomy.findByDesignation(BodyPartDesignation.secondaryArm);
    }
    throw StateError('_getTargetArm was called when no arm is available');
  }
}

class StartSlashAtRemainingArm extends StartSlashAtArm {
  static const String className = "StartSlashAtRemainingArm";

  static final StartSlashAtRemainingArm singleton = StartSlashAtRemainingArm();

  @override
  String get name => className;

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor target) =>
      "slash at <objectPronoun's> remaining arm";

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      StartSlashAtArm._isApplicableBase(a, sim, w, enemy) &&
      // This action assumes we're targeting just one of (several?) arms.
      StartSlashAtArm._getAllHands(enemy).length == 1;
}
