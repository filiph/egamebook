/// An inline if statement in the writer's prose.
///
/// Looks like `Hello [[IF something]]beautiful[[ENDIF]] world!
class IfBlock {
  static final RegExp _ifBlockEnd = RegExp(r"\[\[ENDIF\]\]");

  static final RegExp _ifBlockStart = RegExp(r"\[\[IF (.+)\]\]");

  static final RegExp _ifBlock =
      RegExp(r"\[\[IF (.+?)\]\](.+?)(\[\[ELSE\]\](.+?))?\[\[ENDIF\]\]");

  final String fullString;

  final String condition;

  final String body;

  final String elseBody;

  IfBlock(this.fullString, this.condition, this.body, this.elseBody);

  static const String identifierStart = "ifBlock";

  String get identifier => "${identifierStart}_${_id.toRadixString(16)}";

  int get _id => condition.hashCode + 31 * body.hashCode;

  static Iterable<IfBlock> parse(String text) sync* {
    assert(!text.contains(_ifBlockStart) || text.contains(_ifBlockEnd),
        "Text contains start of [[IF]] but not end: '$text'");
    for (final match in _ifBlock.allMatches(text)) {
      final elseBlock = match.group(4) ?? '';
      yield IfBlock(match.group(0), match.group(1), match.group(2), elseBlock);
    }
  }
}
