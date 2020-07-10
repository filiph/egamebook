part of edgehead_director;

final _dargLeavesCrowdsource = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return !c.hasHappened(evKilledDarg) &&
      // We want the player to know who Darg is.
      c.world.actionHasBeenPerformed('crowdsource_listen') &&
      c.minutesSinceFirstVisit('crowdsource') > 10 &&
      c.minutesSinceFirstVisit('darg_tent') > 10 &&
      c.playerDistanceTo('crowdsource') > 10;
}, (ActionContext c) {
  if ((c.world.global as EdgeheadGlobalState).isInTesterMode) {
    final Storyline s = c.outputStoryline;
    s.add('(DEBUG: Darg left Crowdsource.)', isRaw: true);
  }

  c.markHappened(evDargLeftCrowdsource);
});
