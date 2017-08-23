import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';

class RollOutOfWay extends EnemyTargetAction {
  static const String className = "RollOutOfWay";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  RollOutOfWay(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "roll out of way";

  @override
  String get rollReasonTemplate =>
      "will <subject> evade?"; // TODO: come up with something

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> tr<ies> to roll out of the way");
    a.report(s, "<subject> can't", but: true);
    w.popSituation();
    return "${a.name} fails to roll out of the way";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> <is> able to roll out of the way",
        but: true, positive: true);
    if (a.isPlayer) {
      w.updateActorById(a.id, (b) => b..pose = Pose.standing);
      a.report(s, "<subject> jump<s> up on <subject's> feet", positive: true);
    }
    w.popSituationsUntil("FightSituation");
    return "${a.name} rolls out of the way of ${enemy.name}'s strike";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    if (a.isPlayer) return 1.0;
    OnGroundDefenseSituation situation = w.currentSituation;
    return situation.predeterminedChance.or(0.5);
  }

  @override
  bool isApplicable(Actor actor, WorldState world) => true;

  static EnemyTargetAction builder(Actor enemy) => new RollOutOfWay(enemy);
}
