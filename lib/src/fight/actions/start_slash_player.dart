import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/actions/start_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';

class StartSlashPlayer extends StartSlash {
  @override
  bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  StartSlashPlayer(Actor enemy) : super(enemy);

  @override
  String get rollReasonTemplate => "will <subject> hit <objectPronoun>?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy,
        predeterminedResult: Predetermination.successGuaranteed);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts a failed slash at ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> swing<s> "
        "{<subject's> ${a.currentWeapon.name} |}at <object>",
        object: enemy);
    var slashSituation = new SlashSituation.initialized(a, enemy);
    w.pushSituation(slashSituation);
    var slashDefenseSituation = new SlashDefenseSituation.initialized(a, enemy,
        predeterminedResult: Predetermination.failureGuaranteed);
    w.pushSituation(slashDefenseSituation);
    return "${a.name} starts a successful slash at ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor actor, WorldState world) => 0.7;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.isPlayer &&
      a.isStanding &&
      !enemy.isOnGround &&
      a.wields(ItemType.sword);

  static EnemyTargetAction builder(Actor enemy) => new StartSlashPlayer(enemy);
}
