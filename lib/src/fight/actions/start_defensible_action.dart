import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';

typedef ReasonedSuccessChance SuccessChanceGetter(
    Actor a, Simulation sim, WorldState w, Actor enemy);

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
/// Look at `start_slash.dart` for an example of how to use this class.
class StartDefensibleAction extends EnemyTargetAction {
  /// This function should use [storyline] to report the start of the action.
  /// It can modify [world].
  ///
  /// For example, "Orc swings his scimitar at you."
  final _PartialApplyFunction _applyStartOfSuccess;

  /// Provide this to get another success chance than the default `1.0`.
  final SuccessChanceGetter _successChanceGetter;

  /// This function should use [storyline] to report that the defensible action
  /// couldn't even start. It can modify [world].
  ///
  /// For example, "Orc tries to swing at you but completely misses."
  final _PartialApplyFunction _applyStartOfFailure;

  /// This is used as the usual [Action.isApplicable].
  final OtherActorApplicabilityFunction _isApplicableFunction;

  /// This should build the main situation (the orc slashing Aren).
  ///
  /// Normally, this is just one call of the constructor, such as
  /// `new SomeSituation(actor, enemy)`.
  final _SituationBuilder _mainSituationBuilder;

  /// This should build the defense situation (Aren is trying to deflect
  /// the orc's swing).
  final _SituationBuilder _defenseSituationBuilder;

  /// This should build the defense situation (Aren is trying to deflect
  /// the orc's swing) when action ended up with failure.
  ///
  /// It will probably be similar to the one that's used when the situation
  /// succeeds, but will have predetermined success. Because if this (attack)
  /// action fails, it means that the defense action should succeed.
  final _SituationBuilder _defenseSituationBuilderWhenFailed;

  /// Whether failure of this action is deferred to later (by building
  /// a defense situation that will succeed in defending against this action)
  /// or if it fails immediately.
  ///
  /// When set to `true`, and when the action fails, then
  /// [_defenseSituationBuilderWhenFailed] will be used.
  ///
  /// If it's set to `false`, then no defense situation will be created.
  /// Only [_applyStartOfFailure] will fire. This is useful for actions that,
  /// when failed, totally miss. For example, we can have a out-of-balance
  /// slash that will not even threaten the target if it fails.
  ///
  /// Default is `true`.
  final bool buildSituationsOnFailure;

  @override
  final String helpMessage;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final String name;

  @override
  final bool rerollable;

  @override
  final Resource rerollResource;

  @override
  final String commandTemplate;

  @override
  final String rollReasonTemplate;

  StartDefensibleAction(
      this.name,
      this.commandTemplate,
      this.helpMessage,
      this._applyStartOfSuccess,
      this._isApplicableFunction,
      this._mainSituationBuilder,
      this._defenseSituationBuilder,
      Actor enemy,
      {SuccessChanceGetter successChanceGetter,
      this.buildSituationsOnFailure: true,
      _SituationBuilder defenseSituationWhenFailed,
      _PartialApplyFunction applyStartOfFailure,
      this.rerollable: false,
      this.rerollResource,
      this.rollReasonTemplate})
      : _successChanceGetter = successChanceGetter,
        _applyStartOfFailure = applyStartOfFailure,
        _defenseSituationBuilderWhenFailed = defenseSituationWhenFailed,
        super(enemy) {
    assert(!rerollable || rerollResource != null);
    assert(!rerollable || rollReasonTemplate != null);
    assert(successChanceGetter == null || applyStartOfFailure != null);
    assert(successChanceGetter == null ||
        buildSituationsOnFailure == false ||
        defenseSituationWhenFailed != null);
  }

  @override
  String applyFailure(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    assert(_successChanceGetter != null);
    if (buildSituationsOnFailure) {
      var mainSituation = _mainSituationBuilder(a, sim, w, enemy);
      var defenseSituation =
          _defenseSituationBuilderWhenFailed(a, sim, w, enemy);
      _applyStartOfFailure(a, sim, w, s, enemy, mainSituation);
      w.pushSituation(mainSituation);
      w.pushSituation(defenseSituation);
    } else {
      _applyStartOfFailure(a, sim, w, s, enemy, null);
    }
    return "${a.name} fails to start a $name (defensible situation) "
        "at ${enemy.name}";
  }

  @override
  String applySuccess(ActionContext context) {
    Actor a = context.actor;
    Simulation sim = context.simulation;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    var mainSituation = _mainSituationBuilder(a, sim, w, enemy);
    var defenseSituation = _defenseSituationBuilder(a, sim, w, enemy);
    _applyStartOfSuccess(a, sim, w, s, enemy, mainSituation);
    w.pushSituation(mainSituation);
    w.pushSituation(defenseSituation);
    return "${a.name} starts a $name (defensible situation) at ${enemy.name}";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w) {
    if (_successChanceGetter != null) {
      return _successChanceGetter(a, sim, w, enemy);
    }
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w) =>
      _isApplicableFunction(a, sim, w, enemy);
}
