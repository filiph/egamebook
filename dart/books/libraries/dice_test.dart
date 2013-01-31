import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'dice.dart';

void main() {
  test("six-sided dice is six sided", () {
    for (int i = 0; i < 1000; i++) {
      int value = throwDice(6);
      expect(value, greaterThan(0));
      expect(value, lessThan(7));
    }
  });
  test("reportDiceSave reports correctly", () {
    textBuffer.clear();
    reportDiceSave(6, 4);
    expect(textBuffer.toString(), 
        "You threw a 6 and made the throw against 4.");
    textBuffer.clear();
    reportDiceSave(1, 4);
    expect(textBuffer.toString(), 
        "You threw a 1 and so your save against 4 was unsuccessful.");
  });
}

