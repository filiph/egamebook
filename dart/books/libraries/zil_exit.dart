part of zil;

/**
 * Exits are links between Rooms. Normally, the are the only means of
 * transportation in the ZIL environment for both the [ZilPlayer] and the
 * [AIActor]s.
 *
 * They are always one-way. This means that the author can easily create things
 * like 'slides' or 'human canons' or whatever. More importantly, the reporting
 * of movement through the environment can be much more natural (instead of
 * "you go from the bridge to the corridor", the player can read things like
 * "you enter the corridor").
 */
class Exit extends Entity {
  /// The origin.
  Room from;
  /// The destination.
  Room to;
  /// If this function returns [:false:], the exit is unavailable.
  final CheckFunction requirement;
  /// This is how much time (or other resource) it takes to traverse this exit
  /// from one room to another. This allows for long corridors next to small
  /// rooms, for example. It defaults to 1.
  final int cost;

  /// Because the [to] Room can be unavailable at the time of instantiation,
  /// the destination is given by its [Room.name].
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
  /// be the destination room ([to])).
  final String arriveDescription;

  /**
   * Create an exit to a room as defined by [pageName] (because each [Room]
   * needs to correspond to a [EgbPage]).
   */
  Exit(this.destinationPageName, this.descriptionInfinitive,
      this.arriveDescription, {this.requirement: null, this.cost: 1})
      : super("Exit", false, Pronoun.IT, Actor.NEUTRAL, false) {
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
          zil.update(cost - 1, describe: false,
               whileString: Storyline.addParticleToFirstOccurence(
                  "on your way to <object>", Storyline.OBJECT, to)
          );
        }
        player.report(arriveDescription, object: to);
        echo(storyline.toString());
        storyline.clear();
        goto(to.name);
      });
    }
  }

  int get _uniqueIdentifier => "$destinationPageName>>$descriptionInfinitive"
      ">>$arriveDescription".hashCode;

  static Map<String,dynamic> iterableToMap(Iterable<Exit> exits) {
    Map<String,dynamic> map = new Map<String,dynamic>();
    exits.forEach((Exit exit) {
      // Duplicate exit unique identifiers?
      assert(!map.containsKey("${exit._uniqueIdentifier}"));
      map["${exit._uniqueIdentifier}"] = {
          "isActive": exit.isActive
      };
    });
    return map;
  }

  static void updateIterableFromMap(Map<String,dynamic> map,
                                    Iterable<Exit> exits) {
    map.forEach((key, Map exitMap) {
      Exit exit = exits.singleWhere((exit) =>
          exit._uniqueIdentifier == int.parse(key));
      exit.isActive = exitMap["isActive"];
    });
  }
}

typedef bool CheckFunction(Actor actor);