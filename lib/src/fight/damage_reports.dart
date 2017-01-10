import 'dart:math';

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';

final Random _random = new Random();

/// Report's a humanoid's death by sword from standing position.
void reportDeath(Storyline s, Actor actor) {
  switch (_random.nextInt(3)) {
    case 0:
      actor.report(s, "<subject> collapse<s>, dead",
          negative: true, endSentence: true);
      break;
    case 1:
      actor.report(s, "<subject> fall<s> backward", negative: true);
      actor.report(s, "<subject> twist<s>", negative: true);
      actor.report(s, "<subject> hit<s> the ground face down",
          negative: true, endSentence: true);
      break;
    case 2:
      actor.report(s, "<subject> drop<s> to <subject's> knees", negative: true);
      actor.report(s, "<subject> keel<s> over", negative: true);
      break;
  }
  s.addParagraph();
}

void reportPain(Storyline s, Actor actor) {
  actor.report(s, "<subject> {scream|yell|grunt}<s> in pain", negative: true);
}
