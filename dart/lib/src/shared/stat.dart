library stat;

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
  static final DEFAULT_COLOR = "#cccccc";
  /// The higher the priority, the more prominently (top-side) the Stat will
  /// be shown.
  final int priority;
  /// The current value. It can be a real number, but when showed, it will 
  /// always be rounded and showed as an integer.
  num _value;
  num get value => _value;
  set value(val) {
    if (_value != val) {
      _value = val;
      changed = true;
      someChanged = true;
    }
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
    if (_stats.containsKey(name)) {
      throw new StateError("A Stat with name '$name' already exists.");
    } else {
      final stat = 
          new Stat._internal(name, description, format, color, priority);
      stat._value = initialValue;
      stat._show = show;
      _stats[name] = stat;
      return stat;
    }
  }
  
  Stat._internal(this.name, this.description, this.format, this.color, 
      this.priority);
  
  /// Signifies if the [value] (or [show] state) has changed since last time.
  /// Consumer of Stat should set this value to [:false:] once it updates
  /// the representation of the Stat. 
  bool changed = false;
  
  /// True if one of the stats got changed.
  static bool someChanged = false;
  
  static final Map<String,Stat> _stats = new Map<String,Stat>();
  static Set<Stat> get all => _stats.values;
}