import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';

class FeintSlash extends EnemyTargetAction with ComplexCommandPath<Actor> {
  static const String className = "FaintSlash";

  static final FeintSlash singleton = FeintSlash();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "Feinting an attack helps luring your opponent from "
      "a defensive position. If successful, the enemy will be extended, "
      "and therefore vulnerable to follow up attack.";

  @override
  List<String> get commandPathTemplate =>
      ["attack <object>", "stance", "feint"];

  @override
  String get commandTemplate =>
      "feint slash at <object> to spoil <objectPronoun's> stance";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> spoil "
      "<object's> stance?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> feint<s> {an attack|a slash}");
    enemy.report(s, "<subject> <is>n't fooled", but: true);
    enemy.report(
        s,
        "<subject> {retain<s>|keep<s>} "
        "<subject's> {stance|footing}",
        positive: true);
    return "${a.name} fails to feint ${enemy.name} out of stance";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> feint<s> {an attack|a slash}");

    enemy.report(s, "<subject> scramble<s> to defend <subjectPronounSelf>",
        negative: true);
    enemy.report(s, "<subject> expose<s> <subject's> arm in the process",
        negative: true);

    w.updateActorById(enemy.id, (b) => b..pose = Pose.extended);
    w.recordCustom(lostStanceCustomEvent, actor: enemy);

    var situation = OffBalanceOpportunitySituation.initialized(
        w.randomInt(), enemy,
        culprit: a);
    w.pushSituation(situation);

    return "${a.name} feints ${enemy.name} out of stance";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return getCombatMoveChance(a, enemy, 0.8, [
      const Modifier(95, CombatReason.dexterity),
      const Modifier(50, CombatReason.balance),
      const Bonus(20, CombatReason.targetHasPrimaryArmDisabled),
      const Bonus(30, CombatReason.targetHasOneLegDisabled),
      const Bonus(50, CombatReason.targetHasOneEyeDisabled),
      const Bonus(50, CombatReason.targetHasAllEyesDisabled),
    ]);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      !a.isOnGround &&
      !enemy.anatomy.isBlind &&
      enemy.pose > Pose.extended &&
      (a.currentWeapon.damageCapability.isSlashing ||
          a.currentWeapon.damageCapability.isBlunt);
}
