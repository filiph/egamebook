#!/usr/bin/env bash
DIR="$( cd "$( dirname "$0" )" && pwd )"
dart --enable_type_checks --enable_asserts $DIR/../test/test_coverage.dart
if [ $? -gt 0 ]; then
  exit
fi
for f in $( ls $DIR/../books/libraries/*_test.dart ); do
  echo $f
  dart --enable_type_checks --enable_asserts $f
  if [ $? -gt 0 ]; then
    exit
  fi
done
