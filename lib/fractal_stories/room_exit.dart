import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

typedef bool CheckFunction(Simulation sim, WorldState world);

/// An exit leading from a location (a `Room`, perhaps), to another location.
@immutable
class Exit {
  final String destinationRoomName;

  final String command;

  final String description;

  final CheckFunction isAccessible;

  const Exit(this.destinationRoomName, this.command, this.description,
      {this.isAccessible});

  @override
  String toString() => "Exit<$destinationRoomName,$command>";
}
