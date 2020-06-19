import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

final Map<int, bool Function(ActionContext)> edgeheadActorDescribeOverrides = {
  tamaraId: _tamaraOverrides,
  katId: _katOverrides,
  miguelId: _miguelOverrides,
};

bool _isFirstVisitToPyramidEntrance(ActionContext context) {
  final roomName =
      (context.world.currentSituation as RoomRoamingSituation).currentRoomName;
  if (roomName != 'pyramid_entrance') return false;
  final room = context.simulation.getRoomByName(roomName);
  final hasVisitedAnyVariant = context.world.visitHistory
      .query(context.actor, room, includeVariants: true)
      .hasHappened;
  return !hasVisitedAnyVariant;
}

bool _katOverrides(ActionContext context) {
  if (_isFirstVisitToPyramidEntrance(context)) {
    return true;
  }

  return false;
}

bool _miguelOverrides(ActionContext context) {
  if (_isFirstVisitToPyramidEntrance(context)) {
    return true;
  }

  return false;
}

bool _tamaraOverrides(ActionContext context) {
  // Never describe Tamara's presence.
  return true;
}
