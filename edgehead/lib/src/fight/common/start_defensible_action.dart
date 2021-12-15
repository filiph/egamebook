import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/combat_command_path.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:meta/meta.dart';

/// Function that is called to create the last part of the command path.
typedef CommandPathTailGenerator = String Function(
    ApplicabilityContext context, Actor attacker, Actor defender);

/// Function that is called as part of a [StartDefensibleAction].
///
/// It is called 'partial' because, for example,
/// [StartDefensibleAction.applyStart] is only the first part of the resulting
/// [Action.applySuccess] (_and_ [Action.applyFailure]).
typedef PartialApplyFunction = void Function(
    Actor actor,
    Simulation sim,
    WorldStateBuilder world,
    Storyline storyline,
    Actor enemy,
    Situation mainSituation);

typedef SuccessChanceGetter = ReasonedSuccessChance Function(
    Actor a, Simulation sim, WorldState w, Actor enemy);

typedef _DefenseSituationBuilder = DefenseSituation Function(
    Actor actor,
    Simulation sim,
    WorldStateBuilder world,
    Actor enemy,
    Predetermination predetermination);

typedef _SituationBuilder = Situation Function(
    Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy);

/// This is a utility class that makes it easier to build actions that put
/// 2 situations on the stack at once: one is the attack, and on top of it
/// is the defense situation.
///
/// This class is a concrete implementation of [StartDefensibleActionBase].
/// You can instantiate this class with something like:
///
/// ```dart
/// StartDefensibleAction(
///   name: "StartPunch",
///   commandTemplate: "punch <object>",
///   commandPathTemplate: const ["attack <object>", "stance", "punch"],
///   isApplicable: (a, sim, w, enemy) =>
///       (a.pose >= Pose.offBalance) && !enemy.isOnGround && a.isBarehanded,
///   // ...
/// )
/// ```
///
/// Look at `start_*.dart` actions for concrete examples of how to use
/// this class.
///
/// For anything fancier, use [StartDefensibleActionBase] directly.
class StartDefensibleAction extends StartDefensibleActionBase {
  final PartialApplyFunction _applyStart;

  final PartialApplyFunction? _applyShortCircuit;

  final _SituationBuilder _mainSituationBuilder;

  final _DefenseSituationBuilder _defenseSituationBuilder;

  final SuccessChanceGetter _successChanceGetter;

  @override
  final String helpMessage;

  @override
  final bool isAggressive = true;

  /// This is used as the usual [Action.isApplicable].
  final OtherActorApplicabilityFunction _isApplicable;

  @override
  final bool isProactive;

  @override
  final bool rerollable;

  @override
  final Resource? rerollResource;

  @override
  final String? rollReasonTemplate;

  @override
  final String name;

  final String? commandPathTail;

  final CommandPathTailGenerator? commandPathTailGenerator;

  @override
  final CombatCommandType combatCommandType;

  /// Creates a defensible action with the provided callbacks.
  ///
  /// The [successChanceGetter] callback is only applied to the player.
  /// The NPC/enemy's success is given by the defense. In other words,
  /// the _start_ of a slash is a given, what's contested is if the target
  /// is able to avoid the slash. The special case for the player is there
  /// because we want the player-initiated action to create a "roll of dice"
  /// of some kind.
  StartDefensibleAction({
    required this.name,
    required this.combatCommandType,
    required this.helpMessage,
    required OtherActorApplicabilityFunction isApplicable,
    required PartialApplyFunction applyStart,
    required _SituationBuilder mainSituationBuilder,
    required _DefenseSituationBuilder defenseSituationBuilder,
    required SuccessChanceGetter successChanceGetter,
    required this.rerollable,
    this.commandPathTail,
    this.commandPathTailGenerator,
    this.rerollResource,
    this.rollReasonTemplate,
    PartialApplyFunction? applyShortCircuit,
    this.isProactive = true,
  })  : _applyStart = applyStart,
        _mainSituationBuilder = mainSituationBuilder,
        _defenseSituationBuilder = defenseSituationBuilder,
        _successChanceGetter = successChanceGetter,
        _isApplicable = isApplicable,
        _applyShortCircuit = applyShortCircuit,
        assert(!rerollable || rerollResource != null),
        assert(!rerollable || rollReasonTemplate != null),
        assert(commandPathTail != null || commandPathTailGenerator != null);

  @override
  bool get shouldShortCircuitWhenFailed => _applyShortCircuit != null;

  @override
  void applyShortCircuit(Actor actor, Simulation sim, WorldStateBuilder world,
          Storyline storyline, Actor enemy, Situation mainSituation) =>
      _applyShortCircuit!(actor, sim, world, storyline, enemy, mainSituation);

  @override
  void applyStart(Actor actor, Simulation sim, WorldStateBuilder world,
          Storyline storyline, Actor enemy, Situation mainSituation) =>
      _applyStart(actor, sim, world, storyline, enemy, mainSituation);

  @override
  DefenseSituation defenseSituationBuilder(
          Actor actor,
          Simulation sim,
          WorldStateBuilder world,
          Actor enemy,
          Predetermination predetermination) =>
      _defenseSituationBuilder(actor, sim, world, enemy, predetermination);

  @override
  String getCommandPathTail(ApplicabilityContext context, Actor object) {
    if (commandPathTailGenerator != null) {
      assert(
          commandPathTail == null,
          "Supply either commandPathTailGenerator or commandPathTail, "
          "not both.");
      return commandPathTailGenerator!(context, context.actor, object);
    }
    assert(commandPathTail != null);
    return commandPathTail!;
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor enemy) =>
      _isApplicable(a, sim, w, enemy);

  @override
  Situation mainSituationBuilder(
          Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy) =>
      _mainSituationBuilder(actor, sim, world, enemy);

  @override
  ReasonedSuccessChance successChanceGetter(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      _successChanceGetter(a, sim, w, enemy);
}

/// This is a utility class that makes it easier to build actions that put
/// 2 situations on the stack at once: one is the attack, and on top of it
/// is the defense situation.
///
/// For example, when orc wants to slash Aren, a "SlashSituation" is added,
/// and then on top of it a "SlashDefenseSituation" is added. First, the
/// top-most situation is resolved (will Aren successfully parry or dodge
/// the attack?) and then either the "SlashSituation" is completely skipped
/// (popped by "SlashDefenseSituation") or it is run to completion (orc
/// slashes Aren).
///
/// [StartDefensibleAction] is a subclass that extends this class and can
/// be immediately instantiated. In contrast, this class is abstract.
abstract class StartDefensibleActionBase extends EnemyTargetAction
    with CombatCommandPath {
  @override
  bool get isAggressive => true;

  @override
  bool get isProactive => true;

  @protected
  bool get shouldShortCircuitWhenFailed;

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    final mainSituation = mainSituationBuilder(a, sim, w, enemy);

    if (shouldShortCircuitWhenFailed) {
      // Short-circuit the whole logic. Actor failed to even start to execute
      // the action.
      applyShortCircuit(a, sim, w, s, enemy, mainSituation);
      return "${a.name} fails to even start $name (DefensibleAction) "
          "directed at ${enemy.name}";
    }

    // If this action is performed by the player and it failed, then
    // we need to make sure that the defense situation (performed by the enemy)
    // succeeds.
    final predetermination =
        a.isPlayer ? Predetermination.successGuaranteed : Predetermination.none;
    final defenseSituation =
        defenseSituationBuilder(a, sim, w, enemy, predetermination);
    applyStart(a, sim, w, s, enemy, mainSituation);
    w.pushSituation(mainSituation);
    w.pushSituation(defenseSituation);
    return "${a.name} fails at $name (DefensibleAction) "
        "directed at ${enemy.name}";
  }

  /// This function should use [storyline] to report that the defensible action
  /// couldn't even start. It can modify [world].
  ///
  /// For example, "Orc tries to swing at you but completely misses." In this
  /// scenario, there is no need to create the defensible situation, since
  /// there is no action to defend from. It failed too hard. Therefore,
  /// the action short-circuits.
  ///
  /// When this function is non-null, and the action fails, [applyStart] won't
  /// be called. Nor will the action generate any situations (using
  /// [mainSituationBuilder] and [defenseSituationBuilder].
  @protected
  void applyShortCircuit(Actor actor, Simulation sim, WorldStateBuilder world,
      Storyline storyline, Actor enemy, Situation mainSituation);

  /// This function should use [storyline] to report the start of the action.
  /// It can modify [world].
  ///
  /// This defines what happens before the [enemy] has a chance to react.
  ///
  /// For example, "Orc swings his scimitar at you."
  ///
  /// When the action fails and [applyShortCircuit] is non-null, then that
  /// function will be called instead (and no situation will be created).
  @protected
  void applyStart(Actor actor, Simulation sim, WorldStateBuilder world,
      Storyline storyline, Actor enemy, Situation mainSituation);

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    final mainSituation = mainSituationBuilder(a, sim, w, enemy);
    // If this action is performed by the player and it succeeded, then
    // we need to make sure that the defense situation (performed by the enemy)
    // fails.
    final predetermination =
        a.isPlayer ? Predetermination.failureGuaranteed : Predetermination.none;
    final defenseSituation =
        defenseSituationBuilder(a, sim, w, enemy, predetermination);
    applyStart(a, sim, w, s, enemy, mainSituation);
    w.pushSituation(mainSituation);
    w.pushSituation(defenseSituation);
    return "${a.name} starts a $name (defensible situation) at ${enemy.name}";
  }

  /// This should build the defense situation (Aren is trying to deflect
  /// the orc's swing).
  @protected
  DefenseSituation defenseSituationBuilder(Actor actor, Simulation sim,
      WorldStateBuilder world, Actor enemy, Predetermination predetermination);

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor enemy) {
    if (a.isPlayer) {
      return successChanceGetter(a, sim, w, enemy);
    }
    return ReasonedSuccessChance.sureSuccess;
  }

  /// This should build the main situation (the orc slashing Aren).
  ///
  /// Normally, this is just one call of the constructor, such as
  /// `new SomeSituation(actor, enemy)`.
  @protected
  Situation mainSituationBuilder(
      Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy);

  /// This is the chance of successfully _finishing_ this move.
  ///
  /// [successChanceGetter] is used only for the player (when [Actor.isPlayer]
  /// is `true`). The [DefenseSituation] will be created with the
  /// corresponding [Predetermination].
  ///
  /// Non-players will always succeed with starting the move. The final outcome
  /// is decided in the defensive situation.
  @protected
  ReasonedSuccessChance successChanceGetter(
      Actor a, Simulation sim, WorldState w, Actor enemy);
}
