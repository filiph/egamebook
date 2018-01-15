import 'dart:async';

import 'package:analyzer/dart/element/element.dart';
import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';

/// Generator for FunctionSerializer.
class FunctionSerializerGenerator extends Generator {
  // Allow creating via `const` as well as enforces immutability here.
  const FunctionSerializerGenerator();

  @override
  Future<String> generate(LibraryReader library, BuildStep buildStep) async {
    final result = new StringBuffer();

    // Assert part import.
    final fileName = library.element.source.shortName.replaceAll('.dart', '');
    final source = library.element.source.contents.data;
    if (!source.contains("part '$fileName.g.dart';")) {
      throw new InvalidGenerationSourceError(
          "${library.element.source.fullName} lacks part directive: "
          "part '$fileName.g.dart';");
    }

    // Extract function signature from first top-level function.
    final FunctionElement firstFunction = library.allElements
        .firstWhere((e) => e is FunctionElement) as FunctionElement;
    final returnType = firstFunction.type.returnType;
    final normalParameters = firstFunction.type.normalParameterTypes;
    final parameters = normalParameters.map((p) => p.name).join(", ");

    if (firstFunction.type.optionalParameterTypes.isNotEmpty ||
        firstFunction.type.namedParameterTypes.isNotEmpty) {
      throw new InvalidGenerationSourceError(
          "FunctionSerializerGenerator currently only support "
          "functions with normal parameters (no named or optional ones)");
    }

    for (int i = 0; i < normalParameters.length; i++) {
      final type = normalParameters[i];
      if (type.isDynamic) {
        final name = firstFunction.type.normalParameterNames[i];
        throw new InvalidGenerationSourceError(
            "Function contains dynamic parameter $name. "
            "Please make sure you import all types.");
      }
    }

    // final _$serializer = new FunctionSerializer<void Function()>({
    result.writeln("final _\$serializer = new FunctionSerializer<"
        "$returnType Function($parameters)"
        ">({");

    for (final export in library.allElements) {
      if (export is! FunctionElement) continue;
      final func = export as FunctionElement;
      if (func.returnType != returnType ||
          _listsUnequal(func.type.normalParameterTypes, normalParameters)) {
        throw new InvalidGenerationSourceError(
            "FunctionSerializerGenerator assumes only one "
            "type of function per file. We encountered ${func.name} that has "
            "a different signature than ${firstFunction.name}");
      }
      result.writeln("'${func.name}': ${func.name},");
    }

    result.writeln("});");

    if (result.isNotEmpty) {
      return result.toString();
    } else {
      return null;
    }
  }
}

bool _listsUnequal<T>(List<T> a, List<T> b) {
  if (a.length != b.length) return true;
  for (int i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return true;
  }
  return false;
}
