library stranded.world;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/throw_if_duplicate.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

import 'actor.dart';
import 'room.dart';

/// Builder takes an enemy actor and generates an instance of
/// [EnemyTargetAction] with the given [enemy].
typedef EnemyTargetAction EnemyTargetActionBuilder(Actor enemy);

typedef void EventCallback(
    Simulation sim, WorldStateBuilder world, Storyline storyline);

/// Builder takes an enemy actor and generates an instance of
/// [ExitAction] with the given [exit].
typedef ExitAction ExitActionBuilder(Exit exit);

/// Builder takes situation's items and generates an instance of [ItemAction]
/// with the given [item] and its [description].
typedef ItemAction ItemActionBuilder(ItemLike item);

/// This object contains everything that is completely immutable about the world
/// in which the player character lives.
///
/// For example, the set of [Room]s is part of [Simulation]. These rooms all
/// behave in some way (possible differently according to state) but they are
/// the same set of rooms at the start of play as they are at the end and
/// any time in between.
///
/// [WorldState] is where most of the mutable state lives, including state
/// of [Actor]s, the current [WorldState.time] and the stack of
/// [WorldState.situations].
///
/// In other words, the state of the system should go to [WorldState], while
/// the behavior and immutable structure of the system goes here.
@immutable
class Simulation {
  /// The (immutable) rooms of this world.
  ///
  /// Rooms are the same no matter what happens to the world.
  final Set<Room> rooms;

  /// Combine functions are the different ways an actor can score the world.
  final Map<String, CombineFunction> combineFunctions;

  Simulation(Iterable<Room> rooms, this.combineFunctions)
      : rooms = new Set<Room>.from(rooms) {
    assert(!hasDuplicities(rooms.map((r) => r.name)));
    assert(() {
      for (final room in rooms) {
        if (room.parent != null) {
          final parent = getRoomByName(room.parent);
          if (parent.parent != null) return false;
        }
      }
      return true;
    },
        "Cannot have more than one level of parent-child variants in Rooms: "
        "$rooms");
  }

  /// Generates all applicable actions for [actor] given a [world]. This goes
  /// through all [Situation.actions] as well as [Situation.actionGenerators].
  ///
  /// TODO: Let this be overridden by implementations. The [Simulation]
  ///       abstraction should support whatever game mechanic, not just
  ///       edgehead [EnemyTargetActionBuilder], [ExitActionBuilder], etc.
  Iterable<Action> generateAllActions(ApplicabilityContext context) sync* {
    assert(
        context.world.currentSituation.actions.isNotEmpty ||
            context.world.currentSituation.actionGenerators.isNotEmpty,
        "There are no actions defined for ${context.world.currentSituation}");
    yield* context.world.currentSituation.actions;
    for (var builder in context.world.currentSituation.actionGenerators) {
      if (builder is EnemyTargetActionBuilder) {
        yield* _generateEnemyTargetActions(
            context.actor, context.world, builder);
      } else if (builder is ExitActionBuilder) {
        yield* _generateExitActions(context, builder);
      } else if (builder is ItemActionBuilder) {
        yield* _generateItemActions(context.actor, context.world, builder);
      } else {
        throw new StateError("$builder is not one of the supported ones");
      }
    }
  }

  /// Lists all applicable exits from [room] in current [world].
  ///
  /// Algorithm
  ///
  ///   * Take all exits from current room and its parent (if this room is
  ///     a variant) or children (when this room has variants)
  ///   * Create rule for each, where RULE is compiled thusly:
  ///     * First part comes from the source variant's RULE (or is just
  ///       `null` for generic rooms)
  ///     * Second part comes from the destination variant's RULE (or is just
  ///       `null` for generic rooms)
  ///     * Parts are combined thusly: `(FIRST_PART) && (SECOND_PART)`.
  ///       * When both parts are null, then we use `default` (0 specificity)
  ///       * When one is null, we just use the other
  ///       * Priorities (== specificities) are summed
  ///   * For each rule, get its destination (always the parent room name)
  ///   * Group together rules with same destination, and choose according
  ///     to RULESET
  @visibleForTesting
  Iterable<Exit> getAvailableExits(
      Room room, ApplicabilityContext context) sync* {
    final List<_ExitRule> allExits =
        room.exits.map((exit) => _createExitRule(room, exit)).toList();

    if (room.parent != null) {
      final parent = getRoomByName(room.parent);
      allExits
          .addAll(parent.exits.map((exit) => _createExitRule(parent, exit)));
    }

    for (final variant in _getVariants(room)) {
      allExits
          .addAll(variant.exits.map((exit) => _createExitRule(variant, exit)));
    }

    final Map<int, List<_ExitRule>> paths = {};
    for (final exitRule in allExits) {
      paths.putIfAbsent(
          exitRule.sourceDestinationHash, () => new List<_ExitRule>());
      paths[exitRule.sourceDestinationHash].add(exitRule);
    }

    for (final hash in paths.keys) {
      // For each source -> destination path, pick only the most specific
      // exit.
      final alternatives = paths[hash];
      if (alternatives.length == 1) {
        yield alternatives.single.exit;
        continue;
      }
      alternatives.sort();
      for (final rule in alternatives) {
        if (rule.prerequisite.isSatisfiedBy(context)) {
          yield rule.exit;
          // Break from alternatives.
          break;
        }
      }
    }
  }

  /// Fetches the [Room] with the [roomName].
  Room getRoomByName(String roomName) {
    assert(
        rooms.any((room) => room.name == roomName),
        "Room with name $roomName not defined.\n"
        "Rooms: ${rooms.map((r) => r.name).join(', ')}.\n"
        "Current world: $this.");

    /// TODO: make this O(1) by having a helper Map<String,Room>
    return rooms.singleWhere((room) => room.name == roomName);
  }

  /// Returns the most specific variant of the room, when available. Otherwise,
  /// returns [room].
  Room getVariantIfApplicable(Room room, ApplicabilityContext context) {
    final variants = _getVariants(room).toList(growable: false);
    variants.sort((a, b) => a.prerequisite.compareTo(b.prerequisite));
    for (final variant in variants) {
      if (variant.prerequisite.isSatisfiedBy(context)) {
        return variant;
      }
    }
    return room;
  }

  _ExitRule _createExitRule(Room room, Exit exit) {
    final String source = room.parent ?? room.name;
    final destinationRoom = getRoomByName(exit.destinationRoomName);
    final String destination = destinationRoom.parent ?? destinationRoom.name;
    final firstPart = room.prerequisite;
    final secondPart = destinationRoom.prerequisite;
    // Combine the prerequisites of the source and the destination rooms.
    // Only when both prerequisites are true will we allow the exit to be used.
    // This also gives advantage to more specific exits (those with higher
    // combined [Prerequisite.priority]).
    Prerequisite prerequisite;
    if (firstPart == null && secondPart == null) {
      prerequisite = const Prerequisite.alwaysTrue();
    } else if (secondPart == null) {
      prerequisite = firstPart;
    } else if (firstPart == null) {
      prerequisite = secondPart;
    } else {
      // TODO: better combine function
      final combinedHash = firstPart.hash + secondPart.hash;
      final combinedPriority = firstPart.priority + secondPart.priority;
      // We shouldn't prevent using exit when the source room is `onlyOnce`.
      // Therefore, we're only using the destination's `onlyOnce` value.
      final combinedOnlyOnce = secondPart.onlyOnce;
      final combinedPrerequisite = (ApplicabilityContext context) =>
          firstPart.isSatisfiedBy(context) && secondPart.isSatisfiedBy(context);
      prerequisite = new Prerequisite(combinedHash, combinedPriority,
          combinedOnlyOnce, combinedPrerequisite);
    }
    return new _ExitRule(exit, source, destination, prerequisite);
  }

  /// Generator generates multiple [Action] instances given a [world] and
  /// an [actor] and a [builder].
  ///
  /// For example, a builder called `hitWithStick` can take the current
  /// world and output as many actions as there are enemies to hit with a stick.
  /// Each generated action will encapsulate the enemy to hit.
  Iterable<EnemyTargetAction> _generateEnemyTargetActions(
      Actor actor, WorldState world, EnemyTargetActionBuilder builder) sync* {
    var situationActors =
        world.currentSituation.getActors(world.actors, this, world);
    var enemies = situationActors
        .where((other) => other != actor && other.isAliveAndActive);
    for (var enemy in enemies) {
      var action = builder(enemy);
      assert(action.enemy == enemy);
      if (action.isAggressive && !actor.hates(enemy, world)) continue;
      yield action;
    }
  }

  /// Generator generates multiple [ExitAction] instances given a [world] and
  /// an [actor] and a [builder].
  Iterable<ExitAction> _generateExitActions(
      ApplicabilityContext context, ExitActionBuilder builder) sync* {
    final situation = context.world.currentSituation as RoomRoamingSituation;
    var room = getRoomByName(situation.currentRoomName);

    for (var exit in getAvailableExits(room, context)) {
      var action = builder(exit);
      assert(action.exit == exit);
      yield action;
    }
  }

  /// Generator generates multiple [ItemAction] instances given a [world] and
  /// an [actor] and a [builder].
  Iterable<ItemAction> _generateItemActions(
      Actor actor, WorldState world, ItemActionBuilder builder) sync* {
    final situation = world.currentSituation as FightSituation;

    for (var item in situation.droppedItems) {
      var action = builder(item);
      assert(action.item == item);
      yield action;
    }
  }

  Iterable<Room> _getVariants(Room room) {
    return rooms.where((r) => r.parent == room.name);
  }
}

class _ExitRule implements Comparable<_ExitRule> {
  final Exit exit;

  final String source;

  final String destination;

  final Prerequisite prerequisite;

  const _ExitRule(this.exit, this.source, this.destination, this.prerequisite);

  int get sourceDestinationHash => "$source>>>$destination".hashCode;

  @override
  int compareTo(_ExitRule other) => prerequisite.compareTo(other.prerequisite);
}
