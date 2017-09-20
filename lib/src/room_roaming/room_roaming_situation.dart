library stranded.room_roaming.room_roaming_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/actions/slay_monsters.dart';
import 'package:edgehead/src/room_roaming/actions/take_exit.dart';
import 'package:edgehead/writers_input.dart' as writers_input;

part 'room_roaming_situation.g.dart';

abstract class RoomRoamingSituation extends Situation
    implements Built<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  static const String className = "RoomRoamingSituation";

  factory RoomRoamingSituation([void updates(RoomRoamingSituationBuilder b)]) =
      _$RoomRoamingSituation;

  factory RoomRoamingSituation.initialized(
          Room currentRoom, bool monstersAlive) =>
      new RoomRoamingSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..currentRoomName = currentRoom.name
        ..monstersAlive = monstersAlive);

  RoomRoamingSituation._();

  /// TODO: add all other actions that player can do while exploring
  @override
  List<ExitActionBuilder> get actionGenerators => [TakeExitAction.builder];

  @override
  List<Action> get actions => []
    ..addAll(writers_input.allActions)
    ..add(SlayMonstersAction.singleton);

  String get currentRoomName;

  @override
  int get id;

  @override
  int get maxActionsToShow => 1000;

  bool get monstersAlive;

  @override
  String get name => className;

  @override
  int get time;

  @override
  RoomRoamingSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(_, WorldState world) {
    // Only player can roam at the moment.
    var mainActor = world.actors.firstWhere(
        (a) => a.isPlayer && a.isAliveAndActive,
        orElse: () => null);
    return mainActor;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, WorldState world) {
    var mainActor = getActorAtTime(null, world);
    if (mainActor == null) return [];
    return [mainActor];
  }

  /// Moves [a] with their party to [destination].
  ///
  /// This will also print out the description of the room (or the short version
  /// as appropriate).
  void moveActor(WorldState w, Actor a, String destinationRoomName, Storyline s,
      {bool silent: false}) {
    var room = w.getRoomByName(destinationRoomName);

    // Find if monsters were slain by seeing if there was a [TakeExit] action
    // record leading to this room.
    bool hasBeenVisited = w
        .getActionRecords(
            actionName: TakeExitAction.className,
            protagonist: a,
            wasSuccess: true)
        .any((r) => r.dataString == destinationRoomName);

    var nextRoomSituation = new RoomRoamingSituation.initialized(
        room, !hasBeenVisited && room.fightGenerator != null);

    w.replaceSituationById(id, nextRoomSituation);

    if (!silent) {
      // Show short description according to world.actionRecords.
      if (_actorHasVisitedRoom(w, a, room)) {
        room.shortDescribe(a, w, s);
      } else {
        s.addParagraph();
        room.describe(a, w, s);
        s.addParagraph();
      }
    }

    for (var actor in getPartyOf(a, w).toList()) {
      w.updateActorById(actor.id, (b) => b..currentRoomName = room.name);
    }
  }

  @override
  void onAfterAction(WorldState world, _) {
    // When going from place to place, remove the actors that died. It makes
    // sure we don't leak memory.
    world.actors.removeWhere((a) => !a.isAlive);
  }

  @override
  bool shouldContinue(WorldState world) {
    if (currentRoomName == endOfRoam.name) return false;
    return true;
  }

  /// Find out if [a] has visited [room] by checking [WorldState.actionRecords].
  bool _actorHasVisitedRoom(WorldState w, Actor a, Room room) {
    for (var record in w.actionRecords) {
      if (record.protagonist != a.id) continue;
      if (record.actionName != TakeExitAction.className) continue;
      // This is a hack. There is no guarantee the description will always
      // contain the room name (and only _that_ room name). Thus, an assert.
      assert(
          record.description.contains("went through exit to"),
          "Description of TakeExitActions has changed. "
          "Maybe this is a good time to implement actual user data "
          "in ActionRecords.");
      if (record.description.contains(room.name)) return true;
    }
    return false;
  }
}
