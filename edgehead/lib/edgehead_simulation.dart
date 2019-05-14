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

const String carelessMonsterCombineFunctionHandle = "carelessMonster";

const String normalCombineFunctionHandle = "normal";

/// [edgeheadPlayer]'s [Actor.id].
const int playerId = 1;

final Actor edgeheadBriana = Actor.initialized(brianaId, "Briana",
    nameIsProperNoun: true,
    pronoun: Pronoun.SHE,
    constitution: 2,
    currentRoomName: _preStartBook.name,
    followingActorId: playerId);

final Situation edgeheadInitialSituation =
    RoomRoamingSituation.initialized(100, _preStartBook, false);

final Actor edgeheadPlayer = Actor.initialized(playerId, "Aren",
    nameIsProperNoun: true,
    isPlayer: true,
    pronoun: Pronoun.YOU,
    constitution: 2,
    dexterity: 150,
    stamina: 1,
    initiative: 1000,
    poseMax: Pose.combat,
    currentRoomName: _preStartBook.name);

final Simulation edgeheadSimulation =
    Simulation(_rooms, allApproaches, _combineFunctions);

final Map<String, CombineFunction> _combineFunctions = {
  normalCombineFunctionHandle: normalCombineFunction,
  carelessMonsterCombineFunctionHandle: carelessMonsterCombineFunction,
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
num carelessMonsterCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    3 * scoreChange.varietyOfAction -
    5 * scoreChange.enemy;

num normalCombineFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    scoreChange.teamPreservation -
    scoreChange.enemy;
