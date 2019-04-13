import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';

class Unconfuse extends Action<Null> {
  static final Unconfuse singleton = Unconfuse();

  static const String className = "Unconfuse";

  @override
  final String helpMessage = "";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = false;

  @override
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Null _) {
    Actor a = context.actor;
    WorldStateBuilder world = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> shake<s> <subject's> head violently");
    if (a.isPlayer) {
      s.add("the {horrible|terrible} spell seems to recede");
    }
    a.report(s, "<subject's> eyes regain focus and clarity",
        positive: true, endSentence: true);
    world.updateActorById(a.id, (b) => b..isConfused = false);
    return "${a.name} regains clarity";
  }

  @override
  List<String> get commandPathTemplate => ["Regain clarity"];

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Null _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world, Null _) {
    if (!actor.isConfused) return false;
    final timeSince = world.timeSinceLastActionRecord(
        actionName: Confuse.className, sufferer: actor, wasSuccess: true);
    return timeSince > Confuse.minimalEffectLength;
  }
}
