import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/cower.dart';
import 'package:edgehead/src/fight/actions/scramble.dart';
import 'package:edgehead/src/fight/actions/thrash_around_blind.dart';

class Wait extends Action<Nothing?> {
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
  final Resource? rerollResource = null;

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
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, void o) =>
      a.isPlayer &&
      // Don't allow waiting when there are no friendlies.
      getPartyOf(a, sim, world).length > 1 &&
      // Don't allow waiting if cowering, scrambling, or thrashing
      // around is an option.
      !Cower.singleton.isApplicable(c, a, sim, world, o) &&
      !Scramble.singleton.isApplicable(c, a, sim, world, o) &&
      !ThrashAroundBlind.singleton.isApplicable(c, a, sim, world, o);
}
