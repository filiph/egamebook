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
  
  /// The string that will be added to the [storyline] when player uses this
  /// exit. It should describe the process of _arriving_ to the destination.
  /// (The process of leaving is obvious from choosing the [EgbChoice]. The
  /// description of the destination [Room] comes after that -- and only if
  /// it is visited for the first time.)
  /// 
  /// Author can use [:<subject>:] (will be the player) and [:<object>:] (will
  /// be the destination room ([to]).
  final String arriveDescription;
  
  /**
   * Create an exit to a room as defined by [pageName] (because each [Room]
   * needs to correspond to a [EgbPage]).
   */
  Exit(this.destinationPageName, this.descriptionInfinitive, 
      this.arriveDescription, {this.requirement: null, this.cost: 1}) 
      : super("Exit", Pronoun.IT, Actor.NEUTRAL, false) {
    throwIfNotInInitBlock();
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
  void createChoiceForPlayer(Zil zil, ZilPlayer player) {
    assert(player.location == from);
    if (isPassable(player)) {
      choice(Storyline.getString(Storyline.capitalize(descriptionInfinitive), 
          subject: player, object: this), script: () {
        if (cost > 1) {
          player.location = null;  // So that nothing will harm the player when
                                   // he's running away, for example.
          zil.update(cost - 1, describe: false);
        }
        player.report(arriveDescription, object: to);
        goto(to.name);
      });
    }
  }
}

typedef bool CheckFunction(Actor actor);