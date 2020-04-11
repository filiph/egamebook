/// Parses a block of text (with `\n` newlines) and returns the code for
/// the [InkAst].
String parseInk(String name, String text) {
  final buf = StringBuffer();
  buf.writeln('final $name = InkAst([');

  int depth = 0;
  bool previousWasParagraph = false;

  final lines = text.split('\n').toList(growable: false);
  for (final line in lines) {
    if (line.trim().isEmpty) continue;

    final choiceLevel = _getChoiceLevel(line);
    if (choiceLevel > 0) {
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
        depth = choiceLevel;
      } else {
        // The fork continues with another choice.
        assert(choiceLevel == depth);
        // Close the last one.
        buf.writeln('],),');
        // Start the new one.
        buf.writeln('InkChoiceNode(');
        buf.writeln('  command: r""" ${_sanitizeCommand(line)} """.trim(),');
        buf.writeln('  consequence: [');
      }
      previousWasParagraph = false;
      continue;
    }

    final weaveLevel = _getWeaveLevel(line);
    if (weaveLevel != null) {
      // There's a weave here.
      for (var i = 0; i < depth - choiceLevel; i++) {
        // Close the last choice first.
        buf.writeln('],),');
        // Close the fork.
        buf.writeln(']),');
      }
      depth = weaveLevel;
      previousWasParagraph = false;
      continue;
    }

    // Normal paragraph.
    if (previousWasParagraph) {
      buf.writeln('InkParagraphNode((c) => '
          'c.outputStoryline.addParagraph()), ');
    }
    // TODO: use describer here.
    buf.writeln('InkParagraphNode((c) => '
        'c.outputStoryline.add(""" $line """.trim(), wholeSentence: true)), ');
    previousWasParagraph = true;
  }

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

final _whitespaceOrStar = RegExp(r'^[\s\*]+');

final _weave = RegExp(r'^[\s\-]$');

/// Returns the choice level.
///
/// For example, "* * Open door" will return `2`.
int _getChoiceLevel(String line) {
  if (!_whitespaceOrStar.hasMatch(line)) return 0;
  final prefix = _whitespaceOrStar.stringMatch(line);
  return '*'.allMatches(prefix).length;
}

/// Returns the level to which a weave will bring down the depth.
///
/// For example, '-' will bring the depth to 0. '---' will bring the weave
/// to 2.
///
/// Returns `null` for anything else.
int _getWeaveLevel(String line) {
  if (!_weave.hasMatch(line)) return null;
  return '-'.allMatches(line).length - 1;
}

/// Sanitizes a line, such as "* * Open the door" --> "Open the door".
String _sanitizeCommand(String line) {
  return line.replaceFirst(_whitespaceOrStar, '').trim();
}
