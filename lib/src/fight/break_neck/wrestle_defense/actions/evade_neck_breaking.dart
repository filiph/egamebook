import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/wrestle_defense_situation.dart';

class EvadeNeckBreaking extends EnemyTargetAction {
  static const String className = "EvadeNeckBreaking";

  @override
  final String helpMessage = "This looks dangerous. Trying to evade this "
      "close-quarter move seems prudent.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  EvadeNeckBreaking(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "evade";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> evade?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> tr<ies> to evade");
    Randomly.run(
        () => a.report(s, "<subject> {can't|fail<s>}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation();
    return "${a.name} fails to dodge ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> {dodge<s>|evade<s>} it",
        object: enemy, positive: true);
    w.popSituationsUntil("FightSituation");
    return "${a.name} evades ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    OnGroundWrestleDefenseSituation situation = w.currentSituation;
    if (situation.actionsGuaranteedToFail) {
      return 0.0;
    }
    if (situation.actionsGuaranteedToSucceed) {
      return 1.0;
    }
    if (a.isPlayer) return 0.6;
    return 0.5;
  }

  @override
  bool isApplicable(Actor a, WorldState w) => true;

  static EnemyTargetAction builder(Actor enemy) => new EvadeNeckBreaking(enemy);
}
