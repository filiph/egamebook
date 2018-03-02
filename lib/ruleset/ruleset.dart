library edgehead.ruleset;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

bool _alwaysApplicableCallback(Actor a, Simulation sim,
        WorldState originalWorld, WorldStateBuilder w) =>
    true;

typedef void RuleApplyCallback(Actor a, Simulation sim, WorldState w,
    WorldStateBuilder output, Storyline storylineOutput);

typedef bool RuleIsApplicableCallback(
    Actor a, Simulation sim, WorldState originalWorld, WorldStateBuilder w);

@immutable
class Prerequisite implements Comparable<Prerequisite> {
  final int priority;

  final RuleIsApplicableCallback _isApplicableCallback;

  const Prerequisite(this.priority, this._isApplicableCallback);

  const Prerequisite.alwaysTrue()
      : priority = 0,
        _isApplicableCallback = _alwaysApplicableCallback;

  @override
  int compareTo(Prerequisite other) => -priority.compareTo(other.priority);

  bool isSatisfiedBy(Actor a, Simulation sim, WorldState originalWorld,
          WorldStateBuilder w) =>
      _isApplicableCallback(a, sim, originalWorld, w);
}

@immutable
class Rule {
  final int hash;

  final Prerequisite prerequisite;

  final RuleApplyCallback applyCallback;

  Rule(
    this.hash,
    int priority,
    RuleIsApplicableCallback isApplicableCallback,
    this.applyCallback,
  )
      : prerequisite = new Prerequisite(priority, isApplicableCallback);
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
  /// from highest [Prerequisite.priority] to lowest.
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
    }, growable: false)
      ..sort((a, b) {
        if (a == null) return 1;
        if (b == null) return -1;
        return a.prerequisite.compareTo(b.prerequisite);
      });
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
      Storyline storylineOutput) {
    // TODO: rewrite inline so that we don't need to create a new list
    //       every time
    final all = new List<Rule>.unmodifiable(<Rule>[
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
      if (rule.prerequisite.isSatisfiedBy(a, sim, w, output)) {
        rule.applyCallback(a, sim, w, output, storylineOutput);
        // TODO: record the fact that we've already used rule (via hash)
        // TODO: when 2+ rules of same priority is applicable, use sim.random
        return;
      }
    }

    throw new StateError("No rule was applicable");
  }
}
