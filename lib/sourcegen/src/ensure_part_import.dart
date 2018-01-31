import 'package:source_gen/source_gen.dart';

void ensurePartImport(LibraryReader library, String fileName) {
  final source = library.element.source.contents.data;
  if (!source.contains("part '$fileName.g.dart';")) {
    throw new InvalidGenerationSourceError(
        "${library.element.source.fullName} lacks part directive: "
            "part '$fileName.g.dart';");
  }
}
