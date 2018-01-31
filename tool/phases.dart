import 'package:build_runner/build_runner.dart';
import 'package:built_value_generator/built_value_generator.dart';
import 'package:edgehead/sourcegen/functions_serializer_generator.dart';
import 'package:edgehead/sourcegen/writers_input_generator.dart';
import 'package:source_gen/source_gen.dart';

final List<BuildAction> phases = [
  new BuildAction(
      new LibraryBuilder(
        new WritersInputGenerator(),
      ),
      'edgehead',
      inputs: const [
        'drivedump/**/*.txt',
        'lib/writers_input.dart',
      ]),
  new BuildAction(
      new PartBuilder([
        new FunctionSerializerGenerator(),
      ]),
      'edgehead',
      inputs: const [
        'lib/edgehead_action_builders.dart',
        'lib/edgehead_event_callbacks.dart',
      ]),
  new BuildAction(
      new PartBuilder([
        new BuiltValueGenerator(),
      ]),
      'edgehead',
      inputs: const [
        /* generating built_values for the file generated above */
        'lib/writers_input.g.dart',
        'lib/edgehead_global.dart',
        'lib/edgehead_serializers.dart',
        'lib/fractal_stories/action_record.dart',
        'lib/fractal_stories/actor.dart',
        'lib/fractal_stories/pose.dart',
        'lib/fractal_stories/room.dart',
        'lib/fractal_stories/team.dart',
        'lib/fractal_stories/world_state.dart',
        'lib/fractal_stories/items/weapon.dart',
        'lib/fractal_stories/items/weapon_type.dart',
        'lib/fractal_stories/storyline/storyline_pronoun.dart',
        'lib/src/predetermined_result.dart',
        'lib/src/**/*_situation.dart',
        'lib/egamebook/elements/serializers.dart',
        'lib/egamebook/elements/*_element.dart',
        'lib/egamebook/commands/serializers.dart',
        'lib/egamebook/commands/*_command.dart',
      ])
];
