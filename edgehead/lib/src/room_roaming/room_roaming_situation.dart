library stranded.room_roaming.room_roaming_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:collection/collection.dart' show IterableExtension;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/actions/debug_wait.dart';
import 'package:edgehead/src/room_roaming/actions/direct.dart';
import 'package:edgehead/src/room_roaming/actions/eat.dart';
import 'package:edgehead/src/room_roaming/actions/heal.dart';
import 'package:edgehead/src/room_roaming/actions/hire_npc.dart';
import 'package:edgehead/src/room_roaming/actions/put_insect_to_rest.dart';
import 'package:edgehead/src/room_roaming/actions/put_to_rest.dart';
import 'package:edgehead/src/room_roaming/actions/slay_monsters.dart';
import 'package:edgehead/src/room_roaming/actions/take_approach.dart';
import 'package:edgehead/src/room_roaming/actions/take_implicit_approach.dart';
import 'package:edgehead/writers_input.compiled.dart' as writers_input;
import 'package:logging/logging.dart';

part 'room_roaming_situation.g.dart';

abstract class RoomRoamingSituation extends Object
    with SituationBaseBehavior
    implements Built<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  static const String className = "RoomRoamingSituation";

  static final _log = Logger('RoomRoamingSituation');

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
        DirectAction.singleton,
        Eat.singleton,
        PutToRest.singleton,
        PutInsectToRest.singleton,
        AutoSlayMonstersAction.singleton,
        TakeApproachAction.singleton,
        TakeImplicitApproachAction.singleton,
        HireNpcAction.singleton,
        HealAction.singleton,
        ...writers_input.allActions,
        // Debug
        WaitWhileRoamingAction.singleton,
      ];

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
  RoomRoamingSituation elapseTurn() => rebuild((b) => b.turn = b.turn! + 1);

  /// Only player can roam at the moment. But there is also Director.
  @override
  Iterable<Actor> getActors(Simulation sim, WorldState w) {
    var player = _getPlayer(w);
    if (player == null) return [];

    if (w.director != null) {
      return [player, w.director!];
    }

    return [player];
  }

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState world) {
    final actors = getActors(sim, world).toList(growable: false);
    if (actors.isEmpty) return ActorTurn.never;

    final actor = actors[turn % actors.length];
    return ActorTurn(actor, world.time);
  }

  /// Moves [actor] with their party to [destination].
  ///
  /// This will also print out the description of the room (or the short version
  /// as appropriate).
  void moveActor(
      Actor actor, ActionContext context, String destinationRoomName) {
    final WorldState originalWorld = context.world;
    final Simulation sim = context.simulation;
    final WorldStateBuilder w = context.outputWorld;
    final Storyline s = context.outputStoryline;
    final specifiedRoom = sim.getRoomByName(destinationRoomName);
    final parentRoom = sim.getRoomParent(specifiedRoom);
    final room = sim.getVariantIfApplicable(specifiedRoom, context);

    // Find if monsters were slain by seeing if there was slaying
    // performed by the actor in the room.
    assert(
        actor.isPlayer,
        "Currently, we assume slaying only by the player. "
        "Otherwise, we'd have to figure out if _any_ actor slayed "
        "in the room. Actor given: $actor");
    bool monstersAlive = room.fightGenerator != null &&
        !originalWorld.slayHistory.query(room).hasHappened;
    if (room.fightGenerator != null && !monstersAlive) {
      // Monsters are _still_ alive (in other words, this room has the ability
      // to have monsters (fightGenerator) and they haven't been slain.
      assert(
          originalWorld.slayHistory.query(room).count == 1,
          "Currently, we assume only one slaying per room, ever. "
          "If this assumption doesn't hold, we need to somehow track "
          "'monster re-population events' and check them here.");
    }

    var nextRoomSituation =
        RoomRoamingSituation.initialized(w.randomInt(), room, monstersAlive);

    w.replaceSituationById(id, nextRoomSituation);

    final hasVisitedThisVariant =
        originalWorld.visitHistory.query(actor, room).hasHappened;
    final hasVisitedAnyVariant = originalWorld.visitHistory
        .query(actor, room, includeVariants: true)
        .hasHappened;

    // Move the actor and also all the other actors in the party.
    for (final member in getPartyOf(actor, sim, w.build())) {
      w.updateActorById(member.id, (b) => b..currentRoomName = parentRoom.name);
      // Do not record the visit just yet. It could mess with the reporting
      // below. We record the visit at the end of this method.
    }

    // Make a copy of the context after the relocation has been applied,
    // so that describers below can depend on the player and their entourage
    // to already be where they're going.
    final afterMoveContext = ActionContext.updatedFrom(context);

    if (!hasVisitedAnyVariant) {
      // The very first time here.
      if (room.firstDescribe == null) {
        // Show short description if there is no long description.
        assert(
            room.describe != null,
            "$room visited for the second time but "
            "no regular description available.");
        if (room.describe != null) {
          // ignore: prefer_null_aware_method_calls
          room.describe!(afterMoveContext);
        } else {
          _log.warning("Room ${room.name} has no firstDescribe or describe. "
              "We're here for the first time.");
        }
      } else {
        // Otherwise, show long description.
        s.addParagraph();
        room.firstDescribe!(afterMoveContext);
        s.addParagraph();
      }
    } else if (!hasVisitedThisVariant) {
      // First time in this particular variant of the room.
      if (room.variantUpdateDescribe == null) {
        // Show short description if there is no long description.
        assert(
            room.describe != null,
            "$room (variant) visited for the second time but "
            "no regular description available.");
        if (room.describe != null) {
          // ignore: prefer_null_aware_method_calls
          room.describe!(afterMoveContext);
        } else {
          _log.warning("Room ${room.name} has no firstDescribe or describe. "
              "We've been here, but not this variant of the room.");
        }
      } else {
        // Otherwise, show long variant description.
        s.addParagraph();
        room.variantUpdateDescribe!(afterMoveContext);
        s.addParagraph();
      }
    } else {
      // The player has been here, even in the current variant of the room.
      assert(
          room.describe != null,
          "$room visited for the second time but "
          "no regular description available.");
      if (room.describe != null) {
        // ignore: prefer_null_aware_method_calls
        room.describe!(afterMoveContext);
      } else {
        _log.warning("Room ${room.name} has no firstDescribe or describe. "
            "We've been in this variant before.");
      }
    }

    // Only talk about NPCs and corpses _after_ the initial fight.
    if (!monstersAlive) {
      final localNpcs = _getNpcs(w.build())
          .where((npc) => npc.currentRoomName == parentRoom.name)
          .where((npc) => npc.npc.followingActorId != actor.id)
          .toList();
      // First, let the overrides take place.
      Set<Actor> overridden = {};
      for (final npc in localNpcs) {
        if (sim.maybeDescribeActor(afterMoveContext, npc)) {
          overridden.add(npc);
        }
      }
      localNpcs.removeWhere((element) => overridden.contains(element));

      if (localNpcs.isNotEmpty) {
        s.addEnumeration("<subject> <also> see", localNpcs, "here",
            subject: _getPlayer(originalWorld));
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

    // Record the visit of the actor and also all the other actors in the party.
    for (final member in getPartyOf(actor, sim, w.build())) {
      // The actors have already been moved at the start of method.
      // Here we just record their visit.
      w.recordVisit(member, room, actor.currentRoomName!);
    }
  }

  @override
  void onAfterAction(ActionContext context) {
    final world = context.outputWorld.build();
    final sim = context.simulation;
    assert(_assertInvincibleActorsAlive(world));
    assert(_assertNobodyInVariantRoom(world, sim));

    assert(_logIfRoomVariantNoLongerValid(context));

    // Move corpses to the parent room so they can be found more easily.
    final corpses = _getCorpses(world);
    for (final corpse in corpses) {
      assert(
          corpse.currentRoomName != null,
          "Corpse of ${corpse.name} has "
          "currentRoomName null.\n"
          "How we got here: ${world.actionHistory.describe()}");
      var parent =
          sim.getRoomParent(sim.getRoomByName(corpse.currentRoomName!));
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
      if (actor.isInvincible && !actor.isAnimated) {
        assert(
            false,
            "Actor ${actor.name} is invincible but not alive. "
            "This happened: ${world.actionHistory.describe()}");
        return false;
      }
    }
    return true;
  }

  bool _assertNobodyInVariantRoom(WorldState world, Simulation sim) {
    for (final actor in world.actors) {
      if (actor.currentRoomName == null) continue;
      final room = sim.getRoomByName(actor.currentRoomName!);
      if (room.parent != null) {
        assert(
            false,
            "Actors should be placed into parent rooms, never into a variant. "
            "Actor ${actor.name} is in ${actor.currentRoomName}, "
            "which has a parent (${room.parent})");
        return false;
      }
    }
    return true;
  }

  Iterable<Actor> _getCorpses(WorldState world) =>
      world.actors.where((a) => a.isActive && !a.isAnimated);

  Iterable<Actor> _getNpcs(WorldState world) =>
      world.actors.where((a) => a.isAnimatedAndActive && !a.isPlayer);

  Actor? _getPlayer(WorldState world) =>
      world.actors.firstWhereOrNull((a) => a.isPlayer && a.isAnimatedAndActive);

  /// Asserts that the room variant doesn't change "under" the player.
  /// This would be a bad idea, since there's no way to report this change
  /// and moving from here to another place could become impossible.
  bool _logIfRoomVariantNoLongerValid(ActionContext context) {
    final room = context.simulation.getRoomByName(currentRoomName);
    if (room.prerequisite != null) {
      final newContext = ApplicabilityContext(
          context.outputWorld.getActorById(context.actor.id),
          context.simulation,
          context.outputWorld.build());
      final stillSatisfied = room.prerequisite!.isSatisfiedBy(newContext);

      if (!stillSatisfied) {
        _log.warning(
            "The current room variant ($currentRoomName) ceased to be valid "
            "after ${context.currentAction.name} by ${context.actor.name}.");
        if (context.actor.isDirector) {
          assert(
              false,
              "The director changed the room from under the player. "
              "The current room variant ($currentRoomName) ceased to be valid "
              "after a director move. How we got here: "
              "${context.outputWorld.build().actionHistory.describe()}");
        }
      }
    }
    return true;
  }
}
