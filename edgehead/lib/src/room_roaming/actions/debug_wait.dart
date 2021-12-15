// @dart=2.9

import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class WaitWhileRoamingAction extends Action<Nothing /*?*/ > {
  static const String className = "WaitWhileRoamingAction";

  static final WaitWhileRoamingAction singleton = WaitWhileRoamingAction();

  @override
  List<String> get commandPathTemplate => ['DEBUG', 'Wait'];

  @override
  String get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context, Nothing _) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Nothing _) {
    context.outputStoryline.add('Waiting.');

    return "Player waits (DEBUG)";
  }

  @override
  Duration getRecoveryDuration(ApplicabilityContext context, Nothing _) {
    // Moving around the map takes significantly more time than the ordinary
    // action.
    return const Duration(minutes: 10);
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Nothing _) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Nothing _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Nothing _) {
    if (!(w.global as EdgeheadGlobalState).isInTesterMode) {
      // Not available in normal gameplay.
      return false;
    }

    final situation = w.currentSituation as RoomRoamingSituation;
    final room = sim.getRoomByName(situation.currentRoomName);

    if (room.isSynthetic || !room.isOnMap) return false;

    if (situation.monstersAlive) {
      // Don't allow waiting when monsters in this room are still alive.
      return false;
    }

    if (!a.isPlayer) return false;

    return true;
  }
}
