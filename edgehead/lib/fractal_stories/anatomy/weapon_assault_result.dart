import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/item.dart';

/// Result of an assault by a weapon (sword, spear, claw).
///
/// The encapsulates things like "how did the assault leave the victim?"
/// ([victim]), "did any part of the victim got severed?" ([severedPart]) or
/// "will the victim fall as a result of the assault?" ([willFall]).
class WeaponAssaultResult {
  /// The victim in their state after the slash (e.g. missing a limb).
  final Actor victim;

  /// The body part that was severed (and should be added to the ground).
  /// This can be (and often _will_ be) `null`.
  final Item? severedPart;

  /// The body part that was hit (slashed, pierced, etc.).
  final BodyPart touchedPart;

  /// The victim will fall as a result of the slash.
  ///
  /// The fall itself didn't happen when the assault was executed but
  /// the overarching action should make sure that by the end of it, the
  /// victim is down (and that fact is explained in the storyline).
  final bool willFall;

  /// The [touchedPart] was disabled in the hit (but not severed).
  final bool disabled;

  /// After this assault, the target is blinded.
  ///
  /// The overarching action should point that out in the storyline.
  final bool wasBlinding;

  /// The success level of the slash.
  ///
  /// Normally, this is the [SlashSuccessLevel] that [decideSlashingHit]
  /// was called with. But in some cases, the success level is upgraded
  /// or downgraded.
  ///
  /// For example, if the provided success level is [SlashSuccessLevel.cleave]
  /// but the body part is not sever-able, the final [slashSuccessLevel] will be
  /// [SlashSuccessLevel.majorCut].
  ///
  /// This is `null` for assaults that were not slashing.
  final SlashSuccessLevel? slashSuccessLevel;

  /// Whether the current weapon will be dropped as a result of the assault.
  ///
  /// For example, if a slash disables (or cuts off) an arm, and the arm
  /// is holding the sword, than this will be `true`.
  ///
  /// The drop itself didn't happen when the assault was executed but
  /// the overarching action should make sure that by the end of it, the
  /// victim's weapon is down (and that fact is explained in the storyline).
  final bool willDropCurrentWeapon;

  const WeaponAssaultResult(
    this.victim,
    this.touchedPart, {
    required this.severedPart,
    required this.slashSuccessLevel,
    required this.disabled,
    required this.willFall,
    required this.willDropCurrentWeapon,
    required this.wasBlinding,
  });

  bool get didSeverBodyPart => severedPart != null;

  @override
  String toString() {
    final properties = <String>[];
    properties.add(touchedPart.name);
    if (severedPart != null) properties.add('severedPart');
    if (slashSuccessLevel != null) properties.add(slashSuccessLevel.toString());
    if (disabled) properties.add('disabled');
    if (willFall) properties.add('willFall');
    if (willDropCurrentWeapon) properties.add('willDropCurrentWeapon');
    if (wasBlinding) properties.add('wasBlinding');
    return 'WeaponAssaultResult<${properties.join(', ')}>';
  }
}
