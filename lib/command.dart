library egb_command;

import 'dart:async';
import 'package:args/command_runner.dart';
import 'package:egamebook/src/cli/cli.dart';

/// Abstract class [WorkerCommand] defines base class for all commands.
abstract class WorkerCommand extends Command {
  /// Error message used during failed validation.
  final String error = "";

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
  /// Name of the command.
  final String name = "create";
  /// Description of the command.
  final String description = "Create new egamebook project.";
  /// Error message used with usage.
  final String error = "Please specify valid name of the project.";

  /// Creates new CreateCommand.
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
  /// Name of the command.
  final String name = "build";
  /// Description of the command.
  final String description = "Build egamebook project.";
  /// Error message used with usage.
  final String error = "Please specify one project folder.";

  /// Creates new BuildCommand.
  BuildCommand() {
    argParser.addFlag("analyze", abbr: "a",
        help: "Runs analyzer on built file.", negatable: false);
    argParser.addFlag("full-directory", abbr: "f",
        help: "Runs builder on all .egb files in directory.", negatable: false);
  }

  /// Returns if params have length smaller or equal to 1.
  bool paramsValid(List params) {
    return params.length <= 1;
  }

  Worker createWorker(List params) {
    return new ProjectBuilder(params,
        argResults["analyze"], argResults["full-directory"]);
  }
}

/// Class [WatchCommand] wraps command for watching of selected project.
class WatchCommand extends WorkerCommand {
  /// Name of the command.
  final String name = "watch";
  /// Description of the command.
  final String description = "Watch egamebook project for changes.";
  /// Error message used with usage.
  final String error = "Please specify one project folder.";

  /// Creates new WatchCommand.
  WatchCommand() {
    argParser.addFlag("analyze", abbr: "a",
            help: "Runs analyzer on built file.", negatable: false);
  }

  /// Returns if params have length smaller or equal to 1.
  bool paramsValid(List params) {
    return params.length <= 1;
  }

  Worker createWorker(List params) {
    return new ProjectWatcher(params, argResults["analyze"]);
  }
}