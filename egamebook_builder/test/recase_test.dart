import 'package:egamebook_builder/src/parse_writers_input/recase.dart';
import 'package:test/test.dart';

void main() {
  ReCase rcInput = ReCase('This is-Some_sampleText. YouDig?');

  test('Formats text to snake_case.', () {
    expect(rcInput.snakeCase, equals('this_is_some_sample_text_you_dig?'));
  });

  test('Formats text to PascalCase.', () {
    expect(rcInput.pascalCase, equals('ThisIsSomeSampleTextYouDig?'));
  });

  test('Formats text to camelCase.', () {
    expect(rcInput.camelCase, equals('thisIsSomeSampleTextYouDig?'));
  });
}
