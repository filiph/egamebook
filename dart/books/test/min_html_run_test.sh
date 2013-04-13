DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/test.egb && /Applications/dart/dart-sdk/bin/dart2js -v --minify -c --package-root=$DIR/../../packages --out=$DIR/test.html.dart.js $DIR/test.html.dart
cd $DIR
open http://0.0.0.0:8000/test.html
python -m SimpleHTTPServer
cd -
