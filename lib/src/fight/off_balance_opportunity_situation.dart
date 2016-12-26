library stranded.fight.off_balance_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';

import 'off_balance_opportunity_thrust.dart';
import 'pass.dart';

part 'off_balance_opportunity_situation.g.dart';

abstract class OffBalanceOpportunitySituation extends Situation
    implements
        Built<OffBalanceOpportunitySituation,
            OffBalanceOpportunitySituationBuilder> {
  factory OffBalanceOpportunitySituation(
          [updates(OffBalanceOpportunitySituationBuilder b)]) =
      _$OffBalanceOpportunitySituation;

  factory OffBalanceOpportunitySituation.initialized(Actor actor,
          {Actor culprit}) =>
      new OffBalanceOpportunitySituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..actorId = actor.id
        ..culpritId = culprit?.id);

  OffBalanceOpportunitySituation._();

  get actionGenerators => [offBalanceOpportunityThrust];

  get actions => [pass];

  /// The actor who is off balance.
  int get actorId;

  /// The actor who caused [actorId] to be off balance.
  @nullable
  int get culpritId;

  int get id;

  String get name => "OffBalanceOpportunitySituation";

  int get time;

  @override
  OffBalanceOpportunitySituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState world) {
    if (time > 0) return null;
    var actor = world.getActorById(actorId);
    List<Actor> enemies = world.actors
        .where((Actor a) =>
            a.isAliveAndActive && a.isEnemyOf(actor) && a.id != culpritId)
        .toList();
    // TODO: sort by distance, cut off if too far

    if (enemies.isNotEmpty) {
      var candidate = enemies.first;
      // Only change the situation when the candidate can actually pull it off.
      if (offBalanceOpportunityThrust.valid(candidate, actor, world)) {
        return candidate;
      }
    }
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, WorldState world) {
    var actor = world.getActorById(actorId);
    return actors.where((a) => a == actor || a.isEnemyOf(actor));
  }
}
