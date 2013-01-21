import 'package:unittest/unittest.dart';
import 'dart:io';

import 'dart:isolate';
import '../lib/src/egb_interface.dart';
import '../lib/src/egb_library.dart';
import '../lib/src/egb_runner.dart';
import '../lib/src/egb_storage.dart';
import '../lib/src/egb_savegame.dart';
import '../lib/egb_builder.dart';

// the scripter file to be tested
//import 'files/scripter_test_10x_alternate_first_second.dart';

class MockInterface implements EgbInterface {
  Queue<int> choicesToBeTaken;
  String latestOutput;
  bool started = false;
  bool closed = false;
  
  Future<bool> userQuit;
  Completer _userQuitCompleter;
  
  MockInterface() : choicesToBeTaken = new Queue<int>() {
    _userQuitCompleter = new Completer();
    userQuit = _userQuitCompleter.future;
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
  }
  
  Future<int> showChoices(EgbChoiceList choiceList) {
    if (choicesToBeTaken.length > 0) {
      int choiceNumber = choicesToBeTaken.removeFirst();
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
                                "-> ${choiceList[choiceNumber].hash}");
      return new Future.immediate(choiceList[choiceNumber].hash);
    } else {
      print("MockInterface pick: NONE, Quitting");
      close();
      _userQuitCompleter.complete(true);
      return new Completer().future;
    }
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


void main() {
  // create [ReceivePort] for this isolate
  ReceivePort receivePort;
  
  // build files
  Future aFuture = new Builder()
      .readEgbFile(new File(getPath("scripter_test_alternate_6.egb")))
      .chain((Builder b) => b.writeDartFiles());
  Future bFuture = new Builder()
      .readEgbFile(new File(getPath("scripter_test_save.egb")))
      .chain((Builder b) => b.writeDartFiles());
  
  Futures.wait([aFuture, bFuture]).then((_) {
    group("Scripter basic", () {
      test("interface initial values correct", () {
        var interface = new MockInterface();
        expect(interface.started,
            false);
        expect(interface.closed,
            false);
        expect(interface.userQuit.isComplete,
            isFalse);
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
          var interface;
          var runner;
          
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          interface = new MockInterface();
          interface.choicesToBeTaken.addAll(
              [0, 1, 0, 1, 0, 1]
          );
          var storage = new MemoryStorage();
          runner = new EgbRunner(receivePort, scripterPort, 
              interface, storage.getDefaultPlayerProfile());
          
          runner.endOfBookReached.then(expectAsync1((_) {
            expect(interface.latestOutput,
            "End of book.");
            expect(interface.choicesToBeTaken.length,
                0);
            
            runner.stop();
          }));
          
          runner.run();
        });
        
        test("doesn't walk through when it shouldn't", () {
          var interface;
          var runner;

          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          interface = new MockInterface();
          interface.choicesToBeTaken = new Queue<int>.from(
              [0, 1, 0, 1, 0, 0]
          );
          var storage = new MemoryStorage();
          runner = new EgbRunner(receivePort, scripterPort, 
              interface, storage.getDefaultPlayerProfile());
          
          interface.userQuit.then(expectAsync1((_) {
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
          var interface;
          var runner;
          
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          interface = new MockInterface();
          interface.choicesToBeTaken = new Queue<int>.from(
              [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          );
          var storage = new MemoryStorage();
          runner = new EgbRunner(receivePort, scripterPort, 
              interface, storage.getDefaultPlayerProfile());
          
          interface.userQuit.then(expectAsync1((_) {
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
  
    group("Scripter saving", () {
      setUp(() {
        receivePort = new ReceivePort();
      });
      
      test("saveables versus non-saveables", () {
        SendPort scripterPort = spawnUri("files/scripter_test_save_main.dart");
        var interface = new MockInterface();
        interface.choicesToBeTaken = new Queue<int>.from(
            [0]
        );
        var storage = new MemoryStorage();
        var playerProfile = storage.getDefaultPlayerProfile();
        var runner = new EgbRunner(receivePort, scripterPort, 
            interface, playerProfile);
        
        runner.endOfBookReached.then(expectAsync1((_) {
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
          }));
          
        }));
        
        runner.run();
      });
    });
  });

}