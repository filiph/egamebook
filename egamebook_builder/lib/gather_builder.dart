import 'package:build/build.dart';
import 'package:egamebook_builder/src/generators/instance_serializer_generator.dart';
import 'package:source_gen/source_gen.dart';

/// Builder that wraps generators which take multiple files and
/// summarize their contents into a single one.
Builder gatherBuilder(BuilderOptions options) => PartBuilder([
      const InstanceSerializerGenerator(),
    ], generatedExtension: '.gathered.dart');
