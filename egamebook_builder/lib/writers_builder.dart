import 'package:build/build.dart';
import 'package:egamebook_builder/src/generators/writers_input_generator.dart';
import 'package:source_gen/source_gen.dart';

/// Builder that wraps the [WritersInputGenerator] generator. It compiles
/// writer's text input into `.compiled.dart` Dart files.
Builder writersBuilder(BuilderOptions options) => LibraryBuilder(
      const WritersInputGenerator(),
      generatedExtension: '.compiled.dart',
    );

/// Used for annotating writer's input libraries.
class GatherWriterInputFrom {
  final List<String> globs;

  const GatherWriterInputFrom(this.globs);

  @override
  String toString() => "Contents of this library will be generated from "
      "text files in given glob. The glob is recursive, so you can provide"
      "just the top-level directory.";
}
