import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/damage_reports.dart';

class FinishSlashGroundedEnemy extends EnemyTargetAction {
  static const String className = "FinishSlashGroundedEnemy";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  FinishSlashGroundedEnemy(Actor enemy) : super(enemy);

  @override
  String get name => className;

  @override
  String get commandTemplate => "";

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    w.updateActorById(enemy.id, (b) => b..hitpoints = 0);
    var bodyPart = enemy.id == brianaId ? 'side' : '{throat|neck|side}';
    s.add("<subject> {cuts|slashes|slits} <object's> $bodyPart",
        subject: a.currentWeapon, object: enemy);
    killHumanoid(s, w, enemy);
    return "${a.name} slains ${enemy.name} on the ground";
  }

  /// All action takes place in the OnGroundDefenseSituation.
  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState world) =>
      enemy.isOnGround && a.currentWeapon.isSlashing;

  static EnemyTargetAction builder(Actor enemy) =>
      new FinishSlashGroundedEnemy(enemy);
}
