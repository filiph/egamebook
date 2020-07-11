import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';
import 'package:meta/meta.dart';

/// Takes a dead [corpse] and transforms it into an undead [Actor], assigned
/// to the [necromancer]'s team.
///
/// Also heals vital body parts (torso, neck), so that the resulting creature
/// can function.
Actor buildCorpse(Actor necromancer, Actor corpse) {
  final corpseBuilder = corpse.toBuilder();

  String adjective, name;

  if (corpse.name == 'undead') {
    // The corpse was already raised at least once. Let's not name them
    // something like "feral goblin undead undead".
    adjective = corpse.adjective;
    name = corpse.name;
  } else if (corpse.nameIsProperNoun) {
    // Tamara become "undead Tamara" (but since we mostly don't use adjectives
    // unless necessary, she will be reported as "Tamara").
    adjective = 'undead';
    name = corpse.name;
  } else {
    if (corpse.adjective != null) {
      // The "goblin captain" will become "the goblin captain undead".
      adjective = '${corpse.adjective} ${corpse.name}';
      name = 'undead';
    } else {
      // A goblin will become "the goblin undead".
      adjective = corpse.name;
      name = 'undead';
    }
  }

  assert(name != null);
  assert(adjective != null);

  corpseBuilder
    ..name = name
    ..adjective = adjective
    ..anatomy.isUndead = true
    ..hitpoints = 1
    ..pose = corpse.anatomy.hasCrippledLegs ? Pose.onGround : corpse.poseMax
    ..isConfused = false
    ..npc.followingActorId = necromancer.id
    ..team = necromancer.team.toBuilder();

  // Heal all vital parts.
  deepReplaceBodyPart(
    corpseBuilder,
    (part) => part.isVital,
    (b) {
      if (b.hitpoints > 0) return;
      b.hitpoints = 1;
    },
  );

  return corpseBuilder.build();
}

bool isFollowedByAnUndead(ApplicabilityContext context, Actor necromancer) {
  final party = getPartyOf(necromancer, context.simulation, context.world);
  return party.any((actor) => actor.anatomy.isUndead);
}

/// Raises one of the [corpses] and reports on it.
///
/// If [corpses] is empty
String raiseDead(ActionContext context) {
  final a = context.actor;
  final s = context.outputStoryline;
  final w = context.outputWorld;

  final duringCombat = context.world.currentSituation is FightSituation;

  final corpses = duringCombat
      ? _getFightSituationCorpses(context)
      : _getRoomRoamingCorpses(context);

  if (corpses.isEmpty) {
    final insect = w.randomChoose([
      "housefly",
      "ant",
      "bee",
      "mosquito",
      "cockroach",
    ]);
    w.recordCustom(CustomEvent.actorRaisedInsect, data: insect, actor: a);
    final firstTime = !context.world.customHistory
        .query(name: CustomEvent.actorRaisedInsect, actorId: a.id)
        .hasHappened;
    reportRaiseInsect(a, s, insect, firstTime: firstTime);
    return "${a.name} turned some insect undead";
  }

  final corpse = w.randomChoose(corpses);

  reportRaiseDead(a, s, corpse);

  w.recordCustom(CustomEvent.actorRaisingUndead, actor: corpse);

  final raisedCorpse = buildCorpse(a, corpse);
  w.updateActorById(corpse.id, (b) => b.replace(raisedCorpse));

  if (duringCombat) {
    final situation = context.world.currentSituation as FightSituation;
    // Place undead in the correct team.
    w.replaceSituationById<FightSituation>(situation.id, situation.rebuild((b) {
      if (a.isPlayer) {
        b.playerTeamIds.add(corpse.id);
        b.enemyTeamIds.remove(corpse.id);
      } else {
        b.enemyTeamIds.add(corpse.id);
        b.playerTeamIds.remove(corpse.id);
      }
    }));
  }

  return "${a.name} turned ${corpse.name} undead";
}

void reportRaiseDead(Actor a, Storyline s, Actor corpse) {
  a.report(s, "<subject> perform<s> the necromantic incantation");
  a.report(s, "<subject> feel<s> it was successful");

  bool reportedSomething = false;

  // We cannot use Actor.isBlind because that only works for animated actors,
  // not corpses. See Actor.isBlind for more info.
  final functioningEyesBeforeDeath = corpse.anatomy.allParts
      .where((part) =>
          part.function == BodyPartFunction.vision && part.isAnimatedAndActive)
      .length;
  if (functioningEyesBeforeDeath > 0) {
    final eyeOrEyes = functioningEyesBeforeDeath > 1 ? "eyes" : "eye";
    corpse.report(s, "<subject> open<s> <subject's> $eyeOrEyes");
    reportedSomething = true;
  }

  if (!corpse.anatomy.hasCrippledLegs) {
    corpse.report(s, "<subject> stand<s> up");
    reportedSomething = true;
  }

  if (!reportedSomething) {
    corpse.report(s, "<subject> jolt<s> with sudden muscle movement");
  }
}

void reportRaiseInsect(Actor a, Storyline s, String insectName,
    {@required bool firstTime}) {
  a.report(s, "<subject> perform<s> the necromantic incantation");
  a.report(s, "<subject> feel<s> it was successful");
  a.report(s, "<subject> look<s> around to see");
  a.report(s, "<subject> realize<s> <subject> raised a dead $insectName");

  if (firstTime && a.isPlayer) {
    // If this is the first time, we should explain what's happened.
    s.add(
        "This happens when there are no bigger, suitable corpses "
        "in the area, and my gift can therefore not attain "
        "its full potential. Instead of raising a human-sized corpse, "
        "the incantation raised an insect. There is always a dead insect "
        "somewhere around. "
        "It sometimes does pay to perform necromancy "
        "in an area without obvious corpses, but this was not the time. "
        "The $insectName will follow me around, but will not be useful.",
        isRaw: true);
  }
}

List<Actor> _getFightSituationCorpses(ApplicabilityContext context) {
  final situation = context.world.currentSituation as FightSituation;

  return context.world.actors
      .where((Actor actor) =>
          actor.isActive &&
          !actor.isAnimated &&
          (situation.playerTeamIds.contains(actor.id) ||
              situation.enemyTeamIds.contains(actor.id)))
      .toList(growable: false);
}

List<Actor> _getRoomRoamingCorpses(ApplicabilityContext context) {
  final actor = context.actor;
  final w = context.world;
  final sim = context.simulation;

  assert(context.world.currentSituation is RoomRoamingSituation);

  final currentRoom =
      sim.getRoomParent(sim.getRoomByName(actor.currentRoomName));

  final corpses = w.actors.where((a) =>
      a.id != actor.id &&
      a.isActive &&
      !a.isAnimated &&
      sim.getRoomParent(sim.getRoomByName(a.currentRoomName)) == currentRoom);

  return corpses.toList(growable: false);
}
