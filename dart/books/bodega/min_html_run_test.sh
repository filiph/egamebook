DIR="$( cd "$( dirname "$0" )" && pwd )"
$DIR/copy_from_drive.sh && /Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/bodega.egb && /Applications/dart/dart-sdk/bin/dart2js -v -c --minify --package-root=$DIR/../../packages --out=$DIR/bodega.html.dart.js $DIR/bodega.html.dart
# cd $DIR
# open http://0.0.0.0:8000/index.html
# python -m SimpleHTTPServer
# cd -
