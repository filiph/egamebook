library edgehead.action_builders;

import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/sourcegen/functions_serializer.dart';

import 'src/fight/break_neck/actions/finish_break_neck.dart';
import 'src/fight/break_neck/wrestle_defense/actions/evade_neck_breaking.dart';
import 'src/fight/counter_attack/actions/counter_slash.dart';
import 'src/fight/leap/actions/finish_leap.dart';
import 'src/fight/leap/leap_defense/actions/dodge_leap.dart';
import 'src/fight/leap/leap_defense/actions/impale_leaper.dart';
import 'src/fight/punch/actions/finish_punch.dart';
import 'src/fight/punch/punch_defense/actions/dodge_punch.dart';
import 'src/fight/slash/actions/finish_slash.dart';
import 'src/fight/slash/actions/finish_thrust_spear.dart';
import 'src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'src/fight/slash/slash_defense/actions/dodge_thrust_spear.dart';
import 'src/fight/slash/slash_defense/actions/jump_back.dart';
import 'src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'src/fight/slash/slash_defense/actions/shield_block_slash.dart';
import 'src/fight/strike_down/actions/finish_strike_down.dart';
import 'src/fight/strike_down/actions/finish_thrust_spear_down.dart';
import 'src/fight/strike_down/strike_down_defense/actions/on_ground_parry.dart';
import 'src/fight/strike_down/strike_down_defense/actions/on_ground_shield_block.dart';
import 'src/fight/strike_down/strike_down_defense/actions/roll_out_of_way.dart';

part 'edgehead_action_builders.g.dart';

@GatherFunctionsFrom(const ['lib/src/fight/**/actions/*.dart'])
final FunctionSerializer<EnemyTargetActionBuilder> serializer =
    _$enemyTargetActionBuilderSerializer;
