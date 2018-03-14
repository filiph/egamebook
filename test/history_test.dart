import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/history.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
//// Unique event
//w.customHistory.query(killed_agruth).hasHappened;  // == true/false
//
//// Rule event
//w.rulesHistory.query(42).hasHappened;
//
//// Action record
//w.actionHistory.query(culprit: a, wasSuccess: true).latest.time; // == DateTime
//
//// Visit event
//w.visitHistory.query(culprit: a, room: room, includingVariants: true).hasHappened; // == true/false

import 'package:test/test.dart';

void main() {
  group("VisitHistory", () {
    final _outsideName = "outside";
    final outside = new Room(_outsideName, emptyRoomDescription,
        emptyRoomDescription, null, null, []);
    final inside = new Room(
        "inside", emptyRoomDescription, emptyRoomDescription, null, null, []);
    final aren =
        new Actor.initialized(42, "Aren", currentRoomName: _outsideName);

    test("saves events in world state", () {
      final initialSituation =
          new RoomRoamingSituation.initialized(outside, false);
      final WorldState world = new WorldState((b) => b
        ..actors = new SetBuilder<Actor>(<Actor>[aren])
        ..situations = new ListBuilder<Situation>(<Situation>[initialSituation])
        ..global = ["bogus"]
        ..time = 0);
      expect(world.queryVisit(aren, outside).hasHappened, isFalse);
      expect(world.queryVisit(aren, inside).hasHappened, isFalse);
      final w = world.toBuilder();
      w.recordVisit(aren, outside);
      final updatedWorld = w.build();
      expect(updatedWorld.queryVisit(aren, outside).hasHappened, isTrue);
      expect(updatedWorld.queryVisit(aren, inside).hasHappened, isFalse);
    });
  });
}
