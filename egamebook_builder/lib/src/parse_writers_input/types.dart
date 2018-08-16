import 'package:built_collection/built_collection.dart';
import 'package:code_builder/code_builder.dart';

// ignore_for_file: type_annotate_public_apis

final actionContextType = TypeReference((b) => b
  ..symbol = "ActionContext"
  ..url = "package:edgehead/fractal_stories/context.dart");

final actionType = TypeReference((b) => b
  ..symbol = 'RoamingAction'
  ..url = 'package:edgehead/fractal_stories/writer_action.dart');

final actorType = TypeReference((b) => b
  ..symbol = 'Actor'
  ..url = 'package:edgehead/fractal_stories/actor.dart');

final allNeededTypes = <TypeReference>[
  actionContextType,
  actionType,
  actorType,
  approachType,
  applicabilityContextType,
  prerequisiteType,
  reasonedSuccessChanceType,
  resourceType,
  roomRoamingSituationType,
  roomType,
  ruleType,
  rulesetType,
  simpleActionType,
  simulationType,
  situationBaseBehaviorType,
  situationType,
  storylineType,
  weaponTypeType,
  worldStateBuilderType,
  worldStateType,
];

final applicabilityContextType = TypeReference((b) => b
  ..symbol = 'ApplicabilityContext'
  ..url = 'package:edgehead/fractal_stories/context.dart');

final approachType = TypeReference((b) => b
  ..symbol = 'Approach'
  ..url = 'package:edgehead/fractal_stories/room_approach.dart');

final boolType = TypeReference((b) => b..symbol = 'bool');

final builderType = TypeReference((b) => b
  ..symbol = 'Builder'
  ..url = 'package:built_value/built_value.dart');

final builtType = TypeReference((b) => b
  ..symbol = 'Built'
  ..url = 'package:built_value/built_value.dart');

final intType = TypeReference((b) => b..symbol = 'int');

/// TODO: just use ..types.add(...) here and elsewhere in this file
final listOfActionType = TypeReference((b) => b
  ..symbol = 'List'
  ..types.add(actionType));

final listOfApproachType = TypeReference((b) => b
  ..symbol = 'List'
  ..types = ListBuilder<Reference>([approachType]));

final listOfRoomsType = TypeReference((b) => b
  ..symbol = 'List'
  ..types = ListBuilder<Reference>([roomType]));

final nullType = TypeReference((b) => b..symbol = 'Null');

final numType = TypeReference((b) => b..symbol = 'num');

final prerequisiteType = TypeReference((b) => b
  ..symbol = 'Prerequisite'
  ..url = 'package:edgehead/ruleset/ruleset.dart');

final reasonedSuccessChanceType = TypeReference((b) => b
  ..symbol = 'ReasonedSuccessChance'
  ..types = ListBuilder<Reference>([nullType])
  ..url = 'package:edgehead/fractal_stories/action.dart');

final resourceType = TypeReference((b) => b
  ..symbol = 'Resource'
  ..url = 'package:edgehead/fractal_stories/action.dart');

final roomRoamingSituationType = TypeReference((b) => b
  ..symbol = 'RoomRoamingSituation'
  ..url = 'package:edgehead/src/room_roaming/room_roaming_situation.dart');

final roomType = TypeReference((b) => b
  ..symbol = 'Room'
  ..url = 'package:edgehead/fractal_stories/room.dart');

final rulesetType = TypeReference((b) => b
  ..symbol = 'Ruleset'
  ..url = 'package:edgehead/ruleset/ruleset.dart');

final ruleType = TypeReference((b) => b
  ..symbol = 'Rule'
  ..url = 'package:edgehead/ruleset/ruleset.dart');

final serializerType = TypeReference((b) => b
  ..symbol = 'Serializer'
  ..url = 'package:built_value/serializer.dart');

final simpleActionApplyFunction = TypeReference((b) => b
  ..symbol = 'SimpleActionApplyFunction'
  ..url = 'package:edgehead/fractal_stories/writer_action.dart');

final simpleActionType = TypeReference((b) => b
  ..symbol = 'SimpleAction'
  ..url = 'package:edgehead/fractal_stories/writer_action.dart');

final simulationType = TypeReference((b) => b
  ..symbol = 'Simulation'
  ..url = 'package:edgehead/fractal_stories/simulation.dart');

final situationBaseBehaviorType = TypeReference((b) => b
  ..symbol = 'SituationBaseBehavior'
  ..url = 'package:edgehead/fractal_stories/situation.dart');

final situationType = TypeReference((b) => b
  ..symbol = 'Situation'
  ..url = 'package:edgehead/fractal_stories/situation.dart');

final storylineType = TypeReference((b) => b
  ..symbol = 'Storyline'
  ..url = 'package:edgehead/fractal_stories/storyline/storyline.dart');

final stringType = TypeReference((b) => b..symbol = 'String');

final weaponTypeType = TypeReference((b) => b
  ..symbol = 'WeaponType'
  ..url = 'package:edgehead/fractal_stories/items/weapon_type.dart');

final worldStateBuilderType = TypeReference((b) => b
  ..symbol = 'WorldStateBuilder'
  ..url = 'package:edgehead/fractal_stories/world_state.dart');

final worldStateType = TypeReference((b) => b
  ..symbol = 'WorldState'
  ..url = 'package:edgehead/fractal_stories/world_state.dart');
