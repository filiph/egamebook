import 'package:code_builder/code_builder.dart';

import 'types.dart';

final Parameter actionContextParameter = Parameter((b) => b
  ..name = 'c'
  ..type = actionContextType);

final Parameter actorParameter = Parameter((b) => b
  ..name = 'a'
  ..type = actorType);

final Parameter applicabilityContextParameter = Parameter((b) => b
  ..name = 'c'
  ..type = applicabilityContextType);

final Parameter originalWorldParameter = Parameter((b) => b
  ..name = 'originalWorld'
  ..type = worldStateType);

final Parameter simulationParameter = Parameter((b) => b
  ..name = 'sim'
  ..type = simulationType);

final Parameter storylineParameter = Parameter((b) => b
  ..name = 's'
  ..type = storylineType);

final Parameter timeParameter = Parameter((b) => b
  ..name = 'time'
  ..type = dateTimeType);

final Parameter voidParameter = Parameter((b) => b
  ..name = '_'
  ..type = voidType);

final Parameter worldParameter = Parameter((b) => b
  ..name = 'w'
  ..type = worldStateType);

final Parameter worldStateBuilderParameter = Parameter((b) => b
  ..name = 'w'
  ..type = worldStateBuilderType);
