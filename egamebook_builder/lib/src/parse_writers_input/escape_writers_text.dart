import 'package:egamebook_builder/src/parse_writers_input/parse_code_blocks.dart';
import 'package:logging/logging.dart';

final Logger _log = Logger("escape_dollar_sign");

/// Escape writer's string to be used in code.
///
/// Removes `$` and replaces newlines with `\n`.
String escapeWritersText(String s) {
  if (s.contains(r'$')) {
    _log.warning("String contains a dollar sign: '''$s'''");
  }
  return s
      .replaceAll(r'$', r"(DOLLAR_SIGN)")
      .replaceAll(weSubstitution, r'$weSubstitution')
      .replaceAll(weSubstitutionCapitalized, r'$weSubstitutionCapitalized')
      .replaceAll('\n', r'\n')
      .replaceAll('\r', '');
}
