library stranded.actor;

import 'package:built_value/built_value.dart';
import 'package:collection/collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/items/weapon.dart';
import 'package:edgehead/fractal_stories/planner_recommendation.dart';
import 'package:edgehead/src/fight/actions/confuse.dart';
import 'package:edgehead/src/fight/actions/unconfuse.dart';
import 'package:meta/meta.dart';
import 'package:quiver/core.dart';

import 'item.dart';
import 'storyline/storyline.dart';
import 'team.dart';
import 'world.dart';

part 'actor.g.dart';

Iterable<Actor> getPartyOf(Actor actor, WorldState world) sync* {
  yield actor;
  yield* world.actors.where((other) => other.followingActorId == actor.id);
}

@immutable
abstract class Actor extends Object
    with EntityBehavior
    implements Built<Actor, ActorBuilder>, Entity {
  /// The default score when actor dies and is no longer in the world.
  ///
  /// For example, after a `FightSituation` ends, all dead actors are deleted,
  /// which means there is nobody to score the situation. In that case, we
  /// provide this default score.
  static const ActorScore defaultScoreWhenDead = const ActorScore(-10, 0, 100);

  factory Actor([updates(ActorBuilder b)]) = _$Actor;

  factory Actor.initialized(int id, String name,
          {bool isPlayer: false,
          bool nameIsProperNoun: false,
          Pronoun pronoun: Pronoun.IT,
          Weapon currentWeapon,
          int hitpoints: 1,
          int maxHitpoints: 1,
          int stamina: 0,
          int initiative: 0,
          int gold: 0,
          String currentRoomName,
          int followingActorId,
          Team team,
          CombineFunction combineFunction}) =>
      new _$Actor((b) => b
        ..id = id
        ..name = name
        ..nameIsProperNoun = nameIsProperNoun
        ..pronoun = pronoun
        ..currentWeapon = currentWeapon ?? defaultFist
        ..categories = []
        ..pose = Pose.standing
        ..hitpoints = hitpoints
        ..maxHitpoints = maxHitpoints
        ..gold = gold
        ..stamina = stamina
        ..initiative = initiative
        ..isActive = true
        ..isPlayer = isPlayer
        ..items = new Set()
        ..team = team != null ? team.toBuilder() : playerTeam.toBuilder()
        ..currentRoomName = currentRoomName
        ..followingActorId = followingActorId
        ..combineFunction = combineFunction);

  Actor._();

  /// Actor can wield weapons other than [Fist].
  ///
  /// This is `true` for most humanoids and `false` for most non-humanoids.
  /// Humans, goblins and octopus-kings can wield. Wolves, bats and zombies
  /// cannot wield.
  bool get canWield => true;

  @override
  List<String> get categories;

  @nullable
  CombineFunction get combineFunction;

  @nullable
  String get currentRoomName;

  /// The weapon this actor is wielding at the moment.
  ///
  /// Changing a weapon should ordinarily take a turn.
  Weapon get currentWeapon;

  /// The actor that [this] actor is following around.
  @nullable
  int get followingActorId;

  int get gold;

  int get hitpoints;

  /// Names can change or can even be duplicate. [id] is the only safe way
  /// to find out if we're talking about the same actor.
  @override
  int get id;

  /// The higher the initiative, the sooner this actor will act each turn.
  ///
  /// The player should have the highest initiative (so that he starts).
  ///
  /// This doesn't change during gameplay.
  int get initiative;

  @override
  bool get isActive;

  @override
  bool get isAlive => hitpoints > 0;

  bool get isBarehanded => currentWeapon is Fist;

  bool get isOffBalance => pose == Pose.offBalance;

  bool get isOnGround => pose == Pose.onGround;

  // TODO: make non-nullable
  @override
  bool get isPlayer;

  bool get isStanding => pose == Pose.standing;

  /// How safe does [this] Actor feel in the presence of the different other
  /// actors.
  ///
  /// For example, a Bob's failed attempt at murder of Alice will lead to Alice
  /// feeling much less safe near Bob. This will greatly decrease her world
  /// score, btw, so this automatically makes an attempted murder something
  /// people don't appreciate.
  // TODO: for 'Skyrim', we don't need this most of the time (simple friend or foe suffices) -- maybe create PsychologicalActor?
//  ActorRelationshipMap get safetyFear;

  Set<Item> get items;

  int get maxHitpoints;

  @override
  String get name;

  @override
  bool get nameIsProperNoun;

  Pose get pose;

  @override
  Pronoun get pronoun;

  @nullable
  Item get shield;

  int get stamina;

  @override
  Team get team;

  bool hasItem(Type type, {int needed: 1}) {
    int count = 0;
    for (var item in items) {
      // TODO: get rid of runtimeType here - no guarantee it will work when compiled to JS
      if (item.runtimeType == type) {
        count += 1;
      }
      if (count >= needed) break;
    }
    return count >= needed;
  }

  bool hasResource(Resource resource) {
    assert(resource == Resource.stamina, "Only stamina implemented");
    return stamina >= 1;
  }

  /// When an [Actor] hates another actor, they will be willing and eager to
  /// attack them.
  ///
  /// By default, Actors from enemy teams hate each other, and so will attack
  /// each other on sight. But, for example, when an actor is bound by spell,
  /// they can hate their own team. When an actor was just attacked by their
  /// team mate, they will attack back.
  ///
  /// This method is a simple threshold over [hateTowards].
  bool hates(Actor other, WorldState w) {
    return hateTowards(other, w) > 0.0;
  }

  // TODO: loveIndifference
  // other feelings?

  /// Returns the intensity of hate towards the actor. Very high when
  /// this actor is rabid. About `1.0` for actors of enemy team. `0.0` for
  /// neutrals or friends.
  double hateTowards(Actor other, WorldState w) {
    if (isConfused(w) && team.isFriendWith(other.team)) {
      return 1000.0;
    }

    if (_hasBeenAttackedBy(other, w, 10)) {
      return 1.0;
    }

    return team.isEnemyWith(other.team) ? 1.0 : 0.0;
  }

  /// Returns whether actor is in confused state at present.
  ///
  /// This works by checking [w]'s history.
  bool isConfused(WorldState w) {
    int recency = w.timeSinceLastActionRecord(
        actionName: Confuse.className, sufferer: this, wasSuccess: true);
    if (recency == null) return false;
    int unconfuseRecency = w.timeSinceLastActionRecord(
        actionName: Unconfuse.className, protagonist: this, wasSuccess: true);
    if (unconfuseRecency == null) return true;
    return unconfuseRecency < recency;
  }

  Item removeItem(Type type) {
    Item markedForRemoval;
    for (var item in items) {
      // TODO: get rid of runtimeType here - no guarantee it will work when compiled to JS
      if (item.runtimeType == type) {
        markedForRemoval = item;
        break;
      }
    }
    if (markedForRemoval == null) {
      throw new StateError("Cannot remove item: actor $this doesn't have "
          "$type");
    }
    items.remove(markedForRemoval);
    return markedForRemoval;
  }

  Iterable<Item> removeItems(Type type, int count) {
    var markedForRemoval = <Item>[];
    int remaining = count;
    for (var item in items) {
      // TODO: get rid of runtimeType here - no guarantee it will work when compiled to JS
      if (item.runtimeType == type) {
        markedForRemoval.add(item);
      }
      remaining -= 1;
      if (remaining <= 0) break;
    }
    if (remaining != 0) {
      throw new StateError("Cannot remove $count items of $type from $this. "
          "Only ${count - remaining} in possession.");
    }
    markedForRemoval.forEach((item) => items.remove(item));
    return markedForRemoval;
  }

  /// The resources this actor knows about.
  ///
  /// They can share this information with others (or not).
  /// TODO: uncomment and implement
  //  final UnmodifiableSetView<LocationResource> knownResources;

  /// Scores the state of the [world] in the eyes of [this] Actor.
  ///
  /// This is the "objective function" that the actors try to optimize.
  /// Presumably, different characters will score the same situation
  /// differently, and of course the same world will be scored differently
  /// depending on who scores it (if Bob has all the bananas and Alice is
  /// starving, then Bob's score will be higher than Alice's).
  ActorScore scoreWorld(WorldState world) {
    var actor = world.getActorById(id);
    num selfPreservation = 2 * actor.hitpoints;
    // Extra painful if actor dies in this world.
    if (!actor.isAlive) selfPreservation -= 10;
    // Add bonus point for weapon.
    if (!actor.isBarehanded) selfPreservation += 4;
    // Add points for weapon value.
    selfPreservation += actor.currentWeapon.value / 2;
    // Add points for item values.
    for (var item in actor.items) {
      selfPreservation += item.value / 10;
    }

    // Add points for every friend and their well-being.
    var friends = world.actors.where((a) => a.team == team && a.id != id);
    num teamPreservation = 0;
    for (var friend in friends) {
      teamPreservation += (friend.isAliveAndActive ? 2 : 0);
      teamPreservation += 2 * friend.hitpoints;
      teamPreservation += friend.currentWeapon.value / 2;
      for (var item in friend.items) {
        teamPreservation += item.value / 10;
      }
    }

    // Remove points for every enemy and their hitpoints.
    var enemy = world.actors.fold(0, (num sum, Actor a) {
      final enemyScore = (a.isAliveAndActive ? 1 : 0) + a.hitpoints;
      final weightedScore = enemyScore * hateTowards(a, world);
      return sum + weightedScore;
    });

    return new ActorScore(selfPreservation, teamPreservation, enemy);
  }

  bool wields(ItemType value) => currentWeapon.types.contains(value);

  /// Returns true if this actor has ever been attacked by [actor] in the past
  /// [time] turns.
  bool _hasBeenAttackedBy(Actor other, WorldState w, int time) {
    int recency = w.timeSinceLastActionRecord(
        protagonist: other, sufferer: this, wasAggressive: true);
    if (recency == null) return false;
    return recency <= time;
  }
}

class ActorMap<T> extends CanonicalizedMap<int, Actor, T> {
  ActorMap() : super((Actor key) => key.id, isValidKey: (key) => key != null);

  factory ActorMap.from(ActorMap<T> other) {
    var map = new ActorMap<T>();
    other.forEach((Actor key, T value) => map[key] = value);
    return map;
  }

  @override
  int get hashCode {
    return hash2(hashObjects(values), hashObjects(keys));
  }

  @override
  bool operator ==(Object o) => o is ActorMap && hashCode == o.hashCode;
}

enum Pose { standing, offBalance, onGround }
