library persistence_test;

import 'dart:convert';
import 'package:test/test.dart';
import 'package:egamebook/src/persistence/storage.dart';
import 'package:egamebook/src/persistence/savegame.dart';
import 'package:egamebook/src/persistence/player_profile.dart';
import 'package:egamebook/src/shared/message.dart';
import 'package:egamebook/scripter.dart';

// Removes all white space from a String.
String removeWhiteSpace(String string)
  => string.replaceAll(new RegExp(r"\s+"), "");

void main() {
  group("Memory store", () {
    MemoryStore store;
    String STORE_NAME = "default::ProxyStubBOOK::1234567";
    Map values = {"uid": "1234567", "currentPageName": "Start"};

    setUp(() {
      store = new MemoryStore();
    });

    test("Save", () {
      expect(store.memory, isNotNull);

      store.save(STORE_NAME, JSON.encode(values)).then(expectAsync((value) {
        expect(value, isTrue);

        String valuesFromStore = store.memory[STORE_NAME];
        expect(valuesFromStore, isNotNull);
        expect(JSON.decode(valuesFromStore), values);
      }));
    });

    test("Save and load", () {
      store.save(STORE_NAME, JSON.encode(values)).then(expectAsync((value) {
        store.load(STORE_NAME).then(expectAsync((valueFromStore) {
          expect(valueFromStore, isNotNull);
          expect(JSON.decode(valueFromStore), values);
        }));
      }));
    });

    test("Delete", () {
      store.save(STORE_NAME, JSON.encode(values)).then(expectAsync((value) {
        store.delete(STORE_NAME).then(expectAsync((boolValue) {
          expect(boolValue, isTrue);
          expect(store.memory[STORE_NAME], isNull);
        }));
      }));
    });

    test("Get default player profile", () {
      PlayerProfile profile = store.getDefaultPlayerProfile();
      expect(profile, isNotNull);
      expect(profile.playerUid, Store.DEFAULT_PLAYER_UID);
    });
  });

  group("Savegame", () {
    Savegame savegame;
    String exampleJson =
    '''
    {
      "uid": "a253e70",
      "currentPageName": "Start",
      "pageMapState": {
        "Start": {"visitCount": 0},
        "Start: Funeral": {"visitCount": 10}
      },
      "vars": {
        "points": {"points": 20, "_class": "PointsCounter"},
        "isEngineer": false,
        "isStrong": false
      },
      "timestamp": 1437059264436
    }''';

    test("From JSON", () {
      savegame = new Savegame.fromJson(exampleJson);
      expect(savegame.uid, "a253e70");
      expect(savegame.vars, new isInstanceOf<Map>());
      expect(savegame.vars.length, 3);
    });

    test("From and to JSON", () {
      savegame = new Savegame.fromJson(exampleJson);
      String savegameJson = savegame.toJson();
      expect(savegameJson, isNotNull);
      expect(removeWhiteSpace(savegameJson), removeWhiteSpace(exampleJson));
    });

    test("toMessage", () {
      savegame = new Savegame.fromJson(exampleJson);
      Message message = savegame.toMessage(Message.SAVE_GAME);
      expect(message, isNotNull);
      expect(message.type, Message.SAVE_GAME);
      expect(message.strContent, isNotNull);
      expect(message.strContent, savegame.toJson());
    });

    test("toMessage throws", () {
      savegame = new Savegame.fromJson(exampleJson);
      expect(() => savegame.toMessage(Message.QUIT), throws);
    });

    test("fromMessage", () {
      Message message = new Message.saveGame(exampleJson);
      savegame = new Savegame.fromMessage(message);
      expect(savegame, isNotNull);
      expect(savegame.uid, "a253e70");
      expect(savegame.vars, new isInstanceOf<Map>());
      expect(savegame.vars["isEngineer"], false);
      expect(savegame.timestamp, 1437059264436);
    });

    test("importSavegameToVars", () {
      Map vars = {
        "points": new PointsCounter()
            ..add(10),
        "isEngineer": true,
        "isStrong": true
      };
      savegame = new Savegame.fromJson(exampleJson);
      expect(savegame.vars, isNotNull);
      expect(savegame.vars.isNotEmpty, isTrue);
      expect(vars["points"].sum, 10);
      expect(vars["isEngineer"], true);
      expect(vars["isStrong"], true);

      Savegame.importSavegameToVars(savegame, vars);
      expect(vars["points"].sum, 20);
      expect(vars["isEngineer"], false);
      expect(vars["isStrong"], false);
    });
  });
}