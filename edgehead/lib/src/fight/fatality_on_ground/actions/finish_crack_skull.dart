import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';

class FinishCrackSkull extends OtherActorAction {
  static final FinishCrackSkull singleton = FinishCrackSkull();

  static const String className = "FinishCrackSkull";

  @override
  final String helpMessage = null;

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = false;

  @override
  final bool isImplicit = true;

  @override
  final bool rerollable = true;

  @override
  final Resource rerollResource = Resource.stamina;

  @override
  List<String> get commandPathTemplate => const [];

  @override
  String get name => className;

  @override
  String get rollReasonTemplate => "(WARNING should not be user-visible)";

  @override
  String applyFailure(ActionContext context, Actor enemy) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor enemy) {
    Actor a = context.actor;
    WorldStateBuilder w = context.outputWorld;
    Storyline s = context.outputStoryline;
    assert(a.currentWeaponOrBodyPart.damageCapability.isBlunt);

    a.currentWeaponOrBodyPart.report(
        s,
        "<owner's> <subject> land<s> on <object's> head "
        "{hard|with a {sickening|loud} crack}",
        owner: a,
        object: enemy,
        positive: true);

    final victim = enemy.toBuilder();
    victim.hitpoints = 0;

    deepReplaceBodyPart(
      enemy,
      victim,
      (part) => part.designation == BodyPartDesignation.head,
      (b, isDescendant) {
        if (isDescendant) {
          // Ignore descendants, they aren't affected.
          return;
        }
        b.majorCutsCount += 1;
        b.hitpoints = 0;
      },
    );

    final updatedEnemy = victim.build();
    w.updateActorById(enemy.id, (b) => b.replace(updatedEnemy));
    if (!enemy.isInvincible) {
      killHumanoid(context, enemy.id);
    } else {
      inflictPain(context, enemy.id, 1);
    }

    return "${a.name} cracks ${enemy.name}'s skull on ground";
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor enemy) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(Actor a, Simulation sim, WorldState w, Actor enemy) =>
      a.currentWeaponOrBodyPart.damageCapability.isBlunt;
}
