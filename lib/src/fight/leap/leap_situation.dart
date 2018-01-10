library stranded.fight.leap_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/leap/actions/finish_leap.dart';

part 'leap_situation.g.dart';

abstract class LeapSituation extends Situation
    implements Built<LeapSituation, LeapSituationBuilder> {
  static Serializer<LeapSituation> get serializer => _$leapSituationSerializer;

  factory LeapSituation([void updates(LeapSituationBuilder b)]) =
      _$LeapSituation;

  factory LeapSituation.initialized(Actor attacker, Actor target) =>
      new LeapSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  LeapSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [FinishLeap.builder];

  int get attacker;

  @override
  int get id;

  @override
  String get name => "LeapSituation";

  int get target;

  @override
  int get time;

  @override
  LeapSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
