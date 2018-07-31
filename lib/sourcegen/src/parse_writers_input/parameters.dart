import 'package:code_builder/code_builder.dart';

import 'types.dart';

final ParameterBuilder actionContextParameter =
    new ParameterBuilder("c", type: actionContextType);

final ParameterBuilder actorParameter =
    new ParameterBuilder("a", type: actorType);

final ParameterBuilder applicabilityContextParameter =
    new ParameterBuilder("c", type: applicabilityContextType);

final ParameterBuilder nullParameter =
    new ParameterBuilder("_", type: new TypeBuilder('Null'));

final ParameterBuilder originalWorldParameter =
    new ParameterBuilder("originalWorld", type: worldStateType);

final ParameterBuilder simulationParameter =
    new ParameterBuilder("sim", type: simulationType);

final ParameterBuilder storylineParameter =
    new ParameterBuilder("s", type: storylineType);

final ParameterBuilder worldParameter =
    new ParameterBuilder("w", type: worldStateType);

final ParameterBuilder worldStateBuilderParameter =
    new ParameterBuilder("w", type: worldStateBuilderType);
