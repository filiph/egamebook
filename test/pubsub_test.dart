import 'package:edgehead/ecs/pubsub.dart';
import 'package:test/test.dart';

void main() {
  group("type-safe", () {
    Pubsub<Channel, String> pubsub;

    List<String> messages;

    void record(String message) {
      messages.add(message);
    }

    setUp(() {
      pubsub = new Pubsub<Channel, String>();
      messages = [];
    });

    test("subscription works", () {
      pubsub.subscribe(Channel.one, record); // subscribes on channel one
      pubsub.publish(Channel.one, 'a message'); // prints out `a message`
      pubsub.unsubscribe(
          Channel.one, record); // unsubscribes from channel one
      pubsub.unsubscribe(
          Channel.two, record); // tries unsubscribing from channel two
      pubsub.publish(Channel.one, 'a second message'); // prints out nothing
      pubsub.subscribe(
          Channel.one, record); // subscribes again on channel one
      pubsub.publish(
          Channel.one, 'a third message'); // prints out `a third message`
      expect(messages, orderedEquals(['a message', 'a third message']));
    });
  });
}

enum Channel { one, two }
