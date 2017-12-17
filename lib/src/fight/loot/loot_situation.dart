library stranded.fight.loot_situation;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/loot/actions/autoloot.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

part 'loot_situation.g.dart';

abstract class LootSituation extends Situation
    implements Built<LootSituation, LootSituationBuilder> {
  static const String className = "LootSituation";

  factory LootSituation([void updates(LootSituationBuilder b)]) =
      _$LootSituation;

  factory LootSituation.initialized(Iterable<int> playerTeamIds,
          String groundMaterial, Iterable<Item> droppedItems,
          {RoomRoamingSituation roomRoamingSituation}) =>
      new LootSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..groundMaterial = groundMaterial
        ..playerTeamIds = new ListBuilder<int>(playerTeamIds)
        ..droppedItems = new ListBuilder<Item>(droppedItems));

  LootSituation._();

  @override
  List<Action> get actions => <Action>[AutoLoot.singleton];

  /// The items dropped by dead combatants.
  BuiltList<Item> get droppedItems;

  /// The material on the ground. It can be 'wooden floor' or 'grass'.
  String get groundMaterial;

  /// The actors present at looting.
  BuiltList<int> get playerTeamIds;

  @override
  int get id;

  @override
  String get name => className;

  @override
  int get time;

  @override
  LootSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState world) {
    // Only one turn of looting.
    if (time > 0) return null;
    // Only player can loot at the moment.
    return _getPlayer(world.actors);
  }

  @override
  Iterable<Actor> getActors(
      Iterable<Actor> actors, Simulation sim, WorldState world) {
    return [_getPlayer(actors)];
  }

  @override
  bool shouldContinue(Simulation sim, WorldState w) => true;

  Actor _getPlayer(Iterable<Actor> actors) =>
      actors.firstWhere((a) => a.isPlayer && a.isAliveAndActive);
}
