import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

class Pass extends Action {
  static final Pass singleton = new Pass();

  static const String className = "Pass";

  @override
  final String helpMessage = "Sometimes, patience pays off. Especially when "
      "the other option is potentially dangerous.";

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
  String get command => "Stand off.";

  @override
  String get name => className;

  @override
  String applyFailure(_) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    if (a.isPlayer) {
      a.report(s, "<subject> stand<s> off");
    }
    return "${a.name} passes the opportunity";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world) => true;
}
