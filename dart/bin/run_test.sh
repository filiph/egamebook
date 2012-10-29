DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/build.dart $DIR/../example/test/test.egb
#/Applications/dart/dart-sdk/bin/dart2js --checked -v --package-root=$DIR/../packages --out=$DIR/../example/test/test.html.dart.js $DIR/../example/test/test.html.dart
/Applications/dart/dart-sdk/bin/dart2js -v --package-root=$DIR/../packages --out=$DIR/../example/test/test.html.dart.js $DIR/../example/test/test.html.dart

#/Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/../example/test/test.cmdline.dart
