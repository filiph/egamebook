part of edgehead_director;

final _dargLeavesCrowdsource = Rule(_id++, 2, true, (ApplicabilityContext c) {
  return !c.hasHappened(evKilledDarg) &&
      c.minutesSinceFirstVisit('crowdsource') > 10 &&
      c.minutesSinceFirstVisit('darg_tent') > 10 &&
      c.playerDistanceTo('crowdsource') > 10;
}, (ActionContext c) {
  assert(() {
    final Storyline s = c.outputStoryline;
    s.add('(DEBUG: Darg left Crowdsource.)', isRaw: true);
    return true;
  }());

  c.markHappened(evDargLeftCrowdsource);
});
