import 'package:edgehead/sourcegen/src/recase/recase.dart';
import 'package:test/test.dart';

void main() {
  ReCase rcInput = new ReCase('This is-Some_sampleText. YouDig?');

  test('Formats text to snake_case.', () {
    expect(rcInput.snakeCase, equals('this_is_some_sample_text_you_dig?'));
  });

  test('Formats text to dot.case.', () {
    expect(rcInput.dotCase, equals('this.is.some.sample.text.you.dig?'));
  });

  test('Formats text to path/case.', () {
    expect(rcInput.pathCase, equals('this/is/some/sample/text/you/dig?'));
  });

  test('Formats text to param-case.', () {
    expect(rcInput.paramCase, equals('this-is-some-sample-text-you-dig?'));
  });

  test('Formats text to PascalCase.', () {
    expect(rcInput.pascalCase, equals('ThisIsSomeSampleTextYouDig?'));
  });

  test('Formats text to Header-Case.', () {
    expect(rcInput.headerCase, equals('This-Is-Some-Sample-Text-You-Dig?'));
  });

  test('Formats text to Title Case.', () {
    expect(rcInput.titleCase, equals('This Is Some Sample Text You Dig?'));
  });

  test('Formats text to camelCase.', () {
    expect(rcInput.camelCase, equals('thisIsSomeSampleTextYouDig?'));
  });

  test('Formats text to Sentence case.', () {
    expect(rcInput.sentenceCase, equals('This is some sample text you dig?'));
  });

  test('Formats text to CONSTANT_CASE.', () {
    expect(rcInput.constantCase, equals('THIS_IS_SOME_SAMPLE_TEXT_YOU_DIG?'));
  });
}
