import 'dart:math';

import 'package:meta/meta.dart';

final _random = Random();

/// A simple [RandomIdGetter] for tests.
@visibleForTesting
int testRandomIdGetter() => _random.nextInt(0xFFFFFF);
