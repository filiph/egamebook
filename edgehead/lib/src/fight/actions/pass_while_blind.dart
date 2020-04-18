import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';

/// An action that a completely blind actor can use when nothing else
/// is available.
class PassWhileBlind extends OtherActorAction {
  static final PassWhileBlind singleton = PassWhileBlind();

  static const String className = "PassWhileBlind";

  @override
  final String helpMessage = "When I don't see, there's not much to do.";

  @override
  final bool isAggressive = false;

  /// Pass is a way to (not) defend oneself from attacks.
  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = false;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  List<String> get commandPathTemplate => ["Stand there"];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;

    if (a.isPlayer) {
      a.report(s, "<subject> just stand<s> there, unseeing", endSentence: true);
    }
    return "${a.name} passes the opportunity to defend because he can't see";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    enemy.report(
        s,
        'despite attacking a completely blind target, '
        "<subject> miss<es> <subject's> mark.",
        negative: true,
        wholeSentence: true);

    w.popSituationsUntil("FightSituation", context);
    return "${a.name} avoid a move by pure chance";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, _) {
    if (w.currentSituation is! DefenseSituation) {
      return ReasonedSuccessChance.sureFailure;
    }
    final situation = w.currentSituation as DefenseSituation;
    return situation.predeterminedChance.or(ReasonedSuccessChance.sureFailure);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, _) =>
      a.anatomy.isBlind;
}
