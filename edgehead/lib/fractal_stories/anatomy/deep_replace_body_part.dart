import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';

/// Walks body parts from torso down the anatomy-tree, and calls [update]
/// with each [BodyPart] that satisfies [whereFilter].
///
/// If [descendantUpdate] is specified, then it will be called with all
/// descendants of the above body parts in the hierarchy (unless they
/// themselves pass [whereFilter]).
///
/// This is complex because we're dealing with an immutable tree of built
/// values that need to be updated.
void deepReplaceBodyPart(ActorBuilder builder,
    bool whereFilter(BodyPart bodyPart), BodyPartUpdater update,
    {BodyPartUpdater descendantUpdate}) {
  final actor = builder.build();

  // If the torso passes `whereFilter`, then we need to update that first.
  // _updateWalker below only works on children of the given BodyPartBuilder.
  final torsoPassesFilter = whereFilter(actor.anatomy.torso);
  if (torsoPassesFilter) {
    update(builder.anatomy.torso);
  }

  _updateWalker(builder.anatomy.torso.build(), builder.anatomy.torso,
      whereFilter, update, descendantUpdate, torsoPassesFilter);
}

void _updateWalker(
    BodyPart built,
    BodyPartBuilder builder,
    bool whereFilter(BodyPart bodyPart),
    BodyPartUpdater update,
    BodyPartUpdater descendantUpdate,
    bool hasAfflictedParent) {
  // ListBuilder.map updates the list in place.
  builder.children.map((child) {
    final isAfflicted = whereFilter(child);
    final updated = child.toBuilder();

    // Update children recursively.
    _updateWalker(child, updated, whereFilter, update, descendantUpdate,
        hasAfflictedParent || isAfflicted);

    if (isAfflicted) {
      update(updated);
    } else if (descendantUpdate != null && hasAfflictedParent) {
      descendantUpdate(updated);
    }

    return updated.build();
  });
}

/// An update function that modifies [b].
typedef BodyPartUpdater = void Function(BodyPartBuilder b);
