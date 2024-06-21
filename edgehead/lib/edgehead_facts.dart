import 'package:edgehead/edgehead_facts_enums.dart';
import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

/// Keep this map in sync with edgehead_facts_enums.dart.
final Map<Type, List<String>> _chainEnums = {
  ArtifactStarFacts: ArtifactStarFacts.values.map((e) => e.toString()).toList(),
  BigOFacts: BigOFacts.values.map((e) => e.toString()).toList(),
  ConetFacts: ConetFacts.values.map((e) => e.toString()).toList(),
  DeathlessFacts: DeathlessFacts.values.map((e) => e.toString()).toList(),
  DelvingFacts: DelvingFacts.values.map((e) => e.toString()).toList(),
  DogheadFacts: DogheadFacts.values.map((e) => e.toString()).toList(),
  DragonEggFacts: DragonEggFacts.values.map((e) => e.toString()).toList(),
  JisadFacts: JisadFacts.values.map((e) => e.toString()).toList(),
  KeepGateFacts: KeepGateFacts.values.map((e) => e.toString()).toList(),
  KnightsFacts: KnightsFacts.values.map((e) => e.toString()).toList(),
  LadyHopeFacts: LadyHopeFacts.values.map((e) => e.toString()).toList(),
  OracleFacts: OracleFacts.values.map((e) => e.toString()).toList(),
  OrcsFacts: OrcsFacts.values.map((e) => e.toString()).toList(),
  SarnFacts: SarnFacts.values.map((e) => e.toString()).toList(),
  SixtyFiversFacts: SixtyFiversFacts.values.map((e) => e.toString()).toList(),
  TheNullFacts: TheNullFacts.values.map((e) => e.toString()).toList(),
};

/// This class allows checking if the player has learned about something.
/// It implements the "chained facts" idea from Inkle Studios, where some
/// knowledge can be represented as a list of facts. If the player learns
/// fact B in a chain of facts {A, B, C}, they automatically learn every fact
/// that precedes fact B in that chain as well. Therefore, they now know
/// both A and B.
///
/// As an example, in a chain {"there's someone called Alice", "Alice is blond",
/// "Alice grew up in poverty"}, when the player sees Alice for the first
/// time and they introduce each other, they will learn the first two facts
/// at once. To know that Alice is blond automatically implies the knowledge
/// of someone named Alice.
///
/// This is explained here:
/// https://heavens-vault-game.tumblr.com/post/160306503785/what-dyknow
class ChainedFacts {
  static final ChainedFacts singleton = ChainedFacts._();

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

    final chain = _chains[chainName]!;
    final factIndex = chain.indexOf(fact);

    for (var i = factIndex + 1; i < chain.length; i++) {
      yield chain[i];
    }
  }

  static void _checkObjectIsEnum(Object o) {
    for (final type in _chainEnums.keys) {
      if (o.runtimeType == type) return;
    }

    throw StateError('$o is not one of the knowledge chain enums');
  }

  /// A copy of [_chainEnums], but the keys are strings instead of types.
  static Map<String, List<String>> _generateChains() {
    return Map<String, List<String>>.fromEntries(_chainEnums.keys
        .map((Type e) => MapEntry(e.toString(), _chainEnums[e]!)));
  }
}
