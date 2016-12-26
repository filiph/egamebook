library stranded.situation;

import 'dart:math' show Random;

import 'action.dart';
import 'actor.dart';
import 'storyline/storyline.dart';
import 'world.dart';

final int _largeInteger = 0x3FFFFFFF;

final Random _random = new Random();

int getRandomId() => _random.nextInt(_largeInteger);

/// Situation is a phase during play. It governs which actions are available,
/// and what actors can act (and in what order).
///
/// Situations are stacked on a push-down automaton. [Action]s can push new
/// situations on the stack, which are then processed until completion. Actions
/// can also replace the top-most situation with another one, or remove
/// the top-most situation.
///
/// To implement a Situation:
///
/// * Subclass [Situation]. For sake of clarity, we'll call the subclass
///   `MySituation` here.
/// * Put the new class in a separate Dart file.
/// * Make sure that the new class `MySituation` implements
///   `BuiltValue<MySituation, MySituationBuilder` as required by built_value.
/// * Create the `MySituationBuilder` class.
/// * Add the new Dart file into `tool/phases.dart`.
/// * Run `tool/build.dart` if it doesn't run automatically.
/// * Follow instruction in the newly generated `*.g.dart` file.
/// * Make sure your `MySituationBuilder` includes the [id] field and that
///   it reads like this:
///         @virtual
///         int id = getRandomId();
abstract class Situation {
  /// The actions with objects available to the actors.
  ///
  /// For every actor, every turn, these action generators will be called
  /// in order to provide all the possible actions.
  ///
  /// For example, an action generator called 'pick up {something}' might
  /// generate two actions: 'pick up lamp' and 'pick up sword'.
  List<ActionGenerator> get actionGenerators => const [];

  /// The actions available to the actors.
  ///
  /// These are the actions that only have a subject (the actor), and not any
  /// object. Therefore, the is only one possible instance of such action
  /// per actor per turn.
  ///
  /// For example, things like 'stand up' or 'reload weapon' are only acting
  /// on the subject.
  ///
  /// If you need actions that act on an 'object' (such as 'hit {someone}' or
  /// 'pick up {something}', use [actionGenerators].
  List<ActorAction> get actions => const [];

  /// Identifies the situation even after it has changed (for example, the time
  /// has been increased, or an actor has changed).
  int get id;

  /// Identifies the type of the Situation (i.e. 'FightSituation' for
  /// [FightSituation].
  ///
  /// This is so that we can do things like [WorldState.popSituationsUntil].
  String get name;

  /// This is increased every 'turn'. It starts at `0` when the situation is
  /// first created.
  int get time;

  /// Returns updated state with `time++`.
  Situation elapseTime();

  /// Returns the actor whose turn it is at specified [time].
  Actor getActorAtTime(int time, WorldState world);

  /// Filters the [actors] that are active in this situation.
  Iterable<Actor> getActors(Iterable<Actor> actors, WorldState world);

  /// Returns the actor whose time it is at the current [time].
  Actor getCurrentActor(WorldState world) => getActorAtTime(time, world);

  void onAfterAction(WorldState world, Storyline storyline) {
    // No-op by default.
  }

  /// Called just before executing an action.
  ///
  /// This should NOT modify the world. This is only for adding to the
  /// [storyline].
  void onBeforeAction(WorldState world, Storyline storyline) {
    // No-op by default.
  }

  /// Return `false` when this [Situation] should no longer continue.
  ///
  /// This is called at the end of a turn (after [onAfterAction] finished) and
  /// will remove this action from the [WorldState.situations] stack when
  /// the situation is finished.
  ///
  /// Note that this is not the only way for situations to end. They can
  /// be popped manually from the stack.
  bool shouldContinue(WorldState world) => true;

  // TODO: toMap (save [time] as well as currentActor (because we want to make
  //       sure that we load with the same actor although some actors may have
  //       been removed from play))
}
