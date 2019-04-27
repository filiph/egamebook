import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';

/// Generalization of [weaponAsObject2] for any [Entity] that [a] possesses
/// and we need to use it as a second object in the sentence.
String entityAsObject2(Actor a, Entity entity) =>
    entity.nameIsProperNoun ? entity.name : "<subject's> ${entity.name}";

/// Same as [weaponAsObject2] but for [Actor.currentShield].
String shieldAsObject2(Actor a) => a.currentShield.nameIsProperNoun
    ? a.currentShield.name
    : "<subject's> ${a.currentShield.name}";

/// This is a work-around to the issue that Storyline reports can only have
/// one object. So if you want to say "A uses B to hit C", you can only use
/// Storyline to solve NLG for one of B or C, not both.
///
/// Example usage:
///
///     a.report(s, "<subject> tr<ies> to parry it with ${weaponAsObject2(a)}");
String weaponAsObject2(Actor a) => a.currentWeaponOrBodyPart.nameIsProperNoun
    ? a.currentWeaponOrBodyPart.name
    : "<subject's> ${a.currentWeaponOrBodyPart.name}";
