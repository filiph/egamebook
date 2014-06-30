part of storyline;

/**
 * Entity is a thing, a creature, a robot, or a person that is an interactive
 * part of the gamebook environment.
 * 
 * They have a [name], they are referred to by a [pronoun] and more often
 * than not they are at a [location].
 */
class Entity {
  Entity.withOptions(this.name, {this.pronoun: Pronoun.IT, this.team: Actor.NEUTRAL, 
    this.isPlayer: false, this.nameIsProperNoun: false});
  
  Entity(this.name, this.nameIsProperNoun, this.pronoun, this.team, this.isPlayer);

  /// Used to allow passing arguments that are automatically generated from
  /// context. In this case, a method can accept both a [:null:] Entity (i.e.
  /// what makes most sense given other arguments) or [Entity.NOTHING] (i.e.
  /// nothing/nobody).
  static final Entity NOTHING = new Entity.withOptions("__NOTHING__");
  
  /// A proper noun of an entity is a unique name: like "John" for a character
  /// or "Sun" for our star, or "Painless" for the gun in the movie Predator.
  /// http://en.wikipedia.org/wiki/Proper_noun
  /// 
  /// If [nameIsProperNoun] is [:true:], then [name] is treated as a proper
  /// noun. No article ("the"/"a") is prepended before proper nouns, and they rarely
  /// should need <owner's>. ("Your The Bodega" doesn't feel right.)
  /// 
  /// This is [:false:] by default.
  final bool nameIsProperNoun;
  
  /// The name of the entity is how it is primarily referred to. It is different
  /// from [nameIsProperNoun] because it's generic. There can be any number of "F-16s"
  /// and it's their name, but it's not their proper name.
  final String name;
  
  /// Categories are secondary ways to refer to the entity. For example, "front
  /// laser" has several categories, like "gun" or "laser". Whenever possible,
  /// these categories are used. When two entities have overlapping categories
  /// in one sentence, only the non-overlapping ones are used.
  final List<String> categories = new List<String>();
  
  /// When an entity is [alreadyMentioned], it will be used with the definite
  /// article ("the"). Otherwise, the indefinitey article ("a") will be used.
  /// 
  /// The articles won't be used woth [nameIsProperNoun].
  /// 
  /// This field is by default set to [:true:]. The reason behind this is that
  /// in most cases, the entities in the simulation have been described in
  /// text, or are understood to be known to the player character ("You take
  /// the gun and walk out of the room.").
  bool alreadyMentioned = true;
  
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
  
  Report createReport(String text, {Entity object}) {
    return new Report(text, subject: this, object: object);
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
  Actor({String name, bool nameIsProperNoun: false, int team: NEUTRAL, 
    bool isPlayer: false, Pronoun pronoun: Pronoun.IT})
    : super(name, nameIsProperNoun, pronoun, team, isPlayer);
  
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

