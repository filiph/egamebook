library stranded.room_roaming.room_roaming_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/actions/slay_monsters.dart';
import 'package:edgehead/src/room_roaming/actions/take_approach.dart';
import 'package:edgehead/writers_input.compiled.dart' as writers_input;

part 'room_roaming_situation.g.dart';

abstract class RoomRoamingSituation extends Object
    with SituationBaseBehavior
    implements Built<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  static const String className = "RoomRoamingSituation";

  static Serializer<RoomRoamingSituation> get serializer =>
      _$roomRoamingSituationSerializer;

  factory RoomRoamingSituation([void updates(RoomRoamingSituationBuilder b)]) =
      _$RoomRoamingSituation;

  factory RoomRoamingSituation.initialized(
          int id, Room currentRoom, bool monstersAlive) =>
      RoomRoamingSituation((b) => b
        ..id = id
        ..time = 0
        ..currentRoomName = currentRoom.name
        ..monstersAlive = monstersAlive);

  RoomRoamingSituation._();

  /// TODO: add all other actions that player can do while exploring
  @override
  List<Action> get actions => [
        TakeApproachAction.singleton,
      ]
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
  Actor getCurrentActor(Simulation sim, WorldState world) {
    // Only player can roam at the moment.
    var mainActor = world.actors.firstWhere(
        (a) => a.isPlayer && a.isAliveAndActive,
        orElse: () => null);
    return mainActor;
  }

  @override
  Iterable<Actor> getActors(
      Iterable<Actor> actors, Simulation sim, WorldState world) {
    var mainActor = getCurrentActor(sim, world);
    if (mainActor == null) return [];
    return [mainActor];
  }

  /// Moves [a] with their party to [destination].
  ///
  /// This will also print out the description of the room (or the short version
  /// as appropriate).
  ///
  /// [silent] is used when we are describing the move in a pre-written phrase
  /// so describing it automatically would be a duplicate.
  void moveActor(ActionContext context, String destinationRoomName,
      {bool silent = false}) {
    final WorldState originalWorld = context.world;
    final Simulation sim = context.simulation;
    final Actor a = context.actor;
    final WorldStateBuilder w = context.outputWorld;
    final Storyline s = context.outputStoryline;
    final specifiedRoom = sim.getRoomByName(destinationRoomName);
    final room = sim.getVariantIfApplicable(specifiedRoom, context);

    // Find if monsters were slain by seeing if there was a [TakeExit] action
    // record leading to this room.
    bool visited = originalWorld.visitHistory.query(a, room).hasHappened;

    var nextRoomSituation = RoomRoamingSituation.initialized(
        w.randomInt(), room, !visited && room.fightGenerator != null);

    w.replaceSituationById(id, nextRoomSituation);
    w.recordVisit(a, room);

    if (!silent) {
      if (room.firstDescribe == null ||
          originalWorld.visitHistory.query(a, room).hasHappened) {
        // Show short description if there is no long description or
        // if the actor has been here.
        assert(
            room.describe != null,
            "$room visited for the second time but "
            "no regular description available.");
        room.describe(context);
      } else {
        // Otherwise, show long description.
        s.addParagraph();
        room.firstDescribe(context);
        s.addParagraph();
      }
    }

    for (final actor in getPartyOf(a, sim, originalWorld)) {
      w.updateActorById(actor.id, (b) => b..currentRoomName = room.name);
      w.recordVisit(actor, room);
    }
  }

  @override
  void onAfterAction(
      Simulation sim, WorldStateBuilder world, Storyline outputStoryline) {
    // When going from place to place, remove the actors that died. It makes
    // sure we don't leak memory.
    world.actors.removeWhere((a) => !a.isAlive);
  }

  @override
  bool shouldContinue(Simulation sim, WorldState world) {
    if (currentRoomName == endOfRoam.name) return false;
    return true;
  }
}
