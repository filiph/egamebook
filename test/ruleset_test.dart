import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:test/test.dart';

void main() {
  final orc = new Actor.initialized(1, "orc");
  final aren = new Actor.initialized(2, "Aren", isPlayer: true);

  test("ruleset with 1 rule applies that rule", () {
    var triggered = false;
    final ruleset = new Ruleset(
      new Rule(42, 1, (a, sim, originalWorld, w) => a.isPlayer,
          (a, sim, w, output, s) => triggered = true),
    );
    ruleset.apply(aren, null, null, null, null);
    expect(triggered, isTrue);
  });

  test("ruleset that doesn't have any applicable rule throws", () {
    final ruleset = new Ruleset(
      new Rule(42, 1, (a, sim, originalWorld, w) => a.isPlayer,
          (a, sim, w, output, s) {}),
    );
    expect(() => ruleset.apply(orc, null, null, null, null), throwsStateError);
  });

  test("ruleset with 3 rules applies the most specific one", () {
    var outcome = 0;
    final ruleset = new Ruleset.unordered([
      new Rule(42, 1, (a, sim, originalWorld, w) => a.isPlayer,
          (a, sim, w, output, s) => outcome = 42),
      new Rule(
          43,
          2,
          (a, sim, originalWorld, w) => a.isPlayer && a.name == "Aren",
          (a, sim, w, output, s) => outcome = 43),
      new Rule(44, 0, (a, sim, originalWorld, w) => true,
          (a, sim, w, output, s) => outcome = 44),
    ]);
    ruleset.apply(orc, null, null, null, null);
    expect(outcome, 44);
    ruleset.apply(aren, null, null, null, null);
    expect(outcome, 43);
  });
}
