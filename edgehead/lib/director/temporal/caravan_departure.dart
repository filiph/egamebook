part of '../../edgehead_director.dart';

/// Caravan Departure
///
///   * Caravan away
///   * Taheen in the Bleeds
///   * Miguel now available as a follower
final _caravanDeparture = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evQuake2) &&
      c.playerDistanceTo('bleeds_main') > 20 &&
      // We must be above.
      c.playerParentRoom.positionY! < 90 &&
      // Miguel newly available in the HQ area.
      !c.inRoomParent('knights_hq_main') &&
      // Not in a populated room, since caravan departure replaces Quake2.
      !c.inPopulatedRoom &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 150)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Once again, I can hear a loud commotion from way below, '
      'outside the Pyramid. And then the horn.',
      isRaw: true);
  c.outputWorld.recordCustom(evCaravanDeparted);
});
