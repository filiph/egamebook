part of '../../edgehead_director.dart';

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
        !c.hasHappened(evQuake2) &&
        !c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('conet') &&
        _quake2BaseRequirements(c),
    _quake2Apply);

final _quake2FromAbove = Rule(
    _id++,
    2,
    true,
    (ApplicabilityContext c) =>
        !c.hasHappened(evQuake2) &&
        c.hasHappened(evConetDestroyed) &&
        !c.inRoomParent('big_o_observatory') &&
        _quake2BaseRequirements(c),
    _quake2Apply);

void _quake2Apply(ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();

  s.add('Out of nowhere, the quake starts again.', isRaw: true);

  if (c.hasHappened(evConetDestroyed)) {
    s.add(
        "I thought I had destroyed the source of the quakes, "
        "but apparently not.",
        isRaw: true);
  }

  s.add(
      'The same loud roar, the same '
      'bizarre images. Giants on the march. '
      'As I try to keep my footing, I hear a chilling human scream. It comes '
      'from outside the Pyramid, and it ends abruptly with a thud. '
      'Someone fell a long, long way to the ground. '
      'By the time I realize this, the quake is finished. '
      'Everything is still again.',
      isRaw: true);

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
  c.learn(ConetFacts.quakesOften);
}

bool _quake2BaseRequirements(ApplicabilityContext c) =>
    c.hasHappened(evCaravanArrived) &&
    !c.inPopulatedRoom &&
    c.world.time
        .isAfter(edgeheadStartingTime.add(const Duration(minutes: 120)));
