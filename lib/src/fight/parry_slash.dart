import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/counter_attack_situation.dart';

class ParrySlash extends EnemyTargetAction {
  ParrySlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "parry and counter";

  @override
  final String helpMessage = "Parrying means deflecting your opponent's move "
      "with your weapon. When successful, "
      "it will give you an opportunity for a counter attack. It won't "
      "throw your opponent off balance like dodging does, but it's also "
      "slightly easier to do.";

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
    a.report(
        s,
        "<subject> {parr<ies> it|"
        "meet<s> it with <subject's> ${a.currentWeapon.name}|"
        "fend<s> it off}",
        positive: true);
    w.popSituationsUntil("FightSituation");
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        new CounterAttackSituation.initialized(a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} parries ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    num outOfBalancePenalty = a.pose == Pose.standing ? 0 : 0.2;
    if (a.isPlayer) return 0.6 - outOfBalancePenalty;
    return 0.3 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState w) => a.wields(ItemType.SWORD);

  static EnemyTargetAction builder(Actor enemy) => new ParrySlash(enemy);
}
