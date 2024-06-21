library stranded.fight.attacker_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
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

  const AttackDirection._(super.name);

  BodyPartDesignation toBodyPartDesignation() {
    assert(
        this != AttackDirection.fromRight &&
            this != AttackDirection.fromLeft &&
            this != AttackDirection.unspecified,
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
      case AttackDirection.fromLeft: // Added just in case
      case AttackDirection.fromRight: // Added just in case
      case AttackDirection.unspecified: // Added just in case
        return BodyPartDesignation.torso;
      case AttackDirection.head:
        return BodyPartDesignation.head;
    }

    throw ArgumentError("Cannot convert $this, it's missing in "
        "the switch statement above");
  }

  static AttackDirection fromBodyPartDesignation(
      BodyPartDesignation? designation) {
    assert(
        designation != BodyPartDesignation.none &&
            designation != BodyPartDesignation.tail &&
            designation != BodyPartDesignation.teeth &&
            designation != BodyPartDesignation.primaryHand &&
            designation != BodyPartDesignation.secondaryHand,
        "Designation $designation doesn't correspond to any attack direction");

    switch (designation) {
      case BodyPartDesignation.torso:
      case BodyPartDesignation.none: // Added just in case.
      case BodyPartDesignation.tail: // Added just in case.
        return AttackDirection.torso;
      case BodyPartDesignation.head:
      case BodyPartDesignation.teeth: // Added just in case.
        return AttackDirection.head;
      case BodyPartDesignation.primaryArm:
      case BodyPartDesignation.primaryHand: // Added just in case.
        return AttackDirection.primaryArm;
      case BodyPartDesignation.secondaryArm:
      case BodyPartDesignation.secondaryHand: // Added just in case.
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

    throw StateError("Designation $designation wasn't covered by "
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
abstract class AttackerSituation extends Object
    with SituationBaseBehavior
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
    Actor target,
    String moveName, {
    AttackDirection attackDirection = AttackDirection.unspecified,
    String? additionalData,
  }) =>
      AttackerSituation((b) => b
        ..id = id
        ..name = situationName
        ..move = (MoveEntityBuilder()
          ..id = id * 31
          ..name = moveName
          ..firstOwnerId = attacker.id)
        ..builtOtherActorActionGenerators =
            ListBuilder<OtherActorAction>(builtOtherActorActionGenerators)
        ..builtEnemyTargetActionGenerators =
            ListBuilder<EnemyTargetAction>(builtEnemyTargetActionGenerators)
        ..turn = 0
        ..attacker = attacker.id
        ..target = target.id
        ..attackDirection = attackDirection
        ..additionalData = additionalData);

  AttackerSituation._();

  @override
  List<Action<dynamic>> get actions =>
      List<OtherActorActionBase>.from(builtOtherActorActionGenerators)
        ..addAll(builtEnemyTargetActionGenerators);

  /// Data or note that the situation can include.
  String? get additionalData;

  AttackDirection get attackDirection;

  int get attacker;

  BuiltList<EnemyTargetAction> get builtEnemyTargetActionGenerators;

  BuiltList<OtherActorAction> get builtOtherActorActionGenerators;

  @override
  int get id;

  MoveEntity get move;

  @override
  String get name;

  int get target;

  @override
  int get turn;

  @override
  AttackerSituation elapseTurn() => rebuild((b) => b.turn = b.turn! + 1);

  @override
  Iterable<Actor> getActors(_, WorldState w) =>
      w.actors.where((actor) => actor.id == attacker || actor.id == target);

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState w) {
    if (turn == 0) return ActorTurn.byId(attacker, w);
    return ActorTurn.never;
  }
}

abstract class MoveEntity extends Object
    with EntityBehavior
    implements Built<MoveEntity, MoveEntityBuilder>, Entity {
  static Serializer<MoveEntity> get serializer => _$moveEntitySerializer;

  factory MoveEntity([void Function(MoveEntityBuilder) updates]) = _$MoveEntity;

  MoveEntity._();

  /// Moves should not have adjectives.
  @override
  String? get adjective => null;

  @override
  int get id;

  /// Moves are abstract entities.
  @override
  bool get isCommon => true;

  @override
  bool get isActive => true;

  @override
  bool get isAnimated => true;

  @override
  bool get isPlayer => false;

  @override
  String get name;

  @override
  bool get nameIsProperNoun => false;

  @override
  Pronoun get pronoun => Pronoun.IT;

  @override
  Team get team => neutralTeam;

  static MoveEntity getFromAttackerSituation(WorldState w) {
    for (int i = w.situations.length - 1; i >= 0; i--) {
      if (w.situations[i] is AttackerSituation) {
        return (w.situations[i] as AttackerSituation).move;
      }
    }
    throw ArgumentError("No situation that is AttackerSituation found.");
  }
}
