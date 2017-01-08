import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class TakeExitAction extends ExitAction {
  TakeExitAction(Exit exit) : super(exit);

  @override
  String get helpMessage => null;

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    RoomRoamingSituation situation = w.currentSituation;
    var updatedSituation =
        situation.rebuild((b) => b..currentRoomName = exit.destinationRoomName);
    w.popSituation();
    w.pushSituation(updatedSituation);

    var room = w.getRoomByName(exit.destinationRoomName);
    for (var actor in getPartyOf(a, w).toList()) {
      w.updateActorById(actor.id, (b) => b..currentRoomName = room.name);
    }

    s.addParagraph();
    s.add(room
        .description); // TODO: show short description according to world.actionRecords
    s.addParagraph();

    if (room.monsterGenerator != null) {
      // TODO: also check whether we're here for the first time, because if not, we shouldn't start the fight anew

      var friends = w.actors.where((actor) =>
          actor.team.isFriendWith(a.team) &&
          actor.currentRoomName == room.name);

      var monsters = room.monsterGenerator(w);

      w.actors.addAll(monsters);

      // TODO: add events (author can add events the generated Room instance)
      var fightSituation = new FightSituation.initialized(friends, monsters);

      w.pushSituation(fightSituation);
    }

    return "${a.name} went through exit to ${exit.destinationRoomName}";
  }

  @override
  String getRollReason(Actor a, WorldState w) =>
      "WARNING should not be user-visible";

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) {
    // TODO: do we need to guard against some invalid exit-taking here?
    return true;
  }

  static ExitAction builder(Exit exit) => new TakeExitAction(exit);
}
