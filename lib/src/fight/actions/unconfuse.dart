import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';

class Unconfuse extends Action {
  static final Unconfuse singleton = new Unconfuse();

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
  String get command => "Regain clarity.";

  @override
  String get name => className;

  @override
  String applyFailure(_) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
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
  String getRollReason(Actor a, Simulation sim, WorldState w) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world) {
    if (!actor.isConfused) return false;
    final timeSince = world.timeSinceLastActionRecord(
        actionName: Confuse.className, sufferer: actor, wasSuccess: true);
    return timeSince > Confuse.minimalEffectLength;
  }
}
