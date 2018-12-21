import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';

final Entity balance =
    Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);

final Entity pounding = Entity(name: "pounding", team: neutralTeam);

class Pound extends EnemyTargetAction with ComplexCommandPath<Actor> {
  static const String className = "Pound";

  static final Pound singleton = Pound();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "Forcing enemies off balance often means hitting them "
      "heavily several times in a row. The goal is not to deal damage but to "
      "force the opponent to lose control of their combat stance. It can also "
      "give members of your party an opportunity to strike.";

  @override
  List<String> get commandPathTemplate =>
      ["attack <object>", "stance", "force slash at <objectPronoun's> weapon"];

  @override
  String get commandTemplate =>
      "slash >> <object's> >> weapon to force <objectPronoun> off balance";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> force "
      "<object> off balance?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> {fiercely|violently} "
        "{strike<s>|hammer<s>|batter<s>} "
        "on <objectOwner's> "
        "{<object>|weapon}",
        objectOwner: enemy,
        object: enemy.currentWeapon);
    enemy.report(
        s,
        "<subject> {retain<s>|keep<s>} "
        "<subject's> {|combat} {stance|footing}",
        positive: true);
    return "${a.name} fails to pound ${enemy.name} off balance";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(
        s,
        "<subject> {fiercely|violently} "
        "{strike<s>|hammer<s>|batter<s>} "
        "on <objectOwner's> "
        "{<object>|weapon}",
        objectOwner: enemy,
        object: enemy.currentWeapon);

    final newStance = enemy.pose.changeBy(-2);

    if (newStance == Pose.extended) {
      enemy.report(s, "<subject> almost lose<s> balance",
          object: balance, negative: true);
      enemy.report(s, "<subject> manage<s> to keep <subject's> stance");
      enemy.report(s, "<subject> {overextend<s>|expose<s>} <subject's> hand",
          but: true, negative: true);

      w.updateActorById(enemy.id, (b) => b..pose = newStance);

      var situation = OffBalanceOpportunitySituation.initialized(
          w.randomInt(), enemy,
          culprit: a);
      w.pushSituation(situation);
      return "${a.name} pounds ${enemy.name} to extended";
    }

    if (newStance == Pose.offBalance) {
      enemy.report(s, "<subject> lose<s> <object>",
          object: balance, negative: true);
      w.updateActorById(enemy.id, (b) => b..pose = newStance);

      var situation = OffBalanceOpportunitySituation.initialized(
          w.randomInt(), enemy,
          culprit: a);
      w.pushSituation(situation);
      return "${a.name} pounds ${enemy.name} off balance";
    }

    // Enemy goes on the ground.
    assert(newStance == Pose.onGround);
    enemy.report(s, "<subject> <is> already off balance");
    var groundMaterial = getGroundMaterial(w);
    s.add(
        "<subject> make<s> <object> fall "
        "to the $groundMaterial",
        subject: pounding,
        object: enemy);
    w.recordCustom(fellToGroundCustomEventName, actor: enemy);
    w.updateActorById(enemy.id, (b) => b..pose = newStance);

    return "${a.name} pounds ${enemy.name} to the ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return getCombatMoveChance(a, enemy, 0.8, [
      const Modifier(95, CombatReason.dexterity),
      const Modifier(30, CombatReason.balance),
      const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
      const Bonus(30, CombatReason.targetHasOneLegDisabled),
      const Bonus(50, CombatReason.targetHasOneEyeDisabled),
      const Bonus(50, CombatReason.targetHasAllEyesDisabled),
    ]);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      !a.isOnGround &&
      (a.currentWeapon.damageCapability.isSlashing ||
          a.currentWeapon.damageCapability.isBlunt) &&
      (enemy.currentWeapon.damageCapability.type.canParrySlash ||
          enemy.currentWeapon.damageCapability.type.canParryBlunt) &&
      !enemy.isOnGround;
}
