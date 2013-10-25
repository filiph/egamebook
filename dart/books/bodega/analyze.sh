DIR="$( cd "$( dirname "$0" )" && pwd )"
# Build bodega.
$DIR/build.sh
# Run analyzer
/Applications/dart/dart-sdk/bin/dartanalyzer $DIR/bodega.html.dart
if [ $? -eq 2 ]; then
  echo "ERROR WITH BODEGA BUILD!"
  exit 1
elif [ $? -eq 1 ]; then
  echo "There were some warnings, but nothing fatal."
  exit 0
elif [ $? -eq 0 ]; then
  echo "No problems with build."
  exit 0
else
  echo "Invalid exit code from dartanalyzer!"
  exit 1
fi
