part of '../../edgehead_director.dart';

/// Orc Offensive.
///
///   * Kills Oracle
///   * Makes the Deathless _very_ nervous
///   * Corpses and wounded in Knights HQ
///   * Kat now available as a follower
final _orcOffensive = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return c.hasHappened(evCaravanDeparted) &&
      // Must be exploring above.
      c.playerRoom.positionY! < 53 &&
      // Not in a populated room, since orc offensive replaces caravan
      // departure. This is likely redundant since we're above populated
      // areas, just being defensive.
      !c.inPopulatedRoom &&
      c.world.time
          .isAfter(edgeheadStartingTime.add(const Duration(minutes: 190)));
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;

  // True if the player is currently above the Knights HQ.
  final isAbove = c.playerParentRoom.positionY! < 70;

  s.addParagraph();
  s.add(
      "I hear distant clanging and voices "
      "from far ${isAbove ? 'below' : 'above'}. "
      "It takes me a minute to realize what it is. It's a sound of battle. "
      "Someone in the Pyramid, "
      "on one of the ${isAbove ? 'lower' : 'higher'} floors, "
      "is engaging in combat.",
      isRaw: true);

  c.outputWorld.recordCustom(evOrcOffensive);
});
