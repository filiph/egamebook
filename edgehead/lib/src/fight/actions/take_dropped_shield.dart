import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TakeDroppedShield extends ItemAction {
  static const String className = "TakeDroppedShield";

  static final TakeDroppedShield singleton = TakeDroppedShield();

  @override
  final bool isProactive = true;

  @override
  List<String> get commandPathTemplate =>
      const ["environment", "<object>", "pick up"];

  @override
  String get helpMessage => "A shield makes a huge difference in battle.";

  @override
  bool get isAggressive => false;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context, _) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Item item) {
    assert(item.isShield);
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation = w.currentSituation as FightSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild(
            (FightSituationBuilder b) => b..droppedItems.remove(item)));
    w.updateActorById(a.id, (b) => b..inventory.equipShield(item, a.anatomy));
    if (a.isOnGround) {
      a.report(s, "<subject> grab<s> <object>", object: item);
    } else {
      a.report(s, "<subject> pick<s> <object> up", object: item);
    }
    return "${a.name} picks up ${item.name}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Item _) =>
      throw UnimplementedError();

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Item _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Item item) {
    if (!item.isShield) return false;
    if (!a.anatomy.anyWeaponAppendageAvailable) return false;
    if (a.currentShield != null) return false;
    if (a.anatomy.isBlind) return false;
    return true;
  }
}
