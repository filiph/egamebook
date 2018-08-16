import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:test/test.dart';

void main() {
  final aren = Actor.initialized(1, "aren", dexterity: 150);
  final goblin = Actor.initialized(1000, "goblin", dexterity: 100);

  test('player gets ~70% chance over goblin with a max50 dexterity roll', () {
    final chance = getCombatMoveChance(aren, goblin, 0.6, [
      const Bonus(50, CombatReason.dexterity),
    ]);

    expect(chance.value, closeTo(0.7, 0.02));
  });

  test('goblin gets ~45% chance over player with a max50 dexterity roll', () {
    final chance = getCombatMoveChance(goblin, aren, 0.6, [
      const Bonus(50, CombatReason.dexterity),
    ]);

    expect(chance.value, closeTo(0.45, 0.02));
  });

  test('player gets ~50% chance over goblin when out of balance', () {
    final outOfBalanceAren = aren.rebuild((b) => b..pose = Pose.offBalance);

    final chance = getCombatMoveChance(outOfBalanceAren, goblin, 0.6, [
      const Bonus(50, CombatReason.dexterity),
      const Bonus(30, CombatReason.balance),
    ]);

    expect(chance.value, closeTo(0.5, 0.02));
    expect(chance.failureReasons.single.payload, CombatReason.balance);
  });

  test('player gets ~90% chance over goblin with a max95 dex roll', () {
    final chance = getCombatMoveChance(aren, goblin, 0.8, [
      const Bonus(95, CombatReason.dexterity),
    ]);

    expect(chance.value, closeTo(0.9, 0.02));
  });

  test('goblin gets ~40% chance over player with a max95 dex roll', () {
    final chance = getCombatMoveChance(goblin, aren, 0.8, [
      const Bonus(95, CombatReason.dexterity),
    ]);

    expect(chance.value, closeTo(0.4, 0.02));
  });

  test('bonus maxAdjustment sets a limit to adjustment', () {
    final superman = Actor.initialized(111, "superman", dexterity: 999);

    final chance = getCombatMoveChance(superman, goblin, 0.5, [
      const Bonus(50, CombatReason.dexterity),
    ]);

    expect(chance.value, closeTo(0.75, 0.02));
  });
}
