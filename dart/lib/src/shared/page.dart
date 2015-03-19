library egb_page;

/**
 *  Base class for a page in an egamebook. A page has a unique [name] and some
 *  options. 
 */
class EgbPage {
  String name;
  
  bool visitOnce;
  bool showOnce;
  
  EgbPage({this.name, this.visitOnce: false, this.showOnce: false});
  
  String toString() => name;
  
  /**
   *  When [name] starts with "Something: ", then "Something" is the name of
   *  the group this page belongs to. This is important so that pages in
   *  one group can easily link to each other without repeating the group
   *  prefix all the time.
   *  
   *  Returns [:null:] when page has no group ([name] doesn't contain ": ").
   */
  String get groupName {
    if (name == null) throw "Accessed groupName EgbPage has name = null.";
    
    int index = name.indexOf(": ");
    if (index > 0) {
      return name.substring(0, index);
    } else {
      return null;
    }
  }
  
  String get nameWithoutGroup {
    if (name == null) throw "Accessed nameWithoutGroup EgbPage has name = null.";
    
    int index = name.indexOf(": ");
    if (index > 0 && index < name.length - 2) {
      return name.substring(index + 2);
    } else {
      return name;
    }
  }
}

