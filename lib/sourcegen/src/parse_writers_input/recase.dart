import 'package:edgehead/fractal_stories/shared_constants.dart';
import 'package:edgehead/sourcegen/src/recase/recase.dart' as rc;

ReCase reCase(String string) {
  assert(string.startsWith(r'$'), "Identifier $string doesn't start with \$.");
  return new ReCase(string.substring(1));
}

/// A modified [rc.ReCase] class that supports `__END_OF_ROAM__` as an
/// identifier.
class ReCase {
  String _camelCase;

  String _pascalCase;

  String _snakeCase;

  ReCase(String string) {
    if (string == endOfRoamName) {
      _camelCase = "endOfRoam";
      _pascalCase = "EndOfRoam";
      _snakeCase = endOfRoamName;
    } else {
      _setCases(new rc.ReCase(string));
    }
  }

  String get camelCase => _camelCase;

  String get pascalCase => _pascalCase;

  String get snakeCase => _snakeCase;

  void _setCases(rc.ReCase recase) {
    _camelCase = recase.camelCase;
    _pascalCase = recase.pascalCase;
    _snakeCase = recase.snakeCase;
  }
}
