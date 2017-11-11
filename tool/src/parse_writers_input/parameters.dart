import 'package:code_builder/code_builder.dart';

import 'types.dart';

final ParameterBuilder actorParameter =
    new ParameterBuilder("a", type: actorType);

final ParameterBuilder storylineParameter =
    new ParameterBuilder("s", type: storylineType);

final ParameterBuilder worldParameter =
    new ParameterBuilder("w", type: worldStateType);
