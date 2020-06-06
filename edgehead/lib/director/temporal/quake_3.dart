part of edgehead_director;

/// Quake 3.
///
///   * The Deathless village seriously damaged
///   * Knights HQ now deserted.
///   * If Miguel was there, he is now in the junction, dead
final _quake3 = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evOrcOffensive) &&
      !c.inRoomParent('conet') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 210)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake.', isRaw: true);
  c.outputWorld.recordCustom(evQuake3);
});
