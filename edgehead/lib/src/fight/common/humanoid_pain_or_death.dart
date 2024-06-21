import 'dart:math';

import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

const Duration painShockDuration = Duration(seconds: 1);

final Random _random = Random();

/// Takes care of the "rendering" and the effects of pain to actor with
/// [actorId].
///
/// Reports pain to [context]'s [Storyline] and (if the pain is extreme enough)
/// puts the actor out of play for a while(changing [Actor.recoveringUntil])
/// and out of balance.
///
/// For actors that are [Actor.isUndead], the reporting and effects of pain
/// are much diminished (since the undead don't feel pain).
void inflictPain(
    ActionContext context, int actorId, int damage, BodyPart bodyPart,
    {bool extremePain = false}) {
  final s = context.outputStoryline;
  final actor = context.outputWorld.getActorById(actorId);

  if (damage > 0 && actor.isPlayer) {
    // TODO: decide if we want to show hitpoints changes to player
    //       via StatUpdate, otherwise delete this
  }

  if (actor.isInvincible && !actor.isAnimated) {
    // Actor should be dead but is invincible, so inflictPain was called.
    _reportPainForInvincibleActors(context, actorId);
    return;
  }

  assert(
      actor.isAnimated,
      "All actors except invincible ones should call killHumanoid "
      "(not reportPain) when they lose all hitpoints. "
      "This actor didn't: $actor");
  assert(actor.anatomy.isHumanoid,
      "Pain is currently described in humanoid terms (yell, cover with hand).");

  // Some effects of pain are only felt by non-player characters,
  // in the interest of fun.
  if (!actor.isPlayer) {
    // Non-player actors lose balance after major pain.
    if (actor.pose > Pose.offBalance) {
      // When they receive major pain (like with a stab in the eye) they
      // immediately fall to "off balance" (unless they are undead).
      var newPose = (extremePain && !actor.isUndead)
          ? Pose.offBalance
          : actor.pose.changeBy(-1);
      context.outputWorld.updateActorById(actor.id, (b) => b.pose = newPose);
    }

    // Non-player characters shouldn't immediately act after pain.
    context.outputWorld.updateActorById(actor.id,
        (b) => b..recoveringUntil = context.world.time.add(painShockDuration));
  }

  if (actor.isUndead) {
    actor.report(s, "<subject> freeze<s> for a while");
    if (!actor.anatomy.isBlind && _canSeeOwnBodyPart(bodyPart)) {
      actor.report(s, "<subject> briefly look<s> at the wound, studying it",
          endSentence: true);
    }
    return;
  }

  assert(!actor.isUndead);

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
}

/// Reports a humanoid's death and drops their items. Does _not_ actually
/// set [Actor.hitpoints] to `0` (that is expected to have happened
/// in something like `executeSlashingHit`).
///
/// Special case is for invincible actors, who will never die, only lose
/// consciousness.
void killHumanoid(ActionContext context, int actorId) {
  final w = context.outputWorld;
  final s = context.outputStoryline;
  var fight = w.getSituationByName<FightSituation>(FightSituation.className);
  var groundMaterial = fight.groundMaterial;
  final actor = w.getActorById(actorId);
  assert(
      !actor.isInvincible,
      "Invincible actors cannot die. Never call killHumanoid "
      "with them as actor.");

  w.recordCustom(CustomEvent.actorDeath, actor: actor);

  w.replaceSituationById(fight.id, fight.rebuild((b) {
    if (actor.holdsSomeWeapon) {
      // Drop weapon.
      b.droppedItems.add(actor.currentWeapon!);
    }
    if (actor.currentShield != null) {
      // Drop shield.
      b.droppedItems.add(actor.currentShield!);
    }
    return b;
  }));
  w.updateActorById(actor.id, (a) {
    if (actor.holdsSomeWeapon) {
      a.inventory.remove(actor.currentWeapon!);
    }
    if (actor.currentShield != null) {
      a.inventory.remove(actor.currentShield!);
    }
  });

  if (actor.pose == Pose.onGround) {
    actor.report(s, "<subject> stop<s> moving", negative: true);
    s.addParagraph();
    return;
  }
  switch (_random.nextInt(3)) {
    case 0:
      final again = (actor.isUndead && actor.npc.followingActorId == playerId)
          ? ' (again)'
          : '';
      actor.report(s, "<subject> collapse<s>, dead$again",
          negative: true, endSentence: true);
    case 1:
      actor.report(s, "<subject> fall<s> backward", negative: true);
      actor.report(s, "<subject> twist<s>", negative: true);
      actor.report(s, "<subject> hit<s> the $groundMaterial face down",
          negative: true, endSentence: true);
    case 2:
      actor.report(s, "<subject> drop<s> to <subject's> knees", negative: true);
      actor.report(s, "<subject> keel<s> over", negative: true);
  }
  s.addParagraph();
}

/// This is called when an actor that is [Actor.isInvincible] should have
/// been killed. For invincible characters, this is just "pain".
void _reportPainForInvincibleActors(ActionContext context, int actorId) {
  final s = context.outputStoryline;
  final actor = context.outputWorld.getActorById(actorId);
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

/// Returns `true` if the given body part is something a humanoid can see with
/// their own eyes. For example, a human can see their legs and arms, but cannot
/// see their own eyes or ears or teeth (without using a mirror).
bool _canSeeOwnBodyPart(BodyPart bodyPart) {
  switch (bodyPart.designation) {
    case BodyPartDesignation.neck:
    case BodyPartDesignation.head:
    case BodyPartDesignation.teeth:
    case BodyPartDesignation.leftEye:
    case BodyPartDesignation.rightEye:
      return false;
    case BodyPartDesignation.leftLeg:
    case BodyPartDesignation.rightLeg:
    case BodyPartDesignation.primaryArm:
    case BodyPartDesignation.primaryHand:
    case BodyPartDesignation.secondaryArm:
    case BodyPartDesignation.secondaryHand:
    case BodyPartDesignation.torso:
    case BodyPartDesignation.tail:
      return true;
    case BodyPartDesignation.none:
      assert(false, "$bodyPart is not defined in _canSeeOwnBodyPart");
      return true;
    default:
      assert(false, "$bodyPart is not defined in _canSeeOwnBodyPart");
      return true;
  }
}
