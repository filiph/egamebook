import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/randomly.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/common/weapon_as_object2.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';

final Entity swing =
    new Entity(name: "swing", team: neutralTeam, nameIsProperNoun: true);

class OnGroundShieldBlock extends EnemyTargetAction {
  static const String className = "OnGroundShieldBlock";

  @override
  final String helpMessage = "A shield blocks enemy attacks with the least "
      "amount of energy and movement.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = false;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  OnGroundShieldBlock(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "block with shield";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> block the strike?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(
        s,
        "<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} "
        "with ${shieldAsObject2(a)}");
    Randomly.run(
        () => a.report(s, "<subject> {fail<s>|<does>n't succeed}", but: true),
        () => a.report(s, "<subject> <is> too slow", but: true),
        () => enemy.report(s, "<subject> <is> too quick for <object>",
            object: a, but: true));
    w.popSituation();
    return "${a.name} fails to block ${enemy.name} with shield on ground";
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
          "<subject> easily {block<s>|stop<s>|deflect<s>} "
          "the {swing|attack|strike} "
          "with ${shieldAsObject2(a)}",
          positive: true);
    } else {
      a.report(
          s,
          "<subject> {block<s>|stop<s>|deflect<s>} the {swing|attack|strike} "
          "with ${shieldAsObject2(a)}",
          positive: true);
    }

    w.popSituationsUntil("FightSituation");
    return "${a.name} blocks ${enemy.name} with a shield on ground";
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    if (a.isPlayer) return 0.8;
    final situation = w.currentSituation as OnGroundDefenseSituation;
    return situation.predeterminedChance.or(0.5);
  }

  @override
  bool isApplicable(Actor a, WorldState w) => a.currentShield != null;

  static EnemyTargetAction builder(Actor enemy) =>
      new OnGroundShieldBlock(enemy);
}
