DIR="$( cd "$( dirname "$0" )" && pwd )"
# Build bodega.
$DIR/build.sh
# Run analyzer
# You can change to bodega.html.dart for longer check in case there are any strange interferences.
# But checking just bodega.dart should suffice.
/Applications/dart/dart-sdk/bin/dartanalyzer --machine $DIR/bodega.dart
if [ $? -eq 2 ]; then
  echo "ERROR WITH BODEGA BUILD!"
  if [ $# -gt 0 ]; then
    osascript -e 'tell app "Terminal" to display alert "Error when building egamebook!"'
  fi
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
