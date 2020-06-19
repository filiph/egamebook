import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

class HireNpcAction extends OtherActorActionBase {
  static const String className = "HireNpcAction";

  static final HireNpcAction singleton = HireNpcAction();

  @override
  List<String> get commandPathTemplate => ["<object>", "hire"];

  @override
  String get helpMessage => null;

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
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(ActionContext context, Actor npc) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor npc) {
    final a = context.actor;
    final w = context.outputWorld;
    final s = context.outputStoryline;

    npc.report(s, "<subject> nod<s>");
    npc.report(s, "in a few moments, <subject> stand<s> next to <object>",
        object: a, endSentence: true);

    if (npc.isBarehanded) {
      npc.report(s, "<subject> <is> unarmed");
    } else {
      // He has his sword.
      npc.report(s, "<subject> <has> <subjectPronoun's> <object>",
          object: npc.currentWeapon);
      if (npc.currentShield != null) {
        // ... and his shield.
        npc.report(s, "<subject> <has> <subjectPronoun's> <object>",
            object: npc.currentShield);
      }
    }

    w.updateActorById(npc.id, (b) => b.npc.followingActorId = a.id);

    return "${a.name} hires ${npc.name}";
  }

  /// Returns actors who are in the same room as the performing actor
  /// and are not in his party.
  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    final w = context.world;
    final sim = context.simulation;

    final currentRoomName = context.world
        .getSituationByName<RoomRoamingSituation>(
            RoomRoamingSituation.className)
        .currentRoomName;
    final currentParentRoom =
        sim.getRoomParent(sim.getRoomByName(currentRoomName));
    final currentParty = getPartyOf(context.actor, sim, w);

    return w.actors.where((a) =>
        a.isAnimatedAndActive &&
        a.currentRoomName == currentParentRoom.name &&
        a.npc.isHireable &&
        !currentParty.contains(a));
  }

  @override
  String getRollReason(Actor a, Simulation sim, WorldState w, Actor npc) =>
      "WARNING should not be user-visible";

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor npc) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
      WorldState w, Actor npc) {
    return true;
  }
}
