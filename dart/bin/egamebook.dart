import 'dart:io';
import 'package:args/command_runner.dart';
import 'package:egamebook/command.dart';

/// TODO use async/await
/// TODO do we want to use symlinks when copying project files?
/// TODO do we want to run dartanalyzer after build?
///
/// Runs egamebook script with [args] which expects commands in form:
///   create <path>
///
///   build
///   build .
///   build <path>
///
///   watch
///   watch .
///   watch <path>
main(List<String> args) {
  CommandRunner runner = new CommandRunner("egamebook", "Egamebook builder.")
    ..addCommand(new CreateCommand())
    ..addCommand(new BuildCommand())
    ..addCommand(new WatchCommand());
  runner.run(args)
    .then((message) => print(message))
    .catchError((error) {
      print(error);
      exit(64); // Exit code 64 indicates a usage error.
    });
}