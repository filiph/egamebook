import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';

/// Creates an instance of [Fist]. Disarmed actors will receive this.
Item createFist(BodyPart part) =>
    new Item(new StatefulRandom(part.id << 2).next(),
        name: "fist", damageCapability: part.damageCapability.toBuilder());
