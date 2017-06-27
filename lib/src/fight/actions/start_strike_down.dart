import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

const String startStrikeDownCommandTemplate = "strike down at <object>";

const String startStrikeDownHelpMessage =
    "Opponents on the ground are often the most "
    "vulnerable.";

EnemyTargetAction startStrikeDownBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartStrikeDown",
        startStrikeDownCommandTemplate,
        startStrikeDownHelpMessage,
        startStrikeDownReportStart,
        (a, w, enemy) =>
            !a.isPlayer &&
            enemy.isOnGround &&
            !a.isOnGround &&
            a.wields(ItemType.sword),
        (a, w, enemy) => new StrikeDownSituation.initialized(a, enemy),
        (a, w, enemy) => new OnGroundDefenseSituation.initialized(a, enemy),
        enemy);

EnemyTargetAction startStrikeDownPlayerBuilder(Actor enemy) =>
    new StartDefensibleAction(
        "StartStrikeDownPlayer",
        startStrikeDownCommandTemplate,
        startStrikeDownHelpMessage,
        startStrikeDownReportStart,
        (a, w, enemy) =>
            a.isPlayer &&
            enemy.isOnGround &&
            !a.isOnGround &&
            a.wields(ItemType.sword),
        (a, w, enemy) => new StrikeDownSituation.initialized(a, enemy),
        (a, w, enemy) => new OnGroundDefenseSituation.initialized(a, enemy,
            predeterminedResult: Predetermination.failureGuaranteed),
        enemy,
        rerollable: true,
        rerollResource: Resource.stamina,
        rollReasonTemplate: "will <subject> hit?",
        successChanceGetter: (a, w, enemy) {
          // TODO: add penalty for out of balance
          return 0.7;
        },
        applyStartOfFailure: startStrikeDownReportStart,
        defenseSituationWhenFailed: (a, w, enemy) =>
            new OnGroundDefenseSituation.initialized(a, enemy,
                predeterminedResult: Predetermination.successGuaranteed));

void startStrikeDownReportStart(
        Actor a, WorldState w, Storyline s, Actor enemy, _) =>
    a.report(
        s,
        "<subject> strike<s> down "
        "{with <subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
