// @dart=2.9

import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class DebugKillEnemies extends Action<Nothing> {
  static final DebugKillEnemies singleton = DebugKillEnemies();

  static const String className = "DebugKillEnemies";

  @override
  final String helpMessage = "For testers only. Just skips the whole fight.";

  @override
  final bool isAggressive = true;

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

    s.add(
        '(A demon called Debug appears '
        'and brings instant death to any of my enemies in this place.)',
        isRaw: true);

    final situation = context.world.currentSituation as FightSituation;
    final animatedEnemies = context.world.actors.where((e) =>
        e.isAnimatedAndActive &&
        !e.isInvincible &&
        (situation.enemyTeamIds.contains(e.id)));

    for (final enemy in animatedEnemies) {
      context.outputWorld.updateActorById(enemy.id, (b) => b.hitpoints = 0);
      killHumanoid(context, enemy.id);
    }

    final survivingEnemies = context.outputWorld.build().actors.where((e) =>
        e.isAnimatedAndActive && (situation.enemyTeamIds.contains(e.id)));
    if (survivingEnemies.isNotEmpty) {
      s.add(
          '(Actually, one or more enemies survived because of their '
          'temporary plot armor. Try again later.)',
          isRaw: true);
    }

    return "${a.name} debug-kill all enemies";
  }

  @override
  List<String> get commandPathTemplate => ["(DEBUG) Kill all enemies"];

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
          WorldState world, void _) =>
      a.isPlayer && (world.global as EdgeheadGlobalState).isInTesterMode;
}
