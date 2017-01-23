import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';

class CounterSlash extends EnemyTargetAction {
  @override
  final String helpMessage = "You can deal serious damage when countering "
      "because your opponent is often caught off guard. On the other hand, "
      "counters require fast reaction and could throw you out of balance.";

  CounterSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "swing back at <object>";

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> tr<ies> to swing back");
    a.report(s, "<subject> {go<es> wide|miss<es>}", but: true, negative: true);
    if (a.pose == Pose.standing) {
      w.updateActorById(a.id, (b) => b..pose = Pose.offBalance);
      a.report(s, "<subject> lose<s> balance because of that",
          negative: true, endSentence: true);
    } else if (a.pose == Pose.offBalance) {
      w.updateActorById(a.id, (b) => b..pose = Pose.onGround);
      a.report(s, "<subject> lose<s> balance because of that", negative: true);
      a.report(s, "<subject> fall<s> to the ground",
          negative: true, endSentence: true);
    }
    return "${a.name} fails to swing back at ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> swing<s> back at <object>",
        object: enemy, positive: true);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} swings back at ${enemy.name}";
  }

  @override
  String getRollReason(Actor a, WorldState w) {
    if (a.pose == Pose.standing) {
      return "Will ${a.pronoun.nominative} keep ${a.pronoun.genitive} balance?";
    }
    assert(a.pose == Pose.offBalance);
    return "Will ${a.pronoun.nominative} keep on ${a.pronoun.genitive} feet?";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) =>
      enemy.pose == Pose.standing ? 0.7 : 0.9;

  @override
  bool isApplicable(Actor a, WorldState w) =>
      a.wields(ItemType.sword) && a.pose != Pose.onGround;

  static EnemyTargetAction builder(Actor enemy) => new CounterSlash(enemy);
}
