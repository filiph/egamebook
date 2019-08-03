import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_punch.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';

class DodgePunch extends OtherActorAction {
  static final DodgePunch singleton = DodgePunch();

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

  @override
  List<String> get commandPathTemplate => ["dodge"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> dodge the fist?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, "PunchSituation");
    a.report(s, "<subject> tr<ies> to {dodge|sidestep|move out of the way}",
        actionThread: thread);
    Randomly.run(
        () => a.report(s, "<subject> {can't|fail<s>|<does>n't succeed}",
            but: true, actionThread: thread),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true, actionThread: thread));
    w.popSituation(sim);
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, "PunchSituation");
    a.report(s, "<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",
        object: enemy, positive: true, actionThread: thread);

    // Summary
    a.report(s, "<subject> {dodge<s>|sidestep<s>} <objectOwner's> <object>",
        objectOwner: enemy,
        object: MoveEntity.getFromAttackerSituation(context.world),
        positive: true,
        actionThread: thread,
        replacesThread: true);

    w.popSituationsUntil("FightSituation", sim);
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        CounterAttackSituation.initialized(w.randomInt(), a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} dodges punch from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeStartPunch(enemy, sim, w, a).inverted());
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
