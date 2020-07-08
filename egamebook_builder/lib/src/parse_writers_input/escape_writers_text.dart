import 'package:egamebook_builder/src/parse_writers_input/if_block.dart';
import 'package:logging/logging.dart';

final Pattern sirSubstitution = "[sir]";

final Pattern sirSubstitutionCapitalized = "[Sir]";

final Pattern weSubstitution = "[we]";

final Pattern weSubstitutionCapitalized = "[We]";

final Pattern youngSirSubstitution = "[young sir]";

final Pattern youngSirSubstitutionCapitalized = "[Young sir]";

final Logger _log = Logger("escape_writers_text");

final RegExp _multipleSpaces = RegExp(r'\s+');

/// Escape writer's string to be used in code.
///
/// * Substitutes strings such as `[[We]]`.
/// * Applies [ifBlocks].
/// * Warns about `$`.
/// * Replaces newlines with `\n`.
String escapeWritersText(String s, [List<IfBlock> ifBlocks = const []]) {
  String result = s;
  for (final block in ifBlocks) {
    result = result.replaceFirst(block.fullString, "\$${block.identifier}");
  }

  if (r"$".allMatches(result).length >
      "\$${IfBlock.identifierStart}".allMatches(result).length) {
    // There is more "$" than $ifBlock_xyz account for.
    _log.warning("String contains a dollar sign: '''$s'''");
    result = result.replaceAll(r'$', r"(DOLLAR_SIGN)");
  }

  result = result.replaceAll(weSubstitution, r'$weSubstitution');
  result = result.replaceAll(
      weSubstitutionCapitalized, r'$weSubstitutionCapitalized');

  return result
      // TODO: Actually change the substitutions according to player gender.
      .replaceAll(sirSubstitution, r'sir')
      .replaceAll(sirSubstitutionCapitalized, r'Sir')
      // TODO: standing: child, young sir/lady, sir/lady, sir/lady Aren
      .replaceAll(youngSirSubstitution, r'young sir')
      .replaceAll(youngSirSubstitutionCapitalized, r'Young sir')
      .replaceAll('\n', r'\n')
      .replaceAll('\r', '')
      .replaceAll(_multipleSpaces, ' ');
}
