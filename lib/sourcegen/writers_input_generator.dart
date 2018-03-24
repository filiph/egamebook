import 'dart:async';

import 'package:analyzer/dart/element/element.dart';
import 'package:build/build.dart';
import 'package:code_builder/code_builder.dart' as cb;
import 'package:code_builder/code_builder.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input.dart' hide log;
import 'package:edgehead/sourcegen/src/parse_writers_input/generated_action.dart'
    hide log;
import 'package:edgehead/sourcegen/src/parse_writers_input/generated_approach.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input/generated_game_object.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input/generated_room.dart';
import 'package:edgehead/sourcegen/src/parse_writers_input/types.dart';
import 'package:glob/glob.dart';
import 'package:source_gen/source_gen.dart';

/// Used for annotating writer's input libraries.
class GatherWriterInputFrom {
  final List<String> globs;

  const GatherWriterInputFrom(this.globs);

  @override
  String toString() => "Contents of this library will be generated from "
      "text files in given glob. The glob is recursive, so you can provide"
      "just the top-level directory.";
}

/// Generator for FunctionSerializer.
class WritersInputGenerator extends Generator {
  // Allow creating via `const` as well as enforces immutability here.
  const WritersInputGenerator();

  static const List<String> validExtensions = const [".txt"];

  @override
  Future<String> generate(LibraryReader library, BuildStep buildStep) async {
    final result = new StringBuffer();

    final fileName = library.element.source.shortName.replaceAll('.dart', '');

    AnnotatedElement annotation = _getGatherAnnotation(library);
    if (annotation == null) {
      throw new InvalidGenerationSourceError(
          "File is specified as writer's input "
          "but no @GatherWriterInputFrom(['path/...']) annotation "
          "specified.");
    }

    final element = annotation.element;
    if (element is! LibraryElement) {
      throw new InvalidGenerationSourceError(
          "Elements annotated with @GatherFunctionsFrom "
          "must be libraries.");
    }

    final globs = annotation.annotation
        .read("globs")
        .listValue
        .map((dartObject) => dartObject.toStringValue());

    final cb.LibraryBuilder lib = new cb.LibraryBuilder("writers_input");
    List<GeneratedGameObject> objects = [];

    for (final glob in globs) {
      final assetIds = buildStep.findAssets(new Glob(glob, recursive: true));
      for (final id in assetIds) {
        if (!validExtensions.contains(id.extension)) continue;
        final path = id.uri.toString();
        final List<String> lines =
            (await buildStep.readAsString(id)).split("\n");
        final rawMaps = parseWritersOutput(lines);
        for (var rawMap in rawMaps) {
          if (rawMap.keys.contains("ROOM")) {
            // TODO: remove dirPath if not needed
            var room = generateRoom(rawMap, path);
            objects.add(room);
          } else if (rawMap.keys.contains("ACTION")) {
            var action = generateAction(rawMap, path);
            objects.add(action);
          } else if (rawMap.keys.contains("APPROACH")) {
            final approach = generateApproach(rawMap, path);
            objects.add(approach);
          }
        }
      }
    }

    lib.addDirectives(allNeededTypes.map((b) => b.toImportBuilder()));
    lib.addDirective(new ImportBuilder("package:built_value/built_value.dart"));
    lib.addDirective(new ImportBuilder("package:built_value/serializer.dart"));
    lib.addDirective(
        new ImportBuilder("package:edgehead/writers_helpers.dart"));

    lib.addDirective(new cb.PartBuilder("$fileName.g.g.dart"));

    final devMode = false;
    if (devMode) {
      log.warning("Building in dev mode (less runtime asserts).");
    }
    lib.addMember(new cb.FieldBuilder.asConst('DEV_MODE',
        type: boolType, value: literal(devMode)));

    final List<GeneratedRoom> rooms = objects
        .where((o) => o is GeneratedRoom)
        .toList(growable: false) as List<GeneratedRoom>;
    for (final room in rooms) {
      room.registerReachableRooms(rooms.map((r) => r.writersName));
    }

    for (final object in objects) {
      lib.addMembers(object.finalizeAst());
    }

    lib.addMember(generateAllRooms(objects));
    lib.addMember(generateAllApproaches(objects));
    lib.addMember(generateAllActionInstances(objects));

    final source = cb.prettyToSource(lib.buildAst());

    final sourceWithUnusedLinterIgnore =
        "// ignore_for_file: unused_local_variable\n\n"
        "$source";

    result.writeln(sourceWithUnusedLinterIgnore);
//
//
//
//          final globbedLibraryElement = await buildStep.resolver.libraryFor(id);
//          final globbedLibrary = new LibraryReader(globbedLibraryElement);
//
//          for (final element in globbedLibrary.allElements) {
//            if (element is! FunctionElement) continue;
//            final func = element as FunctionElement;
//            if (!func.type.isAssignableTo(functionType)) continue;
//
//            result.writeln("'${func.name}': ${func.name},");
//
//            if (!func.isAccessibleIn(inputLibrary.element)) {
//              log.warning("${func.name} isn't accessible "
//                  "in ${inputLibrary.element.displayName}. Consider adding import "
//                  "of ${func.library.source.uri}");
//            }
//          }
//        }
//      }
//
//      result.writeln("});");
//    }

    if (result.isNotEmpty) {
      return result.toString();
    } else {
      return null;
    }
  }

  AnnotatedElement _getGatherAnnotation(LibraryReader library) {
    final annotationChecker =
        new TypeChecker.fromRuntime(GatherWriterInputFrom);
    for (final metadata in library.element.metadata) {
      final constant = new ConstantReader(metadata.constantValue);
      if (annotationChecker.isExactlyType(metadata.constantValue.type)) {
        return new AnnotatedElement(constant, library.element);
      }
    }
    return null;
  }
}
