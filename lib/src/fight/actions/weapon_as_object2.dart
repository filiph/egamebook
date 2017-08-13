import 'package:edgehead/fractal_stories/actor.dart';

/// This is a work-around to the issue that Storyline reports can only have
/// one object. So if you want to say "A uses B to hit C", you can't use
/// Storyline to solve NLG for one of B or C.
String weaponAsObject2(Actor a) => a.currentWeapon.nameIsProperNoun
    ? a.currentWeapon.name
    : "<subject's> ${a.currentWeapon.name}";
