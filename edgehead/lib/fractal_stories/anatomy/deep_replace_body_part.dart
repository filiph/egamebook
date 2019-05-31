import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';

/// Walks body parts from torso down the anatomy-tree, and calls [update]
/// on each [BodyPart] that satisfies [whereFilter] or which is below
/// such a body part in the hierarchy.
///
/// This is complex because we're dealing with an immutable tree of built
/// values that need to be updated.
void deepReplaceBodyPart(Actor actor, ActorBuilder builder,
    bool whereFilter(BodyPart bodyPart), BodyPartUpdater update) {
  final torsoAfflicted = whereFilter(actor.anatomy.torso);

  if (torsoAfflicted) {
    update(builder.anatomy.torso, false);
  }

  _updateWalker(builder.anatomy.torso.build(), builder.anatomy.torso,
      whereFilter, update, torsoAfflicted);
}

void _updateWalker(
    BodyPart built,
    BodyPartBuilder builder,
    bool whereFilter(BodyPart bodyPart),
    BodyPartUpdater update,
    bool afflictedDescendant) {
  builder.children.map((child) {
    final afflicted = whereFilter(child);
    final updated = child.toBuilder();
    _updateWalker(
        child, updated, whereFilter, update, afflictedDescendant || afflicted);

    if (afflicted || afflictedDescendant) {
      update(updated, afflictedDescendant);
    }

    return updated.build();
  });
}

/// An update function that modifies [b]. It also takes [afflictedDescendant],
/// which is `true` when the body part is a descendant of the target body part.
typedef BodyPartUpdater = void Function(
    BodyPartBuilder b, bool afflictedDescendant);
