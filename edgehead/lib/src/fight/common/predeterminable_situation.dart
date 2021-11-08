// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:quiver/core.dart';

mixin Predeterminable implements Situation {
  static final _failureChance =
      Optional<ReasonedSuccessChance>.of(ReasonedSuccessChance.sureFailure);

  static final _successChance =
      Optional<ReasonedSuccessChance>.of(ReasonedSuccessChance.sureSuccess);

  bool get actionsGuaranteedToFail =>
      predeterminedResult == Predetermination.failureGuaranteed;

  bool get actionsGuaranteedToSucceed =>
      predeterminedResult == Predetermination.successGuaranteed;

  Optional<ReasonedSuccessChance> get predeterminedChance {
    switch (predeterminedResult) {
      case Predetermination.none:
        return const Optional<ReasonedSuccessChance>.absent();
      case Predetermination.failureGuaranteed:
        return _failureChance;
      case Predetermination.successGuaranteed:
        return _successChance;
      default:
        throw ArgumentError(predeterminedResult);
    }
  }

  Predetermination get predeterminedResult;
}
