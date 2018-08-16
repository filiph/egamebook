import 'dart:async';

import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/type.dart';
import 'package:build/build.dart';
import 'package:glob/glob.dart';
import 'package:source_gen/source_gen.dart';

import '../../function_serializer.dart';
import '../ensure_part_import.dart';
import '../recase/recase.dart';

/// Generator for FunctionSerializer.
@deprecated
class FunctionSerializerGenerator extends Generator {
  // Allow creating via `const` as well as enforces immutability here.
  const FunctionSerializerGenerator();

  @override
  Future<String> generate(LibraryReader library, BuildStep buildStep) async {
    final result = new StringBuffer();

    // Assert part import.
    final fileName = library.element.source.shortName.replaceAll('.dart', '');
    ensurePartImport(library, fileName, extension: '.gathered.dart');

    final annotated = library
        .annotatedWith(new TypeChecker.fromRuntime(GatherFunctionsFrom))
        .toList(growable: false);
    if (annotated.isEmpty) {
      log.info("File $fileName has no FunctionSerializer declarations that "
          "are annotated with @GatherFunctionsFrom.");
      return null;
    }

    for (final declaration in annotated) {
      final element = declaration.element;
      if (element is! TopLevelVariableElement) {
        throw new InvalidGenerationSourceError(
            "Elements annotated with @GatherFunctionsFrom "
            "must be top level variable declarations.");
      }
      final variable = element as TopLevelVariableElement;
      if (variable.type is! ParameterizedType) {
        throw new InvalidGenerationSourceError(
            "Type of variable must be FunctionSerializer<SomeCallback>");
      }
      final interfaceType = variable.type as ParameterizedType;
      if (interfaceType.name != 'FunctionSerializer') {
        // TODO: find out how to create a DartType() and use it to check
        //       via interfaceType.isAssignableTo(functionSerializerType)
        throw new InvalidGenerationSourceError(
            "Top level declarations with the @GatherFunctionsFrom "
            "annotation need to be of type FunctionSerializer, but we found "
            "one with type ${interfaceType.name}");
      }
      final FunctionType functionType = interfaceType.typeArguments.single;

      /// Typedefs don't have 'name', apparently. So we get it from
      /// the annotation.
      final DartType functionTypeFromAnnotation =
          declaration.annotation.read("functionType").typeValue;

      // TODO: find out why this always fails
      // if (functionTypeFromAnnotation.isAssignableTo(functionType)) {
      //   throw new InvalidGenerationSourceError(
      //       "The type parameter of the variable declaration doesn't correspond "
      //       "to the type provided to the @GatherFunctionsFrom annotation. "
      //       "Type parameter: $functionType. "
      //       "Annotation: $functionTypeFromAnnotation");
      // }

      final String functionTypeName = functionTypeFromAnnotation.name;

      final variableName = "_\$"
          "${new ReCase(functionTypeName).camelCase}"
          "Serializer";

      // final _$someCallbackSerializer = new FunctionSerializer<SomeCallback>({
      result.writeln("final $variableName = "
          "new FunctionSerializer<$functionTypeName>({");

      final globs = declaration.annotation
          .read("globs")
          .listValue
          .map((dartObject) => dartObject.toStringValue());

      for (final glob in globs) {
        final assetIds = buildStep.findAssets(new Glob(glob));
        await for (final id in assetIds) {
          final globbedLibraryElement = await buildStep.resolver.libraryFor(id);
          final globbedLibrary = new LibraryReader(globbedLibraryElement);

          for (final element in globbedLibrary.allElements) {
            if (element is! FunctionElement) continue;
            final func = element as FunctionElement;
            if (!func.type.isAssignableTo(functionType)) continue;

            result.writeln("'${func.name}': ${func.name},");

            if (!func.isAccessibleIn(library.element)) {
              log.warning("${func.name} isn't accessible "
                  "in ${library.element.displayName}. Consider adding import "
                  "of ${func.library.source.uri}");
            }
          }
        }
      }

      result.writeln("});");
    }

    if (result.isNotEmpty) {
      return result.toString();
    } else {
      return null;
    }
  }
}
