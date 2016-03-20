library author_script_exception;

/**
 * Wraps around exceptions that are generated inside author's scripts. These
 * are caught and exported.
 */
class AuthorScriptException implements Exception {
  /// Message describing the exception.
  final String message;

  /// Page name that is being read.
  final String pageName;

  /// The position in the page's blocks list.
  final int blockIndex;

  /// Creates new AuthorScriptException with error [message]. Attributes [pageName]
  /// and [blockIndex] are set to null.
  const AuthorScriptException(this.message)
      : pageName = null,
        blockIndex = null;

  /// Creates new AuthorScriptException with error [message], actual [pageName],
  /// and position in the page's blocks list stored in [blockIndex].
  const AuthorScriptException.withPageName(
      this.message, this.pageName, this.blockIndex);

  /// Returns text describing AuthorScriptException with its [message], [pageName]
  /// and [blockIndex] where the exception appeared.
  String toString() => "AuthorScriptException at page '$pageName', "
      "block #$blockIndex: $message";
}
