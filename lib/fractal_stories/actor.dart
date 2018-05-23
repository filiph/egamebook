library stranded.actor;

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:collection/collection.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/humanoid.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';
import 'package:quiver/core.dart';

import 'item.dart';
import 'pose.dart';
import 'simulation.dart';
import 'storyline/storyline.dart';
import 'team.dart';

part 'actor.g.dart';

Iterable<Actor> getPartyOf(
    Actor actor, Simulation sim, WorldState world) sync* {
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

  static Serializer<Actor> get serializer => _$actorSerializer;

  factory Actor([void updates(ActorBuilder b)]) = _$Actor;

  factory Actor.initialized(int id, String name,
      {bool isPlayer: false,
      bool nameIsProperNoun: false,
      Pronoun pronoun,
      Item currentWeapon,
      Item currentShield,
      int hitpoints,
      int maxHitpoints,
      int constitution: 1,
      int stamina: 0,
      int initiative: 0,
      BodyPart torso,
      int gold: 0,
      String currentRoomName,
      int followingActorId,
      Team team,
      bool isConfused: false,
      String combineFunctionHandle: "normal"}) {
    BodyPart currentTorso = (torso ?? buildHumanoid(id));
    Item weapon = currentWeapon;
    if (weapon == null) {
      weapon = createBodyPartWeapon(currentTorso);
    }

    return new _$Actor((b) => b
      ..id = id
      ..name = name
      ..nameIsProperNoun = nameIsProperNoun
      ..pronoun = (pronoun ?? Pronoun.IT).toBuilder()
      ..currentWeapon = weapon?.toBuilder()
      ..currentShield = currentShield?.toBuilder()
      ..pose = Pose.standing
      ..constitution = constitution ?? 1
      ..maxHitpoints = maxHitpoints ?? constitution ?? 1
      ..hitpoints = hitpoints ?? maxHitpoints ?? constitution ?? 1
      ..torso = currentTorso.toBuilder()
      ..gold = gold
      ..stamina = stamina
      ..initiative = initiative
      ..isActive = true
      ..isPlayer = isPlayer
      ..weapons = new ListBuilder<Item>()
      ..team = team != null ? team.toBuilder() : playerTeam.toBuilder()
      ..currentRoomName = currentRoomName
      ..followingActorId = followingActorId
      ..isConfused = isConfused
      ..combineFunctionHandle = combineFunctionHandle);
  }

  Actor._();

  /// Actor can wield weapons other than [Fist].
  ///
  /// This is `true` for most humanoids and `false` for most non-humanoids.
  /// Humans, goblins and octopus-kings can wield. Wolves, bats and zombies
  /// cannot wield.
  bool get canWield => true;

  /// The string handle to the combine function that this actor should use.
  String get combineFunctionHandle;

  /// Similar to the idea of constitution in Dungeons and Dragons. The higher
  /// the constitution, the more the actor will withstand.
  ///
  /// By default, this is the same as [maxHitpoints].
  int get constitution;

  @nullable
  String get currentRoomName;

  /// The shield that the actor is currently wielding. This can be `null`
  /// of there is no shield.
  @nullable
  Item get currentShield;

  /// The weapon this actor is wielding at the moment.
  ///
  /// Changing a weapon should ordinarily take a turn.
  Item get currentWeapon;

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

  bool get isBarehanded =>
      currentWeapon.damageCapability.type == WeaponType.fist;

  bool get isConfused;

  bool get isOffBalance => pose == Pose.offBalance;

  bool get isOnGround => pose == Pose.onGround;

  @override
  bool get isPlayer;

  bool get isStanding => pose == Pose.standing;

  /// Inventory of items possessed by the actor.
  ///
  /// This does not include things that are wield-able (weapons, shields) or
  /// otherwise equip-able (armor). Consider [items] more like "contents of
  /// actor's backpack": potions, books, scrolls.
  BuiltList<Item> get items;

  int get maxHitpoints;

  @override
  String get name;

  @override
  bool get nameIsProperNoun;

  Pose get pose;

  @override
  Pronoun get pronoun;

  int get stamina;

  @override
  Team get team;

  /// This is the root of the [Actor]'s anatomy.
  BodyPart get torso;

  /// How safe does [this] Actor feel in the presence of the different other
  /// actors.
  ///
  /// For example, a Bob's failed attempt at murder of Alice will lead to Alice
  /// feeling much less safe near Bob. This will greatly decrease her world
  /// score, btw, so this automatically makes an attempted murder something
  /// people don't appreciate.
  // TODO: for 'Skyrim', we don't need this most of the time (simple friend or foe suffices) -- maybe create PsychologicalActor?
  //  ActorRelationshipMap get safetyFear;

  /// A list of all weapons possessed by the actor.
  ///
  /// This is a list because we want to allow having duplicate items
  /// (2 apples).
  ///
  /// Not that [WeaponType.shield] is also a weapon.
  BuiltList<Item> get weapons;

  int countWeapons(WeaponType type) {
    int count = 0;
    if (currentWeapon.damageCapability.type == type) count += 1;
    for (final weapon in weapons) {
      assert(weapon.isWeapon, "Non-weapon in Actor.weapons");
      if (weapon.damageCapability.type == type) count += 1;
    }
    return count;
  }

  /// Returns the best weapon (by [Item.value]) in [Actor.weapons].
  ///
  /// Returns `null` when there are no weapons available.
  Item findBestWeapon() {
    Item best;
    int value = -9999999;
    for (var weapon in weapons) {
      assert(weapon.isWeapon, "Non-weapon in Actor.weapons");
      if (weapon.value > value) {
        best = weapon;
        value = weapon.value;
      }
    }
    return best;
  }

  bool hasResource(Resource resource) {
    assert(resource == Resource.stamina, "Only stamina implemented");
    return stamina >= 1;
  }

  bool hasWeapon(WeaponType type) =>
      currentWeapon.damageCapability.type == type ||
      weapons.any((w) => w.damageCapability.type == type);

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

  /// Returns the intensity of hate towards the actor. Very high when
  /// this actor is rabid. About `1.0` for actors of enemy team. `0.0` for
  /// neutrals or friends.
  ///
  /// TODO: Optimize. This function takes ~4% of CPU.
  ///       Actors could keep track of "aggro" themselves, instead of querying
  ///       action history.
  double hateTowards(Actor other, WorldState w) {
    if (isConfused && team.isFriendWith(other.team)) {
      return 1000.0;
    }

    if (_hasBeenAttackedBy(other, w, 10)) {
      return 1.0;
    }

    return team.isEnemyWith(other.team) ? 1.0 : 0.0;
  }

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
    // Add points for weapon/shield/item values.
    for (var weapon in actor.weapons) {
      selfPreservation += weapon.value / 10;
    }
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
      for (var item in friend.weapons) {
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

  /// Returns true if this actor was attacked by [actor] in the past
  /// [time] seconds.
  bool _hasBeenAttackedBy(Actor other, WorldState w, int time) {
    int recency = w.timeSinceLastActionRecord(
        protagonist: other, sufferer: this, wasAggressive: true);
    if (recency == null) return false;
    return recency <= time;
  }

  /// Creates an [Item] from a [BodyPart] in [torso] that acts as a weapon.
  static Item createBodyPartWeapon(BodyPart torso) {
    // TODO: get the best one, not just the first one
    final part = _getDamageDealingBodyParts(torso).first;
    return createFist(part);
  }

  /// Walks [part]  and returns all body parts that can be used as a weapon.
  static Iterable<BodyPart> _getDamageDealingBodyParts([BodyPart part]) =>
      _walkBodyPartTree(part).where((p) => p.damageCapability != null);

  /// Returns an iterable of all body parts that are descendants of [part].
  static Iterable<BodyPart> _walkBodyPartTree(BodyPart part) sync* {
    yield part;
    for (final child in part.children) {
      yield* _walkBodyPartTree(child);
    }
  }
}
