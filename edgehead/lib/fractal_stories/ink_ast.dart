import 'package:edgehead/fractal_stories/context.dart';

class InkAst extends InkSequenceNode {
  const InkAst(super.children);

  List<int> getNextPosition(List<int> path) {
    final node = getNodeAt(path);

    if (node == this) {
      // Root node. There is nothing after this.
      return const [];
    }

    final parentPath = path.take(path.length - 1).toList();
    // Parent must be a sequence, otherwise the pointer doesn't make sense.
    final parent = getNodeAt(parentPath) as InkSequenceNode;

    if (parent is InkForkNode) {
      // We've gone through a whole fork node. Time to jump after
      // the end of the fork. In other words, don't start executing the choice
      // after the one that was selected.
      return getNextPosition(parentPath);
    }

    final indexInParent = path.last;
    final nextIndexInParent = indexInParent + 1;

    if (nextIndexInParent >= parent.children.length) {
      // At the end of the parent.
      return getNextPosition(parentPath);
    }

    return parentPath.followedBy([nextIndexInParent]).toList();
  }

  InkNode getNodeAt(Iterable<int> path) {
    InkNode current = this;
    for (final position in path) {
      assert(
          current is InkSequenceNode,
          "Path asks for a position ($position) "
          "but $current is not an InkSequenceNode "
          "(it's a ${current.runtimeType})");

      current = (current as InkSequenceNode).children[position];
    }
    return current;
  }
}

/// The individual choice defined in an [InkAst].
class InkChoiceNode extends InkSequenceNode {
  final bool Function(ApplicabilityContext)? isApplicable;

  final String command;

  const InkChoiceNode({
    required this.command,
    required List<InkNode> consequence,
    this.isApplicable,
  }) : super(consequence);

  List<String> get commandPath {
    // Remove the ((help message)), if any.
    final commandItself = command.split('((').first;
    return commandItself.split('>>');
  }

  List<InkNode> get consequence => children;

  String? get helpMessage {
    final helpMessageStart = command.indexOf('((');
    if (helpMessageStart == -1) return null;
    final helpMessageEnd = command.indexOf('))');
    assert(helpMessageStart < helpMessageEnd,
        'Command starts a helpMessage region but never closes it: $command');
    return command.substring(helpMessageStart + '(('.length, helpMessageEnd);
  }
}

class InkForkNode extends InkSequenceNode {
  const InkForkNode(List<InkChoiceNode> super.inkChoices);

  List<InkChoiceNode> get inkChoices => children as List<InkChoiceNode>;
}

abstract class InkNode {
  const InkNode();
}

class InkParagraphNode extends InkNode {
  final void Function(ActionContext) writer;

  const InkParagraphNode(this.writer);
}

class InkSequenceNode extends InkNode {
  final List<InkNode> children;

  const InkSequenceNode(this.children);
}

// TODO: InkCodeNode -- just a way to run arbitrary code, with ActionContext
