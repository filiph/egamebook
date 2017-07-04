import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';

class Sword extends Weapon {
  @override
  final String name;

  @override
  final int slashingDamage;

  Sword({this.name: "sword", this.slashingDamage: 1})
      : super(const [ItemType.sword]);
}
