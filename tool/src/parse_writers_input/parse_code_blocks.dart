import 'package:code_builder/code_builder.dart';
import 'package:meta/meta.dart' hide literal;

import 'escape_dollar_sign.dart';
import 'parameters.dart';

/// The keyword to end a [BlockType.code] block and start a [BlockType.text]
/// block.
const String codeCloseTag = "[[/CODE]]";

/// The keyword to start a [BlockType.code] block.
const String codeOpenTag = "[[CODE]]";

/// Parses a block of text (containing a `[[CODE]]` block or not) and returns
/// an iterable of statements.
Iterable<StatementBuilder> createDescriptionStatements(String text) sync* {
  for (var block in parseBlocks(text ?? '')) {
    switch (block.type) {
      case BlockType.text:
        yield (reference(storylineParameter.name).property("add").call(
            [literal(escapeDollarSign(block.content))],
            namedArguments: {"wholeSentence": literal(true)}));
        break;
      case BlockType.code:
        yield (new StatementBuilder.raw((_) => block.content));
        break;
    }
  }
}

/// Parses a block of text (with `\n` newlines) and returns a list of block,
/// alternating between code and text.
List<Block> parseBlocks(String text) {
  final result = <Block>[];
  var currentType = BlockType.text;
  final currentContent = new StringBuffer();
  for (var line in text.split('\n')) {
    if (line.trim() == codeOpenTag) {
      if (currentType == BlockType.code) {
        throw new FormatException("A [[CODE]] open tag found in a code block. "
            "Cannot make a code block inside a code block.\n"
            "$text");
      }
      result.add(new Block(BlockType.text, currentContent.toString()));
      currentContent.clear();
      currentType = BlockType.code;
      continue;
    } else if (line.trim() == codeCloseTag) {
      if (currentType == BlockType.text) {
        throw new FormatException("A [[/CODE]] close tag found in a text "
            "block. Cannot exit a code block when there is none.\n"
            "$text");
      }
      result.add(new Block(BlockType.code, currentContent.toString()));
      currentContent.clear();
      currentType = BlockType.text;
      continue;
    }
    currentContent.writeln(line);
  }
  if (currentType == BlockType.code) {
    throw new FormatException("Unclosed [[CODE]] tag.\n"
        "$text");
  }
  result.add(new Block(BlockType.text, currentContent.toString()));
  return result;
}

/// Value type for blocks of text. Writer's input supports including `[[CODE]]`
/// blocks.
@immutable
class Block {
  /// The type of the content: either text or code.
  final BlockType type;

  /// The actual text as written by author.
  final String content;

  const Block(this.type, this.content);
}

/// Type of the block.
enum BlockType {
  /// Literal, static text. To be markdown-compiled and presented to user as is.
  text,

  /// Code block. To be parsed and copied to output via `package:code_builder`.
  code
}
