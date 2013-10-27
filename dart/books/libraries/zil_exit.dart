part of zil;

class Exit extends Entity {
  Room from;
  Room to;
  /// If this function returns [:false:], the exit is unavailable.
  final CheckFunction requirement;
  /// This is how much time (or other resource) it takes to traverse this exit
  /// from one room to another. This allows for long corridors next to small
  /// rooms, for example. It defaults to 1.
  final int cost;
  
  final String destinationPageName;
  
  /**
   * Create an exit to a room as defined by [pageName] (because each [Room]
   * needs to correspond to a [EgbPage]).
   */
  Exit(this.destinationPageName, {this.requirement: null, this.cost: 1}) 
      : super("Exit") {
  }

  // TODO PlayerOnlyExit("SecretDoor"),
  

}

typedef bool CheckFunction();