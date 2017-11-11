import 'package:meta/meta.dart';
import 'package:edgehead/fractal_stories/world.dart';

typedef bool CheckFunction(WorldState world);

/// An exit leading from a location (a `Room`, perhaps), to another location.
@immutable
class Exit {
  final String destinationRoomName;

  final String command;

  final String description;

  final CheckFunction isAccessible;

  const Exit(this.destinationRoomName, this.command, this.description,
      {this.isAccessible});
}
