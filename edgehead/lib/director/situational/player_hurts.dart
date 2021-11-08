// @dart=2.9

part of edgehead_director;

final _playerHurt = Rule(_id++, 1, false, (ApplicabilityContext c) {
  return c.isHurt(playerId);
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('I still hurt.', isRaw: true);
});
