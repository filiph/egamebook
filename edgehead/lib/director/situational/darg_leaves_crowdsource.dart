part of '../../edgehead_director.dart';

final _dargLeavesCrowdsource = Rule(_id++, 3, true, (ApplicabilityContext c) {
  return !c.hasHappened(evKilledDarg) &&
      // We want the player to know who Darg is.
      c.world.actionHasBeenPerformed('crowdsource_listen') &&
      c.minutesSinceFirstVisit('crowdsource') > 1 &&
      c.playerDistanceTo('crowdsource') > 1;
}, (ActionContext c) {
  c.outputWorld.updateActorById(dargId, (b) => b.currentRoomName = 'darg_tent');
  // Move the shaman somewhere hidden.
  c.outputWorld.updateActorById(
      shamanId, (b) => b.currentRoomName = 'crowdsource_vestry');
  c.markHappened(evDargLeftCrowdsource);
});
