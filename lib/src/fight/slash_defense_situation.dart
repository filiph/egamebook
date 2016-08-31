library stranded.fight.slash_defense_situation;

import 'package:built_value/built_value.dart';

import 'package:stranded/situation.dart';
import 'package:stranded/actor.dart';
import 'package:quiver/core.dart';
import 'package:stranded/action.dart';
import 'package:stranded/world.dart';
import 'dodge_slash.dart';
import 'parry_slash.dart';
import 'package:edgehead/src/fight/defensive_parry_slash.dart';

part 'slash_defense_situation.g.dart';

abstract class SlashDefenseSituation extends SituationState
    with ElapsingTime<SlashDefenseSituation, SlashDefenseSituationBuilder>
    implements Built<SlashDefenseSituation, SlashDefenseSituationBuilder> {
  String get name => "SlashDefenseSituation";
  int get time;
  int get attacker;
  int get target;

  SlashDefenseSituation._();
  factory SlashDefenseSituation([updates(SlashDefenseSituationBuilder b)]) =
      _$SlashDefenseSituation;
  factory SlashDefenseSituation.withValues(Actor attacker, Actor target,
          {int time: 0}) =>
      new SlashDefenseSituation((b) => b
        ..attacker = attacker.id
        ..target = target.id
        ..time = time);

  List<ActionGenerator> get actionGenerators =>
      [dodgeSlash, parrySlash, defensiveParrySlash];

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(target);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}

abstract class SlashDefenseSituationBuilder
    implements
        Builder<SlashDefenseSituation, SlashDefenseSituationBuilder>,
        SituationStateBuilderBase {
  int time = 0;
  int attacker;
  int target;

  SlashDefenseSituationBuilder._();
  factory SlashDefenseSituationBuilder() = _$SlashDefenseSituationBuilder;
}
