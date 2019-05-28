import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';

class DisarmKick extends EnemyTargetAction with CombatCommandPath {
  static const String className = "DisarmKick";

  static final EnemyTargetAction singleton = DisarmKick();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "When enemies are on the ground, you can try to "
      "kick their weapon off to disarm them.";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.gear;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> kick "
      "the weapon off?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    Randomly.run(() {
      a.report(s, "<subject> kick<s> {at|towards} <object's> weapon",
          object: enemy);
      a.report(s, "<subject> mi<sses>", but: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> weapon", object: enemy);
      enemy.report(s, "<subject> hold<s> onto it", but: true);
    });
    return "${a.name} fails to kick ${enemy.name}'s weapon off";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Randomly.run(() {
      a.report(
          s,
          "<subject> kick<s> <objectOwner's> <object> off "
          "<objectOwner's> hand",
          objectOwner: enemy,
          object: enemy.currentWeapon,
          positive: true,
          endSentence: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> {right|} hand",
          object: enemy, positive: true);
      s.add("<owner's> <subject> fl<ies> away",
          subject: enemy.currentWeapon, owner: enemy);
    });
    dropCurrentWeapon(w, enemy);
    return "${a.name} kicks ${enemy.name}'s weapon off";
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "kick at weapon";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return getCombatMoveChance(a, enemy, 0.6, [
      const Modifier(50, CombatReason.dexterity),
      const Modifier(30, CombatReason.balance),
      const Bonus(90, CombatReason.targetHasAllEyesDisabled),
    ]);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      (a.pose >= Pose.offBalance) &&
      !a.anatomy.isBlind &&
      enemy.pose <= Pose.onGround &&
      enemy.currentWeapon != null;
}
