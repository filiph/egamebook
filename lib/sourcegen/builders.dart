import 'dart:async';

import 'package:build/build.dart';
import 'package:edgehead/sourcegen/actions_serializer_generator.dart';
import 'package:edgehead/sourcegen/functions_serializer_generator.dart';
import 'package:source_gen/source_gen.dart';

/// Builder that wraps generators which take multiple files and
/// summarize their contents into a single one.
Builder gatherBuilder(BuilderOptions options) => new PartBuilder([
      const ActionsSerializerGenerator(),
      const FunctionSerializerGenerator(),
    ]);


Builder cssBuilder(BuilderOptions options) => new CssBuilder();


/// Adds `generated.css` to the `web` directory.
class CssBuilder implements Builder {
  @override
  Future build(BuildStep buildStep) async {
    await buildStep.writeAsString(
        new AssetId(buildStep.inputId.package, 'web/generated.css'),
        _cssContent(buildStep.inputId));
  }

  @override
  final buildExtensions = const {
    r'$web$': const ['generated.css']
  };

  static String _cssContent(AssetId inputId) => '''
/*
Generated at: ${new DateTime.now()}
     AssetId: $inputId
*/
pre {
  font-size: 200%;
}''';
}
