import 'package:unittest/unittest.dart';
import 'dart:io';

import 'dart:isolate';
import '../lib/src/egb_interface.dart';
import '../lib/src/egb_library.dart';
import '../lib/src/egb_runner.dart';
import '../lib/egb_builder.dart';

// the scripter file to be tested
//import 'files/scripter_test_10x_alternate_first_second.dart';

class MockInterface implements EgbInterface {
  Queue<int> choicesToBeTaken;
  String latestOutput;
  bool started = false;
  bool closed = false;
  
  MockInterface() : choicesToBeTaken = new Queue<int>();
  
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
  
  Future<int> showChoices(ChoiceList choiceList) {
    if (choicesToBeTaken.length > 0) {
      int choiceNumber = choicesToBeTaken.removeFirst();
      print("MockInterface pick: $choiceNumber) '${choiceList[choiceNumber].string}' "
                                "-> ${choiceList[choiceNumber].hash}");
      return new Future.immediate(choiceList[choiceNumber].hash);
    } else {
      print("MockInterface pick: QUIT");
      return new Future.immediate(null);
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
  // create the isolate
  //SendPort scripterPort = spawnFunction(createScripter);
  
  new Builder().readEgbFile(new File(getPath("scripter_test_alternate_6.egb")))
  .chain((Builder b) => b.writeDartFiles())
  .then((_) {
    group("Scripter", () {
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
          var runner = new EgbRunner(receivePort, scripterPort, interface);
          expect(runner.started,
              false);
          expect(runner.ended,
              false);
          runner.stop();
        });
        
        test("walks through when it should", () {
          var interface;
          var runner;

          var callback = (Timer) {
            expect(interface.closed,
                true);
            expect(runner.ended,
                true);
            expect(interface.latestOutput,
            "End of book.");
            expect(interface.choicesToBeTaken.length,
                0);
          };
          
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          interface = new MockInterface();
          interface.choicesToBeTaken.addAll(
              [0, 1, 0, 1, 0, 1]
          );
          runner = new EgbRunner(receivePort, scripterPort, interface);
          runner.run();
          
          new Timer(1000, expectAsync1(callback)); // TODO: more elegant
        });
        
        test("doesn't walk through when it shouldn't", () {
          var interface;
          var runner;

          var callback = (Timer) {
            expect(interface.closed,
                true);
            expect(runner.ended,
                true);
            expect(interface.latestOutput,
                startsWith("Welcome (back?) to dddeee."));
          };
          
          SendPort scripterPort = spawnUri("files/scripter_test_alternate_6_main.dart");
          interface = new MockInterface();
          interface.choicesToBeTaken = new Queue<int>.from(
              [0, 1, 0, 1, 0, 0]
          );
          runner = new EgbRunner(receivePort, scripterPort, interface);
          runner.run();
          
          new Timer(1000, expectAsync1(callback)); // TODO: more elegant
        });
      });
    });
  });
}