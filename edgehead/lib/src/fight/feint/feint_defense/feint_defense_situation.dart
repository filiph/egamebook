import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/feint/feint_defense/actions/counter_feint.dart';
import 'package:edgehead/src/fight/feint/feint_defense/actions/withstand_feint.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String feintDefenseSituationName = "FeintDefenseSituation";

DefenseSituation createFeintDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
      id,
      feintDefenseSituationName,
      [
        WithstandFeint.singleton,
        CounterAttackFeint.singleton,
      ],
      [],
      attacker,
      target,
      predetermination,
    );
