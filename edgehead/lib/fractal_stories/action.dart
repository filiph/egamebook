import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/action_history.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/plan_consequence.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/time/actor_turn.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:meta/meta.dart';

/// A typedef for [Action]'s apply functions: both [Action.applySuccess] and
/// [Action.applyFailure].
typedef ApplyFunction<T> = String Function(ActionContext context, T object);

/// A convenience typedef for actions whose applicability depends on another
/// [Actor] as [target].
///
/// This is useful for [OtherActorAction].
typedef OtherActorApplicabilityFunction = bool Function(
    Actor a, Simulation sim, WorldState w, Actor target);

/// An action. Will be performed by an [Actor] and will change [WorldState]
/// using [applyFailure] or [applySuccess].
///
/// The generic argument [T] refers to the _object_ of the function.
/// For example, an attack action would have another [Actor] as an object.
/// Therefore, [applyFailure] and [applySuccess] would be called with
/// an [Actor] object as the second parameter.
@immutable
abstract class Action<T> {
  static const Duration defaultRecoveryDuration = Duration(seconds: 1);

  static const Duration defaultPlayerRecoveryDuration =
      Duration(milliseconds: 750);

  /// Allow [Action] subclasses to have `const` constructors.
  const Action();

  /// [OtherActorActionBase] should include the [target] in the result of
  /// [getCommand]. To make it easier to implement, this class will
  /// automatically construct the name given a [Storyline] template.
  ///
  /// For example, `["attack <object>", "kill", "decapitate"]` is a valid
  /// template that might realize to a sequence of actions such as
  /// "Attack the orc >> Kill >> Decapitate".
  ///
  /// For actions that are [isImplicit], this should return `const []` (an
  /// empty list). For actions that override [getCommandPath()], this should
  /// throw.
  List<String> get commandPathTemplate;

  /// Optional message to be shown when player presses a help button
  /// next to the action. The message should explain what the action does
  /// and, if appropriate, why and when it should be used.
  String? get helpMessage;

  /// Whether or not this action is aggressive towards its sufferer. Combat
  /// moves are aggressive, healing moves aren't.
  ///
  /// This describes intent, not result. A failed attempt to kill someone is
  /// aggressive although it doesn't harm the intended target.
  bool get isAggressive;

  /// This action can only be taken by the [WorldState.director].
  bool get isDirectorAction => false;

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
  Resource? get rerollResource;

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
  /// as `Action<Nothing?>`.
  Iterable<T> generateObjects(ApplicabilityContext context) {
    throw UnimplementedError('generateObjects not implemented for $this. '
        'If this is an Action<Nothing?>, then this method shouldn\'t have been '
        'called in the first place.');
  }

  /// Some actions can provide additional data for a given [context] and
  /// [object]. This data can be used by the presenter.
  ///
  /// For example, a travel action can provide a path from the current
  /// position ([context]) to the destination ([object]). The presenter
  /// can then draw the path on a map.
  List<int> getAdditionalData(ApplicabilityContext context, T object) {
    // By default, there is no additional data.
    return const [];
  }

  /// Some actions can provide additional strings for a given [context] and
  /// [object]. This data can be used by the presenter.
  ///
  /// For example, a travel action can provide a context-sensitive hint
  /// (a description of the destination room).
  Map<String, String> getAdditionalStrings(
      ApplicabilityContext context, T object) {
    // By default, there are no additional strings.
    return const {};
  }

  /// The path of sub-commands to be used for the action menu.
  ///
  /// For example, an actions such as "kick <subject> to ground" could have
  /// a [getCommandPath] of `[attack <subject>, stance, kick in chest]`. The
  /// [getCommandPath] is what the player chooses, the [getCommand()] is
  /// what is shown afterwards.
  List<String> getCommandPath(ApplicabilityContext context, T object) {
    if (isImplicit) {
      return const [];
    }

    assert(
        commandPathTemplate.isNotEmpty,
        "Actions with empty commandPathTemplate must override getCommandPath "
        "or must be isImplicit. Culprit: $this.");

    if (object is Entity) {
      final templateContainsObject = commandPathTemplate
          .any((part) => part.contains(Storyline.OBJECT_NOT_OBJECT2_REGEXP));
      // Realize the template, optionally with "<object>".
      return (Storyline(
              referredEntities:
                  context.world.actors.where((actor) => !actor.isDirector))
            ..add(commandPathTemplate.join(' >> '),
                object: templateContainsObject ? object : null))
          .realizeAsString()
          // Then split again into a list.
          .split(' >> ');
    } else {
      assert(
          !commandPathTemplate
              .any((string) => string.contains(RegExp(r'<[\w]+>'))),
          "Action is of type Action<$T> yet it expects Storyline to work.");
      return commandPathTemplate;
    }
  }

  /// This is the sentence that gets printed _after_ the player selects
  /// the choice.
  ///
  /// For example, a choice with a [commandPathTemplate] of
  /// `['<object>', 'body', 'slash arm']`, a command sentence might be something
  /// like `"I try to slash the goblin's arm."`.
  ///
  /// By default, this method just takes the last part of the command path.
  /// This makes sense for things like "Door >> open". But for
  /// other things, like "Open >> door", this will not result in good
  /// sentences. In that case, override this.
  String getCommandSentence(ApplicabilityContext context, T object) {
    if (isImplicit) {
      return '';
    }

    return getCommandPath(context, object).last;
  }

  /// Returns the help message given [context] and [object].
  ///
  /// Generally, actions don't need to override this method, because a single
  /// help message (provided by [helpMessage]) is enough. But some actions
  /// might change the help message according to context or the nature
  /// of [object].
  String? getHelpMessage(ApplicabilityContext context, T object) {
    return helpMessage;
  }

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
  /// This defaults and 750ms ([defaultPlayerRecoveryDuration]) for the player,
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
  String? getRollReason(Actor a, Simulation sim, WorldState w, T object);

  /// Success chance of the action given the actor and the state of the world.
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, T object);

  /// Returns whether or not the action is applicable given the current
  /// state of the world.
  ///
  /// The parameters [a], [sim] and [w] are redundant since they are already
  /// included in [c]. But they allow for a much easier access when writing
  /// the actual actions (instead of `c.actor` we can just write `a`).
  bool isApplicable(
      ApplicabilityContext c, Actor a, Simulation sim, WorldState w, T object);
}

/// This [Action] requires an [enemy].
///
/// Every [EnemyTargetAction] should contain a static builder like this:
///
///     static EnemyTargetAction builder(Actor enemy) => new Kick(enemy);
abstract class EnemyTargetAction extends OtherActorActionBase {
  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    var actors = context.world.currentSituation!
        .getActors(context.simulation, context.world);
    return actors.where((other) {
      if (other == context.actor || !other.isAnimatedAndActive) return false;
      // Currently, we are only generating enemy-target actions for actors
      // towards which the actor feels hate.
      return context.actor.hates(other, context.world, context.simulation);
    });
  }

  @override
  String toString() => "EnemyTargetAction<$commandPathTemplate>";
}

/// This is a class you can use as a type argument for [Action].
///
/// An `Action<Nothing?>` is an action that does not need an object to be
/// performed.
///
/// TODO: annotate with @sealed once it's in flutter-compatible package:meta
@sealed
class Nothing {
  /// Removes the default constructor of [Nothing], making it impossible
  /// to ever instantiate. This is what we want, because [Nothing] is
  /// the type expression of, literally, nothing.
  Nothing._();
}

/// This [Action] requires an [item] from the ground.
abstract class OnGroundItemAction extends Action<Item> {
  @override
  final bool isImplicit = false;

  /// See [getCommandPath].
  @override
  @nonVirtual
  List<String> get commandPathTemplate =>
      throw StateError('This action overrides getCommandPath');

  String get verb;

  @override
  Iterable<Item> generateObjects(ApplicabilityContext context) {
    final situation = context.world.currentSituation! as FightSituation;
    return situation.droppedItems;
  }

  /// Because some items might not have an adjective, we need to have extra
  /// logic in getCommandPath, and therefore cannot use the vanilla
  /// [commandPathTemplate] (which is a simple getter).
  @override
  List<String> getCommandPath(ApplicabilityContext context, Item object) {
    final commandPathTemplate = [
      object.adjective != null ? "<objectNounWithAdjective>" : "<objectNoun>",
      verb,
    ];

    // This is a computation in [super.getCommandPath()] but here we know
    // the template contains `<object.*>`
    const templateContainsObject = true;

    // Realize the template, optionally with "<object>".
    return (Storyline(
            referredEntities:
                context.world.actors.where((actor) => !actor.isDirector))
          ..add(commandPathTemplate.join(' >> '),
              // ignore: dead_code
              object: templateContainsObject ? object : null))
        .realizeAsString()
        // Then split again into a list.
        .split(' >> ');
  }

  @override
  String toString() => "ItemAction<$commandPathTemplate>";
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
    var actors = context.world.currentSituation!
        .getActors(context.simulation, context.world);
    return actors.where((other) {
      return other != context.actor && other.isAnimatedAndActive;
    });
  }

  @override
  String toString() => "OtherActorAction<$commandPathTemplate>";
}

/// A base class for [OtherActorAction] and [EnemyTargetAction].
///
/// [OtherActorAction] cannot be a direct superclass of [EnemyTargetAction]
/// because then our `if (builder is EnemyTargetActionBuilder)` logic
/// would have false positives (at least in Dart 1).
abstract class OtherActorActionBase extends Action<Actor> {
  /// By default, [OtherActorActionBase] is not implicit. But it can be.
  @override
  bool get isImplicit => false;

  /// [OtherActorActionBase] might want to mention the [target] in the output
  /// of [getRollReason]. To make this easier to implement, this class will
  /// automatically construct the roll reason given a [Storyline] template.
  ///
  /// For example "will <subject> hit <objectPronoun>?" is a valid roll reason
  /// template that might realize into something like "Will you hit him?"
  String? get rollReasonTemplate;

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Actor target) {
    if (rollReasonTemplate == null) {
      throw UnimplementedError("Action<$name> has null roll reason "
          "template. Either fill it with a String, or override"
          "getRollReason here. $this");
    }
    final hasObject =
        rollReasonTemplate!.contains(Storyline.OBJECT_NOT_OBJECT2_REGEXP);
    return (Storyline()
          ..add(rollReasonTemplate!,
              subject: a,
              object: hasObject ? target : null,
              wholeSentence: true))
        .realizeAsString();
  }

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
  String toString() => "OtherActorActionBase<$commandPathTemplate>";
}

/// The [action] to use and the [object] to use it on. The _performing_
/// of an action.
///
/// For example, an attack action like `Punch` could take an enemy actor
/// as the object. Therefore, assuming there are two different enemies
/// available for punching, the planner would create two instances
/// of `Performance`, one for each enemy.
@immutable
class Performance<T> {
  /// The action to be performed on the [object]. For example, punch (if
  /// the object is an enemy actor) or take (if the object is an item).
  final Action<T> action;

  /// The context in which the action is performed.
  final ApplicabilityContext context;

  /// The chance that the action will succeed.
  final ReasonedSuccessChance successChance;

  /// The object the [action] is performed on.
  final T object;

  /// Additional information about the performance that can be visualized
  /// by the presenter.
  ///
  /// For example, a travel action can provide the path that is to be taken
  /// by the actor to get to their destination ([object]) given their
  /// current position ([context]).
  ///
  /// This is taken from [Action.getAdditionalData] and defaults to an empty
  /// list.
  final List<int> additionalData;

  /// Additional information about the performance that can be shown
  /// by the presenter.
  final Map<String, String> additionalStrings;

  /// Creates a performance object.
  const Performance(this.action, this.context, this.object, this.successChance,
      this.additionalData, this.additionalStrings);

  /// The performer of the action.
  Actor get actor => context.actor;

  List<String> get commandPath => action.getCommandPath(context, object);

  String get commandSentence => action.getCommandSentence(context, object);

  /// Applies the performance and returns the possible outcomes as an iterable
  /// of [PlanConsequence].
  ///
  /// The [choiceCount] is the number of choices from which this action
  /// was selected.
  Iterable<PlanConsequence> apply(
      ActorTurn turn,
      int choiceCount,
      PlanConsequence current,
      Simulation sim,
      WorldState world,
      T object) sync* {
    if (successChance.value > 0) {
      final worldOutput = world.toBuilder();
      Storyline storyline = _applyToWorldCopy(
          turn, sim, worldOutput, action.applySuccess, object, successChance,
          isSuccess: true);

      yield PlanConsequence(worldOutput.build(), current, this, storyline,
          successChance.value, choiceCount,
          isSuccess: true);
    }
    if (successChance.value < 1) {
      final worldOutput = world.toBuilder();
      Storyline storyline = _applyToWorldCopy(
          turn, sim, worldOutput, action.applyFailure, object, successChance,
          isFailure: true);

      yield PlanConsequence(worldOutput.build(), current, this, storyline,
          1 - successChance.value, choiceCount,
          isFailure: true);
    }
  }

  @override
  String toString() => 'Performance<${action.name}, $commandSentence>';

  void _addWorldRecord(ActionRecordBuilder builder, WorldStateBuilder world,
      String description) {
    builder.description = description;
    builder.time = world.time;
    world.recordAction(builder.build());
  }

  Storyline _applyToWorldCopy(
      ActorTurn turn,
      Simulation sim,
      WorldStateBuilder output,
      ApplyFunction<T> applyFunction,
      T object,
      ReasonedSuccessChance successChance,
      {bool isSuccess = false,
      bool isFailure = false}) {
    final initialWorld = output.build();
    final builder = _prepareWorldRecord(
        turn.actor!, sim, initialWorld, object, isSuccess, isFailure);
    final situationActors = initialWorld.currentSituation!
        .getActors(sim, initialWorld)
        .where((actor) => !actor.isDirector);
    final outputStoryline = Storyline(referredEntities: situationActors);
    // Remember situation as it can be changed during applySuccess.
    final situationId = initialWorld.currentSituation!.id;
    initialWorld.currentSituation!
        .onBeforeAction(sim, initialWorld, outputStoryline);
    final context = ActionContext(action, turn.actor!, sim, initialWorld,
        output, outputStoryline, successChance);
    final description = applyFunction(context, object);

    // The current situation could have been removed by [applyFunction].
    // If not, let's update its time.
    output.elapseSituationTimeIfExists(situationId);

    // Move world time to when the turn happens.
    output.time = turn.time;

    // Mark actor busy after performing their action.
    if (action.isProactive) {
      final recovery = action.getRecoveryDuration(context, object);
      // First, check whether the action took any time. Some actions, such
      // as initiating an attack, are pro-active, but don't take any time.
      // In order to preserve fighting order, we should not change
      // the attacker's `recoveringUntil`. Thus, we check if recovery
      // is in fact more than zero.
      if (recovery > Duration.zero) {
        // The action was proactive and did take some time. Update the actor's
        // [Actor.recoveringUntil].
        final recoveringUntil = turn.time!.add(recovery);
        output.updateActorById(
            turn.actor!.id, (b) => b.recoveringUntil = recoveringUntil);
      }
    }

    // Perform any [Situation.onAfterAction]s.
    output.build().getSituationById(situationId)?.onAfterAction(context);

    // Remove ended situations: the ones that don't return an actor anymore,
    // and the ones that return shouldContinue(world) != true.
    var builtOutput = output.build();
    while (builtOutput.currentSituation?.getNextTurn(sim, builtOutput) ==
            ActorTurn.never ||
        builtOutput.currentSituation?.shouldContinue(sim, builtOutput) !=
            true) {
      if (builtOutput.currentSituation == null) break;
      output.popSituation(context);
      builtOutput = output.build();
    }

    // Only 'surviving' (non-popped) situations get to run their `onAfterTurn`
    // methods.
    output.currentSituation?.onAfterTurn(context);

    _addWorldRecord(builder, output, description);
    return outputStoryline;
  }

  ActionRecordBuilder _prepareWorldRecord(Actor actor, Simulation sim,
      WorldState world, T object, bool isSuccess, bool isFailure) {
    var builder = ActionRecordBuilder()
      ..actionName = action.name
      ..protagonist = actor.id
      ..wasSuccess = isSuccess
      ..wasFailure = isFailure
      ..wasAggressive = action.isAggressive
      ..wasProactive = action.isProactive;
    if (action is OtherActorActionBase) {
      builder.sufferers.add((object as Actor).id);
    }
    return builder;
  }
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
class Reason<T /*?*/ > {
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
  static const ReasonedSuccessChance<void> sureFailure =
      ReasonedSuccessChance<void>(0.0);

  /// Sure success without any reason given.
  static const ReasonedSuccessChance<void> sureSuccess =
      ReasonedSuccessChance<void>(1.0);

  /// The probability of success, as a number between `0.0` and `1.0`.
  final double value;

  /// List of possible reasons for success.
  final List<Reason<R>> successReasons;

  /// List of possible reasons for failure.
  final List<Reason<R>> failureReasons;

  const ReasonedSuccessChance(this.value,
      {List<Reason<R>>? successReasons, List<Reason<R>>? failureReasons})
      // ignore: prefer_void_to_null
      : successReasons =
            (successReasons ?? const <Reason<Object>>[]) as List<Reason<R>>,
        // ignore: prefer_void_to_null
        failureReasons =
            (failureReasons ?? const <Reason<Object>>[]) as List<Reason<R>>;

  /// Creates an inversion of this [ReasonedSuccessChance].
  ///
  /// For example, if the success chance of actor A pushing actor B
  /// to the ground is X, then the success chance of actor B withstanding
  /// the push from actor A is the inverse of X.
  ///
  /// This not only inverts [value], but also switches [successReasons]
  /// with [failureReasons].
  ReasonedSuccessChance<R> inverted() => ReasonedSuccessChance(1 - value,
      successReasons: failureReasons, failureReasons: successReasons);

  @override
  String toString() => "ReasonedSuccessChance(${(value * 100).round()}%)";
}

/// This enum defines all the different resources (Stats) that player can use
/// to reroll action throws.
///
/// Ideas: weaponGrip (throw sword), shield (let the shield break),
/// balance (go off balance after move).
enum Resource {
  /// Moves that are intellectual or pertain to necromancy can be rerolled
  /// with sanity.
  sanity,

  /// Using stamina means exerting extra physical energy. Useful for power
  /// moves, running away unscathed, etc.
  stamina,
}
