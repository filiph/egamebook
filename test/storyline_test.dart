import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:test/test.dart';

void main() {
  test("simple storyline", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gorilla = new Entity(
        name: "Gorilla",
        nameIsProperNoun: true,
        team: playerTeam,
        pronoun: Pronoun.IT);
    storyline.add(
        "The ship trembles. There is something wrong with the engines.",
        wholeSentence: true,
        time: 0);
    storyline.add("<subject> gesture<s> to <subject's> <object>",
        subject: player, object: gorilla, time: 1);
    storyline.add("<subject> nod<s> at <object>",
        subject: gorilla, object: player, time: 2);
    storyline.add("<subject> run<s> towards the engine room",
        subject: gorilla, time: 3);
    expect(
        storyline.realize(),
        matches("The ship trembles. There is something wrong with the "
            "engines. You gesture to your Gorilla.+"
            "uns towards the engine room\."));
  });

  test("storyline.addParagraph", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gorilla = new Entity(
        name: "Gorilla",
        nameIsProperNoun: true,
        team: playerTeam,
        pronoun: Pronoun.IT);
    storyline.add(
        "The ship trembles. There is something wrong with the engines.",
        wholeSentence: true);
    storyline.addParagraph();
    storyline.add("<subject> gesture<s> to <subject's> <object>",
        subject: player, object: gorilla);
    expect(storyline.realize(), contains("\n\n"));
  });

  test("fixing .\". in sentences", () {
    var storyline = new Storyline();
    var gorilla = new Entity(
        name: "Gorilla",
        nameIsProperNoun: true,
        team: playerTeam,
        pronoun: Pronoun.IT);
    storyline.add("<subject> enter<s> the room", subject: gorilla);
    storyline.add("<subject> say<s>: \"Isn't this great?\"",
        subject: gorilla, endSentence: true);
    expect(storyline.realize(), endsWith("says: \"Isn't this great?\""));
    storyline.clear();
    storyline.add("<subject> say<s>: \"Well, I think it's great.\"",
        subject: gorilla);
    expect(
        storyline.realize(), endsWith("says: \"Well, I think it's great.\""));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: \"Well? Say something!\"",
        subject: gorilla);
    expect(storyline.realize(), endsWith("exclaims: \"Well? Say something!\""));
  });

  test("fixing .'. in sentences", () {
    var storyline = new Storyline();
    var gorilla =
        new Entity(name: "Gorilla", team: playerTeam, pronoun: Pronoun.IT);
    storyline.add("<subject> enter<s> the room", subject: gorilla);
    storyline.add("<subject> say<s>: 'Isn't this great?'",
        subject: gorilla, endSentence: true);
    expect(storyline.realize(), endsWith("says: 'Isn't this great?'"));
    storyline.clear();
    storyline.add("<subject> say<s>: 'Well, I think it's great.'",
        subject: gorilla);
    expect(storyline.realize(), endsWith("says: 'Well, I think it's great.'"));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: 'Well? Say something!'",
        subject: gorilla);
    expect(storyline.realize(), endsWith("exclaims: 'Well? Say something!'"));
  });

  test("exchange", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var enemy =
        new Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<subject> tr<ies> to hit <object> in the stomach",
        subject: player, object: enemy, time: 1);
    storyline.add("<subject> dodge<s> <object's> strike",
        subject: enemy, object: player, but: true, time: 2);
    storyline.add("<subject> hit<s> back",
        subject: enemy, object: player, positive: true, time: 3);
    storyline.add("<subject> break<s> <object's> nose",
        subject: enemy, object: player, positive: true, time: 4);
    expect(
        storyline.realize(),
        matches(
            "You try to hit the enemy in the stomach.+ he dodges your strike. "
            "He hits back.+ breaks your nose."));
  });

  test("substitute pronouns where proper ('he gives him the money')", () {
    var storyline = new Storyline();
    var enemy = new Entity(
        name: "John",
        nameIsProperNoun: true,
        team: new Team((b) => b..id = 3),
        pronoun: Pronoun.HE);
    var enemy2 = new Entity(
        name: "Jack",
        nameIsProperNoun: true,
        team: new Team((b) => b..id = 4),
        pronoun: Pronoun.HE);
    storyline.add("<subject> meet<s> <object> at the station",
        subject: enemy, object: enemy2);
    storyline.add("<subject> give<s> <object> the money",
        subject: enemy, object: enemy2);
    expect(
        storyline.realize(),
        matches("John meets Jack at the station.+"
            "gives him the money."));
  });

  test("don't substitute pronouns where confusing ('it hits it')", () {
    var storyline = new Storyline();
    var kid = new Entity(
        name: "kid", team: new Team((b) => b..id = 3), pronoun: Pronoun.IT);
    var toy = new Entity(
        name: "toy", team: new Team((b) => b..id = 4), pronoun: Pronoun.IT);
    storyline.add("<subject> find<s> <object>", subject: kid, object: toy);
    storyline.add("<subject> lose<s> <object> again",
        subject: kid, object: toy, but: true);
    expect(storyline.realize().indexOf("it loses it"), -1);
  });

  test("ignore <owner's> when owner is null", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gun =
        new Entity(name: "front laser", team: playerTeam, pronoun: Pronoun.IT);

    storyline.add("<subject> start<s> programming <owner's> <object> to fire",
        subject: player, object: gun);
    expect(storyline.realize(), isNot(matches("<owner's>")));
  });

  test(
      "ignoring <owner's> at start of sentence doesn't screw up capitalization",
      () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var hull = new Entity(name: "hull", team: playerTeam, pronoun: Pronoun.IT);

    storyline.add("<owner's> <subject> fail's to hit <object>",
        subject: player, object: hull);
    expect(storyline.realize(), matches("You.+"));
  });

  test("don't substitute pronoun when it was used in the same form", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gun =
        new Entity(name: "front laser", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        new Entity(name: "ship", team: defaultEnemyTeam, pronoun: Pronoun.IT);
    storyline.add("<subject> start<s> programming <object> to fire",
        subject: player, object: gun);
    storyline.add("<subject> go<es> wide of <object>",
        subject: player, object: enemy);
    expect(storyline.realize().indexOf("wide of it"), -1);
  });

  test("add 'the' to common nouns (default for every Entity)", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var apple = new Entity(name: "apple", pronoun: Pronoun.IT);
    storyline.add("<subject> pick<s> up <object>",
        subject: player, object: apple);
    expect(storyline.realize(), matches("You pick up the apple."));
  });

  test("don't use <owner's> to pronoun", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var ship = new Entity(name: "Haijing", pronoun: Pronoun.IT);
    var part = new Entity(name: "main jet", pronoun: Pronoun.IT);
    storyline.add("<subject> hit<s> <object>", subject: player, object: part);
    storyline.add("<owner's> <subject> <is> damaged heavily",
        subject: part, owner: ship);
    expect(storyline.realize().indexOf("Haijing's it"), -1);
  });

  test("put 'and' between two sentences in a complex sentence", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gun = new Entity(name: "front laser", pronoun: Pronoun.IT);
    var ship = new Entity(name: "Haijing", pronoun: Pronoun.IT);
    storyline.add("<subject> take<s> hold of <object's> controls",
        subject: player, object: gun, time: 1);
    storyline.add("<subject> begin<s> to aim at <object>",
        subject: player, object: ship, time: 1);
    storyline.add("<subject> go<es> wide of <object>",
        subject: player, object: ship, time: 10);
    expect(
        storyline.realize(),
        matches("You take hold of the front laser's controls,? "
            "and begin to aim at the Haijing\..+"));
  });

  test("possessive", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gun = new Entity(name: "gun", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        new Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<owner's> <subject> <is> pointed at <object>",
        owner: player, subject: gun, object: enemy, time: 1);
    storyline.add("<subject> fire<s>", subject: gun, time: 2);
    expect(storyline.realize(),
        matches("Your gun is pointed at the enemy.+t fires."));

    storyline.clear();
    var ship =
        new Entity(name: "ship", team: defaultEnemyTeam, pronoun: Pronoun.SHE);
    storyline.add("<owner's> <subject> aim<s> <subject's> guns at <object>",
        owner: enemy, subject: ship, object: player);
    storyline.add("<owner's> <subject> <is> faster",
        owner: player, subject: gun, but: true);
    expect(storyline.realize(),
        matches("The enemy's ship aims her guns at you.+ your gun is faster."));
  });

  test("possesive particles works even with <object-owner's> <object>", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var gun = new Entity(name: "gun", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        new Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add(
        "<owner's> <subject> <is> pointed at <object-owner's> "
        "<object>",
        owner: player,
        subject: gun,
        object: enemy,
        time: 1);
    storyline.add("<subject> fire<s>", subject: gun, time: 2);
    expect(storyline.realize(),
        matches("Your gun is pointed at *the enemy.+t fires."));
  });

  test("we don't show 'your the sword' even if Randomly is involved", () {
    var storyline = new Storyline();
    var player = new _Player("Filip");
    var sword = new Entity(name: "sword", pronoun: Pronoun.IT);
    var orc =
        new Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<subject> pound<s> on <object-owner's> {<object>|<object>!}",
        subject: orc, objectOwner: player, object: sword);
    expect(storyline.realize(), matches("The orc pounds on your sword."));
  });

  test(
      "we don't make subsequent <object> a pronoun when the first instance "
      "is actually a Randomly option", () {
    var player = new _Player("Filip");
    var orc =
        new Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    for (int i = 0; i < 1000; i++) {
      var storyline = new Storyline();
      storyline.add(
          "<subject> {punch<es> <object> in the eye|"
              "punch<es> <object's> eye}",
          subject: player,
          object: orc);
      expect(storyline.realize(), isNot(contains("his eye")));
    }
  });

  test("first paragraph", () {
    var storyline = new Storyline();
    storyline.add("this is some lorem ipsum");
    storyline.add("and it doesn't make much sense");
    storyline.addParagraph();
    storyline.add("but it has two paragraphs");

    expect(storyline.hasManyParagraphs, isTrue);
    expect(storyline.realize(), contains("has two paragraphs"));
    expect(storyline.realize(onlyFirstParagraph: true),
        isNot(contains("has two paragraphs")));

    storyline.removeFirstParagraph();
    expect(storyline.hasManyParagraphs, isFalse);
    expect(storyline.realize(), isNot(contains("lorem ipsum")));
    expect(storyline.realize(), contains("has two paragraphs"));
  });

  test("nice flow ('briana stands up, orc swings at her')", () {
    var storyline = new Storyline();
    var briana = new Entity(
        name: "Briana", nameIsProperNoun: true, pronoun: Pronoun.SHE);
    var orc = new Entity(name: "orc", pronoun: Pronoun.HE);
    storyline.add("<subject> stand<s> up", subject: briana);
    storyline.add("<subject> swing<s> at <object>",
        subject: orc, object: briana);

    expect(storyline.realize(), contains("swings at her"));
  });

  test("definitive (the) article after first use", () {
    var storyline = new Storyline();
    Entity sword = new Entity(name: "sword");
    storyline.markEntityAsUnmentioned(sword);
    Entity shield = new Entity(name: "shield");
    storyline.markEntityAsUnmentioned(shield);

    storyline.add("<subject> l<ies> on the table", subject: sword, time: 0);
    storyline.add("<subject> <is> propped up on the wall next to it",
        subject: shield, time: 1);
    storyline.add("<subject> <is> rusty", subject: sword, time: 3);

    var first = storyline.realize();

    expect(first, startsWith("A sword lies"));
    expect(first, contains("The sword is rusty"));

    var second = storyline.realize();

    expect(second, startsWith("A sword lies"));
    expect(second, contains("The sword is rusty"));
  });

  test("enumeration", () {
    var storyline = new Storyline();
    Entity handkerchief = new Entity(name: "handkerchief");
    Entity brush = new Entity(name: "brush");
    Entity mirror = new Entity(name: "mirror");
    Entity lipstick = new Entity(name: "lipstick");
    Entity crateOfTnt = new Entity(name: "crate of TNT");

    void resetAlreadyMentioned() {
      storyline.markEntityAsUnmentioned(handkerchief);
      storyline.markEntityAsUnmentioned(brush);
      storyline.markEntityAsUnmentioned(mirror);
      storyline.markEntityAsUnmentioned(lipstick);
      storyline.markEntityAsUnmentioned(crateOfTnt);
    }

    // 0
    storyline.addEnumeration("you see", [], "here");
    expect(storyline.realize(), "");
    storyline.clear();
    // 1
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief], "here");
    expect(storyline.realize(), matches("You see a handkerchief here."));
    storyline.clear();
    // 2
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief, brush], "here");
    expect(storyline.realize(),
        matches("You see a handkerchief and a brush here."));
    storyline.clear();
    // 3
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief, brush, mirror], "here");
    expect(storyline.realize(),
        matches("You see a handkerchief, a brush, and a mirror here."));
    storyline.clear();
    // 4
    resetAlreadyMentioned();
    storyline.addEnumeration(
        "you see", [handkerchief, brush, mirror, lipstick], "here");
    expect(
        storyline.realize(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick here."));
    storyline.clear();
    // 5
    resetAlreadyMentioned();
    storyline.addEnumeration(
        "you see", [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
    expect(
        storyline.realize(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also
    resetAlreadyMentioned();
    storyline.addEnumeration("you <also> see",
        [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
    expect(
        storyline.realize(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You also see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also + no end
    resetAlreadyMentioned();
    storyline.addEnumeration("you <also> see",
        [handkerchief, brush, mirror, lipstick, crateOfTnt], null);
    expect(
        storyline.realize(),
        matches("You see a handkerchief, a brush, and a mirror. "
            "You also see a lipstick and a crate of TNT."));
    storyline.clear();
  });

  group("actionThread", () {
    group("isSupportiveActionInThread", () {
      var threadA = 42;

      test("shows normally when apart", () {
        storyline.add("you aim at the sky",
            actionThread: threadA, isSupportiveActionInThread: true);
        var bigbang = new Entity(name: "big bang");
        storyline.markEntityAsUnmentioned(bigbang);
        storyline.add("<subject> <is> heard from the distance",
            subject: bigbang);
        storyline.add("you shoot a duck", actionThread: threadA);
        expect(storyline.realize(), contains("aim at the sky"));
        expect(storyline.realize(), contains("shoot a duck"));
        storyline.clear();
      });

      test("not shown when next to another report of same actionThread", () {
        storyline.add("you aim at the sky",
            actionThread: threadA, isSupportiveActionInThread: true);
        storyline.add("you shoot a duck", actionThread: threadA);
        expect(storyline.realize(), isNot(contains("aim at the sky")));
        expect(storyline.realize(), contains("shoot a duck"));
        storyline.clear();
      });

      test(
          "not shown supportive action doesn't influence making subjects "
          "into pronouns", () {
        var player = new _Player("Filip");
        var enemy = new Entity(
            name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
        storyline.add("<subject> aim<s> at <object>",
            subject: player,
            object: enemy,
            actionThread: threadA,
            isSupportiveActionInThread: true);
        storyline.add("<subject> shoot<s> <object>",
            subject: player, object: enemy, actionThread: threadA);
        expect(storyline.realize(), "You shoot the orc.");
        storyline.clear();
      });

      test("not shown when multiple supportive action reports together", () {
        storyline.add("you aim at the sky",
            actionThread: threadA, isSupportiveActionInThread: true);
        storyline.add("you look through the scopes",
            actionThread: threadA, isSupportiveActionInThread: true);
        storyline.add("you shoot a duck", actionThread: threadA);
        expect(storyline.realize(), isNot(contains("aim at the sky")));
        expect(storyline.realize(), isNot(contains("look through the scopes")));
        expect(storyline.realize(), contains("shoot a duck"));
        storyline.clear();
      });
    });
  });
}

/// The 'global' instance of Storyline.
///
/// Since Storyline started as a singleton pattern, these tests are written
/// with that in mind. TODO: pass storyline
Storyline storyline = new Storyline();

class _Player extends Entity {
  _Player(String name)
      : super(
            name: name, pronoun: Pronoun.YOU, team: playerTeam, isPlayer: true);
}
