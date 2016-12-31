library stranded.actor;

import 'package:built_value/built_value.dart';
import 'package:collection/collection.dart';
import 'package:meta/meta.dart';
import 'package:quiver/core.dart';

import 'item.dart';
import 'storyline/storyline.dart';
import 'team.dart';
import 'world.dart';

part 'actor.g.dart';

typedef num WorldScoringFunction(Actor actor, WorldState world);

abstract class Actor extends Object
    with EntityBehavior
    implements Built<Actor, ActorBuilder>, Entity {
  factory Actor([updates(ActorBuilder b)]) = _$Actor;
  Actor._();

  bool get alreadyMentioned;

  List<String> get categories; // TODO make immutable

  /// The weapon this actor is wielding at the moment.
  ///
  /// Changing a weapon should ordinarily take a turn.
  @nullable
  Item get currentWeapon;

  int get hitpoints;

  /// Names can change or can even be duplicate. [id] is the only safe way
  /// to find out if we're talking about the same actor.
  @override
  int get id;

  /// The higher the initiative, the sooner this actor will act each turn.
  ///
  /// The player should have the highest initiative (so that he starts). The
  /// island should probably have the lowest.
  ///
  /// This doesn't change during gameplay.
  int get initiative;

  bool get isActive;

  bool get isAlive => hitpoints > 0;

  bool get isPlayer;

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

  String get name;

  bool get nameIsProperNoun;

  Pose get pose;

  Pronoun get pronoun;

  @nullable
  Item get shield;

  Team get team;

  @nullable
  WorldScoringFunction get worldScoringFunction;

  /// Computes gratitude towards [other] given the state of the [world].
  ///
  /// Goes through action records.
  num getGratitude(Actor other, WorldState world) {
    var othersActions = world.actionRecords.where(
        (rec) => rec.knownTo.contains(id) && rec.protagonist == other.id);

    var scoreChanges = othersActions
        .map((rec) => rec.scoreChange[this])
        .where((value) => value != null);
    num cumulativeScoreChange = scoreChanges.fold(0, (a, b) => a + b);
    return cumulativeScoreChange;
  }

  // TODO: loveIndifference
  // other feelings?

  bool hasItem(Type type, {int count: 1}) {
    for (var item in items) {
      if (item.runtimeType == type) {
        count -= 1;
      }
      if (count <= 0) break;
    }
    return count <= 0;
  }

  Item removeItem(Type type) {
    Item markedForRemoval;
    for (var item in items) {
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
  num scoreWorld(WorldState world) {
    if (worldScoringFunction != null) {
      return worldScoringFunction(this, world);
    }
    int score = 0;
    score += 10 * hitpoints;

    if (team.isEnemyWith(playerTeam)) {
      // Discount self-worth for enemies (makes them more gung-ho and fun).
      score = score ~/ 2;
    }

    // Add points for every friend and their hitpoints.
    var friends = world.actors.where((a) => a.team == team);
    score += friends.fold/*<int>*/(
        0,
        (int sum, Actor a) =>
            sum + (a.isAliveAndActive ? 2 : 0) + 2 * a.hitpoints);

    // Remove points for every enemy and their hitpoints.
    var enemies = world.actors.where((a) => a.isEnemyOf(this));
    score -= enemies.fold/*<int>*/(0,
        (int sum, Actor a) => sum + (a.isAliveAndActive ? 1 : 0) + a.hitpoints);

    return score;
  }

  bool wields(ItemType value) =>
      currentWeapon != null && currentWeapon.type == value;
}

abstract class ActorBuilder implements Builder<Actor, ActorBuilder> {
  @virtual
  bool alreadyMentioned = true;
  @virtual
  List<String> categories = <String>[];
  @nullable
  @virtual
  Item currentWeapon;
  @nullable
  @virtual
  Item shield;
  @virtual
  Pose pose = Pose.standing;
  @virtual
  int hitpoints = 1;
  @virtual
  int id;
  @virtual
  int initiative = 100;
  @virtual
  bool isActive = true;
  @virtual
  bool isPlayer = false;
  @virtual
  Set<Item> items = new Set();
  @virtual
  String name;
  @virtual
  bool nameIsProperNoun = true;
  @virtual
  Pronoun pronoun = Pronoun.IT;
  @virtual
  Team team = playerTeam;
  @nullable
  @virtual
  WorldScoringFunction worldScoringFunction;

  factory ActorBuilder() = _$ActorBuilder;
  ActorBuilder._();
}

class ActorMap<T> extends CanonicalizedMap<int, Actor, T> {
  ActorMap() : super((Actor key) => key.id, isValidKey: (key) => key != null);

  factory ActorMap.from(ActorMap other) {
    var map = new ActorMap<T>();
    other.forEach((Actor key, T value) => map[key] = value);
    return map;
  }

  @override
  int get hashCode {
    return hashObjects(values.toList(growable: false));
  }

  bool operator ==(o) => o is ActorMap && hashCode == o.hashCode;
}

enum Pose { standing, offBalance, onGround }
