library egb_savegame;

import 'dart:convert' show JSON;

import '../shared/message.dart';
import 'saveable.dart';

/**
 * Savegame stores information of one point in time of the gameplay. This
 * includes the [currentPageName], information about visited pages
 * ([pageMapState] and [vars] defined by author.
 */
class Savegame {
  /// The page on which this savegame was created. Savegames are always created
  /// at the very end of the page, just before the player is presented with
  /// choices.
  String currentPageName;

  /// Holds information about visited pages and potentially other info.
  Map<String, dynamic> pageMapState;

  /// The serializable part of the [:vars:] map.
  Map<String, Object> vars;
  // TODO: points -- NO!! points are per playthrough, but shouldn't be saved with savegame (i think)

  /**
   * Every savegame can define the text history that should prepend it.
   *
   * When a savegame is opened, [textHistory] is printed so that player is
   * reminded about the context.
   *
   * Normally, [textHistory] is the rendered contents of the current
   * page.
   */
  String textHistory;

  /// The [uid] uniquely defines this savegame for later retrieval.
  String uid;

  /// Timestamp of the moment when this savegame was created, in milliseconds
  /// since Epoch.
  int timestamp;

  /// Creates new Savegame with [currentPageName], Map of [_vars]
  /// and information about visited pages [pageMapState].
  Savegame(String this.currentPageName, Map _vars, this.pageMapState) {
    vars = _dissolveToPrimitives(_vars);
    timestamp = new DateTime.now().millisecondsSinceEpoch;
    uid = this.hashCode.toRadixString(16); // TODO: is this unique enough?
  }

  /// Creates new Savegame from JSON. The JSON has to contain either
  /// key for [currentPageName] or for [vars], or both. If there are no keys
  /// like that, [InvalidSavegameException] is thrown.
  Savegame.fromJson(String json) {
    Map<String, dynamic> saveMap = JSON.decode(json);
    if (!saveMap.containsKey("currentPageName") ||
        !saveMap.containsKey("vars")) {
      throw new InvalidSavegameException("Invalid JSON for Savegame. "
          "Doesn't contain required fields 'currentPageName' or 'vars'. "
          "JSON='$json'.");
    }
    uid = saveMap["uid"];
    currentPageName = saveMap["currentPageName"];
    timestamp = saveMap["timestamp"];
    pageMapState = saveMap["pageMapState"];
    vars = saveMap["vars"];
    if (saveMap.containsKey("previousText")) {
      textHistory = saveMap["previousText"];
    }
  }

  /// Creates new Savegame from [Message]. It uses its String
  /// content saved as JSON.
  factory Savegame.fromMessage(Message message) {
    return new Savegame.fromJson(message.strContent);
  }

  /// Returns current savegame as [Message].
  ///
  /// Parameter [type] has to match either type [Message.SAVE_GAME]
  /// or [Message.LOAD_GAME].
  Message toMessage(int type) {
    if (type != Message.SAVE_GAME && type != Message.LOAD_GAME) {
      throw "Cannot create Message of type $type. Can only be MSG_SAVE_GAME "
          "(${Message.SAVE_GAME}) or MSG_LOAD_GAME "
          "(${Message.LOAD_GAME}).";
    }
    Message message = new Message(type);
    message.strContent = toJson();
    return message;
  }

  /// Returns current savegame as JSON string.
  String toJson() {
    Map<String, dynamic> saveMap = new Map<String, dynamic>();
    saveMap["uid"] = uid;
    saveMap["currentPageName"] = currentPageName;
    saveMap["pageMapState"] = pageMapState;
    saveMap["vars"] = vars; // This has been already dissolved to primitives
    // in the contructor.
    saveMap["timestamp"] = timestamp;
    if (textHistory != null) {
      saveMap["previousText"] = textHistory;
    }
    return JSON.encode(saveMap);
  }

  /// Returns String representation of savegame.
  /// It is current savegame as JSON string.
  String toString() => toJson();

  /**
   * Returns true if [variable] is [Saveable] or a primitive type ([:null:],
   * [:String:], [:int:], [:num:], [:bool:], [:List:], [:Map:])
   */
  static bool _isSaveable(variable) {
    bool primitivelySaveable = (variable == null ||
        variable is String ||
        variable is int ||
        variable is num ||
        variable is bool ||
        variable is List ||
        variable is Map);
    if (primitivelySaveable) return true;
    return _isCustomSaveableClass(variable);
  }

  /// Returns true if [variable] is instance of [Saveable].
  static bool _isCustomSaveableClass(variable) {
    return variable is Saveable; // TODO cease to use if this really works

    // The below is an ugly way to check for saveable-ness without
    // the need of full scale mirroring.
//    bool customClassSaveable;
//    try {
//      variable.toMap();
//      customClassSaveable = true;
//    } on NoSuchMethodError catch (e) {
//      customClassSaveable = false;
//    }
//    return customClassSaveable == true;
  }

  /**
   * Takes a variable and copies it to a variable that only contains
   * primitive types ([:null:], [:String:], [:int:], [:num:], [:bool:], [:List:],
   * [:Map:]) ready to be JSONified.
   *
   * When a non-primitive type is detected and it supports the toMap()
   * function, it will be included. Everything else will be ignored.
   *
   * Works recursively, so a Map of Maps is a valid input.
   */
  static dynamic _dissolveToPrimitives(input) {
    if (input == null ||
        input is String ||
        input is int ||
        input is num ||
        input is bool) {
      return input;
    } else if (input is List) {
      List outputList = new List();
      for (int i = 0; i < (input as List).length; i++) {
        if (_isSaveable((input as List)[i])) {
          outputList.add(_dissolveToPrimitives((input as List)[i]));
        }
      }
      return outputList;
    } else if (input is Map) {
      Map inputMap = input as Map;
      Map outputMap = new Map();
      inputMap.forEach((key, value) {
        if (_isSaveable(inputMap[key])) {
          outputMap[key] = _dissolveToPrimitives(value);
        }
      });
      return outputMap;
    } else if (_isCustomSaveableClass(input)) {
      Map<String, dynamic> saveableMap = (input as Saveable).toMap();
      saveableMap["_class"] = (input as Saveable).className;
      return _dissolveToPrimitives(saveableMap);
    } else {
      throw "Function _dissolveToPrimitivess called with a non-saveable "
          "argument type.";
    }
  }

  /**
   * Takes output of [_dissolveToPrimitives] and assembles it back to
   * non-primitive types (such as custom classes).
   *
   * When called with [updateExisting], that value will be updated instead
   * of created anew. This only applies to custom classes, all primitives
   * will be overwritten.
   */
  static dynamic _assembleFromPrimitives(
      input, Map<String, Function> constructors,
      {updateExisting}) {
    if (input == null ||
        input is String ||
        input is int ||
        input is num ||
        input is bool) {
      return input;
    } else if (input is List) {
      List outputList = new List();
      for (int i = 0; i < (input as List).length; i++) {
        outputList
            .add(_assembleFromPrimitives((input as List)[i], constructors));
      }
      return outputList;
    } else if (input is Map && !(input as Map).containsKey("_class")) {
      Map outputMap = new Map();
      (input as Map).forEach((key, value) {
        outputMap[key] = _assembleFromPrimitives(value, constructors);
      });
      return outputMap;
    } else if (input is Map && (input as Map).containsKey("_class")) {
      if (updateExisting != null) {
        // variable exists, just update it
        updateExisting.updateFromMap(input);
        return updateExisting;
      } else {
        // need to create new variable
        String className = input["_class"];
        if (constructors == null) {
          throw new IncompatibleSavegameException("No constructors set. "
              "Cannot assemble a new instance.");
        } else if (!constructors.containsKey(className)) {
          throw new IncompatibleSavegameException("Constructor for $className "
              "not set. Cannot assemble a new instance.");
        } else {
          return constructors[className](input);
        }
      }
      //return _dissolveToPrimitives(input.toMap());
    } else {
      throw "Function _assembleFromPrimitives called with a non-primitive "
          "argument type.";
    }
  }

  /// Imports vars from [Savegame] and copies them over existing [vars].
  static void importSavegameToVars(Savegame savegame, Map<String, dynamic> vars,
      {Map<String, Function> constructors}) {
    // assemble and copy / update saved variables over vars
    savegame.vars.forEach((String key, value) {
      //print("$key - $value");
      var existingValue = vars[key];
      if (existingValue == null) {
        vars[key] = _assembleFromPrimitives(value, constructors);
      } else {
        vars[key] = _assembleFromPrimitives(value, constructors,
            updateExisting: existingValue);
      }
    });
  }
}

/// IncompatibleSavegameException is an [Exception] thrown in case
/// of incompatible savegame.
class IncompatibleSavegameException implements Exception {
  /// Message describing the exception.
  final String message;

  /// Creates new IncompatibleSavegameException with error [message].
  const IncompatibleSavegameException(this.message);

  /// Returns text describing IncompatibleSavegameException with its [message].
  String toString() => "IncompatibleSavegameException: $message";
}

/// InvalidSavegameException is an [Exception] thrown in case
/// of loading of invalid savegame.
class InvalidSavegameException implements Exception {
  /// Message describing the exception.
  final String message;

  /// Creates new InvalidSavegameException with error [message].
  const InvalidSavegameException(this.message);

  /// Returns text describing InvalidSavegameException with its [message].
  String toString() => "InvalidSavegameException: $message";
}
