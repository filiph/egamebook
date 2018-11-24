import 'package:edgehead/egamebook/elements/choice_block_element.dart';
import 'package:edgehead/egamebook/elements/choice_element.dart';
import 'package:edgehead/egamebook/elements/choice_tree.dart';
import 'package:edgehead/egamebook/elements/save_element.dart';
import 'package:test/test.dart';

void main() {
  final emptySaveGame = SaveGameBuilder()..saveGameSerialized = '';

  test("generates no groups when no >> choices", () {
    final choice1 = Choice((b) => b
      ..markdownText = 'Slap him with a trout'
      ..isImplicit = false);
    final choice2 = Choice((b) => b
      ..markdownText = 'Slap him with a leaf'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice1,
            choice2,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(tree.root.choices, unorderedMatches(<Choice>[choice1, choice2]));
    expect(tree.root.groups, isEmpty);
  });

  test("generates simple tree with two >> choices", () {
    final choice1 = Choice((b) => b
      ..markdownText = 'Slap him >> with a trout'
      ..isImplicit = false);
    final choice2 = Choice((b) => b
      ..markdownText = 'Slap him >> with a leaf'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice1,
            choice2,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(tree.root.choices, isEmpty);
    expect(tree.root.groups, hasLength(1));
    expect(tree.root.groups.single.groups, isEmpty);
    expect(tree.root.groups.single.choices, hasLength(2));
  });

  test("generates tree with choices of order of 2 (have two >>)", () {
    final choice1 = Choice((b) => b
      ..markdownText = 'Attack goblin >> by slapping him >> with a trout'
      ..isImplicit = false);
    final choice2 = Choice((b) => b
      ..markdownText = 'Attack goblin >> by slapping him >> with a leaf'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice1,
            choice2,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(tree.root.choices, isEmpty);
    expect(tree.root.groups, hasLength(1));
    expect(tree.root.groups.single.choices, isEmpty);
    expect(tree.root.groups.single.groups, hasLength(1));
    expect(tree.root.groups.single.groups.single.choices,
        unorderedMatches(<Choice>[choice1, choice2]));
  });

  test("generates a level for each >>", () {
    final choice1 = Choice((b) => b
      ..markdownText = 'Kick >> goblin >> to the groin'
      ..isImplicit = false);
    final choice2 = Choice((b) => b
      ..markdownText = 'Punch >> goblin >> in the face'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice1,
            choice2,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(tree.root.choices, isEmpty);
    expect(tree.root.groups, hasLength(2));
    expect(tree.root.groups.first.choices, isEmpty);
    expect(tree.root.groups.first.groups, hasLength(1));
    expect(tree.root.groups.first.groups.single.choices,
        unorderedMatches(<Choice>[choice1]));
    expect(tree.root.groups.last.choices, isEmpty);
    expect(tree.root.groups.last.groups, hasLength(1));
    expect(tree.root.groups.last.groups.single.choices,
        unorderedMatches(<Choice>[choice2]));
  });

  test("generates tree with one choices when there's one choice", () {
    final choice1 = Choice((b) => b
      ..markdownText = 'End game'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice1,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(tree.root.choices, unorderedMatches(<Choice>[choice1]));
    expect(tree.root.groups, isEmpty);
  });

  test("root node has correct order (0)", () {
    final choice1 = Choice((b) => b
      ..markdownText = 'Attack goblin >> by slapping him >> with a trout'
      ..isImplicit = false);
    final choice2 = Choice((b) => b
      ..markdownText = 'Attack goblin >> by slapping him >> with a leaf'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice1,
            choice2,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(tree.root.order, equals(0));
  });

  test("do not show `>>` in UI", () {
    final choice = Choice((b) => b
      ..markdownText = 'Kick >> the dagger >> out of reach.'
      ..isImplicit = false);

    final choiceBlock = (ChoiceBlockBuilder()
          ..choices.addAll([
            choice,
          ])
          ..saveGame = emptySaveGame)
        .build();

    final tree = ChoiceTree(choiceBlock);

    expect(
        ChoiceTree.getChoiceTextAtNode(
            'Kick >> the dagger >> out of reach.', tree.root),
        isNot(contains('>>')));
  });
}
