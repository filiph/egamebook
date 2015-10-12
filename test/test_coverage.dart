import "package:logging/logging.dart";
import "builder_test.dart" as builder;
import "cli_test.dart" as cli;
import "file_hierarchy_test.dart" as file_hierarchy;
import "persistence_test.dart" as persistence;
import "scripter_test.dart" as scripter;
import "vars_generator_test.dart" as vars_generator;

main() {
  Logger.root.level = Level.SEVERE;
  Logger.root.onRecord.listen((LogRecord rec) {
    print('${rec.level.name}: ${rec.time}: ${rec.message}');
  });

  builder.main();
  cli.main();
  file_hierarchy.main();
  persistence.main();
  scripter.main();
  vars_generator.main();
}