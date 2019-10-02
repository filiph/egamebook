import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/items/inventory.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/recently_disarmed.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class WrestleWeaponOnGround extends EnemyTargetAction with CombatCommandPath {
  static const String className = "WrestleWeaponOnGround";

  static final EnemyTargetAction singleton = WrestleWeaponOnGround();

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final String helpMessage = "When enemies are on the ground, I can try to "
      "wrestle their weapon from them.";

  @override
  CombatCommandType get combatCommandType => CombatCommandType.gear;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> wrestle "
      "the weapon from <object>?";

  void _leapAtProneEnemy(
      WorldStateBuilder w, Storyline s, Actor a, Actor enemy) {
    a.report(s, "<subject> {lunge<s>|leap<s>|spring<s>} at <object>",
        object: enemy);
    w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
  }

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    if (a.pose > Pose.onGround) {
      _leapAtProneEnemy(w, s, a, enemy);
    }

    a.report(s,
        "<subject> tr<ies> to grab <objectOwner> by <objectOwner's> <object>",
        objectOwner: enemy, object: enemy.anatomy.weaponAppendage);

    enemy.report(s, "<subject> {slip<s> away|break<s> free}",
        but: true, positive: true);

    return "${a.name} fails to wrestle ${enemy.name}'s weapon off them";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    final groundMaterial = getGroundMaterial(w);

    if (a.pose > Pose.onGround) {
      _leapAtProneEnemy(w, s, a, enemy);
    }

    a.report(s, "<subject> grab<s> <object> by <object's> <object2>",
        object: enemy, object2: enemy.anatomy.weaponAppendage, positive: true);

    a.report(s, "<subject> ram<s> <object> to the $groundMaterial",
        object: enemy.anatomy.weaponAppendage, positive: true);

    enemy.report(s, "<subject> drop<s> <object>",
        object: enemy.currentWeapon, negative: true);

    final weapon = disarmActor(w, enemy);

    a.report(
        s, "<subject> {take<s>|seize<s>|snatch<es>|take<s> hold of} <object>",
        object: weapon, positive: true);

    w.updateActorById(a.id, (b) {
      var result = b.inventory.equip(weapon, a.anatomy);
      assert(result == WeaponEquipResult.equipped);
    });

    return "${a.name} wrestles ${enemy.name}'s weapon off them";
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "wrestle for weapon";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return getCombatMoveChance(a, enemy, 0.4, [
      const Modifier(50, CombatReason.dexterity),
      const Bonus(90, CombatReason.targetHasAllEyesDisabled),
    ]);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      a.anatomy.anyWeaponAppendageAvailable &&
      a.holdsNoWeapon &&
      // Don't allow switching weapons ad infinitum.
      !recentlyDisarmed(a, world) &&
      !a.anatomy.isBlind &&
      enemy.pose <= Pose.onGround &&
      enemy.holdsSomeWeapon;
}
