DIR="$( cd "$( dirname "$0" )" && pwd )"
./copy_from_drive.sh && /Applications/dart/dart-sdk/bin/dart $DIR/../../bin/build.dart $DIR/bodega.egb && /Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/bodega.cmdline.dart
