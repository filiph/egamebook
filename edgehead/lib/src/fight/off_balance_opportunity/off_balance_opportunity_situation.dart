library stranded.fight.off_balance_situation;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/pass.dart';
import 'package:edgehead/src/fight/off_balance_opportunity/actions/off_balance_opportunity_thrust.dart';

part 'off_balance_opportunity_situation.g.dart';

abstract class OffBalanceOpportunitySituation extends Object
    with
        SituationBaseBehavior
    implements
        Built<OffBalanceOpportunitySituation,
            OffBalanceOpportunitySituationBuilder> {
  static Serializer<OffBalanceOpportunitySituation> get serializer =>
      _$offBalanceOpportunitySituationSerializer;

  factory OffBalanceOpportunitySituation(
          [void updates(OffBalanceOpportunitySituationBuilder b)]) =
      _$OffBalanceOpportunitySituation;

  factory OffBalanceOpportunitySituation.initialized(int id, Actor actor,
          {Actor culprit}) =>
      OffBalanceOpportunitySituation((b) => b
        ..id = id
        ..time = 0
        ..actorId = actor.id
        ..culpritId = culprit?.id);

  OffBalanceOpportunitySituation._();

  @override
  List<Action<dynamic>> get actions => [
        Pass.singleton,
        OffBalanceOpportunityThrust.singleton,
      ];

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
  ActorTurn getCurrentActor(Simulation sim, WorldState world) {
    if (time > 0) return ActorTurn.never;
    var actor = world.getActorById(actorId);
    List<Actor> enemies = world.actors
        .where((Actor a) =>
            a.isAliveAndActive && a.hates(actor, world) && a.id != culpritId)
        .toList();
    // TODO: sort by distance, cut off if too far

    if (enemies.isEmpty) return ActorTurn.never;

    var candidate = enemies.first;
    var offBalanceOpportunityThrust = OffBalanceOpportunityThrust.singleton;

    // Only change the situation when the candidate can actually pull it off.
    if (offBalanceOpportunityThrust.isApplicable(
        candidate, sim, world, actor)) {
      return ActorTurn(candidate, world.time);
    }
    return ActorTurn.never;
  }

  @override
  Iterable<Actor> getActors(
      Iterable<Actor> actors, Simulation sim, WorldState world) {
    var actor = world.getActorById(actorId);
    return actors.where((a) => a == actor || a.hates(actor, world));
  }
}
