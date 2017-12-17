import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class TakeExitAction extends ExitAction {
  static const String className = "TakeExitAction";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  TakeExitAction(Exit exit) : super(exit);

  @override
  String get helpMessage => null;

  @override
  String get name => className;

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    if (exit.description.trim() != "N/A") {
      s.add(exit.description, wholeSentence: true);
    }

    (w.currentSituation as RoomRoamingSituation)
        .moveActor(context, exit.destinationRoomName);

    return "${a.name} went through exit to ${exit.destinationRoomName}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w) =>
      "WARNING should not be user-visible";

  @override
  num getSuccessChance(Actor a, Simulation sim, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).monstersAlive) {
      // Don't allow exit taking when monsters in this room are still alive.
      return false;
    }
    if (exit.isAccessible != null && !exit.isAccessible(sim, w)) {
      // Don't allow if `isAccessible` is defined on [exit] and it returns
      // `false`.
      return false;
    }
    return true;
  }

  static ExitAction builder(Exit exit) => new TakeExitAction(exit);
}
