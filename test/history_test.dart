import 'package:edgehead/fractal_stories/history.dart';
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
    test("saves events", () {
      var history = new VisitHistory();
      history = history.add(new DateTime.utc(1000), 1, "forge");
      expect(history.query(1, "forge").hasHappened, isTrue);
    });

    XXX START HERE: use in worldState
  });
}
