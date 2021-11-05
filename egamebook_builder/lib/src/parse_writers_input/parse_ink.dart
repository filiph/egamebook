import 'package:code_builder/code_builder.dart';
import 'package:egamebook_builder/src/parse_writers_input/describer.dart';
import 'package:egamebook_builder/src/parse_writers_input/parse_code_blocks.dart';

final _dartEmitter = DartEmitter();

final _gather = RegExp(r'^\s*\-[\s\-]*$');

final _whitespaceOrStar = RegExp(r'^[\s\*]+');

/// Parses a block of text (with `\n` newlines) and returns the code for
/// the [InkAst].
///
/// The format of Ink in Egamebook is very limited. It supports the
/// ["weave" format](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#part-2-weave)
/// with gathers (must be on their own line) and nested flows.
String parseInk(String name, String text) {
  final buf = StringBuffer();
  buf.writeln('final $name = InkAst([');

  int depth = 0;

  /// This is `true` if the previous node was a paragraph, and so if the next
  /// node is also a paragraph, we should add newlines
  /// (via `Storyline.addParagraph()`).
  bool previousWasParagraph = false;

  /// This is `true` if the previous paragraph ended with `<>`, which is
  /// a special instruction in Ink. It tells the system to join the
  /// two paragraphs into one.
  bool previousParagraphHadGlue = false;

  final List<String> currentParagraphLines = [];

  void addToParagraph(String line) {
    currentParagraphLines.add(line);
  }

  void addParagraphBreak() {
    if (currentParagraphLines.isEmpty) return;
    currentParagraphLines.add('[PARAGRAPH_BREAK]');
  }

  /// Take [currentParagraphLines] and make them into a paragraph.
  /// This is here because we want to use [createDescriber] on the full
  /// text and not just one line. So we accumulate lines until we know there
  /// will be no more (e.g. we reached a choice, or end of file),
  /// and then put them all together.
  void finalizeParagraph() {
    if (currentParagraphLines.isEmpty) return;
    if (currentParagraphLines.every((line) => line.isEmpty)) return;

    // Take [currentParagraphLines] and split the text by the magic
    // "[PARAGRAPH_BREAK]" keyword.
    final fullParagraphs = currentParagraphLines
        .map((line) => line.trim())
        .join('\n')
        .split('[PARAGRAPH_BREAK]')
        .where((line) => line.trim().isNotEmpty);

    for (final fullParagraph in fullParagraphs) {
      final paragraph = _ParagraphText(fullParagraph.trim());
      final isCodeParagraph = fullParagraph.contains('[[CODE]]');

      // Create a new paragraph unless the previous paragraph ended
      // with glue.
      // This applies even for code paragraphs that follow a normal paragraph.
      if (!previousParagraphHadGlue && previousWasParagraph) {
        assert(
            !paragraph.hasStartingGlue,
            "Previous paragraph didn't have glue "
            "but this one does: $fullParagraph");
        // Add newlines between paragraphs.
        buf.writeln('InkParagraphNode((c) => '
            'c.outputStoryline.addParagraph()), ');
      }

      final describer = createDescriber(paragraph.line);
      final describerCode = describer.accept(_dartEmitter).toString();

      buf.writeln('InkParagraphNode($describerCode), ');

      previousWasParagraph = !isCodeParagraph;
      previousParagraphHadGlue = paragraph.hasEndingGlue;
    }
    currentParagraphLines.clear();
  }

  /// The depth of [RULESET]. Zero means we are not in a ruleset.
  /// One means we are in one ruleset. Two means we are in a ruleset
  /// that is itself wrapped in another ruleset.
  var rulesetLevel = 0;

  final lines = text.split('\n');
  for (final line in lines) {
    // First, make sure we deal with rulesets, so that it's okay to
    // have a ruleset with a blank line in it.
    if (rulesetOpenTag.hasMatch(line)) {
      rulesetLevel += 1;
    }

    if (rulesetLevel > 0) {
      if (rulesetCloseTag.hasMatch(line)) {
        rulesetLevel -= 1;
      }

      addToParagraph(line);
      continue;
    }

    if (line.trim().isEmpty) {
      addParagraphBreak();
      continue;
    }

    final choiceLevel = _getChoiceLevel(line);
    if (choiceLevel > 0) {
      // A choice.
      finalizeParagraph();
      if (choiceLevel > depth) {
        // A new fork.
        buf.writeln('InkForkNode([');
        // First choice.
        buf.writeln('InkChoiceNode(');
        buf.writeln('  command: r""" ${_sanitizeCommand(line)} """.trim(),');
        buf.writeln('  consequence: [');
        depth = choiceLevel;
      } else if (choiceLevel < depth) {
        // The fork ended.
        for (var i = 0; i < depth - choiceLevel; i++) {
          // Close the last choice first.
          buf.writeln('],),');
          // Close the fork.
          buf.writeln(']),');
        }
        // Close the previous choice on this level.
        buf.writeln('],),');
        // Start the next choice.
        buf.writeln('InkChoiceNode(');
        buf.writeln('  command: r""" ${_sanitizeCommand(line)} """.trim(),');
        buf.writeln('  consequence: [');
        depth = choiceLevel;
      } else {
        // The fork continues with another choice.
        assert(choiceLevel == depth);
        // Close the previous one.
        buf.writeln('],),');
        // Start the new one.
        buf.writeln('InkChoiceNode(');
        buf.writeln('  command: r""" ${_sanitizeCommand(line)} """.trim(),');
        buf.writeln('  consequence: [');
      }
      previousWasParagraph = false;
      continue;
    }

    final gatherLevel = _getGatherLevel(line);
    if (gatherLevel != null) {
      // There's a gather here.
      finalizeParagraph();
      for (var i = 0; i < depth - gatherLevel; i++) {
        // Close the last choice first.
        buf.writeln('],),');
        // Close the fork.
        buf.writeln(']),');
      }
      depth = gatherLevel;
      // We want to ensure that paragraphs after gather points are
      // new paragraphs.
      previousWasParagraph = true;
      continue;
    }

    // Normal paragraph.
    addToParagraph(line);
  }

  assert(rulesetLevel == 0, "Unbalanced [RULESET] tags: $rulesetLevel.");

  finalizeParagraph();

  // We're at the end, we need to get back to 0.
  for (var i = 0; i < depth; i++) {
    // Close the last choice first.
    buf.writeln('],),');
    // Close the fork.
    buf.writeln(']),');
  }

  buf.writeln(']);');
  return buf.toString();
}

/// Returns the choice level.
///
/// For example, "* * Open door" will return `2`.
int _getChoiceLevel(String line) {
  if (!_whitespaceOrStar.hasMatch(line)) return 0;
  final prefix = _whitespaceOrStar.stringMatch(line)!;
  return '*'.allMatches(prefix).length;
}

/// Returns the level to which a gather will bring down the depth.
///
/// For example, '-' will bring the depth to 0. '---' will bring the depth
/// to 2.
///
/// Returns `null` for anything else.
int? _getGatherLevel(String line) {
  if (!_gather.hasMatch(line)) return null;
  return '-'.allMatches(line).length - 1;
}

/// Sanitizes a line, such as "* * Open the door" --> "Open the door".
String _sanitizeCommand(String line) {
  return line.replaceFirst(_whitespaceOrStar, '').trim();
}

class _ParagraphText {
  static final _endingGlue = RegExp(r'\s*<>\s*$');

  static final _startingGlue = RegExp(r'^\s*<>\s+');

  final bool hasEndingGlue;

  final bool hasStartingGlue;

  final String line;

  _ParagraphText(String raw)
      : hasStartingGlue = _startingGlue.hasMatch(raw),
        hasEndingGlue = _endingGlue.hasMatch(raw),
        line = raw.replaceAll(_startingGlue, '').replaceAll(_endingGlue, '');
}
