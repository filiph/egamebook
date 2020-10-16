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
        !c.hasHappened(evQuake3) &&
        !c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('conet') &&
        _quake3BaseRequirements(c),
    _quake3Apply);

final _quake3FromAbove = Rule(
    _id++,
    2,
    true,
    (ApplicabilityContext c) =>
        !c.hasHappened(evQuake3) &&
        c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('big_o_observatory') &&
        _quake3BaseRequirements(c),
    _quake3Apply);

void _quake3Apply(ActionContext c) {
  final s = c.outputStoryline;
  s.addParagraph();
  s.add('Suddenly, a quake.', isRaw: true);

  if (c.hasHappened(evConetDestroyed)) {
    // TODO: check if we've said this in quake2 (evConetDestroyed came before
    //       evQuake2), in which case skip this.
    s.add(
        "I thought I've destroyed the source of the quakes, "
        "but apparently not.",
        isRaw: true);
  }

  final miguel = c.world.getActorById(miguelId);
  if (miguel.npc.followingActorId != c.player.id) {
    // Miguel wasn't hired, or was later "un-hired".
    assert(miguel.isAnimatedAndActive);
    // Move Miguel to the junction and kill him.
    c.outputWorld.updateActorById(miguelId, (b) {
      b.currentRoomName = 'junction';
      b.hitpoints = 0;
      if (b.inventory.currentWeapon != null) {
        // TODO: move his weapon on the ground when we have a way to do that
        // final weapon = b.inventory.currentWeapon;
        // b.inventory.remove(weapon);
      }
    });
  }

  c.outputWorld.recordCustom(evQuake3);
}

bool _quake3BaseRequirements(ApplicabilityContext c) =>
    c.hasHappened(evOrcOffensive) &&
    !c.inPopulatedRoom &&
    c.world.time
        .isAfter(edgeheadStartingTime.add(const Duration(minutes: 210)));
