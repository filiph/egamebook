library stranded.fight.attacker_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_slashing_damage.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

part 'attacker_situation.g.dart';

/// Context given to [AttackerSituation] that describes which part
/// of the victim's body is being attacked (e.g. [neck]) or from which
/// direction the attack is coming from (e.g. [fromLeft]). In case the
/// attack is not targeting a specific body part, and isn't coming from
/// a well-defined direction, use [unspecified].
class AttackDirection extends EnumClass {
  /// The attack comes from the (attacker's) left.
  static const AttackDirection fromLeft = _$fromLeft;

  /// The attack comes from the (attacker's) right.
  static const AttackDirection fromRight = _$fromRight;

  /// The attack is directed at the target's primary (weapon-wielding) arm.
  static const AttackDirection primaryArm = _$primaryArm;

  /// The attack is directed at the target's secondary (shield-wielding) arm.
  static const AttackDirection secondaryArm = _$secondaryArm;

  static const AttackDirection neck = _$neck;

  static const AttackDirection leftLeg = _$leftLeg;

  static const AttackDirection rightLeg = _$rightLeg;

  static const AttackDirection leftEye = _$leftEye;

  static const AttackDirection rightEye = _$rightEye;

  static const AttackDirection torso = _$torso;

  static const AttackDirection head = _$head;

  /// The direction of attack is neither of the options above.
  ///
  /// This just means that the [AttackerSituation] doesn't care about the
  /// direction.
  static const AttackDirection unspecified = _$unspecified;

  static Serializer<AttackDirection> get serializer =>
      _$attackDirectionSerializer;

  static BuiltSet<AttackDirection> get values => _$attackDirectionValues;

  const AttackDirection._(String name) : super(name);

  BodyPartDesignation toBodyPartDesignation() {
    assert(
        this != AttackDirection.fromRight && this != AttackDirection.fromLeft,
        "This method only supports specific body targets.");

    switch (this) {
      case AttackDirection.primaryArm:
        return BodyPartDesignation.primaryArm;
      case AttackDirection.secondaryArm:
        return BodyPartDesignation.secondaryArm;
      case AttackDirection.leftLeg:
        return BodyPartDesignation.leftLeg;
      case AttackDirection.rightLeg:
        return BodyPartDesignation.rightLeg;
      case AttackDirection.neck:
        return BodyPartDesignation.neck;
      case AttackDirection.leftEye:
        return BodyPartDesignation.leftEye;
      case AttackDirection.rightEye:
        return BodyPartDesignation.rightEye;
      case AttackDirection.torso:
        return BodyPartDesignation.torso;
      case AttackDirection.head:
        return BodyPartDesignation.head;
    }

    throw new ArgumentError("Cannot convert $this, it's missing in "
        "the switch statement above");
  }

  static AttackDirection fromBodyPartDesignation(
      BodyPartDesignation designation) {
    switch (designation) {
      case BodyPartDesignation.torso:
        return AttackDirection.torso;
      case BodyPartDesignation.head:
        return AttackDirection.head;
      case BodyPartDesignation.primaryArm:
        return AttackDirection.primaryArm;
      case BodyPartDesignation.secondaryArm:
        return AttackDirection.secondaryArm;
      case BodyPartDesignation.leftLeg:
        return AttackDirection.leftLeg;
      case BodyPartDesignation.rightLeg:
        return AttackDirection.rightLeg;
      case BodyPartDesignation.neck:
        return AttackDirection.neck;
      case BodyPartDesignation.leftEye:
        return AttackDirection.leftEye;
      case BodyPartDesignation.rightEye:
        return AttackDirection.rightEye;
    }

    throw new StateError("Designation $designation wasn't covered by "
        "the switch statement above.");
  }

  /// Converts a slash direction from the simple [SlashDirection] enum
  /// to the serializable [AttackDirection] value-class.
  static AttackDirection fromSlashDirection(SlashDirection direction) {
    switch (direction) {
      case SlashDirection.left:
        return AttackDirection.fromLeft;
      case SlashDirection.right:
        return AttackDirection.fromRight;
    }
    throw new StateError(
        "Direction $direction wasn't covered by the switch statement above.");
  }

  static AttackDirection valueOf(String name) => _$valueOfAttackDirection(name);
}

/// Use this situation when there are two actors, [attacker] and [target],
/// who are in the process of resolving a single combat move.
///
/// This situation normally has only the actions that are finishing the move
/// (e.g. "finish slash") and are dealing the actual damage. The situation
/// is meant to be in a stack below a [DefenseSituation]. These defense
/// situations allow the [target] to avoid or reverse the attack, which
/// means that both the defense situation and this situation will be
/// popped from the [WorldState.situations] stack. If the defense is
/// unsuccessful, then only the defense situation will be popped, and
/// the attacker will be free to finish the move.
abstract class AttackerSituation extends Situation
    implements Built<AttackerSituation, AttackerSituationBuilder> {
  static Serializer<AttackerSituation> get serializer =>
      _$attackerSituationSerializer;

  factory AttackerSituation([void updates(AttackerSituationBuilder b)]) =
      _$AttackerSituation;

  factory AttackerSituation.initialized(
    int id,
    String situationName,
    Iterable<OtherActorAction> builtOtherActorActionGenerators,
    Iterable<EnemyTargetAction> builtEnemyTargetActionGenerators,
    Actor attacker,
    Actor target, {
    AttackDirection attackDirection: AttackDirection.unspecified,
  }) =>
      new AttackerSituation((b) => b
        ..id = id
        ..name = situationName
        ..builtOtherActorActionGenerators =
            new ListBuilder<OtherActorAction>(builtOtherActorActionGenerators)
        ..builtEnemyTargetActionGenerators =
            new ListBuilder<EnemyTargetAction>(builtEnemyTargetActionGenerators)
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..attackDirection = attackDirection);

  AttackerSituation._();

  @override
  List<Action<dynamic>> get actions =>
      new List<OtherActorActionBase>.from(builtOtherActorActionGenerators)
        ..addAll(builtEnemyTargetActionGenerators);

  AttackDirection get attackDirection;

  int get attacker;

  BuiltList<EnemyTargetAction> get builtEnemyTargetActionGenerators;

  BuiltList<OtherActorAction> get builtOtherActorActionGenerators;

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
