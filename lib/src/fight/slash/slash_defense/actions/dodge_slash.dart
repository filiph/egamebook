import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';

class DodgeSlash extends EnemyTargetAction {
  @override
  final String helpMessage = "Dodging means moving your body out of harm's "
      "way. When done correctly, it will throw your opponent off balance and "
      "it will open an opportunity for a counter attack. When botched, it "
      "can get you killed.";

  @override
  final bool isAggressive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  DodgeSlash(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "dodge and counter";

  @override
  String get rollReasonTemplate => "will <subject> dodge?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> tr<ies> to {dodge|sidestep}");
    if (a.isOffBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
              but: true),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true));
    }
    w.popSituation();
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> {dodge<s>|sidestep<s>} it",
        object: enemy, positive: true);
    if (enemy.isStanding) {
      enemy.report(s, "<subject> lose<s> balance because of that",
          endSentence: true, negative: true);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
    }
    w.popSituationsUntil("FightSituation");
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        new CounterAttackSituation.initialized(a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} dodges ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    SlashDefenseSituation situation = w.currentSituation;
    if (situation.actionsGuaranteedToFail) {
      return 0.0;
    }
    if (situation.actionsGuaranteedToSucceed) {
      return 1.0;
    }
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    return 0.4 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState w) => !a.isOnGround;

  static EnemyTargetAction builder(Actor enemy) => new DodgeSlash(enemy);
}
