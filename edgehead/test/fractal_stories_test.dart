import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/decide_slashing_hit.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/fractal_stories/writer_action.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/fatality_on_ground/fatality_on_ground.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';
import 'package:edgehead/src/fight/slash/slash_defense/slash_defense_situation.dart';
import 'package:edgehead/src/fight/slash/slash_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/on_ground_defense_situation.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:test/test.dart';

import 'src/test_random.dart';

void main() {
  group("fractal_stories", () {
    group("Actor", () {
      test("rebuilt actor has different hashcode", () {
        Actor filip = Actor.initialized(1, testRandomIdGetter, "Filip",
            isPlayer: true,
            pronoun: Pronoun.YOU,
            currentWeapon: Item.weapon(42, WeaponType.sword,
                adjective: 'serrated', firstOwnerId: 1),
            constitution: 2,
            stamina: 1,
            initiative: 1000);

        var filip2 = filip.rebuild((b) => b);
        var richard = filip.rebuild((b) => b..name = "Richard");

        expect(filip.hashCode, equals(filip2.hashCode));
        expect(filip.hashCode, isNot(richard.hashCode));
      });
    });

    group("Situation", () {
      late Actor a;
      late Actor b;
      final sim = Simulation(const [], const [], const {},
          const Ruleset.empty(), const {}, const {});
      final world = WorldState((b) => b
        ..actors = ListBuilder<Actor>(<Actor>[])
        ..situations = ListBuilder<Situation>(<Situation>[])
        ..statefulRandomState = 1337
        ..time = DateTime.utc(1000)).toBuilder();

      setUp(() {
        a = Actor.initialized(1001, testRandomIdGetter, "A");
        b = Actor.initialized(1002, testRandomIdGetter, "B");
      });

      test("FightSituation", () {
        var roomRoamingSituation = RoomRoamingSituation.initialized(
            1, Room("something", (c) {}, (c) {}, null, null), false);
        checkSituationBuild(() => FightSituation.initialized(
            2, [], [], "ground", roomRoamingSituation, {}));
        checkSituationBuild(() => FightSituation.initialized(
            3, [a], [b], "ground", roomRoamingSituation, {}));
      });
      test("OnGroundDefenseSituation", () {
        checkSituationBuild(() =>
            createOnGroundDefenseSituation(1, a, b, Predetermination.none));
      });
      test("StrikeDownSituation", () {
        checkSituationBuild(() => createStrikeSlashDownSituation(1, a, b));
      });
      test("CounterAttackSituation", () {
        checkSituationBuild(() => CounterAttackSituation.initialized(1, a, b));
      });
      test("OffBalanceOpportunitySituation", () {
        checkSituationBuild(
            () => OffBalanceOpportunitySituation.initialized(1, a));
        checkSituationBuild(
            () => OffBalanceOpportunitySituation.initialized(2, a, culprit: b));
      });
      test("SlashDefenseSituation", () {
        checkSituationBuild(
            () => createSlashDefenseSituation(1, a, b, Predetermination.none));
      });
      test("SlashSituation from direction", () {
        checkSituationBuild(() =>
            createSlashSituation(1, a, b, direction: SlashDirection.left));
      });
      test("SlashSituation as designation", () {
        checkSituationBuild(() => createSlashSituation(1, a, b,
            designation: BodyPartDesignation.primaryArm));
      });
      test("FatalityOnGroundSituation", () {
        checkSituationBuild(
            () => createFatalityOnGroundSituation(a, sim, world, b));
      });
    });

    group("Exits", () {
      late bool forgeIsAfterFire;

      setUp(() {
        forgeIsAfterFire = false;
      });

      final aren =
          Actor.initialized(1, testRandomIdGetter, "Aren", isPlayer: true);
      final mockAction =
          SimpleAction('', '', (c, a) => 'mockAction applied', '');
      final mockOutputWorldState = WorldStateBuilder()..time = DateTime(200);
      final mockWorldState = mockOutputWorldState.build();

      final afterFireCrevice = Room("after_fire_hidden_crevice",
          emptyRoomDescription, emptyRoomDescription, null, null);

      const forgeName = "forge";

      const forgeAfterFireName = "forge_after_fire";

      final creviceExit = Approach(forgeAfterFireName, afterFireCrevice.name,
          "explore to hidden crevice", (_) {});

      const outsideName = "outside";

      final forgeEntryAfterFire = Approach(
          outsideName, forgeAfterFireName, "enter the charred forge", (_) {});

      final forgeEntry =
          Approach(outsideName, forgeName, "enter the forge", (_) {});

      final outside = Room(
          outsideName, emptyRoomDescription, emptyRoomDescription, null, null);

      final outsideExit =
          Approach(forgeName, outside.name, "go outside", (_) {});

      final forge = Room(
          forgeName, emptyRoomDescription, emptyRoomDescription, null, null);

      final forgeAfterFire = Room(forgeAfterFireName, emptyRoomDescription,
          emptyRoomDescription, null, null,
          parent: forgeName,
          prerequisite: Prerequisite(
              forgeAfterFireName.hashCode, 1, false, (_) => forgeIsAfterFire));

      final simulation = Simulation(
          [forge, forgeAfterFire, afterFireCrevice, outside],
          [creviceExit, forgeEntryAfterFire, forgeEntry, outsideExit],
          const {},
          const Ruleset.empty(),
          const {},
          const {});

      final context = ApplicabilityContext(aren, simulation, mockWorldState);

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
        final aren = Actor.initialized(42, testRandomIdGetter, "Aren",
            currentRoomName: outsideName, isPlayer: true);
        final initialSituation =
            RoomRoamingSituation.initialized(1, outside, false);
        final world = WorldState((b) => b
          ..actors = ListBuilder<Actor>(<Actor>[aren])
          ..situations = ListBuilder<Situation>(<Situation>[initialSituation])
          ..statefulRandomState = 1337
          ..time = DateTime.utc(1000));

        const sureSuccess = ReasonedSuccessChance.sureSuccess;

        test("uses default if no variant is applicable", () {
          final actionContext = ActionContext(mockAction, aren, simulation,
              world, world.toBuilder(), Storyline(), sureSuccess);

          initialSituation.moveActor(aren, actionContext, forgeName);
          final result = actionContext.outputWorld.build();

          expect(result.getActorById(aren.id).currentRoomName, forgeName);
        });

        test("uses variant if applicable", () {
          final actionContext = ActionContext(mockAction, aren, simulation,
              world, world.toBuilder(), Storyline(), sureSuccess);
          forgeIsAfterFire = true;

          expect(world.visitHistory.getLatestOnly(aren)?.roomName,
              isNot(forgeAfterFireName));

          initialSituation.moveActor(aren, actionContext, forgeName);
          final result = actionContext.outputWorld.build();

          expect(result.visitHistory.getLatestOnly(aren)!.roomName,
              forgeAfterFireName);
        });

        test("actor's currentRoom is always the parent", () {
          final actionContext = ActionContext(mockAction, aren, simulation,
              world, world.toBuilder(), Storyline(), sureSuccess);
          forgeIsAfterFire = true;

          initialSituation.moveActor(aren, actionContext, forgeName);
          final result = actionContext.outputWorld.build();

          expect(result.getActorById(aren.id).currentRoomName, forgeName);
        });
      });
    });
  });
}

/// Checks whether the situation initializes correctly. It also checks some
/// assumptions about [Situation.id], [Situation.hashCode] and
/// [Situation.elapseTurn].
///
/// Provide [build], a closure that generates a new situation every time it
/// is called.
void checkSituationBuild(Situation build()) {
  late Situation a;

  // Building returns normally.
  expect(() {
    a = build();
  }, returnsNormally);

  // Hashcode returns consistently.
  expect(a.hashCode, a.hashCode);

  // Situations initialize with time == 0.
  expect(a.turn, 0);

  var b = a.elapseTurn();

  // Situation.elapseTime() works
  expect(b.turn, a.turn + 1);

  // Situations keep id when elapsing time.
  expect(a.id, equals(b.id));

  // Hashcode for same situation with different [time] data is different.
  expect(a.hashCode, isNot(b.hashCode));
}
