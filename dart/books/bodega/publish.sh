DIR="$( cd "$( dirname "$0" )" && pwd )"
# Use -m in the dart2js calls below to enforce minified code. (When used in production.)
$DIR/copy_from_drive.sh && /Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/bodega.egb && \
  /Applications/dart/dart-sdk/bin/dart2js -v -c --package-root=$DIR/../../packages --out=$DIR/bodega.dart.js $DIR/bodega.dart && \
  /Applications/dart/dart-sdk/bin/dart2js -v -c --package-root=$DIR/../../packages --out=$DIR/bodega.html.dart.js $DIR/bodega.html.dart && \
  rsync -avL --chmod=o+r -e "ssh -p 2222 -o PubkeyAuthentication=no" $DIR/bodega.dart.js* $DIR/bodega.html.dart.js* $DIR/index.html $DIR/egamebook.css $DIR/img filiph@visible.cz:public_html/egamebook.com/test/
# Use "-o PubkeyAuthentication=no" after "-p 2222" when you have problems connecting.
