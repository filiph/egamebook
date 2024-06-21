part of '../../edgehead_director.dart';

final _karlHeardFirstTime = Rule(_id++, 1, true, (ApplicabilityContext c) {
  // Only heard from within the Pyramid.
  return c.playerDistanceTo('gods_lair') < 45 &&
      // Must be way below God's lair.
      c.playerParentRoom.positionY! > 50 &&
      // Obviously, Karl must still be alive.
      !c.hasHappened(evKarlKilled);
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Somewhere way above, something large groans. '
      'The sound is guttural, low, like rolling thunder.',
      isRaw: true);
  c.outputWorld.recordCustom(evKarlHeardFirstTime);
});
