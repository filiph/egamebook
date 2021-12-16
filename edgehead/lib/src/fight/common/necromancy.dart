import 'package:collection/collection.dart' show IterableExtension;
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/deep_replace_body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/fight_situation.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

/// Takes a dead [corpse] and transforms it into an undead [Actor], assigned
/// to the [necromancer]'s team.
ActorBuilder buildCorpse(Actor necromancer, Actor corpse) {
  final corpseBuilder = corpse.toBuilder();

  String? adjective;
  String name;

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

  return corpseBuilder;
}

/// Necromancy in places with no dead humanoids will result in raising
/// an insect. This returns that insect's name if it's still following the
/// player, or `null` if there's no undead insect right now.
String? getUndeadInsectName(ApplicabilityContext context) {
  final latestRaising = context.world.customHistory
      .query(name: CustomEvent.actorRaisedInsect)
      .latest;

  if (latestRaising == null) {
    // No insect ever raised.
    return null;
  }

  final name = latestRaising.data as String?;

  final latestPuttingToRest = context.world.customHistory
      .query(
          name: CustomEvent.actorPuttingInsectToRest, data: latestRaising.data)
      .latest;

  if (latestPuttingToRest == null) {
    // No putting to rest.
    return name;
  }

  if (latestPuttingToRest.time.isAfter(latestRaising.time)) {
    // The insect was put to rest since it was raised.
    return null;
  }

  return name;
}

/// Returns true if there is a (humanoid) undead in the party.
///
/// You should also check [isFollowedByUndeadInsect] if you want to know
/// whether the player is followed by _any_ undead.
bool isFollowedByUndeadActor(ApplicabilityContext context, Actor necromancer) {
  final party = getPartyOf(necromancer, context.simulation, context.world);
  return party.any((actor) => actor.anatomy.isUndead);
}

bool isFollowedByUndeadInsect(ApplicabilityContext context) =>
    getUndeadInsectName(context) != null;

/// Raises one of the corpses that currently share the room with
/// [context.actor]. Reports on it.
///
/// If no suitable corpse is found, then an insect will be raised.
String raiseDead(ActionContext context) {
  final a = context.actor;
  final s = context.outputStoryline;
  final w = context.outputWorld;

  final duringCombat = context.world.currentSituation is FightSituation;

  final corpses = duringCombat
      ? _getFightSituationCorpses(context)
      : _getRoomRoamingCorpses(context);

  final decapitatedCorpse = corpses.firstWhereOrNull(_isDecapitated);
  if (decapitatedCorpse != null) {
    decapitatedCorpse.report(s, "<subject> twitch<es>");
    decapitatedCorpse.report(
        s,
        "But, ultimately, I am not good enough of a necromancer "
        "to raise a {decapitated|beheaded} corpse.",
        wholeSentence: true);
    corpses.removeWhere(_isDecapitated);
  }

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

  // Heal vital body parts (torso, neck), so that the resulting creature
  // can function.
  final healedParts = <BodyPart>{};
  deepReplaceBodyPart(
    raisedCorpse,
    (part) => part.isVital,
    (b) {
      if (b.hitpoints! > 0) return;
      b.hitpoints = 1;
      healedParts.add(b.build());
    },
  );
  if (healedParts.length > 1) {
    s.addEnumeration("", healedParts, "mend");
  } else if (healedParts.length == 1) {
    healedParts.single.report(s, "<owner's> <subject> mend<s>", owner: corpse);
  }
  final healedCorpse = raisedCorpse.build();

  w.updateActorById(corpse.id, (b) => b.replace(healedCorpse));

  if (duringCombat) {
    final situation = context.world.currentSituation! as FightSituation;
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
    if (corpse.adjective != null) {
      corpse.report(s,
          "<subjectNounWithAdjective> open<s> <subjectPronoun's> $eyeOrEyes");
    } else {
      // For example, Darg and lizardman don't have an adjective.
      corpse.report(s, "<subject> open<s> <subjectPronoun's> $eyeOrEyes");
    }
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
    {required bool firstTime}) {
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
  final situation = context.world.currentSituation as FightSituation?;

  return context.world.actors
      .where((Actor actor) =>
          actor.isActive &&
          !actor.isAnimated &&
          (situation!.playerTeamIds.contains(actor.id) ||
              situation.enemyTeamIds.contains(actor.id)))
      .toList();
}

List<Actor> _getRoomRoamingCorpses(ApplicabilityContext context) {
  final actor = context.actor;
  final w = context.world;
  final sim = context.simulation;

  assert(context.world.currentSituation is RoomRoamingSituation);

  final currentRoom =
      sim.getRoomParent(sim.getRoomByName(actor.currentRoomName!));

  final corpses = w.actors.where((a) =>
      a.id != actor.id &&
      a.isActive &&
      !a.isAnimated &&
      sim.getRoomParent(sim.getRoomByName(a.currentRoomName!)) == currentRoom);

  return corpses.toList();
}

bool _isDecapitated(Actor actor) {
  final neck = actor.anatomy.findByDesignation(BodyPartDesignation.neck)!;
  if (neck.isSevered) return true;
  final head = actor.anatomy.findByDesignation(BodyPartDesignation.head)!;
  if (head.isSevered) return true;
  return false;
}
