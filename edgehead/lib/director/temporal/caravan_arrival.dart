part of edgehead_director;

/// Caravan Arrival.
///
///   * Caravan now stands in the road of The Bleeds.
///   * Trader Joseph has new goods
///   * Taheen in the Bleeds
///   * <SOMEONE> is available as a follower
final _caravanArrival = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evQuake1) &&
      c.playerDistanceTo('bleeds_main') > 20 &&
      // We must be above.
      c.playerParentRoom.positionY < 90 &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 90)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('I can hear loud commotion from way below, outside the Pyramid.',
      isRaw: true);
  c.outputWorld.recordCustom(evCaravanArrived);
});
