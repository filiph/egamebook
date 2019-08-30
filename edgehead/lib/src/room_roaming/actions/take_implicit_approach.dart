import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/actions/take_approach.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class TakeImplicitApproachAction extends TakeApproachAction {
  static const String className = "TakeImplicitApproachAction";

  static final TakeImplicitApproachAction singleton =
      TakeImplicitApproachAction();

  @override
  bool get isImplicit => true;

  @override
  String get name => className;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Approach approach) {
    if (!approach.isImplicit) {
      // Non-implicit approaches are covered by TakeApproachAction.
      return false;
    }

    if ((w.currentSituation as RoomRoamingSituation).monstersAlive) {
      // Don't allow exit taking when monsters in this room are still alive.
      return false;
    }

    if (approach.isApplicable != null) {
      return approach.isApplicable(c);
    }

    return true;
  }
}
