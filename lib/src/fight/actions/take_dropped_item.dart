import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/disarm_kick.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TakeDroppedItem extends ItemAction {
  static const String className = "TakeDroppedItem";

  TakeDroppedItem(Item item) : super(item);

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
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    FightSituation situation = w.currentSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild(
            (FightSituationBuilder b) => b..droppedItems.remove(item)));
    w.updateActorById(a.id, (b) {
      if (!a.isBarehanded) {
        // Move current weapon to inventory.
        b.items.add(b.currentWeapon);
      }
      b.currentWeapon = item;
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
    if (!a.canWield) return false;
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

  static ItemAction builder(Item item) => new TakeDroppedItem(item);
}
