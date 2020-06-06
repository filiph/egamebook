part of edgehead_director;

/// Caravan Departure
///
///   * Caravan away
///   * Taheen in the staging area
///   * Miguel now available as a follower
final _caravanDeparture = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evQuake2) &&
      c.playerDistanceTo('bleeds_main') > 20 &&
      // We must be above.
      c.playerParentRoom.positionY < 90 &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 150)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Once again, I can hear loud commotion from way below, '
      'outside the Pyramid.',
      isRaw: true);
  c.outputWorld.recordCustom(evCaravanDeparted);
});
