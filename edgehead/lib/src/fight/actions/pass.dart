import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

class Pass extends Action<Nothing> {
  static final Pass singleton = Pass();

  static const String className = "Pass";

  @override
  final String helpMessage = "Sometimes, patience pays off. Especially when "
      "the other option is potentially dangerous.";

  @override
  final bool isAggressive = false;

  /// Pass is a way to respond to a counter-attack opportunity.
  /// If we ever have pass (or wait) as a thing that the actor can initiate
  /// on their `FightSituation` turn, then that needs to be separate,
  /// and with `isProactive == true`.
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
  String applySuccess(ActionContext context, void _) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    if (a.isPlayer) {
      a.report(s, "<subject> stand<s> off");
    }
    return "${a.name} passes the opportunity";
  }

  @override
  List<String> get commandPathTemplate => ["Stand off"];

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, void _) =>
      // For blind actors, we have PassUnseeing.
      !a.anatomy.isBlind;
}
