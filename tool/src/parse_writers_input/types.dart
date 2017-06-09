import 'package:code_builder/code_builder.dart';

// ignore_for_file: type_annotate_public_apis

final actionType = new TypeBuilder("RoamingAction",
    importFrom: "package:edgehead/fractal_stories/writer_action.dart");

final actorType = new TypeBuilder("Actor",
    importFrom: "package:edgehead/fractal_stories/actor.dart");

final allNeededTypes = <TypeBuilder>[
  actionType,
  actorType,
  builtType,
  builderType,
  exitType,
  getRandomIdFunction,
  resourceType,
  roomRoamingSituationType,
  roomType,
  simpleActionType,
  situationType,
  storylineType,
  worldStateType
];

final boolType = new TypeBuilder("bool");

final builderType = new TypeBuilder("Builder",
    importFrom: "package:built_value/built_value.dart");

final builtType = new TypeBuilder("Built",
    importFrom: "package:built_value/built_value.dart");

final exitType = new TypeBuilder("Exit",
    importFrom: "package:edgehead/fractal_stories/room_exit.dart");

final getRandomIdFunction =
    reference("getRandomId", "package:edgehead/fractal_stories/situation.dart");

final intType = new TypeBuilder("int");

final listOfActionType = new TypeBuilder('List', genericTypes: [actionType]);

final listOfRoomsType = new TypeBuilder('List', genericTypes: [roomType]);

final numType = new TypeBuilder("num");

final resourceType = new TypeBuilder("Resource",
    importFrom: "package:edgehead/fractal_stories/action.dart");

final roomRoamingSituationType = new TypeBuilder('RoomRoamingSituation',
    importFrom:
        'package:edgehead/src/room_roaming/room_roaming_situation.dart');

final roomType = new TypeBuilder("Room",
    importFrom: "package:edgehead/fractal_stories/room.dart");

final simpleActionApplyFunction = new TypeBuilder("SimpleActionApplyFunction",
    importFrom: "package:edgehead/fractal_stories/writer_action.dart");

final simpleActionType = new TypeBuilder("SimpleAction",
    importFrom: "package:edgehead/fractal_stories/writer_action.dart");

final situationType = new TypeBuilder("Situation",
    importFrom: "package:edgehead/fractal_stories/situation.dart");

final storylineType = new TypeBuilder("Storyline",
    importFrom: "package:edgehead/fractal_stories/storyline/storyline.dart");

final stringType = new TypeBuilder("String");

final worldStateType = new TypeBuilder("WorldState",
    importFrom: "package:edgehead/fractal_stories/world.dart");
