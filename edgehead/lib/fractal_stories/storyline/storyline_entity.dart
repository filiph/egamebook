part of storyline;

/// Entity is a thing, a creature, a robot, or a person that is an interactive
/// part of the gamebook environment.
///
/// They have a [name], they are referred to by a [pronoun] and more often
/// than not they are at a [location].
abstract class Entity {
  factory Entity(
      {String name,
      Pronoun pronoun,
      Team team,
      bool nameIsProperNoun,
      bool isPlayer}) = _NonserializableEntity;

  /// An entity's [id] is the only constant thing. All other things, including
  /// [name] can change during play. ID cannot.
  ///
  /// By default, id is the same as hashCode. But for classes that override
  /// hashCode (for example, immutable ones), this should be overridden.
  int get id;

  /// Whether or not this entity should be shown to the player. This can
  /// be useful for entities that are only relevant later in the game
  /// (i.e. after player does something else) or items that become
  /// irrelevant after use.
  bool get isActive => true;

  /// True if Actor is alive, i.e. not destroyed or dead.
  bool get isAlive => true;

  bool get isPlayer;

  /// The name of the entity is how it is primarily referred to. It is different
  /// from [nameIsProperNoun] because it's generic. There can be any number
  /// of "F-16s" and it's their name, but it's not their proper name.
  String get name;

  /// A proper noun of an entity is a unique name: like "John" for a character
  /// or "Sun" for our star, or "Painless" for the gun in the movie Predator.
  /// http://en.wikipedia.org/wiki/Proper_noun
  ///
  /// If [nameIsProperNoun] is [:true:], then [name] is treated as a proper
  /// noun. No article ("the"/"a") is prepended before proper nouns, and they rarely
  /// should need <owner's>. ("Your The Bodega" doesn't feel right.)
  ///
  /// This is [:false:] by default.
  bool get nameIsProperNoun;

  Pronoun get pronoun;

  Team get team;

  /// Convenience method that will use [storyline] to create a report
  /// about [this].
  void report(Storyline storyline, String text,
      {Entity owner,
      Entity object,
      Entity objectOwner,
      bool positive = false,
      bool negative = false,
      bool but = false,
      bool endSentence = false,
      bool wholeSentence = false,
      bool subjectAndObjectAreEnemies = false,
      int actionThread,
      bool isSupportiveActionInThread = false});
}

/// Mixin that adds important methods and getters to Entity-like classes.
abstract class EntityBehavior {
  bool get isActive;

  bool get isAlive;

  bool get isAliveAndActive => isAlive && isActive;

  Team get team;

  Report createReport(String text, {Entity object}) {
    return Report(text, subject: this as Entity, object: object);
  }

  void report(Storyline storyline, String text,
      {Entity owner,
      Entity object,
      Entity objectOwner,
      bool positive = false,
      bool negative = false,
      bool but = false,
      bool endSentence = false,
      bool wholeSentence = false,
      bool subjectAndObjectAreEnemies = false,
      int actionThread,
      bool isSupportiveActionInThread = false}) {
    storyline.add(text,
        subject: this as Entity,
        owner: owner,
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

/// A private default implementation of Entity. This one is not serializable.
/// Create your own implementation if you want it serialized.
class _NonserializableEntity extends Object
    with EntityBehavior
    implements Entity {
  @override
  final String name;

  @override
  final bool nameIsProperNoun;

  @override
  final Pronoun pronoun;

  @override
  final Team team;

  @override
  final bool isPlayer;

  _NonserializableEntity(
      {this.name,
      Pronoun pronoun,
      Team team,
      this.nameIsProperNoun = false,
      this.isPlayer = false})
      : team = team ?? neutralTeam,
        pronoun = pronoun ?? Pronoun.IT;

  @override
  int get id => hashCode;

  @override
  bool get isActive => true;

  @override
  bool get isAlive => true;
}
