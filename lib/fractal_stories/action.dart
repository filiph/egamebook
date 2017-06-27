library stranded.action;

import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/room_exit.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
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

/// Generator generates multiple [ExitAction] instances given a [world] and
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

/// Generator generates multiple [ItemAction] instances given a [world] and
/// an [actor] and a [builder].
Iterable<ItemAction> generateItemActions(
    Actor actor, WorldState world, ItemActionBuilder builder) sync* {
  FightSituation situation = world.currentSituation;

  for (var item in situation.droppedItems) {
    var action = builder(item);
    assert(action.item == item);
    yield action;
  }
}

/// A generic type for builder functions that take a parameter to build
/// a concrete implementation of an action.
///
/// For example, a "kick-someone" builder can take an Actor Joe as [parameter]
/// and can output "kick Joe" action.
typedef T ActionBuilder<T extends Action, V>(V parameter);

/// A typedef for [Action]'s apply functions: both [Action.applySuccess] and
/// [Action.applyFailure].
typedef String ApplyFunction(
    Actor actor, WorldState world, Storyline storyline);

/// Builder takes an enemy actor and generates an instance of
/// [EnemyTargetAction] with the given [enemy].
typedef EnemyTargetAction EnemyTargetActionBuilder(Actor enemy);

/// Builder takes an enemy actor and generates an instance of
/// [ExitAction] with the given [exit].
typedef ExitAction ExitActionBuilder(Exit exit);

/// Builder takes situation's items and generates an instance of [ItemAction]
/// with the given [item] and its [description].
typedef ItemAction ItemActionBuilder(Item item);

abstract class Action {
  String _description;

  /// The command that describes this action.
  ///
  /// For example: "open the door" or "swing at the orc".
  String get command;

  String get helpMessage;

  /// Whether or not this action is aggressive towards its sufferer. Combat
  /// moves are aggressive, healing moves aren't.
  ///
  /// This describes intent, not result. A failed attempt to kill someone is
  /// aggressive although it doesn't harm the intended target.
  bool get isAggressive;

  /// Returns `false` if this action is a reaction to someone else's action.
  /// Returns `true` if the actor chose this action pro-actively.
  ///
  /// Examples of reactive actions are 'dodge' and 'parry'. Examples of
  /// proactive actions are 'slash' and 'cast spell'.
  bool get isProactive;

  /// The name of the class of the Action.
  ///
  /// We need to use this instead of the [runtimeType] because [runtimeType]
  /// can be mangled in production (dart2js).
  String get name;

  /// Whether or not the actor can exert a resource (of type [rerollResource])
  /// to reroll a failed throw.
  ///
  /// For example, the player can exert his spare [Resource.stamina] to reroll
  /// an attempt to parry an enemy's attack. This will give him another throw,
  /// but will also decrease his stamina. We need to know which type of stat
  /// this action takes.
  bool get rerollable;

  /// When [rerollable] is `true`, this field must be set to the type of
  /// resource that can be exerted.
  ///
  /// The resource must be spent _outside_ [apply]. The game system – not
  /// the class – is responsible for taking the resource away and reporting
  /// on it.
  Resource get rerollResource;

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

  /// Returns a string that will explain why actor needs to roll for success.
  ///
  /// For example:
  ///
  /// * "Will you hit him?"
  /// * "Will you dodge the swing?"
  String getRollReason(Actor a, WorldState w);

  /// Success chance of the action given the actor and the state of the world.
  num getSuccessChance(Actor a, WorldState w);

  bool isApplicable(Actor a, WorldState w);

  void _addWorldRecord(ActionRecordBuilder builder, WorldState world) {
    if (_description == null) {
      throw new StateError("No description given when executing $this. You "
          "should return it from your world-modifying function.");
    }
    builder.description = _description;
    builder.time = world.time;
    world.actionRecords.addFirst(builder.build());
  }

  Storyline _applyToWorldCopy(WorldState worldCopy, Actor actor,
      WorldState world, ApplyFunction applyFunction,
      {bool isSuccess: false, bool isFailure: false}) {
    // Set currentAction.
    worldCopy.currentAction = this;
    // Find actor by id.
    var actorInWorldCopy =
        worldCopy.actors.singleWhere((a) => a.id == actor.id);
    var builder = _prepareWorldRecord(actor, world, isSuccess, isFailure);
    var storyline = new Storyline();
    // Remember situation as it can be changed during applySuccess.
    var situationId = worldCopy.currentSituation.id;
    int hashCode = worldCopy.hashCode;
    worldCopy.currentSituation.onBeforeAction(worldCopy, storyline);
    assert(worldCopy.hashCode == hashCode,
        "Please don't change the world in onBeforeAction");
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
    worldCopy.currentAction = null;

    // Remove ended situations: the ones that don't return an actor anymore,
    // and the ones that return shouldContinue(world) != true.
    while (worldCopy.currentSituation?.getCurrentActor(worldCopy) == null ||
        worldCopy.currentSituation?.shouldContinue(worldCopy) != true) {
      if (worldCopy.currentSituation == null) break;
      worldCopy.popSituation();
    }
    _addWorldRecord(builder, worldCopy);
    return storyline;
  }

  ActionRecordBuilder _prepareWorldRecord(
      Actor actor, WorldState world, bool isSuccess, isFailure) {
    var builder = new ActionRecordBuilder()
      ..actionName = name
      ..protagonist = actor.id
      ..knownTo = KnownToMode.all
      ..wasSuccess = isSuccess
      ..wasFailure = isFailure
      ..wasAggressive = isAggressive
      ..wasProactive = isProactive;
    if (this is EnemyTargetAction) {
      EnemyTargetAction action = this;
      builder.sufferers.add(action.enemy.id);
    }
    return builder;
  }
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
  String get command =>
      (new Storyline()..add(commandTemplate, object: enemy)).realize();

  /// EnemyTargetAction should include the [enemy] in the [command]. To make it
  /// easier to implement, this class will automatically construct the name
  /// given a [Storyline] template.
  ///
  /// For example, "kill <object>" is a valid name template that might realize
  /// into something like "Kill the orc."
  String get commandTemplate;

  /// EnemyTargetActions might want to mention the [enemy] in the output
  /// of [getRollReason]. To make this easier to implement, this class will
  /// automatically construct the roll reason given a [Storyline] template.
  ///
  /// For example "will <subject> hit <objectPronoun>?" is a valid roll reason
  /// template that might realize into something like "Will you hit him?"
  String get rollReasonTemplate;

  @override
  String getRollReason(Actor a, WorldState w) => (new Storyline()
        ..add(rollReasonTemplate,
            subject: a, object: enemy, wholeSentence: true))
      .realize();

  /// Gets the [Situation.id] of the main situation of this action.
  ///
  /// This is useful for using [Storyline] threads. Actions at the start
  /// of a situation can mark themselves as supportive in a thread, and then
  /// other actions will add themselves to that same thread, so that [Storyline]
  /// can discard the supportive actions when they are to be reported next
  /// to each other. The thread id is taken from the [Situation.id].
  int getThreadId(WorldState w, String mainSituationName) =>
      w.getSituationByName<Situation>(mainSituationName).id;

  @override
  String toString() => "EnemyTargetAction<$commandTemplate::"
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
  String get command => exit.command;

  @override
  String toString() => "ExitAction<$command>";
}

/// This [Action] requires an [item].
///
/// Every [ItemAction] should contain a static builder like this:
///
///     static ItemAction builder(Item enemy) => new Example(item);
abstract class ItemAction extends Action {
  final Item item;

  @mustCallSuper
  ItemAction(this.item);

  @override
  String get command =>
      (new Storyline()..add(commandTemplate, object: item)).realize();

  /// ItemAction should include the [item] in the [command]. To make it
  /// easier to implement, this class will automatically construct the name
  /// given a [Storyline] template.
  String get commandTemplate;

  @override
  String toString() => "ItemAction<$command>";
}

/// This enum defines all the different resources (Stats) that player can use
/// to reroll action throws.
enum Resource {
  /// Using stamina means exerting extra physical energy. Useful for power
  /// moves, running away unscathed, etc.
  stamina,

  /// Some moves can be rerolled by 'spending' balance. A kick will land,
  /// but the player will go off-balance or even fall down.
  balance,

  // TODO: Ideas: weaponGrip (throw sword), shield (let the shield break)
}
