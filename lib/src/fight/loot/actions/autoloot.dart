import 'package:edgehead/edgehead_lib.dart' show brianaId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/items/shield.dart';
import 'package:edgehead/fractal_stories/items/spear.dart';
import 'package:edgehead/fractal_stories/items/sword.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';

class AutoLoot extends Action {
  static final AutoLoot singleton = new AutoLoot();

  static const String className = "AutoLoot";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  String get command => "";

  @override
  String get helpMessage => null;

  @override
  String get name => className;

  @override
  String applyFailure(_) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    WorldState world = context.world;
    Storyline s = context.storyline;
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

    Weapon takenWeapon;
    Shield takenShield;
    List<Item> takenItems = [];
    for (var item in situation.droppedItems) {
      // TODO: generalize sword for spear for other weapons
      final currentActor = world.getActorById(a.id);
      final isSwordForSpear =
          currentActor.currentWeapon is Spear && item is Sword;
      if (item is Weapon &&
          (item.value > currentActor.currentWeapon.value || isSwordForSpear)) {
        // Arm player with the best weapon available.
        world.updateActorById(a.id, (b) {
          if (currentActor.currentWeapon is! Fist) {
            // Put current weapon to inventory.
            b.items.add(currentActor.currentWeapon);
          }
          // Wield the new weapon.
          b.currentWeapon = item;
        });
        takenWeapon = item;
      } else if (item is Shield && currentActor.currentShield == null) {
        world.updateActorById(a.id, (b) => b.currentShield = item);
        takenShield = item;
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

    _distributeWeapons(takenItems, a, situation, world, s);
    _distributeShields(takenItems, a, situation, world, s);

    if (takenItems.isNotEmpty) {
      s.addEnumeration("<subject> <also> take<s>", takenItems, null,
          subject: a);
    }

    return "${a.name} auto-loots";
  }

  @override
  String getRollReason(Actor a, WorldState w) => "WARNING this shouldn't be "
      "user-visible";

  @override
  num getSuccessChance(Actor actor, WorldState world) => 1.0;

  @override
  bool isApplicable(Actor actor, WorldState world) => actor.isPlayer;

  /// Give weapons to unarmed teammates.
  void _distributeWeapons(List<Item> takenItems, Actor actor,
      LootSituation situation, WorldState world, Storyline s) {
    var weapons =
        new List<Weapon>.from(takenItems.where((item) => item is Weapon));
    for (var item in actor.items) {
      if (item is Weapon) weapons.add(item);
    }
    if (weapons.isEmpty) return;
    weapons.sort((a, b) => a.value.compareTo(b.value));
    var barehanded = situation.playerTeamIds
        .map((id) => world.getActorById(id))
        .where((a) => a.isAliveAndActive && a.isBarehanded && a.id != actor.id);
    for (var friend in barehanded) {
      if (weapons.isEmpty) break;
      var weapon = weapons.removeLast();
      world.updateActorById(friend.id, (b) => b..currentWeapon = weapon);
      takenItems.remove(weapon);
      world.updateActorById(actor.id, (b) => b..items.remove(weapon));
      actor.report(s, "<subject> give<s> the ${weapon.name} to <object>",
          object: friend);
    }
  }

  /// Give shields to unshielded teammates.
  void _distributeShields(List<Item> takenItems, Actor actor,
      LootSituation situation, WorldState world, Storyline s) {
    var shields =
        new List<Shield>.from(takenItems.where((item) => item is Shield));
    for (var item in actor.items) {
      if (item is Shield) shields.add(item);
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
      world.updateActorById(friend.id, (b) => b..currentShield = shield);
      takenItems.remove(shield);
      world.updateActorById(actor.id, (b) => b..items.remove(shield));
      actor.report(s, "<subject> give<s> the ${shield.name} to <object>",
          object: friend);
    }
  }
}
