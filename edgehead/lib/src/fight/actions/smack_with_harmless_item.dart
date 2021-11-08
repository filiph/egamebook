// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/object2_in_command_path.dart';

class SmackWithHarmlessItem extends EnemyTargetAction with CombatCommandPath {
  static const String className = "SmackWithHarmlessItem";

  static final EnemyTargetAction singleton = SmackWithHarmlessItem();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final String helpMessage = "It's unlikely this will have any effect. "
      "Actual weapons tend to be better at this.";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.body;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> hit <object>?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    assert(a.currentWeapon.damageCapability.isHarmless);

    a.report(s, "<subject> swing at <object> with <object2>",
        object: enemy, object2: a.currentWeapon);
    a.report(s, "<subject> miss<es> completely", but: true, negative: true);

    if (a.pose > Pose.offBalance) {
      a.report(s, '<subject> lose<s> balance because of that', negative: true);
      w.updateActorById(a.id, (b) => b.pose = Pose.offBalance);
    }

    return "${a.name} fails to hit ${enemy.name} with harmless weapon";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;

    assert(a.currentWeapon.damageCapability.isHarmless);

    a.report(s, "<subject> hit <object> with <object2>",
        object: enemy, object2: a.currentWeapon, positive: true);
    s.add('it has no effect');

    return "${a.name} hits ${enemy.name} with harmless weapon";
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "hit <objectPronoun> with "
      "the ${weaponAsObject2InCommandPath(context.actor)}";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return getCombatMoveChance(a, enemy, 0.3, world.statefulRandomState, [
      const Modifier(50, CombatReason.dexterity),
      const Modifier(30, CombatReason.balance),
      const Bonus(40, CombatReason.targetHasAllEyesDisabled),
    ]);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      // This is just fun for the player.
      a.isPlayer &&
      a.currentDamageCapability.isHarmless &&
      !a.anatomy.isBlind &&
      a.anatomy.anyWeaponAppendageAvailable;
}
