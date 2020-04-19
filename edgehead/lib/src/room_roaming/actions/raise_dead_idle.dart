import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/necromancy.dart';

/// Turns a corpse undead. To be used when we are roaming or in an idle room.
/// Use [TurnUndead] in combat.
class RaiseDeadIdle extends OtherActorActionBase {
  static final RaiseDeadIdle singleton = RaiseDeadIdle();

  static const String className = "RaiseDeadIdle";

  @override
  List<String> get commandPathTemplate =>
      ["<object's> corpse", "raise the dead"];

  @override
  String get helpMessage => "Raising the dead will make them fight for me.";

  @override
  bool get isAggressive => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(ActionContext context, Actor corpse) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor corpse) {
    final a = context.actor;
    final s = context.outputStoryline;
    final w = context.outputWorld;

    reportRaiseDead(a, s, corpse);
    w.recordCustom(CustomEvent.actorTurningUndead, actor: corpse);

    final raisedCorpse = raiseDead(a, corpse);
    w.updateActorById(corpse.id, (b) => b.replace(raisedCorpse));

    return "${a.name} turned ${corpse.name} undead (while roaming)";
  }

  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    final actor = context.actor;
    final w = context.world;
    final sim = context.simulation;

    final currentRoom =
        sim.getRoomParent(sim.getRoomByName(actor.currentRoomName));

    final corpses = w.actors.where((a) =>
        a.id != actor.id &&
        a.isActive &&
        !a.isAnimated &&
        sim.getRoomParent(sim.getRoomByName(a.currentRoomName)) == currentRoom);

    return corpses;
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor object) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor object) =>
      a.isPlayer && !isFollowedByAnUndead(c, a);
}
