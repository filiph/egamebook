part of edgehead_director;

/// Quake 1.
///
///   * just a forewarning
final _quake1 = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return !c.hasHappened(evConetDestroyed) &&
      !c.inRoomParent('conet') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 30)));
}, _quake1Apply);

final _quake1FromAbove = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evConetDestroyed) &&
      !c.inRoomParent('big_o_observatory') &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 30)));
}, _quake1Apply);

void _quake1Apply(ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake. TODO: describe', isRaw: true);
  c.outputWorld.recordCustom(evQuake1);
}
