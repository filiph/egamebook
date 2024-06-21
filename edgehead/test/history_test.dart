import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:test/test.dart';

import 'src/test_random.dart';

void main() {
  group("VisitHistory", () {
    const outsideName = "outside";
    final outside = Room(
        outsideName, emptyRoomDescription, emptyRoomDescription, null, null);
    final inside =
        Room("inside", emptyRoomDescription, emptyRoomDescription, null, null);
    final aren = Actor.initialized(42, testRandomIdGetter, "Aren",
        currentRoomName: outsideName);

    test("saves events in world state", () {
      final initialSituation =
          RoomRoamingSituation.initialized(1, outside, false);
      final WorldState world = WorldState((b) => b
        ..actors = ListBuilder<Actor>(<Actor>[aren])
        ..situations = ListBuilder<Situation>(<Situation>[initialSituation])
        ..statefulRandomState = 1337
        ..time = DateTime.utc(1000));
      expect(world.visitHistory.query(aren, outside).hasHappened, isFalse);
      expect(world.visitHistory.query(aren, inside).hasHappened, isFalse);
      final w = world.toBuilder();
      w.recordVisit(aren, outside, "somewhere");
      final updated = w.build();
      expect(updated.visitHistory.query(aren, outside).hasHappened, isTrue);
      expect(updated.visitHistory.query(aren, inside).hasHappened, isFalse);
    });
  });
}
