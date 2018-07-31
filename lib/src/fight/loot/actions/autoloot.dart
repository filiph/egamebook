import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';
import 'package:edgehead/writers_helpers.dart';

class AutoLoot extends Action<Null> {
  static final AutoLoot singleton = new AutoLoot();

  static const String className = "AutoLoot";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  bool isImplicit = true;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  String get helpMessage => null;

  @override
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Null _) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder world = context.outputWorld;
    Storyline s = context.outputStoryline;
    var situation =
        world.getSituationByName<LootSituation>(LootSituation.className);

    Actor briana = world.getActorById(brianaId);
    if (briana.isActive && !briana.isAlive) {
      // Briana cannot die.
      a.report(s, "<subject> kneel<s> next to <object>", object: briana);
      a.report(s, "<subject> help<s> <object> to <object's> feet",
          object: briana);
      briana.report(s, "\"I'll live,\" <subject> say<s>.", wholeSentence: true);

      world.updateActorById(
          brianaId,
          (b) => b
            ..pose = Pose.offBalance
            ..hitpoints = 1);
    }

    Item takenWeapon;
    Item takenShield;
    List<Item> takenItems = [];
    for (var item in situation.droppedItems) {
      // TODO: generalize sword for spear for other weapons
      final currentActor = world.getActorById(a.id);
      final isSwordForSpear =
          currentActor.currentWeapon.damageCapability.type ==
                  WeaponType.spear &&
              item.isWeapon &&
              item.damageCapability.type == WeaponType.sword;
      if (item.isWeapon &&
          !item.isShield &&
          (item.value > currentActor.currentWeapon.value || isSwordForSpear)) {
        // Arm player with the best weapon available.
        world.updateActorById(a.id, (b) {
          if (currentActor.isBarehanded) {
            // Put current weapon to inventory.
            b.weapons.add(currentActor.currentWeapon);
          }
          // Wield the new weapon.
          b.currentWeapon = item.toBuilder();
        });
        takenWeapon = item;
      } else if (item.isShield && currentActor.currentShield == null) {
        world.updateActorById(a.id, (b) => b.currentShield = item.toBuilder());
        takenShield = item;
      } else if (item.isWeapon) {
        // Put the rest to weapons.
        world.updateActorById(a.id, (b) => b..weapons.add(item));
        takenItems.add(item);
      } else {
        // Put the rest to inventory.
        world.updateActorById(a.id, (b) => b..items.add(item));
        takenItems.add(item);
      }
    }

    if (takenWeapon != null) {
      a.report(s, "<subject> pick<s> up <object>", object: takenWeapon);
      a.report(s, "<subject> wield<s> <object>", object: takenWeapon);
    }

    if (takenShield != null) {
      a.report(s, "<subject> pick<s> up <object>", object: takenShield);
      a.report(s, "<subject> wield<s> <object>", object: takenShield);
    }

    _distributeWeapons(takenItems, a, situation, sim, world, s);
    _distributeShields(takenItems, a, situation, sim, world, s);

    if (takenItems.isNotEmpty) {
      s.addEnumeration("<subject> <also> take<s>", takenItems, null,
          subject: a);
    }

    return "${a.name} auto-loots";
  }

  @override
  String getCommand(Null _) => "";

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Null _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Null _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor actor, Simulation sim, WorldState world, Null _) =>
      actor.isPlayer;

  /// Give shields to unshielded teammates.
  void _distributeShields(
      List<Item> takenItems,
      Actor actor,
      LootSituation situation,
      Simulation sim,
      WorldStateBuilder world,
      Storyline s) {
    var shields =
        new List<Item>.from(takenItems.where((item) => item.isShield));
    for (var item in actor.weapons.where((item) => item.isShield)) {
      shields.add(item);
    }
    if (shields.isEmpty) return;
    shields.sort((a, b) => a.value.compareTo(b.value));
    var unshielded = situation.playerTeamIds
        .map((id) => world.getActorById(id))
        .where((a) =>
            a.isAliveAndActive && a.currentShield == null && a.id != actor.id);
    for (var friend in unshielded) {
      if (shields.isEmpty) break;
      var shield = shields.removeLast();
      world.updateActorById(
          friend.id, (b) => b..currentShield = shield.toBuilder());
      takenItems.remove(shield);
      world.updateActorById(actor.id, (b) => b..items.remove(shield));
      actor.report(s, "<subject> give<s> the ${shield.name} to <object>",
          object: friend);
    }
  }

  /// Give weapons to unarmed teammates.
  void _distributeWeapons(
      List<Item> takenItems,
      Actor actor,
      LootSituation situation,
      Simulation sim,
      WorldStateBuilder world,
      Storyline s) {
    var weapons =
        new List<Item>.from(takenItems.where((item) => item.isWeapon));
    for (var item in actor.weapons) {
      weapons.add(item);
    }
    if (weapons.isEmpty) return;
    weapons.sort((a, b) => a.value.compareTo(b.value));
    var barehanded = situation.playerTeamIds
        .map((id) => world.getActorById(id))
        .where((a) => a.isAliveAndActive && a.isBarehanded && a.id != actor.id);
    for (var friend in barehanded) {
      if (weapons.isEmpty) break;
      var weapon = weapons.removeLast();
      world.updateActorById(
          friend.id, (b) => b..currentWeapon = weapon.toBuilder());
      takenItems.remove(weapon);
      world.updateActorById(actor.id, (b) => b..items.remove(weapon));
      actor.report(s, "<subject> give<s> the ${weapon.name} to <object>",
          object: friend);
    }
  }
}
