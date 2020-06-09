part of edgehead_director;

final _leroyQuits = Rule(_id++, 2, true, (ApplicabilityContext c) {
  if (!c.isInIdleRoom) return false;
  final leroy = c.world.getActorById(leroyId);
  if (!leroy.isAnimatedAndActive) return false;
  if (leroy.anatomy.isUndead) return false;
  if (leroy.npc.followingActorId != playerId) return false;
  assert(c.inRoomWith(leroyId));
  return c.world.customHistory.query(name: evGoblinCampCleared).hasHappened;
}, (ActionContext c) {
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Leroy turns to me. "We did it. And I am proud. '
      'But now I need to go back to my father. Thank you." '
      'Leroy leaves towards the trader\'s shop.',
      isRaw: true);
  w.updateActorById(leroyId, (b) {
    b.npc
      ..isHireable = false
      ..followingActorId = null;
    b.currentRoomName = 'bleeds_trader_hut';
  });
});
