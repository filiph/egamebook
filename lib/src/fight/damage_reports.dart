import 'dart:math';

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

final Random _random = new Random();

/// Report's a humanoid's death and drops their items.
void killHumanoid(
    Storyline s, WorldState w, Actor actor, String groundMaterial) {
  var fight = w.getSituationByName<FightSituation>("FightSituation");
  w.replaceSituationById(fight.id, fight.rebuild((b) {
    if (actor.currentWeapon != null) {
      // Drop weapon.
      b.droppedItems.add(actor.currentWeapon);
    }
    return b;
  }));
  if (actor.pose == Pose.onGround) {
    actor.report(s, "<subject> stop<s> moving", negative: true);
    s.addParagraph();
    return;
  }
  switch (_random.nextInt(3)) {
    case 0:
      actor.report(s, "<subject> collapse<s>, dead",
          negative: true, endSentence: true);
      break;
    case 1:
      actor.report(s, "<subject> fall<s> backward", negative: true);
      actor.report(s, "<subject> twist<s>", negative: true);
      actor.report(s, "<subject> hit<s> the $groundMaterial face down",
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
