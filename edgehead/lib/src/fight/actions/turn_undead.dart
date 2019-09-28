import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/necromancy.dart';
import 'package:edgehead/src/fight/fight_situation.dart';

class TurnUndead extends OtherActorActionBase {
  static final TurnUndead singleton = TurnUndead();

  static const String className = "TurnUndead";

  @override
  List<String> get commandPathTemplate => ["<object's> copse", "turn undead"];

  @override
  String get helpMessage =>
      "Turning corpses undead will make them fight for you.";

  @override
  bool get isAggressive => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => true;

  @override
  Resource get rerollResource => Resource.stamina;

  @override
  String get rollReasonTemplate => "will <subject> turn <object> undead";

  @override
  String applyFailure(ActionContext context, Actor corpse) {
    final a = context.actor;
    final s = context.outputStoryline;
    a.report(s, "<subject> tr<ies> to raise <object> from the dead",
        object: corpse);
    a.report(s, "<subject> fail<s>", but: true);
    s.add("nothing happens");

    return "${a.name} failed to turn ${corpse.name} undead";
  }

  @override
  String applySuccess(ActionContext context, Actor corpse) {
    final a = context.actor;
    final s = context.outputStoryline;
    final w = context.outputWorld;
    final situation = context.world.currentSituation as FightSituation;

    final preposition =
        a.anatomy.isBlind ? "in the general direction of" : "over";

    a.report(s, "<subject> raise<s> <subject's> hands $preposition <object>",
        object: corpse);
    corpse.report(s, "<subject> open<s> <subject's> eyes");
    if (!corpse.anatomy.hasCrippledLegs) {
      corpse.report(s, "<subject> stand<s> up");
    }

    w.recordCustom(CustomEvent.actorTurningUndead, actor: corpse);

    final raisedCorpse = turnUndead(a, corpse);
    w.updateActorById(corpse.id, (b) => b.replace(raisedCorpse));

    // Place actor in the correct team.
    w.replaceSituationById<FightSituation>(situation.id, situation.rebuild((b) {
      if (a.isPlayer) {
        b.playerTeamIds.add(corpse.id);
        b.enemyTeamIds.remove(corpse.id);
      } else {
        b.enemyTeamIds.add(corpse.id);
        b.playerTeamIds.remove(corpse.id);
      }
    }));

    return "${a.name} turned ${corpse.name} undead";
  }

  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    final w = context.world;
    final situation = context.world.currentSituation as FightSituation;

    final corpses = w.actors.where((Actor actor) =>
        actor.isActive &&
        !actor.isAnimated &&
        (situation.playerTeamIds.contains(actor.id) ||
            situation.enemyTeamIds.contains(actor.id)));

    return corpses;
  }

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, Actor object) {
    return const ReasonedSuccessChance<void>(0.8);
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor object) =>
      a.isPlayer && !isFollowedByAnUndead(c, a);
}
