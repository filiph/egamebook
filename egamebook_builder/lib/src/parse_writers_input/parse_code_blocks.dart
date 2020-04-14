import 'dart:collection';

import 'package:code_builder/code_builder.dart';
import 'package:egamebook_builder/src/parse_writers_input/if_block.dart';
import 'package:meta/meta.dart' hide literal;

import 'escape_writers_text.dart';
import 'method_builders.dart';
import 'parameters.dart';
import 'types.dart';

/// The keyword to end a [BlockType.code] block and start a [BlockType.text]
/// block.
final RegExp codeCloseTag = RegExp(r"^\s*\[\[ENDCODE\]\]\s*$");

/// The keyword to start a [BlockType.code] block.
final RegExp codeOpenTag = RegExp(r"^\s*\[\[CODE\]\]\s*$");

/// The keyword to open a new [BlockType.sequence] block as a consequence
/// of a [BlockType.rule] parent block.
final RegExp ruleCloseTag = RegExp(r"^\s*\[\[ENDRULE\]\]\s*$");

/// The keyword to open a new [BlockType.rule] block
/// (with a [BlockType.ruleCondition] sub-block).
final RegExp ruleOpenTag = RegExp(r"^\s*\[\[RULE\]\]\s*$");

/// The keyword to end a [BlockType.ruleset] block.
final RegExp rulesetCloseTag = RegExp(r"^\s*\[\[ENDRULESET\]\]\s*$");

/// The keyword to start a [BlockType.ruleset] block.
final RegExp rulesetOpenTag = RegExp(r"^\s*\[\[RULESET\]\]\s*$");

/// The keyword to open a new [BlockType.sequence] block as a consequence
/// of a [BlockType.rule] parent block.
final RegExp ruleThenTag = RegExp(r"^\s*\[\[THEN\]\]\s*$");

final RegExp _logicalAndPattern = RegExp(r"\s+&&\s+");

final RegExp _whiteSpaceOnly = RegExp(r"^\s*$");

/// Parses a block of text (containing a `[[CODE]]` block or not) and returns
/// an iterable of statements.
Iterable<Code> createDescriptionStatements(String text) sync* {
  if (text.trim().isEmpty) return;

  // Define we substitutions if needed.
  if (text.contains(weSubstitution)) {
    yield Code(r"final weSubstitution = "
        r"getWeOrI(a, sim, originalWorld, capitalized: false);");
  }
  if (text.contains(weSubstitutionCapitalized)) {
    yield Code(r"final weSubstitutionCapitalized = "
        r"getWeOrI(a, sim, originalWorld, capitalized: true);");
  }

  // Define if-block substitutions if needed.
  final ifBlocks = IfBlock.parse(text).toList(growable: false);
  for (final block in ifBlocks) {
    final body = escapeWritersText(block.body);
    final elseBody = escapeWritersText(block.elseBody);
    yield Code("final ${block.identifier} = "
        "${block.condition} ? \'\'\'$body\'\'\' : \'\'\'$elseBody\'\'\';");
  }

  final root = parseBlocks(text ?? '');
  final visitor = SequenceBlockVisitor(ifBlocks);
  root.accept(visitor);
  yield* visitor.statements;
}

int getSpecificity(String conditionCode) {
  if (conditionCode == r"$DEFAULT") return 0;
  return _logicalAndPattern.allMatches(conditionCode).length + 1;
}

/// Parses a block of text (with `\n` newlines) and returns a list of block,
/// alternating between code and text.
Block parseBlocks(String text) {
  return _parseSequence(text);
}

/// Takes a list of lines and returns the top-most blocks with given
/// [openTag] and [closeTag]. The tags are included by default.
Iterable<List<String>> _getBlockContents(
    List<String> lines, RegExp openTag, RegExp closeTag,
    {bool includeTags = true}) sync* {
  int depth = 0;
  int start;
  int end;
  for (int i = 0; i < lines.length; i++) {
    final line = lines[i];
    if (openTag.hasMatch(line)) {
      depth += 1;
      if (depth == 1) {
        if (includeTags) {
          start = i;
        } else {
          start = i + 1;
        }
      }
      continue;
    }
    if (closeTag.hasMatch(line)) {
      depth -= 1;
      if (depth == 0) {
        if (includeTags) {
          end = i + 1;
        } else {
          end = i;
        }
        yield lines.getRange(start, end).toList(growable: false);
        continue;
      }
    }
  }
  if (depth != 0) {
    throw FormatException("Unclosed $openTag tag in: ${lines.join('\n')}");
  }
}

bool _isNotEmpty(String string) => !_whiteSpaceOnly.hasMatch(string);

Block _parseRule(String text) {
  final lines = text.split('\n');

  final conditionText =
      lines.skip(1).takeWhile((line) => !ruleThenTag.hasMatch(line)).join("\n");
  final Block condition = Block(BlockType.ruleCondition, conditionText);
  final consequenceBlocks =
      _getBlockContents(lines, ruleThenTag, ruleCloseTag, includeTags: false)
          .toList();
  assert(consequenceBlocks.length == 1);
  final consequenceText = consequenceBlocks.single.join("\n");

  final Block consequence = _parseSequence(consequenceText);

  return Block(BlockType.rule, text, children: [condition, consequence]);
}

Block _parseRuleset(String text) {
  final rules = <Block>[];

  final lines = text.split('\n');
  for (final ruleLines in _getBlockContents(lines, ruleOpenTag, ruleCloseTag)) {
    rules.add(_parseRule(ruleLines.join('\n')));
  }

  return Block(BlockType.ruleset, text, children: rules);
}

Block _parseSequence(String text) {
  final children = <Block>[];
  final typeStack = Queue<BlockType>();
  typeStack.add(BlockType.text);
  final currentContent = StringBuffer();
  int lineNumber = -1;
  for (var line in text.split('\n')) {
    lineNumber += 1;
    if (codeOpenTag.hasMatch(line)) {
      if (typeStack.last == BlockType.code) {
        throw FormatException("A [[CODE]] open tag found in a code block. "
            "Cannot make a code block inside a code block.\n"
            "lineNumber: $lineNumber\n"
            "$text");
      }
      if (typeStack.last == BlockType.ruleset) {
        // Ignore code blocks inside rulesets, they will be parsed
        // [_parseRuleset].
        currentContent.writeln(line);
        continue;
      }
      final currentText = currentContent.toString();
      if (_isNotEmpty(currentText)) {
        children.add(Block.textContent(currentText));
      }
      currentContent.clear();
      typeStack.add(BlockType.code);
      continue;
    } else if (codeCloseTag.hasMatch(line)) {
      if (typeStack.last == BlockType.text) {
        throw FormatException("An [[ENDCODE]] close tag found in a text "
            "block. Cannot exit a code block when there is none.\n"
            "lineNumber: $lineNumber\n"
            "$text");
      }
      if (typeStack.last == BlockType.ruleset) {
        // Ignore code blocks inside rulesets, they will be parsed
        // [_parseRuleset].
        currentContent.writeln(line);
        continue;
      }
      children.add(Block(BlockType.code, currentContent.toString()));
      currentContent.clear();
      typeStack.removeLast();
      continue;
    } else if (rulesetOpenTag.hasMatch(line)) {
      if (typeStack.contains(BlockType.ruleset)) {
        // This is a ruleset inside a ruleset.
        typeStack.add(BlockType.ruleset);
        currentContent.writeln(line);
        continue;
      }

      if (typeStack.last != BlockType.text) {
        throw FormatException("A RULESET was found in a code block. "
            "Rulesets must be always in a text block.\n"
            "lineNumber: $lineNumber\n"
            "$text");
      }

      final currentText = currentContent.toString();
      if (_isNotEmpty(currentText)) {
        children.add(Block.textContent(currentText));
      }
      currentContent.clear();
      typeStack.removeLast();
      typeStack.add(BlockType.ruleset);
      continue;
    } else if (rulesetCloseTag.hasMatch(line)) {
      if (typeStack.last != BlockType.ruleset) {
        throw FormatException("An ENDRULESET tag was found in a block "
            "that isn't a ruleset.\n"
            "lineNumber: $lineNumber\n"
            "typeStack: $typeStack\n"
            "$text");
      }

      currentContent.writeln(line);
      typeStack.removeLast();

      // ignore: invariant_booleans
      if (typeStack.isNotEmpty && typeStack.last == BlockType.ruleset) {
        // Still inside a ruleset. Continue.
        continue;
      }

      children.add(_parseRuleset(currentContent.toString()));
      currentContent.clear();
      typeStack.add(BlockType.text);
      continue;
    }
    currentContent.writeln(line);
  }
  if (typeStack.last == BlockType.code) {
    throw FormatException("Unclosed [[CODE]] tag.\n"
        "$text");
  }
  final currentText = currentContent.toString();
  if (_isNotEmpty(currentText)) {
    children.add(Block.textContent(currentText));
  }

  return Block(BlockType.sequence, text, children: children);
}

/// Value type for blocks of text. Writer's input supports including `[[CODE]]`
/// blocks.
@immutable
class Block {
  /// The type of the content: either text or code.
  final BlockType type;

  /// The actual text as written by author.
  final String content;

  final List<Block> children;

  const Block(this.type, this.content, {this.children = const []});

  factory Block.textContent(String content) {
    final sanitized = content.trim() == r"$NONE" ? "" : content;

    return Block(BlockType.text, sanitized);
  }

  void accept(SequenceBlockVisitor visitor) {
    visitor.visit(this);
  }
}

/// Type of the block.
enum BlockType {
  /// A sequence of blocks of [text], [code] and [ruleset].
  sequence,

  /// Literal, static text. To be markdown-compiled and presented to user as is.
  text,

  /// Code block. To be parsed and copied to output via `package:code_builder`.
  code,

  /// The whole ruleset, from `- RULESET` to `- END RULESET`.
  ruleset,

  /// One rule in a ruleset. Contains a [ruleCondition] block and a [sequence]
  /// block.
  rule,

  /// The boolean expression that gates application of a [rule].
  ruleCondition,
}

/// Visits a [Block] of type [BlockType.sequence] and fills [_builder]
/// with generated code.
class SequenceBlockVisitor {
  final BlockBuilder _builder = BlockBuilder();

  /// The iterable if [IfBlock]s that are present in the text.
  final List<IfBlock> _ifBlocks;

  SequenceBlockVisitor(this._ifBlocks);

  Iterable<Code> get statements => _builder.build().statements;

  void visit(Block block) {
    // A leaf node (block with no children).
    switch (block.type) {
      case BlockType.sequence:
        // A block with sub-blocks. Let's process them in sequence.
        for (final child in block.children) {
          visit(child);
        }
        break;
      case BlockType.text:
        _builder.addExpression(refer(storylineParameter.name)
            .property("add")
            .call([literal(escapeWritersText(block.content, _ifBlocks))],
                {"isRaw": literalTrue}));
        break;
      case BlockType.code:
        _builder.statements.add(Code(block.content));
        break;
      case BlockType.ruleset:
        _builder.addExpression(_visitRuleset(block));
        break;
      case BlockType.rule:
      case BlockType.ruleCondition:
        throw StateError("Block $block should be processed in visitRuleset");
    }
  }

  _ParsedRule _visitRule(Block rule) {
    assert(rule.type == BlockType.rule);
    assert(
        rule.children.length == 2,
        "Every rule must have a condition (prerequisite) "
        "and a consequence.");
    final int hashCode = rule.content.hashCode;
    String conditionCode = rule.children.first.content.trim();
    bool onlyOnce = false;
    if (conditionCode.startsWith("onlyOnce &&")) {
      onlyOnce = true;
      conditionCode = conditionCode.replaceFirst("onlyOnce &&", "");
    }
    final specificity = getSpecificity(conditionCode);
    if (specificity == 0) {
      // We can use 'default' as a condition to have a kind of
      // a switch-statement-like default rule.
      conditionCode = "true";
    }

    final isApplicable = createApplicabilityContextMethod()
      ..block.statements.add(Code('return $conditionCode;'));

    final consequenceVisitor = SequenceBlockVisitor(_ifBlocks);
    rule.children.last.accept(consequenceVisitor);

    final applyClosure = createActionContextMethod()
      ..block.statements.addAll(consequenceVisitor.statements);

    final instanceBuilder = ruleType.newInstance([
      literal(hashCode),
      literal(specificity),
      literal(onlyOnce),
      isApplicable.bakeAsClosure(),
      applyClosure.bakeAsClosure(),
    ]);
    return _ParsedRule(specificity, instanceBuilder);
  }

  Expression _visitRuleset(Block ruleset) {
    //     new Ruleset(
    //       new Rule(42, 1, true, (c) => a.isPlayer,
    //           (c) => outcome = 42),
    //       new Rule(43, 2, false, (c) => a.isPlayer && a.name == "Aren",
    //           (c) => outcome = 43),
    //       new Rule(44, 0, false, (c) => true,
    //           (c) => outcome = 44),
    //     ).apply(context);
    assert(ruleset.type == BlockType.ruleset);
    final parsedRules =
        ruleset.children.map<_ParsedRule>(_visitRule).toList(growable: false);
    parsedRules.sort();
    final Expression rulesetConstructor = rulesetType
        .newInstance(parsedRules.map((rule) => rule.instanceBuilder));
    return rulesetConstructor.property('apply').call([refer("c")]);
  }
}

/// The rule as it is parsed and generated, with the added information
/// of [specificity]. This class implements [Comparable], which allows to
/// easily sort rules according from most specific to least specific.
class _ParsedRule implements Comparable<_ParsedRule> {
  final int specificity;

  final Expression instanceBuilder;

  _ParsedRule(this.specificity, this.instanceBuilder);

  @override
  int compareTo(_ParsedRule other) => -specificity.compareTo(other.specificity);
}
