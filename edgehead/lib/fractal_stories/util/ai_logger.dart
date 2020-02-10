import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';

const _separator = ';';

/// Logs a world states and the score attached to it, in a way that can
/// be extracted for further study.
///
/// Adds a [consequence] considered by [actor]. The consequence was
/// scored by [score].
///
/// Please keep in sync with `tool/ai/extract.sh`.
String formatAiConsequence(
    Actor actor,
    PlanConsequence initial,
    Performance<dynamic> firstPerformance,
    PlanConsequence consequence,
    ActorScore score,
    ActorScoreChange scoreChange) {
  var buf = StringBuffer();
  buf.write('AI_CONSEQUENCE:');
  // ID of decision.
  buf.write('actor${actor?.id}-world${initial.world.hashCode}');
  buf.write(_separator);
  // Actor
  buf.write('${actor?.name} (${actor?.id})');
  buf.write(_separator);
  // Initial world hash
  buf.write(initial.world.hashCode);
  buf.write(_separator);
  // Initial world time
  buf.write(initial.world.time.toIso8601String());
  buf.write(_separator);
  // First action (the one being evaluated)
  buf.write(firstPerformance.action.name);
  buf.write(_separator);
  // Order (steps from first action to this one)
  buf.write(consequence.order);
  buf.write(_separator);
  // Actor who made the last action.
  buf.write('${consequence.performance.actor.name} '
      '(${consequence.performance.actor.id})');
  buf.write(_separator);
  // Action (the last action before getting to this state).
  buf.write(consequence.performance.action.name);
  buf.write(_separator);
  // Probability of the action;
  buf.write(consequence.probability);
  buf.write(_separator);
  // Was it a success?
  buf.write(consequence.successOrFailure);
  buf.write(_separator);
  // Cumulative probability (chance this end result occurs
  // after the first action)
  buf.write(consequence.cumulativeProbability);
  buf.write(_separator);
  // Time (of current consequence)
  buf.write(consequence.world.time.toIso8601String());
  buf.write(_separator);
  // Score of the current consequence.
  buf.write(score.toString());
  buf.write(_separator);
  {
    // Self score.
    buf.write(score.selfPreservation);
    buf.write(_separator);
    // Team score.
    buf.write(score.teamPreservation);
    buf.write(_separator);
    // Enemy score.
    buf.write(score.enemy);
    buf.write(_separator);
    // Variety score.
    buf.write(score.varietyOfAction);
    buf.write(_separator);
  }
  // Score change from initial world.
  buf.write(scoreChange.toString());
  buf.write(_separator);
  {
    // Self score change.
    buf.write(scoreChange.selfPreservation);
    buf.write(_separator);
    // Team score change.
    buf.write(scoreChange.teamPreservation);
    buf.write(_separator);
    // Enemy score change.
    buf.write(scoreChange.enemy);
    buf.write(_separator);
    // Variety score change.
    buf.write(scoreChange.varietyOfAction);
    buf.write(_separator);
  }
  // How we got here.
  buf.write(consequence.world.actionHistory.describe());
  buf.write(_separator);
  // World state.
  var uglified = consequence.world.toString().replaceAll('\n', '');
  buf.write(uglified);
  return buf.toString();
}
