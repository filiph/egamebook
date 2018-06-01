import 'package:code_builder/code_builder.dart';

// ignore_for_file: type_annotate_public_apis

final actionContextType = new TypeBuilder("ActionContext",
    importFrom: "package:edgehead/fractal_stories/context.dart");

final actionType = new TypeBuilder("RoamingAction",
    importFrom: "package:edgehead/fractal_stories/writer_action.dart");

final actorType = new TypeBuilder("Actor",
    importFrom: "package:edgehead/fractal_stories/actor.dart");

final allNeededTypes = <TypeBuilder>[
  actionContextType,
  actionType,
  actorType,
  approachType,
  applicabilityContextType,
  builtType,
  builderType,
  prerequisiteType,
  reasonedSuccessChanceType,
  resourceType,
  roomRoamingSituationType,
  roomType,
  ruleType,
  rulesetType,
  serializerType,
  simpleActionType,
  simulationType,
  situationType,
  storylineType,
  weaponTypeType,
  worldStateBuilderType,
  worldStateType,
];

final applicabilityContextType = new TypeBuilder("ApplicabilityContext",
    importFrom: "package:edgehead/fractal_stories/context.dart");

final approachType = new TypeBuilder("Approach",
    importFrom: "package:edgehead/fractal_stories/room_approach.dart");

final boolType = new TypeBuilder("bool");

final builderType = new TypeBuilder("Builder",
    importFrom: "package:built_value/built_value.dart");

final builtType = new TypeBuilder("Built",
    importFrom: "package:built_value/built_value.dart");

final intType = new TypeBuilder("int");

final listOfActionType = new TypeBuilder('List', genericTypes: [actionType]);

final listOfApproachType =
    new TypeBuilder('List', genericTypes: [approachType]);

final listOfRoomsType = new TypeBuilder('List', genericTypes: [roomType]);

final numType = new TypeBuilder("num");

final prerequisiteType = new TypeBuilder("Prerequisite",
    importFrom: "package:edgehead/ruleset/ruleset.dart");

final reasonedSuccessChanceType = new TypeBuilder("ReasonedSuccessChance",
    genericTypes: [new TypeBuilder("Null")],
    importFrom: "package:edgehead/fractal_stories/action.dart");

final resourceType = new TypeBuilder("Resource",
    importFrom: "package:edgehead/fractal_stories/action.dart");

final roomRoamingSituationType = new TypeBuilder('RoomRoamingSituation',
    importFrom:
        'package:edgehead/src/room_roaming/room_roaming_situation.dart');

final roomType = new TypeBuilder("Room",
    importFrom: "package:edgehead/fractal_stories/room.dart");

final rulesetType = new TypeBuilder("Ruleset",
    importFrom: "package:edgehead/ruleset/ruleset.dart");

final ruleType = new TypeBuilder("Rule",
    importFrom: "package:edgehead/ruleset/ruleset.dart");

final serializerType = new TypeBuilder("Serializer",
    importFrom: "package:built_value/serializer.dart");

final simpleActionApplyFunction = new TypeBuilder("SimpleActionApplyFunction",
    importFrom: "package:edgehead/fractal_stories/writer_action.dart");

final simpleActionType = new TypeBuilder("SimpleAction",
    importFrom: "package:edgehead/fractal_stories/writer_action.dart");

final simulationType = new TypeBuilder("Simulation",
    importFrom: "package:edgehead/fractal_stories/simulation.dart");

final situationType = new TypeBuilder("Situation",
    importFrom: "package:edgehead/fractal_stories/situation.dart");

final storylineType = new TypeBuilder("Storyline",
    importFrom: "package:edgehead/fractal_stories/storyline/storyline.dart");

final stringType = new TypeBuilder("String");

final weaponTypeType = new TypeBuilder("WeaponType",
    importFrom: "package:edgehead/fractal_stories/items/weapon_type.dart");

final worldStateBuilderType = new TypeBuilder("WorldStateBuilder",
    importFrom: "package:edgehead/fractal_stories/world_state.dart");

final worldStateType = new TypeBuilder("WorldState",
    importFrom: "package:edgehead/fractal_stories/world_state.dart");
