import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/inventory.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_disarmed.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TakeDroppedWeapon extends ItemAction {
  static const String className = "TakeDroppedWeapon";

  static final TakeDroppedWeapon singleton = TakeDroppedWeapon();

  @override
  final bool isProactive = true;

  @override
  List<String> get commandPathTemplate =>
      const ["environment", "<object>", "pick up"];

  @override
  String get helpMessage => "A different weapon might change "
      "the tide of battle. If I pick it up, it also means "
      "the enemy won't be picking it up instead.";

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
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Item item) {
    assert(item.isWeapon);
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation = w.currentSituation as FightSituation;
    final previousWeapon = a.currentWeapon;
    w.replaceSituationById(
        situation.id,
        situation.rebuild(
            (FightSituationBuilder b) => b..droppedItems.remove(item)));
    w.updateActorById(a.id, (b) {
      var result = b.inventory.equip(item, a.anatomy);
      assert(result == WeaponEquipResult.equipped);
    });
    assert(a.anatomy.anyWeaponAppendageAvailable);
    bool intoPrimaryHand = a.anatomy.primaryWeaponAppendageAvailable;
    var offHandString = intoPrimaryHand ? "" : " with <subject's> off hand";
    if (a.isOnGround) {
      a.report(s, "<subject> grab<s> <object>$offHandString", object: item);
    } else {
      a.report(s, "<subject> pick<s> <object> up$offHandString", object: item);
    }
    if (previousWeapon == null) {
      a.report(s, "<subject> wield<s> <object>", object: item);
    } else {
      a.report(
          s,
          "<subject> wield<s> <object>, "
          "replacing <object2> to <subject's> belt",
          endSentence: true,
          object: item,
          object2: previousWeapon);
    }
    return "${a.name} picks up ${item.name}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Item item) =>
      throw UnimplementedError();

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Item item) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Item item) {
    if (!item.isWeapon) return false;
    if (!a.anatomy.anyWeaponAppendageAvailable) return false;
    if (recentlyDisarmed(a, w)) return false;
    if (a.anatomy.isBlind) return false;

    if (a.isPlayer) return true;

    // NPCs and monsters can't just pick up any weapon.
    final isSwordForSpear =
        a.currentWeapon?.damageCapability?.type == WeaponType.spear &&
            item.damageCapability.type == WeaponType.sword;
    return item.value > (a.currentWeapon?.value ?? 0) || isSwordForSpear;
  }
}
