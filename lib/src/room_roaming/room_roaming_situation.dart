library stranded.room_roaming.room_roaming_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/actions/slay_monsters.dart';
import 'package:edgehead/src/room_roaming/actions/take_exit.dart';
import 'package:edgehead/writers_input.dart' as writers_input;

part 'room_roaming_situation.g.dart';

abstract class RoomRoamingSituation extends Situation
    implements Built<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  factory RoomRoamingSituation([updates(RoomRoamingSituationBuilder b)]) =
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

  bool get monstersAlive;

  @override
  String get name => "RoomRoamingSituation";

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

  @override
  void onAfterAction(WorldState world, _) {
    // When going from place to place, remove the actors that died. It makes
    // sure we don't leak memory.
    world.actors.removeWhere((a) => !a.isAlive);
  }

  /// Moves [a] with their party to [destination].
  void moveActor(WorldState w, Actor a, String destinationRoomName) {
    var room = w.getRoomByName(destinationRoomName);

    var nextRoomSituation = new RoomRoamingSituation.initialized(
        room,
        /* TODO: do not reset monsters when coming back */
        room.monsterGenerator != null);

    w.replaceSituationById(id, nextRoomSituation);

    for (var actor in getPartyOf(a, w).toList()) {
      w.updateActorById(actor.id, (b) => b..currentRoomName = room.name);
    }
  }

  @override
  bool shouldContinue(WorldState world) {
    if (currentRoomName == endOfRoam.name) return false;
    return true;
  }
}
