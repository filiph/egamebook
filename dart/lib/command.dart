library egb_command;

import 'dart:async';
import 'package:args/command_runner.dart';
import 'src/cli/cli.dart';

/// Abstract class [WorkerCommand] defines base class for all commands.
abstract class WorkerCommand extends Command {
  /// Error message used during failed validation.
  final String error;

  /// Runs appropriate command and validates parameters.
  /// If params are not valid, it fails to execute the command.
  Future run() {
    List params = argResults.rest;

    if (!paramsValid(params)) {
      return new Future.error("$error\n\n${runner.commands[name].usage}");
    }

    return createWorker(params).run();
  }

  /// Checks if [params] are valid.
  bool paramsValid(List params);

  /// Returns new [Worker] instance for the appropriate command.
  Worker createWorker(List params);
}

/// Class [CreateCommand] wraps command for creating of new project.
class CreateCommand extends WorkerCommand {
  /// Name of the command
  final String name = "create";
  /// Description of the command
  final String description = "Create new egamebook project.";
  /// Error message used with usage
  final String error = "Please specify valid name of the project.";

  /// Constructor
  CreateCommand();

  /// Returns if params have length of 1 and the name of the project is not ".".
  bool paramsValid(List params) {
    return params.length == 1 && params[0] != ".";
  }

  Worker createWorker(List params) {
    return new ProjectCreator(params);
  }
}

/// Class [BuildCommand] wraps command for building of selected project.
class BuildCommand extends WorkerCommand {
  /// Name of the command
  final String name = "build";
  /// Description of the command
  final String description = "Build egamebook project.";
  /// Error message used with usage
  final String error = "Please specify one project folder.";

  BuildCommand();

  bool paramsValid(List params) {
    return params.length <= 1;
  }

  Worker createWorker(List params) {
    return new ProjectBuilder(params);
  }
}

/// Class [WatchCommand] wraps command for watching of selected project.
class WatchCommand extends WorkerCommand {
  /// Name of the command
  final String name = "watch";
  /// Description of the command
  final String description = "Watch egamebook project for changes.";
  /// Error message used with usage
  final String error = "Please specify one project folder.";

  WatchCommand();

  bool paramsValid(List params) {
    return params.length <= 1;
  }

  Worker createWorker(List params) {
    return new ProjectWatcher(params);
  }
}