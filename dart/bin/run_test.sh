DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/build.dart $DIR/../example/test/test.egb
/Applications/dart/dart-sdk/bin/dart2js -c -o$DIR/../example/test/test.html.dart.js $DIR/../example/test/test.html.dart
/Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/../example/test/test.cmdline.dart
