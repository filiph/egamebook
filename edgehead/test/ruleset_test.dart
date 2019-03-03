import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:test/test.dart';

void main() {
  final orc = Actor.initialized(1, "orc");
  final aren = Actor.initialized(2, "Aren", isPlayer: true);
  const sureSuccess = ReasonedSuccessChance.sureSuccess;

  test("ruleset with 1 rule applies that rule", () {
    var triggered = false;
    final ruleset = Ruleset(
      Rule(42, 1, false, (c) => c.actor.isPlayer, (_) => triggered = true),
    );
    final context =
        ActionContext(null, aren, null, null, null, null, null, sureSuccess);
    ruleset.apply(context);
    expect(triggered, isTrue);
  });

  test("ruleset that doesn't have any applicable rule throws", () {
    final ruleset = Ruleset(
      Rule(42, 1, false, (c) => c.actor.isPlayer, (_) {}),
    );
    final context =
        ActionContext(null, orc, null, null, null, null, null, sureSuccess);
    expect(() => ruleset.apply(context), throwsStateError);
  });

  test("ruleset with 3 rules applies the most specific one", () {
    var outcome = 0;
    final ruleset = Ruleset.unordered([
      Rule(42, 1, false, (c) => c.actor.isPlayer, (_) => outcome = 42),
      Rule(43, 2, false, (c) => c.actor.isPlayer && c.actor.name == "Aren",
          (_) => outcome = 43),
      Rule(44, 0, false, (_) => true, (_) => outcome = 44),
    ]);
    final orcContext =
        ActionContext(null, orc, null, null, null, null, null, sureSuccess);
    ruleset.apply(orcContext);
    expect(outcome, 44);
    final arenContext =
        ActionContext(null, aren, null, null, null, null, null, sureSuccess);
    ruleset.apply(arenContext);
    expect(outcome, 43);
  });

  test("ruleset saves used rules", () {
    const ruleId = 42;
    final ruleset = Ruleset(
      Rule(ruleId, 1, false, (c) => c.actor.isPlayer, (_) {}),
    );
    final world = WorldStateBuilder()
      ..actors = SetBuilder<Actor>(<Actor>[aren])
      ..situations = ListBuilder<Situation>(<Situation>[])
      ..global = ["bogus"]
      ..statefulRandomState = 1337
      ..time = DateTime.utc(1000);
    final context = ActionContext(
        null, aren, null, world.build(), null, world, null, sureSuccess);
    expect(world.build().ruleHistory.query(ruleId).hasHappened, isFalse);
    ruleset.apply(context);
    expect(world.build().ruleHistory.query(ruleId).hasHappened, isTrue);
  });

  test("onlyOnce rule is only triggered once", () {
    int state = 0;
    final ruleset = Ruleset(
      Rule(42, 1, true, (c) => c.actor.isPlayer, (_) => state = 1),
      Rule(43, 0, false, (_) => true, (_) => state = 2),
    );
    final world = WorldStateBuilder()
      ..actors = SetBuilder<Actor>(<Actor>[aren])
      ..situations = ListBuilder<Situation>(<Situation>[])
      ..global = ["bogus"]
      ..statefulRandomState = 1337
      ..time = DateTime.utc(1000);
    final context = ActionContext(
        null, aren, null, world.build(), null, world, null, sureSuccess);
    ruleset.apply(context);
    expect(state, 1);
    final nextWorld = context.outputWorld;
    final nextContext = ActionContext(null, aren, null, nextWorld.build(), null,
        nextWorld, null, sureSuccess);
    ruleset.apply(nextContext);
    expect(state, 2);
  });
}
