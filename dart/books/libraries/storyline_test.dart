
import 'package:unittest/unittest.dart';
import '../../lib/src/book/scripter.dart';
import 'storyline.dart';

void main() {
  test("simple storyline", () {
    var storyline = new Storyline();
    var player = new Player();
    var gorilla = new Actor(name: "Gorilla", team: Actor.FRIEND, 
        pronoun: Pronoun.IT);
    storyline.add("The ship trembles. There is something wrong with the engines.",
        wholeSentence: true, time: 0);
    storyline.add("<subject> gesture<s> to <subject's> <object>",
        subject: player, object: gorilla, time: 1);
    storyline.add("<subject> nod<s> at <object>",
        subject: gorilla, object: player, time: 2);
    storyline.add("<subject> run<s> towards the engine room",
        subject: gorilla, time: 3);
    expect(storyline.toString(), 
        startsWith("The ship trembles. There is something wrong with the "
                   "engines. You gesture to your Gorilla"));
    expect(storyline.toString(),
        endsWith("uns towards the engine room."));
  });
  
  test("exchange", () {
    var storyline = new Storyline();
    var player = new Player();
    var enemy = new Actor(name: "enemy", team: Actor.DEFAULT_ENEMY, 
        pronoun: Pronoun.HE);
    storyline.add("<subject> tr<ies> to hit <object> in the stomach",
                  subject: player, object: enemy, time: 1);
    storyline.add("<subject> dodge<s> <object's> strike",
                  subject: enemy, object: player, but: true, time: 2);
    storyline.add("<subject> hit<s> back",
                  subject: enemy, object: player, positive: true, time: 3);
    storyline.add("<subject> break<s> <object's> nose",
                  subject: enemy, object: player, positive: true, time: 4);
    expect(storyline.toString(),
        matches("You try to hit enemy in the stomach.+ he dodges your strike. "
        "He hits back.+ breaks your nose."));
  });
}