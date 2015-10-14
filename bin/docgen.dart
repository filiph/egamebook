import 'dart:io';
import 'package:path/path.dart' as path;
import 'package:args/args.dart';

/// Script for documentation generator - dartdoc.
/// This script finds generates documentation for this library and opens it
/// in a browser.
/// More info about dartdoc params in
/// [documentation](https://github.com/dart-lang/dartdoc).

final String OUTPUT_PATH = "docs${path.separator}dev";

final List params = [
  "--output=$OUTPUT_PATH"
];

/// If we want to serve the output
bool serve = false;

void main(List<String> args) {
  ArgParser parser = new ArgParser()
    ..addFlag("serve", negatable: false,
        help: "After generating, open docs in the browser.")
    ..addFlag("help", abbr: "h", negatable: false, help: "Display help.");
  ArgResults results = parser.parse(args);

  if (results["serve"]) {
    serve = true;
  }

  if (results["help"]) {
    print(parser.usage);
    return;
  }

  Directory parent = new Directory(
      path.dirname(Platform.script.toFilePath())).parent;
  Directory lib = new Directory(path.join(parent.path, "lib"));

  if (!lib.existsSync()) {
    print("The folder lib/ doesn't exist. Canceling generation.");
    return;
  }

  _runDartDoc();
}

/// Start dartdoc with parameters.
_runDartDoc() async {
   ProcessResult results = await Process.run('dartdoc', params, runInShell: true);
   print(results.stdout);
   print(results.stderr);

   //Opens a file in browser if serve is true
   File indexFile = new File.fromUri(
       Platform.script.resolve("..${path.separator}$OUTPUT_PATH${path.separator}index.html"));
   if (serve && indexFile.existsSync()) {
     _serveDoc("${indexFile.absolute.path}");
   }
}

/// Serves documentation in the web browser.
_serveDoc(String destination) async {
  String command;
  if (Platform.isMacOS) {
    command = "open";
  } else if (Platform.isWindows) {
    command = "start";
  } else if (Platform.isLinux) {
    command = "xdg-open"; //should work on the most versions of Linux
  }

  await Process.run(command, [destination], runInShell: true);
}