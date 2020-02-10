import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class TakeApproachAction extends Action<Approach> {
  static const String className = "TakeApproachAction";

  static final TakeApproachAction singleton = TakeApproachAction();

  @override
  List<String> get commandPathTemplate =>
      throw UnimplementedError('This action overrides getCommandPath().');

  @override
  String get helpMessage => null;

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
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context, Approach approach) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Approach approach) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    if (approach.description != null) {
      approach.description(context);
    }

    (w.currentSituation as RoomRoamingSituation)
        .moveActor(context, approach.to);

    return "${a.name} went through approach to ${approach.to}";
  }

  @override
  Iterable<Approach> generateObjects(ApplicabilityContext context) {
    final situation = context.world.currentSituation as RoomRoamingSituation;
    var room = context.simulation.getRoomByName(situation.currentRoomName);

    var approaches = context.simulation
        .getAvailableApproaches(room, context)
        .toList(growable: false);

    assert(approaches.every((a) => !a.isImplicit) || approaches.length == 1,
        "You can have only one implicit approach: $approaches");
    return approaches;
  }

  /// [TakeApproach] returns the path from the current position to
  /// [Approach.to], as a list of coordinates.
  ///
  /// For example, `[0, 0, 10, 5, 100, 100]` is a path from (0, 0)
  /// through (10, 5) to (100, 100).
  @override
  List<int> getAdditionalData(ApplicabilityContext context, Approach approach) {
    if (isImplicit) {
      return const [];
    }

    final situation = context.world.currentSituation as RoomRoamingSituation;
    final currentRoom =
        context.simulation.getRoomByName(situation.currentRoomName);

    if (currentRoom.positionX == null || currentRoom.positionY == null) {
      // TODO: if possible, get rid of these rooms altogether
      return const [];
    }

    assert(currentRoom.positionX != null, "no position for $currentRoom");
    assert(currentRoom.positionY != null);

    final destinationRoom = context.simulation.getRoomByName(approach.to);

    if (destinationRoom.positionX == null ||
        destinationRoom.positionY == null) {
      // TODO: if possible, get rid of these rooms altogether
      return const [];
    }

    assert(
        destinationRoom.positionX != null, "no position for $destinationRoom");
    assert(destinationRoom.positionY != null);

    return [
      currentRoom.positionX,
      currentRoom.positionY,
      destinationRoom.positionX,
      destinationRoom.positionY,
    ];
  }

  /// When the writer specifies a command with " >> " in it, this will
  /// automatically create a command path.
  ///
  /// For example, "go >> upper door".
  @override
  List<String> getCommandPath(
          ApplicabilityContext context, Approach approach) =>
      approach.command.split(' >> ');

  @override
  String getRollReason(
          Actor a, Simulation sim, WorldState w, Approach approach) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Approach approach) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Approach approach) {
    if (approach.isImplicit) {
      // Implicit approaches are covered by TakeImplicitApproachAction.
      return false;
    }

    if ((w.currentSituation as RoomRoamingSituation).monstersAlive) {
      // Don't allow exit taking when monsters in this room are still alive.
      return false;
    }

    if (approach.isApplicable != null) {
      return approach.isApplicable(c);
    }

    return true;
  }
}
