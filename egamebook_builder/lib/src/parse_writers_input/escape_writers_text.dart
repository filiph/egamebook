import 'package:logging/logging.dart';

final Logger _log = new Logger("escape_dollar_sign");

/// Escape writer's string to be used in code.
///
/// Removes `$` and replaces newlines with `\n`.
String escapeWritersText(String s) {
  if (s.contains(r'$')) {
    _log.warning("String contains a dollar sign: '''$s'''");
  }
  return s
      .replaceAll(r'$', r"(DOLLAR_SIGN)")
      .replaceAll('\n', r'\n')
      .replaceAll('\r', '');
}
