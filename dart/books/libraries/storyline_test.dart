
import 'package:unittest/unittest.dart';
import 'package:egamebook/src/book/scripter.dart';
import 'actor.dart';
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
        matches("The ship trembles. There is something wrong with the "
                "engines. You gesture to your Gorilla.+"
                "uns towards the engine room\."));
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
  
  test("possessive", () {
    var storyline = new Storyline();
    var player = new Player();
    var gun = new Actor(name: "gun", team: Actor.FRIEND, 
        pronoun: Pronoun.IT);
    var enemy = new Actor(name: "the enemy", team: Actor.DEFAULT_ENEMY, 
        pronoun: Pronoun.HE);
    storyline.add("<owner's> <subject> <is> pointed at <object>",
                  owner: player, subject: gun, object: enemy, time: 1);
    storyline.add("<subject> fire<s>",
                  subject: gun, time: 2);
    expect(storyline.toString(),
        matches("Your gun is pointed at the enemy.+t fires."));
    
    storyline.clear();
    var ship = new Actor(name: "ship", team: Actor.DEFAULT_ENEMY, 
        pronoun: Pronoun.SHE);
    storyline.add("<owner's> <subject> aim<s> <subject's> guns at <object>",
        owner: enemy, subject: ship, object: player);
    storyline.add("<owner's> <subject> <is> faster",
        owner: player, subject: gun, but: true);
    expect(storyline.toString(),
        matches("The enemy's ship aims her guns at you.+ your gun is faster."));
  });
  
  test("enumeration", () {
    var storyline = new Storyline();
    
    // 1
    storyline.addEnumeration("you see", ["a handkerchief"], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief here."));
    storyline.clear();
    // 2
    storyline.addEnumeration("you see", ["a handkerchief", "a brush"], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief and a brush here."));
    storyline.clear();
    // 3
    storyline.addEnumeration("you see", 
        ["a handkerchief", "a brush", "a mirror"], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here."));
    storyline.clear();
    // 4
    storyline.addEnumeration("you see", 
        ["a handkerchief", "a brush", "a mirror", "a lipstick"], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick here."));
    storyline.clear();
    // 5
    storyline.addEnumeration("you see", 
        ["a handkerchief", "a brush", "a mirror", "a lipstick", 
         "a crate of TNT"], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also
    storyline.addEnumeration("you <also> see", 
        ["a handkerchief", "a brush", "a mirror", "a lipstick", 
         "a crate of TNT"], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You also see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also + no end
    storyline.addEnumeration("you <also> see", 
        ["a handkerchief", "a brush", "a mirror", "a lipstick", 
         "a crate of TNT"], null);
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror. "
            "You also see a lipstick and a crate of TNT."));
    storyline.clear();
  });
}