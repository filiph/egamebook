import 'dart:math' as math;

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

List<String> _getSubCommands(Choice choice) {
  final split = choice.markdownText
      .split(">>")
      .map((s) => s.trim())
      .toList(growable: false);
  return split;
}

/// Taken from `package:collection`.
///
/// https://pub.dartlang.org/documentation/collection/latest/collection/groupBy.html
Map<T, List<S>> _groupBy<S, T>(Iterable<S> values, T key(S element)) {
  var map = <T, List<S>>{};
  for (var element in values) {
    var list = map.putIfAbsent(key(element), () => []);
    list.add(element);
  }
  return map;
}

/// Recursively creates a tree from given [choices]. The node given
/// by this function will be [order] deep, with [prefix].
ChoiceTreeNode _makeNode(int order, String prefix, Iterable<_Choice> choices) {
  // A closure that gets the current prefix of a choice. For example, in
  // order 0, the prefix will be always "", for level 1 it could be "Attack",
  // and for level 2 it could be "Attack >> goblin".
  String _getPrefix(_Choice choice) {
    int end = math.min(order, choice.subCommands.length);
    return choice.subCommands.sublist(0, end).join(' >> ');
  }

  // Group all choices by current prefix.
  final groups = _groupBy(choices, _getPrefix);

  // Get all the groups that have only one value. These are leaf choices.
  final singleGroups = groups.entries
      .where((entry) =>
          // Only one entry in this 'group'.
          entry.value.length == 1 &&
          // And we're in the right depth of the tree.
          entry.value.single.order == order - 1)
      .toList();

  // Remove the simple groups from the rest.
  groups.removeWhere((key, _) => singleGroups.any((leaf) => leaf.key == key));

  return ChoiceTreeNode(
      order,
      prefix,
      singleGroups.map((entry) => entry.value.single.choice).toList(),
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

  ChoiceTreeNode root;

  ChoiceTree(this.choiceBlock)
      : root = _makeTree(0, '', _choicesFromBlock(choiceBlock));

  /// Given a [text] of a [Choice] or choice group ([ChoiceTreeNode]),
  /// and the currently shown [node], return the text to show.
  ///
  /// For example, for a choice with [Choice.markdownText] like
  /// "Kick >> goblin >> in groin" and a node of level `1`, the result
  /// would be "goblin in groin". For a group at level `0`, it would be "Kick".
  static String getChoiceTextAtNode(String text, ChoiceTreeNode node) {
    return text
        // Replace the leading text (like "Kick ").
        .replaceFirst(node.prefix, '')
        // Collapse ' >> ' into a single space.
        .replaceAll(' >> ', ' ')
        // Otherwise, just remove '>>'.
        .replaceAll('>>', '');
  }
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
  final List<String> subCommands;
  final Choice choice;

  int _order;

  _Choice(Choice choice)
      : choice = choice,
        subCommands = _getSubCommands(choice) {
    _order = subCommands.length - 1;
  }

  /// The depth of this choice. In short, it's the number of `>>`
  /// in the command text.
  int get order => _order;
}
