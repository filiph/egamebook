import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/disarm_kick.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TakeDroppedWeapon extends ItemAction {
  static const String className = "TakeDroppedWeapon";

  static final TakeDroppedWeapon singleton = new TakeDroppedWeapon();

  @override
  final bool isProactive = true;

  @override
  String get commandTemplate => "pick up <object>";

  @override
  String get helpMessage => "A different weapon might change the battle.";

  @override
  bool get isAggressive => false;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context, Item item) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Item item) {
    assert(item.isWeapon);
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation = w.currentSituation as FightSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild(
            (FightSituationBuilder b) => b..droppedItems.remove(item)));
    w.updateActorById(a.id, (b) {
      if (!a.isBarehanded) {
        // Move current weapon to inventory.
        b.weapons.add(b.currentWeapon.build());
      }
      b.currentWeapon = item.toBuilder();
    });
    a.report(s, "<subject> pick<s> <object> up", object: item);
    return "${a.name} picks up ${item.name}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Item item) =>
      throw new UnimplementedError();

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Item item) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Item item) {
    if (!item.isWeapon) return false;
    // TODO: remove the next condition, but not before we figure out
    //       how to make this hard (dropped spears are probably much
    //       farther away than dropped swords).
    if (item.damageCapability.type == WeaponType.spear) return false;
    if (!a.canWield) return false;
    final isSwordForSpear =
        a.currentWeapon.damageCapability.type == WeaponType.spear &&
            item.damageCapability.type == WeaponType.sword;
    if (item.value <= a.currentWeapon.value && !isSwordForSpear) return false;
    var disarmedRecency = w.timeSinceLastActionRecord(
        actionName: DisarmKick.className, sufferer: a, wasSuccess: true);
    // We're using 2 here because it's safer. Sometimes, an action by another
    // actor is silent, so with 1 we would still get 'you sweep his legs, he
    // stands up'.
    if (disarmedRecency != null && disarmedRecency <= 2) {
      return false;
    }
    return true;
  }
}
