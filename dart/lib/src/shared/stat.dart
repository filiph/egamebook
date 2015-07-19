library stat;

import 'message.dart';
import '../persistence/saveable.dart';

/**
 * [StatBase] is the common interface of the [Stat] in [EgbScripter] and the
 * limited [UIStat] in [EgbPresenter].
 */
abstract class StatBase {
  /// The name of the stat. Ex.: "energy".
  String get name;
  /// The optional description of the Stat. To be shown when player somehow
  /// interacts with the stat (e.g. click in HtmlPresenter).
  String get description;
  /// The color associated with this stat. It should be an HTML-recognizable
  /// string (e.g. "blue", or "#ff00ff").
  String get color;
  /// The higher the priority, the more prominently (top-side) the Stat will
  /// be shown.
  int get priority;
  /// Signifies whether to show the Stat in the presenter or not. Sometimes,
  /// it's useful to hide a Stat from player before he can use it.
  bool get show;
  /// When set to [:true:], and when [:show == true:] and
  /// [:this.changed == true:], the presenter should notify the player on
  /// the change (e.g. by blinking once).
  bool get notifyOnChange;

  /// The current [String] value of the stat. Can be just a number (as with
  /// points), but most often it is something else (e.g. "2:12am", "$32", ...).
  String get string;

  String toString() => string;

  static const String DEFAULT_COLOR = "#CCCCCC";
}

/**
 * Only the part of the [Stat] that can be updated during gameplay. (The rest
 * stays the same.) This is sent from [EgbScripter] to [EgbInterface].
 */
class StatUpdate {
  StatUpdate(this.show, this.string);
  final bool show;
  final String string;

  Map<String, Object> toMap() => {
    "show": show,
    "string": string
  };
  StatUpdate.fromMap(Map<String, Object> map)
      : show = map["show"],
        string = map["string"];
}

class StatUpdateCollection {
  final Map<String, StatUpdate> _updates = new Map<String, StatUpdate>();
  StatUpdateCollection();
  void add(String name, StatUpdate update) {
    _updates[name] = update;
  }
  Map<String, Object> toMap() {
    Map<String, Object> map = new Map<String, Object>();
    _updates.forEach((String name, StatUpdate update) {
      map[name] = update.toMap();
    });
    return map;
  }
  StatUpdateCollection.fromMap(Map<String, Object> map) {
    map.forEach((String name, Object o) {
      _updates[name] = new StatUpdate.fromMap(o as Map<String, Object>);
    });
  }

  void forEach(_StatUpdateCollectionForEachCallback function) {
    _updates.forEach(function);
  }
}

typedef void _StatUpdateCollectionForEachCallback(String name,
                                                  StatUpdate update);

class UIStat implements StatBase {
  String name;
  String description;
  String color;
  int priority;
  bool show;
  bool notifyOnChange = true; // TODO: implement
  String string;

  UIStat(this.name, this.description, this.color, this.priority, this.show, this.notifyOnChange, this.string);

  /// Gets the Map from the [STAT_UPDATE] EgbMessage (as generated with
  /// [Stat._toMessageChangedOnly] and updates the [_stats] from it.
  ///
  /// Returns the list of the changed stats.
  static List<UIStat> updateStatsList(List<UIStat> statsList,
      StatUpdateCollection updates) {
    List<UIStat> changedStats = new List<UIStat>();
    updates.forEach((String name, StatUpdate update) {
      var stat = statsList.singleWhere((st) => st.name == name);
      stat.show = update.show;
      stat.string = update.string;
      changedStats.add(stat);
    });
    return changedStats;
  }

  /// Creates a list of [UIStat] objects from an EgbMessage of type [STATS_SET].
  /// The list is sorted by [priority].
  static List<UIStat> overwriteStatsListFromDataStructure(List<Map<String,
      Object>> list) {
    var statsList = new List<UIStat>(list.length);
    int i = 0;
    for (Map<String, Object> statMap in list) {
      var stat = new UIStat(statMap["name"], statMap["description"],
          statMap["color"], statMap["priority"], statMap["show"],
          statMap["notifyOnChange"], statMap["string"]);
      statsList[i] = stat;
      i += 1;
    }
    statsList.sort((a, b) => b.priority - a.priority);
    return statsList;
  }
}

/**
 * This class is holding different statistics that are to be shown to the
 * player. These should be visible all the time on the presenter alongside
 * [PointCouter]. Thus, it is discouraged to use too many Stats.
 *
 * A set of all Stats can always be accessed by the static method Stats.all.
 *
 * [T] needs to either be [Saveable] or a primitive type. TODO: check
 */
class Stat<T> implements StatBase, Saveable {
  /// The name of the stat. Ex.: "energy".
  final String name;
  /// The optional description of the Stat. To be shown when player somehow
  /// interacts with the stat (e.g. click in HtmlPresenter).
  final String description;

  /// Lambda that takes care of of converting the [value] to a String that
  /// can be shown in the presenter.
  final ValueToStringLambda valueToString;

  /// The color associated with this stat. It should be an HTML-recognizable
  /// string (e.g. "blue", or "#ff00ff").
  final String color;
  /// The higher the priority, the more prominently (top-side) the Stat will
  /// be shown.
  final int priority;
  /// The current value. It can be a real number, but when showed, it will
  /// always be rounded and showed as an integer.
  T get value => _value;
  set value(T val) {
    if (_value != val) {
      _value = val;
      changed = true;
      someChanged = true;
    }
  }
  T _value;

  /// Signifies whether to show the Stat in the presenter or not. Sometimes,
  /// it's useful to hide a Stat from player before he can use it.
  bool get show => _show;
  set show(bool value) {
    if (_show != value) {
      _show = value;
      changed = true;
      someChanged = true;
    }
  }
  bool _show;

  /// When set to [:true:], and when [:show == true:] and
  /// [:this.changed == true:], the presenter should notify the player on
  /// the change (e.g. by blinking once).
  bool notifyOnChange = true; // TODO: implement

  factory Stat(String name, ValueToStringLambda valueToString, {String
      description, String color: StatBase.DEFAULT_COLOR, int priority: 0, num
      initialValue: 0, bool show: true}) {
    Stat stat;
    if (_stats.containsKey(name)) {
      //print("Warning: A Stat with name '$name' already exists.");
      stat = _stats[name];
      assert(stat.description == description);
      assert(stat.color == color);
      assert(stat.priority == priority);
    } else {
      stat = new Stat._internal(name, description, valueToString, color,
          priority);
    }
    stat._value = initialValue;
    stat._show = show;
    _stats[name] = stat;
    return stat;
  }

  Stat._internal(this.name, this.description, this.valueToString, this.color, this.priority);

  /// Signifies if the [value] (or [show] state) has changed since last time.
  /// Consumer of Stat should set this value to [:false:] once it updates
  /// the representation of the Stat.
  bool changed = false;

  String get string => valueToString(value);

  /// True if one of the stats got changed.
  static bool someChanged = false;

  static final Map<String, Stat> _stats = new Map<String, Stat>();
  static Set<Stat> get all => _stats.values;

  /**
   * Take all Stats, find updated ones, and send only those, in the form of
   * [StatUpdateCollection].
   */
  static StatUpdateCollection createUpdates() {
    StatUpdateCollection updates = new StatUpdateCollection();
    _stats.values.where((stat) => stat.changed).forEach((Stat stat) {
      StatUpdate update = new StatUpdate(stat.show, stat.string);
      stat.changed = false; // reset back to unchanged status
      updates.add(stat.name, update);
    });
    someChanged = false; // reset the static state to unchanged
    return updates;
  }

  /**
   * Take all Stats, and create a big data structure of them. This is for
   * sending from [EgbScripter] to [EgbInterface].
   */
  static List<Map<String, Object>> createStatList() {
    List<Map<String, Object>> list = new List<Map<String, Object>>();
    _stats.values.forEach((Stat stat) {
      var statMap = new Map<String, Object>();
      statMap["name"] = stat.name;
      statMap["description"] = stat.description;
      statMap["color"] = stat.color;
      statMap["priority"] = stat.priority;
      statMap["show"] = stat.show;
      statMap["notifyOnChange"] = stat.notifyOnChange;
      statMap["string"] = stat.string;
      list.add(statMap);
    });
    return list;
  }

  String className = "Stat";

  /// The [Saveable.toMap] function.
  Map<String, Object> toMap() => {
      "name": this.name,
      "value": this.value,
      "show": this.show
  };

  void updateFromMap(Map<String, Object> map) {
    assert(map["name"] == this.name);
    this.value = map["value"];
    this.show = map["show"];
  }
}

typedef String ValueToStringLambda(Object o);
