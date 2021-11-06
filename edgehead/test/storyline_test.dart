import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/storyline/shadow_graph/shadow_graph.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:test/test.dart';

import 'src/test_random.dart';

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
        matches(r"The ship trembles\. There is something wrong with the "
            r"engines\. I gesture to Gorilla.+"
            r"uns towards the engine room\."));
  });

  test('I am not', () {
    var storyline = Storyline();
    storyline.add("<subject> <isn't> fooled", subject: _createPlayer('Filip'));
    expect(storyline.realizeAsString(), contains('m not'));
    expect(storyline.realizeAsString(), isNot(contains('amn\'t')));
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
    expect(storyline.realizeAsString(), endsWith("says: “Isn’t this great?”"));
    storyline.clear();
    storyline.add("<subject> say<s>: \"Well, I think it's great.\"",
        subject: gorilla);
    expect(storyline.realizeAsString(),
        endsWith("says: “Well, I think it’s great.”"));
    storyline.clear();
    storyline.add("<subject> exclaim<s>: \"Well? Say something!\"",
        subject: gorilla);
    expect(storyline.realizeAsString(),
        endsWith("exclaims: “Well? Say something!”"));
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
        subject: enemy, positive: true, time: 3);
    storyline.add("<subject> break<s> <object's> nose",
        subject: enemy, object: player, positive: true, time: 4);
    expect(
        storyline.realizeAsString(),
        matches("I try to hit the enemy in the stomach.+ he dodges my strike"
            ".+ hits back.+ breaks my nose."));
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
    expect(storyline.realizeAsString(), matches("I pick up the apple."));
  });

  test("don't use <owner's> to pronoun", () {
    var player = _createPlayer("Filip");
    var ship = Entity(name: "Haijing", pronoun: Pronoun.IT);
    var part =
        Entity(name: "main jet", pronoun: Pronoun.IT, firstOwnerId: ship.id);
    var storyline = Storyline(referredEntities: [player, ship, part]);
    storyline.add("<subject> hit<s> <object>", subject: player, object: part);
    storyline.add("<owner's> <subject> <is> damaged heavily",
        subject: part, owner: ship);
    final result = storyline.realizeAsString();
    expect(result, isNot(contains("Haijing's it")));
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
        matches(r".+I begin to aim at the Haijing,? "
            "and go wide of.+"));
  });

  test("don't omit in second sentence if first one has <is>", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    storyline.add("<subject> <is> ready to attack", subject: player);
    storyline.add("<subject> fire<s>", subject: player);
    final result = storyline.realizeAsString();
    expect(result, isNot(contains("and fire")));
    expect(result, contains("I fire"));
  });

  test("possessive", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var gun = Entity(name: "gun", team: playerTeam, pronoun: Pronoun.IT);
    var enemy =
        Entity(name: "enemy", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<object2's> <subject> <is> pointed at <object>",
        object2: player, subject: gun, object: enemy, time: 1);
    storyline.add("<subject> fire<s>", subject: gun, time: 2);
    expect(storyline.realizeAsString(),
        matches("My gun is pointed at the enemy.+t fires."));

    storyline.clear();
    var ship =
        Entity(name: "ship", team: defaultEnemyTeam, pronoun: Pronoun.SHE);
    storyline.add("<object2's> <subject> aim<s> <subject's> guns at <object>",
        object2: enemy, subject: ship, object: player);
    storyline.add("<object2's> <subject> <is> faster",
        object2: player, subject: gun, but: true);
    expect(storyline.realizeAsString(),
        matches("The enemy’s ship aims her guns at me.+ my gun is faster."));
  });

  test("we don't show 'my the sword' even if Randomly is involved", () {
    var storyline = Storyline();
    var player = _createPlayer("Filip");
    var sword = Entity(name: "sword", pronoun: Pronoun.IT);
    var orc = Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
    storyline.add("<subject> pound<s> on <object2's> {<object>|<object>!}",
        subject: orc, object2: player, object: sword);
    expect(storyline.realizeAsString(), matches("The orc pounds on my sword."));
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
      expect(storyline.realizeAsString(), contains("my dog"));
    });

    test("don't show with proper nouns", () {
      dog = Entity(name: "Buster", nameIsProperNoun: true, pronoun: Pronoun.IT);
      storyline.add(template, subject: player, object: dog);
      expect(storyline.realizeAsString(), isNot(contains("my Buster")));
    });
  });

  group('vs definitive article (no \'his the scimitar\')', () {
    Storyline storyline;
    Entity orc;
    Entity sword;

    setUp(() {
      storyline = Storyline();
      orc = Entity(name: "orc", pronoun: Pronoun.HE);
      sword = Entity(name: "scimitar");
    });

    test("for <subject's> <object>", () {
      orc.report(storyline, "<subject> draw<s> <subject's> <object>",
          object: sword);
      expect(storyline.realizeAsString(), isNot(matches("his the scimitar")));
    });

    test("for <subject's> <object2>", () {
      orc.report(storyline, "<subject> draw<s> <subject's> <object2>",
          object2: sword);
      expect(storyline.realizeAsString(), isNot(matches("his the scimitar")));
    });

    test("for grab <object> by <object's> <object2>", () {
      var goblin = Actor.initialized(4123, testRandomIdGetter, "goblin",
          pronoun: Pronoun.HE);
      assert(goblin.anatomy.weaponAppendage.name == 'right hand');

      orc.report(
          storyline, "<subject> grab<s> <object> by <object's> <object2>",
          object: goblin, object2: goblin.anatomy.weaponAppendage);
      expect(storyline.realizeAsString(), isNot(matches("his the right hand")));
    });

    test("for <object's> <object2>", () {
      var goblin = Entity(name: "goblin");
      orc.report(storyline, "<subject> draw<s> <object's> <object2>",
          object: goblin, object2: sword);
      expect(storyline.realizeAsString(), isNot(matches("his the scimitar")));
    });

    test("for <object2> pronoun (no 'the it')", () {
      var goblin = Entity(name: "goblin", pronoun: Pronoun.HE);
      var vees =
          Entity(name: "Vees", pronoun: Pronoun.HE, nameIsProperNoun: true);
      var spear = Entity(name: "spear");
      var shield = Entity(name: "shield");
      goblin.report(storyline, "<subject> cast<s> <object2> at <object>",
          object: vees, object2: spear);
      vees.report(
          storyline,
          "<subject> stop<s> <object> "
          "with <object2>",
          object: spear,
          object2: shield);
      expect(storyline.realizeAsString(), isNot(matches("the it")));
      expect(storyline.realizeAsString(), matches("stops it"));
    });
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

  test("'they bite' (not bites)", () {
    var storyline = Storyline();
    var enemy = Actor.initialized(42, testRandomIdGetter, "Tamara",
        nameIsProperNoun: true);

    storyline.add("<object2's> <subject> {snap<s> at|bite<s>} empty air",
        subject: enemy.anatomy.findByDesignation(BodyPartDesignation.teeth),
        object2: enemy);
    expect(
        storyline.realizeAsString(),
        isIn([
          "Tamara’s teeth bite empty air.",
          "Tamara’s teeth snap at empty air."
        ]));
  });

  test("he has his dagger and his shield", () {
    var storyline = Storyline();
    var actorId = 42;
    var a = Actor.initialized(actorId, testRandomIdGetter, 'Leroy',
        nameIsProperNoun: true, pronoun: Pronoun.HE);
    var npc = a.rebuild((b) => b
      ..inventory.equip(
          Item.weapon(50, WeaponType.dagger,
              adjective: 'trusty', firstOwnerId: actorId),
          a.anatomy)
      ..inventory.currentShield = Item.weapon(60, WeaponType.shield,
          adjective: 'heavy', firstOwnerId: actorId));

    npc.report(storyline, "<subject> <has> <subjectPronoun's> <object>",
        object: npc.currentWeapon);
    npc.report(storyline, "<subject> <has> <subjectPronoun's> <object>",
        object: npc.currentShield);

    final result = storyline.realizeAsString();
    expect(result, contains("Leroy has his dagger"));
    expect(result, isNot(contains("and has his shield.")));
    expect(result, contains("and his shield"));
  });

  group("enumeration", () {
    Storyline storyline;
    Entity handkerchief = Entity(name: "handkerchief");
    Entity brush = Entity(name: "brush");
    Entity mirror = Entity(name: "mirror");
    Entity lipstick = Entity(name: "lipstick");
    Entity crateOfTnt = Entity(name: "crate of TNT");

    setUp(() {
      storyline = Storyline();

      // Make all entities unmentioned.
      storyline.markEntityAsUnmentioned(handkerchief);
      storyline.markEntityAsUnmentioned(brush);
      storyline.markEntityAsUnmentioned(mirror);
      storyline.markEntityAsUnmentioned(lipstick);
      storyline.markEntityAsUnmentioned(crateOfTnt);
    });

    test('throws with no elements', () {
      expect(() => storyline.addEnumeration("you see", [], "here"),
          throwsArgumentError);
    });

    test('one element', () {
      storyline.addEnumeration("you see", [handkerchief], "here");
      expect(
          storyline.realizeAsString(), matches("You see a handkerchief here."));
    });

    test('two elements', () {
      storyline.addEnumeration("you see", [handkerchief, brush], "here");
      expect(storyline.realizeAsString(),
          matches("You see a handkerchief and a brush here."));
    });

    test('three elements', () {
      storyline.addEnumeration(
          "you see", [handkerchief, brush, mirror], "here");
      expect(storyline.realizeAsString(),
          matches("You see a handkerchief, a brush, and a mirror here."));
    });

    test('four elements', () {
      storyline.addEnumeration(
          "you see", [handkerchief, brush, mirror, lipstick], "here");
      expect(
          storyline.realizeAsString(),
          matches("You see a handkerchief, a brush, and a mirror here. "
              "You see a lipstick here."));
    });

    test('five elements', () {
      storyline.addEnumeration("you see",
          [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
      expect(
          storyline.realizeAsString(),
          matches("You see a handkerchief, a brush, and a mirror here. "
              "You see a lipstick and a crate of TNT here."));
    });

    test('five elements and <also>', () {
      storyline.addEnumeration("you <also> see",
          [handkerchief, brush, mirror, lipstick, crateOfTnt], "here");
      expect(
          storyline.realizeAsString(),
          matches("You see a handkerchief, a brush, and a mirror here. "
              "You also see a lipstick and a crate of TNT here."));
    });

    test('five elements, <also>, and no end', () {
      storyline.addEnumeration("you <also> see",
          [handkerchief, brush, mirror, lipstick, crateOfTnt], null);
      expect(
          storyline.realizeAsString(),
          matches("You see a handkerchief, a brush, and a mirror. "
              "You also see a lipstick and a crate of TNT."));
    });

    test('implicit entity', () {
      storyline.addEnumeration(
          "", [handkerchief, brush, mirror, lipstick], "<is> <also> here");
      expect(
          storyline.realizeAsString(),
          matches("A handkerchief, a brush, and a mirror are here. "
              "A lipstick is also here."));
    });
  });

  group("actionThread", () {
    Storyline storyline;
    var threadA = 42;

    setUp(() {
      storyline = Storyline();
    });

    test("summary doesn't show when thread is broken", () {
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("a dog walks by");
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("you kill the duck",
          actionThread: threadA, replacesThread: true);
      expect(storyline.realizeAsString(), contains("aim at the sky"));
      expect(storyline.realizeAsString(), contains("shoot the duck"));
      expect(storyline.realizeAsString(), isNot(contains("kill the duck")));
    });

    test("thread is shown even when thread is broken (no summary)", () {
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("someone calls you by name");
      expect(storyline.realizeAsString(), contains("aim at the sky"));
      expect(storyline.realizeAsString(), contains("shoot the duck"));
      expect(storyline.realizeAsString(), contains("calls you by name"));
    });

    test("summary doesn't show when start is missing", () {
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("you kill the duck",
          actionThread: threadA, replacesThread: true);
      expect(storyline.realizeAsString(), contains("shoot the duck"));
      expect(storyline.realizeAsString(), isNot(contains("kill the duck")));
    });

    test("summary replaces unbroken thread", () {
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("you kill the duck",
          actionThread: threadA, replacesThread: true);
      expect(storyline.realizeAsString(), isNot(contains("aim at the sky")));
      expect(storyline.realizeAsString(), contains("kill the duck"));
    });

    test("summary replaces unbroken thread but leaves leading non-thread be",
        () {
      storyline.add("things are going great");
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("you kill the duck",
          actionThread: threadA, replacesThread: true);
      expect(storyline.realizeAsString(), contains("going great"));
      expect(storyline.realizeAsString(), isNot(contains("aim at the sky")));
      expect(storyline.realizeAsString(), contains("kill the duck"));
    });

    test(
        "not shown supportive actions don't influence making subjects "
        "into pronouns in summary", () {
      var storyline = Storyline();
      var player = _createPlayer("Filip");
      var enemy =
          Entity(name: "orc", team: defaultEnemyTeam, pronoun: Pronoun.HE);
      storyline.add("<subject> aim<s> at <object>",
          subject: player,
          object: enemy,
          actionThread: threadA,
          startsThread: true);
      storyline.add("<subject> shoot<s> <object>",
          subject: player, object: enemy, actionThread: threadA);
      storyline.add("<subject> shoot<s> <object>",
          subject: player,
          object: enemy,
          actionThread: threadA,
          replacesThread: true);
      expect(storyline.realizeAsString(), "I shoot the orc.");
    });

    test("summary doesn't affect following reports", () {
      var threadB = 12345;
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("you kill the duck",
          actionThread: threadA, replacesThread: true);
      storyline.add("a dog barks at me",
          actionThread: threadB, startsThread: true);
      storyline.add("but I ignore it", actionThread: threadB);
      expect(storyline.realizeAsString(), isNot(contains("aim at the sky")));
      expect(storyline.realizeAsString(), contains("kill the duck"));
      expect(storyline.realizeAsString(), contains("dog barks at me"));
      expect(storyline.realizeAsString(), contains("I ignore it"));
    });

    test("throws when multiple starting action reports are together", () {
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("you look through the scopes",
          actionThread: threadA, startsThread: true);
      storyline.add("you shoot the duck", actionThread: threadA);
      expect(() => storyline.realizeAsString(), throwsStateError);
    });

    test("prints all summary action reports when together", () {
      storyline.add("you aim at the sky",
          actionThread: threadA, startsThread: true);
      storyline.add("you look through the scopes", actionThread: threadA);
      storyline.add("you shoot the duck", actionThread: threadA);
      storyline.add("the duck dies", actionThread: threadA);
      storyline.add("you shoot the duck",
          actionThread: threadA, replacesThread: true);
      storyline.add("and kill it", actionThread: threadA, replacesThread: true);
      expect(storyline.realizeAsString(), contains("shoot the duck"));
      expect(storyline.realizeAsString(), contains("kill it"));
    });
  });

  group('second object', () {
    Storyline storyline;
    Entity player;
    Entity rock;
    Entity goblin;

    setUp(() {
      storyline = Storyline();
      player = _createPlayer('Filip');
      rock = Entity(name: 'rock');
      goblin =
          Entity(name: 'goblin', pronoun: Pronoun.HE, team: defaultEnemyTeam);
    });

    test('is extracted', () {
      storyline.add("<subject> hit<s> <object> with <object2>",
          subject: player, object: goblin, object2: rock);
      expect(storyline.realizeAsString(), "I hit the goblin with the rock.");
    });

    test('makes pronouns', () {
      storyline.add("<subject> pick<s> up <object>",
          subject: player, object: rock);
      storyline.add("<subject> hit<s> <object> with <object2>",
          subject: player, object: goblin, object2: rock);
      var realized = storyline.realizeAsString();
      expect(realized, contains("I pick up the rock"));
      expect(realized, contains("hit the goblin with it"));
    });

    group('make pronouns even with two Pronoun.IT when not confusing', () {
      test('object2 stays object2', () {
        storyline.add(
            "<subject> throw<s> <subjectPronounSelf> at <object> "
            "with <object2>",
            subject: player,
            object: goblin,
            object2: rock);
        storyline.add("<subject> hit<s> <object> back with <object2>",
            subject: goblin, object: player, object2: rock);
        var realized = storyline.realizeAsString();
        expect(
            realized, contains("I throw myself at the goblin with the rock"));
        expect(realized, contains("hits me back with it"));
      });

      test('object becomes object2', () {
        final Entity statue = Entity(name: 'statue');
        storyline.add("<subject> pick<s> up <object>",
            subject: player, object: rock);
        storyline.add("<subject> hit<s> <object> with <object2>",
            subject: player, object: statue, object2: rock);
        var realized = storyline.realizeAsString();
        expect(realized, contains("I pick up the rock"));
        expect(realized, contains("hit the statue with it"));
      });

      test('object2 becomes object', () {
        storyline.add("<subject> cast<s> <object2> at <object>",
            subject: player, object: goblin, object2: rock);
        storyline.add("<subject> move<s> out of <object's> way",
            subject: goblin, object: rock);
        var realized = storyline.realizeAsString();
        expect(realized, contains("I cast the rock at the goblin"));
        expect(realized, contains("moves out of its way"));
      });
    });

    test('doesn\'t make pronouns when confusing', () {
      var statue = Entity(name: 'statue');

      storyline.add("<subject> examine<s> <object>",
          subject: player, object: statue);
      storyline.add("<subject> hit<s> <object> with <object2>",
          subject: player, object: statue, object2: rock);
      var realized = storyline.realizeAsString();
      expect(realized, contains("I examine the statue"));
      expect(realized, contains("hit it with the rock"));
    });
  });

  group('shadow graph', () {
    test('full 9-report story', () {
      // r 123456789
      // A -- --  --
      // B ---     -
      // C     -----
      // D    -
      //
      // The goblin captain kicks the orcish captain in the shin. (1)
      // The orcish captain avoids him and (he) regains balance. (2 + 3)
      // The goblin captain whistles at the giant and engages the warlock.
      //   (4 + 5)
      // The warlock prepares a spell and makes a clicking sound with
      //   his tongue. (6 + 7)
      // He lifts the goblin captain via telekinesis, and hurls him at
      //   the orcish one. (8 + 9)

      final a =
          Entity(name: 'captain', adjective: 'goblin', pronoun: Pronoun.HE);
      final b =
          Entity(name: 'captain', adjective: 'orcish', pronoun: Pronoun.HE);
      final c = Entity(name: 'warlock', pronoun: Pronoun.HE);
      final d = Entity(name: 'giant', pronoun: Pronoun.HE);

      final storyline = Storyline();
      storyline.add('<subject> kick<s> <object> in the shin',
          subject: a, object: b); // 1
      storyline.add('<subject> avoid<s> <object>', subject: b, object: a); // 2
      storyline.add('<subject> regain<s> balance', subject: b); // 3
      storyline.add('<subject> whistle<s> the <object>',
          subject: a, object: d); // 4
      storyline.add('<subject> engage<s> <object>', subject: a, object: c); // 5
      storyline.add('<subject> prepare<s> a spell', subject: c); // 6
      storyline.add('<subject> make<s> a clicking sound with his tongue',
          subject: c); // 7
      storyline.add('<subject> lifts<s> <object> via telekinesis',
          subject: c, object: a); // 8
      storyline.add('<subject> hurl<s> <object> at <object2>',
          subject: c, object: a, object2: b); // 9

      // Make sure Storyline has [Storyline.reports].
      storyline.realize();

      final graph = ShadowGraph.from(storyline);

      // print(graph.describe());
      // print(storyline.realizeAsString());

      expect(graph.qualifications, hasLength(9));
      expect(graph.joiners, hasLength(9));
      expect(graph.qualifications.first.subject, IdentifierLevel.adjectiveNoun);
      expect(graph.qualifications.first.object, IdentifierLevel.adjectiveNoun);
      expect(graph.joiners.first, SentenceJoinType.none);
      // Sentences 2 + 3.
      expect(graph.qualifications[1].subject, IdentifierLevel.adjectiveOne);
      expect(graph.joiners[2], SentenceJoinType.comma);
      expect(graph.conjunctions[2], SentenceConjunction.and);
      expect(graph.qualifications[2].subject, IdentifierLevel.omitted);
      // Last sentence.
      expect(graph.conjunctions.last, SentenceConjunction.and);
      expect(graph.qualifications.last.subject, IdentifierLevel.omitted);
      expect(graph.qualifications.last.object,
          anyOf(IdentifierLevel.pronoun, IdentifierLevel.adjectiveOne));
      expect(graph.qualifications.last.object2, IdentifierLevel.adjectiveOne);
    });

    test("doesn't add confusing pronoun", () {
      // The regression looked like this:
      //
      //     I pick his sword up and wield it, replacing the spear to my belt.
      //     The undead strikes down at the orc. The orc tries to roll out of
      //     the way but can't. His sword cuts his neck and he stops moving.
      //                        ^^^^^^^^^^^^^^^^^^^^^^^

      final aren =
          Entity(name: 'I', nameIsProperNoun: true, pronoun: Pronoun.I);
      final orc = Entity(name: 'orc', adjective: 'huge', pronoun: Pronoun.HE);
      final undead =
          Entity(name: 'undead', adjective: 'goblin', pronoun: Pronoun.HE);
      final orcSword =
          Entity(name: 'sword', adjective: 'serrated', firstOwnerId: orc.id);
      final undeadSword =
          Entity(name: 'sword', adjective: 'goblin', firstOwnerId: undead.id);

      final storyline = Storyline();
      aren.report(storyline, '<subject> pick<s> <object> up', object: orcSword);
      aren.report(storyline, '<subject> wield<s> <object>', object: orcSword);
      undead.report(storyline, '<subject> strike<s> down at <object>',
          object: orc);
      orc.report(storyline, '<subject> tr<ies> to roll out of the way');
      orc.report(storyline, "<subject> can't", but: true);
      storyline.add("<subject> cut<s> <object's> neck",
          subject: undeadSword, object: orc);

      // Make sure Storyline has [Storyline.reports].
      final result = storyline.realizeAsString();

      final graph = ShadowGraph.from(storyline);
      expect(
        result,
        isNot(
          contains(RegExp('His sword cuts his neck', caseSensitive: false)),
        ),
      );
      // We expect something else than "his sword".
      expect(graph.qualifications.last.owner, isNot(IdentifierLevel.pronoun));
    });
  });

  group('pronouns, nouns, adjectives', () {
    Storyline storyline;
    Entity a;
    Entity aBodyPart;
    Entity b;
    Entity bItem;
    Entity c;

    setUp(() {
      storyline = Storyline();
      a = Entity(name: 'goblin', adjective: 'red', pronoun: Pronoun.HE);
      aBodyPart = Entity(name: 'fist', pronoun: Pronoun.IT);
      b = Entity(name: 'goblin', adjective: 'blue', pronoun: Pronoun.HE);
      bItem = Entity(name: 'sword', pronoun: Pronoun.IT);
      c = Entity(name: 'orc', adjective: 'large', pronoun: Pronoun.HE);
    });

    test('A leaps at B. B dodges A.', () {
      storyline.add('<subject> leap<s> at <object>', subject: a, object: b);
      storyline.add('<subject> dodge<s> <object>', subject: b, object: a);

      final result = storyline.realizeAsString();
      expect(result, contains('The red goblin leaps at the blue'));
      expect(result, contains('dodges the red'));
    });

    test('A dodges B and swings at C.', () {
      storyline.add('<subject> dodge<s> <object>', subject: a, object: b);
      storyline.add('<subject> swing<s> at <object>', subject: a, object: c);

      final result = storyline.realizeAsString();
      expect(result, contains('The red goblin dodges the blue'));
      expect(result, isNot(contains('goblin swings at')));
      expect(result, contains('swings at the orc'));
    });

    test('A swings at B. A kills B.', () {
      storyline.add('<subject> swing<s> at <object>', subject: a, object: b);
      storyline.add('<subject> kill<s> <object>', subject: a, object: b);

      final result = storyline.realizeAsString();
      expect(result, contains('The red goblin swings at the blue'));
      expect(result, isNot(contains('goblin kills')));
      expect(
          result, contains(RegExp(r'(he|and) kills him', caseSensitive: true)));
    });

    test('A dodges B. B picks up C.', () {
      storyline.add('<subject> dodge<s> <object>', subject: a, object: b);
      storyline.add('<subject> pick<s> up <object>', subject: b, object: bItem);

      final result = storyline.realizeAsString();
      expect(result, contains('The red goblin dodges the blue'));
      expect(result,
          isNot(contains(RegExp(r'he picks up', caseSensitive: false))));
    });

    test('A swings at B. B deflects A\'s C.', () {
      storyline.add('<subject> swing<s> at <object>', subject: a, object: b);
      storyline.add('<subject> deflect<s> <object\'s> <object2>',
          subject: b, object: a, object2: aBodyPart);

      final result = storyline.realizeAsString();
      expect(result, matches(r'blue (goblin|one) deflects'));
      expect(result, contains("red one’s fist"));
    });

    test("A swings at B's C. A cuts across B's D.", () {
      final bBodyPart = Entity(name: 'neck');
      final bBodyPart2 = Entity(name: 'throat');
      storyline.add("<subject> swing<s> at <object's> <object2>",
          subject: a, object: b, object2: bBodyPart);
      storyline.add("<subject> cut<s> accross <object's> <object2>",
          subject: a, object: b, object2: bBodyPart2);

      final result = storyline.realizeAsString();

      final graph = ShadowGraph.from(storyline);
      expect(graph.qualifications.first.object, IdentifierLevel.adjectiveNoun);

      expect(
          result, matches(r"The red goblin swings at the blue goblin’s neck"));
      expect(result, contains('his throat'));
    });
  });

  group('two objects of same name', () {
    Storyline storyline;

    setUp(() {
      storyline = Storyline();
    });

    test('throws assert when two entities are exactly the same', () {
      var apple = Entity(name: 'apple');
      var anotherApple = Entity(name: 'apple');

      expect(
          () => storyline.add('<subject> lie<s> next to <object>',
              subject: apple, object: anotherApple),
          throwsA(isA<AssertionError>()));
    });

    group('does not use adjectives when not needed', () {
      group('items', () {
        test('in one sentence', () {
          var shinySword = Item(1, name: 'sword', adjective: 'shiny');
          var rustyKnife = Item(2, name: 'knife', adjective: 'rusty');

          storyline.add('<subject> lie<s> next to <object>',
              subject: shinySword, object: rustyKnife);

          expect(
              storyline.realizeAsString(), 'The sword lies next to the knife.');
        });

        test('in neighboring sentences', () {
          var shinySword = Item(1, name: 'sword', adjective: 'shiny');
          var rustyKnife = Item(2, name: 'knife', adjective: 'rusty');

          storyline.add('<subject> lie<s> on the ground', subject: shinySword);
          storyline.add('<subject> <is> on the table', subject: rustyKnife);

          expect(storyline.realizeAsString(),
              'The sword lies on the ground. The knife is on the table.');
        });
      });

      group('actors', () {
        test('in one sentence', () {
          var oldGoblin = Actor.initialized(1, testRandomIdGetter, "goblin",
              adjective: "old");
          var paleOrc = Actor.initialized(2, testRandomIdGetter, "orc",
              adjective: "pale");

          storyline.add('<subject> stand<s> next to <object>',
              subject: oldGoblin, object: paleOrc);

          expect(storyline.realizeAsString(),
              'The goblin stands next to the orc.');
        });

        test('in neighboring sentences', () {
          var oldGoblin = Actor.initialized(1, testRandomIdGetter, "goblin",
              adjective: "old");
          var paleOrc = Actor.initialized(2, testRandomIdGetter, "orc",
              adjective: "pale");

          storyline.add('<subject> lie<s> on the ground', subject: oldGoblin);
          storyline.add('<subject> sit<s> at the table', subject: paleOrc);

          expect(storyline.realizeAsString(),
              'The goblin lies on the ground. The orc sits at the table.');
        });
      });

      test('after something before needed an adjective', () {
        // Avoid: "The red orc hits the concrete floor. The ordinary orc
        // swings at my null leg."

        var aren = _createPlayer('Aren');
        var redOrc = Actor.initialized(60, testRandomIdGetter, "orc",
            adjective: "red", pronoun: Pronoun.HE);
        var ordinaryOrc = Actor.initialized(61, testRandomIdGetter, "orc",
            adjective: "ordinary", pronoun: Pronoun.HE);
        storyline.add('<subject> hit<s> the concrete floor', subject: redOrc);
        storyline.add(
          "<subject> swing<s> at <objectOwner's> <object>",
          subject: ordinaryOrc,
          objectOwner: aren,
          object: BodyPart(1001, "leg", firstOwnerId: aren.id),
        );

        final result = storyline.realizeAsString();
        expect(result, isNot(contains('null leg')));
      });
    });

    group('uses adjectives when needed', () {
      group('items', () {
        test('in one sentence', () {
          var shinySword = Item(1, name: 'sword', adjective: 'shiny');
          var rustySword = Item(2, name: 'sword', adjective: 'rusty');

          storyline.add('<subject> lie<s> next to <object>',
              subject: shinySword, object: rustySword);

          expect(storyline.realizeAsString(),
              'The shiny sword lies next to the rusty sword.');
        });

        test('in neighboring sentences', () {
          var shinySword = Item(1, name: 'sword', adjective: 'shiny');
          var rustySword = Item(2, name: 'sword', adjective: 'rusty');

          storyline.add('<subject> lie<s> on the ground', subject: shinySword);
          storyline.add('<subject> <is> on the table', subject: rustySword);

          expect(
              storyline.realizeAsString(),
              'The shiny sword lies on the ground. '
              'The rusty sword is on the table.');
        });
      });

      group('actors', () {
        test('in one sentence', () {
          var oldGoblin = Actor.initialized(1, testRandomIdGetter, "goblin",
              adjective: "old");
          var paleGoblin = Actor.initialized(2, testRandomIdGetter, "goblin",
              adjective: "pale");

          storyline.add('<subject> stand<s> next to <object>',
              subject: oldGoblin, object: paleGoblin);

          expect(storyline.realizeAsString(),
              'The old goblin stands next to the pale goblin.');
        });

        test('in neighboring sentences', () {
          var oldGoblin = Actor.initialized(1, testRandomIdGetter, "goblin",
              adjective: "old");
          var paleGoblin = Actor.initialized(2, testRandomIdGetter, "goblin",
              adjective: "pale");

          storyline.add('<subject> lie<s> on the ground', subject: oldGoblin);
          storyline.add('<subject> sit<s> at the table', subject: paleGoblin);

          expect(
              storyline.realizeAsString(),
              'The old goblin lies on the ground. '
              'The pale goblin sits at the table.');
        });
      });

      group('sequence', () {
        test('put the adjective to the first occurence', () {
          // Avoid "I dodge the orc and the red orc hits the concrete floor."

          var aren = _createPlayer('Aren');
          var redOrc = Actor.initialized(60, testRandomIdGetter, "orc",
              adjective: "red", pronoun: Pronoun.HE);
          var ordinaryOrc = Actor.initialized(61, testRandomIdGetter, "orc",
              adjective: "ordinary", pronoun: Pronoun.HE);
          storyline.add('<subject> dodge<s> <object>',
              subject: aren, object: redOrc);
          storyline.add('<subject> hit<s> the concrete floor', subject: redOrc);
          storyline.add('<subject> yawn<s>', subject: ordinaryOrc);

          final result = storyline.realizeAsString();
          expect(result, contains('I dodge the red orc'));
          expect(result, contains('he hits'));
        });
      });
    });

    group('firstOwnerId', () {
      Entity aren;
      Actor orc;
      Actor goblin;
      Item mySword;
      Item myAxe;
      Item orcSword;
      Item goblinRustySword;
      Item orcShinySword;
      Storyline storyline;

      setUp(() {
        aren = _createPlayer('Aren');
        orc = Actor.initialized(60, testRandomIdGetter, "orc",
            adjective: "red", pronoun: Pronoun.HE);
        goblin = Actor.initialized(70, testRandomIdGetter, "goblin",
            pronoun: Pronoun.HE);
        mySword = Item.weapon(100, WeaponType.sword,
            adjective: 'serrated', firstOwnerId: aren.id);
        myAxe = Item.weapon(101, WeaponType.axe,
            adjective: 'dirty', firstOwnerId: aren.id);
        orcSword = Item.weapon(110, WeaponType.sword,
            adjective: 'orcish', firstOwnerId: orc.id);
        goblinRustySword = Item.weapon(120, WeaponType.sword,
            adjective: 'rusty', firstOwnerId: goblin.id);
        orcShinySword = Item.weapon(130, WeaponType.sword,
            adjective: 'shiny', firstOwnerId: orc.id);

        // Make sure all actors are accounted for in storyline.
        storyline = Storyline(referredEntities: [aren, orc, goblin]);
      });

      test('is used when needed', () {
        storyline.add('<subject> hit<s> <object> with <object2>',
            subject: aren, object: orcSword, object2: mySword);

        final result = storyline.realizeAsString();
        expect(result, contains('the orc’s sword'));
        expect(result, contains('with my'));
      });

      test('uses pronouns where it should', () {
        // Prevent: The goblin swings the goblin's sword.
        storyline.add('<subject> swing<s> <object> at <object2>',
            subject: goblin, object: goblinRustySword, object2: orcShinySword);

        final result = storyline.realizeAsString();
        expect(result, contains('The goblin swings his sword'));
      });

      test('replaces adjectives', () {
        // Prevent: The goblin swings his rusty sword at the orc's shiny sword.
        storyline.add('<subject> swing<s> <object> at <object2>',
            subject: goblin, object: goblinRustySword, object2: orcShinySword);

        final result = storyline.realizeAsString();
        expect(result, isNot(contains('rusty')));
        expect(result, isNot(contains('shiny')));
      });

      test('works even for unmentioned entities', () {
        storyline.add('<subject> swing<s> <object> at <object2>',
            subject: aren, object: orcSword, object2: goblinRustySword);

        final result = storyline.realizeAsString();
        expect(result, isNot(contains('rusty')));
        expect(result, isNot(contains('shiny')));
        expect(result, contains('orc’s sword'));
        expect(result, contains('goblin’s sword'));
      });

      test(
          'the unmentioned added entity is counted '
          'for identifier resolution', () {
        // Prevents: "The sixty-fiver slashes the undead's right shoulder.
        // He freezes for a while and briefly looks at the wound, studying it."
        storyline.add('<subject> wheel<s> around', subject: goblin);
        storyline.add('<subject> do<es> the same', subject: aren);
        storyline.add("<subject> slash<es> <objectOwner's> <object>",
            subject: orc,
            objectOwner: goblin,
            object: goblin.anatomy.primaryWeaponAppendage);
        storyline.add('<subject> freeze<s> for a while', subject: goblin);

        final result = storyline.realizeAsString();
        expect(result, contains("goblin’s"));
        expect(result, isNot(contains('he freezes')));
      });

      test('isn\'t used when not needed', () {
        storyline.add('<subject> hit<s> <object> with <object2>',
            subject: aren, object: orcSword, object2: myAxe);

        final result = storyline.realizeAsString();
        expect(result, contains('the sword'));
        expect(result, isNot(contains('with my')));
        expect(result, contains('the axe'));
      });

      test('isn\t used when there\'s already <owner> in the text', () {
        storyline.add(
            '<subject> hit<s> <objectOwner\'s> <object> with <object2>',
            subject: aren,
            object: orcSword,
            objectOwner: orc,
            object2: mySword);

        final result = storyline.realizeAsString();
        expect(result, contains('hit the orc’s sword'));
      });
    });
  });

  test('second <object> is a pronoun', () {
    final aren = _createPlayer('Aren');
    final sword = Entity(name: 'sword');
    final storyline = Storyline();

    storyline.add(
        "<subject> catch<es> <object> as <object> flies "
        "towards <subjectPronounAccusative>",
        subject: aren,
        object: sword);

    final result = storyline.realizeAsString();
    expect(result, contains('as it flies'));
  });

  test('longer storyline', () {
    final aren = Entity(name: "Aren", pronoun: Pronoun.I, isPlayer: true);
    final arenSword = Entity(name: "sword");
    final orc = Entity(name: "orc", pronoun: Pronoun.HE);
    final orcTorso =
        Entity(name: "torso", pronoun: Pronoun.IT, firstOwnerId: orc.id);
    final goblin = Entity(name: "goblin", pronoun: Pronoun.HE);

    final storyline =
        Storyline(referredEntities: [aren, arenSword, orc, orcTorso, goblin]);
    storyline.add("<subject> thrust<s> <object2> at <objectOwner's> <object>",
        subject: aren, object2: arenSword, objectOwner: orc, object: orcTorso);

    storyline.add(
        "<subject> {jump<s>|leap<s>} {back|backward} "
        "but <subject> <is> {not fast enough|too slow}",
        subject: orc);

    storyline.add(
        "<subject> {pierce<s>|stab<s>|bore<s> through} "
        "<object's> {abdomen|belly|chest|upper body}",
        subject: aren,
        object: orc);

    storyline.add("<subject> turn<s> to <object>",
        subject: orc, object: goblin);

    final result = storyline.realizeAsString();
    expect(result, contains('thrust the sword'));
    expect(result, contains('turns to the goblin'));
  });

  test('sentence verb type (is something vs do something)', () {
    final goblin = Entity(name: "goblin", pronoun: Pronoun.HE);

    final storyline = Storyline();
    storyline.add("<subject> leap<s> backwards", subject: goblin);
    storyline.add("<subject> <is> too slow", subject: goblin, but: true);

    final result = storyline.realizeAsString();
    expect(result, contains('goblin leaps'));
    expect(result, contains('he is too slow'));
  });

  test("don't omit when a sentence doesn't start with <subject>", () {
    final leroy =
        Entity(name: "Leroy", nameIsProperNoun: true, pronoun: Pronoun.HE);

    final storyline1 = Storyline();
    storyline1.add("<subject> raise<s> from <subject's> chair", subject: leroy);
    storyline1.add("<subject> join<s> me", subject: leroy);

    expect(storyline1.realizeAsString(), contains("and joins me"));

    final storyline2 = Storyline();
    storyline2.add("<subject> raise<s> from <subject's> chair", subject: leroy);
    storyline2.add("in a few minutes, <subject> join<s> me", subject: leroy);

    expect(storyline2.realizeAsString(), contains("he joins me"));
  });

  test("add definitive articles before possessives", () {
    final undead = Entity(name: "undead", pronoun: Pronoun.HE);
    final goblin = Entity(name: "goblin", pronoun: Pronoun.HE);
    final goblinNeck = Entity(name: "neck", firstOwnerId: goblin.id);

    final storyline = Storyline();
    storyline.add("<subject> swing<s> at <objectOwner's> <object>",
        subject: undead, objectOwner: goblin, object: goblinNeck);

    final result = storyline.realizeAsString();
    expect(result, contains("the goblin’s neck"));
  });

  test("a sentence with clashing name throws", () {
    final sword = Entity(name: "sword");
    final rustySword = Entity(name: "sword", adjective: "rusty");
    final aren = _createPlayer("Aren");
    final goblin = Entity(name: "goblin", pronoun: Pronoun.HE);

    // This second name has an adjective, but the first one doesn't.
    // There is no way to resolve this sentence.
    final storyline = Storyline();
    storyline.add("<subject> throw<s> <object2> at <object>",
        subject: aren, object: goblin, object2: sword);
    storyline.add("<subject> deflect<s> it with <subject's> <object>",
        subject: goblin, object: rustySword);

    expect(storyline.realizeAsString, throwsA(anything));
  });

  test("using object2 doesn't report 'it' without explaining what it is", () {
    // I have seen the following during a playthrough. It turned out to be
    // a case of the goblin and his spear having the same id. Still, it's safer
    // to test this.
    //
    //     The goblin falls and screams in pain. The undead thrusts down
    //     with it at him and he tries to roll out of the way.

    final goblinRightLeg = Entity(name: "right leg", isCommon: true);
    final undead = Entity(name: "undead", pronoun: Pronoun.HE);
    final spear = Entity(name: "spear", isCommon: true);
    final goblin = Entity(name: "goblin", pronoun: Pronoun.HE);

    final storyline = Storyline();

    storyline.add("<subject> go<es> limp", subject: goblinRightLeg);
    storyline.add("<subject> fall<s>", subject: goblin);
    storyline.add("<subject> scream<s> in pain", subject: goblin);
    storyline.add("<subject> thrust<s> down with <object2> at <object>",
        subject: undead, object: goblin, object2: spear);

    final result = storyline.realizeAsString();
    expect(result, isNot(contains("with it")));
    expect(result, contains("with the spear at"));
  });

  group('smartifyQuotes', () {
    group('double quotes', () {
      test('whole sentence', () {
        expect(
          Storyline.smartifyQuotes('"I do not thing this is necessary."'),
          '“I do not thing this is necessary.”',
        );
      });
      test('colon direct speech', () {
        expect(
          Storyline.smartifyQuotes('He said: "I am here."'),
          'He said: “I am here.”',
        );
      });
      test('he said sentence', () {
        expect(
          Storyline.smartifyQuotes('"I like this," he said.'),
          '“I like this,” he said.',
        );
      });
      test('question mark', () {
        expect(
          Storyline.smartifyQuotes('"What?" he asked.'),
          '“What?” he asked.',
        );
      });
      test('exclamation mark', () {
        expect(
          Storyline.smartifyQuotes('"No!" he shouted.'),
          '“No!” he shouted.',
        );
      });
    });

    group('contractions', () {
      test('cannot', () {
        expect(
          Storyline.smartifyQuotes("You can't be serious!"),
          "You can’t be serious!",
        );
      });
      test('possessive', () {
        expect(
          Storyline.smartifyQuotes("Aren's dagger"),
          "Aren’s dagger",
        );
      });
      test('possessive end of word', () {
        expect(
          Storyline.smartifyQuotes("Czechs' pride"),
          "Czechs’ pride",
        );
      });
      test('possessive end of word and sentence', () {
        expect(
          Storyline.smartifyQuotes("dogs'"),
          "dogs’",
        );
      });
    });

    test('longer sentence', () {
      expect(
        Storyline.smartifyQuotes('"E=mc2" is Einstein\'s signature.'),
        '“E=mc2” is Einstein’s signature.',
      );
    });
  });

  group('collapseSpaces', () {
    test("doesn't touch normal text", () {
      expect(Storyline.collapseSpaces('Hey there, this is completely normal.'),
          'Hey there, this is completely normal.');
    });

    test("collapses two spaces", () {
      expect(Storyline.collapseSpaces('Hey there,  this is not.'),
          'Hey there, this is not.');
    });

    test("collapses three spaces", () {
      expect(Storyline.collapseSpaces('Hey there,   this is not.'),
          'Hey there, this is not.');
    });

    test("doesn't affect newlines", () {
      expect(Storyline.collapseSpaces('Hey there, \n\nNew paragraph!'),
          'Hey there, \n\nNew paragraph!');
    });
  });
}

Entity _createPlayer(String name) =>
    Entity(name: name, pronoun: Pronoun.I, team: playerTeam, isPlayer: true);
