part of '../../edgehead_director.dart';

/// Quake 1.
///
///   * just a forewarning
final _quake1 = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return !c.hasHappened(evQuake1) &&
      !c.hasHappened(evConetDestroyed) &&
      !c.inRoomParent('conet') &&
      !c.inPopulatedRoom &&
      c.playerHasVisited('bleeds_main') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 30)));
}, _quake1Apply);

final _quake1FromAbove = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return !c.hasHappened(evQuake1) &&
      c.hasHappened(evConetDestroyed) &&
      !c.inRoomParent('big_o_observatory') &&
      !c.inPopulatedRoom &&
      c.playerHasVisited('bleeds_main') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 30)));
}, _quake1Apply);

void _quake1Apply(ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Suddenly, the ground moves under my feet, and I fall down. '
      'The whole world starts shaking violently, '
      'and a loud roar fills my ears.',
      isRaw: true);
  if (c.inPopulatedRoom) {
    s.addParagraph();
    s.add('"Quake!" people yell, as if someone could have missed this.',
        isRaw: true);
  } else {
    s.add('An earthquake.', isRaw: true);
  }
  s.addParagraph();
  s.add(
      "But this is not an ordinary earthquake. "
      "Earthquakes aren't accompanied by a terrifying roar. "
      "Earthquakes don't fill a person's mind "
      "with bizarre images of walking giants.",
      isRaw: true);
  s.addParagraph();
  s.add("As suddenly as the quake started, it ends.", isRaw: true);

  c.outputWorld.recordCustom(evQuake1);
  c.learn(ConetFacts.quakeHappened);
}
