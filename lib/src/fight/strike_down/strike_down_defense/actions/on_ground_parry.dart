import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';

class OnGroundParry extends EnemyTargetAction {
  static const String className = "OnGroundParry";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final String helpMessage = "You can deal serious damage when countering "
      "because your opponent is often caught off guard. On the other hand, "
      "counters require fast reaction and could throw you out of balance.";

  OnGroundParry(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "parry it";

  @override
  String get rollReasonTemplate => "will <subject> parry it?";

  @override
  String applyFailure(Actor a, WorldState _, Storyline s) {
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "stop it{| with <subject's> ${a.currentWeapon.name}}}");
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> {parr<ies> it|"
        "stop<s> it with <subject's> ${a.currentWeapon.name}}",
        positive: true);
    w.popSituationsUntil("FightSituation");
    return "${a.name} parries ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    OnGroundDefenseSituation situation = w.currentSituation;
    if (situation.actionsGuaranteedToFail) {
      return 0.0;
    }
    if (situation.actionsGuaranteedToSucceed) {
      return 1.0;
    }
    if (a.isPlayer) return 0.6;
    return 0.3;
  }

  @override
  bool isApplicable(Actor a, WorldState world) => a.currentWeapon.canParrySlash;

  static EnemyTargetAction builder(Actor enemy) => new OnGroundParry(enemy);
}
