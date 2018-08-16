import 'package:code_builder/code_builder.dart';

import 'method_builders.dart';
import 'parse_code_blocks.dart';

/// Creates a describer closure, such as `(ActionContext c) => ...`.
Expression createDescriber(String text) {
  if (text == null) return literal(null);
  var result = createActionContextMethod();
  result.block.statements.addAll(createDescriptionStatements(text));
  return result.bakeAsClosure();
}
