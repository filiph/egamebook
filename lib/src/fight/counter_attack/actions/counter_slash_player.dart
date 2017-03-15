import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class CounterSlashPlayer extends CounterSlash {
  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.stamina;

  CounterSlashPlayer(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "swing back at <object>";

  @override
  String get rollReasonTemplate => "will <subject> hit <objectPronoun>?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> tr<ies> to swing back");
    a.report(s, "<subject> {go<es> wide|miss<es>}", but: true, negative: true);
    if (a.isStanding) {
      w.updateActorById(a.id, (b) => b..pose = Pose.offBalance);
      a.report(s, "<subject> lose<s> balance because of that",
          negative: true, endSentence: true);
    } else if (a.isOffBalance) {
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
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy,
        predeterminedResult: Predetermination.failureGuaranteed);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} swings successfully back at ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) =>
      enemy.isStanding ? 0.7 : 0.9;

  @override
  bool isApplicable(Actor a, WorldState w) =>
      a.isPlayer && a.wields(ItemType.sword) && !a.isOnGround;

  static EnemyTargetAction builder(Actor enemy) =>
      new CounterSlashPlayer(enemy);
}
