library stranded.fight.punch_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/punch/actions/finish_punch.dart';

part 'punch_situation.g.dart';

abstract class PunchSituation extends Situation
    implements Built<PunchSituation, PunchSituationBuilder> {
  factory PunchSituation([void updates(PunchSituationBuilder b)]) =
      _$PunchSituation;

  factory PunchSituation.initialized(Actor attacker, Actor target) =>
      new PunchSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  PunchSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [FinishPunch.builder];

  int get attacker;

  @override
  int get id;

  @override
  String get name => "PunchSituation";

  int get target;

  @override
  int get time;

  @override
  PunchSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
