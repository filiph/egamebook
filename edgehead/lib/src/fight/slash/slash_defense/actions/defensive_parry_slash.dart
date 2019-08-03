import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

ReasonedSuccessChance computeDefensiveParrySlash(
    Actor a, Simulation sim, WorldState w, Actor enemy) {
  return getCombatMoveChance(a, enemy, 0.9, [
    const Modifier(95, CombatReason.dexterity),
    const Modifier(30, CombatReason.balance),
    const Bonus(50, CombatReason.targetHasPrimaryArmDisabled),
    const Bonus(30, CombatReason.targetHasOneLegDisabled),
    const Bonus(90, CombatReason.targetHasAllLegsDisabled),
    const Bonus(50, CombatReason.targetHasOneEyeDisabled),
    const Bonus(90, CombatReason.targetHasAllEyesDisabled),
  ]);
}

class DefensiveParrySlash extends OtherActorAction {
  static final DefensiveParrySlash singleton = DefensiveParrySlash();

  static const String className = "DefensiveParrySlash";

  @override
  final String helpMessage = "Stepping back is the safest way to get out of "
      "harm's way.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => ["step back and parry"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> parry it?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Randomly.run(
      () => a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|fend it off}",
      ),
      () => a.report(
        s,
        "<subject> tr<ies> to {deflect it|meet it|fend it off} "
        "with <object2>",
        object2: a.currentWeaponOrBodyPart,
      ),
    );
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true));
    }
    w.popSituation(sim);
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (a.isPlayer) {
      a.report(s, "<subject> {step<s>|take<s> a step} back");
    }
    Randomly.run(
      () => a.report(
        s,
        "<subject> {parr<ies>|deflect<s> it|fend<s> it off}",
      ),
      () => a.report(
        s,
        "<subject> {deflect<s> it|meet<s> it|fend<s> it off} "
        "with <object2>",
        object2: a.currentWeaponOrBodyPart,
      ),
    );
    a.report(
        s,
        "<subject> {parr<ies> it|deflect<s> it|"
        "meet<s> it with <object2>|"
        "fend<s> it off}",
        object2: a.currentWeaponOrBodyPart,
        positive: true);

    if (a.pose < Pose.standing) {
      w.updateActorById(a.id, (b) => b..pose = Pose.standing);
      if (a.isPlayer) {
        a.report(s, "<subject> regain<s> some balance");
      }
    }
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} steps back and parries ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeDefensiveParrySlash(a, sim, w, enemy));
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.anatomy.isBlind && a.currentDamageCapability.type.canParrySlash;
}
