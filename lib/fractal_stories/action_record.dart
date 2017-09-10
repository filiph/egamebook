library stranded.action_record;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:meta/meta.dart';

import 'actor.dart';

part 'action_record.g.dart';

/// A record of some event action that transpired.
@immutable
abstract class ActionRecord
    implements Built<ActionRecord, ActionRecordBuilder> {
  factory ActionRecord([void updates(ActionRecordBuilder b)]) = _$ActionRecord;

  ActionRecord._();

  /// The other actors also responsible for this action, or an empty set if
  /// only the [protagonist] is to blame (default).
  ///
  /// IMPLEMENTATION DETAIL: Currently, there can be no accomplices.
  BuiltSet<int> get accomplices;

  String get actionName;

  /// Additional data that a specific type of [Action] could save.
  ///
  /// For example, a "VisitArea" action could save the unique name of the area
  /// visited, so that later the game can check whether an area has been
  /// seen by the player.
  @nullable
  String get dataString;

  String get description;

  /// The actors who know about this.
  KnownToMode get knownTo;

  /// The [Actor.id] of the protagonist. The single person responsible for
  /// this action.
  ///
  /// When set to `null`, it means "environment" is to blame.
  ///
  /// The actor is represented by his/her [Actor.id] since we only care about
  /// his/her identity, not his/her state at the time of action.
  int get protagonist;

  /// The actors that have been subjected to this action as targets.
  ///
  /// IMPLEMENTATION DETAIL: Currently, maximum one sufferer is ever added.
  /// In the future, we want to be able to have actions with broad effects.
  BuiltSet<int> get sufferers;

  /// Specifies at what WorldState time this ActionRecord took place.
  int get time;

  /// Specifies whether this action was _intentionally_ harmful towards
  /// the [sufferers].
  bool get wasAggressive;

  bool get wasFailure;

  /// Specifies whether this action was proactive (as opposed to being
  /// a reaction to another actor's action).
  bool get wasProactive;

  bool get wasSuccess;

  @override
  String toString() => "ActionRecord<$actionName, $description>";
}

enum KnownToMode { all, protagonistOnly, custom }
