library stranded.fight.slash_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';
import 'package:edgehead/src/fight/slash/actions/finish_thrust_spear.dart';

part 'slash_situation.g.dart';

abstract class SlashSituation extends Situation
    implements Built<SlashSituation, SlashSituationBuilder> {
  static Serializer<SlashSituation> get serializer =>
      _$slashSituationSerializer;

  static const String className = "SlashSituation";

  factory SlashSituation([void updates(SlashSituationBuilder b)]) =
      _$SlashSituation;

  factory SlashSituation.initialized(Actor attacker, Actor target) =>
      new SlashSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  SlashSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [FinishSlash.builder, FinishThrustSpear.builder];

  int get attacker;

  @override
  int get id;

  @override
  String get name => className;

  int get target;

  @override
  int get time;

  @override
  SlashSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _, __) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
