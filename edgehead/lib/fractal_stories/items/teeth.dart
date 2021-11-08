// @dart=2.9

import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Creates an instance of [Item] that represents teeth as a weapon.
Item createTeeth(BodyPart part) {
  assert(part.designation == BodyPartDesignation.teeth);
  return Item(StatefulRandom(part.id << 2).next(),
      name: "teeth",
      isCommon: true,
      damageCapability: part.damageCapability.toBuilder(),
      firstOwnerId: part.firstOwnerId);
}
