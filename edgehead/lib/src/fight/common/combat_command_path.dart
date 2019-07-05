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
  ///
  /// For example, it can be [CombatCommandType.body] (for body-harming
  /// attacks), or [CombatCommandType.stance] (for attack that are trying
  /// to put the enemy off-balance). See [CombatCommandType] for the full list.
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

    List<String> commandPathTemplate;
    if (combatCommandType == CombatCommandType.reaction) {
      commandPathTemplate = [command];
    } else {
      commandPathTemplate = [
        target.name,
        _getSecondCommand(context, target),
        command,
      ];
    }

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

  String _getBodyCommand(Actor target) {
    var nonLimbParts = target.anatomy.allParts
        .where((part) => !part.designation.isHumanoidLimb);

    var blindPrefix = target.anatomy.isBlind ? "blind & " : "";

    String status = _getStatusString(nonLimbParts);

    return "body ($blindPrefix$status)";
  }

  String _getLimbsCommand(Actor target) {
    String armStatus;
    if (!target.anatomy.primaryWeaponAppendageAvailable &&
        !target.anatomy.secondaryWeaponAppendageAvailable) {
      armStatus = "both arms";
    } else if (!target.anatomy.primaryWeaponAppendageAvailable ||
        !target.anatomy.secondaryWeaponAppendageAvailable) {
      armStatus = "arm";
    }
    String legStatus;
    var leftLegAvailable = target.anatomy
        .findByDesignation(BodyPartDesignation.leftLeg)
        .isAliveAndActive;
    var rightLegAvailable = target.anatomy
        .findByDesignation(BodyPartDesignation.rightLeg)
        .isAliveAndActive;
    if (!leftLegAvailable && !rightLegAvailable) {
      legStatus = "both legs";
    } else if (!leftLegAvailable || !rightLegAvailable) {
      legStatus = "leg";
    }

    if (armStatus != null && legStatus != null) {
      return "limbs ($armStatus & $legStatus maimed)";
    } else if (armStatus != null) {
      return "limbs ($armStatus maimed)";
    } else if (legStatus != null) {
      return "limbs ($legStatus maimed)";
    }

    var limbParts = target.anatomy.allParts
        .where((part) => part.designation.isHumanoidLimb);

    String status = _getStatusString(limbParts);

    return "limbs ($status)";
  }

  String _getSecondCommand(ApplicabilityContext context, Actor target) {
    switch (combatCommandType) {
      case CombatCommandType.body:
        return _getBodyCommand(target);
      case CombatCommandType.limbs:
        return _getLimbsCommand(target);
      case CombatCommandType.stance:
        return _getStanceCommand(target);
      case CombatCommandType.gear:
        return 'gear';
      case CombatCommandType.mental:
        return 'mental';
      case CombatCommandType.reaction:
        throw StateError('_getSecondCommand called with $combatCommandType');
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
  body,

  /// A combat action that should have a command path of just the tail.
  ///
  /// For example, when an enemy slashes at you, the counter command should
  /// be "Slash back", not "Goblin >> Body >> Slash back".
  reaction,
}
