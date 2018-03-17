import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:test/test.dart';

void main() {
  final orc = new Actor.initialized(1, "orc");
  final aren = new Actor.initialized(2, "Aren", isPlayer: true);

  test("ruleset with 1 rule applies that rule", () {
    var triggered = false;
    final ruleset = new Ruleset(
      new Rule(42, 1, (c) => c.actor.isPlayer, (_) => triggered = true),
    );
    final context = new ActionContext(null, aren, null, null, null, null, null);
    ruleset.apply(context);
    expect(triggered, isTrue);
  });

  test("ruleset that doesn't have any applicable rule throws", () {
    final ruleset = new Ruleset(
      new Rule(42, 1, (c) => c.actor.isPlayer, (_) {}),
    );
    final context = new ActionContext(null, orc, null, null, null, null, null);
    expect(() => ruleset.apply(context), throwsStateError);
  });

  test("ruleset with 3 rules applies the most specific one", () {
    var outcome = 0;
    final ruleset = new Ruleset.unordered([
      new Rule(42, 1, (c) => c.actor.isPlayer, (_) => outcome = 42),
      new Rule(43, 2, (c) => c.actor.isPlayer && c.actor.name == "Aren",
          (_) => outcome = 43),
      new Rule(44, 0, (_) => true, (_) => outcome = 44),
    ]);
    final orcContext =
        new ActionContext(null, orc, null, null, null, null, null);
    ruleset.apply(orcContext);
    expect(outcome, 44);
    final arenContext =
        new ActionContext(null, aren, null, null, null, null, null);
    ruleset.apply(arenContext);
    expect(outcome, 43);
  });
}