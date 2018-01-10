library stranded.item;

import 'storyline/storyline.dart';
import 'team.dart';

abstract class Item extends Object with EntityBehavior implements Entity {
  String get description => throw new UnimplementedError();

  @override
  int get id => hashCode;

  @override
  bool get isActive => true;

  @override
  bool get isAlive => false;

  @override
  bool get isPlayer => false;

  @override
  bool get nameIsProperNoun;

  @override
  Pronoun get pronoun => Pronoun.IT;

  @override
  Team get team => neutralTeam;

  /// Heuristic value of the item.
  int get value;
}
