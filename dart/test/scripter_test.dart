import 'package:unittest/unittest.dart';
import 'dart:io';
import 'package:path/path.dart' as path;

import 'dart:collection';
import 'dart:async';
import 'dart:isolate';

import 'package:egamebook/src/runner.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/persistence/saveable.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/builder.dart';
import 'package:egamebook/src/interface/choice_with_infochips.dart';
import 'package:egamebook/src/interface/interface.dart';

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
  var pathToScript = new Options().script;
  return path.join(path.dirname(pathToScript), "files", filename);
}

/// Builds the given .egb file, returns the path to the file to be given to
/// [spawnUri]. Usage:
/// 
///     build("test1.egb")
///     .then((runnerPath) => run(runnerPath))
///     .then((ui) => ui.choose("Abc"))
///     .then((ui) => ui.choose("Xyz"))
///     .then(expectAsync1((ui) => expect(ui.lastParagraph, contains("bla")))
///     .then((ui) => ui.quit());
Future<String> build(String egbFilename) {
  String canonicalEgbPath = getPath(egbFilename);
  String dartFilename = 
      egbFilename.replaceFirst(new RegExp(r"\.egb$"), ".dart");
  String canonicalMainPath = 
      canonicalEgbPath.replaceFirst(new RegExp(r"\.egb$"), "_main.dart");
  return new Builder()
  .readEgbFile(new File(canonicalEgbPath))
  .then((Builder b) => b.writeDartFiles())
  .then((_) {
    var f = new File(canonicalMainPath).openWrite(mode: FileMode.WRITE)
    ..write("""import '$dartFilename';

void main() {
  new ScripterImpl();
}""");
    return f.close()
    .then((_) {
      return canonicalMainPath;
    });
  });
}

/// Runs the built project and returns the [MockInterface] instance.
Future<EgbInterface> run(String canonicalMainPath, 
    {EgbStorage persistentStorage: null}) {
  var receivePort = new ReceivePort();
  SendPort scripterPort = spawnUri(canonicalMainPath);
  var interface = new MockInterface(waitForChoicesToBeTaken: true);
  var storage;
  if (persistentStorage != null) {
    storage = persistentStorage;
  } else {
    storage = new MemoryStorage();
  }
  var runner = new EgbRunner(receivePort, scripterPort,
      interface, storage.getDefaultPlayerProfile());
  runner.run();
  return new Future.value(interface);
}


void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort;

  Future.wait(
      [build("scripter_test_alternate_6.egb"), 
       build("scripter_test_save.egb"), 
       build("scripter_page_visitonce.egb")]).then((_) {
    group("Scripter basic", () {
      test("interface initial values correct", () {
        var interface = new MockInterface();
        expect(interface.started,
            false);
        expect(interface.closed,
            false);
      });

      group("alternate_6", () {
        setUp(() {
          receivePort = new ReceivePort();
        });

        test("runner initial values correct", () {
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          var interface = new MockInterface();
          var storage = new MemoryStorage();
          var runner = new EgbRunner(receivePort, scripterPort,
              interface, storage.getDefaultPlayerProfile());
          expect(runner.started,
              false);
          expect(runner.ended,
              false);
          runner.stop();
        });

        test("walks through when it should", () {
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          var interface = new MockInterface();
          interface.choicesToBeTaken.addAll(
              [0, 1, 0, 1, 0, 1]
          );
          var storage = new MemoryStorage();
          var runner = new EgbRunner(receivePort, scripterPort,
              interface, storage.getDefaultPlayerProfile());

          runner.endOfBookReached.listen(expectAsync1((_) {
            expect(interface.latestOutput,
            "End of book.");
            expect(interface.choicesToBeTaken.length,
                0);

            runner.stop();
          }));

          runner.run();
        });

        test("doesn't walk through when it shouldn't", () {
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          var interface = new MockInterface();
          interface.choicesToBeTaken = new Queue<int>.from(
              [0, 1, 0, 1, 0, 0]
          );
          var storage = new MemoryStorage();
          var runner = new EgbRunner(receivePort, scripterPort,
              interface, storage.getDefaultPlayerProfile());

          interface.stream.listen(expectAsync1((interaction) {
            expect(interaction.type, PlayerIntent.QUIT);
            expect(interface.closed,
                true);
            expect(runner.ended,
                false);
            expect(interface.latestOutput,
                startsWith("Welcome (back?) to dddeee."));

            runner.stop();
          }));

          runner.run();
        });

        test("simple counting works", () {
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          var interface = new MockInterface();
          interface.choicesToBeTaken = new Queue<int>.from(
              [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          );
          var storage = new MemoryStorage();
          var runner = new EgbRunner(receivePort, scripterPort,
              interface, storage.getDefaultPlayerProfile());

          interface.stream.listen(expectAsync1((interaction) {
            expect(interaction.type, PlayerIntent.QUIT);
            expect(interface.closed,
                true);
            expect(runner.ended,
                false);
            expect(interface.latestOutput,
                contains("Time is now 10."));

            runner.stop();
          }));

          runner.run();
        });
      });
    });
    
    group("flags (Bits)", () {
      test("basic", () {
        build("flag.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("Yes.");
          ui.choose("No problem.");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput.trim(), "Is that you? Here, have a Porsche!");
          ui.quit();
        }));
      });
      test("2 different bits", () {
        build("flag.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("Fuck off.");
          ui.choose("...");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, contains("Hey, that's you, asshole!"));
          expect(ui.latestOutput, contains("And don't give me that silent treatment again, bitch."));
          expect(ui.latestOutput, isNot(contains("Is that you? Here, have a Porsche!")));
          ui.quit();
        }));
      });
      test("persistence", () {
        var storage = new MemoryStorage();
        var mainPath;
        build("flag.egb")
        .then((path) {
          mainPath = path;
          return run(mainPath, persistentStorage: storage);
        })
        .then((MockInterface ui) {
          ui.choose("Fuck off.");
          return ui.waitForDone();
        })
        .then((MockInterface ui) {
          ui.quit();
          return run(mainPath, persistentStorage: storage);
        })
        .then((MockInterface ui) {
          ui.choose("...");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, contains("Hey, that's you, asshole!"));
          expect(ui.latestOutput, contains("And don't give me that silent treatment again, bitch."));
          expect(ui.latestOutput, isNot(contains("Is that you? Here, have a Porsche!")));
          ui.quit();
        }));
      });
      test("flags don't stay up after restart", () {
        build("shutup.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("\"Shut up.\"");
          return ui.waitForDone();
        })
        .then((MockInterface ui) {
          ui.restart();
          return ui.waitForDone();
        })
        .then((MockInterface ui) {
          ui.choose("\"We survived, didn't we?\"");
          ui.choose("\"Shut up.\"");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, contains("You know what? You shut up."));
          expect(ui.latestOutput, isNot(contains("Can you say anything else? Jesus.")));
          ui.quit();
        }));
      });
    });
    
    group("Multiline choices", () {
      test("are shown", () {
        build("choices_multiline.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestChoices.length, 4);
          expect(ui.latestChoices.first.string, "That's okay.");
          expect(ui.latestChoices.last.string, "Many people do!");
          ui.quit();
        }));
      });
      test("works with scripts", () {
        build("choices_multiline.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("Many people do!");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, contains("No it doesn't."));
          ui.quit();
        }));
      });
      test("works with gotos", () {
        build("choices_multiline.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("I need to do something about it.");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, 
              contains("You tried to do something about it, but to no avail."));
          ui.quit();
        }));
      });
      test("works with gotos and scripts", () {
        build("choices_multiline.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("That's okay.");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, 
              contains("You tried to do something about it, but to no avail."));
          expect(ui.currentlyShownPoints, 42);
          ui.quit();
        }));
      });
    });

    group("Persistence", () {
      setUp(() {
        receivePort = new ReceivePort();
      });

      test("works for saveables and doesn't for non-saveables", () {
        SendPort scripterPort = spawnUri("files/scripter_test_save_main.dart");
        var interface = new MockInterface();
        interface.choicesToBeTaken = new Queue<int>.from(
            [0]
        );
        var storage = new MemoryStorage();
        var playerProfile = storage.getDefaultPlayerProfile();
        var runner = new EgbRunner(receivePort, scripterPort,
            interface, playerProfile);

        runner.endOfBookReached.listen(expectAsync1((_) {
          expect(interface.latestOutput,
              contains("Scripter should still have all variables"));

          runner.stop();

          playerProfile.loadMostRecent()
          .then(expectAsync1((EgbSavegame savegame) {
            expect(savegame.vars.length,
                isNonZero);
            expect(savegame.vars["nullified"],
                isNull);
            expect(savegame.vars["integer"],
                0);
            expect(savegame.vars["numeric"],
                3.14);
            expect(savegame.vars["string"],
                "Řeřicha UTF-8 String");
            expect(savegame.vars.containsKey("nonSaveable"),
                false);
            expect(savegame.vars["list1"],
                ["a", "b", "ř"]);
            expect(savegame.vars["list2"],
                   [0, 3.14, ["a", "b", "ř"]]);
            expect(savegame.vars["map1"],
                {"c": null, "a": 0, "b": 3.14});
            expect(savegame.vars["map2"] as Map,
                hasLength(2));
            expect(savegame.vars["saveable"] as Map,
                hasLength(4));
            expect(savegame.vars["saveable"]["s"],
                "Řeřicha");
            expect(savegame.vars["saveable"]["m"],
                hasLength(2));
          }));

        }));

        runner.run();
      });
      
      test("works on classes with toMap and fromMap", () {
        receivePort.close();
        var saveableInstance = new ClassWithMapMethods();
        saveableInstance.s = "Universal truth";
        saveableInstance.i = 42;
        var vars1 = {
          "saveable": saveableInstance,
          "primitive": 8
        };
        var s1 = new EgbSavegame("blah", vars1, {"blah": null});
        print(s1.vars);
        expect(s1.vars, contains("saveable"));
        expect(s1.vars["saveable"], contains("m"));
      });
      
      test("works between 2 independent runs", () {
        receivePort.close();
        var storage = new MemoryStorage();
        var mainPath;
        build("scripter_test_alternate_6.egb")
        .then((path) {
          mainPath = path;
          return run(mainPath, persistentStorage: storage);
        })
        .then((MockInterface ui) {
          ui.choicesToBeTaken = new Queue<int>.from(
              [0, 1, 0, 1, 1]
          );
          return ui.waitForDone();
        })
        .then((MockInterface ui) {
          ui.quit();
          return run(mainPath, persistentStorage: storage);
        })
        .then((MockInterface ui) {
          ui.choicesToBeTaken = new Queue<int>.from(
              [1, 1, 1, 1, 1, 1]
          );
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput,
              contains("Time is now 10."));
          expect(ui.latestOutput,
              contains("customInstance.i is now 20."));
          print(ui.choicesToBeTaken);
          ui.quit();
        }));
      });
      
      test("script choices", () {
        receivePort.close();
        var storage = new MemoryStorage();
        var mainPath;
        build("scriptchoices.egb")
        .then((path) {
          mainPath = path;
          return run(mainPath, persistentStorage: storage);
        })
        .then((MockInterface ui) {
          ui.choose("Live!");
          return ui.waitForDone();
        })
        .then((MockInterface ui) {
          ui.quit();
          return run(mainPath, persistentStorage: storage);
        })
        .then((MockInterface ui) {
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestChoices[0].string, "Another chance to die.");
          expect(ui.latestChoices[1].string, "Win it!");
          print(ui.choicesToBeTaken);
          ui.quit();
        }));
      });
    });

    group("Page options", () {
      setUp(() {
        receivePort = new ReceivePort();
      });

      test("prevents user to visit visitOnce page twice", () {
        SendPort scripterPort = spawnUri("files/scripter_page_visitonce_main.dart");
        var interface = new MockInterface();
        interface.choicesToBeTakenByString = new Queue<String>.from(
            ["Get dressed"]
        );
        var storage = new MemoryStorage();
        var playerProfile = storage.getDefaultPlayerProfile();
        var runner = new EgbRunner(receivePort, scripterPort,
            interface, playerProfile);

        interface.stream.firstWhere(
            (interaction) => interaction.type == PlayerIntent.QUIT)
        .then(expectAsync1((_) {
          expect(interface.latestChoices,
              hasLength(3));
          expect(interface.latestChoices[0].string,
              isNot("Get dressed"));
          expect(interface.latestChoices[0].string,
              "Call the police");

          runner.stop();
        }));

        runner.run();
      });

    });
    
    group("Scripter test helpers", () {
      test("build() works", () {
        build("scripter_test_alternate_6.egb")
        .then(expectAsync1((mainPath) {
          print(mainPath);
          expect(mainPath, endsWith("scripter_test_alternate_6_main.dart"));
        }));
      });

      test("run() and ui.choose() works", () {
        build("scripter_test_alternate_6.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("ABC");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, "Blah.");
          ui.quit();
        }));
      });
      
      test("ui.restart() works", () {
        build("scripter_test_alternate_6.egb")
        .then((mainPath) => run(mainPath))
        .then((MockInterface ui) {
          ui.choose("ABC");
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, "Blah.");
          ui.restart();
          return ui.waitForDone();
        }))
        .then(expectAsync1((MockInterface ui) {
          expect(ui.latestOutput, "Starting. Setting time to 0.");
          ui.quit();
        }));
      });
    });
    
    group("PointsAwards", () {
      test("successfully awards", () {
        build("points_awards.egb")
        .then((mainPath) {
          print(mainPath);
          return run(mainPath);
        })
        .then(expectAsync1((MockInterface ui) {
          expect(ui.currentlyShownPoints, 0);
          ui.choose("Go to next");
          ui.choose("Do something stupid");
          return ui.waitForDone();
        }))
        .then(expectAsync1((MockInterface ui) {
          expect(ui.currentlyShownPoints, 1);
          ui.quit();
        }));
      });
    });
    
    group("Stats", () {
      test("successfully shows on start", () {
        build("stats.egb")
        .then((mainPath) {
          print(mainPath);
          return run(mainPath);
        })
        .then((MockInterface ui) {
          return ui.waitForDone();
        })
        .then(expectAsync1((MockInterface ui) {
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
  });

}