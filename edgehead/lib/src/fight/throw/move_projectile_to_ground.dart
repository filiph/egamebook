// @dart=2.9

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

/// Moves [projectile] from actor's hand ([Actor.currentWeapon])
/// to the ground.
void moveProjectileToGround(
    WorldStateBuilder w, Actor a, Item projectile, bool outOfReach) {
  assert(projectile == a.currentWeapon);
  w.updateActorById(
      a.id,
      (b) => b
        ..inventory.remove(projectile)
        ..inventory.goBarehanded(a.anatomy));

  final fightSituation =
      w.getSituationByName<FightSituation>(FightSituation.className);

  if (outOfReach) {
    if (projectile.damageCapability.type == WeaponType.rock) {
      // Rocks that fall out of reach just disappear from play.
      return;
    }

    w.replaceSituationById(fightSituation.id, fightSituation.rebuild((b) {
      b.droppedItemsOutOfReach.add(projectile);
    }));
    return;
  }

  w.replaceSituationById(fightSituation.id, fightSituation.rebuild((b) {
    b.droppedItems.add(projectile);
  }));
}
