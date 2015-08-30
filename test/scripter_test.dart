library scripter_test;

import 'package:test/test.dart';
import 'dart:io';
import 'package:path/path.dart' as path;

import 'dart:collection';
import 'dart:async';
import 'dart:isolate';

import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/persistence/saveable.dart';
import 'package:egamebook/builder.dart';
import 'package:egamebook/src/presenter/choice_with_infochips.dart';
import 'package:egamebook/presenter.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';

import 'mock_presenter.dart';

// for Persistence testing
class ClassWithMapMethods implements Saveable {
  int i;
  String s;
  Map m = const {"a": 1, "b": 2};

  String className = "ClassWithMapMethods";
  toMap() => {"i": i, "s": s, "m": m};

  ClassWithMapMethods();

  ClassWithMapMethods.fromMap(map) {
    updateFromMap(map);
  }

  updateFromMap(map) {
    i = map["i"];
    s = map["s"];
  }
}

class ClassWithoutMapMethods {
  int i;
  String s;

  ClassWithoutMapMethods();
}

/**
 * Returns path to the file inside the [:/files:] subdirectory with filename
 * [filename]. Convenience function.
 */
String getPath(String filename) {
  var pathToScript = Platform.script.toFilePath();
  return path.join(path.dirname(pathToScript), "files", filename);
}

/// Builds the given .egb file, returns the path to the file to be given to
/// [spawnUri]. Usage:
///
///     build("test1.egb")
///     .then((runnerPath) => run(runnerPath))
///     .then((ui) => ui.choose("Abc"))
///     .then((ui) => ui.choose("Xyz"))
///     .then(expectAsync((ui) => expect(ui.lastParagraph, contains("bla")))
///     .then((ui) => ui.quit());
///
///     TODO: add generated files to a list to be deleted afterwards?
Future<String> build(String egbFilename) {
  String canonicalEgbPath = getPath(egbFilename);
  String dartFilename =
      canonicalEgbPath.replaceFirst(new RegExp(r"\.egb$"), ".dart");
  return new Builder()
      .readEgbFile(new File(canonicalEgbPath))
      .then((Builder b) => b.writeDartFiles())
      .then((_) {
    return dartFilename;
  });
}

/// Runs the built project and returns the [MockPresenter] instance.
Future<EgbPresenter> run(String dartFilename,
    {EgbStorage persistentStorage: null}) {
  var mockPresenter = new MockPresenter(waitForChoicesToBeTaken: true);
  EgbStorage storage;
  if (persistentStorage != null) {
    storage = persistentStorage;
  } else {
    storage = new MemoryStorage();
  }
  mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
  EgbScripterProxy bookProxy =
      new EgbIsolateScripterProxy(Uri.parse(dartFilename));

  EgbSavegame lastSavegame;
  Set<String> playerChronology;

  return bookProxy.init().then((_) {
    mockPresenter.setScripter(bookProxy);
    bookProxy.setPresenter(mockPresenter);

    return mockPresenter.continueSavedGameOrCreateNew();
  });
}

void main() {
  // Build the scripter .dart files, but not if we've already done so during
  // execution of this test file.
  bool _isolateScriptsAlreadyBuilt = false;
  Future buildScripterIsolates() {
    if (_isolateScriptsAlreadyBuilt) {
      return new Future.value();
    }
    return Future
        .wait([
      build("scripter_test_alternate_6.egb"),
      build("scripter_test_save.egb"),
      build("scripter_page_visitonce.egb"),
    ])
        .then((_) => _isolateScriptsAlreadyBuilt = true);
  }

  group("Scripter basic", () {
    setUp(buildScripterIsolates);

    test("presenter initial values correct", () {
      var presenter = new MockPresenter();
      expect(presenter.started, false);
      expect(presenter.closed, false);
    });

    group("alternate_6", () {

      test("runner initial values correct", () {
        var mockPresenter = new MockPresenter();
        var storage = new MemoryStorage();
        mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
        EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
            Uri.parse("files/scripter_test_alternate_6.dart"));
        bookProxy.init()
            // Spawns the Isolate (if needed) and asks for BookUid
            .then(expectAsync((_) {
          mockPresenter.setScripter(bookProxy);
          bookProxy.setPresenter(mockPresenter);
          expect(bookProxy.uid, isNotNull);

          mockPresenter.quit();
        }));
      });

      test("walks through when it should", () {
        var mockPresenter = new MockPresenter();
        mockPresenter.choicesToBeTaken.addAll([0, 1, 0, 1, 0, 1]);
        var storage = new MemoryStorage();
        mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
        EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
            Uri.parse("files/scripter_test_alternate_6.dart"));

        bookProxy.init().then((_) {
          mockPresenter.setScripter(bookProxy);
          bookProxy.setPresenter(mockPresenter);
          bookProxy.restart();
          return mockPresenter.endOfBookReached.first;
        }).then(expectAsync((_) {
          expect(mockPresenter.latestOutput, "End of book.");
          expect(mockPresenter.choicesToBeTaken.length, 0);

          mockPresenter.quit();
        }));
      });

      test("doesn't walk through when it shouldn't", () {
        var mockPresenter = new MockPresenter();
        mockPresenter.choicesToBeTaken =
            new Queue<int>.from([0, 1, 0, 1, 0, 0]);
        var storage = new MemoryStorage();
        mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
        EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
            Uri.parse("files/scripter_test_alternate_6.dart"));

        mockPresenter.playerQuit.first.then(expectAsync((_) {
          expect(mockPresenter.latestOutput,
              startsWith("Welcome (back?) to dddeee."));
          expect(mockPresenter.choicesToBeTaken.length, 0);
          mockPresenter.quit();
        }));

        bookProxy.init().then((_) {
          mockPresenter.setScripter(bookProxy);
          bookProxy.setPresenter(mockPresenter);
          bookProxy.restart();
        });
      });

      test("simple counting works", () {
        var mockPresenter = new MockPresenter();
        mockPresenter.choicesToBeTaken =
            new Queue<int>.from([0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        var storage = new MemoryStorage();
        mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
        EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
            Uri.parse("files/scripter_test_alternate_6.dart"));

        mockPresenter.playerQuit.first.then(expectAsync((_) {
          expect(mockPresenter.latestOutput, contains("Time is now 10."));

          mockPresenter.quit();
        }));

        bookProxy.init().then((_) {
          mockPresenter.setScripter(bookProxy);
          bookProxy.setPresenter(mockPresenter);
          bookProxy.restart();
        });
      });

      test("custom classes from libraries work", () {
        var mockPresenter = new MockPresenter();
        mockPresenter.choicesToBeTaken = new Queue<int>.from([0, 1, 0]);
        var storage = new MemoryStorage();
        mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
        EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
            Uri.parse("files/scripter_test_alternate_6.dart"));

        mockPresenter.playerQuit.first.then(expectAsync((_) {
          expect(mockPresenter.latestOutput, contains("Time is now 1."));
          expect(mockPresenter.latestOutput,
              contains("customInstance.i is now 11."));

          mockPresenter.quit();
        }));

        bookProxy.init().then((_) {
          mockPresenter.setScripter(bookProxy);
          bookProxy.setPresenter(mockPresenter);
          bookProxy.restart();
        });
      });
    });
  });

  group("Multiline choices", () {
    setUp(buildScripterIsolates);

    test("are shown", () {
      build("choices_multiline.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestChoices.length, 4);
        expect(ui.latestChoices.first.string, "That's okay.");
        expect(ui.latestChoices.last.string, "Many people do!");
        expect(ui.latestChoices.question, null);
        ui.quit();
      }));
    });
    test("works with scripts", () {
      build("choices_multiline.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        ui.choose("Many people do!");
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput, contains("No it doesn't."));
        ui.quit();
      }));
    });
    test("works with gotos", () {
      build("choices_multiline.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        ui.choose("I need to do something about it.");
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput,
            contains("You tried to do something about it, but to no avail."));
        ui.quit();
      }));
    });
    test("works with gotos and scripts", () {
      build("choices_multiline.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        ui.choose("That's okay.");
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput,
            contains("You tried to do something about it, but to no avail."));
        expect(ui.currentlyShownPoints, 42);
        ui.quit();
      }));
    });
    test("works with silent choices", () {
      build("choices_silent.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput, contains("So you are now here."));
        ui.quit();
      }));
    });
  });

  group("Persistence", () {
    setUp(buildScripterIsolates);

    test("works for saveables and doesn't for non-saveables", () {
      var mockPresenter = new MockPresenter();
      mockPresenter.choicesToBeTaken = new Queue<int>.from([0]);
      var storage = new MemoryStorage();
      mockPresenter.setPlayerProfile(storage.getDefaultPlayerProfile());
      EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
          Uri.parse("files/scripter_test_save.dart"));

      bookProxy.init().then((_) {
        mockPresenter.setScripter(bookProxy);
        bookProxy.setPresenter(mockPresenter);
        bookProxy.restart();
        return mockPresenter.endOfBookReached.first;
      }).then((_) {
        return mockPresenter.playerProfile.loadMostRecent();
      }).then(expectAsync((EgbSavegame savegame) {
        expect(mockPresenter.latestOutput,
            contains("Scripter should still have all variables"));

        expect(savegame.vars.length, isNonZero);
        expect(savegame.vars["nullified"], isNull);
        expect(savegame.vars["integer"], 0);
        expect(savegame.vars["numeric"], 3.14);
        expect(savegame.vars["string"], "Řeřicha UTF-8 String");
        expect(savegame.vars.containsKey("nonSaveable"), false);
        expect(savegame.vars["list1"], ["a", "b", "ř"]);
        expect(savegame.vars["list2"], [0, 3.14, ["a", "b", "ř"]]);
        expect(savegame.vars["map1"], {"c": null, "a": 0, "b": 3.14});
        expect(savegame.vars["map2"] as Map, hasLength(2));
        expect(savegame.vars["saveable"] as Map, hasLength(4));
        expect((savegame.vars["saveable"] as Map)["s"], "Řeřicha");
        expect((savegame.vars["saveable"] as Map)["m"], hasLength(2));

        mockPresenter.quit();
      }));
    });

    test("works on classes with toMap and fromMap", () {
      var saveableInstance = new ClassWithMapMethods();
      saveableInstance.s = "Universal truth";
      saveableInstance.i = 42;
      var vars1 = {"saveable": saveableInstance, "primitive": 8};
      var s1 = new EgbSavegame("blah", vars1, {"blah": null});
      expect(s1.vars, contains("saveable"));
      expect(s1.vars["saveable"], contains("m"));
    });

    test("works between 2 independent runs", () {
      var storage = new MemoryStorage();
      String mainPath;
      build("scripter_test_alternate_6.egb").then((path) {
        mainPath = path;
        return run(mainPath, persistentStorage: storage);
      }).then((MockPresenter ui) {
        ui.choicesToBeTaken = new Queue<int>.from([0, 1, 0, 1, 1]);
        return ui.waitForDone();
      }).then((MockPresenter ui) {
        ui.quit();
        return run(mainPath, persistentStorage: storage);
      }).then((MockPresenter ui) {
        ui.choicesToBeTaken = new Queue<int>.from([1, 1, 1, 1, 1, 1, 1]);
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput, contains("Time is now 10."));
        expect(ui.latestOutput, contains("customInstance.i is now 20."));
        ui.quit();
      }));
    });

    test("script choices", () {
      var storage = new MemoryStorage();
      var mainPath;
      build("scriptchoices.egb").then((path) {
        mainPath = path;
        return run(mainPath, persistentStorage: storage);
      }).then((MockPresenter ui) {
        ui.choose("Live!");
        return ui.waitForDone();
      }).then((MockPresenter ui) {
        ui.quit();
        return run(mainPath, persistentStorage: storage);
      }).then((MockPresenter ui) {
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestChoices[0].string, "Another chance to die.");
        expect(ui.latestChoices[1].string, "Win it!");
        ui.quit();
      }));
    });
  });

  group("Page options", () {
    setUp(buildScripterIsolates);

    test("prevents user from visiting visitOnce page twice", () {
      run("files/scripter_page_visitonce.dart").then((MockPresenter ui) {
        ui.choose("Get dressed");
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestChoices, hasLength(3));
        expect(ui.latestChoices[0].string, isNot("Get dressed"));
        expect(ui.latestChoices[0].string, "Call the police");
        expect(ui.latestChoices.question, "What do you do?");

        ui.quit();
      }));
    });
  });

  group("Scripter test helpers", () {
    test("build() works", () {
      build("scripter_test_alternate_6.egb").then(expectAsync((mainPath) {
        expect(mainPath, endsWith("scripter_test_alternate_6.dart"));
      }));
    });

    test("run() and ui.choose() works", () {
      build("scripter_test_alternate_6.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        ui.choose("ABC");
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput, "Blah.");
        ui.quit();
      }));
    });

    test("ui.restart() works", () {
      build("scripter_test_alternate_6.egb")
          .then((mainPath) => run(mainPath))
          .then((MockPresenter ui) {
        ui.choose("ABC");
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput, "Blah.");
        ui.restart();
        return ui.waitForDone();
      })).then(expectAsync((MockPresenter ui) {
        expect(ui.latestOutput, "Starting. Setting time to 0.");
        ui.quit();
      }));
    });
  });

  group("PointsAwards", () {
    setUp(buildScripterIsolates);

    test("successfully awards", () {
      build("points_awards.egb").then((mainPath) {
        return run(mainPath);
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.currentlyShownPoints, 0);
        ui.choose("Go to next");
        ui.choose("Do something stupid");
        return ui.waitForDone();
      })).then(expectAsync((MockPresenter ui) {
        expect(ui.currentlyShownPoints, 1);
        ui.quit();
      }));
    });
  });

  group("Stats", () {
    setUp(buildScripterIsolates);

    test("successfully shows on start", () {
      build("stats.egb").then((mainPath) {
        return run(mainPath);
      }).then((MockPresenter ui) {
        return ui.waitForDone();
      }).then(expectAsync((MockPresenter ui) {
        expect(ui.visibleStats, hasLength(1));
        expect(ui.visibleStats[0].name, "HP");
        ui.quit();
      }));
    });
    // TODO test persistence
  });

  group("ChoiceWithInfochips", () {
    setUp(buildScripterIsolates);

    test("lets through a choice without chips", () {
      String s = "Some random string with no chips";
      var a = new ChoiceWithInfochips(s);
      expect(a.text, s);
    });
    test("lets through choices with weird bracket config", () {
      String s1 = "Some random string with weird ] brackets]";
      var a1 = new ChoiceWithInfochips(s1);
      expect(a1.text, s1);
      String s2 = "[Some random string with weird ] brackets]";
      var a2 = new ChoiceWithInfochips(s2);
      expect(a2.text, s2);
    });
    test("lets through choices with []", () {
      String s = "Some random string with null [] brackets";
      var a = new ChoiceWithInfochips(s);
      expect(a.text, s);
    });
    test("detects 1 chip", () {
      String s = "Fire torpedo [5s]";
      var a = new ChoiceWithInfochips(s);
      expect(a.text, "Fire torpedo ");
      expect(a.infochips, hasLength(1));
      expect(a.infochips[0], "5s");
    });
    test("detects many chips", () {
      String s = "Fire torpedo [5s] [~45%] ";
      var a = new ChoiceWithInfochips(s);
      expect(a.text, "Fire torpedo ");
      expect(a.infochips, hasLength(2));
      expect(a.infochips[0], "5s");
      expect(a.infochips[1], "~45%");
    });
  });
}
