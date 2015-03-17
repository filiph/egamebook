DIR="$( cd "$( dirname "$0" )" && pwd )"
/Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/../test/builder_test.dart && /Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/../test/scripter_test.dart && /Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $DIR/../test/vars_generator_test.dart
if [ $? -gt 0 ]; then
  exit
fi
for f in $( ls $DIR/../books/libraries/*_test.dart ); do
  echo $f
  /Applications/dart/dart-sdk/bin/dart --enable_type_checks --enable_asserts $f
  if [ $? -gt 0 ]; then
    exit
  fi
done
