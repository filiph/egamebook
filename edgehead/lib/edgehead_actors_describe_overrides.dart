// @dart=2.9

import 'package:edgehead/edgehead_facts_strings.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:edgehead/writers_context_extensions.dart';

final Map<int, bool Function(ActionContext)> edgeheadActorDescribeOverrides = {
  tamaraId: _tamaraOverrides,
  katId: _katOverrides,
  miguelId: _miguelOverrides,
  leroyId: _leroyOverrides,
};

bool _isFirstVisitToPyramidEntrance(ActionContext c) {
  final roomName =
      (c.world.currentSituation as RoomRoamingSituation).currentRoomName;
  if (roomName != 'pyramid_entrance') return false;
  final room = c.simulation.getRoomByName(roomName);
  final hasVisitedAnyVariant = c.world.visitHistory
      .query(c.actor, room, includeVariants: true)
      .hasHappened;
  return !hasVisitedAnyVariant;
}

bool _katOverrides(ActionContext c) {
  if (_isFirstVisitToPyramidEntrance(c)) {
    return true;
  }

  return false;
}

bool _leroyOverrides(ActionContext c) {
  if (!c.knows(kbLeroy)) {
    // Don't show Leroy before we actually learn about him.
    return true;
  }

  return false;
}

bool _miguelOverrides(ActionContext c) {
  if (_isFirstVisitToPyramidEntrance(c)) {
    return true;
  }

  return false;
}

bool _tamaraOverrides(ActionContext c) {
  // Never describe Tamara's presence.
  return true;
}
