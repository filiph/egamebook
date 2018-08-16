import 'package:code_builder/code_builder.dart';

/// Adds [writersStatements] as-is to the [block] body.
///
/// The author is responsible for [writersStatements] to be valid Dart code.
/// This method does not validate the code statically.
void addStatements(String writersStatements, BlockBuilder block) {
  final code = Code(writersStatements);
  block.statements.add(code);
}
