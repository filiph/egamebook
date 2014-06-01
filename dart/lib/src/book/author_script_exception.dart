library author_script_exception;

/**
 * Wraps around exceptions that are generated inside author's scripts. These
 * are caught and exported.
 */
class AuthorScriptException implements Exception {
  final String message;
  final String pagename;
  final int blockIndex;
  const AuthorScriptException(this.message) : pagename = null, blockIndex = null;
  const AuthorScriptException.withPageName(this.message, this.pagename, this.blockIndex);
  String toString() => "AuthorScriptException at page '$pagename', "
      "block #$blockIndex: $message";
}