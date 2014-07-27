
import 'package:unittest/unittest.dart';
import 'storyline.dart';

void main() {
  test("simple storyline", () {
    var storyline = new Storyline();
    var player = new Player();
    var gorilla = new Actor(name: "Gorilla", nameIsProperNoun: true, 
        team: Actor.FRIEND, pronoun: Pronoun.IT);
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
  
  test("fixing .\". in sentences", () {
    var storyline = new Storyline();
    var player = new Player();
    var gorilla = new Actor(name: "Gorilla", nameIsProperNoun: true, 
            team: Actor.FRIEND, pronoun: Pronoun.IT);
    storyline.add("<subject> enter<s> the room", subject: gorilla);
    storyline.add("<subject> say<s>: \"Isn't this great?\"", subject: gorilla, 
        endSentence: true);
    expect(storyline.toString(), endsWith("says: \"Isn't this great?\""));
    storyline.clear();
    storyline.add("<subject> say<s>: \"Well, I think it's great.\"", 
        subject: gorilla);
    expect(storyline.toString(), 
        endsWith("says: \"Well, I think it's great.\""));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: \"Well? Say something!\"", 
        subject: gorilla);
    expect(storyline.toString(), 
        endsWith("exclaims: \"Well? Say something!\""));
  });
  
  test("fixing .'. in sentences", () {
    var storyline = new Storyline();
    var player = new Player();
    var gorilla = new Actor(name: "Gorilla", team: Actor.FRIEND, 
        pronoun: Pronoun.IT);
    storyline.add("<subject> enter<s> the room", subject: gorilla);
    storyline.add("<subject> say<s>: 'Isn't this great?'", subject: gorilla, 
        endSentence: true);
    expect(storyline.toString(), endsWith("says: 'Isn't this great?'"));
    storyline.clear();
    storyline.add("<subject> say<s>: 'Well, I think it's great.'", 
        subject: gorilla);
    expect(storyline.toString(), 
        endsWith("says: 'Well, I think it's great.'"));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: 'Well? Say something!'", 
        subject: gorilla);
    expect(storyline.toString(), 
        endsWith("exclaims: 'Well? Say something!'"));
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
        matches("You try to hit the enemy in the stomach.+ he dodges your strike. "
        "He hits back.+ breaks your nose."));
  });
  
  test("substitute pronouns where proper ('he gives him the money')", () {
    var storyline = new Storyline();
    var enemy = new Actor(name: "John", nameIsProperNoun: true, team: 3, 
        pronoun: Pronoun.HE);
    var enemy2 = new Actor(name: "Jack", nameIsProperNoun: true, team: 4, 
            pronoun: Pronoun.HE);
    storyline.add("<subject> meet<s> <object> at the station", subject: enemy,
        object: enemy2);
    storyline.add("<subject> give<s> <object> the money", subject: enemy,
            object: enemy2);
    expect(storyline.toString(),
        matches("John meets Jack at the station. He gives him the money."));
  });
  
  test("don't substitute pronouns where confusing ('it hits it')", () {
    var storyline = new Storyline();
    var kid = new Actor(name: "kid", team: 3, 
        pronoun: Pronoun.IT);
    var toy = new Actor(name: "toy", team: 4, 
            pronoun: Pronoun.IT);
    storyline.add("<subject> find<s> <object>", subject: kid,
        object: toy);
    storyline.add("<subject> lose<s> <object> again", subject: kid,
            object: toy, but: true);
    expect(storyline.toString().indexOf("it loses it"),
        -1);
  }); 
  
  test("ignore <owner's> when owner is null", () {
    var storyline = new Storyline();
    var player = new Player();
    var gun = new Actor(name: "front laser", team: Actor.FRIEND, 
                pronoun: Pronoun.IT);
    
    storyline.add("<subject> start<s> programming <owner's> <object> to fire",
            subject: player, object: gun);
    expect(storyline.toString().indexOf("<owner's>"),
        -1);
  });
  
  test("ignoring <owner's> at start of sentence doesn't screw up capitalization", () {
    var storyline = new Storyline();
    var player = new Player();
    var hull = new Actor(name: "hull", team: Actor.FRIEND, 
                pronoun: Pronoun.IT);
    
    storyline.add("<owner's> <subject> fail's to hit <object>",
            subject: player, object: hull);
    expect(storyline.toString(),
        matches("You.+"));
  }); 
  
  test("don't substitute pronoun when it was used in the same form", () {
    var storyline = new Storyline();
    var player = new Player();
    var gun = new Actor(name: "front laser", team: Actor.FRIEND, 
            pronoun: Pronoun.IT);
    var enemy = new Actor(name: "ship", team: Actor.DEFAULT_ENEMY, 
                pronoun: Pronoun.IT);
    storyline.add("<subject> start<s> programming <object> to fire",
        subject: player, object: gun);
    storyline.add("<subject> go<es> wide of <object>",
        subject: player, object: enemy);
    expect(storyline.toString().indexOf("wide of it"),
        -1);
  });
  
  test("add 'the' to common nouns (default for every Entity)", () {
    var storyline = new Storyline();
    var player = new Player();
    var apple = new Actor(name: "apple", pronoun: Pronoun.IT);
    storyline.add("<subject> pick<s> up <object>",
        subject: player, object: apple);
    expect(storyline.toString(),
        matches("You pick up the apple."));
  });
  
  test("don't use <owner's> to pronoun", () {
      var storyline = new Storyline();
      var player = new Player();
      var ship = new Actor(name: "Haijing", pronoun: Pronoun.IT);
      var part = new Actor(name: "main jet", pronoun: Pronoun.IT);
      storyline.add("<subject> hit<s> <object>",
          subject: player, object: part);
      storyline.add("<owner's> <subject> <is> damaged heavily",
          subject: part, owner: ship);
      expect(storyline.toString().indexOf("Haijing's it"),
          -1);
  });
  
  test("put 'and' between two sentences in a complex sentence", () {
      var storyline = new Storyline();
      var player = new Player();
      var gun = new Actor(name: "front laser", pronoun: Pronoun.IT);
      var ship = new Actor(name: "Haijing", pronoun: Pronoun.IT);
      storyline.add("<subject> take<s> hold of <object's> controls",
          subject: player, object: gun, time: 1);
      storyline.add("<subject> begin<s> to aim at <object>",
          subject: player, object: ship, time: 1);
      storyline.add("<subject> go<es> wide of <object>",
          subject: player, object: ship, time: 10);
      expect(storyline.toString(),
          matches("You take hold of the front laser's controls,? "
              "and begin to aim at the Haijing\..+"));
  });
  
  test("possessive", () {
    var storyline = new Storyline();
    var player = new Player();
    var gun = new Actor(name: "gun", team: Actor.FRIEND, 
        pronoun: Pronoun.IT);
    var enemy = new Actor(name: "enemy", team: Actor.DEFAULT_ENEMY, 
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
    Entity handkerchief = new Entity.withOptions("handkerchief");
    Entity brush = new Entity.withOptions("brush");
    Entity mirror = new Entity.withOptions("mirror");
    Entity lipstick = new Entity.withOptions("lipstick");
    Entity crateOfTnt = new Entity.withOptions("crate of TNT");
    
    void resetAlreadyMentioned() {
      handkerchief.alreadyMentioned = false;
      brush.alreadyMentioned = false;
      mirror.alreadyMentioned = false;
      lipstick.alreadyMentioned = false;
      crateOfTnt.alreadyMentioned = false;
    }
    
    // 0
    storyline.addEnumeration("you see", [], "here");
    expect(storyline.toString(), "");
    storyline.clear();
    // 1
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief here."));
    storyline.clear();
    // 2
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief, brush], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief and a brush here."));
    storyline.clear();
    // 3
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", 
        [handkerchief, brush, mirror], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here."));
    storyline.clear();
    // 4
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", 
        [handkerchief, brush, mirror, lipstick], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick here."));
    storyline.clear();
    // 5
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", 
        [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also
    resetAlreadyMentioned();
    storyline.addEnumeration("you <also> see", 
        [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You also see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also + no end
    resetAlreadyMentioned();
    storyline.addEnumeration("you <also> see", 
        [handkerchief, brush, mirror, lipstick, crateOfTnt], null);
    expect(storyline.toString(),
        matches("You see a handkerchief, a brush, and a mirror. "
            "You also see a lipstick and a crate of TNT."));
    storyline.clear();
  });
}