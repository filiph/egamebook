import 'package:edgehead/edgehead_ids.dart' show dragonEggId;
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';

class ThrowGrenade extends Action<Nothing> {
  static final ThrowGrenade singleton = ThrowGrenade();

  static const String className = "ThrowGrenade";

  @override
  final String helpMessage = "I can unleash this ancient weapon. "
      "Only Goddess Iss knows what it will do.";

  @override
  final bool isAggressive = true;

  @override
  final bool isProactive = true;

  @override
  final bool isImplicit = false;

  @override
  final bool rerollable = false;

  @override
  final Resource rerollResource = null;

  @override
  List<String> get commandPathTemplate => ["Inventory", "dragon egg", "throw"];

  @override
  String get name => className;

  @override
  String applyFailure(_, __) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, void _) {
    Actor a = context.actor;
    Storyline s = context.outputStoryline;

    final grenade =
        a.inventory.items.singleWhere((element) => element.id == dragonEggId);

    if (a.isPlayer) {
      a.report(s, "<subject> do<es> as <subject> was told");
    }
    a.report(s, "<subject> remove<s> the pin from <object>", object: grenade);
    a.report(s, "<subject> {lob<s>|throw<s>} <object>", object: grenade);

    final enemies = context.world.currentSituation
        .getActors(context.simulation, context.world)
        .where((actor) =>
            actor.team.isEnemyWith(a.team) && actor.isAnimatedAndActive)
        .toList(growable: false);
    assert(enemies.isNotEmpty);
    final multitude = enemies.length > 1;

    final inTime = context.world.currentSituation.turn <= 3;

    if (inTime) {
      if (multitude) {
        grenade.report(s, "<subject> land<s> {among|just behind} the enemies");
      } else {
        final enemy = enemies.single;
        grenade.report(s, "<subject> land<s> {next to|just behind} <object>",
            object: enemy);
      }
    } else {
      if (multitude) {
        grenade.report(s, "<subject> land<s> between <object> and the enemies",
            object: a);
        s.add("it's too late.", wholeSentence: true);
        s.add("the enemies are too close.", wholeSentence: true);
      } else {
        final enemy = enemies.single;
        grenade.report(s, "<subject> land<s> between <object> and <object2>",
            object: a, object2: enemy);
        s.add("it's too late.", wholeSentence: true);
        enemy.report(s, "<subject> <is> too close");
      }
    }

    context.outputWorld
        .updateActorById(a.id, (b) => b..inventory.remove(grenade));

    // TODO: make this awesome writing: "there is a moment of silence",
    //       "powerful blow", etc.
    grenade.report(s, "<subject> explode<s>");

    if (inTime) {
      if (multitude) {
        s.add(
            "the blast throws "
            "${enemies.length > 2 ? 'all' : 'both'} of them.",
            wholeSentence: true);
      } else {
        final enemy = enemies.single;
        enemy.report(s, "<subject> <is> thrown by the blast",
            wholeSentence: true);
      }

      for (final enemy in enemies) {
        context.outputWorld.updateActorById(
            enemy.id,
            (b) => b
              ..hitpoints = 0
              ..pose = Pose.onGround);
        killHumanoid(context, enemy.id);
      }

      // TODO: ringing in ears
    } else {
      grenade.report(
          s,
          "pieces of <subject> fly into "
          "my face, neck, chest, limbs, everything.",
          wholeSentence: true);

      context.outputWorld.updateActorById(a.id, (b) => b..hitpoints = 0);
      killHumanoid(context, a.id);
    }

    s.addParagraph();

    return "${a.name} throws a grenade (${grenade.name}";
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, void _) =>
      "WARNING this shouldn't be "
      "user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, void _) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState world, void _) =>
      a.isPlayer &&
      a.inventory.items.any((element) => element.id == dragonEggId);
}
