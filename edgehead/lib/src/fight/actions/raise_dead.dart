import 'package:edgehead/egamebook/elements/stat_update_element.dart';
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
  List<String> get commandPathTemplate => ["Skills", "necromancy"];

  @override
  String get helpMessage => "Raising the dead will make them fight for me. "
      "I do not know in advance which corpse will rise. "
      "I cannot do this if I am already followed by an undead. "
      "My powers are not strong enough to hold two unliving minds. "
      "This action drains sanity.";

  @override
  bool get isAggressive => false;

  @override
  bool get isImplicit => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource =>
      throw StateError('This action does not reroll');

  @override
  String applyFailure(ActionContext c, void _) {
    final a = c.actor;
    final s = c.outputStoryline;

    a.report(s, "<subject> tr<ies> to perform the necromantic incantation");
    a.report(s, "<subject> fail<s>", but: true);

    if (a.sanity < 1) {
      a.report(s, "<subject's> sanity is already gone");
    } else if (isFollowedByUndeadActor(c, a) || isFollowedByUndeadInsect(c)) {
      a.report(
          s,
          "<subject's> powers are not strong enough "
          "to hold two unliving minds");
      a.report(s, "<subject> already <has> an undead follower");
    } else {
      assert(
          false,
          "Necromancy shouldn't fail for other reasons "
          "than the above. Check if applyFailure and getSuccessChance "
          "are in sync.");
    }

    s.add("nothing happens");

    return "${a.name} failed to raise the dead";
  }

  @override
  String applySuccess(ActionContext c, void _) {
    c.outputStoryline.addCustomElement(StatUpdate.sanity(c.actor.sanity, -1));
    c.outputWorld.updateActorById(c.actor.id, (b) => b.sanity -= 1);
    return raiseDead(c);
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      throw StateError('This action does not reroll');

  @override
  ReasonedSuccessChance getSuccessChance(
      Actor a, Simulation sim, WorldState w, void _) {
    final c = ApplicabilityContext(a, sim, w);
    if (a.sanity < 1 ||
        isFollowedByUndeadActor(c, a) ||
        isFollowedByUndeadInsect(c)) {
      return ReasonedSuccessChance.sureFailure;
    }
    return ReasonedSuccessChance.sureSuccess;
  }

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, void _) =>
      a.isPlayer;
}
