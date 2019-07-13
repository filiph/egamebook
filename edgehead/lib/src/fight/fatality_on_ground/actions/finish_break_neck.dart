import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/humanoid_pain_or_death.dart';

class FinishBreakNeck extends OtherActorAction {
  static final FinishBreakNeck singleton = FinishBreakNeck();

  static const String className = "FinishBreakNeck";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final damage = enemy.hitpoints;
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    final updatedEnemy = w.getActorById(enemy.id);
    if (updatedEnemy.isInvincible) {
      // Special case for actors who cannot die.
      a.report(s, "<subject> smash<es> <object's> head to the ground",
          object: updatedEnemy, positive: true);
      inflictPain(context, updatedEnemy, damage);
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
    return "${a.name} breaks ${enemy.name}'s neck on ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      a.isBarehanded;
}
