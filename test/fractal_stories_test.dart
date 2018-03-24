import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/src/fight/break_neck/break_neck_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:test/test.dart';

void main() {
  group("fractal_stories", () {
    group("Actor", () {
      test("rebuilt actor has different hashcode", () {
        Actor filip = new Actor.initialized(1, "Filip",
            isPlayer: true,
            pronoun: Pronoun.YOU,
            currentWeapon: new Weapon(WeaponType.sword),
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
        var roomRoamingSituation = new RoomRoamingSituation.initialized(
            new Room("something", (c) {}, (c) {}, null, null), false);
        checkSituationBuild(() => new FightSituation.initialized(
            [], [], "ground", roomRoamingSituation, {}));
        checkSituationBuild(() => new FightSituation.initialized(
            [a], [b], "ground", roomRoamingSituation, {}));
      });
      test("OnGroundDefenseSituation", () {
        checkSituationBuild(
            () => createOnGroundDefenseSituation(a, b, Predetermination.none));
      });
      test("StrikeDownSituation", () {
        checkSituationBuild(() => createStrikeDownSituation(a, b));
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
        checkSituationBuild(
            () => createSlashDefenseSituation(a, b, Predetermination.none));
      });
      test("SlashSituation", () {
        checkSituationBuild(() => createSlashSituation(a, b));
      });
      test("BreakNeckOnGroundSituation", () {
        checkSituationBuild(() => createBreakNeckOnGroundSituation(a, b));
      });
    });

    group("Exits", () {
      bool forgeIsAfterFire;

      setUp(() {
        forgeIsAfterFire = false;
      });

      final afterFireCrevice = new Room("after_fire_hidden_crevice",
          emptyRoomDescription, emptyRoomDescription, null, null);

      final _forgeName = "forge";

      final _forgeAfterFireName = "forge_after_fire";

      final creviceExit = new Approach(_forgeAfterFireName,
          afterFireCrevice.name, "explore to hidden crevice", (_) {});

      final _outsideName = "outside";

      final forgeEntryAfterFire = new Approach(
          _outsideName, _forgeAfterFireName, "enter the charred forge", (_) {});

      final forgeEntry =
          new Approach(_outsideName, _forgeName, "enter the forge", (_) {});

      final outside = new Room(
          _outsideName, emptyRoomDescription, emptyRoomDescription, null, null);

      final outsideExit =
          new Approach(_forgeName, outside.name, "go outside", (_) {});

      final forge = new Room(
          _forgeName, emptyRoomDescription, emptyRoomDescription, null, null);

      final forgeAfterFire = new Room(_forgeAfterFireName, emptyRoomDescription,
          emptyRoomDescription, null, null,
          parent: _forgeName,
          prerequisite: new Prerequisite(
              _forgeAfterFireName.hashCode, 1, false, (_) => forgeIsAfterFire));

      final simulation = new Simulation(
          [forge, forgeAfterFire, afterFireCrevice, outside],
          [creviceExit, forgeEntryAfterFire, forgeEntry, outsideExit],
          {});

      final context = new ApplicabilityContext(null, simulation, null);

      test("the default is picked when no more specific apply", () {
        expect(simulation.getAvailableApproaches(outside, context),
            unorderedEquals(<Approach>[forgeEntry]));
      });

      test("variants get parent's exits if not overridden", () {
        forgeIsAfterFire = true;
        expect(simulation.getAvailableApproaches(forgeAfterFire, context),
            unorderedEquals(<Approach>[outsideExit, creviceExit]));
      });

      test("variants use own exits over parent's when overridden", () {
        forgeIsAfterFire = true;
        expect(simulation.getAvailableApproaches(outside, context),
            unorderedEquals(<Approach>[forgeEntryAfterFire]));
      });

      group("RoomRoamingSituation.moveActor", () {
        final aren =
            new Actor.initialized(42, "Aren", currentRoomName: _outsideName);
        final initialSituation =
            new RoomRoamingSituation.initialized(outside, false);
        final world = new WorldState((b) => b
          ..actors = new SetBuilder<Actor>(<Actor>[aren])
          ..situations =
              new ListBuilder<Situation>(<Situation>[initialSituation])
          ..global = ["bogus"]
          ..time = new DateTime.utc(1000));

        test(" uses default if no variant is applicable", () {
          final actionContext = new ActionContext(
              null, aren, simulation, world, null, world.toBuilder(), null);

          initialSituation.moveActor(actionContext, _forgeName, silent: true);
          final result = actionContext.outputWorld.build();

          expect(result.getActorById(aren.id).currentRoomName, _forgeName);
        });

        test("uses variant if applicable", () {
          final actionContext = new ActionContext(
              null, aren, simulation, world, null, world.toBuilder(), null);
          forgeIsAfterFire = true;

          initialSituation.moveActor(actionContext, _forgeName, silent: true);
          final result = actionContext.outputWorld.build();

          expect(result.getActorById(aren.id).currentRoomName,
              _forgeAfterFireName);
        });
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
