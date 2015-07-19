import 'dart:io';
import 'dart:collection';
import 'dart:async';
import 'package:path/path.dart' as path;

/// Script for running all tests in test/ folder.
/// This script finds all .dart files inside test/ folder with name containing
/// _test.dart and runs them.
///
/// Sometimes we want to ignore some files, these files are mentioned in
/// ignoredFileNames list.

/// Files which are ignored.
final List ignoredFileNames = [
  "form_test.dart" //needs to rund with form_test.html
];

/// Params for running test.
final List testParams = [
  "--enable_type_checks",
  "--enable_asserts"
];

void main() {
  String pathToScript = Platform.script.toFilePath();
  Directory parent = new Directory(path.dirname(pathToScript)).parent;
  Directory test = new Directory(path.join(parent.path, "test"));

  if (!test.existsSync()) {
    print("The folder test/ doesn't exist. Cancelling tests running.");
    return;
  }

  List fileNames = [];
  test.list(recursive: true, followLinks: false)
    .listen((FileSystemEntity entity) {
    String fileName = path.basename(entity.path);

    if (path.extension(entity.path) == ".dart" &&
        path.basenameWithoutExtension(entity.path).endsWith("_test") &&
        !ignoredFileNames.contains(fileName)) {
      fileNames.add(entity.path);
    }
  }, onDone: () => _runTests(fileNames));
}

/// Starts tests using queue.
Future _runTests(List fileNames) async {
  ListQueue queue = new ListQueue.from(fileNames);

  while(queue.isNotEmpty) {
    String path = queue.removeFirst();
    await _runTestProcess(path);
  }

  print("\nFINAL STATS:");
  print("${fileNames.length} test files run: $fileNames");
}

/// Starts actual process of running test in [path].
Future _runTestProcess(String path) async {
  List params = new List.from(testParams)..add(path);

  print("\nRunning test in $path");
  print("-----------------------");
  var process = await Process.start('dart', params, runInShell: true);
  return await Future.wait([
    stdout.addStream(process.stdout),
    stderr.addStream(process.stderr)]);
}