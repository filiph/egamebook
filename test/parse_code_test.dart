import '../tool/src/parse_writers_input/parse_code_blocks.dart';
import 'package:test/test.dart';

void main() {
  test("only text block", () {
    var text = r"""
    Lorem ipsum dolor sit amet.
    Dolorem ipsum.

    And so on.
    """;

    var result = parseBlocks(text);
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

    var result = parseBlocks(text);
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

    var result = parseBlocks(text);
    expect(result.length, 1);
    expect(result.single.type, BlockType.text);
    expect(result.single.content.trim(), isEmpty);
  });
}
