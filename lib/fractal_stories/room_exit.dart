import 'package:edgehead/fractal_stories/world.dart';

typedef bool CheckFunction(WorldState world);

class Exit {
  final String destinationRoomName;

  final String description;

  final CheckFunction isAccessible;

  const Exit(this.destinationRoomName, this.description, [this.isAccessible]);
}
