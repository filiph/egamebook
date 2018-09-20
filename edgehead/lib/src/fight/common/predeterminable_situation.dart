import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:quiver/core.dart';

abstract class Predeterminable implements Situation {
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
        // TODO: use const Optional<ReasonedSuccessChance>.absent() when
        //       https://github.com/flutter/flutter/issues/21957 fix lands
        return new Optional<ReasonedSuccessChance>.fromNullable(null);
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
