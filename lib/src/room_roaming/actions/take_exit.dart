import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class TakeExitAction extends ExitAction {
  static const String className = "TakeExitAction";

  @override
  final bool isAggressive = false;

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
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    var room = w.getRoomByName(exit.destinationRoomName);

    s.add(exit.description);

    (w.currentSituation as RoomRoamingSituation).moveActor(w, a, room.name);

    s.addParagraph();
    // TODO: show short description according to world.actionRecords
    s.add(room.description, wholeSentence: true);
    s.addParagraph();

    return "${a.name} went through exit to ${exit.destinationRoomName}";
  }

  @override
  String getRollReason(Actor a, WorldState w) =>
      "WARNING should not be user-visible";

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) {
    if ((w.currentSituation as RoomRoamingSituation).monstersAlive) {
      // Don't allow exit taking when monsters in this room are still alive.
      return false;
    }
    if (exit.isAccessible != null && !exit.isAccessible(w)) {
      // Don't allow if `isAccessible` is defined on [exit] and it returns
      // `false`.
      return false;
    }
    return true;
  }

  static ExitAction builder(Exit exit) => new TakeExitAction(exit);
}
