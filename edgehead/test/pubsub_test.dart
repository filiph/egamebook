import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:test/test.dart';

void main() {
  group("pubsub", () {
    PubSub pubsub;

    Actor aren = Actor.initialized(1, "Aren");

    Actor briana = Actor.initialized(2, "Briana");

    const sureSuccess = ReasonedSuccessChance.sureSuccess;

    List<ActorKilledEvent> events;

    /// A helper function to record the fact that an event was received.
    void _recordEventFired(ActorKilledEvent event) {
      events.add(event);
    }

    setUp(() {
      pubsub = PubSub();
      events = [];
    });

    tearDown(() {
      pubsub.close();
    });

    test("subscription works", () {
      pubsub.actorKilled.listen(_recordEventFired);
      pubsub.seal();
      final context = ActionContext(
          null, briana, null, null, pubsub, null, Storyline(), sureSuccess);
      pubsub.publishActorKilled(ActorKilledEvent(context, aren, briana));
      expect(events.length, 1);
      expect(events.single.actor, aren);
    });

    test("event doesn't fire when there are no listener", () {
      pubsub.seal();
      final context = ActionContext(
          null, briana, null, null, pubsub, null, Storyline(), sureSuccess);
      pubsub.publishActorKilled(ActorKilledEvent(context, aren, briana));
      expect(events.length, 0);
    });

    test("event doesn't fire after subscription cancelled", () {
      final sub = pubsub.actorKilled.listen(_recordEventFired);
      pubsub.seal();
      final context = ActionContext(
          null, briana, null, null, pubsub, null, Storyline(), sureSuccess);
      pubsub.publishActorKilled(ActorKilledEvent(context, aren, briana));
      sub.cancel();
      pubsub.publishActorKilled(ActorKilledEvent(context, briana, aren));
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
      pubsub.actorKilled.listen(_recordEventFired);
      pubsub.actorKilled.listen(secondRecord);
      pubsub.seal();
      final context = ActionContext(
          null, briana, null, null, pubsub, null, Storyline(), sureSuccess);
      pubsub.publishActorKilled(ActorKilledEvent(context, aren, briana));
    });
  });
}
