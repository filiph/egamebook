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

  final int time;

  /// The [Actor.id] of the protagonist. The single person responsible for
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

  /// The actors who know about this.
  ///
  /// Actors are represented by their [Actor.id] since we only care about
  /// their identity, not their state at the time of action.
  final Set<int> knownTo;

  /// The changes to worldScore of the different people, regardless whether they
  /// know about it or not (we pretend they do, and see how that affects
  /// things).
  ///
  /// Actors are represented by their [Actor.id] since we only care about
  /// their identity, not their state at the time of action.
  final ActorMap<num> scoreChange;

  ActionRecord(int time, String actionName, String description,
      Actor protagonist, Iterable<Actor> knownTo, ActorMap<num> scoreChanges)
      : this._(
            time,
            actionName,
            description,
            protagonist.id,
            knownTo.map(_extractId).toSet(),
            new ActorMap<num>.from(scoreChanges));

  ActionRecord.duplicate(ActionRecord other)
      : this._(
            other.time,
            other.actionName,
            other.description,
            other.protagonist,
            new Set<int>.from(other.knownTo),
            new ActorMap<num>.from(other.scoreChange));

  ActionRecord._(this.time, this.actionName, this.description, this.protagonist,
      this.knownTo, this.scoreChange);

  @override
  int get hashCode {
    return hash4(
        time, description, hashObjects(performers), hashObjects(knownTo));
  }

  /// The actors responsible for this action, or an empty set if this is an
  /// environmental event (monkeys steal stuff).
  Set<int> get performers =>
      protagonist == null ? new Set.identity() : new Set.from([protagonist]);

  bool operator ==(o) => o is ActionRecord && hashCode == o.hashCode;

  String toString() => "ActionRecord<$actionName, $description>";
}

class ActionRecordBuilder {
  Actor _protagonist;
  String _description;
  ActorMap<num> _actorScoresBefore;
  KnownToMode _knownToMode = KnownToMode.ALL;
  WorldState _afterWorld;

  String actionName;

  int time = null;

  String get description => _description;
  set description(String value) {
    _description = value;
  }

  KnownToMode get knownToMode => _knownToMode;
  set knownToMode(KnownToMode value) {
    _knownToMode = value;
  }

  Actor get protagonist => _protagonist;
  set protagonist(Actor value) {
    _protagonist = value;
  }

  ActionRecord build() {
    assert(actionName != null);
    assert(_protagonist != null);
    assert(_actorScoresBefore != null);
    assert(_knownToMode != null);
    assert(_afterWorld != null);

    Set<Actor> knownTo;

    switch (_knownToMode) {
      case KnownToMode.ALL:
        knownTo = _afterWorld.actors;
        break;
      case KnownToMode.PROTAGONIST_ONLY:
        knownTo = new Set<Actor>.from(<Actor>[protagonist]);
        break;
      default:
        throw new UnimplementedError("Mode $_knownToMode not implemented");
    }

    ActorMap<num> scoreChanges = new ActorMap<num>();
    var actorsBeforeAndAfter = _afterWorld.actors
        .where((actor) => _actorScoresBefore.keys.contains(actor));
    for (Actor actor in actorsBeforeAndAfter) {
      scoreChanges[actor] =
          actor.scoreWorld(_afterWorld) - _actorScoresBefore[actor];
    }

    return new ActionRecord._(time, actionName, _description, _protagonist.id,
        knownTo.map(_extractId).toSet(), scoreChanges);
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

enum KnownToMode { ALL, PROTAGONIST_ONLY, CUSTOM }
