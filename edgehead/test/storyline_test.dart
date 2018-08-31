import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:test/test.dart';

void main() {
  test("simple storyline", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gorilla = Entity(
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
        storyline.realizeAsString(),
        matches("The ship trembles. There is something wrong with the "
            "engines. You gesture to Gorilla.+"
            "uns towards the engine room\."));
  });

  test("storyline.addParagraph", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gorilla = Entity(
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
    expect(storyline.realizeAsString(), contains("\n\n"));
  });

  test("fixing .\". in sentences", () {
    var storyline = Storyline();
    var gorilla = Entity(
        name: "Gorilla",
        nameIsProperNoun: true,
        team: playerTeam,
        pronoun: Pronoun.IT);
    storyline.add("<subject> enter<s> the room", subject: gorilla);
    storyline.add("<subject> say<s>: \"Isn't this great?\"",
        subject: gorilla, endSentence: true);
    expect(
        storyline.realizeAsString(), endsWith("says: \"Isn't this great?\""));
    storyline.clear();
    storyline.add("<subject> say<s>: \"Well, I think it's great.\"",
        subject: gorilla);
    expect(storyline.realizeAsString(),
        endsWith("says: \"Well, I think it's great.\""));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: \"Well? Say something!\"",
        subject: gorilla);
    expect(storyline.realizeAsString(),
        endsWith("exclaims: \"Well? Say something!\""));
  });

  test("fixing .'. in sentences", () {
    var storyline = Storyline();
    var gorilla =
        Entity(name: "Gorilla", team: playerTeam, pronoun: Pronoun.IT);
    storyline.add("<subject> enter<s> the room", subject: gorilla);
    storyline.add("<subject> say<s>: 'Isn't this great?'",
        subject: gorilla, endSentence: true);
    expect(storyline.realizeAsString(), endsWith("says: 'Isn't this great?'"));
    storyline.clear();
    storyline.add("<subject> say<s>: 'Well, I think it's great.'",
        subject: gorilla);
    expect(storyline.realizeAsString(),
        endsWith("says: 'Well, I think it's great.'"));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: 'Well? Say something!'",
        subject: gorilla);
    expect(storyline.realizeAsString(),
        endsWith("exclaims: 'Well? Say something!'"));
  });

  test("exchange", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var enemy =
        Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<subject> tr<ies> to hit <object> in the stomach",
        subject: player, object: enemy, time: 1);
    storyline.add("<subject> dodge<s> <object's> strike",
        subject: enemy, object: player, but: true, time: 2);
    storyline.add("<subject> hit<s> back",
        subject: enemy, object: player, positive: true, time: 3);
    storyline.add("<subject> break<s> <object's> nose",
        subject: enemy, object: player, positive: true, time: 4);
    expect(
        storyline.realizeAsString(),
        matches(
            "You try to hit the enemy in the stomach.+ he dodges your strike. "
            "He hits back.+ breaks your nose."));
  });

  test("substitute pronouns where proper ('he gives him the money')", () {
    var storyline = Storyline();
    var enemy = Entity(
        name: "John",
        nameIsProperNoun: true,
        team: Team((b) => b..id = 3),
        pronoun: Pronoun.HE);
    var enemy2 = Entity(
        name: "Jack",
        nameIsProperNoun: true,
        team: Team((b) => b..id = 4),
        pronoun: Pronoun.HE);
    storyline.add("<subject> meet<s> <object> at the station",
        subject: enemy, object: enemy2);
    storyline.add("<subject> give<s> <object> the money",
        subject: enemy, object: enemy2);
    expect(
        storyline.realizeAsString(),
        matches("John meets Jack at the station.+"
            "gives him the money."));
  });

  test("don't substitute pronouns where confusing ('it hits it')", () {
    var storyline = Storyline();
    var kid =
        Entity(name: "kid", team: Team((b) => b..id = 3), pronoun: Pronoun.IT);
    var toy =
        Entity(name: "toy", team: Team((b) => b..id = 4), pronoun: Pronoun.IT);
    storyline.add("<subject> find<s> <object>", subject: kid, object: toy);
    storyline.add("<subject> lose<s> <object> again",
        subject: kid, object: toy, but: true);
    expect(storyline.realizeAsString().indexOf("it loses it"), -1);
  });

  test("ignore <owner's> when owner is null", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gun =
        Entity(name: "front laser", team: playerTeam, pronoun: Pronoun.IT);

    storyline.add("<subject> start<s> programming <owner's> <object> to fire",
        subject: player, object: gun);
    expect(storyline.realizeAsString(), isNot(matches("<owner's>")));
  });

  test(
      "ignoring <owner's> at start of sentence doesn't screw up capitalization",
      () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var hull = Entity(name: "hull", team: playerTeam, pronoun: Pronoun.IT);

    storyline.add("<owner's> <subject> fail's to hit <object>",
        subject: player, object: hull);
    expect(storyline.realizeAsString(), matches("You.+"));
  });

  test("don't substitute pronoun when it was used in the same form", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gun =
        Entity(name: "front laser", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        Entity(name: "ship", team: defaultEnemyTeam, pronoun: Pronoun.IT);
    storyline.add("<subject> start<s> programming <object> to fire",
        subject: player, object: gun);
    storyline.add("<subject> go<es> wide of <object>",
        subject: player, object: enemy);
    expect(storyline.realizeAsString().indexOf("wide of it"), -1);
  });

  test("add 'the' to common nouns (default for every Entity)", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var apple = Entity(name: "apple", pronoun: Pronoun.IT);
    storyline.add("<subject> pick<s> up <object>",
        subject: player, object: apple);
    expect(storyline.realizeAsString(), matches("You pick up the apple."));
  });

  test("don't use <owner's> to pronoun", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var ship = Entity(name: "Haijing", pronoun: Pronoun.IT);
    var part = Entity(name: "main jet", pronoun: Pronoun.IT);
    storyline.add("<subject> hit<s> <object>", subject: player, object: part);
    storyline.add("<owner's> <subject> <is> damaged heavily",
        subject: part, owner: ship);
    expect(storyline.realizeAsString().indexOf("Haijing's it"), -1);
  });

  test("put 'and' between two sentences in a complex sentence", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gun = Entity(name: "front laser", pronoun: Pronoun.IT);
    var ship = Entity(name: "Haijing", pronoun: Pronoun.IT);
    storyline.add("<subject> take<s> hold of <object's> controls",
        subject: player, object: gun, time: 1);
    storyline.add("<subject> begin<s> to aim at <object>",
        subject: player, object: ship, time: 1);
    storyline.add("<subject> go<es> wide of <object>",
        subject: player, object: ship, time: 10);
    expect(
        storyline.realizeAsString(),
        matches("You take hold of the front laser's controls,? "
            "and begin to aim at the Haijing\..+"));
  });

  test("possessive", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gun = Entity(name: "gun", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<owner's> <subject> <is> pointed at <object>",
        owner: player, subject: gun, object: enemy, time: 1);
    storyline.add("<subject> fire<s>", subject: gun, time: 2);
    expect(storyline.realizeAsString(),
        matches("Your gun is pointed at the enemy.+t fires."));

    storyline.clear();
    var ship =
        Entity(name: "ship", team: defaultEnemyTeam, pronoun: Pronoun.SHE);
    storyline.add("<owner's> <subject> aim<s> <subject's> guns at <object>",
        owner: enemy, subject: ship, object: player);
    storyline.add("<owner's> <subject> <is> faster",
        owner: player, subject: gun, but: true);
    expect(storyline.realizeAsString(),
        matches("The enemy's ship aims her guns at you.+ your gun is faster."));
  });

  test("possesive particles works even with <objectOwner's> <object>", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gun = Entity(name: "gun", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add(
        "<owner's> <subject> <is> pointed at <objectOwner's> "
        "<object>",
        owner: player,
        subject: gun,
        object: enemy,
        time: 1);
    storyline.add("<subject> fire<s>", subject: gun, time: 2);
    expect(storyline.realizeAsString(),
        matches("Your gun is pointed at *the enemy.+t fires."));
  });

  test("we don't show 'your the sword' even if Randomly is involved", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var sword = Entity(name: "sword", pronoun: Pronoun.IT);
    var orc = Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<subject> pound<s> on <objectOwner's> {<object>|<object>!}",
        subject: orc, objectOwner: player, object: sword);
    expect(
        storyline.realizeAsString(), matches("The orc pounds on your sword."));
  });

  group("possessive pronoun", () {
    Storyline storyline;
    Entity player;
    Entity dog;
    const String template = "<subject> unleash<es> <subject's> <object>";

    setUp(() {
      storyline = Storyline();
      player = _createPlayer("Filip");
    });

    test("do show with common nouns", () {
      dog = Entity(name: "dog", pronoun: Pronoun.IT);
      storyline.add(template, subject: player, object: dog);
      expect(storyline.realizeAsString(), contains("your dog"));
    });

    test("don't show with proper nouns", () {
      dog = Entity(name: "Buster", nameIsProperNoun: true, pronoun: Pronoun.IT);
      storyline.add(template, subject: player, object: dog);
      expect(storyline.realizeAsString(), isNot(contains("your Buster")));
    });
  });

  test("we don't show 'his the scimitar' for <subject's> <object>", () {
    var storyline = Storyline();
    var orc = Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    var sword = Entity(name: "scimitar", pronoun: Pronoun.IT);
    orc.report(storyline, "<subject> drop<s> the whip");
    orc.report(storyline, "<subject> draw<s> <subject's> <object>",
        object: sword);
    expect(storyline.realizeAsString(), isNot(matches("his the scimitar")));
  });

  test(
      "we don't make subsequent <object> a pronoun when the first instance "
      "is actually a Randomly option", () {
    var player = _createPlayer("Filip");
    var orc = Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    for (int i = 0; i < 1000; i++) {
      var storyline = Storyline();
      storyline.add(
          "<subject> {punch<es> <object> in the eye|"
          "punch<es> <object's> eye}",
          subject: player,
          object: orc);
      expect(storyline.realizeAsString(), isNot(contains("his eye")));
    }
  });

  test("first paragraph", () {
    var storyline = Storyline();
    storyline.add("this is some lorem ipsum");
    storyline.add("and it doesn't make much sense");
    storyline.addParagraph();
    storyline.add("but it has two paragraphs");

    expect(storyline.hasManyParagraphs, isTrue);
    expect(storyline.realizeAsString(), contains("has two paragraphs"));
    expect(storyline.realizeAsString(onlyFirstParagraph: true),
        isNot(contains("has two paragraphs")));

    storyline.removeFirstParagraph();
    expect(storyline.hasManyParagraphs, isFalse);
    expect(storyline.realizeAsString(), isNot(contains("lorem ipsum")));
    expect(storyline.realizeAsString(), contains("has two paragraphs"));
  });

  test("nice flow ('briana stands up, orc swings at her')", () {
    var storyline = Storyline();
    var briana =
        Entity(name: "Briana", nameIsProperNoun: true, pronoun: Pronoun.SHE);
    var orc = Entity(name: "orc", pronoun: Pronoun.HE);
    storyline.add("<subject> stand<s> up", subject: briana);
    storyline.add("<subject> swing<s> at <object>",
        subject: orc, object: briana);

    expect(storyline.realizeAsString(), contains("swings at her"));
  });

  test("definitive (the) article after first use", () {
    var storyline = Storyline();
    Entity sword = Entity(name: "sword");
    storyline.markEntityAsUnmentioned(sword);
    Entity shield = Entity(name: "shield");
    storyline.markEntityAsUnmentioned(shield);

    storyline.add("<subject> l<ies> on the table", subject: sword, time: 0);
    storyline.add("<subject> <is> propped up on the wall next to it",
        subject: shield, time: 1);
    storyline.add("<subject> <is> rusty", subject: sword, time: 3);

    var first = storyline.realizeAsString();

    expect(first, startsWith("A sword lies"));
    expect(first, contains("The sword is rusty"));

    var second = storyline.realizeAsString();

    expect(second, startsWith("A sword lies"));
    expect(second, contains("The sword is rusty"));
  });

  test("enumeration", () {
    var storyline = Storyline();
    Entity handkerchief = Entity(name: "handkerchief");
    Entity brush = Entity(name: "brush");
    Entity mirror = Entity(name: "mirror");
    Entity lipstick = Entity(name: "lipstick");
    Entity crateOfTnt = Entity(name: "crate of TNT");

    void resetAlreadyMentioned() {
      storyline.markEntityAsUnmentioned(handkerchief);
      storyline.markEntityAsUnmentioned(brush);
      storyline.markEntityAsUnmentioned(mirror);
      storyline.markEntityAsUnmentioned(lipstick);
      storyline.markEntityAsUnmentioned(crateOfTnt);
    }

    // 0
    storyline.addEnumeration("you see", [], "here");
    expect(storyline.realizeAsString(), "");
    storyline.clear();
    // 1
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief], "here");
    expect(
        storyline.realizeAsString(), matches("You see a handkerchief here."));
    storyline.clear();
    // 2
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief, brush], "here");
    expect(storyline.realizeAsString(),
        matches("You see a handkerchief and a brush here."));
    storyline.clear();
    // 3
    resetAlreadyMentioned();
    storyline.addEnumeration("you see", [handkerchief, brush, mirror], "here");
    expect(storyline.realizeAsString(),
        matches("You see a handkerchief, a brush, and a mirror here."));
    storyline.clear();
    // 4
    resetAlreadyMentioned();
    storyline.addEnumeration(
        "you see", [handkerchief, brush, mirror, lipstick], "here");
    expect(
        storyline.realizeAsString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick here."));
    storyline.clear();
    // 5
    resetAlreadyMentioned();
    storyline.addEnumeration(
        "you see", [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
    expect(
        storyline.realizeAsString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also
    resetAlreadyMentioned();
    storyline.addEnumeration("you <also> see",
        [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
    expect(
        storyline.realizeAsString(),
        matches("You see a handkerchief, a brush, and a mirror here. "
            "You also see a lipstick and a crate of TNT here."));
    storyline.clear();
    // 5 + also + no end
    resetAlreadyMentioned();
    storyline.addEnumeration("you <also> see",
        [handkerchief, brush, mirror, lipstick, crateOfTnt], null);
    expect(
        storyline.realizeAsString(),
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
        var bigbang = Entity(name: "big bang");
        storyline.markEntityAsUnmentioned(bigbang);
        storyline.add("<subject> <is> heard from the distance",
            subject: bigbang);
        storyline.add("you shoot a duck", actionThread: threadA);
        expect(storyline.realizeAsString(), contains("aim at the sky"));
        expect(storyline.realizeAsString(), contains("shoot a duck"));
        storyline.clear();
      });

      test("not shown when next to another report of same actionThread", () {
        storyline.add("you aim at the sky",
            actionThread: threadA, isSupportiveActionInThread: true);
        storyline.add("you shoot a duck", actionThread: threadA);
        expect(storyline.realizeAsString(), isNot(contains("aim at the sky")));
        expect(storyline.realizeAsString(), contains("shoot a duck"));
        storyline.clear();
      });

      test(
          "not shown supportive action doesn't influence making subjects "
          "into pronouns", () {
        var player = _createPlayer("Filip");
        var enemy =
            Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
        storyline.add("<subject> aim<s> at <object>",
            subject: player,
            object: enemy,
            actionThread: threadA,
            isSupportiveActionInThread: true);
        storyline.add("<subject> shoot<s> <object>",
            subject: player, object: enemy, actionThread: threadA);
        expect(storyline.realizeAsString(), "You shoot the orc.");
        storyline.clear();
      });

      test("not shown when multiple supportive action reports together", () {
        storyline.add("you aim at the sky",
            actionThread: threadA, isSupportiveActionInThread: true);
        storyline.add("you look through the scopes",
            actionThread: threadA, isSupportiveActionInThread: true);
        storyline.add("you shoot a duck", actionThread: threadA);
        expect(storyline.realizeAsString(), isNot(contains("aim at the sky")));
        expect(storyline.realizeAsString(),
            isNot(contains("look through the scopes")));
        expect(storyline.realizeAsString(), contains("shoot a duck"));
        storyline.clear();
      });
    });
  });
}

/// The 'global' instance of Storyline.
///
/// Since Storyline started as a singleton pattern, these tests are written
/// with that in mind. TODO: pass storyline
Storyline storyline = Storyline();

Entity _createPlayer(String name) =>
    Entity(name: name, pronoun: Pronoun.YOU, team: playerTeam, isPlayer: true);
