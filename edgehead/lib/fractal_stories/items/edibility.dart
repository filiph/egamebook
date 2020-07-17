library fractal_stories.items.edibility;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/actor.dart';

part 'edibility.g.dart';

/// A data class that stores information about an [Item]'s edibility.
///
/// In other words, what are the effects the item will have on the actor
/// when eaten? Can the item be eaten at all?
abstract class Edibility implements Built<Edibility, EdibilityBuilder> {
  /// Something inedible by most humanoids. The default for items.
  static final Edibility inedible = Edibility((b) => b
    ..isEdibleByHumanoids = false
    ..staminaBonus = 0);

  /// The item is technically edible by a humanoid, but it's so disgusting
  /// there will be no benefits and only pain and embarrassment.
  static final Edibility disgusting = Edibility((b) => b
    ..isEdibleByHumanoids = true
    ..staminaBonus = -1);

  static Serializer<Edibility> get serializer => _$edibilitySerializer;

  factory Edibility([void Function(EdibilityBuilder) updates]) = _$Edibility;

  /// Something that increases stamina when consumed (e.g. an apple).
  factory Edibility.food(int staminaBonus, String eatingReport) =>
      Edibility((b) => b
        ..isEdibleByHumanoids = true
        ..staminaBonus = staminaBonus
        ..eatingReport = eatingReport);

  Edibility._();

  /// A custom report describing the act of eating the item.
  @nullable
  String get eatingReport;

  /// Don't use this directly. Check [canBeEatenBy] instead.
  bool get isEdibleByHumanoids;

  /// The amount of stamina points this item will provide (or subtract).
  int get staminaBonus;

  bool canBeEatenBy(Actor actor) {
    assert(actor.anatomy.isHumanoid,
        "Haven't thought about other types of actors yet.");
    return isEdibleByHumanoids;
  }
}
