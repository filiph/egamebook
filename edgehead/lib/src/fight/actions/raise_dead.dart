import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/necromancy.dart';

class RaiseDead extends Action<Nothing> {
  static final RaiseDead singleton = RaiseDead();

  static const String className = "RaiseDead";

  @override
  List<String> get commandPathTemplate => ["skills", "necromancy"];

  @override
  String get helpMessage => "Raising the dead will make them fight for me. "
      "I do not know in advance which corpse will rise. "
      "I cannot do this if I am already followed by an undead. "
      "My powers are not strong enough to hold two unliving minds.";

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.sanity;

  @override
  String applyFailure(ActionContext context, void _) {
    final a = context.actor;
    final s = context.outputStoryline;

    a.report(s, "<subject> perform<s> the necromantic incantation");
    a.report(s, "<subject> fail<s>", but: true);

    s.add("nothing happens");

    return "${a.name} failed to raise the dead";
  }

  @override
  String applySuccess(ActionContext context, void _) {
    return raiseDead(context);
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "Will I raise anything?";

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    final c = ApplicabilityContext(a, sim, w);
    if (isFollowedByAnUndead(c, a)) {
      return ReasonedSuccessChance.sureFailure;
    }
    return const ReasonedSuccessChance<void>(0.6);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, void _) =>
      a.isPlayer;
}
