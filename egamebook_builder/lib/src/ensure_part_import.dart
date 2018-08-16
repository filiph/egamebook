import 'package:source_gen/source_gen.dart';

void ensurePartImport(LibraryReader library, String fileName,
    {String extension: '.g.dart'}) {
  final source = library.element.source.contents.data;
  if (!source.contains("part '$fileName$extension';")) {
    throw new InvalidGenerationSourceError(
        "${library.element.source.fullName} lacks part directive: "
        "part '$fileName$extension';");
  }
}
