import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/feint/actions/finish_feint.dart';

const String feintSituationName = "FeintSituation";

Situation createFeintSituation(
        int id, Actor attacker, Actor target, FeintType type) =>
    AttackerSituation.initialized(
      id,
      feintSituationName,
      [FinishFeint.singleton],
      [],
      attacker,
      target,
      "feint",
      additionalData: _feintTypeToString(type),
    );

String _feintTypeToString(FeintType type) {
  switch (type) {
    case FeintType.slash:
      return "slash";
    case FeintType.jab:
      return "jab";
  }
}

enum FeintType {
  slash,
  jab,
}

FeintType feintTypeFromSituation(AttackerSituation situation) {
  assert(situation.additionalData != null);

  switch (situation.additionalData) {
    case "slash":
      return FeintType.slash;
    case "jab":
      return FeintType.jab;
  }

  throw UnimplementedError('${situation.additionalData} not covered');
}
