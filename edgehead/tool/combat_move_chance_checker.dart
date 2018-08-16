import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/src/fight/actions/kick_to_ground.dart';
import 'package:edgehead/src/fight/actions/start_break_neck_on_ground.dart';
import 'package:edgehead/src/fight/actions/start_defensible_action.dart';
import 'package:edgehead/src/fight/actions/start_leap.dart';
import 'package:edgehead/src/fight/actions/start_punch.dart';
import 'package:edgehead/src/fight/actions/start_slash_from_direction.dart';
import 'package:edgehead/src/fight/actions/start_strike_down.dart';
import 'package:edgehead/src/fight/actions/throw_spear.dart';
import 'package:edgehead/src/fight/common/conflict_chance.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_slash.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_tackle.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/actions/off_balance_opportunity_thrust.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_shield_block.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';

/// This helper tool runs [getCombatMoveChance] with the set up of various
/// combat moves (Actions) and in different configurations.
void main() {
  final configs = {
    "normal": const _Configuration(),
    "actor off balance": const _Configuration(actorOffBalance: true),
    "target off balance": const _Configuration(targetOffBalance: true),
    "target on ground": const _Configuration(targetOnGround: true),
    "target has shield": const _Configuration(targetHasShield: true),
  };

  final getters = <String, SuccessChanceGetter>{
    "break neck on ground": computeBreakNeckOnGroundChance,
    "leap": computeStartLeap,
    "punch": computeStartPunch,
    "slash from direction": computeStartSlashFromDirection,
    "defensive parry slash": computeDefensiveParrySlash,
    "dodge slash": computeDodgeSlash,
    "jump back slash": computeJumpBackSlash,
    "parry slash": computeParrySlash,
    "shield block slash": computeShieldBlockSlash,
    "start strike down": computeStartStrikeDownPlayer,
    "on ground parry": computeOnGroundParry,
    "on ground shield block": computeOnGroundShieldBlock,
    "roll out of way": computeRollOutOfWay,
    "throw spear": computeThrowSpear,
    "counter slash": computeCounterSlash,
    "counter tackle": computeCounterTackle,
    "off-balance opportunity thrust": computeOpportunityThrust,
    "kick to ground": computeKickToGround,
  };

  for (final computationName in getters.keys) {
    print("=== $computationName ===");
    final func = getters[computationName];
    for (final configName in configs.keys) {
      print("  --- $configName ---");
      final config = configs[configName];
      _runConfiguration(config, func);
    }
  }
}

Actor _createActor({
  String name,
  bool hasShield: false,
  int dexterity,
  Pose pose: Pose.standing,
}) {
  final actor = new Actor.initialized(
    name.hashCode,
    name,
    currentWeapon: new Item.weapon(name.hashCode + 1, WeaponType.sword),
    currentShield: hasShield
        ? new Item.weapon(name.hashCode + 2, WeaponType.shield)
        : null,
    dexterity: dexterity,
  ).rebuild((b) => b..pose = pose);

  return actor;
}

void _runConfiguration(_Configuration config, SuccessChanceGetter getter) {
  final playerAttacking = getter(
    _createActor(
      name: "player",
      dexterity: 150,
      pose: config.actorPose,
    ),
    null,
    null,
    _createActor(
        name: "goblin",
        dexterity: 100,
        hasShield: config.targetHasShield,
        pose: config.targetPose),
  ) as ReasonedSuccessChance<CombatReason>;

  final goblinAttacking = getter(
    _createActor(
      name: "goblin",
      dexterity: 100,
      pose: config.actorPose,
    ),
    null,
    null,
    _createActor(
        name: "player",
        dexterity: 150,
        hasShield: config.targetHasShield,
        pose: config.targetPose),
  ) as ReasonedSuccessChance<CombatReason>;

  String humanize(ReasonedSuccessChance<CombatReason> chance) {
    final percent = (chance.value * 100).round();
    final string = "$percent%".padLeft(5);
    return string;
  }

  print("    player ${humanize(playerAttacking)} "
      "| goblin ${humanize(goblinAttacking)}");
}

class _Configuration {
  final bool actorOffBalance;

  final bool targetOffBalance;

  final bool targetHasShield;

  final bool targetOnGround;

  const _Configuration({
    this.actorOffBalance: false,
    this.targetHasShield: false,
    this.targetOffBalance: false,
    this.targetOnGround: false,
  });

  Pose get actorPose {
    if (actorOffBalance) return Pose.offBalance;
    return Pose.standing;
  }

  Pose get targetPose {
    if (targetOnGround) return Pose.onGround;
    if (targetOffBalance) return Pose.offBalance;
    return Pose.standing;
  }
}
