part of storyline;

/// Entity is a thing, a creature, a robot, or a person that is an interactive
/// part of the gamebook environment.
///
/// They have a [name], they are referred to by a [pronoun] and more often
/// than not they are at a [location].
class Entity extends Object with EntityBehavior {
  /// Used to allow passing arguments that are automatically generated from
  /// context. In this case, a method can accept both a [:null:] Entity (i.e.
  /// what makes most sense given other arguments) or [Entity.NOTHING] (i.e.
  /// nothing/nobody).
  static final Entity NOTHING = new Entity(name: "__NOTHING__");

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

  @override
  final Team team;

  final bool isPlayer;

  final Pronoun pronoun;

  Entity(
      {this.name,
      this.pronoun: Pronoun.IT,
      Team team,
      this.isPlayer: false,
      this.nameIsProperNoun: false})
      : this.team = team ?? neutralTeam;

  Entity._(
      this.name, this.nameIsProperNoun, this.pronoun, Team team, this.isPlayer)
      : this.team = team ?? neutralTeam;

  /// An entity's [id] is the only constant thing. All other things, including
  /// [name] can change during play. ID cannot.
  ///
  /// By default, id is the same as hashCode. But for classes that override
  /// hashCode (for example, immutable ones), this should be overridden.
  int get id => hashCode;

  /// Whether or not this entity should be shown to the player. This can be useful
  /// for entities that are only relevant later in the game (i.e. after player
  /// does something else) or items that become irrelevant after use.
  @override
  bool get isActive => true;

  /// True if Actor is alive, i.e. not destroyed or dead.
  @override
  bool get isAlive => true;
}

/// Mixin that adds important methods and getters to Entity-like classes.
abstract class EntityBehavior {
  bool get isActive;

  bool get isAlive;

  bool get isAliveAndActive => isAlive && isActive;

  Team get team;

  Report createReport(String text, {Entity object}) {
    return new Report(text, subject: this as Entity, object: object);
  }

  void report(Storyline storyline, String text,
      {Entity object,
      Entity objectOwner,
      bool positive: false,
      bool negative: false,
      bool but: false,
      bool endSentence: false,
      bool wholeSentence: false,
      bool subjectAndObjectAreEnemies: false,
      int actionThread,
      bool isSupportiveActionInThread: false}) {
    storyline.add(text,
        subject: this as Entity,
        object: object,
        objectOwner: objectOwner,
        positive: positive,
        negative: negative,
        subjectAndObjectAreEnemies: subjectAndObjectAreEnemies,
        but: but,
        endSentence: endSentence,
        wholeSentence: wholeSentence,
        actionThread: actionThread,
        isSupportiveActionInThread: isSupportiveActionInThread);
  }
}
