part of '../../edgehead_director.dart';

final _leroyQuitsAfterGoblinCamp =
    Rule(_id++, 2, true, (ApplicabilityContext c) {
  if (!c.isInIdleRoom) return false;
  // After the second quake, Leroy is again available as a follower.
  // This action is meant only to be Leroy after the clearing of the goblin
  // camp.
  if (c.hasHappened(evQuake2)) return false;
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
      "Leroy leaves, heading toward the trader's shop.",
      isRaw: true);
  w.updateActorById(leroyId, (b) {
    b.npc
      ..isHireable = false
      ..followingActorId = null;
    b.currentRoomName = 'bleeds_trader_hut';
  });
});

final _leroyQuitsUpside = Rule(_id++, 2, true, (ApplicabilityContext c) {
  if (!c.isInIdleRoom) return false;
  // After the second quake, Leroy is again available as a follower.
  // This action is meant only to be Leroy after the clearing of the goblin
  // camp.
  if (c.hasHappened(evQuake2)) return false;
  final leroy = c.world.getActorById(leroyId);
  if (!leroy.isAnimatedAndActive) return false;
  if (leroy.anatomy.isUndead) return false;
  if (leroy.npc.followingActorId != playerId) return false;
  assert(c.inRoomWith(leroyId));
  // Anywhere above Battlefield floor?
  return c.playerParentRoom.positionY! <= 54;
}, (ActionContext c) {
  final WorldStateBuilder w = c.outputWorld;
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Leroy turns to me. "Look, sir. I was hoping to help with the goblins '
      'near the Bleeds. To defend our village. I\'m not with you to '
      '_attack_ the orcs! '
      'I\'ll leave now, if that\'s alright with you, sir." '
      'He does not wait for an answer and skips through the shadows, '
      'heading downstairs.',
      isRaw: true);
  w.updateActorById(leroyId, (b) {
    b.npc
      ..isHireable = false
      ..followingActorId = null;
    b.currentRoomName = 'bleeds_trader_hut';
  });
});
