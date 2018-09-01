import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/recently_disarmed.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

/// Removes the current weapon from [actor] and puts it among
/// the [FightSituation.droppedItems]. The weapon is also returned
/// as the result of this function.
///
/// The actor gets their [Actor.createBodyPartWeapon] as weapon instead
/// (normally something like a fist).
///
/// If this method is called when there is no [FightSituation]
/// in the current [WorldState.situations] stack, it will throw.
Item dropCurrentWeapon(WorldStateBuilder w, Actor actor) {
  final situation =
      w.getSituationByName<FightSituation>(FightSituation.className);
  final weapon = actor.currentWeapon;
  w.replaceSituationById(
      situation.id,
      situation
          .rebuild((FightSituationBuilder b) => b..droppedItems.add(weapon)));
  w.updateActorById(
      actor.id,
      (b) => b.inventory
        ..remove(weapon)
        ..goBarehanded(actor.anatomy));
  w.recordCustom(disarmedCustomEventName, actor: actor);
  return weapon;
}
