import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/actions/start_thrust.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/thrust_defense_situation.dart';
import 'package:edgehead/src/fight/thrust/thrust_situation.dart';

const String startThrustHelpMessage = "Eyes are hard to hit but this move is "
    "successful, opponents lose much of their fighting ability.";

EnemyTargetAction startThrustAtEyeGenerator() {
  return StartDefensibleAction(
    name: "StartThrustAtEye",
    commandTemplate: startThrustAtEyeCommand,
    commandPathTemplate: startThrustAtEyeCommandPath,
    helpMessage: startThrustHelpMessage,
    applyStart: startThrustAtEyeReportStart(),
    isApplicable: (a, sim, w, enemy) =>
        !a.isOnGround &&
        // This is here because we currently don't have a way to dodge
        // a thrust while on ground. TODO: fix and remove
        !enemy.isOnGround &&
        !enemy.anatomy.isBlind &&
        a.currentWeapon.damageCapability.isThrusting &&
        // Only allow thrusting when stance is worse than combat stance.
        enemy.pose < Pose.combat,
    mainSituationBuilder: _thrustAtEyeMainSituation,
    defenseSituationBuilder: (a, sim, w, enemy, predetermination) =>
        createThrustDefenseSituation(w.randomInt(), a, enemy, predetermination),
    successChanceGetter: (Actor a, Simulation sim, WorldState w, Actor enemy) {
      final eye = _getTargetEye(enemy, w.time.millisecondsSinceEpoch);
      return computeThrustAtBodyPartChance(eye.designation, a, sim, w, enemy);
    },
    rerollable: true,
    rerollResource: Resource.stamina,
    rollReasonTemplate: "will <subject> hit <objectPronoun>?",
  );
}

Situation _thrustAtEyeMainSituation(
    Actor a, Simulation sim, WorldStateBuilder w, Actor enemy) {
  final eye = _getTargetEye(enemy, w.time.millisecondsSinceEpoch);

  return createThrustSituation(w.randomInt(), a, enemy,
      designation: eye.designation);
}

BodyPart _getTargetEye(Actor enemy, int time) {
  final eyes = enemy.anatomy.allParts
      .where((part) => part.function == BodyPartFunction.vision && part.isAlive)
      .toList(growable: false);
  assert(eyes.isNotEmpty);

  // Must be consistent, so no random (not even stateful random)
  return eyes[(time ~/ 1300) % eyes.length];
}

List<String> startThrustAtEyeCommandPath = [
  "attack <object>",
  "maim",
  "stab <objectPronoun's> eye"
];

String startThrustAtEyeCommand = "thrust >> <object's> >> eye";

PartialApplyFunction startThrustAtEyeReportStart() => (Actor a,
        Simulation sim,
        WorldStateBuilder w,
        Storyline s,
        Actor enemy,
        Situation mainSituation) =>
    a.report(
        s,
        "<subject> thrust<s> {${weaponAsObject2(a)} |}at "
        "<objectOwner's> <object>",
        object: Entity(name: 'eye'),
        objectOwner: enemy,
        actionThread: mainSituation.id,
        isSupportiveActionInThread: true);
