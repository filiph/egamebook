import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:test/test.dart';

void main() {
  group("VisitHistory", () {
    const _outsideName = "outside";
    final outside = Room(
        _outsideName, emptyRoomDescription, emptyRoomDescription, null, null);
    final inside =
        Room("inside", emptyRoomDescription, emptyRoomDescription, null, null);
    final aren = Actor.initialized(42, "Aren", currentRoomName: _outsideName);

    test("saves events in world state", () {
      final initialSituation =
          RoomRoamingSituation.initialized(1, outside, false);
      final WorldState world = WorldState((b) => b
        ..actors = SetBuilder<Actor>(<Actor>[aren])
        ..situations = ListBuilder<Situation>(<Situation>[initialSituation])
        ..global = ["bogus"]
        ..statefulRandomState = 1337
        ..time = DateTime.utc(1000));
      expect(world.visitHistory.query(aren, outside).hasHappened, isFalse);
      expect(world.visitHistory.query(aren, inside).hasHappened, isFalse);
      final w = world.toBuilder();
      w.recordVisit(aren, outside);
      final updated = w.build();
      expect(updated.visitHistory.query(aren, outside).hasHappened, isTrue);
      expect(updated.visitHistory.query(aren, inside).hasHappened, isFalse);
    });
  });
}
