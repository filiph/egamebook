import 'package:built_collection/built_collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:test/test.dart';

void main() {
  final orc = new Actor.initialized(1, "orc");
  final aren = new Actor.initialized(2, "Aren", isPlayer: true);
  final sureSuccess = ReasonedSuccessChance.sureSuccess;

  test("ruleset with 1 rule applies that rule", () {
    var triggered = false;
    final ruleset = new Ruleset(
      new Rule(42, 1, false, (c) => c.actor.isPlayer, (_) => triggered = true),
    );
    final context = new ActionContext(
        null, aren, null, null, null, null, null, sureSuccess);
    ruleset.apply(context);
    expect(triggered, isTrue);
  });

  test("ruleset that doesn't have any applicable rule throws", () {
    final ruleset = new Ruleset(
      new Rule(42, 1, false, (c) => c.actor.isPlayer, (_) {}),
    );
    final context =
        new ActionContext(null, orc, null, null, null, null, null, sureSuccess);
    expect(() => ruleset.apply(context), throwsStateError);
  });

  test("ruleset with 3 rules applies the most specific one", () {
    var outcome = 0;
    final ruleset = new Ruleset.unordered([
      new Rule(42, 1, false, (c) => c.actor.isPlayer, (_) => outcome = 42),
      new Rule(43, 2, false, (c) => c.actor.isPlayer && c.actor.name == "Aren",
          (_) => outcome = 43),
      new Rule(44, 0, false, (_) => true, (_) => outcome = 44),
    ]);
    final orcContext =
        new ActionContext(null, orc, null, null, null, null, null, sureSuccess);
    ruleset.apply(orcContext);
    expect(outcome, 44);
    final arenContext = new ActionContext(
        null, aren, null, null, null, null, null, sureSuccess);
    ruleset.apply(arenContext);
    expect(outcome, 43);
  });

  test("ruleset saves used rules", () {
    final ruleId = 42;
    final ruleset = new Ruleset(
      new Rule(ruleId, 1, false, (c) => c.actor.isPlayer, (_) {}),
    );
    final world = new WorldStateBuilder()
      ..actors = new SetBuilder<Actor>(<Actor>[aren])
      ..situations = new ListBuilder<Situation>(<Situation>[])
      ..global = ["bogus"]
      ..statefulRandomState = 1337
      ..time = new DateTime.utc(1000);
    final context = new ActionContext(
        null, aren, null, world.build(), null, world, null, sureSuccess);
    expect(world.build().ruleHistory.query(ruleId).hasHappened, isFalse);
    ruleset.apply(context);
    expect(world.build().ruleHistory.query(ruleId).hasHappened, isTrue);
  });

  test("onlyOnce rule is only triggered once", () {
    int state = 0;
    final ruleset = new Ruleset(
      new Rule(42, 1, true, (c) => c.actor.isPlayer, (_) => state = 1),
      new Rule(43, 0, false, (_) => true, (_) => state = 2),
    );
    final world = new WorldStateBuilder()
      ..actors = new SetBuilder<Actor>(<Actor>[aren])
      ..situations = new ListBuilder<Situation>(<Situation>[])
      ..global = ["bogus"]
      ..statefulRandomState = 1337
      ..time = new DateTime.utc(1000);
    final context = new ActionContext(
        null, aren, null, world.build(), null, world, null, sureSuccess);
    ruleset.apply(context);
    expect(state, 1);
    final nextWorld = context.outputWorld;
    final nextContext = new ActionContext(null, aren, null, nextWorld.build(),
        null, nextWorld, null, sureSuccess);
    ruleset.apply(nextContext);
    expect(state, 2);
  });
}
