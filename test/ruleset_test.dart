import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:test/test.dart';

void main() {
    final orc = new Actor.initialized(1, "orc");
    final aren = new Actor.initialized(2, "Aren", isPlayer: true);

  test("ruleset with 1 rule", () {
    var triggered = false;
    final ruleset = new Ruleset(
      new Rule(42, 1, (a, sim, w) => a.isPlayer,
          (a, sim, w, output, s, pubSub) => triggered = true),
    );
    ruleset.apply(orc, null, null, null, null, null);
    expect(triggered, isFalse);
    ruleset.apply(aren, null, null, null, null, null);
    expect(triggered, isTrue);
  });
}
