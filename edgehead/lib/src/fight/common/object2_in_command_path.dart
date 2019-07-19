import 'package:edgehead/fractal_stories/actor.dart';

/// Command path generators don't easily give you the current weapon
/// as `object2`. This workaround just gives you a sane default when you
/// need to put the weapon in the command path.
///
/// Do not use it outside menus (like in command path). Storyline has
/// support for `object2` and you should use that.
///
/// Example usage:
///
///     commandPathTailGenerator: (w, a, target) =>
///          "throw ${weaponAsObject2InCommandPath(a)} at <objectPronoun>",
String weaponAsObject2InCommandPath(Actor a) =>
    a.currentWeaponOrBodyPart.nameIsProperNoun
        ? a.currentWeaponOrBodyPart.name
        : "<subject's> ${a.currentWeaponOrBodyPart.name}";
