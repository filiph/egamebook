import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_slash_at_body_part.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartSlashAtArm extends StartDefensibleActionBase {
  static final StartSlashAtArm singleton = StartSlashAtArm();

  static const String className = "StartSlashAtArm";

  @override
  List<String> get commandPathTemplate {
    throw StateError('$className has its own getCommandPath');
  }

  @override
  String get commandTemplate => "slash >> <object's> >> arm";

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
        "<subject> swing<s> {${weaponAsObject2(a)} |}at "
        "<objectOwner's> <object>",
        object: Entity(name: 'arm'),
        objectOwner: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
  }

  @override
  DefenseSituation defenseSituationBuilder(Actor a, Simulation sim,
      WorldStateBuilder w, Actor enemy, Predetermination predetermination) {
    return createSlashDefenseSituation(
        w.randomInt(), a, enemy, predetermination);
  }

  @override
  List<String> getCommandPath(Actor target) {
    final livingArms = _getAllArms(target).length;
    assert(livingArms > 0,
        "Trying to apply $className when there is no leg left.");
    final isLast = livingArms == 1;

    final commandPathTemplate = [
      "attack <object>",
      "maim",
      "slash at <objectPronoun's> ${isLast ? 'remaining ' : ''}arm",
    ];

    // Realize the "<object>" parts of the template.
    return (Storyline()..add(commandPathTemplate.join('>>'), object: target))
        .realizeAsString()
        // Then split again into a list.
        .split('>>');
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.isOnGround &&
      // This is here because we currently don't have a way to dodge
      // a thrust while on ground. TODO: fix and remove
      !enemy.isOnGround &&
      !a.anatomy.isBlind &&
      a.currentWeapon.damageCapability.isSlashing &&
      // Only allow arm attacks when enemy is at least extended.
      enemy.pose <= Pose.extended &&
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

  static Iterable<BodyPart> _getAllArms(Actor target) {
    assert(
        target.anatomy.isHumanoid,
        "This function currently assumes that legs are the only "
        "body parts providing mobility.");

    return target.anatomy.allParts
        .where((part) => part.function == BodyPartFunction.wielding);
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
