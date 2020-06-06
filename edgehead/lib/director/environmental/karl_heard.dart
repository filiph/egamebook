part of edgehead_director;

final _karlHeardFirstTime = Rule(_id++, 1, true, (ApplicabilityContext c) {
  // Only heard from within the Pyramid.
  return c.playerDistanceTo('gods_lair') < 45 &&
      // Must be way below God's lair.
      c.playerParentRoom.positionY > 50;
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Somewhere way above, something large groans. '
      'The sound is guttural, low, as rolling thunder.',
      isRaw: true);
  c.outputWorld.recordCustom(evKarlHeardFirstTime);
});
