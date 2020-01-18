import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/writers_helpers.dart';

import 'edgehead_ids.dart';

final _default = Rule(_id++, 0, false, (ApplicabilityContext c) {
  return true;
}, (ActionContext c) {
  // Nothing here. Let's at least "log" this.
  c.outputWorld.recordCustom(evDirectorNoRuleApplicable);
});

int _id = 100000;

final _karlHeardFirstTime = Rule(_id++, 1, true, (ApplicabilityContext c) {
  // Only heard from within the Pyramid.
  return c.playerDistanceTo('gods_lair') < 45 &&
      // Must be way below God's lair.
      c.playerParentRoom.positionY > 50;
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add(
      'Somewhere way above, something large groans. '
      'The sound is guttural, low, as rolling thunder.',
      wholeSentence: true);
  c.outputWorld.recordCustom(evKarlHeardFirstTime);
});

final _leroyQuits = Rule(_id++, 2, false, (ApplicabilityContext c) {
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
      wholeSentence: true);
  w.updateActorById(leroyId, (b) {
    b.npc
      ..isHireable = false
      ..followingActorId = null;
    b.currentRoomName = 'bleeds_trader_hut';
  });
});

final _playerHurt = Rule(_id++, 1, false, (ApplicabilityContext c) {
  return c.isHurt(playerId);
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('I still hurt.', wholeSentence: true);
});

/// These are the rules that the director in the game will be using
/// whenever there is an idle moment.
Ruleset get edgeheadDirectorRuleset {
  return Ruleset.unordered([
    _playerHurt,
    _leroyQuits,
    _karlHeardFirstTime,
    _default,
  ]);
}
