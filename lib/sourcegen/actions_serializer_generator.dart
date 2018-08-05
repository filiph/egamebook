import 'dart:async';

import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/type.dart';
import 'package:build/build.dart';
import 'package:edgehead/sourcegen/actions_serializer.dart';
import 'package:edgehead/sourcegen/src/ensure_part_import.dart';
import 'package:edgehead/sourcegen/src/recase/recase.dart';
import 'package:glob/glob.dart';
import 'package:source_gen/source_gen.dart';

/// Generator for ActionSerializer.
class ActionsSerializerGenerator extends Generator {
  // Allow creating via `const` as well as enforces immutability here.
  const ActionsSerializerGenerator();

  @override
  Future<String> generate(LibraryReader library, BuildStep buildStep) async {
    final result = new StringBuffer();

    // Assert part import.
    final fileName = library.element.source.shortName.replaceAll('.dart', '');
    ensurePartImport(library, fileName);

    final annotated = library
        .annotatedWith(new TypeChecker.fromRuntime(GatherActionsFrom))
        .toList(growable: false);
    if (annotated.isEmpty) {
      log.info("File $fileName has no ActionSerializer declarations that "
          "are annotated with @GatherActionsFrom.");
      return null;
    }

    for (final declaration in annotated) {
      final element = declaration.element;
      if (element is! TopLevelVariableElement) {
        throw new InvalidGenerationSourceError(
            "Elements annotated with @GatherActionsFrom "
            "must be top level variable declarations.");
      }
      final variable = element as TopLevelVariableElement;
      if (variable.type is! InterfaceType) {
        throw new InvalidGenerationSourceError(
            "Type of variable must be ActionSerializer");
      }
      final interfaceType = variable.type as InterfaceType;
      if (interfaceType.name != 'ActionSerializer') {
        // TODO: find out how to create a DartType() and use it to check
        //       via interfaceType.isAssignableTo(functionSerializerType)
        throw new InvalidGenerationSourceError(
            "Top level declarations with the @GatherActionsFrom "
            "annotation need to be of type ActionSerializer, but we found "
            "one with type ${interfaceType.name}");
      }
      final functionTypeName = "Action";
      final variableName =
          "_\$" "${new ReCase(functionTypeName).camelCase}" "Serializer";

      // Get `Action<dynamic>` DartType from ActionSerializer
      final DartType actionDynamicType =
          interfaceType.superclass.typeArguments.single;

      // final _$someCallbackSerializer = new FunctionSerializer<SomeCallback>({
      result.writeln("final $variableName = new ActionSerializer({");

      final globs = declaration.annotation
          .read("globs")
          .listValue
          .map((dartObject) => dartObject.toStringValue());

      for (final glob in globs) {
        final assetIds = buildStep.findAssets(new Glob(glob));
        await for (final id in assetIds) {
          final globbedLibraryElement = await buildStep.resolver.libraryFor(id);
          final globbedLibrary = new LibraryReader(globbedLibraryElement);

          for (final topLevelElement in globbedLibrary.allElements) {
            if (topLevelElement is! ClassElement) continue;
            final classEl = topLevelElement as ClassElement;

            final element = classEl.getField("singleton");
            if (element == null) continue;

            // TODO: need to really check what the type is
            if (!element.type.isAssignableTo(actionDynamicType)) continue;

            result
                .writeln("'${classEl.name}': ${classEl.name}.${element.name},");

            if (!element.isAccessibleIn(library.element)) {
              log.warning("${element.name} isn't accessible "
                  "in ${library.element.displayName}. Consider adding import "
                  "of ${element.library.source.uri}");
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
