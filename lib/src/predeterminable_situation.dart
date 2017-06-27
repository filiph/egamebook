import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

abstract class Predeterminable implements Situation {
  bool get actionsGuaranteedToFail =>
      predeterminedResult == Predetermination.failureGuaranteed;

  bool get actionsGuaranteedToSucceed =>
      predeterminedResult == Predetermination.successGuaranteed;

  Predetermination get predeterminedResult;
}
