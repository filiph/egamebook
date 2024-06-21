part of '../../edgehead_director.dart';

final _playerHurt = Rule(_id++, 1, false, (ApplicabilityContext c) {
  return c.isHurt(playerId);
}, (ActionContext c) {
  final Storyline s = c.outputStoryline;
  s.addParagraph();
  s.add('I still hurt.', isRaw: true);
});
