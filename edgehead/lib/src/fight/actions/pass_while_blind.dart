import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

class PassWhileBlind extends Action<Null> {
  static final PassWhileBlind singleton = PassWhileBlind();

  static const String className = "PassWhileBlind";

  @override
  final String helpMessage = "When you don't see, there's not much to do.";

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
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Null _) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    if (a.isPlayer) {
      a.report(s, "<subject> just stand<s> there, unseeing", endSentence: true);
    }
    return "${a.name} passes the opportunity to defend because he can't see";
  }

  @override
  String getCommand(Null _) => "Stand there.";

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Null _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world, Null _) =>
      actor.anatomy.isBlind;
}
