import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Creates an instance of [Item] that represents a fist as a weapon.
/// Disarmed actors will receive this.
Item createFist(BodyPart part) {
  assert(part.designation == BodyPartDesignation.primaryHand ||
      part.designation == BodyPartDesignation.secondaryHand);
  return Item(StatefulRandom(part.id << 2).next(),
      name: "fist",
      adjective: null,
      damageCapability: part.damageCapability.toBuilder(),
      firstOwnerId: part.firstOwnerId);
}
