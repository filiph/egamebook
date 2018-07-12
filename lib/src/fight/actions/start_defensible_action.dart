import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/defense_situation.dart';
import 'package:edgehead/src/predetermined_result.dart';
import 'package:meta/meta.dart';

typedef ReasonedSuccessChance SuccessChanceGetter(
    Actor a, Simulation sim, WorldState w, Actor enemy);

typedef DefenseSituation _DefenseSituationBuilder(Actor actor, Simulation sim,
    WorldStateBuilder world, Actor enemy, Predetermination predetermination);

typedef void _PartialApplyFunction(
    Actor actor,
    Simulation sim,
    WorldStateBuilder world,
    Storyline storyline,
    Actor enemy,
    Situation mainSituation);

typedef Situation _SituationBuilder(
    Actor actor, Simulation sim, WorldStateBuilder world, Actor enemy);

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
/// Look at `start_slash_from_direction.dart` for an example of how to use this class.
class StartDefensibleAction extends EnemyTargetAction {
  /// This function should use [storyline] to report the start of the action.
  /// It can modify [world].
  ///
  /// This defines what happens before the [enemy] has a chance to react.
  ///
  /// For example, "Orc swings his scimitar at you."
  ///
  /// When the action fails and [applyWhenFailed] is non-null, then that
  /// function will be called instead (and no situation will be created).
  final _PartialApplyFunction applyStart;

  /// This function should use [storyline] to report that the defensible action
  /// couldn't even start. It can modify [world].
  ///
  /// For example, "Orc tries to swing at you but completely misses."
  ///
  /// When this function is non-null, and the action fails, [applyStart] won't
  /// be called. Nor will the action generate any situations (using
  /// [mainSituationBuilder] and [defenseSituationBuilder].
  final _PartialApplyFunction applyWhenFailed;

  /// This should build the main situation (the orc slashing Aren).
  ///
  /// Normally, this is just one call of the constructor, such as
  /// `new SomeSituation(actor, enemy)`.
  final _SituationBuilder mainSituationBuilder;

  /// This should build the defense situation (Aren is trying to deflect
  /// the orc's swing).
  final _DefenseSituationBuilder defenseSituationBuilder;

  /// This is the chance of successfully _finishing_ this move.
  ///
  /// [successChanceGetter] is used only for the player (when [Actor.isPlayer]
  /// is `true`). The [DefenseSituation] will be created with the
  /// corresponding [Predetermination].
  ///
  /// Non-players will always succeed with starting the move. The final outcome
  /// is decided in the defensive situation.
  final SuccessChanceGetter successChanceGetter;

  @override
  final String helpMessage;

  @override
  final bool isAggressive = true;

  /// This is used as the usual [Action.isApplicable].
  final OtherActorApplicabilityFunction _isApplicable;

  @override
  final bool isProactive = true;

  @override
  final bool rerollable;

  @override
  final Resource rerollResource;

  @override
  final String commandTemplate;

  @override
  final String rollReasonTemplate;

  @override
  final String name;

  StartDefensibleAction(
    Actor enemy, {
    @required this.name,
    @required this.commandTemplate,
    @required this.helpMessage,
    @required OtherActorApplicabilityFunction isApplicable,
    @required this.applyStart,
    @required this.mainSituationBuilder,
    @required this.defenseSituationBuilder,
    @required this.successChanceGetter,
    @required this.rerollable,
    this.rerollResource,
    this.rollReasonTemplate,
    this.applyWhenFailed,
  })
      : _isApplicable = isApplicable,
        super(enemy) {
    assert(!rerollable || rerollResource != null);
    assert(!rerollable || rollReasonTemplate != null);
  }

  @override
  String applyFailure(ActionContext context) {
    assert(successChanceGetter != null);
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;

    if (applyWhenFailed != null) {
      // Short-circuit the whole logic. Actor failed to even start to execute
      // the action.
      applyWhenFailed(a, sim, w, s, enemy, null);
      return "${a.name} fails to even start $name (DefensibleAction) "
          "directed at ${enemy.name}";
    }

    final mainSituation = mainSituationBuilder(a, sim, w, enemy);
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

  @override
  String applySuccess(ActionContext context) {
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

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w) {
    if (a.isPlayer) {
      return successChanceGetter(a, sim, w, enemy);
    }
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      _isApplicable(a, sim, w, enemy);
}
