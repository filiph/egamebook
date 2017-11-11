#!/usr/bin/env bash

dart -c tool/parse_writers_input.dart drivedump/ \
    > lib/writers_input.dart
