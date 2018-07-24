import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class SlayMonstersAction extends Action {
  static final SlayMonstersAction singleton = new SlayMonstersAction();

  static const String className = "SlayMonstersAction";

  @override
  final bool isAggressive = false;

  @override
  final bool rerollable = false;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = true;

  @override
  final Resource rerollResource = null;

  @override
  String get command => "";

  @override
  String get helpMessage => null;

  @override
  String get name => className;

  @override
  String applyFailure(ActionContext context) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    final situation = w.currentSituation as RoomRoamingSituation;
    Room room = sim.getRoomByName(situation.currentRoomName);

    WorldState built = w.build();
    var friends = built.actors.where((other) =>
        other.isAliveAndActive &&
        other.team.isFriendWith(a.team) &&
        other.currentRoomName == room.name);

    var fightSituation = room.fightGenerator(sim, w, situation, friends);
    assert(() {
      WorldState rebuilt = w.build();
      return fightSituation.enemyTeamIds
          .every((id) => rebuilt.actors.any((a) => a.id == id));
    }(),
        "FightGenerator in $room didn't add its monsters to the world's "
        "actors. Add a line like `w.actors.addAll(monsters)` to the "
        "generator. At least one of these actors is missing: "
        "${fightSituation.enemyTeamIds}");

    w.pushSituation(fightSituation);

    return "${a.name} initiated combat with monsters in $room";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      (w.currentSituation as RoomRoamingSituation).monstersAlive;
}
