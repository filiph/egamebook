DIR="$( cd "$( dirname "$0" )" && pwd )"
$DIR/copy_from_drive.sh && \
  /Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/bodega.egb && \
  /Applications/dart/dart-sdk/bin/dart2js -v --minify -c --package-root=$DIR/../../packages --out=$DIR/bodega.dart.js $DIR/bodega.dart && \
  /Applications/dart/dart-sdk/bin/dart2js -v --minify -c --package-root=$DIR/../../packages --out=$DIR/bodega.html.dart.js $DIR/bodega.html.dart
