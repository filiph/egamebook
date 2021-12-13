import 'package:edgehead/fractal_stories/context.dart';
import 'package:meta/meta.dart';

typedef ApproachDescriber = void Function(ActionContext context);

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

  /// Whether this approach is implicit -- that is, the player is not
  /// supposed to see it. They will be automatically transported.
  final bool isImplicit;

  /// A callback defining whether anyone can take the approach, given
  /// the current state of the world.
  ///
  /// This can (and often will) be `null`. That just means the approach
  /// is always applicable.
  final bool Function(ApplicabilityContext)? isApplicable;

  const Approach(this.from, this.to, this.command, this.description,
      {this.isApplicable})
      : isImplicit = command == r'$IMPLICIT',
        assert(from != null),
        assert(to != null),
        assert(command != null);

  @override
  String toString() => "Approach<$from->$to,$command>";
}
