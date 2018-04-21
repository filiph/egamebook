import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Creates an instance of [Fist]. Disarmed actors will receive this.
Item createFist(int seed) =>
    new Item.weapon(new StatefulRandom(seed << 2).next(), WeaponType.fist);
