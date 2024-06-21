import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/src/fight/bite/bite_defense/actions/dodge_bite.dart';
import 'package:edgehead/src/fight/bite/bite_defense/actions/impale_biter.dart';
import 'package:edgehead/src/fight/bite/bite_defense/actions/jump_back_from_bite.dart';
import 'package:edgehead/src/fight/bite/bite_defense/actions/shield_block_bite.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String biteDefenseSituationName = "BiteDefenseSituation";

DefenseSituation createBiteDefenseSituation(int id, Actor attacker,
        Actor target, Predetermination predetermination) =>
    DefenseSituation.initialized(
        id,
        biteDefenseSituationName,
        [
          DodgeBite.singleton,
          ImpaleBiter.singleton,
          JumpBackFromBite.singleton,
          ShieldBlockBite.singleton,
        ],
        [],
        attacker,
        target,
        predetermination);
