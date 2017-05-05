import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class SlayMonstersAction extends Action {
  static final SlayMonstersAction singleton = new SlayMonstersAction();

  static const String className = "SlayMonstersAction";

  @override
  final bool isAggressive = false;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  String get command => "";

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
    RoomRoamingSituation situation = w.currentSituation;
    Room room = w.getRoomByName(situation.currentRoomName);

    var friends = w.actors.where((other) =>
        other.isAliveAndActive &&
        other.team.isFriendWith(a.team) &&
        other.currentRoomName == room.name);

    var monsters = room.monsterGenerator(w);

    w.actors.addAll(monsters);

    // TODO: add events (author can add events the generated Room instance)
    var fightSituation = new FightSituation.initialized(
        friends, monsters, room.groundMaterial,
        roomRoamingSituation: situation);

    w.pushSituation(fightSituation);

    return "${a.name} initiated combat with monsters in $room";
  }

  @override
  String getRollReason(Actor a, WorldState w) =>
      "WARNING should not be user-visible";

  @override
  num getSuccessChance(Actor a, WorldState w) => 1.0;

  @override
  bool isApplicable(Actor a, WorldState w) =>
      (w.currentSituation as RoomRoamingSituation).monstersAlive;
}
