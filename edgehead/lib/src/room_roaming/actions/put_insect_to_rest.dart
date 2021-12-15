import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/necromancy.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class PutInsectToRest extends Action<String> {
  static final PutInsectToRest singleton = PutInsectToRest();

  static const String className = "PutInsectToRest";

  @override
  List<String> get commandPathTemplate => throw UnimplementedError();

  @override
  String get helpMessage => "I can put the undead to rest, "
      "undoing the unlife I created. "
      "I can only do this while in relative peace, not in combat.";

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => throw UnimplementedError();

  @override
  String applyFailure(ActionContext context, String _) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, String insectName) {
    final a = context.actor;
    final s = context.outputStoryline;
    final w = context.outputWorld;

    w.recordCustom(CustomEvent.actorPuttingInsectToRest,
        data: insectName, actor: a);

    final insect = Entity(
      name: insectName,
      adjective: 'undead',
      // We need to say that this entity is common, because we could have
      // two of these reports in the same storyline, and there could be
      // a clash of names. isCommon says that clashes are okay.
      isCommon: true,
    );

    a.report(s, "<subject> put<s> a hand on <object>", object: insect);
    insect.report(s, "<subject> collapse<s> to the ground");

    return "${a.name} put ${insect.name} to rest";
  }

  @override
  Iterable<String> generateObjects(ApplicabilityContext context) {
    final name = getUndeadInsectName(context);

    if (name != null) {
      return [name];
    }

    return const [];
  }

  @override
  List<String> getCommandPath(ApplicabilityContext context, String object) {
    return ["undead $object", "put to rest"];
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, String object) {
    throw UnimplementedError();
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, String object) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, String object) {
    // Much of the applicability happens in [generateObjects]. If we're here,
    // it means there's an insect we can put to rest.

    final situation = w.currentSituation as RoomRoamingSituation;
    final room = sim.getRoomByName(situation.currentRoomName);

    if (room.isSynthetic) return false;

    if (situation.monstersAlive && !room.fightIsOptional) {
      // Don't allow putting to rest when monsters in this room are still alive
      // and the fight isn't optional.
      return false;
    }

    if (!a.isPlayer) return false;

    return true;
  }
}
