library stranded.action;

import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
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
Iterable<EnemyTargetAction> generateEnemyTargetActions(
    Actor actor, WorldState world, EnemyTargetActionBuilder builder) sync* {
  var situationActors = world.currentSituation.getActors(world.actors, world);
  var enemies = situationActors
      .where((other) => other != actor && other.isAliveAndActive);
  for (var enemy in enemies) {
    var action = builder(enemy);
    assert(action.enemy == enemy);
    if (action.isAggressive && !actor.hates(enemy, world)) continue;
    yield action;
  }
}

/// Generator generates multiple [Action] instances given a [world] and
/// an [actor] and a [builder].
Iterable<ExitAction> generateExitActions(
    Actor actor, WorldState world, ExitActionBuilder builder) sync* {
  RoomRoamingSituation situation = world.currentSituation;
  var room = world.getRoomByName(situation.currentRoomName);

  for (var exit in room.exits) {
    var action = builder(exit);
    assert(action.exit == exit);
    yield action;
  }
}

/// A generic type for builder functions that take a parameter to build
/// a concrete implementation of an action.
///
/// For example, a "kick-someone" builder can take an Actor Joe as [parameter]
/// and can output "kick Joe" action.
typedef T ActionBuilder<T extends Action, V>(V parameter);

/// Builder takes an enemy actor and generates an instance of
/// [EnemyTargetAction] with the given [enemy].
typedef EnemyTargetAction EnemyTargetActionBuilder(Actor enemy);

/// Builder takes an enemy actor and generates an instance of
/// [ExitAction] with the given [exit].
typedef ExitAction ExitActionBuilder(Exit exit);

abstract class Action {
  String _description;

  String get name;

  String get helpMessage;

  /// Whether or not this action is aggressive towards its sufferer. Combat
  /// moves are aggressive, healing moves aren't.
  ///
  /// This describes intent, not result. A failed attempt to kill someone is
  /// aggressive although it doesn't harm the intended target.
  bool get isAggressive;

  Iterable<PlanConsequence> apply(
      Actor actor, PlanConsequence current, WorldState world) sync* {
    var successChance = getSuccessChance(actor, current.world);
    assert(successChance != null);
    assert(successChance >= 0.0);
    assert(successChance <= 1.0);

    if (successChance > 0) {
      var worldCopy = new WorldState.duplicate(world);
      Storyline storyline = _applyToWorldCopy(
          worldCopy, actor, world, applySuccess,
          isSuccess: true);

      yield new PlanConsequence(
          worldCopy, current, this, storyline, successChance,
          isSuccess: true);
    }
    if (successChance < 1) {
      var worldCopy = new WorldState.duplicate(world);
      Storyline storyline = _applyToWorldCopy(
          worldCopy, actor, world, applyFailure,
          isFailure: true);

      yield new PlanConsequence(
          worldCopy, current, this, storyline, 1 - successChance,
          isFailure: true);
    }
  }

  /// Called to get the result of failure to do this action. Mutates [w]
  /// (World). Returns a string useful for logging, such as "player failed to
  /// slash orc".
  String applyFailure(Actor a, WorldState w, Storyline s);

  /// Called to get the result of success of doing this action. Mutates [w]
  /// (World). Returns a string useful for logging, such as "player slashed
  /// orc".
  String applySuccess(Actor a, WorldState w, Storyline s);

  /// Success chance of the action given the actor and the state of the world.
  num getSuccessChance(Actor a, WorldState w);

  /// Returns a string that will explain why actor needs to roll for success.
  ///
  /// For example:
  ///
  /// * "Will you hit him?"
  /// * "Will you dodge the swing?"
  String getRollReason(Actor a, WorldState w);

  bool isApplicable(Actor a, WorldState w);

  void _addWorldRecord(ActionRecordBuilder builder, WorldState world) {
    if (_description == null) {
      throw new StateError("No description given when executing $this. You "
          "should return it from your world-modifying function.");
    }
    builder.markAfterAction(world);
    builder.description = _description;
    builder.time = world.time;
    world.actionRecords.addFirst(builder.build());
  }

  Storyline _applyToWorldCopy(
      WorldState worldCopy,
      Actor actor,
      WorldState world,
      String applyFunction(Actor actor, WorldState world, Storyline storyline),
      {bool isSuccess: false,
      bool isFailure: false}) {
    // Find actor by id.
    var actorInWorldCopy =
        worldCopy.actors.singleWhere((a) => a.id == actor.id);
    var builder = _prepareWorldRecord(actor, world, isSuccess, isFailure);
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

  ActionRecordBuilder _prepareWorldRecord(
          Actor actor, WorldState world, bool isSuccess, isFailure) =>
      new ActionRecordBuilder()
        ..actionClass = this.runtimeType.toString()
        ..actionName = name
        ..protagonist = actor
        ..sufferers = new Set.from((this is EnemyTargetAction)
            ? [(this as EnemyTargetAction).enemy]
            : [])
        ..wasSuccess = isSuccess
        ..wasFailure = isFailure
        ..wasAggressive = isAggressive
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

  /// EnemyTargetAction should include the [enemy] in the [name]. To make it
  /// easier to implement, this class will automatically construct the name
  /// given a [Storyline] template.
  ///
  /// For example, "kill <object>" is a valid name template that might realize
  /// into something like "Kill the orc."
  String get nameTemplate;

  @override
  String getRollReason(Actor a, WorldState w) => (new Storyline()
        ..add(rollReasonTemplate,
            subject: a, object: enemy, wholeSentence: true))
      .realize();

  /// EnemyTargetActions might want to mention the [enemy] in the output
  /// of [getRollReason]. To make this easier to implement, this class will
  /// automatically construct the roll reason given a [Storyline] template.
  ///
  /// For example "will <subject> hit <objectPronoun>?" is a valid roll reason
  /// template that might realize into something like "Will you hit him?"
  String get rollReasonTemplate;

  @override
  String toString() => "EnemyTargetAction<$nameTemplate::"
      "enemy=${enemy.id}/${enemy.name}>";
}

/// This [Action] requires an [exit].
///
/// Every [ExitAction] should contain a static builder like this:
///
///     static ExitAction builder(Exit enemy) => new Example(exit);
abstract class ExitAction extends Action {
  final Exit exit;

  @mustCallSuper
  ExitAction(this.exit);

  @override
  String get name => exit.description;

  @override
  String toString() => "ExitAction<$name>";
}
