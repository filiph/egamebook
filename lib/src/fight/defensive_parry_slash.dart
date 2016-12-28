import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

class DefensiveParrySlash extends EnemyTargetActorAction {
  DefensiveParrySlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "step back and parry";

  @override
  String applyFailure(Actor a, WorldState _, Storyline s) {
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "meet it with <subject's> ${a.currentWeapon.name}|"
        "fend it off}");
    if (a.pose == Pose.offBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true));
    }
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    if (a.isPlayer) {
      a.report(s, "<subject> {step<s>|take<s> a step} back");
    }
    a.report(
        s,
        "<subject> {parr<ies> it|deflect<s> it|"
        "meet<s> it with <subject's> ${a.currentWeapon.name}|"
        "fend<s> it off}",
        positive: true);

    if (a.pose != Pose.standing) {
      w.updateActorById(a.id, (b) => b..pose = Pose.standing);
      if (a.isPlayer) {
        a.report(s, "<subject> regain<s> balance");
      }
    }
    w.popSituationsUntil("FightSituation");
    return "${a.name} steps back and parries ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    if (a.isPlayer) return 1.0;
    num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
    return 0.5 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState w) => a.wields(ItemType.SWORD);

  static EnemyTargetActorAction builder(Actor enemy) =>
      new DefensiveParrySlash(enemy);
}
