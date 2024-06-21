library fractal_stories.pose;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'pose.g.dart';

class Pose extends EnumClass implements Comparable<Pose> {
  /// Combat stance. Well-defended all around. In general, no attack will
  /// do much damage, if any. Almost no chance of killing, unless attacker
  /// is much more skilled.
  static const Pose combat = _$combat;

  /// Standing well but not in an expert combat stance. For many combatants,
  /// this is the best [Pose] they can muster.
  static const Pose standing = _$standing;

  /// Standing, but with the primary arm extended. This is often only a fleeting
  /// moment just after some kind of move. It makes it possible to attempt
  /// some moves, such as chopping of the extended limb, or attacking the torso.
  /// Normally, this [Pose] automatically improves to [Pose.standing].
  static const Pose extended = _$extended;

  /// Still standing, but off balance. It's easy to make such a combatant
  /// fall, and easier to maim or kill.
  static const Pose offBalance = _$offBalance;

  /// Prone position after falling down. This is really bad for the combatant
  /// as this unlocks moves like "slash from above", which is an almost sure
  /// insta-kill.
  static const Pose onGround = _$onGround;

  static Serializer<Pose> get serializer => _$poseSerializer;

  static BuiltSet<Pose> get values => _$values;

  /// A sequence of poses from worst to best.
  static List<Pose> get _sequence => const [
        onGround,
        offBalance,
        extended,
        standing,
        combat,
      ];

  const Pose._(super.name);

  bool operator <(Pose other) => compareTo(other) < 0;

  bool operator <=(Pose other) => compareTo(other) <= 0;

  bool operator >(Pose other) => compareTo(other) > 0;

  bool operator >=(Pose other) => compareTo(other) >= 0;

  /// Return a [Pose] that is better or worse than the current one.
  ///
  /// You specify by how much ([levels]) and if there is an upper limit ([max]).
  /// The lower limit is always [Pose.onGround].
  ///
  /// Example:
  ///
  ///     // Worsen actor's pose by 2 levels (i.e. from combat to extended
  ///     // or from extended to onGround).
  ///     actor.pose = actor.pose.changeBy(-2);
  Pose changeBy(int levels, {Pose max = Pose.combat}) {
    final index = _sequence.indexOf(this);
    final maxIndex = _sequence.lastIndexOf(max);
    var newIndex = index + levels;
    if (newIndex > maxIndex) newIndex = maxIndex;
    if (newIndex < 0) newIndex = 0;
    return _sequence[newIndex];
  }

  @override
  int compareTo(Pose other) {
    return _sequence.indexOf(this).compareTo(_sequence.indexOf(other));
  }

  /// Return the number of levels between this and [other].
  ///
  /// When this is a better pose, the result will be positive. When the other
  /// pose is better, the result will be negative.
  int differenceFrom(Pose other) {
    return _sequence.indexOf(this) - _sequence.indexOf(other);
  }

  String toHumanString() {
    switch (this) {
      case onGround:
        return 'on ground';
      case offBalance:
        return 'off balance';
      case extended:
        return 'extended';
      case standing:
        return 'solid';
      case combat:
        return 'combat pose';
    }
    assert(false, 'No human string for $this');
    return name;
  }

  static Pose valueOf(String name) => _$valueOf(name);
}
