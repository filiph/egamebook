import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';

class Scramble extends Action<Nothing> {
  static final Scramble singleton = Scramble();

  static const String className = "Scramble";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

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
    a.report(
        s,
        "<subject> tr<ies> to {scramble|crawl} "
        "out of {reach|harm's way}");
    return "${a.name} scrambles on ground";
  }

  @override
  List<String> get commandPathTemplate => ["Scramble"];

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "Will ${a.pronoun.nominative} crawl out of harm's way?";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, void _) {
    if (!a.isOnGround) return false;
    // Actor must have just fallen.
    if (recentlyForcedToGround(a, world)) return true;
    return false;
  }
}
