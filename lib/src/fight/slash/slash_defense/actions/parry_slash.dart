import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';

final Entity swing =
    new Entity(name: "swing", team: neutralTeam, nameIsProperNoun: true);

class ParrySlash extends EnemyTargetAction {
  static const String className = "ParrySlash";

  @override
  final String helpMessage = "Parrying means deflecting your opponent's move "
      "with your weapon. When successful, "
      "it will give you an opportunity for a counter attack. It won't "
      "throw your opponent off balance like dodging does, but it's also "
      "slightly easier to do.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  ParrySlash(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "parry and counter";

  @override
  String get rollReasonTemplate => "will <subject> parry?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "meet it with ${weaponAsObject2(a)}|"
        "fend it off}");
    if (a.isOffBalance) {
      a.report(s, "<subject> <is> out of balance", but: true);
    } else {
      Randomly.run(
          () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
          () => enemy.report(s, "<subject> <is> too quick for <object>",
              object: a, but: true));
    }
    w.popSituation();
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    if (enemy.isOffBalance) {
      s.add("<subject> <is> out of balance",
          subject: enemy, negative: true, startSentence: true);
      s.add("so <ownerPronoun's> <subject> is {weak|feeble}",
          owner: enemy, subject: swing);
      a.report(
          s,
          "<subject> {parr<ies> it easily|"
          "easily meet<s> it with ${weaponAsObject2(a)}|"
          "fend<s> it off easily}",
          positive: true);
    } else {
      a.report(
          s,
          "<subject> {parr<ies> it|"
          "meet<s> it with ${weaponAsObject2(a)}|"
          "fend<s> it off}",
          positive: true);
    }

    w.popSituationsUntil("FightSituation");
    if (a.isPlayer) {
      s.add("this opens an opportunity for a counter attack");
    }
    var counterAttackSituation =
        new CounterAttackSituation.initialized(a, enemy);
    w.pushSituation(counterAttackSituation);
    return "${a.name} parries ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    num enemyOutOfBalanceBonus = enemy.isOffBalance ? 0.3 : 0;
    if (a.isPlayer) return 0.6 - outOfBalancePenalty + enemyOutOfBalanceBonus;
    SlashDefenseSituation situation = w.currentSituation;
    return situation.predeterminedChance
        .or(0.3 - outOfBalancePenalty + enemyOutOfBalanceBonus);
  }

  @override
  bool isApplicable(Actor a, WorldState w) => a.currentWeapon.canParrySlash;

  static EnemyTargetAction builder(Actor enemy) => new ParrySlash(enemy);
}
