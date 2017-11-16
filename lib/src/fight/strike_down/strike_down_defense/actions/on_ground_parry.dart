import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';

// TODO find a reason why to take this choice. Maybe allow counter?
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
  final String helpMessage = "Why would you move? Just put your weapon up.";

  OnGroundParry(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "parry it";

  @override
  String get rollReasonTemplate => "will <subject> parry it?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> tr<ies> to {parry|deflect it|"
        "stop it{| with ${weaponAsObject2(a)}}}");
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation();
    return "${a.name} fails to parry ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> {parr<ies> it|"
        "stop<s> it with ${weaponAsObject2(a)}}",
        positive: true);
    w.popSituationsUntil("FightSituation");
    return "${a.name} parries ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    if (a.isPlayer) return 0.6;
    final situation = w.currentSituation as OnGroundDefenseSituation;
    return situation.predeterminedChance.or(0.3);
  }

  @override
  bool isApplicable(Actor a, WorldState world) =>
      enemy.currentWeapon.isSlashing && a.currentWeapon.canParrySlash;

  static EnemyTargetAction builder(Actor enemy) => new OnGroundParry(enemy);
}
