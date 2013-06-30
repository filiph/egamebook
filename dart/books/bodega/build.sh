DIR="$( cd "$( dirname "$0" )" && pwd )"
$DIR/copy_from_drive.sh && /Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/bodega.egb
