import 'package:egamebook_builder/src/parse_writers_input/parse_ink.dart';
import 'package:test/test.dart';

void main() {
  test("only text", () {
    var text = r"""
      Lorem ipsum dolor sit amet.
      Dolorem ipsum.
  
      And so on.
    """;

    var result = parseInk('test', text);
    expect(result, contains('Paragraph'));
    expect(result, isNot(contains('Fork')));
    expect(result, isNot(contains('Choice')));
  });

  test("one choice", () {
    var text = r"""
      I come to a door.
      
      * Open it.
      
      It's open.
      
      * Listen.
      
      It's quiet.
    """;

    var result = parseInk('test', text);
    expect(result, contains('Paragraph'));
    expect(result, contains('Fork'));
    expect(result, contains('Choice'));
  });

  test("one choice", () {
    var text = r"""
      I come to a door.
      
      * Open it.
      
      I try to open, but how?
      
      * * Try the knob.
      
      The knob turns and the door opens.
      
      * * Kick it down.
      
      The door explodes into the room.
      
      * Listen.
      
      It's quiet.
      
      -
      
      Well that was easy.
    """;

    var result = parseInk('test', text);
    expect(result, contains('Paragraph'));
    expect(result, contains('Fork'));
    expect(result, contains('Choice'));
  });
}
