import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

EnemyTargetAction dodgeLeapBuilder(Actor enemy) => new DodgeLeap(enemy);

class DodgeLeap extends EnemyTargetAction {
  static const String className = "DodgeLeap";

  @override
  final String helpMessage = "Dodging means moving your body out of harm's "
      "way. When successful, your opponent will miss and will hit "
      "the ground beside you.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  DodgeLeap(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "dodge";

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
    final thread = getThreadId(sim, w, "LeapSituation");
    a.report(s, "<subject> tr<ies> to {dodge|sidestep}",
        actionThread: thread, isSupportiveActionInThread: true);
    if (a.isOffBalance) {
      a.report(s, "<subject> <is> out of balance",
          but: true, actionThread: thread, isSupportiveActionInThread: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
              but: true,
              actionThread: thread,
              isSupportiveActionInThread: true),
          () => a.report(s, "<subject> {<is> too slow|<is>n't fast enough}",
              but: true,
              actionThread: thread,
              isSupportiveActionInThread: true));
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
    final thread = getThreadId(sim, w, "LeapSituation");
    final ground = getGroundMaterial(w);
    a.report(s, "<subject> {dodge<s>|sidestep<s>} <object>",
        object: enemy, positive: true, actionThread: thread);
    enemy.report(s, "<subject> {crash<es> to|fall<s> to|hit<s>} the $ground",
        negative: true);
    w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} dodges ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) {
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    num enemyJumpedFromGroundBonus = enemy.isOnGround ? 0.2 : 0;
    if (a.isPlayer) {
      return 0.78 - outOfBalancePenalty + enemyJumpedFromGroundBonus;
    }
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(0.5 - outOfBalancePenalty + enemyJumpedFromGroundBonus);
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) => !a.isOnGround;
}
