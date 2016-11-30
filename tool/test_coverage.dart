import "package:logging/logging.dart";

import "../test/builder_test.dart" as builder;
import "../test/cli_test.dart" as cli;
import "../test/file_hierarchy_test.dart" as file_hierarchy;
import "../test/persistence_test.dart" as persistence;
import "../test/scripter_test.dart" as scripter;
import "../test/vars_generator_test.dart" as vars_generator;

void main() {
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
