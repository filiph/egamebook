import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/shield.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TakeDroppedShield extends ItemAction {
  static const String className = "TakeDroppedShield";

  TakeDroppedShield(Item item) : super(item);

  @override
  String get commandTemplate => "pick up <object>";

  @override
  String get helpMessage => "A shield makes a huge difference in battle.";

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
      b.currentShield = item as Shield;
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
    if (item is! Shield) return false;
    if (!a.canWield) return false;
    if (a.currentShield != null) return false;
    return true;
  }

  static ItemAction builder(Item item) => new TakeDroppedShield(item);
}
