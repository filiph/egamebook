import 'package:edgehead/edgehead_director.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:edgehead/writers_input.compiled.dart';

import 'edgehead_ids.dart';

const String carelessMonsterFoldFunctionHandle = "carelessMonster";

const String normalFoldFunctionHandle = "normal";

final Situation edgeheadInitialSituation =
    RoomRoamingSituation.initialized(100, _preStartBook, false);

final Simulation edgeheadSimulation = Simulation(
    _rooms, allApproaches, _foldFunctions, edgeheadDirectorRuleset, allInks);

final Map<String, FoldFunction> _foldFunctions = {
  normalFoldFunctionHandle: normalFoldFunction,
  carelessMonsterFoldFunctionHandle: carelessMonsterFoldFunction,
};

/// This is a special room that starts every adventure.
///
/// Writers should create an [Approach] from this room to their first meaningful
/// room. For example:
///
///     APPROACH: $my_adventure_start FROM $pre_start_book
///     COMMAND: <implicit>
///     DESCRIPTION: N/A
///
/// It is defined here and not in [Simulation] because author might want
/// to change things (like, the position).
final _preStartBook = Room(
  Simulation.preStartBookName,
  (c) => throw StateError("pre_start_book is never visited, only used for "
      "approaching other rooms"),
  (c) => throw StateError("pre_start_book isn't to be revisited"),
  null,
  null,
  isSynthetic: true,
  positionX: 0,
  positionY: 0,
  mapName: "<NOT VISIBLE>",
  hint: "This should never be visible.",
);

final List<Room> _rooms = List<Room>.from(allRooms)
  ..addAll([_preStartBook, endOfRoam]);

/// Lesser self-worth than normal combine function as monsters should
/// kind of carelessly attack to make fights more action-packed.
num carelessMonsterFoldFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    // Monster AI cares about action-packed combat.
    scoreChange.varietyOfAction -
    // Twice the weight of hurting the enemy.
    2 * scoreChange.enemy;

num normalFoldFunction(ActorScoreChange scoreChange) =>
    scoreChange.selfPreservation +
    scoreChange.teamPreservation -
    scoreChange.enemy;
