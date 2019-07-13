import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:edgehead/writers_helpers.dart';
import 'package:edgehead/writers_input.compiled.dart';

const String carelessMonsterFoldFunctionHandle = "carelessMonster";

const String normalFoldFunctionHandle = "normal";

/// [edgeheadPlayer]'s [Actor.id].
const int playerId = 1;

final Actor edgeheadBriana = Actor.initialized(
  brianaId,
  "Briana",
  // Plot armor for Briana.
  isInvincible: true,
  nameIsProperNoun: true,
  pronoun: Pronoun.SHE,
  constitution: 2,
  currentRoomName: _preStartBook.name,
  followingActorId: playerId,
);

final Situation edgeheadInitialSituation =
    RoomRoamingSituation.initialized(100, _preStartBook, false);

final Actor edgeheadPlayer = Actor.initialized(
  playerId,
  "Aren",
  isSurvivor: true,
  nameIsProperNoun: true,
  isPlayer: true,
  pronoun: Pronoun.YOU,
  constitution: 2,
  dexterity: 150,
  stamina: 3,
  initiative: 1000,
  poseMax: Pose.combat,
  currentRoomName: _preStartBook.name,
);

final Simulation edgeheadSimulation =
    Simulation(_rooms, allApproaches, _foldFunctions);

final Map<String, FoldFunction> _foldFunctions = {
  normalFoldFunctionHandle: normalFoldFunction,
  carelessMonsterFoldFunctionHandle: carelessMonsterFoldFunction,
};

final _preStartBook = Room(
    "pre_start_book",
    (c) => c.outputStoryline
        .add("UNUSED because this is the first room", wholeSentence: true),
    (c) => throw StateError("Room isn't to be revisited"),
    null,
    null);

final List<Room> _rooms = List<Room>.from(allRooms)
  ..addAll([_preStartBook, endOfRoam]);

/// Lesser self-worth than normal combine function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessMonsterFoldFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation - scoreChange.enemy;

num normalFoldFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    scoreChange.teamPreservation -
    scoreChange.enemy;
