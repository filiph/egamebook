import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

class Wait extends Action<Nothing> {
  static final Wait singleton = Wait();

  static const String className = "Wait";

  @override
  final String helpMessage = "Maybe things will sort themselves out.";

  @override
  final bool isAggressive = false;

  /// You _pro-actively_ choose to do nothing. It's not a reaction to anything.
  @override
  final bool isProactive = true;

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
      a.report(s, "<subject> wait<s>");
    }
    return "${a.name} waits";
  }

  @override
  List<String> get commandPathTemplate => ["self", "wait"];

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world, void _) =>
      actor.isPlayer &&
      // Don't allow waiting when there are no friendlies.
      getPartyOf(actor, sim, world).length > 1;
}
