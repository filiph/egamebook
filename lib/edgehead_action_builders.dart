library edgehead.action_builders;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/sourcegen/functions_serializer.dart';

import 'src/fight/slash/actions/finish_slash.dart';
import 'src/fight/slash/actions/finish_thrust_spear.dart';

part 'edgehead_action_builders.g.dart';

@GatherFunctionsFrom(const ['lib/src/fight/slash/actions/*.dart'])
final FunctionSerializer<EnemyTargetActionBuilder> serializer =
    _$enemyTargetActionBuilderSerializer;
