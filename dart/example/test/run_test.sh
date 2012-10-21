DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/test.egb
/Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/test.cmdline.dart
