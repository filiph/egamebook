library stranded.fight.slash_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/slash/actions/finish_slash.dart';

part 'slash_situation.g.dart';

abstract class SlashSituation extends Situation
    implements Built<SlashSituation, SlashSituationBuilder> {
  factory SlashSituation([updates(SlashSituationBuilder b)]) = _$SlashSituation;

  factory SlashSituation.initialized(Actor attacker, Actor target,
          {bool extraForce: false}) =>
      new SlashSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  SlashSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators => [FinishSlash.builder];

  int get attacker;

  @override
  int get id;

  @override
  String get name => "SlashSituation";

  int get target;

  @override
  int get time;

  @override
  SlashSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
