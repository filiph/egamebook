library stranded.situation;

import 'dart:math' show Random;

import 'package:built_value/built_value.dart';

import 'actor.dart';
import 'package:meta/meta.dart';
import 'world.dart';
import 'storyline/storyline.dart';
import 'action.dart';

part 'situation.g.dart';

/// Situation is a phase during play. It governs which actions are available,
/// and what actors can act (and in what order).
///
/// Situations are stacked on a push-down automaton. [Action]s can push new
/// situations on the stack, which are then processed until completion. Actions
/// can also replace the top-most situation with another one, or remove
/// the top-most situation.
///
/// [Situation] wraps around only two fields: the [id] (designed to be constant
/// during the situation's lifetime) and [state]. This is because we want to
/// be able to implement SituationStates easily (there will be a lot of them)
/// and so we we use composition over inheritance. Inheritance in Built values
/// is especially tricky.
///
/// Situations need to be classes (not top-level fields) because they need
/// to be instantiated each time with actor / enemy / time etc.
abstract class Situation implements Built<Situation, SituationBuilder> {
  /// Identifies the situation even after it has changed (for example, the time
  /// has been increased, or an actor has changed).
  int get id;

  SituationState get state;

  Situation._();
  factory Situation([updates(SituationBuilder b)]) = _$Situation;

  factory Situation.withState(SituationState state) =>
      new Situation((b) => b.state = state);

  void onBeforeAction(WorldState world, Storyline storyline) {
    state.onBeforeAction(world, storyline);
  }

  void onAfterAction(WorldState world, Storyline storyline) {
    state.onAfterAction(world, storyline);
  }

  /// Actions available to participants of this situation.
  List<ActorAction> get actions => state.actions;

  /// Action generators available to participants of this situation.
  List<ActionGenerator> get actionGenerators => state.actionGenerators;

  // TODO: toMap (save [time] as well as currentActor (because we want to make
  //       sure that we load with the same actor although some actors may have
  //       been removed from play))
}

final Random _random = new Random();
final int _largeInteger = 0x3FFFFFFF;

abstract class SituationBuilder
    implements Builder<Situation, SituationBuilder> {
  @virtual
  int id = _random.nextInt(_largeInteger);
  @virtual
  SituationState state;

  SituationBuilder._();
  factory SituationBuilder() = _$SituationBuilder;
}

/// A state of a situation.
abstract class SituationState {
  String get name;

  int get time;

  /// Returns the actor whose turn it is at specified [time].
  Actor getActorAtTime(int time, WorldState world);

  /// Called just before executing an action.
  ///
  /// This should NOT modify the world. This is only for adding to the
  /// [storyline].
  void onBeforeAction(WorldState world, Storyline storyline) {
    // No-op by default.
  }

  void onAfterAction(WorldState world, Storyline storyline) {
    // No-op by default.
  }

  List<ActorAction> get actions => const [];
  List<ActionGenerator> get actionGenerators => const [];

  bool shouldContinue(WorldState world) => true;

  /// Returns updated state with `time++`.
  SituationState elapseTime();

  /// Filters the [actors] that are active in this situation.
  Iterable<Actor> getActors(Iterable<Actor> actors, WorldState world);

  Actor getCurrentActor(WorldState world) => getActorAtTime(time, world);
}

abstract class ElapsingTime<T, U extends SituationStateBuilderBase> {
  T elapseTime() => rebuild((U b) => b..time += 1);
  T rebuild(updates(U b));
}

abstract class SituationStateBuilderBase {
  int get time;
  set time(int value);
}
