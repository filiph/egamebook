library stranded.fight.fight_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/room.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';

part 'room_roaming_situation.g.dart';

abstract class RoomRoamingSituation extends Situation
    implements Built<RoomRoamingSituation, RoomRoamingSituationBuilder> {
  factory RoomRoamingSituation([updates(RoomRoamingSituationBuilder b)]) =
      _$RoomRoamingSituation;

  factory RoomRoamingSituation.initialized(Room currentRoom) =>
      new RoomRoamingSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..currentRoomName = currentRoom.name);

  RoomRoamingSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [/* TODO: add exit action generator */];

  @override
  List<Action> get actions => <Action>[];

  String get currentRoomName;

  @override
  int get id;

  @override
  String get name => "RoomRoamingSituation";

  @override
  int get time;

  @override
  RoomRoamingSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int i, WorldState world) =>
      getActors(world.actors, world).single;

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      [actors.singleWhere((a) => a.isPlayer)];
}
