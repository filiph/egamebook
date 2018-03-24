import 'package:code_builder/code_builder.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input/method_builders.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input/parse_code_blocks.dart';

ExpressionBuilder createDescriber(String text) {
  if (text == null) return literal(null);
  var closure = createActionContextClosure();
  closure.addStatements(createDescriptionStatements(text));
  return closure;
}
