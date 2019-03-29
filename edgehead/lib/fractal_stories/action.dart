library stranded.action;

import 'package:edgehead/ecs/pubsub.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/action_history.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';
import 'package:edgehead/fractal_stories/room_approach.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

/// A typedef for [Action]'s apply functions: both [Action.applySuccess] and
/// [Action.applyFailure].
typedef String ApplyFunction<T>(ActionContext context, T object);

/// A convenience typedef for actions whose applicability depends on another
/// [Actor] as [target].
///
/// This is useful for [OtherActorAction].
typedef bool OtherActorApplicabilityFunction(
    Actor a, Simulation sim, WorldState w, Actor target);

/// An action. Will be performed by an [Actor] and will change [WorldState]
/// using [applyFailure] or [applySuccess].
///
/// The generic argument [T] refers to the _object_ of the function.
/// For example, an attack action would have another [Actor] as an object.
/// Therefore, [applyFailure] and [applySuccess] would be called with
/// an [Actor] object as the second parameter.
abstract class Action<T> {
  static const Duration defaultRecoveryDuration = Duration(seconds: 1);

  static const Duration defaultPlayerRecoveryDuration =
      Duration(milliseconds: 750);

  String _description;

  @Deprecated('use getCommand')
  String get command => getCommand(null);

  /// Optional message to be shown when player presses a help button
  /// next to the action. The message should explain what the action does
  /// and, if appropriate, why and when it should be used.
  String get helpMessage;

  /// Whether or not this action is aggressive towards its sufferer. Combat
  /// moves are aggressive, healing moves aren't.
  ///
  /// This describes intent, not result. A failed attempt to kill someone is
  /// aggressive although it doesn't harm the intended target.
  bool get isAggressive;

  /// Returns `true` for actions that shouldn't be presented to the player
  /// because they are the only thing that _can_ be done in a situation.
  ///
  /// It is a runtime error when there is more than one action valid at a time
  /// and one of them is implicit.
  ///
  /// Returns `false` for ordinary actions.
  bool get isImplicit;

  /// Returns `false` if this action is a reaction to someone else's action.
  /// Returns `true` if the actor chose this action pro-actively.
  ///
  /// Examples of reactive actions are 'dodge' and 'parry'. Examples of
  /// proactive actions are 'slash' and 'cast spell'.
  ///
  /// Note that finishes of counter-able moves are _not_ proactive. For example,
  /// while initiating a slash at someone (`StartSlash`) is proactive,
  /// finishing it (`FinishSlash`) is not. The finishing move is an automatic,
  /// implicit action.
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

  Iterable<PlanConsequence> apply(ActorTurn turn, PlanConsequence current,
      Simulation sim, WorldState world, PubSub pubsub, T object) sync* {
    var successChance =
        getSuccessChance(turn.actor, sim, current.world, object);
    assert(successChance != null);
    assert(successChance.value >= 0.0);
    assert(successChance.value <= 1.0);

    final performance = Performance<T>(this, object, successChance.value);

    if (successChance.value > 0) {
      final worldOutput = world.toBuilder();
      Storyline storyline = _applyToWorldCopy(
          turn, sim, worldOutput, applySuccess, pubsub, object, successChance,
          isSuccess: true);

      yield PlanConsequence(worldOutput.build(), current, performance,
          storyline, successChance.value,
          isSuccess: true);
    }
    if (successChance.value < 1) {
      final worldOutput = world.toBuilder();
      Storyline storyline = _applyToWorldCopy(
          turn, sim, worldOutput, applyFailure, pubsub, object, successChance,
          isFailure: true);

      yield PlanConsequence(worldOutput.build(), current, performance,
          storyline, 1 - successChance.value,
          isFailure: true);
    }
  }

  /// Called to get the result of failure to do this action. Returns
  /// the mutated [Simulation].
  String applyFailure(ActionContext context, T object);

  /// Called to get the result of success of doing this action. Returns
  /// the mutated [Simulation].
  String applySuccess(ActionContext context, T object);

  /// Given the current state of the world, returns all the possible
  /// objects (targets) of this action.
  ///
  /// If the action doesn't need an object (like "stand up") then this
  /// method will never be run. Such an action needs to be defined
  /// as `Action<Null>`.
  Iterable<T> generateObjects(ApplicabilityContext context) {
    throw UnimplementedError('generateObjects not implemented for $this. '
        'If this is an Action<Null>, then this method shouldn\'t have been '
        'called in the first place.');
  }

  /// The command that describes this action.
  ///
  /// For example: "open the door" or "swing at the orc".
  String getCommand(T object);

  /// The path of sub-commands to be used for the action menu.
  ///
  /// For example, an actions such as "kick <subject> to ground" could have
  /// a [getCommandPath] of `[attack <subject>, stance, kick in chest]`. The
  /// [getCommandPath] is what the player chooses, the [getCommand()] is
  /// what is shown afterwards.
  List<String> getCommandPath(T object) => [getCommand(object)];

  /// The time it takes the actor to be available again after performing
  /// the action.
  ///
  /// In other words, the [Actor.recoveringUntil] will be updated to the current
  /// time plus the result of this method.
  ///
  /// For example, if a goblin swings at the player, the swing will happen
  /// instantaneously, but the goblin will be recovering (i.e. unable
  /// to move again) for the next 1 second.
  ///
  /// This defaults and 750ms ([defaultPlayerRecoveryDuration]) for the player.
  /// and to one second ([defaultRecoveryDuration]) for everyone else.
  /// Subclasses can safely override this.
  Duration getRecoveryDuration(ApplicabilityContext context, T object) {
    assert(isProactive, "Non-proactive actions don't take any time.");

    if (context.actor.isPlayer) {
      return defaultPlayerRecoveryDuration;
    }

    return defaultRecoveryDuration;
  }

  /// Returns a string that will explain why actor needs to roll for success.
  ///
  /// For example:
  ///
  /// * "Will you hit him?"
  /// * "Will you dodge the swing?"
  String getRollReason(Actor a, Simulation sim, WorldState w, T object);

  /// Success chance of the action given the actor and the state of the world.
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, T object);

  bool isApplicable(Actor a, Simulation sim, WorldState w, T object);

  void _addWorldRecord(ActionRecordBuilder builder, WorldStateBuilder world) {
    if (_description == null) {
      throw StateError("No description given when executing $this. You "
          "should return it from your world-modifying function.");
    }
    builder.description = _description;
    builder.time = world.time;
    world.recordAction(builder.build());
  }

  Storyline _applyToWorldCopy(
      ActorTurn turn,
      Simulation sim,
      WorldStateBuilder output,
      ApplyFunction<T> applyFunction,
      PubSub pubsub,
      T object,
      ReasonedSuccessChance successChance,
      {bool isSuccess = false,
      bool isFailure = false}) {
    final initialWorld = output.build();
    final builder = _prepareWorldRecord(
        turn.actor, sim, initialWorld, object, isSuccess, isFailure);
    final outputStoryline = Storyline();
    // Remember situation as it can be changed during applySuccess.
    final situationId = initialWorld.currentSituation.id;
    initialWorld.currentSituation
        .onBeforeAction(sim, initialWorld, outputStoryline);
    final context = ActionContext(this, turn.actor, sim, initialWorld, pubsub,
        output, outputStoryline, successChance);
    _description = applyFunction(context, object);

    // The current situation could have been removed by [applyFunction].
    // If not, let's update its time.
    output.elapseSituationTimeIfExists(situationId);

    // Move world time to when the turn happens.
    output.time = turn.time;

    if (isProactive) {
      // Mark actor busy after performing their action.
      final recoveringUntil =
          turn.time.add(getRecoveryDuration(context, object));
      output.updateActorById(
          turn.actor.id, (b) => b.recoveringUntil = recoveringUntil);
    }

    // Perform any [Situation.onAfterAction]s.
    output
        .build()
        .getSituationById(situationId)
        ?.onAfterAction(sim, output, outputStoryline);

    // Remove ended situations: the ones that don't return an actor anymore,
    // and the ones that return shouldContinue(world) != true.
    var builtOutput = output.build();
    while (builtOutput.currentSituation?.getNextTurn(sim, builtOutput) ==
            ActorTurn.never ||
        builtOutput.currentSituation?.shouldContinue(sim, builtOutput) !=
            true) {
      if (builtOutput.currentSituation == null) break;
      output.popSituation(sim);
      builtOutput = output.build();
    }

    // Only 'surviving' (non-popped) situations get to run their `onAfterTurn`
    // methods.
    output.currentSituation?.onAfterTurn(sim, output, outputStoryline);

    _addWorldRecord(builder, output);
    return outputStoryline;
  }

  ActionRecordBuilder _prepareWorldRecord(Actor actor, Simulation sim,
      WorldState world, T object, bool isSuccess, bool isFailure) {
    var builder = ActionRecordBuilder()
      ..actionName = name
      ..protagonist = actor.id
      ..wasSuccess = isSuccess
      ..wasFailure = isFailure
      ..wasAggressive = isAggressive
      ..wasProactive = isProactive;
    if (this is EnemyTargetAction) {
      builder.sufferers.add((object as Actor).id);
    }
    return builder;
  }
}

/// This [Action] requires an [approach].
///
/// Every [ApproachAction] should contain a static builder like this:
///
///     static ApproachAction builder(Approach enemy) => new Example(exit);
abstract class ApproachAction extends Action<Approach> {
  @override
  Iterable<Approach> generateObjects(ApplicabilityContext context) {
    final situation = context.world.currentSituation as RoomRoamingSituation;
    var room = context.simulation.getRoomByName(situation.currentRoomName);

    return context.simulation.getAvailableApproaches(room, context);
  }

  @override
  String toString() => "ApproachAction";
}

/// Mixin that adds the functionality for actions that will have
/// a command path longer than 1.
///
/// Overrides the default functionality in [Action] and requires
/// the [commandPathTemplate] field to be non-null and non-empty.
mixin ComplexCommandPath<T extends Entity> on Action<T> {
  /// This is to [getCommandPath] what [commandTemplate] is
  /// to [getCommandTemplate].
  ///
  /// For example, `["attack <object>", "kill", "decapitate"]` is a valid
  /// template that might realize to a sequence of actions such as
  /// "Attack the orc >> Kill >> Decapitate".
  List<String> get commandPathTemplate;

  @override
  List<String> getCommandPath(T target) {
    if (isImplicit) {
      throw StateError('ComplexCommandPath actions cannot be implicit. '
          '$this is.');
    }
    assert(
        commandPathTemplate != null && commandPathTemplate.isNotEmpty,
        "Never create actions with empty commandPathTemplate. "
        "Use isImplicit instead. Culprit: $this");

    // Realize the "<object>" parts of the template.
    return (Storyline()..add(commandPathTemplate.join('>>'), object: target))
        .realizeAsString()
        // Then split again into a list.
        .split('>>');
  }
}

/// This [Action] requires an [enemy].
///
/// Every [EnemyTargetAction] should contain a static builder like this:
///
///     static EnemyTargetAction builder(Actor enemy) => new Kick(enemy);
abstract class EnemyTargetAction extends OtherActorActionBase {
  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    var actors = context.world.currentSituation
        .getActors(context.simulation, context.world);
    return actors.where((other) {
      if (other == context.actor || !other.isAliveAndActive) return false;
      // Currently, we are only generating enemy-target actions for actors
      // towards which the actor feels hate.
      return context.actor.hates(other, context.world);
    });
  }

  @override
  String toString() => "EnemyTargetAction<$commandTemplate>";
}

/// This [Action] requires an [item].
///
/// Every [ItemAction] should contain a static builder like this:
///
///     static ItemAction builder(Item enemy) => new Example(item);
abstract class ItemAction extends Action<Item> {
  @override
  final bool isImplicit = false;

  /// ItemAction should include the [item] in the result of [getCommand].
  /// To make it easier to implement, this class will automatically construct
  /// the command string given a [Storyline] template.
  String get commandTemplate;

  @override
  Iterable<Item> generateObjects(ApplicabilityContext context) {
    final situation = context.world.currentSituation as FightSituation;
    return situation.droppedItems;
  }

  @override
  String getCommand(Item item) =>
      (Storyline()..add(commandTemplate, object: item)).realizeAsString();

  @override
  String toString() => "ItemAction<$commandTemplate>";
}

/// This [Action] requires a another [Actor], a target. The target
/// doesn't need to be an enemy or a friend. Just any actor other than
/// the one performing the action.
///
/// Many aggressive and combat actions are [OtherActorAction]s instead of
/// [EnemyTargetActions] because we can't guarantee that the opponent
/// is in an adversarial relation with the performing actor. For example,
/// when actor A initiates a defensible slash on actor B, and during
/// that action, A loses all hatred for actor B, we still need him
/// to finish that slash.
abstract class OtherActorAction extends OtherActorActionBase {
  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    var actors = context.world.currentSituation
        .getActors(context.simulation, context.world);
    return actors.where((other) {
      return other != context.actor && other.isAliveAndActive;
    });
  }

  @override
  String toString() => "OtherActorAction<$commandTemplate>";
}

/// A base class for [OtherActorAction] and [EnemyTargetAction].
///
/// [OtherActorAction] cannot be a direct superclass of [EnemyTargetAction]
/// because then our `if (builder is EnemyTargetActionBuilder)` logic
/// would have false positives (at least in Dart 1).
abstract class OtherActorActionBase extends Action<Actor> {
  /// [OtherActorActionBase] should include the [target] in the result of
  /// [getCommand]. To make it easier to implement, this class will
  /// automatically construct the name given a [Storyline] template.
  ///
  /// For example, "kill <object>" is a valid name template that might realize
  /// into something like "Kill the orc."
  String get commandTemplate;

  /// By default, [OtherActorActionBase] is not implicit. But it can be.
  @override
  bool get isImplicit => false;

  /// [OtherActorActionBase] might want to mention the [target] in the output
  /// of [getRollReason]. To make this easier to implement, this class will
  /// automatically construct the roll reason given a [Storyline] template.
  ///
  /// For example "will <subject> hit <objectPronoun>?" is a valid roll reason
  /// template that might realize into something like "Will you hit him?"
  String get rollReasonTemplate;

  @override
  String getCommand(Actor target) {
    if (isImplicit) {
      assert(
          commandTemplate == null,
          "When action is implicit, commandTemplate should be null. "
          "Found '$commandTemplate' instead in $this.");
      return "";
    }
    assert(
        commandTemplate != "",
        "Never create actions with empty commandTemplate. "
        "Use isImplicit instead. Culprit: $this");
    return (Storyline()..add(commandTemplate, object: target))
        .realizeAsString();
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Actor target) =>
      (Storyline()
            ..add(rollReasonTemplate,
                subject: a, object: target, wholeSentence: true))
          .realizeAsString();

  /// Gets the [Situation.id] of the main situation of this action.
  ///
  /// This is useful for using [Storyline] threads. Actions at the start
  /// of a situation can mark themselves as supportive in a thread, and then
  /// other actions will add themselves to that same thread, so that [Storyline]
  /// can discard the supportive actions when they are to be reported next
  /// to each other. The thread id is taken from the [Situation.id].
  int getThreadId(
          Simulation sim, WorldStateBuilder w, String mainSituationName) =>
      w.getSituationByName<Situation>(mainSituationName).id;

  @override
  String toString() => "_OtherActorActionBase<$commandTemplate>";
}

/// The [action] to use and the [object] to use it on. The _performing_
/// of an action.
///
/// For example, an attack action like `Punch` could take an enemy actor
/// as the object. Therefore, assuming there are two different enemies
/// available for punching, the planner would create two instances
/// of `Performance`, one for each enemy.
class Performance<T> {
  /// The action to be performed on the [object]. For example, punch (if
  /// the object is an enemy actor) or take (if the object is an item).
  final Action<T> action;

  /// The object the [action] is performed on.
  final T object;

  /// The chance that the action will
  final num successChance;

  /// Creates a performance object.
  const Performance(this.action, this.object, this.successChance);

  String get command => action.getCommand(object);

  List<String> get commandPath => action.getCommandPath(object);
}

/// This class encapsulates a singular reason why an action might have
/// succeeded or failed.
///
/// For example, when actor successfully slashes an opponent, the reasons
/// might include:
///
/// * actor was faster than the target
/// * actor was better trained in sword-fighting than the target
/// * the target was paralyzed and couldn't move
/// * the target was out of balance
@immutable
class Reason<T> {
  /// The data for the reason. It can be merely a number, or an [enum] instance,
  /// or it can be a full-blown object.
  final T payload;

  /// The relative weight of this reason.
  ///
  /// For example, for a failure to dodge, paralysis will have
  /// a much higher weight than clumsiness. When you're paralyzed, it's obvious
  /// you won't be able to dodge properly.
  final num weight;

  const Reason(this.payload, this.weight);
}

/// This is what [Action.getSuccessChance] returns. It's injected into
/// [ActionContext].
@immutable
class ReasonedSuccessChance<R> {
  /// Sure failure without any reason given.
  static const ReasonedSuccessChance<Object> sureFailure =
      ReasonedSuccessChance<Object>(0.0);

  /// Sure success without any reason given.
  static const ReasonedSuccessChance<Object> sureSuccess =
      ReasonedSuccessChance<Object>(1.0);

  /// The probability of success, as a number between `0.0` and `1.0`.
  final num value;

  /// List of possible reasons for success.
  final List<Reason<R>> successReasons;

  /// List of possible reasons for failure.
  final List<Reason<R>> failureReasons;

  const ReasonedSuccessChance(this.value,
      {List<Reason<R>> successReasons, List<Reason<R>> failureReasons})
      : successReasons = successReasons ?? const <Reason<Null>>[],
        failureReasons = failureReasons ?? const <Reason<Null>>[];

  /// Creates an inversion of this [ReasonedSuccessChance].
  ///
  /// For example, if the success chance of actor A pushing actor B
  /// to the ground is X, then the success chance of actor B withstanding
  /// the push from actor A is the inverse of X.
  ///
  /// This not only inverts [value], but also switches [successReasons]
  /// with [failureReasons].
  ///
  /// TODO: test this
  ReasonedSuccessChance<R> inverted() => ReasonedSuccessChance(1 - value,
      successReasons: failureReasons, failureReasons: successReasons);

  @override
  String toString() => "ReasonedSuccessChance(${(value * 100).round()}%)";
}

/// This enum defines all the different resources (Stats) that player can use
/// to reroll action throws.
///
/// Ideas: weaponGrip (throw sword), shield (let the shield break).
enum Resource {
  /// Using stamina means exerting extra physical energy. Useful for power
  /// moves, running away unscathed, etc.
  stamina,

  /// Some moves can be rerolled by 'spending' balance. A kick will land,
  /// but the player will go off-balance or even fall down.
  balance,
}
