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
  group("Memory storage", () {
    EgbStorage storage;
    String STORAGE_NAME = "default::ProxyStubBOOK::1234567";
    Map values = {"uid": "1234567", "currentPageName": "Start"};

    setUp(() {
      storage = new MemoryStorage();
    });

    test("Save", () {
      expect(storage.memory, isNotNull);

      storage.save(STORAGE_NAME, JSON.encode(values)).then(expectAsync((value) {
        expect(value, isTrue);

        String valuesFromStorage = storage.memory[STORAGE_NAME];
        expect(valuesFromStorage, isNotNull);
        expect(JSON.decode(valuesFromStorage), values);
      }));
    });

    test("Save and load", () {
      storage.save(STORAGE_NAME, JSON.encode(values)).then(expectAsync((value) {
        storage.load(STORAGE_NAME).then(expectAsync((valueFromStorage) {
          expect(valueFromStorage, isNotNull);
          expect(JSON.decode(valueFromStorage), values);
        }));
      }));
    });

    test("Delete", () {
      storage.save(STORAGE_NAME, JSON.encode(values)).then(expectAsync((value) {
        storage.delete(STORAGE_NAME).then(expectAsync((boolValue) {
          expect(boolValue, isTrue);
          expect(storage.memory[STORAGE_NAME], isNull);
        }));
      }));
    });

    test("Get default player profile", () {
      EgbPlayerProfile profile = storage.getDefaultPlayerProfile();
      expect(profile, isNotNull);
      expect(profile.playerUid, EgbStorage.DEFAULT_PLAYER_UID);
    });
  });

  group("Savegame", () {
    EgbSavegame savegame;
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
      savegame = new EgbSavegame.fromJson(exampleJson);
      expect(savegame.uid, "a253e70");
      expect(savegame.vars, new isInstanceOf<Map>());
      expect(savegame.vars.length, 3);
    });

    test("From and to JSON", () {
      savegame = new EgbSavegame.fromJson(exampleJson);
      String savegameJson = savegame.toJson();
      expect(savegameJson, isNotNull);
      expect(removeWhiteSpace(savegameJson), removeWhiteSpace(exampleJson));
    });

    test("toMessage", () {
      savegame = new EgbSavegame.fromJson(exampleJson);
      EgbMessage message = savegame.toMessage(EgbMessage.SAVE_GAME);
      expect(message, isNotNull);
      expect(message.type, EgbMessage.SAVE_GAME);
      expect(message.strContent, isNotNull);
      expect(message.strContent, savegame.toJson());
    });

    test("toMessage throws", () {
      savegame = new EgbSavegame.fromJson(exampleJson);
      expect(() => savegame.toMessage(EgbMessage.QUIT), throws);
    });

    test("fromMessage", () {
      EgbMessage message = new EgbMessage.saveGame(exampleJson);
      savegame = new EgbSavegame.fromMessage(message);
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
      savegame = new EgbSavegame.fromJson(exampleJson);
      expect(savegame.vars, isNotNull);
      expect(savegame.vars.isNotEmpty, isTrue);
      expect(vars["points"].sum, 10);
      expect(vars["isEngineer"], true);
      expect(vars["isStrong"], true);

      EgbSavegame.importSavegameToVars(savegame, vars);
      expect(vars["points"].sum, 20);
      expect(vars["isEngineer"], false);
      expect(vars["isStrong"], false);
    });
  });
}