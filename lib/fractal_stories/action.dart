library stranded.action;

import 'package:meta/meta.dart';

import 'action_record.dart';
import 'actor.dart';
import 'plan_consequence.dart';
import 'storyline/storyline.dart';
import 'world.dart';

/// Generator generates multiple [Action] instances given a [world] and
/// an [actor] and a [builder].
///
/// For example, a builder called `hitWithStick` can take the current
/// world and output as many actions as there are enemies to hit with a stick.
/// Each generated action will encapsulate the enemy to hit.
Iterable<EnemyTargetAction> generateEnemyTargetActions(Actor actor,
    WorldState world, EnemyTargetActionBuilder builder) sync* {
  var situationActors = world.currentSituation.getActors(world.actors, world);
  var enemies =
      situationActors.where((other) => other.team.isEnemyWith(actor.team));
  for (var enemy in enemies) {
    var action = builder(enemy);
    assert(action.enemy == enemy);
    yield action;
  }
}

/// Builder takes an enemy actor and generates an instance of
/// [EnemyTargetAction] with the given [enemy].
typedef EnemyTargetAction EnemyTargetActionBuilder(Actor enemy);

abstract class Action {
  String _description;

  String get name;

  Iterable<PlanConsequence> apply(
      Actor actor, PlanConsequence current, WorldState world) sync* {
    var successChance = getSuccessChance(actor, current.world);
    assert(successChance != null);
    assert(successChance >= 0.0);
    assert(successChance <= 1.0);

    if (successChance > 0) {
      var worldCopy = new WorldState.duplicate(world);
      Storyline storyline =
          _applyToWorldCopy(worldCopy, actor, world, applySuccess);

      yield new PlanConsequence(
          worldCopy, current, this, storyline, successChance,
          isSuccess: true);
    }
    if (successChance < 1) {
      var worldCopy = new WorldState.duplicate(world);
      Storyline storyline =
          _applyToWorldCopy(worldCopy, actor, world, applyFailure);

      yield new PlanConsequence(
          worldCopy, current, this, storyline, 1 - successChance,
          isFailure: true);
    }
  }

  /// Changes the [world].
  String applyFailure(Actor a, WorldState w, Storyline s);
  String applySuccess(Actor a, WorldState w, Storyline s);

  /// Success chance of the action given the actor and the state of the world.
  num getSuccessChance(Actor a, WorldState w);

  bool isApplicable(Actor a, WorldState w);

  void _addWorldRecord(ActionRecordBuilder builder, WorldState world) {
    if (_description == null) {
      throw new StateError("No description given when executing $this. You "
          "should return it from your world-modifying function.");
    }
    builder.markAfterAction(world);
    builder.description = _description;
    builder.time = world.time;
    world.actionRecords.add(builder.build());
  }

  Storyline _applyToWorldCopy(
      WorldState worldCopy,
      Actor actor,
      WorldState world,
      String applyFunction(
          Actor actor, WorldState world, Storyline storyline)) {
    // Find actor by id.
    var actorInWorldCopy =
        worldCopy.actors.singleWhere((a) => a.id == actor.id);
    var builder = _prepareWorldRecord(actor, world);
    // Remember situation as it can be changed during applySuccess.
    var storyline = new Storyline();
    var situationId = worldCopy.currentSituation.id;
    int hashCode = worldCopy.hashCode;
    worldCopy.currentSituation.onBeforeAction(worldCopy, storyline);
    if (worldCopy.hashCode != hashCode) {
      // TODO: change this into an assert with message, #perfmatters
      // assert(worldCopy.hashCode == hashCode, "Please don't change the world in onBeforeAction");
      throw new StateError("Please don't change the world in onBeforeAction");
    }
    _description = applyFunction(actorInWorldCopy, worldCopy, storyline);
    if (worldCopy.situationExists(situationId)) {
      // The current situation could have been removed by [applyFunction].
      // If not, let's update its time.
      worldCopy.elapseSituationTime(situationId);
    }
    worldCopy.elapseTime();
    worldCopy
        .getSituationById(situationId)
        ?.onAfterAction(worldCopy, storyline);

    // Remove ended situations: the ones that don't return an actor anymore,
    // and the ones that return shouldContinue(world) == true.
    while (worldCopy.currentSituation?.getCurrentActor(worldCopy) == null ||
        worldCopy.currentSituation?.shouldContinue(worldCopy) != true) {
      if (worldCopy.currentSituation == null) break;
      worldCopy.popSituation();
    }
    _addWorldRecord(builder, worldCopy);
    return storyline;
  }

  ActionRecordBuilder _prepareWorldRecord(Actor actor, WorldState world) =>
      new ActionRecordBuilder()
        ..actionName = name
        ..protagonist = actor
        ..markBeforeAction(world);
}

/// This [Action] requires an [enemy].
///
/// Every [EnemyTargetAction] should contain a static builder like this:
///
///     static EnemyTargetAction builder(Actor enemy) => new Kick(enemy);
abstract class EnemyTargetAction extends Action {
  final Actor enemy;

  @mustCallSuper
  EnemyTargetAction(this.enemy);

  @override
  String get name =>
      (new Storyline()..add(nameTemplate, object: enemy)).realize();

  String get nameTemplate;

  String toString() => "EnemyTargetAction<$nameTemplate::$enemy>";
}
