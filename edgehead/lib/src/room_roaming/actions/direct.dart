// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

class DirectAction extends Action<Nothing /*?*/ > {
  static const String className = "DirectAction";

  static final DirectAction singleton = DirectAction();

  @override
  List<String> get commandPathTemplate => [];

  @override
  String get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isDirectorAction => true;

  @override
  bool get isImplicit => true;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => throw UnimplementedError();

  @override
  String applyFailure(ActionContext context, void _) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, void _) {
    context.simulation.directorRuleset.apply(context);
    final usedRule = context.outputWorld.ruleHistory.latestRule.build();
    return "the director acted with ruleId=${usedRule.ruleId}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) {
    throw UnimplementedError();
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    return true;
  }
}
