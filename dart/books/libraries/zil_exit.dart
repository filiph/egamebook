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
  
  /// Description that works with "You can ___" or "A possible option is 
  /// to ___". 
  /// Examples: "walk to the bridge", "squeeze through the hatchway".
  final String descriptionInfinitive;
  
  /**
   * Create an exit to a room as defined by [pageName] (because each [Room]
   * needs to correspond to a [EgbPage]).
   */
  Exit(this.destinationPageName, this.descriptionInfinitive,
      {this.requirement: null, this.cost: 1}) 
      : super("Exit", Pronoun.IT, Actor.NEUTRAL, false) {
  }

  /**
   * Returns true if the exit is currently passable by actor.
   */
  bool isPassable(ZilActor actor) {
    if (!isActive) return false;
    if (requirement == null) return true;
    return requirement(actor);
  }
  
  /**
   * Creates a choice for given [player] assuming the actor is in [from] and
   * meets the [requirement].
   */
  void createChoiceForPlayer(ZilPlayer player) {
    assert(player.location == from);
    if (isPassable(player)) {
      choice(descriptionInfinitive, script: () {
        echo("You leave to ${to.description}.");
        goto(to.name);
      });
    }
  }
}

typedef bool CheckFunction(Actor actor);