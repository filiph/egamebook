import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_clash.dart';
import 'package:edgehead/src/fight/clash/clash_situation.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

class WithstandClash extends OtherActorAction {
  static final WithstandClash singleton = WithstandClash();

  static const String className = "WithstandClash";

  @override
  final String helpMessage = "The attack is targetted at my weapon, "
      "not my body. The strong slash is intended to force me off balance. "
      "By playing along with the bluff, it's easier to keep my stance.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  /// "Let him".
  @override
  List<String> get commandPathTemplate => ["let <objectPronounAccusative>"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> withstand the clash?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;

    w.popSituation(context);
    return "${a.name} fails to withstands a clash from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, clashSituationName);
    a.report(
        s,
        "<subject> {retain<s>|keep<s>} "
        "<subject's> {{combat |}stance|footing}",
        positive: true,
        actionThread: thread);

    w.popSituationsUntil("FightSituation", context);
    return "${a.name} withstands a clash from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation! as DefenseSituation;
    return situation.predeterminedChance
        .or(computeStartClash(enemy, sim, w, a).inverted());
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      true;
}
