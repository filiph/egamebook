part of edgehead_director;

/// Quake 1.
///
///   * just a forewarning
final _quake1 = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return !c.inRoomParent('conet') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 30)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake. TODO: describe', isRaw: true);
  c.outputWorld.recordCustom(evQuake1);
});
