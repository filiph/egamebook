import 'dart:async';

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:logging/logging.dart';

final _log = new Logger("PubSub");

class ActorKilledEvent {
  final Actor actor;
  final Actor perpetrator;

  ActorKilledEvent(this.actor, this.perpetrator);
}

class PubSub implements Sink<Object> {
  StreamController<ActorKilledEvent> _actorKilled;

  PubSub() {
    _actorKilled = new StreamController<ActorKilledEvent>.broadcast(sync: true);
  }

  Stream<ActorKilledEvent> get actorKilled => _actorKilled.stream;

  /// Do not use.
  ///
  /// This is here to satisfy [Sink]'s contract. We implement [Sink] because
  /// we want to get the linter rule `close_sinks`.
  @override
  void add(Object data) {
    throw new UnimplementedError(
        "Please call the concrete publish___() methods.");
  }

  @override
  void close() {
    _log.info(() => "Closing pubsub");
    _actorKilled.close();
  }

  void publishActorKilled(ActorKilledEvent e) {
    _log.info(() => "New $e about to be published.");
    _actorKilled.add(e);
  }
}
