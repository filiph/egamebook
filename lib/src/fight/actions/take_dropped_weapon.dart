import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/spear.dart';
import 'package:edgehead/fractal_stories/items/sword.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/disarm_kick.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TakeDroppedWeapon extends ItemAction {
  static const String className = "TakeDroppedWeapon";

  TakeDroppedWeapon(Item item) : super(item);

  @override
  String get commandTemplate => "pick up <object>";

  @override
  String get helpMessage => "A different weapon might change the battle.";

  @override
  bool get isAggressive => false;

  @override
  final bool isProactive = true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    WorldState w = context.world;
    Storyline s = context.storyline;
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    WorldState w = context.world;
    Storyline s = context.storyline;
    final situation = w.currentSituation as FightSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild(
            (FightSituationBuilder b) => b..droppedItems.remove(item)));
    w.updateActorById(a.id, (b) {
      if (!a.isBarehanded) {
        // Move current weapon to inventory.
        b.items.add(b.currentWeapon);
      }
      b.currentWeapon = item as Weapon;
    });
    a.report(s, "<subject> pick<s> <object> up", object: item);
    return "${a.name} picks up ${item.name}";
  }

  @override
  String getRollReason(Actor a, WorldState w) => throw new UnimplementedError();

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) {
    if (item is! Weapon) return false;
    // TODO: remove the next condition
    if (item is Spear) return false;
    if (!a.canWield) return false;
    final weapon = item as Weapon;
    final isSwordForSpear = a.currentWeapon is Spear && weapon is Sword;
    if (weapon.value <= a.currentWeapon.value && !isSwordForSpear) return false;
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

  static ItemAction builder(Item item) => new TakeDroppedWeapon(item);
}
