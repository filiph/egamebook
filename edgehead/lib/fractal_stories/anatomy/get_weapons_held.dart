import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/inventory.dart';

/// Figures out whether [currentWeapon] is being held by [rootPart]
/// and its descendant parts.
bool isWeaponHeld(Item currentWeapon, BodyPart rootPart, Inventory inventory) {
  if (currentWeapon == null) {
    // Actor is not holding any weapon.
    return false;
  }

  if (currentWeapon.damageCapability.type.isBodyPart) {
    // Body-part weapons aren't held, they _are_ the body.
    return false;
  }

  // The kind of body part that is holding the current weapon.
  final soughtDesignation = inventory.weaponInPrimaryAppendage
      ? BodyPartDesignation.primaryHand
      : BodyPartDesignation.secondaryHand;

  return rootPart
      .getDescendantParts()
      .any((part) => part.designation == soughtDesignation);
}
