import 'dart:io';
import 'package:path/path.dart' as path;
import 'package:args/args.dart';

/// Script for documentation generator - dartdocgen.
/// This script finds all .dart files inside lib/ folder (including src/)
/// and generates documentation from it.

/// Files which are ignored by docgen.
final List ignoredFileNames = [
  "reference_scripter_impl.dart",
  "points_counter.dart", //contains part of
  "scripter_page.dart" //contains part of
];

/// More info about dartdocgen params in
/// [documentation](https://www.dartlang.org/tools/dartdocgen/).
final List docgenParams = [
  "-v",
  "--no-include-dependent-packages",
  "--no-include-sdk",
  "--start-page=egamebook",
  "--out=docs/dev"
];

/// If we want to serve the output
bool serve = false;

void main(List<String> args) {
  ArgParser parser = new ArgParser()
    ..addFlag("serve", negatable: false,
        help: "After generating, start the dartdoc-viewer on localhost:8080.")
    ..addFlag("help", abbr: "h", negatable: false, help: "Display help.");
  ArgResults results = parser.parse(args);

  if (results["serve"]) {
    serve = true;
  }

  if (results["help"]) {
    print(parser.usage);
    return;
  }

  String pathToScript = Platform.script.toFilePath();
  Directory parent = new Directory(path.dirname(pathToScript)).parent;
  Directory lib = new Directory(path.join(parent.path, "lib"));
  Directory docViewer = new Directory(path.join(parent.path, "dartdoc-viewer"));

  if (!lib.existsSync()) {
    print("The folder lib/ doesn't exist. Canceling generation.");
    return;
  }

  // dartdoc-viewer has to be deleted before generation
  if (docViewer.existsSync()) {
    docViewer.deleteSync(recursive: true);
  }

  List fileNames = [];
  lib.list(recursive: true, followLinks: false)
    .listen((FileSystemEntity entity) {
    String fileName = path.basename(entity.path);

    if (path.extension(entity.path) == ".dart" &&
        !ignoredFileNames.contains(fileName)) {
      fileNames.add(entity.path);
    }
  }, onDone: () => _runDocgen(fileNames));
}

/// Start dartdocgen with parameters.
void _runDocgen(List fileNames) {
  docgenParams.add(_getPackageRoot());
  if (serve) {
    docgenParams.add("--serve");
  }

  List params = new List.from(docgenParams)
      ..addAll(fileNames);

  Process.start('dartdocgen', params, runInShell: true).then((process) {
    stdout.addStream(process.stdout);
    stderr.addStream(process.stderr);
  });
}

/// Get correct package root according to the platform.
String _getPackageRoot() {
  if (Platform.isWindows) {
    return "--package-root=.\\packages";
  }
  return "--package-root=./packages";
}