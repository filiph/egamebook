import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/stand_up.dart';
import 'package:edgehead/src/fight/actions/wrestle_weapon_on_ground.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

/// An action for folks that cannot stand and cannot wrestle for a weapon,
/// and don't currently wield a weapon.
class PunchOnGround extends EnemyTargetAction with CombatCommandPath {
  static final PunchOnGround singleton = PunchOnGround();

  static const String className = "PunchOnGround";

  @override
  final String helpMessage = "I can't stand and can't do much of anything,"
      "but at the very least I can try to punch them.";

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  CombatCommandType get combatCommandType => CombatCommandType.body;

  @override
  List<String> get commandPathTemplate => ["Punch"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "Will <subject> punch <object>?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    WorldStateBuilder w = context.outputWorld;

    a.report(s, '<subject> tr<ies> to punch <object>', object: enemy);
    a.report(s, '<subject> miss<es>', but: true, negative: true);

    w.pushSituation(
        CounterAttackSituation.initialized(w.randomInt(), enemy, a));

    return "${a.name} fails to punch ${enemy.name} on gronud";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;

    a.report(s, '<subject> punch<es> <object>', object: enemy, positive: true);

    return "${a.name} punches ${enemy.name} on ground";
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "punch";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, _) {
    if (w.currentSituation is! DefenseSituation) {
      return ReasonedSuccessChance.sureFailure;
    }
    final situation = w.currentSituation! as DefenseSituation;
    return situation.predeterminedChance.or(ReasonedSuccessChance.sureFailure);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      a.isOnGround &&
      a.holdsNoWeapon &&
      enemy.isOnGround &&
      !StandUp.singleton.isApplicable(c, a, sim, world, null) &&
      !WrestleWeaponOnGround.singleton.isApplicable(c, a, sim, world, enemy);
}
