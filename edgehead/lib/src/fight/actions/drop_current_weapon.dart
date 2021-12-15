// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/equip_weapon.dart';
import 'package:edgehead/src/fight/common/drop_weapon.dart';

/// This is meant mostly for harmless weapons, when going barehanded
/// is an improvement.
class DropCurrentWeapon extends InventoryItemAction {
  static final DropCurrentWeapon singleton = DropCurrentWeapon();

  static const String className = "DropCurrentWeapon";

  @override
  final String helpMessage = "I can drop the thing.";

  @override
  final bool isAggressive = false;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = false;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  final String verb = "drop";

  @override
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Item item) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;

    assert(context.actor.currentWeapon == item);
    assert(item.damageCapability.isHarmless);

    a.report(s, "<subject> drop<s> <object>", object: item);

    dropCurrentWeapon(context.outputWorld, a.id, forced: false);

    return "${a.name} drops ${item.name}";
  }

  @override
  Iterable<Item /*!*/ > generateObjects(ApplicabilityContext context) {
    if (context.actor.currentWeapon == null) {
      return const [];
    }
    return [context.actor.currentWeapon];
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, void _) =>
      // We’re limiting which weapons can be dropped to only those
      // with harmless DamageCapability. We don’t want enemies to randomly
      // drop perfectly good swords.
      a.currentDamageCapability.isHarmless;
}
