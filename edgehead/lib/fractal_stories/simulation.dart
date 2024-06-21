import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/ink_ast.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/util/throw_if_duplicate.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/writers_input.compiled.dart';
import 'package:logging/logging.dart';
import 'package:meta/meta.dart';

typedef EventCallbackFunction = void Function(ActionContext c, Simulation sim,
    WorldStateBuilder world, Storyline storyline);

/// A function to be called at a specified time.
///
/// This is a simple wrapper around the [EventCallbackFunction]. We can't
/// use [EventCallbackFunction] directly because `pkg:built_value`
/// has trouble when serializing functions (which stems from typedefs
/// not having "names", instead using something like `(Parameter p) → void`).
class EventCallback {
  final EventCallbackFunction _function;

  const EventCallback(this._function);

  /// Run the underlying [_function].
  ///
  /// This method should have the same signature as [EventCallbackFunction]
  /// itself.
  void run(ActionContext c, Simulation sim, WorldStateBuilder world,
          Storyline storyline) =>
      _function(c, sim, world, storyline);
}

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
  /// This is the name of the first room. It is never visited by the actor.
  /// Writers should start their game with an implicit approach from the room
  /// to the starting room of their adventure.
  static const preStartBookName = 'pre_start_book';

  /// The (immutable) rooms of this world.
  ///
  /// Rooms are the same no matter what happens to the world.
  final Set<Room> rooms;

  final Set<Approach> approaches;

  final Map<String, InkAst> inks;

  final Ruleset directorRuleset;

  final Logger log = Logger('Simulation');

  /// Fold functions are the different ways an actor scores the world.
  ///
  /// Every actor gets the same [ActorScoreChange] from the planner. This is
  /// a multi-dimensional description of what the world might look like
  /// if the actor takes an action. The fold function differs between
  /// different types of AI actors, though, and it is responsible for
  /// folding the multidimensional [ActorScoreChange] into a simple scalar
  /// that can be used for ranking actions.
  final Map<String, FoldFunction> foldFunctions;

  /// This is a map from actor ids to describer functions. Every time the
  /// simulation wants to describe a presence of an actor (such as when we
  /// visit a room where the actor resides), we check this map.
  ///
  /// By default, actors in a room are described with something like
  /// “John is here.” But oftentimes, we want to say this in
  /// the description prose instead, or we want the actor to do
  /// something (like, wave at the player).
  ///
  /// If the function behind the relevant [Actor.id] returns `true`, then
  /// the simulation will not describe the presence of the actor
  /// ("John is here."). The function can choose to add something to the
  /// storyline ("John waves at me.").
  final Map<int, bool Function(ActionContext)> actorDescribeOverrides;

  Simulation(
    Iterable<Room> rooms,
    Iterable<Approach> approaches,
    this.foldFunctions,
    this.directorRuleset,
    this.inks,
    this.actorDescribeOverrides,
  )   : rooms = Set<Room>.from(rooms),
        approaches = Set<Approach>.from(approaches),
        assert(!hasDuplicities(rooms.map((r) => r.name))),
        assert(() {
          final allNames = rooms.map((r) => r.name);
          for (final approach in approaches) {
            if (!allNames.contains(approach.from)) {
              print("MISSING FROM: ${approach.from}");
              return false;
            }
            if (!allNames.contains(approach.to)) {
              print("MISSING TO: ${approach.to}");
              return false;
            }
          }
          return true;
        }(), "Approaches must specify existing rooms") {
    assert(() {
      for (final room in rooms) {
        if (room.parent != null) {
          final parent = getRoomByName(room.parent!);
          if (parent.parent != null) return false;
        }
      }
      return true;
    }(),
        "Cannot have more than one level of parent-child variants in Rooms: "
        "$rooms");
  }

  /// Generates all applicable actions for [actor] given a [world]. This goes
  /// through all [Situation.actions] as well as [Situation.actionGenerators].
  Iterable<Performance<Object?>> generateAllPerformances(
      ApplicabilityContext context) sync* {
    assert(context.world.currentSituation!.actions.isNotEmpty,
        "There are no actions defined for ${context.world.currentSituation}");

    bool correspondsToDirectorStatus(Action action) {
      if (action.isDirectorAction && context.actor.isDirector) return true;
      if (!action.isDirectorAction && !context.actor.isDirector) return true;
      return false;
    }

    for (final action in context.world.currentSituation!.actions) {
      if (!correspondsToDirectorStatus(action)) continue;

      if (action is Action<Nothing?>) {
        assert(action is! Action<Approach>);
        if (!action.isApplicable(
            context, context.actor, context.simulation, context.world, null)) {
          log.finer(() => "- action '${action.name}' isn't applicable");
          continue;
        }
        final successChance = action.getSuccessChance(
            context.actor, context.simulation, context.world, null);
        final additionalData = action.getAdditionalData(context, null);
        final additionalStrings = action.getAdditionalStrings(context, null);
        yield Performance<Nothing?>(action, context, null, successChance,
            additionalData, additionalStrings);
        continue;
      }

      final targets = action.generateObjects(context);

      for (final target in targets) {
        if (!action.isApplicable(context, context.actor, context.simulation,
            context.world, target)) {
          log.finer(() => "- action '${action.name}' isn't applicable");
          continue;
        }
        final successChance = action.getSuccessChance(
            context.actor, context.simulation, context.world, target);
        final additionalData = action.getAdditionalData(context, target);
        final additionalStrings = action.getAdditionalStrings(context, target);
        yield Performance<Object>(action as Action<Object>, context,
            target as Object, successChance, additionalData, additionalStrings);
      }
    }
  }

  /// Lists all available approaches from [room] in current [world].
  /// This does _not_ weed out approaches that are not applicable given
  /// the current [context].
  ///
  /// Algorithm
  ///
  ///   * Take all approaches from current room and its parent (if this room is
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
  Iterable<Approach> getAvailableApproaches(
      Room room, ApplicabilityContext context) sync* {
    final List<_ApproachRule> allExits = context.simulation.approaches
        .where((a) => a.from == room.name || a.from == room.parent)
        .map((a) => _createApproachRule(room, a))
        .toList();

    for (final variant in _getVariants(room)) {
      allExits.addAll(context.simulation.approaches
          .where((a) => a.from == variant.name)
          .map((a) => _createApproachRule(variant, a)));
    }

    final Map<int, List<_ApproachRule>> paths = {};
    for (final approachRule in allExits) {
      paths.putIfAbsent(
          approachRule.sourceDestinationHash, () => <_ApproachRule>[]);
      paths[approachRule.sourceDestinationHash]!.add(approachRule);
    }

    for (final hash in paths.keys) {
      // For each source -> destination path, pick only the most specific
      // exit.
      final alternatives = paths[hash]!;
      alternatives.sort();
      for (final rule in alternatives) {
        if (rule.prerequisite.isSatisfiedBy(context)) {
          yield rule.approach;
          // Break from alternatives.
          break;
        }
      }
    }
  }

  InkAst getInkByName(String inkAstName) {
    if (!allInks.containsKey(inkAstName)) {
      throw StateError('missing ink: $inkAstName');
    }
    return allInks[inkAstName]!;
  }

  /// Fetches the [Room] with the [roomName].
  Room getRoomByName(String roomName) {
    assert(
        rooms.any((room) => room.name == roomName),
        "Room with name $roomName not defined.\n"
        "Rooms: ${rooms.map((r) => r.name).join(', ')}.");

    return rooms.singleWhere((room) => room.name == roomName);
  }

  /// Returns the parent of this room. If [room] is a variant, this function
  /// will return the main room. If [room] is the main room, it will be
  /// returned.
  ///
  /// If the parent of this room also has a parent, then the "grand parent"
  /// will be returned. And so on until there is no other ancestor.
  Room getRoomParent(Room room) {
    var result = room;
    // This method is ready for the possibility of a chain of variants
    // (i.e. a variant of a variant of a room).
    while (result.parent != null) {
      result = getRoomByName(room.parent!);
    }
    return result;
  }

  /// Returns the most specific variant of the room, when available. Otherwise,
  /// returns [room].
  Room getVariantIfApplicable(Room room, ApplicabilityContext context) {
    final variants = _getVariants(room).toList(growable: false);
    variants.sort((a, b) => a.prerequisite!.compareTo(b.prerequisite!));
    for (final variant in variants) {
      if (variant.prerequisite!.isSatisfiedBy(context)) {
        return variant;
      }
    }
    return room;
  }

  bool maybeDescribeActor(ActionContext context, Actor actor) {
    if (!actorDescribeOverrides.containsKey(actor.id)) {
      return false;
    }

    return actorDescribeOverrides[actor.id]!(context);
  }

  _ApproachRule _createApproachRule(Room room, Approach approach) {
    final String source = room.parent ?? room.name;
    final destinationRoom = getRoomByName(approach.to);
    final String destination = destinationRoom.parent ?? destinationRoom.name;
    final firstPart = room.prerequisite;
    final secondPart = destinationRoom.prerequisite;
    // Combine the prerequisites of the source and the destination rooms.
    // Only when both prerequisites are true will we allow the exit to be used.
    // This also gives advantage to more specific exits (those with higher
    // combined [Prerequisite.priority]).
    late Prerequisite prerequisite;
    if (firstPart == null && secondPart == null) {
      prerequisite = const Prerequisite.alwaysTrue();
    } else if (secondPart == null) {
      prerequisite = firstPart!;
    } else if (firstPart == null) {
      prerequisite = secondPart;
    } else {
      final combinedHash = firstPart.hash * 31 + secondPart.hash;
      final combinedPriority = firstPart.priority + secondPart.priority;
      // We shouldn't prevent using exit when the source room is `onlyOnce`.
      // Therefore, we're only using the destination's `onlyOnce` value.
      final combinedOnlyOnce = secondPart.onlyOnce;
      bool combinedPrerequisite(ApplicabilityContext context) =>
          firstPart.isSatisfiedBy(context) && secondPart.isSatisfiedBy(context);
      prerequisite = Prerequisite(combinedHash, combinedPriority,
          combinedOnlyOnce, combinedPrerequisite);
    }
    return _ApproachRule(approach, source, destination, prerequisite);
  }

  Iterable<Room> _getVariants(Room room) {
    return rooms.where((r) => r.parent == room.name);
  }
}

class _ApproachRule implements Comparable<_ApproachRule> {
  final Approach approach;

  final Prerequisite prerequisite;

  final String source;

  final String destination;

  const _ApproachRule(
      this.approach, this.source, this.destination, this.prerequisite);

  int get sourceDestinationHash => "$source>>>$destination".hashCode;

  @override
  int compareTo(_ApproachRule other) =>
      prerequisite.compareTo(other.prerequisite);
}
