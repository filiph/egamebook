import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';

class Spear extends Weapon {
  @override
  final String name;

  @override
  final int slashingDamage = 0;

  @override
  final int thrustingDamage;

  @override
  final bool nameIsProperNoun;

  @override
  final bool canParrySlash;

  @override
  final bool canParryBlunt;

  Spear(
      {this.name: "spear",
      this.nameIsProperNoun: false,
      this.thrustingDamage: 1,
      this.canParrySlash: false,
      this.canParryBlunt: false})
      : super(const [ItemType.spear]);

  Spear.from(Spear other, {String name, bool nameIsProperNoun})
      : this(
            name: name ?? other.name,
            nameIsProperNoun: nameIsProperNoun ?? other.nameIsProperNoun,
            thrustingDamage: other.thrustingDamage,
            canParrySlash: other.canParrySlash,
            canParryBlunt: other.canParryBlunt);
}
