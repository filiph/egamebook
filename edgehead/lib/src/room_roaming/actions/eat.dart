import 'package:edgehead/edgehead_lib.dart';
import 'package:edgehead/egamebook/elements/elements.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/edibility.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class Eat extends Action<Item> {
  static const className = 'Eat';

  static final Eat singleton = Eat();

  @override
  List<String> get commandPathTemplate =>
      ['inventory', '<objectNounWithAdjective>', 'eat'];

  @override
  String get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => throw UnimplementedError();

  @override
  String applyFailure(ActionContext context, Item item) {
    throw StateError('This action always succeeds.');
  }

  @override
  String applySuccess(ActionContext context, Item item) {
    final a = context.actor;
    final w = context.outputWorld;
    final s = context.outputStoryline;

    assert(item.edibility != Edibility.inedible);

    // The player knows what she's doing, so no need to repeat.
    // But if a different actor is eating, we should make it clear.
    if (!a.isPlayer) {
      a.report(s, '<subject> eat<s> <object>', object: item);
    }

    if (item.edibility.eatingReport != null) {
      s.add(item.edibility.eatingReport, isRaw: true);
    }

    if (item.edibility == Edibility.disgusting) {
      item.report(s, '<subject> <is> disgusting');
      a.report(s, '<subject> force<s> <subjectPronounSelf> to eat <object>',
          object: item);
      a.report(s, '<subject> get<s> sick', negative: true);
      a.report(s, '<subject> retch<es> violently', negative: true);
    }

    var staminaUpdate = item.edibility.staminaBonus;
    final newStamina = a.stamina + staminaUpdate;
    if (newStamina < 0) {
      // Don't go below 0. Just remove all current stamina.
      staminaUpdate = -a.stamina;
    } else if (newStamina > EdgeheadGame.staminaSetting.maxValue) {
      // Don't go over max value.
      staminaUpdate = EdgeheadGame.staminaSetting.maxValue - a.stamina;
    }

    s.addCustomElement(StatUpdate.stamina(a.stamina, staminaUpdate));

    w.updateActorById(a.id, (b) {
      b.inventory.remove(item);
      b.stamina += staminaUpdate;
    });

    return '${a.name} successfully eats ${item.name}';
  }

  /// Returns items that could be eaten.
  @override
  Iterable<Item> generateObjects(ApplicabilityContext context) {
    // Takes all weapons from inventory...
    return context.actor.inventory.items.where((w) =>
        // ... and take those that are edible.
        w.edibility.canBeEatenBy(context.actor));
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Item item) {
    throw UnimplementedError();
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Item item) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Item item) {
    final situation = w.currentSituation as RoomRoamingSituation;
    final room = sim.getRoomByName(situation.currentRoomName);

    if (room.isSynthetic) return false;

    if (situation.monstersAlive) {
      // Don't allow eating when monsters in this room are still alive.
      return false;
    }

    // Since [generateObjects] already takes care of inedible objects,
    // we can just return `true` here.
    return true;
  }
}
