import 'package:recase/recase.dart';

ReCase reCase(String string) {
  assert(string.startsWith(r'$'), "Identifier $string doesn't start with \$.");
  return new ReCase(string.substring(1));
}