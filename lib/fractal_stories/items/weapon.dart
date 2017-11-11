import 'package:edgehead/fractal_stories/item.dart';

abstract class Weapon extends Item {
  Weapon(Iterable<ItemType> types) : super(types);

  int get bluntDamage => 0;

  /// The weapon can block thrusts. Typical examples are shields.
  bool get canBlockThrust => false;

  /// The weapon can parry blunt weapons (like clubs and warhammers).
  /// Typical examples include other blunt weapons, and shields. Rapiers and
  /// knives, on the other hand, cannot parry blunt weapons.
  bool get canParryBlunt => false;

  /// The weapon can parry a slashing weapon (like a sword). Typical examples
  /// are swords and reinforced blunt weapons. Knives and non-reinforced staffs
  /// cannot parry slashes.
  bool get canParrySlash => false;

  @override
  List<String> get categories => const ["weapon"];

  bool get isBlunt => bluntDamage > 0;

  bool get isSlashing => slashingDamage > 0;

  bool get isThrusting => thrustingDamage > 0;

  int get length => 2;

  int get slashingDamage => 0;

  int get thrustingDamage => 0;

  /// Intrinsic value of the weapon.
  ///
  /// This is a heuristic for deciding which weapon is worth more, in general.
  /// It is not a monetary value.
  ///
  /// Bonus point is added when the weapon is named ([nameIsProperNoun]
  /// is `true`), such us "Excalibur".
  @override
  int get value =>
      length +
      slashingDamage +
      thrustingDamage +
      bluntDamage +
      (nameIsProperNoun ? 1 : 0);
}
