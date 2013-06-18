import 'package:unittest/unittest.dart';
import 'dart:io';

import 'dart:collection';
import 'dart:async';
import 'dart:isolate';

import 'package:egamebook/src/interface/interface.dart';
import 'package:egamebook/src/runner.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/persistence/saveable.dart';
import 'package:egamebook/src/shared/user_interaction.dart';
import 'package:egamebook/builder.dart';
import 'package:egamebook/src/interface/choice_with_infochips.dart';

class MockInterface implements EgbInterface {
  Queue<int> choicesToBeTaken;
  Queue<String> choicesToBeTakenByString;
  String latestOutput;
  EgbChoiceList latestChoices;
  bool started = false;
  bool closed = false;

  StreamController _streamController;
  Stream _stream;
  Stream get stream => _stream;

  MockInterface() : choicesToBeTaken = new Queue<int>(),
      choicesToBeTakenByString = new Queue<String>() {
    _streamController = new StreamController();
    _stream = _streamController.stream.asBroadcastStream();
  }

  void setup() {
    started = true;
  }

  void close() {
    closed = true;
  }

  Future<bool> showText(String s) {
    print("MockInterface output: $s");
    if (s.trim() != "") {
      latestOutput = s;
    }
    return new Future.value(true);
  }
  
  String getTextHistory() => "Method getTextHistory() not implemented on "
                             "MockInterface.";

  Future<int> showChoices(EgbChoiceList choiceList) {
    choiceList.forEach((choice) => print("MockInterface choice: '${choice.string}'"));
    latestChoices = choiceList;
    if (choicesToBeTaken.length > 0) {
      int choiceNumber = choicesToBeTaken.removeFirst();
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
                                "-> ${choiceList[choiceNumber].hash}");
      return new Future.value(choiceList[choiceNumber].hash);
    } else if (choicesToBeTakenByString.length > 0) {
      String choiceString = choicesToBeTakenByString.removeFirst();
      int choiceNumber = null;
      for (int i = 0; i < choiceList.length; i++) {
        if (choiceList[i].string == choiceString) {
          choiceNumber = i;
          break;
        }
      }
      if (choiceNumber == null) throw "Choice $choiceString not available.";
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
                                "-> ${choiceList[choiceNumber].hash}");
      return new Future.value(choiceList[choiceNumber].hash);
    } else {
      print("MockInterface pick: NONE, Quitting");
      _streamController.sink.add(
          new PlayerIntent(PlayerIntent.QUIT));
      _streamController.close();
      return new Completer().future;
    }
  }

  Future<bool> addSavegameBookmark(EgbSavegame savegame) {
    print("==> savegame created (${savegame.uid})");
  }
}

String getPath(String filename) {
  var options = new Options();
  var pathToScript = new Path(options.script);
  var pathToFilename = pathToScript.directoryPath
        .join(new Path("files"))
        .join(new Path(filename));
  return pathToFilename.toString();
}

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



void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort;

  // build files
  Future aFuture = new Builder()
      .readEgbFile(new File(getPath("scripter_test_alternate_6.egb")))
      .then((Builder b) => b.writeDartFiles());
  Future bFuture = new Builder()
      .readEgbFile(new File(getPath("scripter_test_save.egb")))
      .then((Builder b) => b.writeDartFiles());
  Future cFuture = new Builder()
      .readEgbFile(new File(getPath("scripter_page_visitonce.egb")))
      .then((Builder b) => b.writeDartFiles());

  Future.wait([aFuture, bFuture, cFuture]).then((_) {
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
        SendPort scripterPort1 = spawnUri("files/scripter_test_alternate_6_main.dart");

        var interface1 = new MockInterface();
        interface1.choicesToBeTaken = new Queue<int>.from(
            [0, 1, 0, 1, 1]
        );

        var interface2 = new MockInterface();
        interface2.choicesToBeTaken = new Queue<int>.from(
            [1, 1, 1, 1, 1, 1, 1]
        );

        var storage = new MemoryStorage();
        var runner1 = new EgbRunner(receivePort, scripterPort1,
            interface1, storage.getDefaultPlayerProfile());

        interface1.stream.firstWhere(
            (interaction) => interaction.type == PlayerIntent.QUIT)
        .then(expectAsync1((_) {
          runner1.stop();

          receivePort = new ReceivePort();
          SendPort scripterPort2 = spawnUri("files/scripter_test_alternate_6_main.dart");

          var playerProfile = storage.getDefaultPlayerProfile();
          var runner2 = new EgbRunner(receivePort, scripterPort2,
              interface2, playerProfile);

          interface2.stream.firstWhere(
              (interaction) => interaction.type == PlayerIntent.QUIT)
          .then(expectAsync1((_) {
            expect(interface2.closed,
                true);
            expect(runner2.ended,
                false);
            expect(interface2.latestOutput,
                contains("Time is now 10."));
            expect(interface2.latestOutput,
                contains("customInstance.i is now 20."));

            playerProfile.loadMostRecent()
            .then(expectAsync1((EgbSavegame savegame) {
              expect(savegame.pageMapState["dddeee"]["visitCount"],
                  greaterThan(1));
            }));

            runner2.stop();
          }));

          // run second part
          runner2.run();
        }));

        // run first part
        runner1.run();
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