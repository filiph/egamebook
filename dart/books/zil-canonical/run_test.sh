DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/zil-canonical.egb && /Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/zil-canonical.cmdline.dart
