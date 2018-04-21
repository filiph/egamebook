import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

EnemyTargetAction dodgeSlashBuilder(Actor enemy) => new DodgeSlash(enemy);

class DodgeSlash extends EnemyTargetAction {
  static const String className = "DodgeSlash";

  @override
  final String helpMessage = "Dodging means moving your body out of harm's "
      "way. When done correctly, it will throw your opponent off balance and "
      "it will open an opportunity for a counter attack. When botched, it "
      "can get you killed.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  DodgeSlash(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "dodge and counter";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> dodge?";

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
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
    w.popSituation(sim);
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> {dodge<s>|sidestep<s>} it",
        object: enemy, positive: true);
    if (enemy.isStanding) {
      enemy.report(s, "<subject> lose<s> balance because of that",
          endSentence: true, negative: true);
      w.updateActorById(enemy.id, (b) => b.pose = Pose.offBalance);
    }
    w.popSituationsUntil("FightSituation", sim);
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        new CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} dodges ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) {
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance.or(0.4 - outOfBalancePenalty);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      !a.isOnGround && enemy.currentWeapon.damageCapability.isSlashing;
}
