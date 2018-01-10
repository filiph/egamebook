library stranded.fight.off_balance_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/pass.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/actions/off_balance_opportunity_thrust.dart';

part 'off_balance_opportunity_situation.g.dart';

abstract class OffBalanceOpportunitySituation extends Situation
    implements
        Built<OffBalanceOpportunitySituation,
            OffBalanceOpportunitySituationBuilder> {
  static Serializer<OffBalanceOpportunitySituation> get serializer =>
      _$offBalanceOpportunitySituationSerializer;

  factory OffBalanceOpportunitySituation(
          [void updates(OffBalanceOpportunitySituationBuilder b)]) =
      _$OffBalanceOpportunitySituation;

  factory OffBalanceOpportunitySituation.initialized(Actor actor,
          {Actor culprit}) =>
      new OffBalanceOpportunitySituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..actorId = actor.id
        ..culpritId = culprit?.id);

  OffBalanceOpportunitySituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      <EnemyTargetActionBuilder>[OffBalanceOpportunityThrust.builder];

  @override
  List<Action> get actions => [Pass.singleton];

  /// The actor who is off balance.
  int get actorId;

  /// The actor who caused [actorId] to be off balance.
  @nullable
  int get culpritId;

  @override
  int get id;

  @override
  String get name => "OffBalanceOpportunitySituation";

  @override
  int get time;

  @override
  OffBalanceOpportunitySituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, Simulation sim, WorldState world) {
    if (time > 0) return null;
    var actor = world.getActorById(actorId);
    List<Actor> enemies = world.actors
        .where((Actor a) =>
            a.isAliveAndActive && a.hates(actor, world) && a.id != culpritId)
        .toList();
    // TODO: sort by distance, cut off if too far

    if (enemies.isEmpty) return null;

    var candidate = enemies.first;
    var offBalanceOpportunityThrust =
        OffBalanceOpportunityThrust.builder(actor);

    // Only change the situation when the candidate can actually pull it off.
    if (offBalanceOpportunityThrust.isApplicable(candidate, sim, world)) {
      return candidate;
    }
    return null;
  }

  @override
  Iterable<Actor> getActors(
      Iterable<Actor> actors, Simulation sim, WorldState world) {
    var actor = world.getActorById(actorId);
    return actors.where((a) => a == actor || a.hates(actor, world));
  }
}
