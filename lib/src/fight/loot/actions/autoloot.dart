import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
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
  String applyFailure(Actor actor, WorldState world, Storyline storyline) {
    throw new UnimplementedError();
  }

  @override
  String applySuccess(Actor a, WorldState world, Storyline s) {
    var situation =
        world.getSituationByName<LootSituation>(LootSituation.className);

    Weapon takenWeapon;
    List<Item> takenItems = [];
    for (var item in situation.droppedItems) {
      if (item is Weapon && item.value > a.currentWeapon.value) {
        // Arm player with the best weapon available.
        world.updateActorById(a.id, (b) {
          if (a.currentWeapon is! Fist) {
            b.items.add(a.currentWeapon);
          }
          b.currentWeapon = item;
          return b;
        });
        takenWeapon = item;
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

    _distributeWeapons(takenItems, a, situation, world, s);

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
    weapons.addAll(actor.items.where((item) => item is Weapon));
    if (weapons.isEmpty) return;
    weapons.sort((a, b) => a.value.compareTo(b.value));
    var barehanded = situation.playerTeamIds
        .map((id) => world.getActorById(id))
        .where((a) => a.isAliveAndActive && a.isBarehanded);
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
}
