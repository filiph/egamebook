import 'package:egamebook_builder/src/parse_writers_input/if_block.dart';
import 'package:test/test.dart';

void main() {
  test("no IF block", () {
    final ifBlocks = IfBlock.parse("This has no if block.");
    expect(ifBlocks, isEmpty);
  });

  test("one IF block", () {
    final ifBlocks =
        IfBlock.parse("This has [[IF true]]one[[ELSE]]what?[[ENDIF]] blocks.");
    expect(ifBlocks, hasLength(1));
  });

  test("two IF blocks one after another", () {
    final ifBlocks =
        IfBlock.parse("This has [[IF true]]two[[ELSE]]what?[[ENDIF]]"
            "[[IF 1>2]]IF[[ENDIF]] if blocks.");
    expect(ifBlocks, hasLength(2));
  });

  test("two IF-ELSE blocks one after another", () {
    final ifBlocks =
        IfBlock.parse("This has [[IF true]]two[[ELSE]]what?[[ENDIF]] "
            "[[IF 1>2]]IF[[ELSE]]if[[ENDIF]] blocks.");
    expect(ifBlocks, hasLength(2));
  });
}
