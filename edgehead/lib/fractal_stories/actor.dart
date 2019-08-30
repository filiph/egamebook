library stranded.actor;

import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor_score.dart';
import 'package:edgehead/fractal_stories/anatomy/anatomy.dart';
import 'package:edgehead/fractal_stories/anatomy/humanoid.dart';
import 'package:edgehead/fractal_stories/director/director.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/item.dart';
import 'package:edgehead/fractal_stories/items/damage_capability.dart';
import 'package:edgehead/fractal_stories/items/inventory.dart';
import 'package:edgehead/fractal_stories/items/weapon_type.dart';
import 'package:edgehead/fractal_stories/npc/npc_capability.dart';
import 'package:edgehead/fractal_stories/pose.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/team.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/actions/turn_undead.dart';
import 'package:meta/meta.dart';

part 'actor.g.dart';

Iterable<Actor> getPartyOf(
    Actor actor, Simulation sim, WorldState world) sync* {
  yield actor;
  yield* world.actors.where((other) =>
      other.npc.followingActorId == actor.id && other.isAnimatedAndActive);
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
  static const ActorScore defaultScoreWhenDead = ActorScore(-10, 0, 100, 0);

  static Serializer<Actor> get serializer => _$actorSerializer;

  factory Actor([void updates(ActorBuilder b)]) = _$Actor;

  factory Actor.initialized(
    int id,
    String name, {
    bool isPlayer = false,
    bool isInvincible = false,
    bool isSurvivor = false,
    bool nameIsProperNoun = false,
    Pronoun pronoun,
    Item currentWeapon,
    Item currentShield,
    int hitpoints,
    int maxHitpoints,
    int constitution = 1,
    int dexterity = 100,
    int stamina = 0,
    int initiative = 0,
    Anatomy anatomy,
    int gold = 0,
    String currentRoomName,
    bool isHireable = false,
    int followingActorId,
    Team team,
    Pose poseMax = Pose.standing,
    bool isConfused = false,
    bool isUndead = false,
    String foldFunctionHandle = "normal",
    bool isDirector = false,
  }) {
    Anatomy currentAnatomy = anatomy ??
        buildHumanoid(id, constitution: constitution, isUndead: isUndead);
    Item weapon = currentWeapon;

    return _$Actor((b) => b
      ..id = id
      ..name = name
      ..isPlayer = isPlayer
      ..isInvincible = isInvincible
      ..isSurvivor = isSurvivor
      ..nameIsProperNoun = nameIsProperNoun
      ..pronoun = (pronoun ?? Pronoun.IT).toBuilder()
      ..inventory = (InventoryBuilder()
        ..currentWeapon = weapon
        ..weapons.addAll([
          if (currentWeapon != null) currentWeapon,
        ])
        ..currentShield = currentShield
        ..shields.addAll([
          if (currentShield != null) currentShield,
        ])
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
      ..npc = NpcCapability(
        isHireable: isHireable,
        followingActorId: followingActorId,
      ).toBuilder()
      ..isConfused = isConfused
      ..foldFunctionHandle = foldFunctionHandle
      ..team = team != null ? team.toBuilder() : playerTeam.toBuilder()
      ..pose = poseMax
      ..poseMax = poseMax
      ..isActive = true
      ..recoveringUntil = DateTime.utc(-9999)
      ..director = isDirector ? DirectorCapabilityBuilder() : null);
  }

  Actor._();

  /// This is the root of the [Actor]'s anatomy.
  Anatomy get anatomy;

  /// Similar to the idea of constitution in Dungeons and Dragons. The higher
  /// the constitution, the more the actor will withstand.
  ///
  /// By default, this is the same as [maxHitpoints].
  int get constitution;

  /// Returns the damage capability that the actor currently possesses.
  ///
  /// If the actor is holding a weapon, then [currentWeapon]'s damage
  /// capability is returned. Failing that, any [Anatomy.bodyPartWeapon]'s
  /// capability is returned.
  ///
  /// When the actor can deal no damage at all, [DamageCapability.none]
  /// is returned. This getter never returns `null` (as opposed
  /// to [currentWeaponOrBodyPart]).
  DamageCapability get currentDamageCapability {
    final weapon = currentWeaponOrBodyPart;
    if (weapon == null) return DamageCapability.none;
    return weapon.damageCapability;
  }

  @nullable
  String get currentRoomName;

  /// The shield that the actor is currently wielding. This can be `null`
  /// if there is no shield.
  Item get currentShield => inventory.currentShield;

  /// The weapon this actor is wielding at the moment.
  ///
  /// This must be an item that the actor can wield, such as a dagger
  /// or a sword. Claws and other things are [Anatomy.bodyPartWeapon].
  Item get currentWeapon => inventory.currentWeapon;

  /// Returns either the [currentWeapon] (if held), or the best available
  /// [anatomy.bodyPartWeapon] (e.g. fist), or `null` if neither is available.
  Item get currentWeaponOrBodyPart {
    if (currentWeapon != null) return currentWeapon;
    if (anatomy.bodyPartWeapon != null) return anatomy.bodyPartWeapon;
    return null;
  }

  /// The general ability to move: swiftly, precisely, with agility.
  /// Useful in combat and most other physical action.
  ///
  /// Average human has [dexterity] of `100`.
  int get dexterity;

  /// Special data attached to the game's director. Normal actors (like
  /// the player, the monsters and the NPCs) don't have this.
  @nullable
  DirectorCapability get director;

  /// The string handle to the fold function that this actor should use.
  String get foldFunctionHandle;

  int get gold;

  int get hitpoints;

  /// This is `true` if the actor doesn't hold any weapon.
  ///
  /// This doesn't mean the actor is defenseless (they can have claws
  /// or teeth).
  ///
  /// It's the opposite of [holdsSomeWeapon].
  bool get holdsNoWeapon => currentWeapon == null;

  /// This is `true` if the actor is holding a weapon.
  ///
  /// It's the opposite of [holdsNoWeapon].
  bool get holdsSomeWeapon => !holdsNoWeapon;

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

  /// The current state of the actor's inventory. Deals with everything
  /// that has to do with items.
  Inventory get inventory;

  /// This is mostly `true`. The flag exists so that we can have actors
  /// "waiting" to be activated. For example, an actor created at start
  /// of play can become active much later.
  @override
  bool get isActive;

  /// When `true`, this actor can move around, attack, etc.
  ///
  /// They can be either alive or undead (when [isUndead] is `true`).
  @override
  bool get isAnimated => hitpoints > 0;

  /// This is `true` if the actor is barehanded. This means that the actor
  /// _is_ ready to fight, but only with their bare hands.
  ///
  /// This is `false` if the actor holds a weapon, or has all her fists
  /// crippled.
  ///
  /// Throws for creatures without fists.
  bool get isBarehanded {
    if (!anatomy.isHumanoid) {
      throw StateError("Calling isBarehanded for a non-humanoid creature "
          "doesn't make sense.");
    }
    return currentWeapon == null &&
        anatomy.bodyPartWeapon?.damageCapability?.type == WeaponType.fist;
  }

  bool get isConfused;

  /// If `true`, this actor has special powers over the game world. They should
  /// not appear physically in the game world.
  bool get isDirector => director != null;

  /// The actor has "plot armor". They should never die. Actions should go
  /// out of their way to prevent the actor from dying.
  ///
  /// For example, a spear throw that would normally go through an actor's
  /// body will pierce the actor's shoulder instead if the target's
  /// [isInvincible] flag is `true`.
  ///
  /// It is not necessarily a good idea to give plot armor to the player
  /// character. In many gamebooks, it's okay to have a "game over". This flag
  /// is meant for supporting characters whose death would make the rest
  /// of a story meaningless.
  ///
  /// For more about "plot armor", read:
  /// https://tvtropes.org/pmwiki/pmwiki.php/Main/PlotArmor
  ///
  /// By default, this is `false`.
  ///
  /// Contrast with [isSurvivor], which only means that the actor won't get
  /// unlucky hits against himself.
  bool get isInvincible;

  bool get isOnGround => pose == Pose.onGround;

  @override
  bool get isPlayer;

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
  ///
  /// Contrast with [isInvincible], which is plot armor (actor cannot die).
  bool get isSurvivor;

  /// When `true`, this actor is undead.
  ///
  /// This field is separate from [isAnimated]. An actor can be [isUndead]
  /// but killed ([isAnimated] == `false`).
  ///
  /// Forwards to [Anatomy.isUndead].
  bool get isUndead => anatomy.isUndead;

  int get maxHitpoints;

  @override
  String get name;

  @override
  bool get nameIsProperNoun;

  /// The component that includes data related to NPC systems, like
  /// hiring and NPC, talking to them, and so on.
  NpcCapability get npc;

  Pose get pose;

  /// The maximum pose achievable by this actor. In general, only expert
  /// warriors know how to go into [Pose.combat]. Some people can't even
  /// go beyond [Pose.extended]. Drunks will never go beyond [Pose.offBalance].
  Pose get poseMax;

  @override
  Pronoun get pronoun;

  /// The point in time after which this actor can act again.
  ///
  /// For example, if an actor just started performing an action that will take
  /// 5 seconds to complete, their [recoveringUntil] will become at least
  /// 5 seconds in the future. Until that time, they cannot do another move.
  DateTime get recoveringUntil;

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
  @memoized
  double hateTowards(Actor other, WorldState w) {
    if (isConfused && team.isFriendWith(other.team)) {
      return 1000.0;
    }

    if (_hasBeenAttackedBy(other, w, 10)) {
      return 2.0;
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
  ///
  /// That's why this method returns [ActorScore], which includes many
  /// dimensions. Later, actor combines these functions into a single
  /// dimension using [foldFunctionHandle] (which is used to get
  /// a globally provided [FoldFunction] in [Simulation.foldFunctions]).
  ActorScore scoreWorld(WorldState world) {
    var actor = world.getActorById(id);
    num selfPreservation = 2 * actor.hitpoints;
    selfPreservation += actor.pose.differenceFrom(Pose.onGround);
    // Extra painful if actor dies in this world.
    if (!actor.isAnimated) selfPreservation -= 10;
    // Add bonus point for weapon.
    if (actor.currentWeapon != null) selfPreservation += 4;
    // Add points for weapon value.
    selfPreservation += (actor.currentWeapon?.value ?? 0) / 2;
    // Add points for weapon/shield/item values.
    for (final weapon in actor.inventory.weapons) {
      selfPreservation += weapon.value / 10;
    }
    for (final item in actor.inventory.items) {
      selfPreservation += item.value / 10;
    }

    // Add points for every friend and their well-being.
    var friends = world.actors.where((a) => a.team == team && a.id != id);
    num teamPreservation = 0;
    for (final friend in friends) {
      teamPreservation += friend.isAnimatedAndActive ? 2 : 0;
      teamPreservation += 2 * friend.hitpoints;
      teamPreservation += (friend.currentWeapon?.value ?? 0) / 2;
      for (final item in friend.inventory.weapons) {
        teamPreservation += item.value / 10;
      }
    }

    // Remove points for every enemy and their hitpoints.
    var enemy = world.actors.fold(0, (num sum, Actor a) {
      final aliveScore = a.isAnimatedAndActive ? 1 : 0;
      final hitpointScore = a.hitpoints;
      final stanceScore = a.pose.differenceFrom(Pose.onGround) / 2;
      final enemyScore = aliveScore + hitpointScore + stanceScore;
      final weightedScore = enemyScore * hateTowards(a, world);
      return sum + weightedScore;
    });

    // Add points for interesting happenings.
    var seenActions = <String>{};
    var varietyOfAction = 0.0;
    for (final action in world.actionHistory.records.reversed.take(10)) {
      if (seenActions.contains(action.actionName)) continue;
      varietyOfAction += 1;
      if (action.wasAggressive) varietyOfAction += 0.5;
      if (action.wasProactive) varietyOfAction += 0.5;
      if (action.protagonist == id) varietyOfAction += 0.5;
    }

    return ActorScore(
        selfPreservation, teamPreservation, enemy, varietyOfAction);
  }

  /// Returns true if this actor was attacked by [actor] in the past
  /// [maxTime] seconds.
  bool _hasBeenAttackedBy(Actor other, WorldState w, int maxTime) {
    int recency = w.timeSinceLastActionRecord(
        protagonist: other, sufferer: this, wasAggressive: true);
    if (recency == null) return false;

    int deathRecency =
        w.timeSinceLastCustomRecord(name: CustomEvent.actorDeath, actorId: id);
    if (deathRecency != null && deathRecency <= recency) {
      // Actor died between the last attack by [other] and now. They don't
      // remember.
      return false;
    }

    int turnUndeadRecency = w.timeSinceLastActionRecord(
        actionName: TurnUndead.className,
        protagonist: this,
        sufferer: other,
        wasSuccess: true);
    if (turnUndeadRecency != null && turnUndeadRecency <= recency) {
      // This actor turned the other actor undead since the last time they hurt
      // this actor. The necromancer shouldn't be mad at her minions.
      return false;
    }

    return recency <= maxTime;
  }
}
