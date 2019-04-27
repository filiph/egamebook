import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_thrust.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/common/start_defensible_action.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartThrustAtEye extends StartDefensibleActionBase {
  static final StartThrustAtEye singleton = StartThrustAtEye();

  static const String className = "StartThrustAtEye";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.body;

  @override
  String get helpMessage => "Eyes are hard to hit but if this move is "
      "successful, opponents lose much of their fighting ability.";

  @override
  String get name => className;

  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.stamina;

  @override
  String get rollReasonTemplate => "will <subject> hit the eye?";

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
        "<subject> thrust<s> {${weaponAsObject2(a)} |}at "
        "<objectOwner's> <object>",
        object: Entity(name: 'eye'),
        objectOwner: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
  }

  @override
  DefenseSituation defenseSituationBuilder(Actor a, Simulation sim,
      WorldStateBuilder w, Actor enemy, Predetermination predetermination) {
    return createThrustDefenseSituation(
        w.randomInt(), a, enemy, predetermination);
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor target) =>
      "stab <objectPronoun's> eye";

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      _isApplicableBase(a, sim, w, enemy) &&
      // This action assumes we're targeting just one of (several?) eyes.
      _getAllEyes(enemy).length >= 2;

  @override
  Situation mainSituationBuilder(
      Actor a, Simulation sim, WorldStateBuilder w, Actor enemy) {
    final eye = _getTargetEye(enemy, w.time.millisecondsSinceEpoch);

    return createThrustSituation(w.randomInt(), a, enemy,
        designation: eye.designation);
  }

  @override
  ReasonedSuccessChance successChanceGetter(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final eye = _getTargetEye(enemy, w.time.millisecondsSinceEpoch);
    return computeThrustAtBodyPartChance(eye.designation, a, sim, w, enemy);
  }

  static Iterable<BodyPart> _getAllEyes(Actor target) =>
      target.anatomy.allParts.where((part) =>
          part.function == BodyPartFunction.vision && part.isAliveAndActive);

  static BodyPart _getTargetEye(Actor enemy, int time) {
    final eyes = _getAllEyes(enemy).toList(growable: false);
    assert(eyes.isNotEmpty);

    // Must be consistent, so no random (not even stateful random)
    return eyes[(time ~/ 1300) % eyes.length];
  }

  /// Requirements shared between [StartThrustAtEye]
  /// and [StartThrustAtRemainingEye]
  static bool _isApplicableBase(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.isOnGround &&
      // This is here because we currently don't have a way to dodge
      // a thrust while on ground. TODO: fix and remove
      !enemy.isOnGround &&
      !a.anatomy.isBlind &&
      a.currentDamageCapability.isThrusting &&
      // Only allow thrusting when stance is worse than combat stance.
      enemy.pose < Pose.combat;
}

class StartThrustAtRemainingEye extends StartThrustAtEye {
  static const String className = "StartThrustAtRemainingEye";

  static final StartThrustAtRemainingEye singleton =
      StartThrustAtRemainingEye();

  @override
  String get name => className;

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor target) =>
      "stab <objectPronoun's> remaining eye";

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      StartThrustAtEye._isApplicableBase(a, sim, w, enemy) &&
      // This action assumes we're targeting just one of (several?) eyes.
      StartThrustAtEye._getAllEyes(enemy).length == 1;
}
