import 'package:unittest/unittest.dart';
import 'dart:io';
import 'package:path/path.dart' as path;

import 'dart:collection';
import 'dart:async';
import 'dart:isolate';

import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/persistence/saveable.dart';
import 'package:egamebook/builder.dart';
import 'package:egamebook/src/interface/choice_with_infochips.dart';
import 'package:egamebook/interface.dart';
import 'package:egamebook/src/book/scripter_proxy.dart';


import 'mock_interface.dart';


// for Persistence testing
class ClassWithMapMethods implements Saveable {
  int i;
  String s;
  Map m = const {
    "a": 1,
    "b": 2
  };

  String className = "ClassWithMapMethods";
  toMap() => {
    "i": i,
    "s": s,
    "m": m
  };

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
  String dartFilename = canonicalEgbPath.replaceFirst(new RegExp(r"\.egb$"),
      ".dart");
  return new Builder().readEgbFile(new File(canonicalEgbPath)).then((Builder b)
      => b.writeDartFiles()).then((_) {
    return dartFilename;
  });
}

/// Runs the built project and returns the [MockInterface] instance.
Future<EgbInterface> run(String dartFilename, {EgbStorage persistentStorage:
    null}) {
  var mockInterface = new MockInterface(waitForChoicesToBeTaken: true);
  EgbStorage storage;
  if (persistentStorage != null) {
    storage = persistentStorage;
  } else {
    storage = new MemoryStorage();
  }
  mockInterface.setPlayerProfile(storage.getDefaultPlayerProfile());
  EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(
      Uri.parse(dartFilename));

  EgbSavegame lastSavegame;
  Set<String> playerChronology;

  return bookProxy.init()
  .then((_) {
    mockInterface.setScripter(bookProxy);
    bookProxy.setInterface(mockInterface);

    return mockInterface.continueSavedGameOrCreateNew();
  });
}


void main() {
  // create [ReceivePort] for this isolate: TODO: delete
  ReceivePort receivePort;

  // TODO: instead of this, use the asynchronous nature of setUp() - http://japhr.blogspot.cz/2013/06/async-test-setup-in-dart.html
  Future.wait([build("scripter_test_alternate_6.egb"), build(
      "scripter_test_save.egb"), build("scripter_page_visitonce.egb")]).then((_) {
    group("Scripter basic", () {
      test("interface initial values correct", () {
        var interface = new MockInterface();
        expect(interface.started, false);
        expect(interface.closed, false);
      });

      group("alternate_6", () {
        setUp(() {
          //          receivePort = new ReceivePort();
        });

        test("runner initial values correct", () {
          var mockInterface = new MockInterface();
          var storage = new MemoryStorage();
          mockInterface.setPlayerProfile(storage.getDefaultPlayerProfile());
          EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
              "files/scripter_test_alternate_6.dart"));
          bookProxy.init()
              // Spawns the Isolate (if needed) and asks for BookUid
          .then(expectAsync((_) {
            mockInterface.setScripter(bookProxy);
            bookProxy.setInterface(mockInterface);
            expect(bookProxy.uid, isNotNull);

            mockInterface.quit();
          }));

        });

        test("walks through when it should", () {
          var mockInterface = new MockInterface();
          mockInterface.choicesToBeTaken.addAll([0, 1, 0, 1, 0, 1]);
          var storage = new MemoryStorage();
          mockInterface.setPlayerProfile(storage.getDefaultPlayerProfile());
          EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
              "files/scripter_test_alternate_6.dart"));

          bookProxy.init().then((_) {
            mockInterface.setScripter(bookProxy);
            bookProxy.setInterface(mockInterface);
            bookProxy.restart();
            return mockInterface.endOfBookReached.first;
          }).then(expectAsync((_) {
            expect(mockInterface.latestOutput, "End of book.");
            expect(mockInterface.choicesToBeTaken.length, 0);

            mockInterface.quit();
          }));
        });

        test("doesn't walk through when it shouldn't", () {
          var mockInterface = new MockInterface();
          mockInterface.choicesToBeTaken = new Queue<int>.from([0, 1, 0, 1, 0,
              0]);
          var storage = new MemoryStorage();
          mockInterface.setPlayerProfile(storage.getDefaultPlayerProfile());
          EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
              "files/scripter_test_alternate_6.dart"));

          mockInterface.playerQuit.first
              .then(expectAsync((_) {
            expect(mockInterface.latestOutput, startsWith(
                "Welcome (back?) to dddeee."));
          }));

          bookProxy.init().then((_) {
            mockInterface.setScripter(bookProxy);
            bookProxy.setInterface(mockInterface);
            bookProxy.restart();
          });
        });

        test("simple counting works", () {
          var mockInterface = new MockInterface();
          mockInterface.choicesToBeTaken = new Queue<int>.from([0, 1, 0, 1, 1,
              1, 1, 1, 1, 1, 1, 1]);
          var storage = new MemoryStorage();
          mockInterface.setPlayerProfile(storage.getDefaultPlayerProfile());
          EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
              "files/scripter_test_alternate_6.dart"));

          mockInterface.playerQuit.first
              .then(expectAsync((_) {
            expect(mockInterface.latestOutput, contains("Time is now 10."));

            mockInterface.quit();
          }));

          bookProxy.init().then((_) {
            mockInterface.setScripter(bookProxy);
            bookProxy.setInterface(mockInterface);
            bookProxy.restart();
          });
        });
      });
    });

    group("Multiline choices", () {
      test("are shown", () {
        build("choices_multiline.egb").then((mainPath) => run(mainPath)).then(
            (MockInterface ui) {
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestChoices.length, 4);
          expect(ui.latestChoices.first.string, "That's okay.");
          expect(ui.latestChoices.last.string, "Many people do!");
          ui.quit();
        }));
      });
      test("works with scripts", () {
        build("choices_multiline.egb").then((mainPath) => run(mainPath)).then(
            (MockInterface ui) {
          ui.choose("Many people do!");
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, contains("No it doesn't."));
          ui.quit();
        }));
      });
      test("works with gotos", () {
        build("choices_multiline.egb").then((mainPath) => run(mainPath)).then(
            (MockInterface ui) {
          ui.choose("I need to do something about it.");
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, contains(
              "You tried to do something about it, but to no avail."));
          ui.quit();
        }));
      });
      test("works with gotos and scripts", () {
        build("choices_multiline.egb").then((mainPath) => run(mainPath)).then(
            (MockInterface ui) {
          ui.choose("That's okay.");
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, contains(
              "You tried to do something about it, but to no avail."));
          expect(ui.currentlyShownPoints, 42);
          ui.quit();
        }));
      });
    });

    group("Persistence", () {

      test("works for saveables and doesn't for non-saveables", () {
        var mockInterface = new MockInterface();
        mockInterface.choicesToBeTaken = new Queue<int>.from([0]);
        var storage = new MemoryStorage();
        mockInterface.setPlayerProfile(storage.getDefaultPlayerProfile());
        EgbScripterProxy bookProxy = new EgbIsolateScripterProxy(Uri.parse(
            "files/scripter_test_save.dart"));

        bookProxy.init().then((_) {
          mockInterface.setScripter(bookProxy);
          bookProxy.setInterface(mockInterface);
          bookProxy.restart();
          return mockInterface.endOfBookReached.first;
        }).then((_) {
          return mockInterface.playerProfile.loadMostRecent();
        })
        .then(expectAsync((EgbSavegame savegame) {
          expect(mockInterface.latestOutput, contains(
                        "Scripter should still have all variables"));

          expect(savegame.vars.length, isNonZero);
          expect(savegame.vars["nullified"], isNull);
          expect(savegame.vars["integer"], 0);
          expect(savegame.vars["numeric"], 3.14);
          expect(savegame.vars["string"], "Řeřicha UTF-8 String");
          expect(savegame.vars.containsKey("nonSaveable"), false);
          expect(savegame.vars["list1"], ["a", "b", "ř"]);
          expect(savegame.vars["list2"], [0, 3.14, ["a", "b", "ř"]]);
          expect(savegame.vars["map1"], {
            "c": null,
            "a": 0,
            "b": 3.14
          });
          expect(savegame.vars["map2"] as Map, hasLength(2));
          expect(savegame.vars["saveable"] as Map, hasLength(4));
          expect((savegame.vars["saveable"] as Map)["s"], "Řeřicha");
          expect((savegame.vars["saveable"] as Map)["m"], hasLength(2));

          mockInterface.quit();
        }));
      });

      test("works on classes with toMap and fromMap", () {
        var saveableInstance = new ClassWithMapMethods();
        saveableInstance.s = "Universal truth";
        saveableInstance.i = 42;
        var vars1 = {
          "saveable": saveableInstance,
          "primitive": 8
        };
        var s1 = new EgbSavegame("blah", vars1, {
          "blah": null
        });
        logMessage(s1.vars.toString());
        expect(s1.vars, contains("saveable"));
        expect(s1.vars["saveable"], contains("m"));
      });

      test("works between 2 independent runs", () {
        var storage = new MemoryStorage();
        String mainPath;
        build("scripter_test_alternate_6.egb").then((path) {
          mainPath = path;
          return run(mainPath, persistentStorage: storage);
        }).then((MockInterface ui) {
          ui.choicesToBeTaken = new Queue<int>.from([0, 1, 0, 1, 1]);
          return ui.waitForDone();
        }).then((MockInterface ui) {
          ui.quit();
          return run(mainPath, persistentStorage: storage);
        }).then((MockInterface ui) {
          ui.choicesToBeTaken = new Queue<int>.from([1, 1, 1, 1, 1, 1]);
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, contains("Time is now 10."));
          expect(ui.latestOutput, contains("customInstance.i is now 20."));
          logMessage(ui.choicesToBeTaken.toString());
          ui.quit();
        }));
      });

      test("script choices", () {
        var storage = new MemoryStorage();
        var mainPath;
        build("scriptchoices.egb").then((path) {
          mainPath = path;
          return run(mainPath, persistentStorage: storage);
        }).then((MockInterface ui) {
          ui.choose("Live!");
          return ui.waitForDone();
        }).then((MockInterface ui) {
          ui.quit();
          return run(mainPath, persistentStorage: storage);
        }).then((MockInterface ui) {
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestChoices[0].string, "Another chance to die.");
          expect(ui.latestChoices[1].string, "Win it!");
          logMessage(ui.choicesToBeTaken.toString());
          ui.quit();
        }));
      });
    });

    group("Page options", () {
      test("prevents user from visiting visitOnce page twice", () {
        run("files/scripter_page_visitonce.dart")
        .then((MockInterface ui) {
          ui.choose("Get dressed");
          return ui.waitForDone();
        })
        .then(expectAsync((MockInterface ui) {
          expect(ui.latestChoices, hasLength(3));
          expect(ui.latestChoices[0].string, isNot("Get dressed"));
          expect(ui.latestChoices[0].string, "Call the police");

          ui.quit();
        }));
      });
    });

    group("Scripter test helpers", () {
      test("build() works", () {
        build("scripter_test_alternate_6.egb").then(expectAsync((mainPath) {
          logMessage(mainPath);
          expect(mainPath, endsWith("scripter_test_alternate_6.dart"));
        }));
      });

      test("run() and ui.choose() works", () {
        build("scripter_test_alternate_6.egb").then((mainPath) => run(mainPath)
            ).then((MockInterface ui) {
          ui.choose("ABC");
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, "Blah.");
          ui.quit();
        }));
      });

      test("ui.restart() works", () {
        build("scripter_test_alternate_6.egb").then((mainPath) => run(mainPath)
            ).then((MockInterface ui) {
          ui.choose("ABC");
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, "Blah.");
          ui.restart();
          return ui.waitForDone();
        })).then(expectAsync((MockInterface ui) {
          expect(ui.latestOutput, "Starting. Setting time to 0.");
          ui.quit();
        }));
      });
    });

    group("PointsAwards", () {
      test("successfully awards", () {
        build("points_awards.egb").then((mainPath) {
          logMessage(mainPath);
          return run(mainPath);
        }).then(expectAsync((MockInterface ui) {
          expect(ui.currentlyShownPoints, 0);
          ui.choose("Go to next");
          ui.choose("Do something stupid");
          return ui.waitForDone();
        })).then(expectAsync((MockInterface ui) {
          expect(ui.currentlyShownPoints, 1);
          ui.quit();
        }));
      });
    });

    group("Stats", () {
      test("successfully shows on start", () {
        build("stats.egb").then((mainPath) {
          logMessage(mainPath);
          return run(mainPath);
        }).then((MockInterface ui) {
          return ui.waitForDone();
        }).then(expectAsync((MockInterface ui) {
          expect(ui.visibleStats, hasLength(1));
          expect(ui.visibleStats[0].name, "HP");
          ui.quit();
        }));
      });
      // TODO test persistence
    });

    group("ChoiceWithInfochips", () {
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

    //    group("ZIL library", () {
    //      test("no action", () {
    //        build("zil_basic.egb")
    //        .then((mainPath) {
    //          return run(mainPath);
    //        })
    //        .then(expectAsync((MockInterface ui) {
    //          return ui.waitForDone();
    //        }))
    //        .then(expectAsync((MockInterface ui) {
    //          logMessage(ui.latestOutput);
    //          ui.quit();
    //        }));
    //      });
    //    });
  });

}
