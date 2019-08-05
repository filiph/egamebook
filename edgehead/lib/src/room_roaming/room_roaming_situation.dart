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
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/actions/slay_monsters.dart';
import 'package:edgehead/src/room_roaming/actions/take_approach.dart';
import 'package:edgehead/src/room_roaming/actions/take_implicit_approach.dart';
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
        ..turn = 0
        ..currentRoomName = currentRoom.name
        ..monstersAlive = monstersAlive);

  RoomRoamingSituation._();

  /// All actions that player can do while exploring.
  @override
  List<Action> get actions => [
        TakeApproachAction.singleton,
        TakeImplicitApproachAction.singleton,
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
  int get turn;

  @override
  RoomRoamingSituation elapseTurn() => rebuild((b) => b..turn += 1);

  @override
  Iterable<Actor> getActors(Simulation sim, WorldState w) {
    var _player = _getPlayer(w);
    if (_player == null) return [];
    return [_player];
  }

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState world) {
    // Only player can roam at the moment.
    var player = _getPlayer(world);
    if (player == null) return ActorTurn.never;
    return ActorTurn(player, world.time);
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
    final parentRoom = sim.getRoomParent(specifiedRoom);
    final room = sim.getVariantIfApplicable(specifiedRoom, context);

    // Find if monsters were slain by seeing if there was a [TakeApproach]
    // action record leading to this room.
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

      final localCorpses = _getCorpses(w.build())
          .where((a) => a.currentRoomName == parentRoom.name)
          .toList();
      if (localCorpses.isNotEmpty) {
        s.addEnumeration(
            "<subject> can <also> see the remains of", localCorpses, "here",
            subject: _getPlayer(originalWorld));
      }
    }

    for (final actor in getPartyOf(a, sim, w.build())) {
      w.updateActorById(actor.id, (b) => b..currentRoomName = room.name);
      w.recordVisit(actor, room);
    }
  }

  @override
  void onAfterAction(ActionContext context) {
    final world = context.outputWorld.build();
    final sim = context.simulation;
    assert(_assertInvincibleActorsAlive(world));

    // Move corpses to the parent room so they can be found more easily.
    final corpses = _getCorpses(world);
    for (final corpse in corpses) {
      var parent = sim.getRoomParent(sim.getRoomByName(corpse.currentRoomName));
      if (parent.name != corpse.currentRoomName) {
        context.outputWorld
            .updateActorById(corpse.id, (b) => b.currentRoomName = parent.name);
      }
    }
  }

  @override
  bool shouldContinue(Simulation sim, WorldState world) {
    if (currentRoomName == endOfRoam.name) return false;
    return true;
  }

  bool _assertInvincibleActorsAlive(WorldState world) {
    for (final actor in world.actors) {
      if (actor.isInvincible && !actor.isAlive) {
        assert(
            false,
            "Actor ${actor.name} is invincible but not alive. "
            "This happened: ${world.actionHistory.describe()}");
        return false;
      }
    }
    return true;
  }

  Iterable<Actor> _getCorpses(WorldState world) =>
      world.actors.where((a) => a.isActive && !a.isAlive);

  Actor _getPlayer(WorldState world) => world.actors
      .firstWhere((a) => a.isPlayer && a.isAliveAndActive, orElse: () => null);
}
