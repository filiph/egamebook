import 'dart:async';

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:logging/logging.dart';

final _log = new Logger("PubSub");

class ActorKilledEvent {
  final Actor actor;
  final Actor perpetrator;

  ActorKilledEvent(this.actor, this.perpetrator);
}

class ActorLostHitpointsEvent {
  final Actor actor;
  final int hitpointsLost;

  ActorLostHitpointsEvent(this.actor, this.hitpointsLost);
}

class PubSub implements Sink<Object> {
  StreamController<ActorKilledEvent> _actorKilled;
  StreamController<ActorLostHitpointsEvent> _actorLostHitpoints;

  bool _sealed = false;

  PubSub() {
    _actorKilled = new StreamController<ActorKilledEvent>.broadcast(
        sync: true, onListen: _assertNoSubscribersAfterSealed);
    _actorLostHitpoints =
        new StreamController<ActorLostHitpointsEvent>.broadcast(
            sync: true, onListen: _assertNoSubscribersAfterSealed);
  }

  Stream<ActorKilledEvent> get actorKilled => _actorKilled.stream;

  Stream<ActorLostHitpointsEvent> get actorLostHitpoints =>
      _actorLostHitpoints.stream;

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
    _actorLostHitpoints.close();
  }

  void publishActorKilled(ActorKilledEvent e) {
    _assertSealedBeforePublishing();
    _log.info(() => "New $e about to be published.");
    _actorKilled.add(e);
  }

  void publishActorLostHitpoints(ActorLostHitpointsEvent e) {
    _assertSealedBeforePublishing();
    _log.info(() => "New $e about to be published.");
    _actorLostHitpoints.add(e);
  }

  void seal() {
    _sealed = true;
  }

  void _assertNoSubscribersAfterSealed() {
    assert(
        !_sealed, "Please do not add more subscribers after pubsub is sealed.");
  }

  void _assertSealedBeforePublishing() {
    assert(_sealed, "Please seal pubsub before publishing events.");
  }
}
