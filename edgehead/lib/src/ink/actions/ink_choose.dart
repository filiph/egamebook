import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/ink_ast.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/ink/ink_situation.dart';

/// A specification of an ink choice, including the "pointer" to it
/// in a given [InkAst].
class InkChoicePointer {
  /// These is a list of choices to make in order to get to the choice which
  /// this [InkChoicePointer] represents. For example, if you need to pick
  /// the first choice in the first branch, and the second choice in the second
  /// branch in order to see the choice being pointed at, then this list
  /// will be `[0, 1]`.
  final List<int> pathToFork;

  /// Once we are at the choice list defined by [pathToFork], this is the
  /// ordinal number of the [choice].
  final int indexOfChoice;

  /// The [InkChoiceNode] being pointed at.
  final InkChoiceNode choice;

  const InkChoicePointer({
    required this.choice,
    required this.pathToFork,
    required this.indexOfChoice,
  });
}

class InkChoose extends Action<InkChoicePointer> {
  static const className = 'InkChoose';

  static const InkChoose singleton = InkChoose();

  static final _whitespace = RegExp(r'\s+');

  const InkChoose();

  @override
  List<String> get commandPathTemplate =>
      throw StateError('This action implements own getCommandPath');

  @override
  String get helpMessage =>
      throw StateError('This action implements own getHelpMessage');

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String applyFailure(ActionContext context, InkChoicePointer pointer) {
    throw StateError('InkChoiceAction cannot fail');
  }

  @override
  String applySuccess(ActionContext context, InkChoicePointer pointer) {
    final inkSituation =
        context.world.getSituationByName<InkSituation>(InkSituation.className);
    final InkAst ast = context.simulation.getInkByName(inkSituation.inkAstName);

    var path = pointer.pathToFork.followedBy([pointer.indexOfChoice]).toList();
    final choice = ast.getNodeAt(path) as InkChoiceNode;

    if (choice.consequence.isEmpty) {
      // If choice has no consequence, immediately jump after fork.
      path = path.take(path.length - 1).toList();
      path = ast.getNextPosition(path);
    } else {
      // Otherwise, go to first member of the list of consequences.
      path = path.followedBy([0]).toList();
    }

    // Perform the walk, until end of AST or next fork.
    final end = _walkUntilFork(ast, path, context);

    if (end == null) {
      // We have finished. Pop the [InkSituation].
      if (context.outputWorld.currentSituation?.id == inkSituation.id) {
        context.outputWorld.popSituation(context);
      }
    } else {
      // The INK continues. Rebuild this situation with the new
      // [InkSituation.currentPath].
      context.outputWorld.replaceSituationById<InkSituation>(inkSituation.id,
          inkSituation.rebuild((b) => b.currentPath.replace(end)));
    }
    return "player chose '${pointer.choice.command}' in InkSituation";
  }

  @override
  Iterable<InkChoicePointer> generateObjects(
      ApplicabilityContext context) sync* {
    final inkSituation =
        context.world.getSituationByName<InkSituation>(InkSituation.className);
    final InkAst ast = context.simulation.getInkByName(inkSituation.inkAstName);

    final currentNode = ast.getNodeAt(inkSituation.currentPath);

    if (currentNode is! InkForkNode) {
      // We're not at a decision fork. There are no actions here.
      return;
    }

    final choices = currentNode.inkChoices;
    for (int i = 0; i < choices.length; i++) {
      yield InkChoicePointer(
          choice: choices[i],
          pathToFork: inkSituation.currentPath.toList(growable: false),
          indexOfChoice: i);
    }
  }

  @override
  List<String> getCommandPath(
      ApplicabilityContext context, InkChoicePointer pointer) {
    return pointer.choice.commandPath;
  }

  @override
  String getCommandSentence(
      ApplicabilityContext context, InkChoicePointer pointer) {
    // Ink choices are generally constructed in a way that the whole
    // [commandPath] joins into an English sentence.
    final sentence =
        getCommandPath(context, pointer).join(' ').replaceAll(_whitespace, ' ');
    return sentence;
  }

  @override
  String? getHelpMessage(
      ApplicabilityContext context, InkChoicePointer pointer) {
    return pointer.choice.helpMessage;
  }

  @override
  String? getRollReason(
      Actor a, Simulation sim, WorldState w, InkChoicePointer pointer) {
    return null;
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, InkChoicePointer pointer) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, InkChoicePointer pointer) {
    if (pointer.choice.isApplicable == null) return true;
    return pointer.choice.isApplicable!(c);
  }

  /// Walks the [ast] until the next interactive point ([InkForkNode])
  /// or until the end of the ink situation.
  ///
  /// Returns `null` if the ink situation walked to the end (i.e. there is
  /// no more content in [ast]).
  ///
  /// Otherwise, returns the pointer to the fork at which the situation
  /// stopped for now, waiting for user input.
  static List<int>? _walkUntilFork(
      InkAst ast, List<int> startingPath, ActionContext context) {
    List<int>? path = List<int>.from(startingPath);

    // ignore: literal_only_boolean_expressions
    while (true) {
      final node = ast.getNodeAt(path!);

      if (node == ast) {
        // We're at the end of the AST.
        path = null;
        break;
      }

      if (node is InkParagraphNode) {
        /// Use the node's callback so it can write its contents.
        node.writer(context);
        path = ast.getNextPosition(path);
      } else if (node is InkForkNode) {
        // We're at a decision point. Time to stop walking.
        break;
      }
    }

    return path;
  }
}

class InkImplicitWalk extends Action<Nothing?> {
  static const className = 'InkImplicitWalk';

  static const InkImplicitWalk singleton = InkImplicitWalk();

  const InkImplicitWalk();

  @override
  List<String> get commandPathTemplate => ['Continue'];

  @override
  String? get helpMessage => null;

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => true;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource? get rerollResource => null;

  @override
  String applyFailure(ActionContext context, Nothing? _) {
    throw StateError('InkImplicitWalk cannot fail');
  }

  @override
  String applySuccess(ActionContext context, Nothing? _) {
    final inkSituation =
        context.world.getSituationByName<InkSituation>(InkSituation.className);
    final InkAst ast = context.simulation.getInkByName(inkSituation.inkAstName);

    final currentPath = List<int>.from(inkSituation.currentPath);
    final currentNode = ast.getNodeAt(currentPath);
    assert(currentNode is! InkForkNode);

    // Perform the walk, until end of AST or next fork.
    final end = InkChoose._walkUntilFork(ast, currentPath, context);

    if (end == null) {
      // We have finished. Pop the [InkSituation].
      context.outputWorld.popSituation(context);
    } else {
      context.outputWorld.replaceSituationById<InkSituation>(inkSituation.id,
          inkSituation.rebuild((b) => b.currentPath.replace(end)));
    }
    return "InkSituation implicitly went ahead";
  }

  @override
  String? getRollReason(Actor a, Simulation sim, WorldState w, Nothing? _) {
    return null;
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Nothing? _) {
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(ApplicabilityContext context, Actor a, Simulation sim,
      WorldState w, Nothing? _) {
    final inkSituation =
        context.world.getSituationByName<InkSituation>(InkSituation.className);
    final InkAst ast = context.simulation.getInkByName(inkSituation.inkAstName);

    final currentNode = ast.getNodeAt(inkSituation.currentPath);

    // This is applicable only if the current node is _not_ a fork.ss
    return currentNode is! InkForkNode;
  }
}
