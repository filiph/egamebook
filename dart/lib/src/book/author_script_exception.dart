library author_script_exception;

/**
 * Wraps around exceptions that are generated inside author's scripts. These
 * are caught and exported.
 */
class AuthorScriptException implements Exception {
  final String message;
  const AuthorScriptException(this.message);
  String toString() => "AuthorScriptException: $message";
}