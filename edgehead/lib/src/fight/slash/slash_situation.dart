import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';

const String slashSituationName = "SlashSituation";

Situation createSlashSituation(int id, Actor attacker, Actor target,
    {SlashDirection? direction, BodyPartDesignation? designation}) {
  assert(
      (direction != null && designation == null) ||
          (direction == null && designation != null),
      "You must define only one of direction or designation.");
  return AttackerSituation.initialized(
    id,
    slashSituationName,
    [FinishSlash.singleton],
    [],
    attacker,
    target,
    "slash",
    attackDirection: _convert(direction, designation),
  );
}

/// Converts a slash direction from the simple [SlashDirection] enum
/// to the serializable [AttackDirection] value-class.
AttackDirection _convert(
    SlashDirection? direction, BodyPartDesignation? designation) {
  if (direction != null) {
    return AttackDirection.fromSlashDirection(direction);
  }
  return AttackDirection.fromBodyPartDesignation(designation);
}
