part of 'storyline.dart';

/// Entity is a thing, a creature, a robot, or a person that is an interactive
/// part of the gamebook environment.
///
/// They have a [name], they are referred to by a [pronoun] and more often
/// than not they are at a [location].
abstract class Entity {
  factory Entity({
    required String name,
    Pronoun? pronoun,
    String? adjective,
    Team? team,
    bool nameIsProperNoun,
    bool isPlayer,
    bool isCommon,
    int? firstOwnerId,
    int? id,
  }) = _NonserializableEntity;

  /// A way to specify the entity more concretely than with just the [name].
  ///
  /// For example, "young goblin" or "wiry goblin".
  ///
  /// Note that this is really just for specificity (when there are two entities
  /// of the same name). To add flavor ("I look into his dreamy eyes")
  /// or information ("I hit the already injured arm") is still on the writer.
  String? get adjective;

  /// The [Entity.id] of the entity that "owned" this entity the first
  /// time the player sees it. For example, a goblin's hand is
  /// "owned" by the goblin, so we can later refer to "goblin's hand"
  /// even when the hand has been severed.
  ///
  /// This becomes similar to [adjective] — useful to distinguish
  /// between two entities with the same noun ("my sword" versus "orc's sword").
  ///
  /// This field _can_ be `null`. Lots of things don't belong to anything
  /// or anyone.
  int? get firstOwnerId;

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
  bool get isAnimated => true;

  /// If `true`, this entity represents something very common, such
  /// as a move ("the thrust", "the punch") or a "decal" (such as "the bruise"
  /// or "the elbow").
  ///
  /// [Storyline] can use this to allow multiple such entities to be referred to
  /// by the same identifier ("thrust"). This means a combat scenario
  /// can have two different thrusts in one paragraph.
  ///
  /// On the other hand, unique entities (such as individual swords or goblins,
  /// which return `false` for [isCommon]) cannot share the exact same
  /// identifiers because it would be confusing ("the goblin hits the goblin").
  /// See [ShadowGraph], which exists to prevent such issues.
  bool get isCommon => false;

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
      {Entity? owner,
      Entity? object,
      Entity? object2,
      Entity? objectOwner,
      bool positive = false,
      bool negative = false,
      bool but = false,
      bool endSentence = false,
      bool wholeSentence = false,
      bool subjectAndObjectAreEnemies = false,
      int? actionThread,
      bool startsThread = false,
      bool replacesThread = false});
}

/// Mixin that adds important methods and getters to Entity-like classes.
mixin EntityBehavior {
  bool get isActive;

  bool get isAnimated;

  bool get isAnimatedAndActive => isAnimated && isActive;

  Team get team;

  void report(Storyline storyline, String text,
      {Entity? owner,
      Entity? object,
      Entity? object2,
      Entity? objectOwner,
      bool positive = false,
      bool negative = false,
      bool but = false,
      bool endSentence = false,
      bool wholeSentence = false,
      bool subjectAndObjectAreEnemies = false,
      int? actionThread,
      bool startsThread = false,
      bool replacesThread = false}) {
    storyline.add(text,
        subject: this as Entity,
        object: object,
        object2: object2,
        owner: owner,
        objectOwner: objectOwner,
        positive: positive,
        negative: negative,
        subjectAndObjectAreEnemies: subjectAndObjectAreEnemies,
        but: but,
        endSentence: endSentence,
        wholeSentence: wholeSentence,
        actionThread: actionThread,
        startsThread: startsThread,
        replacesThread: replacesThread);
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
  final String? adjective;

  @override
  final bool nameIsProperNoun;

  @override
  final Pronoun pronoun;

  @override
  final bool isCommon;

  @override
  final Team team;

  @override
  final bool isPlayer;

  @override
  final int? firstOwnerId;

  final int? _id;

  _NonserializableEntity({
    required this.name,
    this.adjective,
    Pronoun? pronoun,
    Team? team,
    this.nameIsProperNoun = false,
    this.isPlayer = false,
    this.isCommon = false,
    this.firstOwnerId,
    int? id,
  })  : _id = id,
        team = team ?? neutralTeam,
        pronoun = pronoun ?? Pronoun.IT;

  @override
  int get id => _id ?? hashCode;

  @override
  bool get isActive => true;

  @override
  bool get isAnimated => true;

  @override
  String toString() => "_NonserializableEntity<$id,$name>";
}
