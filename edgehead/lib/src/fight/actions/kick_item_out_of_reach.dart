import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class KickItemOutOfReach extends ItemAction {
  static const String className = "KickItemOutOfReach";

  static final KickItemOutOfReach singleton = KickItemOutOfReach();

  @override
  final bool isProactive = true;

  @override
  String get commandTemplate => "kick >> <object> >> out of reach";

  @override
  String get helpMessage => "Denies anyone to pick up the weapon. "
      "If you're worried that the item on the ground might spell trouble "
      "for you if it was picked up by the enemy, you can prevent it.";

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
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation = w.currentSituation as FightSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild((FightSituationBuilder b) => b
          ..droppedItems.remove(item)
          ..droppedItemsOutOfReach.add(item)));
    a.report(s, "<subject> kick<s> <object> out of reach", object: item);
    return "${a.name} kicks ${item.name} out of reach";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Item item) =>
      throw UnimplementedError();

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Item item) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Item item) {
    if (a.isOnGround) return false;
    if (a.hasCrippledArms) return false;
    return true;
  }
}
