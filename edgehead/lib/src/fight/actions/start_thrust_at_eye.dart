import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_thrust.dart';
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
  List<String> get commandPathTemplate {
    throw StateError('$className has its own getCommandPath');
  }

  @override
  List<String> getCommandPath(Actor target) {
    final livingEyes = target.anatomy.allParts
        .where((part) =>
            part.function == BodyPartFunction.vision && part.isAliveAndActive)
        .length;
    assert(livingEyes > 0,
        "Trying to apply $className when there is no eye left.");
    final isLast = livingEyes == 1;

    final commandPathTemplate = [
      "attack <object>",
      "maim",
      "stab <objectPronoun's> ${isLast ? 'remaining ' : ''}eye",
    ];

    // Realize the "<object>" parts of the template.
    return (Storyline()..add(commandPathTemplate.join('>>'), object: target))
        .realizeAsString()
        // Then split again into a list.
        .split('>>');
  }

  @override
  String get commandTemplate => "thrust >> <object's> >> eye";

  @override
  String get helpMessage => "Eyes are hard to hit but this move is "
      "successful, opponents lose much of their fighting ability.";

  @override
  String get name => "StartThrustAtEye";

  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.stamina;

  @override
  String get rollReasonTemplate => "will <subject> hit <objectPronoun>?";

  @override
  bool get shouldShortCircuitWhenFailed => false;

  @override
  void applyShortCircuit(Actor actor, Simulation sim, WorldStateBuilder world,
      Storyline storyline, Actor enemy, Situation mainSituation) {}

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
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.isOnGround &&
      // This is here because we currently don't have a way to dodge
      // a thrust while on ground. TODO: fix and remove
      !enemy.isOnGround &&
      !a.anatomy.isBlind &&
      !enemy.anatomy.isBlind &&
      a.currentWeapon.damageCapability.isThrusting &&
      // Only allow thrusting when stance is worse than combat stance.
      enemy.pose < Pose.combat;

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

  static BodyPart _getTargetEye(Actor enemy, int time) {
    final eyes = enemy.anatomy.allParts
        .where(
            (part) => part.function == BodyPartFunction.vision && part.isAlive)
        .toList(growable: false);
    assert(eyes.isNotEmpty);

    // Must be consistent, so no random (not even stateful random)
    return eyes[(time ~/ 1300) % eyes.length];
  }
}
