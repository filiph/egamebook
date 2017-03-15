import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';

class Confuse extends EnemyTargetAction {
  static const int minimalEffectLength = 4;

  static const String className = "Confuse";

  @override
  final bool isAggressive = true;

  @override
  String helpMessage = "Channeling the terror of the Dead Prince into lesser "
      "minds is something you've been practicing. It makes the target rabid "
      "and disoriented. They might attack their own.";

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  Confuse(Actor enemy) : super(enemy);

  @override
  String get commandTemplate => "confuse <object>";

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> confuse <object>?";

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> touch<es> <subject's> temple");
    a.report(
        s,
        "<subject> tr<ies> to {channel|implant} {terror|confusion} "
        "into <object's> mind",
        object: enemy);
    a.report(s, "<subject> fail<s>", negative: true, but: true);
    return "${a.name} fails to confuse ${enemy.name}";
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    a.report(s, "<subject> touch<es> <subject's> temple");
    a.report(
        s,
        "<subject> {channel<s>|implant<s>} {terror|confusion} "
        "into <object's> mind",
        object: enemy,
        positive: true);
    enemy.report(s, "<subject's> eyes go wide with terror", negative: true);
    return "${a.name} confuses ${enemy.name}";
  }

  @override
  num getSuccessChance(Actor a, WorldState world) {
    return 0.6;
  }

  @override
  bool isApplicable(Actor a, WorldState world) =>
      a.isPlayer && a.isStanding && !enemy.isConfused(world);

  static EnemyTargetAction builder(Actor enemy) => new Confuse(enemy);
}
