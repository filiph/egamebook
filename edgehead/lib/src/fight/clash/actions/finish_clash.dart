import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/clash/clash_situation.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/recently_forced_to_ground.dart';
import 'package:edgehead/src/fight/common/recently_lost_stance.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';

class FinishClash extends OtherActorAction {
  static final FinishClash singleton = FinishClash();

  static const String className = "FinishClash";

  static final Entity _balance =
      Entity(name: "balance", team: neutralTeam, nameIsProperNoun: true);

  static final Entity _pounding = Entity(name: "pounding", team: neutralTeam);

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = false;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get name => className;

  @override
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    assert(context.world.currentSituation is AttackerSituation);

    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    Simulation sim = context.simulation;
    final thread = getThreadId(sim, w, clashSituationName);

    final newStance = enemy.pose.changeBy(-2);
    w.recordCustom(lostStanceCustomEvent, actor: enemy);

    if (newStance == Pose.extended) {
      enemy.report(s, "<subject> manage<s> to keep <subject's> balance",
          object: _balance, actionThread: thread);
      enemy.report(s, "<subject> {overextend<s>|expose<s>} <subject's> hand",
          but: true, negative: true, actionThread: thread);

      w.updateActorById(enemy.id, (b) => b..pose = newStance);

      var situation = OffBalanceOpportunitySituation.initialized(
          w.randomInt(), enemy,
          culprit: a);
      w.pushSituation(situation);
      return "${a.name} pounds ${enemy.name} to extended";
    }

    if (newStance == Pose.offBalance) {
      enemy.report(s, "<subject> lose<s> <object>",
          object: _balance, negative: true, actionThread: thread);
      w.updateActorById(enemy.id, (b) => b..pose = newStance);

      var situation = OffBalanceOpportunitySituation.initialized(
          w.randomInt(), enemy,
          culprit: a);
      w.pushSituation(situation);
      return "${a.name} pounds ${enemy.name} off balance";
    }

    // Enemy goes on the ground.
    assert(newStance == Pose.onGround);
    enemy.report(s, "<subject> <is> already off balance", actionThread: thread);
    var groundMaterial = getGroundMaterial(w);
    s.add(
        "<subject> make<s> <object> fall "
        "to the $groundMaterial",
        subject: _pounding,
        object: enemy,
        actionThread: thread);
    w.recordCustom(fellToGroundCustomEventName, actor: enemy);
    w.updateActorById(enemy.id, (b) => b..pose = newStance);

    return "${a.name} pounds ${enemy.name} to the ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) => true;
}
