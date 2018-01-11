library stranded.item;

import 'storyline/storyline.dart';
import 'team.dart';

abstract class Item extends ItemLike {
  String get description => throw new UnimplementedError();

  @override
  int get id => hashCode;

  @override
  bool get nameIsProperNoun;

  @override
  Pronoun get pronoun => Pronoun.IT;

  @override
  Team get team => neutralTeam;

  /// Heuristic value of the item.
  @override
  int get value;
}

/// Abstract base class for things that are item-like, like weapons, potions,
/// gear. Not the same as [Item], which is a concrete item, such as a book
/// or a key. In contrast, weapons are [ItemLike] but are not [Item]s.
abstract class ItemLike extends Object with EntityBehavior implements Entity {
  @override
  Pronoun get pronoun => Pronoun.IT;

  @override
  Team get team => neutralTeam;

  @override
  bool get isPlayer => false;

  /// Heuristic value of the item.
  int get value;

  @override
  bool get isAlive => false;

  @override
  bool get isActive => true;
}
