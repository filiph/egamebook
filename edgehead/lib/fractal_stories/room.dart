import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/shared_constants.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

/// Describer that doesn't output any text at all.
///
/// ignore: prefer_function_declarations_over_variables
final RoomDescriber emptyRoomDescription = (c) {};

/// This is the magic [Room] that, when reached, makes
/// the room roaming situation stop.
final Room endOfRoam = Room(
  endOfRoamName,
  emptyRoomDescription,
  emptyRoomDescription,
  null,
  null,
  positionX: 48,
  positionY: 100,
  mapName: 'End of Adventure',
  hint: 'There is always the possibility to go home.',
);

/// This generator creates a [FightSituation].
///
/// TODO: remove the dependency on [FightSituation] and [RoomRoamingSituation]
///       or pull out Room into RoomRoaming instead of having it here.
typedef FightGenerator = FightSituation Function(ActionContext context,
    RoomRoamingSituation roomRoamingSituation, List<Actor> party);

typedef ItemGenerator = Iterable<Item> Function(
    Simulation sim, WorldState world);

/// A function that should use [s] to report on what the player sees when
/// entering the room.
///
/// The function can modify the [WorldState] if need be (for example, for
/// counting purposes - "how many times did we see that artifact?").
typedef RoomDescriber = void Function(ActionContext context);

// TODO: add noItemsInRoom and noMonstersInRoom to be used instead of `null`
//       similar to emptyRoomDescription

/// Rooms are places where the player and other NPCs can explore.
///
/// They can sometimes be metaphorical (like "memory of mother")
/// but it's best if they are concrete, physical places.
@immutable
class Room {
  /// This is the internal ("writer's") name of the room, such as
  /// `meadow` or `west_of_house`.
  final String name;

  /// This is the name of the room as seen on the map after the player
  /// has visited it at least once.
  ///
  /// Example: "The Tomb of the Raider"
  ///
  /// Can be `null` if the [Room] doesn't appear on any map.
  final String? mapName;

  /// This is the name of the room as seen on the map before the player
  /// visits it.
  ///
  /// Example: "a dark place"
  ///
  /// Can be `null` if the [Room] doesn't appear on any map.
  final String? firstMapName;

  /// The long-form description of this place. This can remind the player
  /// what this room is.
  ///
  /// Can be `null` if the [Room] doesn't appear on any map.
  final String? hint;

  /// The long-form description of what to expect in this place. This is
  /// shown only _before_ the player visits the room.
  ///
  /// Can be `null` if the [Room] doesn't appear on any map.
  final String? firstHint;

  /// Fully describes the room according to current state of the world when
  /// the actor first sees it.
  ///
  /// When this is `null`, then [describe] is used for the first
  /// visit as well for all other visits.
  final RoomDescriber? firstDescribe;

  /// Describes the room with a short blurb, after player has already visited
  /// it at least once.
  ///
  /// When this is `null` and the player visits the room more than once,
  /// an [AssertionError] is thrown.
  final RoomDescriber? describe;

  /// The description for when the player has visited this place before
  /// (they got the [firstDescribe], either from the main room, or a variant
  /// of it) but this is the first time they are visiting _this particular_
  /// variant. They need an update on what's new here.
  final RoomDescriber? variantUpdateDescribe;

  /// Optionally, a [Room] can have a parent room. In that case, this room
  /// is a specialized version (variant) of the parent.
  ///
  /// For example, a forge can have a variant after it has burned down. The
  /// `burned_down_forge` variant would specify `forge` as its parent, and
  /// would have a [prerequisite] that checks if the forge has burned down.
  ///
  /// [parent] is specified as a String. It must correspond to the parent's
  /// [Room.name].
  final String? parent;

  /// If present, and if [Prerequisite.isSatisfiedBy] evaluates to
  /// `true`, then this room will override its [parent] room.
  ///
  /// For [Prerequisite.hash], use [Room.name.hashCode].
  final Prerequisite? prerequisite;

  /// A function that builds the fight situation in the Room when player arrives
  /// for the first time.
  ///
  /// It's a function instead of a constant because we want to only
  /// initialize the fight situation and the monsters when we get to them
  /// (so that they don't take memory and CPU) and sometimes we might like
  /// varying fights according to current [Simulation].
  ///
  /// When this is `null`, there is no fight here.
  final FightGenerator? fightGenerator;

  /// A function that creates items that are in the Room when player arrives
  /// for the first time.
  ///
  /// It's a function instead of a constant list because we want to only
  /// initialize items when we get to them (so that they don't take memory
  /// and CPU) and sometimes we might like varying items according to
  /// current [Simulation].
  ///
  /// When this is `null`, there are no items here.
  final ItemGenerator? itemGenerator;

  /// The ground material, used for procedural descriptions.
  ///
  /// Example: "muddy ground"
  ///
  /// This will render into "There is a dagger lying on the muddy ground."
  final String groundMaterial;

  /// The room is a place where the player can idle (they can read letters,
  /// talk to NPCs, etc.).
  final bool isIdle;

  /// The room should not allow normal actions, such as healing
  /// or talking. The only actions here should be implicit, such as
  /// TakeImplicitApproach.
  final bool isSynthetic;

  /// When this is `true`, fight doesn't start automatically when the player
  /// enters the room. Instead, the writer has the option to call
  /// [SlayMonstersAction.pushFightSituation] manually in some action.
  ///
  /// This allows having rooms in which the player stays hidden.
  ///
  /// By default, this is `false`, which means that the fight will start
  /// implicitly as soon as player enters the room
  /// (right after `FIRST_DESCRIPTION`).
  final bool fightIsOptional;

  /// Called just after the first batch of monsters (defined
  /// in [fightGenerator]) have been killed. This is often the first time
  /// the player character has the peace to explore the room some more.
  ///
  /// When this is `null`, no special description will follow after the room's
  /// monsters have been killed.
  final RoomDescriber? afterMonstersCleared;

  /// This is a short string to be used to form messages like "the orc still
  /// stands in the rubble" or "there is no one among the pillars".
  final String? whereDescription;

  /// The physical coordinate of the room on the X axis.
  ///
  /// This can be `null` for rooms that aren't on any maps.
  final int? positionX;

  /// The physical coordinate of the room on the Y axis.
  ///
  /// This can be `null` for rooms that aren't on any maps.
  final int? positionY;

  /// Creates a new room. [name], [describe] and [exits] cannot be `null`.
  const Room(
    this.name,
    this.firstDescribe,
    this.describe,
    this.fightGenerator,
    this.itemGenerator, {
    this.groundMaterial = "ground",
    this.parent,
    this.prerequisite,
    this.variantUpdateDescribe,
    this.afterMonstersCleared,
    this.whereDescription,
    this.isIdle = false,
    this.isSynthetic = false,
    this.positionX,
    this.positionY,
    this.mapName,
    this.firstMapName,
    this.hint,
    this.firstHint,
    this.fightIsOptional = false,
  })  : assert(
            describe != null || firstDescribe != null,
            "You must provide at least one description of the room. "
            "Ideally, you also provide both the first description and "
            "the regular one."),
        assert(
            (positionX == null && positionY == null) ||
                (positionX != null && positionY != null),
            "Both dimensions of position must be given, or both must be null."),
        assert((positionX == null && positionY == null) || (mapName != null),
            "Room is on a map but it's missing mapName: $name.");

  @override
  int get hashCode => name.hashCode;

  /// Returns `true` if the room has non-null [positionX] and [positionY].
  /// That means it can be placed on a map.
  bool get isOnMap => positionX != null && positionY != null;

  @override
  bool operator ==(Object other) => other is Room && other.name == name;

  @override
  String toString() => "Room<$name>";
}
