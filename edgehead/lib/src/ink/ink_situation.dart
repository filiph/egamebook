// @dart=2.9

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/ink/actions/ink_choose.dart';

part 'ink_situation.g.dart';

/// This situation represents the player's progress through a short piece
/// of interactive fiction, written by the author in a format similar
/// to Ink (weave).
///
/// The situation holds in itself:
///
/// * [inkAstName] -- the name of the [InkAst] (which is an immutable
///   representation of the ink "file")
/// * [currentPath] -- current "pointer" into the [InkAst] (where we are
///   at this point), which is represented by a list of numbers,
///   selecting nodes.
///
/// The only available actions are [InkChoose] and [InkImplicitWalk].
/// The former action creates as many [Performance]s as there are available
/// choices at the time. The latter just walks through the [InkAst]
/// until the end, or until there's a possibility for the player to choose.
/// It is an implicit action.
abstract class InkSituation extends Object
    with SituationBaseBehavior
    implements Built<InkSituation, InkSituationBuilder> {
  static const String className = "InkSituation";

  static Serializer<InkSituation> get serializer => _$inkSituationSerializer;

  factory InkSituation([void Function(InkSituationBuilder) updates]) =
      _$InkSituation;

  factory InkSituation.initialized(
    int id,
    String inkAstName,
  ) {
    return InkSituation((b) => b
      ..id = id
      ..inkAstName = inkAstName
      ..currentPath = ListBuilder<int>(<int>[0])
      ..turn = 0);
  }

  InkSituation._();

  @override
  List<Action<dynamic>> get actions => const [
        InkChoose.singleton,
        InkImplicitWalk.singleton,
      ];

  /// This is a pointer in the [InkAst].
  ///
  /// For example, say we have an ink AST that looks something like this
  /// (numbers added for reference):
  ///
  ///     #0: Fork
  ///       #0: Choice: "Open door"
  ///         #0: Paragraph: "There is nothing behind the door."
  ///       #1: Choice: "Examine surroundings"
  ///         #0: Paragraph: "Nothing interesting here."
  ///     #1: Paragraph: "I shrug and go back."
  ///
  /// In this case, [currentPath] of `[0]` means we are at the fork, and
  /// two choices will be available to the player. A pointer of `[0, 0, 0]`
  /// represents the paragraph starting with "There is nothing behind the door".
  /// A pointer of `[0, 1]` points to the choice "Examine surroundings".
  /// And so on.
  BuiltList<int> get currentPath;

  @override
  int get id;

  String get inkAstName;

  @override
  String get name => className;

  @override
  int get turn;

  @override
  InkSituation elapseTurn() => rebuild((b) => b.turn = b.turn /*!*/ + 1);

  @override
  Iterable<Actor> getActors(Simulation sim, WorldState w) =>
      w.actors.where((a) => a.isPlayer);

  @override
  ActorTurn getNextTurn(Simulation sim, WorldState world) {
    final player = world.actors.singleWhere((a) => a.isPlayer);

    return ActorTurn(player, world.time);
  }
}
