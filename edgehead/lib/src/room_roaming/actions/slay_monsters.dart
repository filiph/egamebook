// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class AutoSlayMonstersAction extends Action<Nothing /*?*/ > {
  static final AutoSlayMonstersAction singleton = AutoSlayMonstersAction();

  static const String className = "SlayMonstersAction";

  @override
  final bool isAggressive = false;

  @override
  final bool rerollable = false;

  /// Since we set up [Actor.recoveringUntil] in [_assignRecoveringUntil],
  /// we don't want the performing actor to get their [Actor.recoveringUntil]
  /// overridden.
  ///
  /// The actor performing [SlayMonsters] doesn't actually do anything,
  /// it's an implicit action. Fight is considered to start immediately.
  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final Resource rerollResource = null;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get helpMessage => null;

  @override
  String get name => className;

  @override
  String applyFailure(ActionContext context, void _) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, void _) {
    pushFightSituation(context);

    return "${context.actor.name} initiated combat with monsters "
        "in ${context.world.currentSituation}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, void _) {
    final situation = w.currentSituation as RoomRoamingSituation;
    Room room = sim.getRoomParent(sim.getRoomByName(situation.currentRoomName));
    return !room.fightIsOptional && situation.monstersAlive;
  }

  /// Pushes the current room's fight situation (constructed by
  /// [Room.fightGenerator] on the [WorldState.situations] stack.
  ///
  /// This function must be called when one of the [WorldState.situations]
  /// is a [RoomRoamingSituation], and when it has monsters alive
  /// (it has a non-null [Room.fightGenerator] and the monsters haven't been
  /// slain).
  static void pushFightSituation(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldState originalWorld = context.world;
    WorldStateBuilder w = context.outputWorld;
    final situation = w.getSituationByName<RoomRoamingSituation>(
        RoomRoamingSituation.className);
    Room room = sim.getRoomParent(sim.getRoomByName(situation.currentRoomName));
    assert(room.fightGenerator != null);
    assert(situation.monstersAlive);

    WorldState built = w.build();
    var friends = built.actors
        .where((other) =>
            other.isAnimatedAndActive &&
            other.team.isFriendWith(a.team) &&
            other.currentRoomName == room.name)
        .toList(growable: false);

    var fightSituation = room.fightGenerator(context, situation, friends);
    assert(() {
      WorldState rebuilt = w.build();
      return fightSituation.enemyTeamIds
          .every((id) => rebuilt.actors.any((a) => a.id == id));
    }(),
        "FightGenerator in $room didn't add its monsters to the world's "
        "actors. Add a line like `w.actors.addAll(monsters)` to the "
        "generator. At least one of these actors is missing: "
        "${fightSituation.enemyTeamIds}");

    // Move enemy combatants to the room (fightGenerator cannot know which
    // room it will be, so their currentRoomName is `null`).
    for (final enemyId in fightSituation.enemyTeamIds) {
      w.updateActorById(enemyId, (b) => b.currentRoomName = room.name);
    }

    _assignRecoveringUntil(
        originalWorld.time, w, fightSituation.getActors(sim, w.build()));

    w.insertSituationAbove(fightSituation, situation);
  }

  /// Assign recoveringUntil according to initiative.
  static void _assignRecoveringUntil(
      DateTime now, WorldStateBuilder w, Iterable<Actor> combatants) {
    final list = combatants.toList();
    // Sort from best initiative to worst.
    list.sort((a, b) => -a.initiative.compareTo(b.initiative));
    const delay = Duration(milliseconds: 100);

    for (int i = 0; i < list.length; i++) {
      final actor = list[i];
      w.updateActorById(
          actor.id, (b) => b.recoveringUntil = now.add(delay * i));
    }
  }
}
