import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/anatomy/body_part.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';

/// A helper for building a consisten commandPath for fighting actions.
///
/// Users have to specify [combatCommandType] and [getCommandPathTail()].
/// They _don't_ need to specify [commandPathTemplate] or
/// [getCommandPath()].
mixin CombatCommandPath on EnemyTargetAction {
  /// What kind of attack is this?
  CombatCommandType get combatCommandType;

  @override
  List<String> get commandPathTemplate => throw UnimplementedError(
      'CombatCommandPath defines its own getCommandPath');

  @override
  List<String> getCommandPath(ApplicabilityContext context, Actor target) {
    if (isImplicit) {
      return const [];
    }

    var commandPathTail = getCommandPathTail(context, target);

    // Add " again" at the end of a command if it was the latest command
    // executed at the same target.
    var previous = context.world.actionHistory
        .query(actor: context.actor, sufferer: target)
        .latest;
    var again = previous != null && previous.actionName == name;
    var command = "$commandPathTail${again ? ' again' : ''}";

    final commandPathTemplate = [
      "<object>",
      _getSecondCommand(context, target),
      command,
    ];

    // Realize the "<object>" parts of the template.
    return (Storyline()
          ..add(commandPathTemplate.join('>>'),
              subject: context.actor, object: target))
        .realizeAsString()
        // Then split again into a list.
        .split('>>');
  }

  /// The last part of the command path.
  ///
  /// For example, for "Goblin >> Maim >> Cut off arm", it is "Cut off arm".
  String getCommandPathTail(ApplicabilityContext context, Actor object);

  String _getCoreCommand(Actor target) {
    var coreParts = target.anatomy.allParts
        .where((part) => !part.designation.isHumanoidLimb);

    String status = _getStatusString(coreParts);

    return "core ($status)";
  }

  String _getLimbsCommand(Actor target) {
    var limbParts = target.anatomy.allParts
        .where((part) => part.designation.isHumanoidLimb);

    String status = _getStatusString(limbParts);

    return "limbs ($status)";
  }

  String _getSecondCommand(ApplicabilityContext context, Actor target) {
    switch (combatCommandType) {
      case CombatCommandType.core:
        return _getCoreCommand(target);
      case CombatCommandType.limbs:
        return _getLimbsCommand(target);
      case CombatCommandType.stance:
        return _getStanceCommand(target);
      case CombatCommandType.gear:
        return 'gear';
      case CombatCommandType.mental:
        return 'mental';
    }
    throw UnimplementedError('$combatCommandType not implemented');
  }

  String _getStanceCommand(Actor target) {
    var status = target.pose.toHumanString();
    return "stance ($status)";
  }

  /// Takes na iterable of body parts and returns their health status
  /// as a whole.
  String _getStatusString(Iterable<BodyPart> parts) {
    var scratches = 0, cuts = 0, bruises = 0;

    for (final part in parts) {
      scratches += part.minorCutsCount;
      cuts += part.majorCutsCount;
      bruises += part.bluntHitsCount;
    }

    String status;
    if (cuts > 0) {
      status = 'bleeding';
    } else if (bruises > 0) {
      status = 'bruised';
    } else if (scratches > 0) {
      status = 'scratched';
    } else {
      status = 'healthy';
    }
    return status;
  }
}

enum CombatCommandType {
  stance,
  gear,
  mental,
  limbs,
  core,
}
