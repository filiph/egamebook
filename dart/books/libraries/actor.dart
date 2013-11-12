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
  Entity(this.name, {this.pronoun: Pronoun.IT, this.team: Actor.NEUTRAL, 
    this.isPlayer: false});
  
  final String name;
  int team = Actor.NEUTRAL;
  
  bool isEnemyOf(Actor other) {
    if (team == Actor.NEUTRAL || other.team == Actor.NEUTRAL) return false;
    return team != other.team;
  }
  
  /**
   * Whether or not this entity should be shown to the player. This can be useful
   * for entities that are only relevant later in the game (i.e. after player
   * does something else) or items that become irrelevant after use.
   */
  bool isActive = true;
  final bool isPlayer;

  final Pronoun pronoun;
  // TODO: needsArticle (handkerchief does, Gorilla doesn't, captain's gun doesn't)
  // TODO: alreadyReferredTo (false? article = a. true? article = the)
  
  void report(String text, {Entity object}) {
    storyline.add(text, subject: this, object: object); // TODO: add stuff
  }
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
  Actor({String name, int team: NEUTRAL, bool isPlayer: false,
    Pronoun pronoun: Pronoun.IT}) 
    : super(name, pronoun: pronoun, team: team, isPlayer: isPlayer);
  
  static const int NEUTRAL = 0;
  static const int FRIEND = 1;
  static const int DEFAULT_ENEMY = 2;
  
  /// True if Actor is alive, i.e. not destroyed or dead.
  bool get isAlive => true;
  bool get isAliveAndActive => isAlive && isActive;

}

class Player extends Actor {
  Player() : super(name: "player", pronoun: Pronoun.YOU,
                   team: Actor.FRIEND, isPlayer: true) {
  }
}

