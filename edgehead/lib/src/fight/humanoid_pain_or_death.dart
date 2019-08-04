import 'dart:math';

import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

const Duration painShockDuration = Duration(seconds: 1);

final Random _random = Random();

void inflictPain(ActionContext context, Actor actor, int damage,
    {bool extremePain = false}) {
  final s = context.outputStoryline;
  if (damage > 0) {
    context.pubSub.publishActorLostHitpoints(
        ActorLostHitpointsEvent(context, actor, damage));
  }
  if (actor.isInvincible && !actor.isAlive) {
    // Actor should be dead but is invincible, so inflictPain was called.
    _reportPainForInvincibleActors(context, actor);
    return;
  }
  assert(
      actor.isAlive,
      "All actors except invincible ones should call killHumanoid "
      "(not reportPain) when they lose all hitpoints. "
      "This actor didn't: $actor");
  assert(actor.anatomy.isHumanoid,
      "Pain is currently described in humanoid terms (yell, cover with hand).");

  actor.report(s, "<subject> {scream|yell|grunt}<s> in pain", negative: true);
  if (extremePain &&
      actor.anatomy.isHumanoid &&
      actor.anatomy.anyWeaponAppendageAvailable) {
    actor.report(
        s,
        "<subject> briefly {hold<s> <subject's> hand over the wound"
        "|cover<s> the wound with <subject's> hand}",
        negative: true);
    actor.report(s, "<subject> growl<s>", negative: true);
  }

  if (!actor.isPlayer) {
    // Non-player characters shouldn't immediately act after such pain.
    context.outputWorld.updateActorById(actor.id,
        (b) => b..recoveringUntil = context.world.time.add(painShockDuration));
  }

  // Non-player actors lose balance after major pain.
  if (!actor.isPlayer && actor.pose > Pose.offBalance) {
    // When they receive major pain (like with a stab in the eye) they
    // immediately fall to "off balance".
    var newPose = extremePain ? Pose.offBalance : actor.pose.changeBy(-1);
    context.outputWorld.updateActorById(actor.id, (b) => b.pose = newPose);
  }
}

/// Report's a humanoid's death and drops their items.
///
/// Special case is for invincible actors, who will never die, only lose
/// consciousness.
void killHumanoid(ActionContext context, Actor actor) {
  final w = context.outputWorld;
  final s = context.outputStoryline;
  var fight = w.getSituationByName<FightSituation>(FightSituation.className);
  var groundMaterial = fight.groundMaterial;
  assert(
      !actor.isInvincible,
      "Invincible actors cannot die. Never call killHumanoid "
      "with them as actor.");

  context.pubSub
      .publishActorKilled(ActorKilledEvent(context, actor, context.actor));

  w.recordCustom(CustomEvent.actorDeath, actor: actor);

  w.replaceSituationById(fight.id, fight.rebuild((b) {
    if (actor.currentWeapon != null) {
      // Drop weapon.
      b.droppedItems.add(actor.currentWeapon);
    }
    if (actor.currentShield != null) {
      // Drop shield.
      b.droppedItems.add(actor.currentShield);
    }
    return b;
  }));
  w.updateActorById(actor.id, (a) {
    if (actor.currentWeapon != null) {
      a.inventory.remove(actor.currentWeapon);
    }
    if (actor.currentShield != null) {
      a.inventory.remove(actor.currentShield);
    }
  });

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

/// This is called when an actor that is [Actor.isInvincible] should have
/// been killed. For invincible characters, this is just "pain".
void _reportPainForInvincibleActors(ActionContext context, Actor actor) {
  final s = context.outputStoryline;
  assert(actor.isInvincible);
  if (actor.pose == Pose.onGround) {
    actor.report(s, "<subject> stop<s> moving", negative: true);
    s.addParagraph();
    return;
  }
  actor.report(s, "<subject> drop<s> to <subject's> knees", negative: true);
  actor.report(s, "<subject> keel<s> over", negative: true);
  s.addParagraph();
}
