DIR="$( cd "$( dirname "$0" )" && pwd )"
# Build bodega.
$DIR/build.sh
if [ $? -eq 255 ]; then
  # Error code 255 is Dart reporting a runtime error.
  # https://api.dartlang.org/docs/channels/stable/latest/dart_io.html#exit
  echo "ERROR WITH BODEGA BUILD! (in Builder)"
  if [ $# -gt 0 ]; then
    osascript -e 'tell app "Terminal" to display alert "Error when building egamebook!"'
  fi
  exit 1
fi
echo "Hi"
# Run analyzer
# You can change to bodega.html.dart for longer check in case there are any strange interferences.
# But checking just bodega.dart should suffice.
/Applications/dart/dart-sdk/bin/dartanalyzer --machine $DIR/bodega.dart
if [ $? -eq 2 ]; then
  echo "ERROR WITH BODEGA BUILD! (in Analyzer)"
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
