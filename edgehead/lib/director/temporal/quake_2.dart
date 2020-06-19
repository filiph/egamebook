part of edgehead_director;

/// Quake 2.
///
///   * a farmer falls to his death on the slopes
///   * Farmers village damaged
///   * farmers start to actively ask for help
///   * if alive, Leroy goes into the Pyramid, with new gear - available as NPC
///   * Miguel leaves his post, is now in the Knights HQ
final _quake2 = Rule(
    _id++,
    2,
    true,
    (ApplicabilityContext c) =>
        !c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('conet') &&
        _quake2BaseRequirements(c),
    _quake2Apply);

final _quake2FromAbove = Rule(
    _id++,
    2,
    true,
    (ApplicabilityContext c) =>
        c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('big_o_observatory') &&
        _quake2BaseRequirements(c),
    _quake2Apply);

void _quake2Apply(ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake. Outside the pyramid, a chilling human scream.',
      isRaw: true);

  if (c.hasHappened(evConetDestroyed)) {
    s.add(
        "I thought I've destroyed the source of the quakes, "
        "but apparently not.",
        isRaw: true);
  }

  if (c.world.getActorById(leroyId).isAnimatedAndActive) {
    // Move Leroy to Knights HQ.
    c.outputWorld.updateActorById(leroyId, (b) {
      b.npc.isHireable = true;
      b.currentRoomName = 'knights_hq_main';
    });
  }

  assert(c.world.getActorById(miguelId).isAnimatedAndActive);
  c.outputWorld.updateActorById(miguelId, (b) {
    b.currentRoomName = 'knights_hq_main';
  });

  c.outputWorld.recordCustom(evQuake2);
}

bool _quake2BaseRequirements(ApplicabilityContext c) =>
    c.hasHappened(evCaravanArrived) &&
    !c.inPopulatedRoom &&
    c.world.time
        .isAfter(edgeheadStartingTime.add(const Duration(minutes: 120)));
