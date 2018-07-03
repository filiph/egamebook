library stranded.fight.attacker_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

part 'attacker_situation.g.dart';

class AttackDirection extends EnumClass {
  /// The attack comes from the (attacker's) left.
  static const AttackDirection left = _$left;

  /// The attack comes from the (attacker's) right.
  static const AttackDirection right = _$right;

  /// The direction of attack is neither of the options above.
  ///
  /// This just means that the [AttackerSituation] doesn't care about the
  /// direction.
  static const AttackDirection unspecified = _$unspecified;

  static Serializer<AttackDirection> get serializer =>
      _$attackDirectionSerializer;

  static BuiltSet<AttackDirection> get values => _$attackDirectionValues;

  const AttackDirection._(String name) : super(name);

  static AttackDirection valueOf(String name) => _$valueOfAttackDirection(name);
}

abstract class AttackerSituation extends Situation
    implements Built<AttackerSituation, AttackerSituationBuilder> {
  static Serializer<AttackerSituation> get serializer =>
      _$attackerSituationSerializer;

  factory AttackerSituation([void updates(AttackerSituationBuilder b)]) =
      _$AttackerSituation;

  factory AttackerSituation.initialized(
    int id,
    String situationName,
    Iterable<OtherActorActionBuilder> builtOtherActorActionGenerators,
    Iterable<EnemyTargetActionBuilder> builtEnemyTargetActionGenerators,
    Actor attacker,
    Actor target, {
    AttackDirection attackDirection: AttackDirection.unspecified,
  }) =>
      new AttackerSituation((b) => b
        ..id = id
        ..name = situationName
        ..builtOtherActorActionGenerators =
            new ListBuilder<OtherActorActionBuilder>(
                builtOtherActorActionGenerators)
        ..builtEnemyTargetActionGenerators =
            new ListBuilder<EnemyTargetActionBuilder>(
                builtEnemyTargetActionGenerators)
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..attackDirection = attackDirection);

  AttackerSituation._();

  @override
  List<OtherActorActionBaseBuilder> get actionGenerators =>
      new List<OtherActorActionBaseBuilder>.from(
          builtOtherActorActionGenerators)
        ..addAll(builtEnemyTargetActionGenerators);

  AttackDirection get attackDirection;

  int get attacker;

  BuiltList<EnemyTargetActionBuilder> get builtEnemyTargetActionGenerators;

  BuiltList<OtherActorActionBuilder> get builtOtherActorActionGenerators;

  @override
  int get id;

  @override
  String get name;

  int get target;

  @override
  int get time;

  @override
  AttackerSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
