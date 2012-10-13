DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/build.dart $DIR/../example/library/tis_002.egb
/Applications/dart/dart-sdk/bin/dart2js -c -o$DIR/../example/library/tis_002.html.dart.js $DIR/../example/library/tis_002.html.dart
/Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/../example/library/tis_002.cmdline.dart
