import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class TakeApproachAction extends ApproachAction {
  static const String className = "TakeApproachAction";

  static final TakeApproachAction singleton = TakeApproachAction();

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  String get helpMessage => null;

  @override
  bool get isImplicit => false;

  @override
  String get name => className;

  @override
  String applyFailure(ActionContext context, Approach approach) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Approach approach) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    if (approach.description != null) {
      approach.description(context);
    }

    (w.currentSituation as RoomRoamingSituation)
        .moveActor(context, approach.to);

    return "${a.name} went through approach to ${approach.to}";
  }

  @override
  String getCommand(Approach approach) => approach.command;

  /// When the writer specifies a command with " >> " in it, this will
  /// automatically create a command path.
  ///
  /// For example, "Enter >> upper door".
  @override
  List<String> getCommandPath(Approach approach) =>
      approach.command.split(' >> ');

  @override
  String getRollReason(
          Actor a, Simulation sim, WorldState w, Approach approach) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Approach approach) =>
      ReasonedSuccessChance.sureSuccess;
  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Approach approach) {
    if ((w.currentSituation as RoomRoamingSituation).monstersAlive) {
      // Don't allow exit taking when monsters in this room are still alive.
      return false;
    }
    return true;
  }
}
