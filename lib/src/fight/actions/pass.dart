import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

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
    WorldState world = context.world;
    Storyline s = context.storyline;
    if (a.isPlayer) {
      a.report(s, "<subject> stand<s> off");
    }
    return "${a.name} passes the opportunity";
  }

  @override
  String getRollReason(Actor a, WorldState w) => "WARNING this shouldn't be "
      "user-visible";

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor actor, WorldState world) => true;
}
