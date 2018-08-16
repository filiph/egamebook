import 'dart:async';

import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/type.dart';
import 'package:build/build.dart';
import 'package:glob/glob.dart';
import 'package:source_gen/source_gen.dart';

import '../../instance_serializer.dart';
import '../ensure_part_import.dart';
import '../recase/recase.dart';

/// Generator for InstanceSerializer.
class InstanceSerializerGenerator extends Generator {
  // Allow creating via `const` as well as enforces immutability here.
  const InstanceSerializerGenerator();

  @override
  Future<String> generate(
      LibraryReader gatherLibrary, BuildStep buildStep) async {
    final result = new StringBuffer();

    log.fine("InstanceSerializer for: $gatherLibrary");

    // Assert part import.
    final fileName =
        gatherLibrary.element.source.shortName.replaceAll('.dart', '');
    ensurePartImport(gatherLibrary, fileName, extension: '.gathered.dart');

    final annotated = gatherLibrary
        .annotatedWith(new TypeChecker.fromRuntime(GatherInstancesFrom))
        .toList(growable: false);
    if (annotated.isEmpty) {
      log.warning("File $fileName has no InstanceSerializer declarations that "
          "are annotated with @GatherInstancesFrom.");
      return null;
    }

    for (final declaration in annotated) {
      final element = declaration.element;
      if (element is! TopLevelVariableElement) {
        throw new InvalidGenerationSourceError(
            "Elements annotated with @GatherInstancesFrom "
            "must be top level variable declarations.");
      }
      final variable = element as TopLevelVariableElement;
      if (variable.type is! InterfaceType) {
        throw new InvalidGenerationSourceError(
            "Type of variable must be InstanceSerializer<T>");
      }
      final interfaceType = variable.type as InterfaceType;
      if (interfaceType.name != 'InstanceSerializer') {
        // TODO: find out how to create a DartType() and use it to check
        //       via interfaceType.isAssignableTo(functionSerializerType)
        throw new InvalidGenerationSourceError(
            "Top level declarations with the @GatherInstancesFrom "
            "annotation need to be of type InstanceSerializer, but we found "
            "one with type ${interfaceType.name}");
      }

      final typeArguments = interfaceType.typeArguments;
      if (typeArguments.length != 1) {
        throw new InvalidGenerationSourceError(
            "Variable annotated with @GatherInstancesFrom "
            "must have exactly 1 type argument. So the type annotation should "
            "read something like InstanceSerializer<Action> or "
            "InstanceSerializer<SomeOtherType>.");
      }

      final instanceType = typeArguments.single;
      final instanceTypeName = instanceType.name;
      final variableName =
          "_\$" "${new ReCase(instanceTypeName).camelCase}" "Serializer";

      // final _$someCallbackSerializer = new FunctionSerializer<SomeCallback>({
      result.writeln(
          "final $variableName = new InstanceSerializer<$instanceTypeName>({");

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
            if (topLevelElement is TopLevelVariableElement) {
              if (!topLevelElement.type.isAssignableTo(instanceType)) {
                continue;
              }

              _writeElement(result, topLevelElement, gatherLibrary,
                  '${topLevelElement.name}');
              continue;
            }

            if (topLevelElement is! ClassElement) continue;

            final classEl = topLevelElement as ClassElement;
            final elements = classEl.fields.where(
                (el) => el.isStatic && el.type.isAssignableTo(instanceType));
            for (final element in elements) {
              _writeElement(result, element, gatherLibrary,
                  '${classEl.name}.${element.name}');
            }
          }
        }
      }

      // End the map.
      result.write("}");

      final additionalTypes = declaration.annotation
          .read("additionalTypes")
          .listValue
          .map((dartObject) => dartObject.toTypeValue());

      if (additionalTypes.isNotEmpty) {
        // , additionalTypes: [
        //  EnemyTargetAction,
        //  OtherActorAction
        // ]
        result.writeln(", additionalTypes: [");
        for (final type in additionalTypes) {
          result.write(type.name);
          result.writeln(",");
        }
        result.write("]");
      }

      result.writeln(");");
    }

    if (result.isNotEmpty) {
      return result.toString();
    } else {
      return null;
    }
  }

  void _writeElement(StringBuffer result, VariableElement element,
      LibraryReader gatherLibrary, String name) {
    result.writeln("'$name': $name,");

    if (!element.isAccessibleIn(gatherLibrary.element)) {
      log.warning("${element.name} isn't accessible "
          "in ${gatherLibrary.element.displayName}. Consider adding import "
          "of ${element.library.source.uri}");
    }
  }
}
