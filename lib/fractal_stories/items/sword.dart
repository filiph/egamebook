import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';

class Sword extends Weapon {
  @override
  final String name;

  @override
  final int slashingDamage;

  @override
  final int thrustingDamage;

  @override
  final bool canParrySlash;

  @override
  final bool canParryBlunt;

  Sword(
      {this.name: "sword",
      this.slashingDamage: 1,
      this.thrustingDamage: 1,
      this.canParrySlash: true,
      this.canParryBlunt: false})
      : super(const [ItemType.sword]);

  Sword.from(Sword other, {String name})
      : this(
            name: name ?? other.name,
            slashingDamage: other.slashingDamage,
            thrustingDamage: other.thrustingDamage,
            canParrySlash: other.canParrySlash,
            canParryBlunt: other.canParryBlunt);
}
