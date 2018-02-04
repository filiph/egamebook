library edgehead.ruleset;

import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

typedef void RuleApplyCallback(Actor a, Simulation sim, WorldState w,
    WorldStateBuilder output, Storyline storylineOutput, PubSub pubSub);

typedef bool RuleIsApplicableCallback(Actor a, Simulation sim, WorldState w);

@immutable
class Rule {
  final int hash;

  final int priority;

  final RuleIsApplicableCallback isApplicableCallback;

  final RuleApplyCallback applyCallback;

  const Rule(
      this.hash, this.priority, this.isApplicableCallback, this.applyCallback);
}

@immutable
class Ruleset {
  final Rule rule1;
  final Rule rule2;
  final Rule rule3;
  final Rule rule4;
  final Rule rule5;
  final Rule rule6;
  final Rule rule7;
  final Rule rule8;
  final Rule rule9;
  final Rule rule10;

  /// When using this constructor, you **MUST** provide the rules in order
  /// from highest [Rule.priority] to lowest.
  const Ruleset(this.rule1,
      [this.rule2,
      this.rule3,
      this.rule4,
      this.rule5,
      this.rule6,
      this.rule7,
      this.rule8,
      this.rule9,
      this.rule10]);

  /// Prefer using the [Ruleset] constructor, which is much faster, but which
  /// requires the rules to be provided in order from highest priority to
  /// lowest.
  factory Ruleset.unordered(Iterable<Rule> rules) {
    final iter = rules.iterator;
    final ordered = new List.generate(10, (_) {
      if (!iter.moveNext()) return null;
      return iter.current;
    })
      ..sort((a, b) => -a.priority.compareTo(b.priority));
    assert(ordered.length == 10);
    return new Ruleset(
      ordered[0],
      ordered[1],
      ordered[2],
      ordered[3],
      ordered[4],
      ordered[5],
      ordered[6],
      ordered[7],
      ordered[8],
      ordered[9],
    );
  }

  void apply(Actor a, Simulation sim, WorldState w, WorldStateBuilder output,
      Storyline storylineOutput, PubSub pubSub) {
    // TODO: rewrite inline so that we don't need to create a new list
    //       every time
    final all = new List<Rule>.unmodifiable([
      rule1,
      rule2,
      rule3,
      rule4,
      rule5,
      rule6,
      rule7,
      rule8,
      rule9,
      rule10
    ]);

    for (final rule in all) {
      if (rule == null) break;
      if (rule.isApplicableCallback(a, sim, w)) {
        rule.applyCallback(a, sim, w, output, storylineOutput, pubSub);
        // TODO: record the fact that we've already used rule (via hash)
        // TODO: when 2+ rules of same priority is applicable, use sim.random
        break;
      }
    }
  }
}
