import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';

final Entity balance =
    new Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);

final Entity pounding = new Entity(name: "pounding", team: neutralTeam);

class Pound extends EnemyTargetAction {
  static const String className = "Pound";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  String helpMessage = "Pounding on someone means hitting them heavily several "
      "times in a row. The goal is not to deal damage but to force "
      "the opponent to lose ground or balance.";

  Pound(Actor enemy) : super(enemy);

  @override
  String get nameTemplate => "pound <object>";

  @override
  String get rollReasonTemplate => "will <subject> force "
      "<object> off balance?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> {fiercely|violently} "
        "{pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} "
        "on <object-owner's> "
        "{<object>|weapon}",
        objectOwner: enemy,
        object: enemy.currentWeapon);
    enemy.report(s, "<subject> {stand<s> ground|deflect<s> each blow}",
        positive: true);
    return "${a.name} kicks ${enemy.name} off balance";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> {fiercely|violently} "
        "{pound<s>|and repeatedly {strike<s>|hammer<s>|batter<s>}} "
        "on <object-owner's> "
        "{<object>|weapon}",
        objectOwner: enemy,
        object: enemy.currentWeapon);
    if (enemy.isStanding) {
      enemy.report(s, "<subject> lose<s> <object>",
          object: balance, negative: true);
      w.updateActorById(enemy.id, (b) => b..pose = Pose.offBalance);

      var situation =
          new OffBalanceOpportunitySituation.initialized(enemy, culprit: a);
      w.pushSituation(situation);
      return "${a.name} pounds ${enemy.name} off balance";
    } else if (enemy.isOffBalance) {
      enemy.report(s, "<subject> <is> already off balance");
      var groundMaterial =
          w.getSituationByName<FightSituation>("FightSituation").groundMaterial;
      s.add(
          "<subject> make<s> <object> fall "
          "to the $groundMaterial",
          subject: pounding,
          object: enemy);
      w.updateActorById(enemy.id, (b) => b..pose = Pose.onGround);

      return "${a.name} pounds ${enemy.name} to the ground";
    }
    throw new StateError("enemy pose must be either standing or off-balance");
  }

  @override
  num getSuccessChance(Actor a, WorldState world) {
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    return 0.5 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState world) =>
      !a.isOnGround &&
      a.wields(ItemType.sword) &&
      !enemy.isOnGround;

  static EnemyTargetAction builder(Actor enemy) => new Pound(enemy);
}
