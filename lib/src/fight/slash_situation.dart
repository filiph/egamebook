library stranded.fight.slash_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'slash.dart';

part 'slash_situation.g.dart';

abstract class SlashSituation extends Situation
    implements Built<SlashSituation, SlashSituationBuilder> {
  factory SlashSituation([updates(SlashSituationBuilder b)]) = _$SlashSituation;

  factory SlashSituation.initialized(Actor attacker, Actor target) =>
      new SlashSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  SlashSituation._();

  List<ActionGenerator> get actionGenerators => [finishSlash];

  int get attacker;

  int get id;

  String get name => "SlashSituation";

  int get target;

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
