// @dart=2.9

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/necromancy.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

/// Turns an undead back into a corpse.
class PutToRest extends OtherActorActionBase {
  static final PutToRest singleton = PutToRest();

  static const String className = "PutToRest";

  @override
  List<String> get commandPathTemplate => ["<object>", "put to rest"];

  @override
  String get helpMessage => "I can put the undead to rest, "
      "undoing the unlife I created. "
      "I can only do this while in relative peace, not in combat.";

  @override
  bool get isAggressive => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  // TODO: sanity
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(ActionContext context, Actor corpse) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor undead) {
    final a = context.actor;
    final s = context.outputStoryline;
    final w = context.outputWorld;

    w.recordCustom(CustomEvent.actorPuttingUndeadToRest, actor: undead);

    a.report(s, "<subject> put<s> a hand on <object>", object: undead);
    undead.report(s, "<subject> collapse<s> to the ground");

    // TODO: move currentWeapon and currentShield to `a`
    w.updateActorById(
        undead.id,
        (b) => b
          ..hitpoints = 0
          ..npc.followingActorId = null);

    return "${a.name} put ${undead.name} to rest";
  }

  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    final necromancer = context.actor;

    final party = getPartyOf(necromancer, context.simulation, context.world);
    return party.where((actor) => actor.anatomy.isUndead);
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor object) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Actor object) {
    final situation = w.currentSituation as RoomRoamingSituation;
    final room = sim.getRoomByName(situation.currentRoomName);

    if (room.isSynthetic) return false;

    if (situation.monstersAlive && !room.fightIsOptional) {
      // Don't allow putting to rest when monsters in this room are still alive
      // and the fight isn't optional.
      return false;
    }

    return a.isPlayer && isFollowedByUndeadActor(c, a);
  }
}
