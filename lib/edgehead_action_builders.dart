library edgehead.action_builders;

import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/sourcegen/actions_serializer.dart';

import 'package:edgehead/src/fight/counter_attack/actions/counter_tackle.dart';
import 'package:edgehead/src/fight/loot/actions/autoloot.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/actions/off_balance_opportunity_thrust.dart';
import 'src/fight/break_neck/actions/finish_break_neck.dart';
import 'src/fight/break_neck/wrestle_defense/actions/evade_neck_breaking.dart';
import 'src/fight/counter_attack/actions/counter_slash.dart';
import 'src/fight/leap/actions/finish_leap.dart';
import 'src/fight/leap/leap_defense/actions/dodge_leap.dart';
import 'src/fight/leap/leap_defense/actions/impale_leaper.dart';
import 'src/fight/punch/actions/finish_punch.dart';
import 'src/fight/punch/punch_defense/actions/dodge_punch.dart';
import 'src/fight/slash/actions/finish_slash.dart';
import 'src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'src/fight/slash/slash_defense/actions/jump_back.dart';
import 'src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'src/fight/strike_down/actions/finish_strike_down.dart';
import 'src/fight/strike_down/actions/finish_thrust_spear_down.dart';
import 'src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'src/fight/strike_down/strike_down_defense/actions/on_ground_shield_block.dart';
import 'src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';
import 'src/fight/thrust/actions/finish_thrust.dart';
import 'src/fight/thrust/thrust_defense/actions/dodge_thrust.dart';
import 'src/fight/thrust/thrust_defense/actions/jump_back.dart';
import 'src/fight/thrust/thrust_defense/actions/shield_block_thrust.dart';

part 'edgehead_action_builders.g.dart';

@GatherActionsFrom(const ['lib/src/fight/**/actions/*.dart'])
final ActionSerializer actionSerializer = _$actionSerializer;
