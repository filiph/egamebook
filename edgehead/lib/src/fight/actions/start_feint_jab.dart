import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/start_feint_slash.dart';
import 'package:edgehead/src/fight/feint/feint_situation.dart';

/// The thrusting version of [FeintSlash].
class FeintJab extends FeintSlash {
  static const String className = "FaintJab";

  static final FeintJab singleton = FeintJab();

  @override
  String get attackVerb => 'jab';

  @override
  FeintType get feintType => FeintType.slash;

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "will <subject> spoil "
      "<object's> stance?";

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState world, Actor enemy) =>
      !a.isOnGround &&
      !a.anatomy.isBlind &&
      !enemy.anatomy.isBlind &&
      enemy.pose > Pose.extended &&
      a.currentWeapon.damageCapability.isThrusting &&
      // Prevent showing both [FeintJab] and [FeintSlash] when player
      // is wielding a sword.
      !a.currentWeapon.damageCapability.isSlashing;
}
