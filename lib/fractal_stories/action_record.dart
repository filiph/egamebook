library stranded.action_record;

import 'package:quiver/core.dart';

import 'actor.dart';
import 'world.dart';

int _extractId(Actor actor) => actor.id;

/// A record of some event action that transpired.
///
/// Every action gets ActionRecord which says who did that action (some strings
/// like '<subject> built a shelter'), who knows about it, and how that action
/// changed everyone's worldScore (or _would have changed_ worldScore if that
/// person knew about it).
///
/// SpecialEvent (monkeys steal food) is a type of Action (where
/// `performers == null`) that also get ActionRecords.
///
/// Everyone's stance (gratitude <-> dislike) towards everyone else is computed
/// by:
///
/// - getting default stance (0.0)
/// - applying personal bias (optimist, pesimist)
/// - applying all `ActionRecord`s that the subject knows about that the other
///   person is responsible for
class ActionRecord {
  final String description;

  final String actionName;

  final String actionClass;

  final int time;

  /// The [Actor.id] of the protagonist. The single person responsible for
  /// this action.
  ///
  /// When set to `null`, it means "environment" is to blame.
  ///
  /// The actor is represented by his/her [Actor.id] since we only care about
  /// his/her identity, not his/her state at the time of action.
  final int protagonist;

  /// The other actors responsible for this ActionRecord.
  ///
  /// IMPLEMENTATION DETAIL: Currently, there can be no accomplices.
  final Set<int> accomplices = new Set<int>();

  /// The actors that have been subjected to this action as targets.
  ///
  /// IMPLEMENTATION DETAIL: Currently, maximum one sufferer is ever added.
  /// In the future, we want to be able to have actions with broad effects.
  final Set<int> sufferers;

  /// The actors who know about this.
  ///
  /// Actors are represented by their [Actor.id] since we only care about
  /// their identity, not their state at the time of action.
  final Set<int> knownTo;

  final bool wasSuccess;

  final bool wasFailure;

  final bool wasAggressive;

  /// The changes to worldScore of the different people, regardless whether they
  /// know about it or not (we pretend they do, and see how that affects
  /// things).
  ///
  /// Actors are represented by their [Actor.id] since we only care about
  /// their identity, not their state at the time of action.
  final ActorMap<num> scoreChange;

  ActionRecord(
      int time,
      String actionName,
      String actionClass,
      String description,
      Actor protagonist,
      Iterable<Actor> sufferers,
      Iterable<Actor> knownTo,
      bool wasSuccess,
      bool wasFailure,
      bool wasAggressive,
      ActorMap<num> scoreChanges)
      : this._(
            time,
            actionName,
            actionClass,
            description,
            protagonist.id,
            sufferers.map(_extractId).toSet(),
            knownTo.map(_extractId).toSet(),
            wasSuccess,
            wasFailure,
            wasAggressive,
            new ActorMap<num>.from(scoreChanges));

  ActionRecord.duplicate(ActionRecord other)
      : this._(
            other.time,
            other.actionName,
            other.actionClass,
            other.description,
            other.protagonist,
            new Set<int>.from(other.sufferers),
            new Set<int>.from(other.knownTo),
            other.wasSuccess,
            other.wasFailure,
            other.wasAggressive,
            new ActorMap<num>.from(other.scoreChange));

  ActionRecord._(
      this.time,
      this.actionName,
      this.actionClass,
      this.description,
      this.protagonist,
      this.sufferers,
      this.knownTo,
      this.wasSuccess,
      this.wasFailure,
      this.wasAggressive,
      this.scoreChange);

  @override
  int get hashCode {
    return hashObjects([
      time,
      description,
      hashObjects(performers),
      hashObjects(sufferers),
      hashObjects(knownTo),
      wasSuccess,
      wasFailure
    ]);
  }

  /// The actors responsible for this action, or an empty set if this is an
  /// environmental event (monkeys steal stuff).
  Set<int> get performers =>
      protagonist == null ? new Set.identity() : new Set.from([protagonist]);

  @override
  bool operator ==(Object o) => o is ActionRecord && hashCode == o.hashCode;

  @override
  String toString() => "ActionRecord<$actionClass, $actionName, $description>";
}

class ActionRecordBuilder {
  ActorMap<num> _actorScoresBefore;

  WorldState _afterWorld;

  Set<Actor> sufferers;

  String actionName;

  String actionClass;

  bool wasSuccess;

  bool wasFailure;

  bool wasAggressive;

  int time;

  String description;

  KnownToMode knownToMode = KnownToMode.all;

  Actor protagonist;

  ActionRecord build() {
    assert(actionName != null);
    assert(protagonist != null);
    assert(_actorScoresBefore != null);
    assert(knownToMode != null);
    assert(_afterWorld != null);
    assert(wasSuccess != null);
    assert(wasFailure != null);

    Set<Actor> knownTo;

    switch (knownToMode) {
      case KnownToMode.all:
        knownTo = _afterWorld.actors;
        break;
      case KnownToMode.protagonistOnly:
        knownTo = new Set<Actor>.from(<Actor>[protagonist]);
        break;
      default:
        throw new UnimplementedError("Mode $knownToMode not implemented");
    }

    ActorMap<num> scoreChanges = new ActorMap<num>();
    var actorsBeforeAndAfter = _afterWorld.actors
        .where((actor) => _actorScoresBefore.keys.contains(actor));
    for (Actor actor in actorsBeforeAndAfter) {
      scoreChanges[actor] =
          actor.scoreWorld(_afterWorld) - _actorScoresBefore[actor];
    }

    return new ActionRecord._(
        time,
        actionName,
        actionClass,
        description,
        protagonist.id,
        sufferers.map(_extractId).toSet(),
        knownTo.map(_extractId).toSet(),
        wasSuccess,
        wasFailure,
        wasAggressive,
        scoreChanges);
  }

  void markAfterAction(WorldState world) {
    _afterWorld = world;
  }

  void markBeforeAction(WorldState world) {
    _actorScoresBefore = new ActorMap<num>();
    for (var a in world.actors) {
      _actorScoresBefore[a] = a.scoreWorld(world);
    }
  }
}

enum KnownToMode { all, protagonistOnly, custom }
