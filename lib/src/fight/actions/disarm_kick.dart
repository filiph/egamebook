import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class DisarmKick extends EnemyTargetAction {
  static const String className = "DisarmKick";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  String helpMessage = "When enemies are on the ground, you can try to "
      "kick their weapon off to disarm them.";

  DisarmKick(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "kick <object's> weapon off";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> kick "
      "the weapon off?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    Randomly.run(() {
      a.report(s, "<subject> kick<s> {at|towards} <object's> weapon",
          object: enemy);
      a.report(s, "<subject> mi<sses>", but: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> weapon", object: enemy);
      enemy.report(s, "<subject> hold<s> onto it", but: true);
    });
    return "${a.name} fails to kick ${enemy.name}'s weapon off";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    Randomly.run(() {
      a.report(
          s,
          "<subject> kick<s> <object-owner's> <object> off "
          "<object-owner's> hand",
          objectOwner: enemy,
          object: enemy.currentWeapon,
          positive: true,
          endSentence: true);
    }, () {
      a.report(s, "<subject> kick<s> <object's> {right|} hand",
          object: enemy, positive: true);
      s.add("<owner's> <subject> fl<ies> away",
          subject: enemy.currentWeapon, owner: enemy);
    });
    FightSituation situation = w.currentSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild((FightSituationBuilder b) =>
            b..droppedItems.add(enemy.currentWeapon)));
    w.updateActorById(enemy.id, (b) => b..currentWeapon = defaultFist);
    return "${a.name} kicks ${enemy.name}'s weapon off";
  }

  @override
  num getSuccessChance(Actor a, WorldState world) {
    num outOfBalancePenalty = a.isStanding ? 0 : 0.2;
    if (a.isPlayer) return 0.7 - outOfBalancePenalty;
    return 0.5 - outOfBalancePenalty;
  }

  @override
  bool isApplicable(Actor a, WorldState world) =>
      (a.isStanding || a.isOffBalance) &&
      enemy.isOnGround &&
      !enemy.isBarehanded;

  static EnemyTargetAction builder(Actor enemy) => new DisarmKick(enemy);
}
