#!/usr/bin/env bash

dart -c tool/parse_writers_input.dart drivedump/Way\ to\ Fort/ \
    > lib/writers_input.dart
