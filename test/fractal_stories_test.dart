import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/src/fight/break_neck/break_neck_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';
import 'package:test/test.dart';

import 'package:edgehead/fractal_stories/actor.dart';

void main() {
  group("fractal_stories", () {
    group("Actor", () {
      test("rebuilt actor has different hashcode", () {
        Actor filip = new Actor.initialized(1, "Filip",
            isPlayer: true,
            pronoun: Pronoun.YOU,
            currentWeapon: new Sword(),
            hitpoints: 2,
            maxHitpoints: 2,
            stamina: 1,
            initiative: 1000);

        var filip2 = filip.rebuild((b) => b);
        var richard = filip.rebuild((b) => b..name = "Richard");

        expect(filip.hashCode, equals(filip2.hashCode));
        expect(filip.hashCode, isNot(richard.hashCode));
      });
    });
    group("Situation", () {
      Actor a, b;
      setUp(() {
        a = new Actor.initialized(1, "A");
        b = new Actor.initialized(2, "B");
      });

      test("FightSituation", () {
        checkSituationBuild(
            () => new FightSituation.initialized([], [], "ground"));
        checkSituationBuild(
            () => new FightSituation.initialized([a], [b], "ground"));
      });
      test("OnGroundDefenseSituation", () {
        checkSituationBuild(
            () => new OnGroundDefenseSituation.initialized(a, b));
      });
      test("StrikeDownSituation", () {
        checkSituationBuild(() => new StrikeDownSituation.initialized(a, b));
      });
      test("CounterAttackSituation", () {
        checkSituationBuild(() => new CounterAttackSituation.initialized(a, b));
      });
      test("OffBalanceOpportunitySituation", () {
        checkSituationBuild(
            () => new OffBalanceOpportunitySituation.initialized(a));
        checkSituationBuild(() =>
            new OffBalanceOpportunitySituation.initialized(a, culprit: b));
      });
      test("SlashDefenseSituation", () {
        checkSituationBuild(() => new SlashDefenseSituation.initialized(a, b));
      });
      test("SlashSituation", () {
        checkSituationBuild(() => new SlashSituation.initialized(a, b));
      });
      test("BreakNeckOnGroundSituation", () {
        checkSituationBuild(
            () => new BreakNeckOnGroundSituation.initialized(a, b));
      });
    });
  });
}

/// Checks whether the situation initializes correctly. It also checks some
/// assumptions about [Situation.id], [Situation.hashCode] and
/// [Situation.elapseTime].
///
/// Provide [build], a closure that generates a new situation every time it
/// is called.
void checkSituationBuild(Situation build()) {
  Situation a;
  Situation b;

  // Building returns normally.
  expect(() {
    a = build();
  }, returnsNormally);

  // Hashcode returns consistently.
  expect(a.hashCode, a.hashCode);

  // Situations initialize with time == 0.
  expect(a.time, 0);

  expect(() {
    b = build();
  }, returnsNormally);

  // Different situations have different hashcodes.
  expect(a.hashCode, isNot(b.hashCode));

  // Situations get unique id.
  expect(a.id, isNot(b.id));

  var c = a.elapseTime();

  // Situation.elapseTime() works
  expect(c.time, a.time + 1);

  // Situations keep id when elapsing time.
  expect(a.id, equals(c.id));

  // Hashcode for same situation with different [time] data is different.
  expect(a.hashCode, isNot(c.hashCode));
}
