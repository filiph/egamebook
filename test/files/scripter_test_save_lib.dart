library scripter_test_save_dart;

import 'package:egamebook/src/persistence/saveable.dart';

class A {
  int i;
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