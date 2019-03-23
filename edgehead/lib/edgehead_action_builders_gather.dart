library edgehead.action_builders;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/src/fight/break_neck/actions/finish_break_neck.dart';
import 'package:edgehead/src/fight/break_neck/wrestle_defense/actions/evade_neck_breaking.dart';
import 'package:edgehead/src/fight/counter_attack/actions/counter_tackle.dart';
import 'package:edgehead/src/fight/feint/actions/finish_feint.dart';
import 'package:edgehead/src/fight/feint/feint_defense/actions/withstand_feint.dart';
import 'package:edgehead/src/fight/leap/actions/finish_leap.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/dodge_leap.dart';
import 'package:edgehead/src/fight/leap/leap_defense/actions/impale_leaper.dart';
import 'package:edgehead/src/fight/loot/actions/autoloot.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/actions/off_balance_opportunity_thrust.dart';
import 'package:edgehead/src/fight/punch/actions/finish_punch.dart';
import 'package:edgehead/src/fight/punch/punch_defense/actions/dodge_punch.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_strike_down.dart';
import 'package:edgehead/src/fight/strike_down/actions/finish_thrust_spear_down.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/on_ground_shield_block.dart';
import 'package:edgehead/src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';
import 'package:edgehead/src/fight/thrust/actions/finish_thrust.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/actions/dodge_thrust.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/actions/jump_back.dart';
import 'package:edgehead/src/fight/thrust/thrust_defense/actions/shield_block_thrust.dart';
import 'package:egamebook_builder/instance_serializer.dart';

part 'edgehead_action_builders_gather.gathered.dart';

@GatherInstancesFrom(['lib/src/fight/**/actions/*.dart'],
    additionalTypes: [OtherActorAction, EnemyTargetAction])
final InstanceSerializer<Action> actionSerializer = _$actionSerializer;
