import 'dart:io';
import 'package:logging/logging.dart';
import 'package:args/command_runner.dart';
import 'package:egamebook/command.dart';

/// TODO use async/await
///
/// Runs egamebook script with [args] which expects commands in form:
///     create <path>
///
///     build
///     build .
///     build <path>
///     build <egb_path>
///
///     watch
///     watch .
///     watch <path>
main(List<String> args) {
  CommandRunner runner = new CommandRunner("egamebook", "Egamebook builder.")
    ..addCommand(new CreateCommand())
    ..addCommand(new BuildCommand())
    ..addCommand(new WatchCommand());
  runner.argParser.addFlag("verbose", abbr: "v", help: "Show log messages.",
      negatable: false,
      callback: (bool verbose) {
        if (!verbose) return;
        print("Logging enabled.");
        Logger.root.level = Level.ALL;
        Logger.root.onRecord.listen((LogRecord rec) {
          print('${rec.level.name}: ${rec.time}: ${rec.message}');
        });
      });
  runner.run(args)
    .then((message) =>
        (message != null && message.isNotEmpty) ? print(message) : "")
    .catchError((error) {
      print("ERROR: $error");
      exit(64); // Exit code 64 indicates a usage error.
    });
}