library footnotes;

Map<String,String> _footnotes = new Map<String,String>();

void addFootnote(String name, String text) {
  _footnotes[name] = text;
}

/**
 * Renders the footnote.
 */
String fn(String name) {
  if (!_footnotes.containsKey(name)) {
    throw new ArgumentError("Footnote with name '$name' has not been defined.");
  }
  String escaped = _footnotes[name].replaceAll("\"", "&quot;");
  return "<sup title=\"$escaped\">?</sup>";
}