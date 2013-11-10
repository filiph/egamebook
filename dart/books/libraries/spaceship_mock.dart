library spaceship_mock;

import 'package:egamebook/src/persistence/saveable.dart';
import 'numscale.dart';

class SpaceshipMock implements Saveable {
  bool isAlive = true;
  ShipComponentCollection components = new ShipComponentCollection();
  ShipComponentMock get hull => components["hull"];
  ShipComponentMock get shield => components["shield"];
  ShipComponentMock get engine => components["engine"];
  ShipComponentMock get radar  => components["radar"];
  
  String className = "Spaceship";
  Map toMap() => {
    "isAlive": isAlive,
    "components": components
  };
  void updateFromMap(Map map) {
    isAlive = map["isAlive"];
    components.updateFromMap(map["components"]);
  }
}

class ShipComponentCollection implements Saveable {
  Map<String, ShipComponentMock> _components = 
      new Map<String,ShipComponentMock>();
  
  ShipComponentCollection() {
    _components["hull"] = new ShipComponentMock();
    _components["shield"] = new ShipComponentMock();
    _components["engine"] = new ShipComponentMock();
    _components["radar"] = new ShipComponentMock();
  }
  
  operator [](String name) {
    if (_components.containsKey(name)) {
      return _components[name];
    } else {
      //print("DEBUG ONLY: creating new component on access"); // TODO
      _components[name] = new ShipComponentMock();
      return _components[name];
    }
  }
  
  // TODO .all
  
  String className = "ShipComponentCollection";
  Map toMap() => {
    "components": _components
  };
  void updateFromMap(Map map) {
    print("updating shipcomponentcollection from map: $map");
    map["components"].forEach((String key, Map value) {
      if (_components.containsKey(key)) {
        _components[key].updateFromMap(value);
      }
    });
  }
}

class ShipComponentMock implements Saveable {
  IntScale hp = new IntScale(max: 10);
  /// A component is operational when it has at least this much HPs.
  final int minimalHp = 5;
  /// Operational means the component is able to work (but it needn't be
  /// charged right now).
  bool get isOperational => hp.value >= minimalHp;
  bool get isDamaged => hp.value < hp.max;
  
  /// The charged state of the system. Energy-based systems are 100% operational
  /// at 100% charge. Charging can be 'rushed'.
  IntScale charge = new IntScale(max: 10);
  /// A component is operational when it has more than this amount of charge.
  final int minimalCharge = 5;
  /// Charged means the component has enough charge to do it's work (even if
  /// not effectively enough).
  bool get isCharged => charge.value >= minimalCharge;
  
  bool get isActive => active && isCharged && isOperational;
  
  /// This value is always true unless the story dictates otherwise. In essence,
  /// it is an override. Set to [:false:] to not allow the player/AI to use
  /// this component.
  bool active = true;
  
  String className = "ShipComponentMock";
  Map toMap() => {
    "hp": hp,
    "charge": charge,
    "active": active
  };
  void updateFromMap(Map map) {
    hp.updateFromMap(map["hp"]);
    charge.updateFromMap(map["charge"]);
    active = map["active"];
  }
}