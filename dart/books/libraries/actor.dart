library actor;

import 'storyline.dart';

/**
 * Entity is a thing, a creature, a robot, or a person that is an interactive
 * part of the gamebook environment.
 * 
 * They have a [name], they are referred to by a [pronoun] and more often
 * than not they are at a [location].
 */
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
 * Actor is a game [Entity] that is (often) capable of _acting_ on its own. 
 * Player is just one instance of an actor. A friendly NPC is another one.
 * On a higher level of abstraction, a spaceship (populated by people) is 
 * an Actor.
 * 
 * Each actor is a part of a [team]. This affects whether they are hostile
 * or not towards other actors. 
 */
class Actor extends Entity {
  Actor({String name, this.team: NEUTRAL, this.isPlayer: false,
    pronoun: Pronoun.IT}) : super(name, pronoun: pronoun);
  
  static const int NEUTRAL = 0;
  static const int FRIEND = 1;
  static const int DEFAULT_ENEMY = 2;
  
  bool isEnemyOf(Actor other) {
    if (team == NEUTRAL || other.team == NEUTRAL) return false;
    return team != other.team;
  }
  
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

