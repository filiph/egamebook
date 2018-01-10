import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/pound.dart';

class RegainBalance extends Action {
  static final RegainBalance singleton = new RegainBalance();

  static const String className = "RegainBalance";

  @override
  final String helpMessage = "Most moves are easier and more effective when "
      "you are firmly in balance.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  String get command => "Regain balance.";

  @override
  String get name => className;

  @override
  String applyFailure(_) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (a.isPlayer) {
      a.report(s, "<subject> regain<s> <object>",
          object: balance, positive: true);
    }
    w.updateActorById(a.id, (b) => b.pose = Pose.standing);
    return "${a.name} regains balance";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w) =>
      "Will ${a.pronoun.nominative} regain balance?";

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world) =>
      a.isOffBalance;
}
