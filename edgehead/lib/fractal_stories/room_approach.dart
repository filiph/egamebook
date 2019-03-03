import 'package:edgehead/fractal_stories/context.dart';
import 'package:meta/meta.dart';

typedef void ApproachDescriber(ActionContext context);

/// An approach to one location from another one. This is the equivalent
/// of exits (like in ZIL) but taken from the other way.
///
/// Turns out approaches make more sense from the writer's perspective. You
/// don't describe people leaving rooms. You describe them _entering_ rooms.
@immutable
class Approach {
  final String from;

  final String to;

  final String command;

  final ApproachDescriber description;

  const Approach(this.from, this.to, this.command, this.description)
      : assert(from != null),
        assert(to != null),
        assert(command != null),
        assert(description != null);

  @override
  String toString() => "Approach<$from->$to,$command>";
}
