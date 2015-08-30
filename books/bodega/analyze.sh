DIR="$( cd "$( dirname "$0" )" && pwd )"
# Build bodega.
echo "Starting build..."
$DIR/build.sh
BUILDER_EXIT_CODE=$?
if [ $BUILDER_EXIT_CODE -eq 255 ]; then
  # Error code 255 is Dart reporting a runtime error.
  # https://api.dartlang.org/docs/channels/stable/latest/dart_io.html#exit
  echo "ERROR WITH BODEGA BUILD! (in Builder)"
  if [ $# -gt 0 ]; then
    osascript -e 'tell app "iTerm" to display alert "Error when building egamebook!"'
  fi
  exit 1
fi
echo "Bodega build complete. Analyzing..."
# Run analyzer
# You can change to bodega.html.dart for longer check in case there are any strange interferences.
# But checking just bodega.dart should suffice.
/Applications/dart/dart-sdk/bin/dartanalyzer --format=machine -p $DIR/../../packages/ $DIR/bodega.dart
ANALYZER_EXIT_CODE=$?
echo "Exit code = $ANALYZER_EXIT_CODE"
if [ $ANALYZER_EXIT_CODE -eq 3 ]; then
  echo "ERROR WITH BODEGA BUILD! (in Analyzer)"
  if [ $# -gt 0 ]; then
    osascript -e 'tell app "iTerm" to display alert "Error when building egamebook!"'
  fi
  exit 1
elif [ $ANALYZER_EXIT_CODE -eq 1 ]; then
  echo "There were some warnings, but nothing fatal."
  exit 0
elif [ $ANALYZER_EXIT_CODE -eq 0 ]; then
  echo "No problems with build."
  exit 0
else
  echo "Invalid exit code from dartanalyzer!"
  exit 1
fi
