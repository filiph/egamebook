import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';
import 'package:edgehead/writers_helpers.dart';

OtherActorAction finishBreakNeckBuilder(Actor enemy) =>
    new FinishBreakNeck(enemy);

class FinishBreakNeck extends OtherActorAction {
  static const String className = "FinishBreakNeck";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  FinishBreakNeck(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => null;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = target.hitpoints;
    w.updateActorById(target.id, (b) => b..hitpoints = 0);
    final updatedEnemy = w.getActorById(target.id);
    if (updatedEnemy.id == brianaId) {
      // Special case for Briana who cannot die.
      a.report(s, "<subject> smash<es> <object's> head to the ground",
          object: updatedEnemy, positive: true);
      reportPain(context, updatedEnemy, damage);
    } else {
      a.report(
          s,
          "<subject> break<s> "
          "<object's> "
          "neck" /* TODO: add variants */,
          object: updatedEnemy,
          positive: true);
      killHumanoid(context, updatedEnemy);
    }
    return "${a.name} breaks ${target.name}'s neck on ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) => true;
}
