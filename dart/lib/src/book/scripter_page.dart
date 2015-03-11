part of egb_scripter;


/**
 * In the context of [EgbScripter], we also have the actual data + logic of
 * the page in the [blocks] list.
 */
class EgbScripterPage extends EgbPage {
  /// The text and/or logic of each block inside this page.
  final List blocks;

  /// Number of times this page has been visited by player.
  int visitCount = 0;
  /// Whether or not this page has been visited by player.
  bool get visited => visitCount > 0;

  /**
   * Default constructor only takes blocks List, and optionally page options.
   * Name is copied from Map key when added to [EgbScripterPageMap].
   */
  EgbScripterPage(
      this.blocks,
      {bool visitOnce: false, bool showOnce: false}) :
        super(visitOnce: visitOnce, showOnce: showOnce);
}

/**
 * Used to store information about an exact point in the book -- page and
 * block. 
 */
class EgbScripterBlockPointer {
  final EgbScripterPage page;
  final int blockIndex;
    
  EgbScripterBlockPointer(this.page, this.blockIndex); 
}

/**
 * [EgbScripterPageMap] is the container for the whole of the text and logic
 * content of each book.
 */
class EgbScripterPageMap {
  /// A map of page name -> page object.
  final Map<String, EgbScripterPage> pages = new Map<String, EgbScripterPage>();

  EgbScripterPageMap();

  /// Returns page of exactly the name [key].
  EgbScripterPage operator [](String key) => pages[key];

  /**
   * Returns page with name [name]. If [currentGroupName] is given, then 
   * the function will first search for key in the format [:groupName: name:].
   *
   * Returns [:null:] if there is no page of any compatible name.
   */
  EgbScripterPage getPage(String name, {String currentGroupName: null}) {
    if (currentGroupName != null &&
        pages.containsKey(_getCurrentGroupName(name, currentGroupName))) {
      return pages[_getCurrentGroupName(name, currentGroupName)];
    } else if (pages.containsKey(name)) {
      return pages[name];
    } else {
      return null;
    }
  }
  
  /// Returns current group name string
  String _getCurrentGroupName(String name, String currentGroupName) 
      => "$currentGroupName: $name";

  operator []=(String key, EgbScripterPage newPage) {
    pages[key] = newPage;
    // Copy the "key" to the name of the page. This is here so that we don't
    // need to duplicate the page name in the scripter data.
    newPage.name = key;
  }

  Map<String, dynamic> exportState() {
    var pageMapState = new Map<String, dynamic>();
    pages.forEach((name, page) {
      pageMapState[name] = {
          "visitCount": page.visitCount
      };
    });
    return pageMapState;
  }

  void importState(Map<String, dynamic> pageMapState) {
    pageMapState.forEach((name, map) {
      if (pages.containsKey(name)) {
        pages[name].visitCount = map["visitCount"];
      }
    });
  }

  /**
   * Clears play state of the page map. (Play state is the data that change
   * while the egamebook is played by the player, e.g. the 
   * [EgbScripterPage.visitCount] of every page. The actual texts and scripts 
   * stay.)
   * 
   * Useful when restarting an egamebook from scratch.
   */
  void clearState() {
    pages.forEach((name, page) {
      page.visitCount = 0;
    });
  }
}