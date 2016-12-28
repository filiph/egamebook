library stranded.fight.slash_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/defensive_parry_slash.dart';

import 'dodge_slash.dart';
import 'parry_slash.dart';

part 'slash_defense_situation.g.dart';

abstract class SlashDefenseSituation extends Situation
    implements Built<SlashDefenseSituation, SlashDefenseSituationBuilder> {
  factory SlashDefenseSituation([updates(SlashDefenseSituationBuilder b)]) =
      _$SlashDefenseSituation;

  factory SlashDefenseSituation.initialized(Actor attacker, Actor target) =>
      new SlashDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id);

  SlashDefenseSituation._();

  get actionGenerators =>
      [DodgeSlash.builder, ParrySlash.builder, DefensiveParrySlash.builder];

  int get attacker;

  int get id;

  String get name => "SlashDefenseSituation";

  int get target;

  int get time;

  @override
  SlashDefenseSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(target);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
