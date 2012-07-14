DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/build.dart $DIR/library/tis_001.egb
/Applications/dart/dart-sdk/bin/dart2js -c -o$DIR/library/tis_001.html.dart.js $DIR/library/tis_001.html.dart
/Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/library/tis_001.cmdline.dart
