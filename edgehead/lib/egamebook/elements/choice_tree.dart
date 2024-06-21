import 'package:built_collection/built_collection.dart';
import 'package:edgehead/egamebook/elements/choice_block_element.dart';
import 'package:edgehead/egamebook/elements/choice_element.dart';

/// Generates the wrapped [_Choice] instances for each choice in the [block].
Iterable<_Choice> _choicesFromBlock(ChoiceBlock block) =>
    block.choices.map((c) => _Choice(c));

/// Makes the order of the node and all its sub-nodes one less.
ChoiceTreeNode _decreaseOrder(ChoiceTreeNode node) {
  return ChoiceTreeNode(
    node.order - 1,
    node.prefix,
    node.choices,
    node.groups.map(_decreaseOrder).toList(growable: false),
  );
}

/// Taken from `package:collection`.
///
/// https://pub.dartlang.org/documentation/collection/latest/collection/groupBy.html
Map<T, List<S>> _groupBy<S, T>(Iterable<S> values, T key(S element)) {
  var map = <T, List<S>>{};
  for (final element in values) {
    var list = map.putIfAbsent(key(element), () => []);
    list.add(element);
  }
  return map;
}

/// Recursively creates a tree from given [choices]. The node given
/// by this function will be [order] deep, with [prefix].
ChoiceTreeNode _makeNode(int order, String prefix, Iterable<_Choice> choices) {
  assert(prefix.trim() != 'go',
      "All 'map' actions must be under 'Go' command, case sensitive.");
  assert(prefix.trim() != 'inventory',
      "All 'item' actions must be under 'Inventory' command, case sensitive.");
  assert(prefix.trim() != 'skills',
      "All 'skills' actions must be under 'Skills' command, case sensitive.");

  final list = choices.toList(growable: false);

  // A list of choices that are at the current order and shouldn't be made
  // into a group.
  final singles =
      list.where((choice) => choice.order == order - 1).toList(growable: false);

  // A closure that gets the current prefix of a choice. For example, in
  // order 0, the prefix will be always "", for level 1 it could be "Attack",
  // and for level 2 it could be "goblin".
  String getPrefix(_Choice choice) {
    if (order == 0) return '';
    assert(
        order - 1 < choice.commandPath.length,
        "Trying to get prefix of $choice at order $order, "
        "which is out of bounds of ${choice.commandPath}");
    final prefix = choice.commandPath[order - 1];
    return prefix.trim();
  }

  // Group all non-single choices by current prefix.
  final nonSingles = list.where((choice) => !singles.contains(choice));
  final groups = _groupBy(nonSingles, getPrefix);

  return ChoiceTreeNode(
      order,
      prefix,
      singles.map((choice) => choice.choice).toList(growable: false),
      groups.entries
          .map((entry) => _makeNode(order + 1, entry.key, entry.value))
          .toList(growable: false));
}

/// This is the special case for the top of the [ChoiceTree].
///
/// The top node created by [_makeNode] will have one group with prefix
/// `''` when there is more than one choice. [_makeTree] just unwraps that so
/// that the single group under this node becomes the root node. The other
/// option is when there is only one choice, in which case we can directly
/// return the result of [_makeNode].
ChoiceTreeNode _makeTree(int order, String prefix, Iterable<_Choice> choices) {
  final root = _makeNode(order, prefix, choices);
  if (root.groups.length == 1) {
    return _decreaseOrder(root.groups.single);
  } else if (root.groups.isEmpty) {
    return root;
  } else {
    throw StateError('Invalid tree created by _makeNode.');
  }
}

/// A convenience class that takes a [ChoiceBlock] and builds a tree
/// of [ChoiceTreeNode]s.
///
/// If there are two choices, one with command "Go >> to cave" and the other
/// with command "Go >> elsewhere", this will create a simple tree with only
/// one group at the top ("Go") and two choices in that group ("... to cave"
/// and "... elsewhere").
class ChoiceTree {
  final ChoiceBlock choiceBlock;

  final ChoiceTreeNode root;

  ChoiceTree(this.choiceBlock)
      : root = _makeTree(0, '', _choicesFromBlock(choiceBlock));
}

class ChoiceTreeNode {
  /// How deep in the tree are we?
  final int order;

  /// The string prefix that is common to all choices under this node.
  final String prefix;

  /// The choices that the player can select at this level.
  final List<Choice> choices;

  /// The grouped sub-choices.
  final List<ChoiceTreeNode> groups;

  ChoiceTreeNode(this.order, this.prefix, this.choices, this.groups);

  @override
  String toString() => 'ChoiceTreeNode<$order, $prefix>';
}

/// Choice with metadata important for the algorithm.
class _Choice {
  final Choice choice;

  /// The depth of this choice. In short, it's the number of `>>`
  /// in the command text.
  final int order;

  _Choice(this.choice)
      : assert(choice.commandPath.isNotEmpty,
            "Command path must have at least one member: $choice"),
        order = choice.commandPath.length - 1;

  BuiltList<String> get commandPath => choice.commandPath;
}
