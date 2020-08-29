import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:logging/logging.dart';

class TakeApproachAction extends Action<RoomPath> {
  static const String className = "TakeApproachAction";

  static final TakeApproachAction singleton = TakeApproachAction();

  static final Logger _log = Logger('TakeApproachAction');

  @override
  List<String> get commandPathTemplate =>
      throw UnimplementedError('This action overrides getCommandPath().');

  @override
  String get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context, RoomPath path) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, RoomPath path) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    if (path.approach.description != null) {
      path.approach.description(context);
    }

    // The current situation might not be room roaming situation because
    // `path.approach.description` might have added another situation on top
    // of the stack.
    final roomRoamingSituation = w.getSituationByName<RoomRoamingSituation>(
        RoomRoamingSituation.className);
    roomRoamingSituation.moveActor(context, path.approach.to);

    return "${a.name} went through approach to ${path.approach.to}";
  }

  @override
  Iterable<RoomPath> generateObjects(ApplicabilityContext context) {
    final situation = context.world.currentSituation as RoomRoamingSituation;
    var room = context.simulation.getRoomByName(situation.currentRoomName);
    _log.finest(() => 'Generating approaches for ${context.actor} from $room');

    return _walkApproaches(context, room);
  }

  /// [TakeApproach] returns the path from the current position to
  /// [Approach.to], as a list of coordinates.
  ///
  /// For example, `[0, 0, 10, 5, 100, 100]` is a path from (0, 0)
  /// through (10, 5) to (100, 100).
  @override
  List<int> getAdditionalData(ApplicabilityContext context, RoomPath path) {
    return path.getPathCoordinates().toList(growable: false);
  }

  /// [TakeApproach] returns an additional hint to show alongside the map pin.
  /// This is the "description" of the destination.
  @override
  Map<String, String> getAdditionalStrings(
      ApplicabilityContext context, RoomPath path) {
    if (!path.destination.isOnMap) {
      // Bail out early.
      return const {};
    }

    final wasVisited = _alreadyVisited(context, path.destination);
    // Either provide the first or the following hint, or an empty string
    // if both are missing.
    final hint =
        (wasVisited ? path.destination.hint : path.destination.firstHint) ?? '';
    return {
      'hint': hint,
    };
  }

  /// When the writer specifies a command with the approach, it will be used.
  ///
  /// For example, "go >> upper door".
  ///
  /// Otherwise, the destination room's `MAP_NAME` (or `FIRST_MAP_NAME`)
  /// will be used.
  @override
  List<String> getCommandPath(ApplicabilityContext context, RoomPath path) {
    if (path.approach.command.isNotEmpty) {
      return path.approach.command.split(' >> ');
    }

    assert(
        path.destination.mapName != null,
        "When command isn't provided, "
        "then the destination room _must_ have a mapName.");

    final wasVisited = _alreadyVisited(context, path.destination);
    final name = wasVisited
        ? path.destination.mapName
        : (path.destination.firstMapName ?? path.destination.mapName);
    return ['Go', name];
  }

  @override
  Duration getRecoveryDuration(ApplicabilityContext context, RoomPath _) {
    // Moving around the map takes significantly more time than the ordinary
    // action.
    return const Duration(minutes: 10);
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, RoomPath path) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, RoomPath path) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, RoomPath path) {
    if (path.approach.isImplicit) {
      // Implicit approaches are covered by TakeImplicitApproachAction.
      return false;
    }

    if ((w.currentSituation as RoomRoamingSituation).monstersAlive) {
      // Don't allow exit taking when monsters in this room are still alive.
      return false;
    }

    if (path.approach.isApplicable != null) {
      return path.approach.isApplicable(c);
    }

    return true;
  }

  bool _alreadyVisited(ApplicabilityContext context, Room destination) {
    return context.world.visitHistory
        .query(context.actor, destination, includeVariants: true)
        .hasHappened;
  }

  /// Returns all approaches that can be accessed from [startingRoom] either
  /// directly, or through a set of already-explored other rooms.
  ///
  /// This lets the player "fast travel" throughout the map.
  static Iterable<RoomPath> _walkApproaches(
      ApplicabilityContext context, Room startingRoom) sync* {
    // The unclosed paths that we yet have to explore.
    final open = <RoomPath>{};

    if (startingRoom.parent != null &&
        startingRoom.prerequisite?.isSatisfiedBy(context) == false) {
      // The [startingRoom] is no longer a valid variant. We need to use
      // the parent instead.
      open.add(RoomPath.start(context.simulation.getRoomParent(startingRoom)));
    } else {
      // This is either a parent room, or a valid variant. Just add it.
      open.add(RoomPath.start(startingRoom));
    }

    // Rooms that have been visited by the walk, and therefore shouldn't be
    // considered again.
    // These are normalized to the parent (no variants here).
    final closed = <Room>{context.simulation.getRoomParent(startingRoom)};

    int count = 0;
    while (open.isNotEmpty) {
      final current = open.first;
      open.remove(current);
      _log.finest(() => 'Going from sourceRoom=${current.from} '
          '(open.length=${open.length})');

      final approaches = context.simulation
          .getAvailableApproaches(current.destination, context)
          .toList(growable: false);

      assert(approaches.every((a) => !a.isImplicit) || approaches.length == 1,
          "You can have only one implicit approach: $approaches");

      for (final approach in approaches) {
        final destination = context.simulation.getRoomByName(approach.to);
        final destinationParent = context.simulation.getRoomParent(destination);

        if (closed.contains(destinationParent)) {
          // Don't revisit rooms that have already been walked by
          // this algorithm.
          continue;
        }

        closed.add(destination);

        // Construct the new path from the last one, by adding one intermediate
        // room, and changing the destination.
        final newPath = RoomPath(
          startingRoom,
          current.destination,
          destination,
          approach,
          List.from(current.intermediateRooms)..add(current.destination),
        );

        if (approach.isImplicit) {
          // Don't auto-travel through implicit approaches. Just yield it.
          yield newPath;
          count++;
          continue;
        }

        yield newPath;
        count++;

        if (context.world.visitHistory
            .query(context.actor, destination, includeVariants: true)
            .hasHappened) {
          // The actor has been here. They can "fast travel" through.
          open.add(newPath);
        }
      }
    }
    if (count == 0) {
      _log.severe('No approach coming from $startingRoom');
    }
  }
}

class RoomPath {
  static final Logger _log = Logger('RoomPath');

  final Approach approach;

  /// The origin of the path.
  final Room origin;

  /// The last room on this path.
  final Room destination;

  /// The second to last room on this path.
  final Room from;

  final List<Room> intermediateRooms;

  const RoomPath(this.origin, this.from, this.destination, this.approach,
      this.intermediateRooms)
      : assert(origin != null),
        assert(from != null),
        assert(destination != null),
        assert(approach != null),
        assert(intermediateRooms != null);

  const RoomPath.start(this.destination)
      : origin = null,
        from = null,
        intermediateRooms = const [],
        approach = null;

  bool get isStart => origin == null;

  /// Constructs the list of coordinates that we can send to the UI as a path.
  Iterable<int> getPathCoordinates() sync* {
    assert(
        !isStart,
        'Trying to construct path for RoomPath.start(). '
        'This should not happen: the starting path is empty, and only used '
        'for the tree search.');

    if (!origin.isOnMap) {
      _log.info('$origin in $this has no position. Returning empty path.');
      return;
    }

    if (!destination.isOnMap) {
      _log.info('$destination in $this has no position. '
          'Returning empty path.');
      return;
    }

    yield origin.positionX;
    yield origin.positionY;

    for (final room in intermediateRooms) {
      if (!room.isOnMap) {
        continue;
      }

      yield room.positionX;
      yield room.positionY;
    }

    yield destination.positionX;
    yield destination.positionY;
  }

  @override
  String toString() => 'RoomPath<$origin, $from, $destination, $approach>';
}
