import 'dart:math';

import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/writers_helpers.dart';

final Random _random = new Random();

/// Report's a humanoid's death and drops their items.
///
/// Special case is for Briana, who will never die, only lose consciousness.
void killHumanoid(ActionContext context, Actor actor) {
  final w = context.outputWorld;
  final s = context.outputStoryline;
  var fight = w.getSituationByName<FightSituation>(FightSituation.className);
  var groundMaterial = fight.groundMaterial;
  assert(
      actor.id != brianaId,
      "Briana cannot die. Never call killHumanoid "
      "with Briana as actor.");

  w.replaceSituationById(fight.id, fight.rebuild((b) {
    if (!actor.isBarehanded) {
      // Drop weapon.
      b.droppedItems.add(actor.currentWeapon);
    }
    if (actor.currentShield != null) {
      // Drop shield.
      b.droppedItems.add(actor.currentShield);
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

void reportPain(ActionContext context, Actor actor, int damage) {
  final s = context.outputStoryline;
  context.pubSub.publishActorLostHitpoints(
      new ActorLostHitpointsEvent(context, actor, damage));
  if (actor.id == brianaId && actor.hitpoints == 0) {
    _reportPainBriana(context, actor);
    return;
  }
  assert(
      actor.hitpoints > 0,
      "All actors except Briana should call killHumanoid (not reportPain) "
      "when they lose all hitpoints.");
  actor.report(s, "<subject> {scream|yell|grunt}<s> in pain", negative: true);
}

void _reportPainBriana(ActionContext context, Actor actor) {
  final s = context.outputStoryline;
  assert(actor.id == brianaId);
  if (actor.pose == Pose.onGround) {
    actor.report(s, "<subject> stop<s> moving", negative: true);
    s.addParagraph();
    return;
  }
  actor.report(s, "<subject> drop<s> to <subject's> knees", negative: true);
  actor.report(s, "<subject> keel<s> over", negative: true);
  s.addParagraph();
}
