library actor;

//import 'loopedevent.dart';
import 'storyline.dart';

class Entity {
  Entity(this.name, {this.pronoun: Pronoun.IT});
  
  final String name;
  
  /// Location of the entity in game. Corresponds to a [Room] and/or 
  /// a page name. It is set to [:null:] for objects that are 'nowhere'.
  String location;
  
  /**
   * Whether or not this entity should be shown to the player. This can be useful
   * for entities that are only relevant later in the game (i.e. after player
   * does something else) or items that become irrelevant after use.
   */
  bool isActive = true;

  final Pronoun pronoun;
  
  void report(String text, {Actor object}) {
    storyline.add(text, subject: this, object: object); // TODO: add stuff
  }
}

class Item extends Entity {
  Item(String name) : super(name, pronoun: Pronoun.IT);
}

/**
 * Minimal class to store information about the actor in the [Storyline].
 */
class Actor extends Entity {
  Actor({String name, this.team: DEFAULT_ENEMY, this.isPlayer: false,
    pronoun: Pronoun.IT}) : super(name, pronoun: pronoun);
  
  static const int FRIEND = 1;
  static const int DEFAULT_ENEMY = 2;
  int team;
  final bool isPlayer;
  
  /// True if Actor is alive, i.e. not destroyed or dead.
  bool get isAlive => true;
  bool get isAliveAndActive => isAlive && isActive;

}

class Player extends Actor {
  Player() : super(name: "player", pronoun: Pronoun.YOU,
                   team: Actor.FRIEND, isPlayer: true) {
  }
}

