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

  test('complex example', () {
    var text = r"""
"Sarn? Doesn't ring the bell. Who is he?"

* "He came here with the Knights."

    Miguel looks surprised. "He's a knight, then?"

    * * "No, a blacksmith."

        "Ah. He's a mender with the Knights." 

* "A blacksmith."

    "There are no blacksmiths here." Miguel gestures around, towards the ruins and the forest.

    * * "Whose work is your sword, then?"

        "Her?" He looks at his sword and pats it. "She's not from here. I bought her in Lywood, years ago, for more coins that I will admit." He smiles for the first time since we met.

        * * * "The sword looks great."

            Miguel's smile widens. "You get what you pay for. And I'm taking good care of her, taking her to ..." Miguel stops. "Oh!" He shakes his head, still smiling.

        * * * "Who repairs it when there's a chink in the blade?"

            "Oh!" he says. 

        - - -

        "I know what you're driving at. You mean a mender. Your Sarn is a mender with the Knights."

    * * "The Knights recruited him, as a blacksmith."

        "Oh, you mean a mender."

-

He looks to the woman. "Do you know of a mender called Sarn?"

"No," she says.

* "But he might be inside."

-

"Oh," Miguel says, "you would not like to get inside. You would like to get out."

The woman looks at him with a mix of puzzlement and exasperation, then she turns to me.

"This place is no longer safe. Unless you have business with one of the farmers, you shouldn't go in."

    """;

    var result = parseInk('test', text);
    expect(result, contains('Paragraph'));
    expect(result, contains('Fork'));
    expect(result, contains('Choice'));
  });

  test("supports rulesets", () {
    var text = r"""
      I come to a door.
      
      * Open it.
      
      I try to open, but how?
      
      * * Try the knob.
      
      The knob turns and the door opens.
      
      [[RULESET]]
      [[RULE]]
      c.playerHasVisited('keep_dining')
      [[THEN]]
      I am reminded of my fight with Lady Hope.
      [[ENDRULE]]
      [[RULE]]
      $DEFAULT
      [[THEN]]
      I am duly impressed. Someone must be pupetteering the body. A highly skilled necromancer, perhaps.
      
      I risk a quick look around. Nobody else is here. The necromancer must be doing this from afar. Even more impressive.
      
      But then, Darg's undead lips start moving. He _speaks._
      
      "Welcome, young one." The voice is dry and labored, but nevertheless understandable. A talking corpse is something I've never even considered before. This is obviously necromancy of some higher level.
      [[ENDRULE]]
      [[ENDRULESET]]
      
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
