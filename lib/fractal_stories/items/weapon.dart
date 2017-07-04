import 'package:edgehead/fractal_stories/item.dart';

abstract class Weapon extends Item {
  Weapon(Iterable<ItemType> types) : super(types);

  int get bluntDamage => 0;

  @override
  List<String> get categories => const ["weapon"];

  bool get isBlunt => bluntDamage > 0;

  bool get isSlashing => slashingDamage > 0;

  bool get isThrusting => thrustingDamage > 0;

  int get length => 2;

  int get slashingDamage => 0;

  int get thrustingDamage => 0;

  @override
  int get value => slashingDamage + thrustingDamage + bluntDamage;
}