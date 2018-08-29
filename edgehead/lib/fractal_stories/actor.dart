library stranded.actor;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/anatomy/humanoid.dart';
import 'package:edgehead/fractal_stories/items/fist.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/items/inventory.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:meta/meta.dart';

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
  static const ActorScore defaultScoreWhenDead = ActorScore(-10, 0, 100);

  static Serializer<Actor> get serializer => _$actorSerializer;

  factory Actor([void updates(ActorBuilder b)]) = _$Actor;

  factory Actor.initialized(int id, String name,
      {bool isPlayer: false,
      bool isSurvivor: false,
      bool nameIsProperNoun: false,
      Pronoun pronoun,
      Item currentWeapon,
      Item currentShield,
      int hitpoints,
      int maxHitpoints,
      int constitution: 1,
      int dexterity: 100,
      int stamina: 0,
      int initiative: 0,
      Anatomy anatomy,
      int gold: 0,
      String currentRoomName,
      int followingActorId,
      Team team,
      bool isConfused: false,
      String combineFunctionHandle: "normal"}) {
    Anatomy currentAnatomy =
        (anatomy ?? buildHumanoid(id, constitution: constitution));
    Item weapon = currentWeapon;
    if (weapon == null) {
      weapon = createBodyPartWeapon(currentAnatomy);
    }

    return _$Actor((b) => b
      ..id = id
      ..name = name
      ..isPlayer = isPlayer
      ..isSurvivor = isSurvivor
      ..nameIsProperNoun = nameIsProperNoun
      ..pronoun = (pronoun ?? Pronoun.IT).toBuilder()
      ..inventory = (InventoryBuilder()
        ..currentWeapon = weapon
        ..currentShield = currentShield
        ..weaponInPrimaryAppendage = true)
      ..hitpoints = hitpoints ?? maxHitpoints ?? constitution ?? 1
      ..maxHitpoints = maxHitpoints ?? constitution ?? 1
      ..constitution = constitution ?? 1
      ..dexterity = dexterity
      ..stamina = stamina
      ..initiative = initiative
      ..anatomy = currentAnatomy.toBuilder()
      ..gold = gold
      ..currentRoomName = currentRoomName
      ..followingActorId = followingActorId
      ..isConfused = isConfused
      ..combineFunctionHandle = combineFunctionHandle
      ..team = team != null ? team.toBuilder() : playerTeam.toBuilder()
      ..pose = Pose.standing
      ..isActive = true);
  }

  Actor._();

  /// This is the root of the [Actor]'s anatomy.
  Anatomy get anatomy;

  /// Actor can generally wield weapons other than [Fist].
  ///
  /// This is `true` for most humanoids and `false` for most non-humanoids.
  /// Humans, goblins and octopus-kings can wield. Wolves, bats and zombies
  /// cannot wield.
  ///
  /// This is just a general ability. It says nothing about the current
  /// situation (in which the actor can be sleeping, dead, or have both
  /// hands chopped off).
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
  Item get currentShield => inventory.currentShield;

  /// The weapon this actor is wielding at the moment.
  ///
  /// Changing a weapon should ordinarily take a turn.
  Item get currentWeapon => inventory.currentWeapon;

  /// Same as [canUseWeapon] but for shields.
  bool get canUseShield => true /* TODO */;

  /// When this is `false`, the actor cannot use the weapon,
  /// for whatever reason.
  ///
  /// This could mean that the weapon is broken, or that the arm holding it
  /// is disabled.
  bool get canUseWeapon => true /* TODO */;

  /// The current state of the actor's inventory. Deals with everything
  /// that has to do with items.
  Inventory get inventory;

  /// The general ability to move: swiftly, precisely, with agility.
  /// Useful in combat and most other physical action.
  ///
  /// Average human has [dexterity] of `100`.
  int get dexterity;

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

  /// When `true`, this actor is important to the story (e.g. it is the player
  /// or an important NPC) and so the game should go out of its way to keep them
  /// alive.
  ///
  /// In practice, this means that while a non-survivor can get killed in
  /// a single lucky swing, a survivor won't.
  ///
  /// This does not mean that the actor is invincible. It just means that the
  /// impact of random chance is minimized.
  ///
  /// By default, this is `false`.
  bool get isSurvivor;

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
    for (var weapon in actor.inventory.weapons) {
      selfPreservation += weapon.value / 10;
    }
    for (var item in actor.inventory.items) {
      selfPreservation += item.value / 10;
    }

    // Add points for every friend and their well-being.
    var friends = world.actors.where((a) => a.team == team && a.id != id);
    num teamPreservation = 0;
    for (var friend in friends) {
      teamPreservation += (friend.isAliveAndActive ? 2 : 0);
      teamPreservation += 2 * friend.hitpoints;
      teamPreservation += friend.currentWeapon.value / 2;
      for (var item in friend.inventory.weapons) {
        teamPreservation += item.value / 10;
      }
    }

    // Remove points for every enemy and their hitpoints.
    var enemy = world.actors.fold(0, (num sum, Actor a) {
      final enemyScore = (a.isAliveAndActive ? 1 : 0) + a.hitpoints;
      final weightedScore = enemyScore * hateTowards(a, world);
      return sum + weightedScore;
    });

    return ActorScore(selfPreservation, teamPreservation, enemy);
  }

  /// Returns true if this actor was attacked by [actor] in the past
  /// [time] seconds.
  bool _hasBeenAttackedBy(Actor other, WorldState w, int time) {
    int recency = w.timeSinceLastActionRecord(
        protagonist: other, sufferer: this, wasAggressive: true);
    if (recency == null) return false;
    return recency <= time;
  }

  /// Creates an [Item] from a [BodyPart] in [anatomy] that acts as a weapon.
  static Item createBodyPartWeapon(Anatomy anatomy) {
    // TODO: get the best one, not just the first one
    final part = _getDamageDealingBodyParts(anatomy.torso).first;
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
