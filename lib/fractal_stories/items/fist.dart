import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';

/// The default instance of [Fist]. Disarmed actors will receive [defaultFist].
final Fist defaultFist = new Fist();

/// [Fist] is the 'barehanded' weapon. If an actor has no weapon, they
/// automatically have a [Fist].
///
/// [Fist] is special. It can't be disarmed, it can't parry, and by default,
/// it does 0 damage.
///
/// Non-human opponents' [Fist]s can take many forms - claws, tusks,
/// fire-breathing glands, etc.
class Fist extends Weapon {
  @override
  final String name;

  Fist([this.name = "fist"]) : super(const [ItemType.fist]);
}