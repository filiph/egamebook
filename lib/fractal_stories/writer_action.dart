/// Use these classes in sources generated from writer's input.
library stranded.writer_action;

import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/room_roaming/room_roaming_situation.dart';

/// This is analogous to [SimpleActionApplyFunction], but for the
/// [Action.isApplicable] closure.
typedef bool SimpleActionApplicableFunction(
    Actor a, WorldState w, SimpleAction self);

/// This closure signature is here in order to allow [SimpleAction] to be
/// defined without needing to implement the class.
///
/// For example, apply function needs access to the class's
/// [SimpleAction.movePlayer] method, but a closure won't be able to access it
/// without the [self] parameter.
typedef String SimpleActionApplyFunction(
    Actor a, WorldState w, Storyline s, SimpleAction self);

/// An action that takes place in the context of a [RoomRoamingSituation]
/// (either directly or as an indirect descendant of such situation).
abstract class RoamingAction extends Action {
  @override
  final bool isProactive = true;
}

/// This is a simple actions that, once taken, always succeed.
///
/// It is meant to be used for classic 'CYOA-style' options. Anything more
/// involved (needing a target, a non-1.0 success chance, rerollability)
/// will need to use another class or extend [Action].
class SimpleAction extends RoamingAction {
  final SimpleActionApplyFunction success;

  final SimpleActionApplicableFunction isApplicableClosure;

  @override
  final String command;

  @override
  final String helpMessage;

  @override
  final String name;

  SimpleAction(this.name, this.command, this.success, this.helpMessage,
      {this.isApplicableClosure});

  @override
  bool get isAggressive => false;

  @override
  bool get rerollable => false;

  @override
  Resource get rerollResource => throw new StateError("Not rerollable");

  @override
  String applyFailure(Actor a, WorldState w, Storyline s) {
    throw new StateError("SimpleAction always succeeds");
  }

  @override
  String applySuccess(Actor a, WorldState w, Storyline s) {
    return success(a, w, s, this);
  }

  @override
  String getRollReason(Actor a, WorldState w) {
    throw new StateError("SimpleAction shouldn't have to provide roll reason");
  }

  @override
  num getSuccessChance(Actor a, WorldState w) {
    return 1.0;
  }

  @override
  bool isApplicable(Actor a, WorldState w) {
    if (isApplicableClosure == null) return true;
    return isApplicableClosure(a, w, this);
  }
}
