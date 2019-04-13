import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_feint_slash.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/feint/feint_situation.dart';

class WithstandFeint extends OtherActorAction {
  static final WithstandFeint singleton = WithstandFeint();

  static const String className = "WithstandFeint";

  @override
  final String helpMessage = "The weak attack is clearly meant to throw you "
      "off balance, and isn't actually a threat. By playing along with "
      "the bluff, it's easier to keep your stance.";

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
  String get rollReasonTemplate => "will <subject> withstand the feint?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    w.popSituation(sim);
    return "${a.name} fails to withstands a feint from ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final thread = getThreadId(sim, w, feintSituationName);
    a.report(s, "<subject> <is>n't fooled", actionThread: thread);
    a.report(
        s,
        "<subject> {retain<s>|keep<s>} "
        "<subject's> {stance|footing}",
        positive: true,
        actionThread: thread);
    w.popSituationsUntil("FightSituation", sim);
    return "${a.name} withstands a feint from ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance
        .or(computeStartFeint(enemy, sim, w, a).inverted());
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      !a.anatomy.isBlind;
}
