import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:test/test.dart';

void main() {
  group("pubsub", () {
    PubSub pubsub;

    Actor aren = new Actor.initialized(1, "Aren");

    Actor briana = new Actor.initialized(2, "Briana");

    List<ActorKilledEvent> events;

    void record(ActorKilledEvent event) {
      events.add(event);
    }

    setUp(() {
      pubsub = new PubSub();
      events = [];
    });

    tearDown(() {
      pubsub.close();
    });

    test("subscription works", () {
      pubsub.actorKilled.listen(record);
      pubsub.publishActorKilled(new ActorKilledEvent(aren, briana));
      expect(events.length, 1);
      expect(events.single.actor, aren);
    });

    test("event doesn't fire when there are no listener", () {
      pubsub.publishActorKilled(new ActorKilledEvent(aren, briana));
      pubsub.actorKilled.listen(record);
      expect(events.length, 0);
    });

    test("event doesn't fire after subscription cancelled", () {
      final sub = pubsub.actorKilled.listen(record);
      pubsub.publishActorKilled(new ActorKilledEvent(aren, briana));
      sub.cancel();
      pubsub.publishActorKilled(new ActorKilledEvent(briana, aren));
      expect(events.length, 1);
      expect(events.single.actor, aren);
    });

    test("event broadcasted to listeners in order of subscription", () {
      void zerothRecord(ActorKilledEvent event) {
        // The [record] function shouldn't have fired yet.
        expect(events, isEmpty);
      }

      void secondRecord(ActorKilledEvent event) {
        // The [record] function should have recorded this same event just now.
        expect(events.last.actor, event.actor);
        expect(events.last.perpetrator, event.perpetrator);
      }

      pubsub.actorKilled.listen(zerothRecord);
      pubsub.actorKilled.listen(record);
      pubsub.actorKilled.listen(secondRecord);
      pubsub.publishActorKilled(new ActorKilledEvent(aren, briana));
    });
  });
}
