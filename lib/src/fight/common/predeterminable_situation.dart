import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:quiver/core.dart';

abstract class Predeterminable implements Situation {
  static final _failureChance = new Optional<num>.of(0.0);

  static final _successChance = new Optional<num>.of(1.0);

  bool get actionsGuaranteedToFail =>
      predeterminedResult == Predetermination.failureGuaranteed;

  bool get actionsGuaranteedToSucceed =>
      predeterminedResult == Predetermination.successGuaranteed;

  Optional<num> get predeterminedChance {
    switch (predeterminedResult) {
      case Predetermination.none:
        return const Optional<num>.absent();
      case Predetermination.failureGuaranteed:
        return _failureChance;
      case Predetermination.successGuaranteed:
        return _successChance;
      default:
        throw new ArgumentError(predeterminedResult);
    }
  }

  Predetermination get predeterminedResult;
}
