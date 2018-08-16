import 'package:egamebook_builder/src/parse_writers_input/parse_code_blocks.dart';
import 'package:test/test.dart';

void main() {
  test("only text block", () {
    var text = r"""
    Lorem ipsum dolor sit amet.
    Dolorem ipsum.

    And so on.
    """;

    var result = parseBlocks(text).children;
    expect(result.length, 1);
    expect(result.single.type, BlockType.text);
    expect(result.single.content.trim(), text.trim());
  });

  test("one code block", () {
    var text = r"""
    Lorem ipsum dolor sit amet.
    Dolorem ipsum.

    [[CODE]]
    if (true) {
      print(1);
    }
    [[/CODE]]

    And so on.
    """;

    var result = parseBlocks(text).children;
    expect(result.length, 3);
    expect(result.first.type, BlockType.text);
    expect(result[1].type, BlockType.code);
    expect(
        result[1].content.trim(),
        r"""
    if (true) {
      print(1);
    }
    """
            .trim());
    expect(result.last.type, BlockType.text);
  });

  test("malformed block", () {
    var text = r"""
    Lorem ipsum dolor sit amet.

    [[CODE]]
    if (true) {
      print(1);
    }[[/CODE]]

    And so on.
    """;

    expect(() => parseBlocks(text), throwsFormatException);
  });

  test("empty block", () {
    var text = '';

    var result = parseBlocks(text).children;
    expect(result, isEmpty);
  });

  test("block with ruleset only", () {
    var text = r"""
    - RULESET
    - RULE:
      currentRoom == orcthornRoom
    - THEN:
    Briana looks around, her eyes wide.
    - END RULE
    - RULE:
      currentRoom == slaveQuartersPassage
      !w.actorHasVisited(orcthornRoom)
    - THEN:
    Briana looks at the door, eyes wide.
    - END RULE
    - END RULESET
    """;

    var result = parseBlocks(text).children;
    expect(result.length, 1);
    var ruleset = result.single;
    expect(ruleset.type, BlockType.ruleset);
    expect(ruleset.children.length, 2);
    var firstRule = ruleset.children.first;
    var firstCondition = firstRule.children.first;
    expect(firstCondition.content.trim(), "currentRoom == orcthornRoom");
  });

  test("ruleset within a ruleset", () {
    var text = r"""
    - RULESET
    - RULE:
      currentRoom == orcthornRoom
    - THEN:
      - RULESET
      - RULE:
        currentRoom == slaveQuartersPassage
        !w.actorHasVisited(orcthornRoom)
      - THEN:
      Briana looks at the door, eyes wide.
      - END RULE
      - END RULESET
    - END RULE
    - END RULESET
    """;

    var result = parseBlocks(text).children;
    expect(result.length, 1);
    var ruleset = result.single;
    expect(ruleset.type, BlockType.ruleset);
    expect(ruleset.children.length, 1);
    var firstRule = ruleset.children.single;
    var firstCondition = firstRule.children.first;
    expect(firstCondition.content.trim(), "currentRoom == orcthornRoom");
    var firstConsequence = firstRule.children.last;
    expect(firstConsequence.children.single.type, BlockType.ruleset);
  });
}
