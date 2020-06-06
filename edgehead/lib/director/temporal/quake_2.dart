part of edgehead_director;

/// Quake 2.
///
///   * a farmer falls to his death on the slopes
///   * Farmers village damaged
///   * farmers start to actively ask for help
///   * if alive, Leroy goes into the Pyramid, with new gear - available as NPC
///   * Miguel leaves his post, is now in the Knights HQ
final _quake2 = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evCaravanArrived) &&
      !c.inRoomParent('conet') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 120)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake. Outside the pyramid, a chilling human scream.',
      isRaw: true);
  c.outputWorld.recordCustom(evQuake2);
});
