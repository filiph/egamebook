part of edgehead_director;

/// Quake 3.
///
///   * The Deathless village seriously damaged
///   * Knights HQ now deserted.
///   * If Miguel was there, he is now in the junction, dead
final _quake3 = Rule(
    _id++,
    2,
    true,
    (ApplicabilityContext c) =>
        !c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('conet') &&
        _quake3BaseRequirements(c),
    _quake3Apply);

final _quake3FromAbove = Rule(
    _id++,
    2,
    true,
    (ApplicabilityContext c) =>
        c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('big_o_observatory') &&
        _quake3BaseRequirements(c),
    _quake3Apply);

void _quake3Apply(ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake.', isRaw: true);
  c.outputWorld.recordCustom(evQuake3);
}

bool _quake3BaseRequirements(ApplicabilityContext c) =>
    c.hasHappened(evOrcOffensive) &&
    !c.inPopulatedRoom &&
    c.world.time
        .isAfter(edgeheadStartingTime.add(const Duration(minutes: 210)));
