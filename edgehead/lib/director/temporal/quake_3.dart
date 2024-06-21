part of '../../edgehead_director.dart';

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

  s.add('Suddenly, a third quake violently shakes everything around me.',
      isRaw: true);
  if (c.hasHappened(evConetDestroyed) &&
      // Check that we haven't said this in quake2 already.
      c.world.customHistory
          .query(name: evConetDestroyed)
          .latest!
          .time
          .isAfter(c.world.customHistory.query(name: evQuake2).latest!.time)) {
    s.add(
        "I thought I had destroyed the source of the quakes, "
        "but apparently not.",
        isRaw: true);
  }
  s.add(
      'I cover my ears but the roar persists. '
      'I see the faces of the giants now, hungry for war.',
      isRaw: true);
  s.addParagraph();
  s.add(
      'After a few heartbeats, the quake fades out. '
      'I realize I have been holding my breath the whole time, '
      'and I breathe out.',
      isRaw: true);

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
