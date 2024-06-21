import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/clash/clash_defense/actions/counter_clash.dart';
import 'package:edgehead/src/fight/clash/clash_defense/actions/withstand_clash.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String clashDefenseSituationName = "ClashDefenseSituation";

DefenseSituation createClashDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        clashDefenseSituationName,
        [
          WithstandClash.singleton,
          CounterAttackClash.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
