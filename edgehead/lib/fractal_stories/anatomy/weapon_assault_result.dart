import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deal_slashing_damage.dart';
import 'package:meta/meta.dart';

/// Result of an assault by a weapon (sword, spear, claw).
///
/// The encapsulates things like "how did the assault leave the victim?"
/// ([actor]), "did any part of the victim got severed?" ([severedPart]) or
/// "did the victim fall as a result of the assault?" ([fell]).
class WeaponAssaultResult {
  /// The victim in their state after the slash (e.g. missing a limb).
  final Actor actor;

  /// The body part that was severed (and should be added to the ground).
  /// This can be (and often _will_ be) `null`.
  final BodyPart severedPart;

  /// The body part that was hit (slashed, pierced, etc.).
  final BodyPart touchedPart;

  /// The victim fell as a result of the slash.
  final bool fell;

  /// The [touchedPart] was disabled in the hit (but not severed).
  final bool disabled;

  /// After this assault, the target is blinded.
  final bool wasBlinding;

  /// The success level of the slash.
  ///
  /// Normally, this is the [SlashSuccessLevel] that [executeSlashingHit]
  /// was called with. But in some cases, the success level is upgraded
  /// or downgraded.
  ///
  /// For example, if the provided success level is [SlashSuccessLevel.cleave]
  /// but the body part is not severable, the final [slashSuccessLevel] will be
  /// [SlashSuccessLevel.majorCut].
  ///
  /// This is `null` for assaults that were not slashing.
  final SlashSuccessLevel slashSuccessLevel;

  /// Whether the current weapon was dropped as a result of the assault.
  ///
  /// For example, if a slash disabled (or cuts off) an arm, and the arm
  /// was holding the sword, than this will be `true`.
  final bool droppedCurrentWeapon;

  const WeaponAssaultResult(
    this.actor,
    this.touchedPart, {
    @required this.severedPart,
    @required this.slashSuccessLevel,
    @required this.disabled,
    @required this.fell,
    @required this.droppedCurrentWeapon,
    @required this.wasBlinding,
  });
}
