library stat;

import 'message.dart';

/**
 * This class is holding different statistics that are to be shown to the
 * player. These should be visible all the time on the interface alongside
 * [PointCouter]. Thus, it is discouraged to use too many Stats.
 * 
 * A set of all Stats can always be accessed by the static method Stats.all.
 */
class Stat {
  /// The name of the stat. Ex.: "energy".
  final String name;
  /// The optional description of the Stat. To be shown when player somehow 
  /// interacts with the stat (e.g. click in HtmlInterface).
  final String description; 
  /// The format to use. Ex.: "? E"
  final String format;
  /// The color associated with this stat. It should be an HTML-recognizable
  /// string (e.g. "blue", or "#ff00ff").
  final String color;
  static const DEFAULT_COLOR = "#cccccc";
  /// The higher the priority, the more prominently (top-side) the Stat will
  /// be shown.
  final int priority;
  /// The current value. It can be a real number, but when showed, it will 
  /// always be rounded and showed as an integer.
  num _value;
  num get value => _value;
  set value(num val) {
    if (_value != val) {
      _value = val;
      changed = true;
      someChanged = true;
    }
  }
  
  void add(num val) {
    value = value + val;
  }
  
  Stat operator +(num val) {
    add(val);
    return this;
  }
  
  /// Signifies whether to show the Stat in the interface or not. Sometimes,
  /// it's useful to hide a Stat from player before he can use it.
  bool _show;
  bool get show => _show;
  set show(value) {
    if (_show != value) {
      _show = value;
      changed = true;
      someChanged = true;
    }
  }
  
  /// When set to [:true:], and when [:show == true:] and 
  /// [:this.changed == true:], the interface should notify the player on
  /// the change (e.g. by blinking once).
  bool notifyOnChange = true; // TODO: implement
  
  factory Stat(String name, String format,
      {String description, String color: DEFAULT_COLOR, int priority: 0,
       num initialValue, bool show: true}) {
    Stat stat;
    if (_stats.containsKey(name)) {
      print("Warning: A Stat with name '$name' already exists.");
      stat = _stats[name];
      assert(stat.description == description);
      assert(stat.format == format);
      assert(stat.color == color);
      assert(stat.priority == priority);
    } else {
      stat = new Stat._internal(name, description, format, color, priority);
    }
    stat._value = initialValue;
    stat._show = show;
    _stats[name] = stat;
    return stat;
  }
  
  Stat._internal(this.name, this.description, this.format, this.color, 
      this.priority);
  
  /// Signifies if the [value] (or [show] state) has changed since last time.
  /// Consumer of Stat should set this value to [:false:] once it updates
  /// the representation of the Stat. 
  bool changed = false;
  
  String toString() {
    return format.replaceFirst("?", value.round().toString());
  }
  
  /// True if one of the stats got changed.
  static bool someChanged = false;
  
  static final Map<String,Stat> _stats = new Map<String,Stat>();
  static Set<Stat> get all => _stats.values;
  
  /// Sends the (final) list of all stats in the game, and their current state.
  /// The optional [changedOnly] specifies if only the changed Stats should
  /// be sent.
  static EgbMessage toMessage({bool changedOnly: false}) {
    if (changedOnly) {
      return _toMessageChangedOnly();
    } else {
      return _toMessageAll();
    }
  }
  
  static EgbMessage _toMessageAll() {
    var message = new EgbMessage(EgbMessage.SET_STATS);
    message.listContent = new List<Map>();
    _stats.values.forEach((Stat stat) {
      var statMap = new Map<String,Object>();
      statMap["name"] = stat.name;
      statMap["description"] = stat.description;
      statMap["format"] = stat.format;
      statMap["color"] = stat.color;
      statMap["notifyOnChange"] = stat.notifyOnChange;
      statMap["priority"] = stat.priority;
      statMap["value"] = stat.value;
      statMap["show"] = stat.show;
      message.listContent.add(statMap);
    });
    return message;
  }
  
  /// Sends statistics that were changed and need updating on the interface.
  static EgbMessage _toMessageChangedOnly() {
    var message = new EgbMessage(EgbMessage.UPDATE_STATS);
    _stats.values.where((stat) => stat.changed).forEach((Stat stat) {
      var statMap = new Map<String,Object>();
      statMap["value"] = stat.value;
      statMap["show"] = stat.show;
      stat.changed = false;  // reset back to unchanged status
      message.mapContent[stat.name] = statMap;
    });
    someChanged = false;  // reset the static state to unchanged
    return message;
  }
  
  /// Creates a list of [Stat] objects from an EgbMessage of type [STATS_SET].
  /// The list is sorted by [priority].
  static List<Stat> statsListFromMessage(EgbMessage message) {
    if (message.type != EgbMessage.SET_STATS) {
      throw new StateError("Cannot create Stats set. "
          "Incorrect type of message");
    }
    var statsList = new List<Stat>(message.listContent.length);
    int i = 0;
    for (Map<String,Object> statMap in message.listContent) {
      var stat = new Stat(statMap["name"], statMap["format"],
          description: statMap["description"], color: statMap["color"], 
          priority: statMap["priority"], initialValue: statMap["value"], 
          show: statMap["show"]);
      statsList[i] = stat;
      i += 1;
    }
    statsList.sort((a, b) => b.priority - a.priority);
    return statsList;
  }
}