library builder;
import 'dart:io';

main() {
  print("Running unit tests...");
  Process.run("./bin/unit_test_run.sh", [])
  .then((result) {
    if (result.exitCode == 0) {
      print("  success.");
    } else {
      print("  FAILED!\n");
      print(result.stdout);
      exitCode = result.exitCode;
    }
  }, onError: (e) {
    print(e);
  });
}