library stranded.item;

import 'storyline/storyline.dart';
import 'team.dart';

String typeToDescription(ItemType type) {
  switch (type) {
    case ItemType.fist:
      return "fist";
    case ItemType.shield:
      return "shield";
    case ItemType.spear:
      return "spear";
    case ItemType.sword:
      return "sword";
  }
  throw new ArgumentError(type);
}

abstract class Item extends Object with EntityBehavior implements Entity {
  final List<ItemType> types;

  Item(Iterable<ItemType> types) : types = new List.unmodifiable(types);

  String get description => typeToDescription(types.first);

  @override
  int get id => hashCode;

  @override
  bool get isActive => true;

  @override
  bool get isAlive => false;

  @override
  bool get isPlayer => false;

  @override
  bool get nameIsProperNoun => false;

  @override
  Pronoun get pronoun => Pronoun.IT;

  @override
  Team get team => neutralTeam;

  int get value;
}

enum ItemType { fist, shield, spear, sword }
