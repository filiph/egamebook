library egb_page;

/**
 *  Base class for a page in an egamebook. A page has a unique [name] and some
 *  options.
 *
 *  It is a base class for [BuilderPage] and [ScripterPage].
 */
class Page {
  /// Name of the page.
  String name;
  /// If the page will be visited only once.
  bool visitOnce;
  /// If the page will be shown only once.
  bool showOnce;

  /// Creates new Page with optional [name], [visitOnce] and [showOnce].
  Page({this.name, this.visitOnce: false, this.showOnce: false});

  /// Returns string representation of Page - its [name].
  String toString() => name;
  
  /**
   *  Returns group name.
   *
   *  When [name] starts with "Something: ", then "Something" is the name of
   *  the group this page belongs to. This is important so that pages in
   *  one group can easily link to each other without repeating the group
   *  prefix all the time.
   *  
   *  Returns [:null:] when page has no group ([name] doesn't contain ": ").
   *
   *  Throws in case of name equal to [:null:].
   */
  String get groupName {
    if (name == null) throw "Accessed groupName Page has name = null.";
    
    int index = name.indexOf(": ");
    if (index > 0) {
      return name.substring(0, index);
    } else {
      return null;
    }
  }

  /// Returns name of the page without the group the page belongs to
  /// (if available).
  ///
  /// Throws in case of name equal to [:null:].
  String get nameWithoutGroup {
    if (name == null) throw "Accessed nameWithoutGroup Page has name = null.";
    
    int index = name.indexOf(": ");
    if (index > 0 && index < name.length - 2) {
      return name.substring(index + 2);
    } else {
      return name;
    }
  }
}

