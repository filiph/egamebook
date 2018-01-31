library edgehead.serializers;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/edgehead_event_callbacks.dart' as event_callbacks;
import 'package:edgehead/edgehead_action_builders.dart' as action_builders;
import 'package:edgehead/edgehead_global.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/action_record.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline_pronoun.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/attacker_situation.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/fight/counter_attack/counter_attack_situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/fight/loot/loot_situation.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/off_balance_opportunity_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:edgehead/writers_input.g.dart';

part 'edgehead_serializers.g.dart';

@SerializersFor(const [
  ActionRecord,
  Actor,
  AttackerSituation,
  CounterAttackSituation,
  DefenseSituation,
  EdgeheadGlobalState,
  FightSituation,
  GuardpostAboveChurchTakeShieldRescueSituation,
  Item,
  LootSituation,
  OffBalanceOpportunitySituation,
  Pose,
  Predetermination,
  Pronoun,
  RoomRoamingSituation,
  Situation,
  Team,
  Weapon,
  WeaponType,
  WorldState,
])
final Serializers serializers = (_$serializers.toBuilder()
      ..add(event_callbacks.serializer)
      ..add(action_builders.serializer))
    .build();
