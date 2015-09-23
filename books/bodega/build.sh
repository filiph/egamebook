DIR="$( cd "$( dirname "$0" )" && pwd )"
$DIR/copy_from_drive.sh && \
  dart $DIR/../../bin/build.dart $DIR/bodega.egb
