import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/punch/punch_defense/punch_defense_situation.dart';

class DodgePunch extends EnemyTargetAction {
  static const String className = "DodgePunch";

  @override
  final String helpMessage = "Dodging means moving your body out of harm's "
      "way.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  DodgePunch(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "dodge";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> dodge the fist?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    final thread = getThreadId(w, "PunchSituation");
    a.report(s, "<subject> tr<ies> to {dodge|sidestep|move out of the way}",
        actionThread: thread, isSupportiveActionInThread: true);
    Randomly.run(
        () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
            but: true, actionThread: thread, isSupportiveActionInThread: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a,
            but: true,
            actionThread: thread,
            isSupportiveActionInThread: true));
    w.popSituation();
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    final thread = getThreadId(w, "PunchSituation");
    a.report(s, "<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",
        object: enemy, positive: true, actionThread: thread);
    w.popSituationsUntil("FightSituation");
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        new CounterAttackSituation.initialized(a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} dodges punch from ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    PunchDefenseSituation situation = w.currentSituation;
    return situation.predeterminedChance.or(0.4 - outOfBalancePenalty);
  }

  @override
  bool isApplicable(Actor a, WorldState w) => true;

  static EnemyTargetAction builder(Actor enemy) => new DodgePunch(enemy);
}
