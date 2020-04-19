import 'dart:math';

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class KickItemOutOfReach extends ItemAction {
  static const String className = "KickItemOutOfReach";

  static final KickItemOutOfReach singleton = KickItemOutOfReach();

  @override
  final bool isProactive = true;

  @override
  List<String> get commandPathTemplate =>
      const ["environment", "<objectNounWithAdjective>", "kick out of reach"];

  @override
  String get helpMessage => "Denies anyone to pick up the weapon. "
      "When I'm worried that the item on the ground might spell trouble "
      "for me if it was picked up by the enemy, I can prevent it.";

  @override
  bool get isAggressive => false;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => null;

  @override
  String applyFailure(ActionContext context, Item item) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Item item) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final situation = w.currentSituation as FightSituation;
    w.replaceSituationById(
        situation.id,
        situation.rebuild((FightSituationBuilder b) => b
          ..droppedItems.remove(item)
          ..droppedItemsOutOfReach.add(item)));
    a.report(s, "<subject> kick<s> <object> out of reach", object: item);
    return "${a.name} kicks ${item.name} out of reach";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Item item) =>
      throw UnimplementedError();

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Item item) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Item item) {
    if (a.isOnGround) return false;
    if (a.anatomy.isBlind) return false;
    if (!a.anatomy.hasHealthyLegs) return false;

    // Monsters and NPCs have additional constraints. Without those, monsters
    // are way too happy to kick weapons out of reach (because it's often
    // the safer choice, or gives the opponent the "chance" to do something
    // stupid). We're basically patching this A.I. planner deficiency via
    // direct rules. It's a bit impure but it gets the job done.
    if (!a.isPlayer) {
      if (a.isUndead) {
        // The undead are supposed to act stupid.
        return false;
      }

      if (item.value > (a.currentWeapon?.value ?? 0)) {
        // Never kick away weapons that are more valuable than what the actor
        // has.
        return false;
      }

      if (item.damageCapability.isHarmless) {
        // Don't kick away harmless trinkets.
        return false;
      }

      final actors = w.currentSituation.getActors(sim, w);
      final enemies = actors.where((actor) => actor.team.isEnemyWith(a.team));
      final weapons = enemies.map((actor) => actor.currentWeapon?.value ?? 0);
      final worst = weapons.fold(0xffffffff, min);

      // Only kick item out of reach if it's better than whatever the opponent
      // is carrying. Otherwise, why bother kicking off a dagger when
      // the opponent has a sword.
      return item.value > worst;
    } else {
      // Player can kick any weapon at any time.
      return true;
    }
  }
}
