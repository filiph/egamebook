library stranded.fight.slash_situation;

import 'package:built_value/built_value.dart';

import 'package:stranded/situation.dart';
import 'package:stranded/actor.dart';
import 'package:quiver/core.dart';
import 'package:stranded/action.dart';
import 'slash.dart';
import 'package:stranded/world.dart';

part 'slash_situation.g.dart';

abstract class SlashSituation extends SituationState
    with ElapsingTime<SlashSituation, SlashSituationBuilder>
    implements Built<SlashSituation, SlashSituationBuilder> {
  String get name => "SlashSituation";
  int get time;
  int get attacker; // TODO: use id instead
  int get target;

  SlashSituation._();
  factory SlashSituation([updates(SlashSituationBuilder b)]) = _$SlashSituation;
  factory SlashSituation.withValues(Actor attacker, Actor target,
          {int time: 0}) =>
      new SlashSituation((b) => b
        ..attacker = attacker.id
        ..target = target.id
        ..time = time);

  List<ActionGenerator> get actionGenerators =>
      [finishSlash];

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(attacker);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}

abstract class SlashSituationBuilder
    implements
        Builder<SlashSituation, SlashSituationBuilder>,
        SituationStateBuilderBase {
  int time = 0;
  int attacker;
  int target;

  SlashSituationBuilder._();
  factory SlashSituationBuilder() = _$SlashSituationBuilder;
}
