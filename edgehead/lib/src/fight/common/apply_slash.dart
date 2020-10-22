import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/weapon_assault_result.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';
import 'package:edgehead/src/fight/common/fall.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

/// Applies a successful slash to [enemy], given [result].
///
/// This actually changes the world state (through [context]) and reports
/// what happened (through [ActionContext.outputStoryline]).
void applySlash(WeaponAssaultResult result, ActionContext context, Actor enemy,
    int thread) {
  Actor a = context.actor;
  WorldStateBuilder w = context.outputWorld;
  Storyline s = context.outputStoryline;

  w.updateActorById(enemy.id, (b) => b.replace(result.victim));

  final weapon = a.currentWeaponOrBodyPart;
  final damage = weapon.damageCapability.slashingDamage;
  final groundMaterial = getGroundMaterial(w);

  bool killed = !result.victim.isAnimated && !result.victim.isInvincible;
  if (!killed) {
    if (result.didSeverBodyPart) {
      a.report(s, "<subject> {cleave<s>|sever<s>} <objectOwner's> <object>",
          objectOwner: result.victim,
          object: result.severedPart,
          positive: true,
          actionThread: thread);
      if (!enemy.isOnGround) {
        result.severedPart
            .report(s, '<subject> fall<s> to the ground', actionThread: thread);
      }
      _placeBodyPartOnGround(w, result.severedPart);
    } else {
      a.report(
          s,
          "<subject> {slash<es>|cut<s>} <object's> "
          "${result.touchedPart.randomDesignation}",
          object: result.victim,
          positive: true,
          actionThread: thread);
    }

    if (result.disabled &&
        (result.touchedPart.function == BodyPartFunction.damageDealing ||
            result.touchedPart.function == BodyPartFunction.mobile ||
            result.touchedPart.function == BodyPartFunction.wielding)) {
      assert(result.touchedPart.designation != BodyPartDesignation.teeth);
      result.touchedPart.report(s, "<subject> go<es> limp",
          negative: true, actionThread: thread);
    }
    if (result.willDropCurrentWeapon) {
      final weapon = dropCurrentWeapon(w, result.victim.id, forced: true);
      if (result.didSeverBodyPart) {
        weapon.report(s, '<subject> land<s> on the $groundMaterial');
      } else {
        result.victim.report(s, "<subject> drop<s> <object>",
            object: weapon, negative: true, actionThread: thread);
      }
    }
    if (result.willFall) {
      result.victim.report(s, "<subject> collapse<s>",
          negative: true, actionThread: thread);
      makeActorFall(context.world, w, s, result.victim);
    }

    inflictPain(context, result.victim.id, damage, result.touchedPart);

    if (result.wasBlinding) {
      result.victim.report(s, "<subject> <is> now blind", negative: true);
    }
  } else {
    a.report(
        s,
        "<subject> {slash<es>|cut<s>} "
        "{across|through} <object's> "
        "${result.touchedPart.randomDesignation}",
        object: result.victim,
        positive: true,
        actionThread: thread);
    killHumanoid(context, result.victim.id);
  }
}

void _placeBodyPartOnGround(WorldStateBuilder w, Item bodyPart) {
  final fightSituation =
      w.getSituationByName<FightSituation>(FightSituation.className);
  w.replaceSituationById<FightSituation>(fightSituation.id,
      fightSituation.rebuild((b) => b..droppedItems.add(bodyPart)));
}
