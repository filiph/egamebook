library edgehead_facts;

import 'package:edgehead/edgehead_facts_enums.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/context.dart';

void _checkObjectIsEnum(Object o) {
  if (o is DogheadFacts ||
      o is KnightsFacts ||
      o is KeepGateFacts ||
      o is ConetFacts ||
      o is SarnFacts ||
      o is LadyHopeFacts ||
      o is BigOFacts ||
      o is DragonEggFacts ||
      o is ArtifactStarFacts ||
      o is SixtyFiversFacts) {
    return;
  } else {
    throw StateError('$o is not one of the knowledge chain enums');
  }
}

Map<String, List<String>> _generateChains() {
  return <String, List<String>>{
    'ConetFacts': ConetFacts.values.map((e) => e.toString()).toList(),
    'DogheadFacts': DogheadFacts.values.map((e) => e.toString()).toList(),
    'DragonEggFacts': DragonEggFacts.values.map((e) => e.toString()).toList(),
    'KeepGateFacts': KeepGateFacts.values.map((e) => e.toString()).toList(),
    'KnightsFacts': KnightsFacts.values.map((e) => e.toString()).toList(),
    'LadyHopeFacts': LadyHopeFacts.values.map((e) => e.toString()).toList(),
    'SarnFacts': SarnFacts.values.map((e) => e.toString()).toList(),
    'SixtyFiversFacts':
        SixtyFiversFacts.values.map((e) => e.toString()).toList(),
  };
}

/// This class allows checking if the player has learned about something.
/// It implements the "chained facts" idea from Inkle Studios, where some
/// knowledge can be represented as a list of facts. If the player knows
/// something in the chain of fact, they automatically know every fact
/// that precedes the chain.
///
/// This is explained here:
/// https://heavens-vault-game.tumblr.com/post/160306503785/what-dyknow
class ChainedFacts {
  static ChainedFacts singleton = ChainedFacts._();

  final Map<String, List<String>> _chains;

  ChainedFacts._() : _chains = _generateChains();

  /// Check if player already knows [o].
  ///
  /// [o] can either be a [String], or it can be one of the [_chains] enums.
  bool knowsFact(ApplicabilityContext c, Object o) {
    final factName = o.toString();

    if (c.world.customHistory
        .query(name: factName, actorId: playerId)
        .hasHappened) {
      // Player knows this exact fact.
      return true;
    }

    if (o is String) {
      // The fact object is clearly not one of the chained enums, and it failed
      // the simple check above. So it's not known.
      return false;
    }

    _checkObjectIsEnum(o);

    // Player doesn't know this exact fact, but maybe some higher one?
    for (final higherFact in _getAllHigherFacts(factName)) {
      if (c.world.customHistory
          .query(name: higherFact, actorId: playerId)
          .hasHappened) {
        return true;
      }
    }

    return false;
  }

  /// Marks fact [o] as learned.
  ///
  /// [o] can either be a [String], or it can be one of the [_chains] enums.
  void learnFact(ActionContext c, Object o) {
    if (o is! String) {
      _checkObjectIsEnum(o);
    }

    c.outputWorld.recordCustom(o.toString(), actor: c.actor);
  }

  Iterable<String> _getAllHigherFacts(String fact) sync* {
    final chainName = fact.split('.').first;
    if (!_chains.containsKey(chainName)) {
      assert(false, 'The chain for $fact is missing in $_chains');
      return;
    }

    final chain = _chains[chainName];
    final factIndex = chain.indexOf(fact);

    for (var i = factIndex + 1; i < chain.length; i++) {
      yield chain[i];
    }
  }
}
