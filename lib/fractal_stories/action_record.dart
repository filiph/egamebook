library stranded.action_record;

import 'package:built_value/built_value.dart' show $jc, $jf;
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
  final KnownToMode knownTo;

  final bool wasSuccess;

  final bool wasFailure;

  final bool wasAggressive;

  Set<int> _performers;

  ActionRecord(
      int time,
      String actionName,
      String actionClass,
      String description,
      Actor protagonist,
      Iterable<Actor> sufferers,
      KnownToMode knownTo,
      bool wasSuccess,
      bool wasFailure,
      bool wasAggressive)
      : this._(
            time,
            actionName,
            actionClass,
            description,
            protagonist.id,
            sufferers.map(_extractId).toSet(),
            knownTo,
            wasSuccess,
            wasFailure,
            wasAggressive);

  ActionRecord.duplicate(ActionRecord other)
      : this._(
            other.time,
            other.actionName,
            other.actionClass,
            other.description,
            other.protagonist,
            new Set<int>.from(other.sufferers),
            other.knownTo,
            other.wasSuccess,
            other.wasFailure,
            other.wasAggressive);

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
      this.wasAggressive) {
    _performers =
        protagonist == null ? new Set.identity() : new Set.from([protagonist]);
  }

  @override
  int get hashCode {
    return $jf($jc(
        $jc(
            $jc(
                $jc(
                    $jc($jc($jc(0, time.hashCode), description.hashCode),
                        hashObjects(performers)),
                    hashObjects(sufferers)),
                knownTo.hashCode),
            wasSuccess.hashCode),
        wasFailure.hashCode));
  }

  /// The actors responsible for this action, or an empty set if this is an
  /// environmental event (monkeys steal stuff).
  Set<int> get performers => _performers;

  @override
  bool operator ==(Object o) => o is ActionRecord && hashCode == o.hashCode;

  @override
  String toString() => "ActionRecord<$actionClass, $actionName, $description>";
}

class ActionRecordBuilder {
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
    assert(knownToMode != null);
    assert(_afterWorld != null);
    assert(wasSuccess != null);
    assert(wasFailure != null);

    return new ActionRecord._(
        time,
        actionName,
        actionClass,
        description,
        protagonist.id,
        sufferers.map(_extractId).toSet(),
        knownToMode,
        wasSuccess,
        wasFailure,
        wasAggressive);
  }

  void markAfterAction(WorldState world) {
    _afterWorld = world;
  }

  void markBeforeAction(WorldState world) {
    // Unneeded, because we don't compute scoreChanges anymore.
  }
}

enum KnownToMode { all, protagonistOnly, custom }
