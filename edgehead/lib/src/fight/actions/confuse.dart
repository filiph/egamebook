import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';

class Confuse extends EnemyTargetAction with CombatCommandPath {
  static const int minimalEffectLength = 8;

  static const String className = "Confuse";

  static final EnemyTargetAction singleton = Confuse();

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final String helpMessage = "A lesser known talent of necromancers is "
      "to channel visions of death to the target's mind. It makes "
      "the target rabid and disoriented. They might attack their own.";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.sanity;

  @override
  CombatCommandType get combatCommandType => CombatCommandType.mental;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> confuse <object>?";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> touch<es> <subject's> temple");
    a.report(
        s,
        "<subject> tr<ies> to {channel|implant} {terror|confusion} "
        "into <object's> mind",
        object: enemy);
    a.report(s, "<subject> fail<s>", negative: true, but: true);
    return "${a.name} fails to confuse ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    a.report(s, "<subject> touch<es> <subject's> temple");
    a.report(
        s,
        "<subject> {channel<s>|implant<s>} {terror|confusion} "
        "into <object's> mind",
        object: enemy,
        positive: true);
    enemy.report(s, "<subject's> eyes go wide with terror",
        negative: true, endSentence: true);
    w.updateActorById(
        enemy.id,
        (b) => b
          ..isConfused = true
          // Make the confused actor act immediately.
          // We need to go a long time into the past so that if one of the NPCs
          // (like Leroy) hasn't acted yet, they still go _after_ this actor.
          ..recoveringUntil = w.time.subtract(const Duration(hours: 10)));
    return "${a.name} confuses ${enemy.name}";
  }

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) =>
      "confuse";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState world, Actor enemy) {
    return const ReasonedSuccessChance<Object>(0.45);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, Actor enemy) =>
      a.isPlayer &&
      a.pose >= Pose.standing &&
      world.actors
              .where((o) =>
                  o.isAnimated &&
                  o.currentRoomName == a.currentRoomName &&
                  o.team.isFriendWith(enemy.team))
              .length >=
          2 &&
      !enemy.isConfused;
}
