import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/feint_slash.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';

/// The thrusting version of [FeintSlash].
class FeintJab extends FeintSlash {
  static const String className = "FaintJab";

  static final FeintJab singleton = FeintJab();

  @override
  String get commandTemplate =>
      "feint jab at <object> to spoil <objectPronoun's> stance";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> spoil "
      "<object's> stance?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> feint<s> {an attack|a jab}");
    enemy.report(s, "<subject> <is>n't fooled", but: true);
    enemy.report(
        s,
        "<subject> {retain<s>|keep<s>} "
        "<subject's> {stance|footing}",
        positive: true);
    return "${a.name} fails to feint ${enemy.name} out of stance with a jab";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> feint<s> {an attack|a jab}");

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

    return "${a.name} feints ${enemy.name} out of stance with a jab";
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
      !a.anatomy.isBlind &&
      !enemy.anatomy.isBlind &&
      enemy.pose > Pose.extended &&
      a.currentWeapon.damageCapability.isThrusting &&
      // Prevent showing both [FeintJab] and [FeintSlash] when player
      // is wielding a sword.
      !a.currentWeapon.damageCapability.isSlashing;
}
